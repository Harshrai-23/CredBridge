import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const app = express();

// Parse JSON payloads
app.use(express.json());

// API: Health probe
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// API: Trust Coach AI chat handler proxies requests to configured AI Gateway (Azure OpenAI, Open Models, Ollama, Gemini)
app.post("/api/chat", async (req, res) => {
  const { message, history = [], profile } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message parameter is required." });
  }

  // 1. Detect alternative configuration variables
  const azureKey = process.env.AZURE_OPENAI_API_KEY;
  const azureEndpoint = process.env.AZURE_OPENAI_ENDPOINT; // e.g., https://myresource.openai.azure.com
  const azureDeployment = process.env.AZURE_OPENAI_DEPLOYMENT; // e.g., gpt-35-turbo
  const azureApiVersion = process.env.AZURE_OPENAI_API_VERSION || "2023-05-15";

  let openModelKey = process.env.OPEN_MODEL_API_KEY || process.env.OPENAI_API_KEY || process.env.GROQ_API_KEY;
  let openModelBaseUrl = process.env.OPEN_MODEL_BASE_URL || process.env.OPENAI_BASE_URL;
  let openModelName = process.env.OPEN_MODEL_NAME || "openai/gpt-oss-120b";

  // Auto-detect high-performance gateways if base URL is not specified
  if (openModelKey && !openModelBaseUrl) {
    if (openModelKey.startsWith("gsk_") || (openModelKey === process.env.GROQ_API_KEY && !process.env.OPENAI_API_KEY && !process.env.OPEN_MODEL_API_KEY)) {
      openModelBaseUrl = "https://api.groq.com/openai/v1";
    } else {
      openModelBaseUrl = "https://api.openai.com/v1";
    }
  }

  const ollamaUrl = process.env.OLLAMA_BASE_URL || process.env.OLLAMA_HOST; // e.g., http://localhost:11434
  const ollamaModelName = process.env.OLLAMA_MODEL || "llama3";

  const geminiApiKey = process.env.GEMINI_API_KEY;

  // AI Prompt Context Definitions
  const systemInstruction = `You are the CredBridge AI Trust Coach. You guide students (specifically student Harsh, major in CS & Engineering with 9.55 CGPA and current score of 680) on how to build, simulate, and verify alternative credibility indices like grades, GitHub dev stats, summer internship details, and leadership certificates. 
  You motivate them with friendly, professional, constructive advice. Keep answers short, direct, structural, and visually neat using clear bullet points. Refer to the fact they can verify internships in the Verification Center or play switches in the Growth Simulator. Keep it highly concise.`;

  const contextPrompt = `User Profile:
- Name: ${profile?.name || "Harsh"}
- Institution: ${profile?.university || "NIT"}
- CGPA: ${profile?.gpa ? (profile.gpa <= 5 ? profile.gpa * 2.5 : profile.gpa).toFixed(2) : "9.55"}
- Current TrustScore: ${profile?.currentTrustScore || "680"}
- Recent Milestones: CGPA verified (+200), GitHub verified (+180), Summer internship pending upload.

User Query: "${message}"`;

  // === SELECTION 1: Azure OpenAI ===
  if (azureKey && azureEndpoint && azureDeployment) {
    try {
      console.log(`Routing Chat to Azure OpenAI Deployment: ${azureDeployment}`);
      const cleanEndpoint = azureEndpoint.endsWith("/") ? azureEndpoint.slice(0, -1) : azureEndpoint;
      const url = `${cleanEndpoint}/openai/deployments/${azureDeployment}/chat/completions?api-version=${azureApiVersion}`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": azureKey,
        },
        body: JSON.stringify({
          messages: [
            { role: "system", content: systemInstruction },
            { role: "user", content: contextPrompt },
          ],
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Azure Gateway responded with status ${response.status}: ${errorText}`);
      }

      const data: any = await response.json();
      const reply = data.choices?.[0]?.message?.content || "No reply returned from Azure OpenAI.";
      return res.json({ reply });
    } catch (err: any) {
      console.error("Azure OpenAI integration failed, falling back:", err);
      return res.status(500).json({ error: "Azure OpenAI error", details: err.message });
    }
  }

  // === SELECTION 2: Open Models / OpenAI-Compatible (Groq, OpenRouter, standard OpenAI) ===
  if (openModelKey) {
    try {
      console.log(`Routing Chat to Open Model Gateway: ${openModelName} at ${openModelBaseUrl}`);
      const cleanBaseUrl = openModelBaseUrl.endsWith("/") ? openModelBaseUrl.slice(0, -1) : openModelBaseUrl;
      const url = `${cleanBaseUrl}/chat/completions`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${openModelKey}`,
        },
        body: JSON.stringify({
          model: openModelName,
          messages: [
            { role: "system", content: systemInstruction },
            { role: "user", content: contextPrompt },
          ],
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Open Model API responded with status ${response.status}: ${errorText}`);
      }

      const data: any = await response.json();
      const reply = data.choices?.[0]?.message?.content || "No reply returned from Open Model endpoint.";
      return res.json({ reply });
    } catch (err: any) {
      console.error("Open Model endpoint integration failed:", err);
      return res.status(500).json({ error: "Open Model API error", details: err.message });
    }
  }

  // === SELECTION 3: Local Self-Hosted Ollama ===
  if (ollamaUrl) {
    try {
      console.log(`Routing Chat to local Ollama Model: ${ollamaModelName} at ${ollamaUrl}`);
      const cleanOllamaUrl = ollamaUrl.endsWith("/") ? ollamaUrl.slice(0, -1) : ollamaUrl;
      const url = `${cleanOllamaUrl}/api/chat`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: ollamaModelName,
          messages: [
            { role: "system", content: systemInstruction },
            { role: "user", content: contextPrompt },
          ],
          stream: false,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Ollama responded with status ${response.status}: ${errorText}`);
      }

      const data: any = await response.json();
      const reply = data.message?.content || "No response contents from local Ollama.";
      return res.json({ reply });
    } catch (err: any) {
      console.error("Ollama connection failed:", err);
      return res.status(500).json({ error: "Ollama connection error", details: err.message });
    }
  }

  // === SELECTION 4: Default Google Gemini (Standard Mode) ===
  const isGeminiConfigured = geminiApiKey && geminiApiKey !== "MY_GEMINI_API_KEY" && !geminiApiKey.includes("REPLACE");
  if (isGeminiConfigured) {
    try {
      console.log("Routing Chat to standard Gemini AI Gateway (gemini-3.5-flash).");
      const ai = new GoogleGenAI({
        apiKey: geminiApiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contextPrompt,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      return res.json({ reply: response.text });
    } catch (error: any) {
      console.error("Gemini API backend error:", error);
      return res.status(500).json({ error: "Failed to connect to Gemini AI Gateway.", details: error.message });
    }
  }

  // === SELECTION 5: Sandbox fallback (Simulated Advisor mode) ===
  console.log("No remote AI credentials configured. Running Simulated Advisor mode.");
  let reply = "";
  const query = message.toLowerCase();

  if (query.includes("github") || query.includes("git") || query.includes("commit") || query.includes("developer")) {
    reply = `To supercharge your **Developer Skill Signature** on GitHub, look at these specific pathways:
    
1. **GitHub Commit Streaks**: Establishing a continuous 3-Month streak adds an immediate +20 Points to your TrustScore.
2. **Repository Depth**: Original repos with full license declarations count 3x more than standard fork updates.
3. **Kaggle & LeetCode Integration**: Link verified stats nodes to add up to +25 points.

*Developer Hint: Try toggling the "Consecutive 3-Month Github Commits Streak" in the Growth Simulator to see its exact impact.*`;
  } else if (query.includes("gpa") || query.includes("cgpa") || query.includes("transcript") || query.includes("academic")) {
    reply = `Your current Registrar-certified CGPA is **9.55 / 10.00**, which adds **200 Academic Points** to your passport. 
    
Boosting this cumulative CGPA above 9.80 would add up to **+35 Points** to your projection. 
    
This tells partner banks and loan gateways that you maintain very high self-discipline, reducing liability flags.`;
  } else if (query.includes("internship") || query.includes("offer") || query.includes("letter")) {
    reply = `Your summer Software Engineering internship is currently listed as **Pending**.
    
By going to the **Verification Center**, you can upload your offer letter (PDF/Word). This initiates our compliance check, verifying parameters and instantly applying **+120 Points** to your rating. This single step will unlock both Level 3 and 4 roadmap rewards!`;
  } else if (query.includes("level 3") || query.includes("roadmap") || query.includes("unlock")) {
    reply = `To unlock **Level 3: Opportunity Accelerator**, you need a cumulative score of **700+ Points**.
    
Since your baseline score is **680**, you need exactly 20 points! You can achieve this by completing any of the following milestones:
- Link competitive programming stats nodes (+25, unlocks level 3).
- Submit verified student body GDG leadership certificate (+30, unlocks level 3).
- Upload summer internship verification offer letter (+45, unlocks levels 3 and 4).`;
  } else {
    reply = `Hello ${profile?.name || "Harsh"}! As your AI Trust Coach, I am analyzing your current student profile parameters to help you map out the fastest route to credit readiness:
    
- **Academic Score Weight**: 200 Points (Verified Registrar)
- **Skills Score Weight**: 180 Points (Verified GitHub)
- **Professional Score Weight**: Pending Verification
- **Current TrustScore**: 680 Points
    
To reach **Level 3 (700+ Score)** and unlock premium benefits, I suggest checking your options in the **Growth Simulator**, or heading to the **Verification Center** to upload your pending internship offer letter.`;
  }

  return res.json({ reply });
});

async function startServer() {
  const PORT = 3000;

  // Vite middleware for development asset serving
  if (!process.env.VERCEL) {
    if (process.env.NODE_ENV !== "production") {
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: "spa",
      });
      app.use(vite.middlewares);

      // Serve index.html dynamically in dev mode
      app.get("*", async (req, res, next) => {
        const url = req.originalUrl;
        try {
          let template = await fs.promises.readFile(
            path.resolve(process.cwd(), "index.html"),
            "utf-8"
          );
          template = await vite.transformIndexHtml(url, template);
          res.status(200).set({ "Content-Type": "text/html" }).end(template);
        } catch (e: any) {
          vite.ssrFixStacktrace(e);
          next(e);
        }
      });
    } else {
      const distPath = path.join(process.cwd(), "dist");
      app.use(express.static(distPath));
      // SPA fallback
      app.get("*", (req, res) => {
        res.sendFile(path.join(distPath, "index.html"));
      });
    }

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Express custom server running on http://0.0.0.0:${PORT}`);
    });
  }
}

if (!process.env.VERCEL) {
  startServer().catch((err) => {
    console.error("Critical server bootstrap error:", err);
  });
}

export default app;
