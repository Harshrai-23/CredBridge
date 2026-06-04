export interface UserProfile {
  name: string;
  avatar: string;
  university: string;
  major: string;
  gpa: number;
  graduationYear: number;
  currentTrustScore: number;
  category?: "Engineering / Technology" | "Medical / Healthcare" | "Commerce / Finance" | "Science / Research";
}

export interface VerificationItem {
  id: string;
  name: string;
  category: "academic" | "skills" | "professional" | "leadership";
  sourceName: string;
  status: "verified" | "pending" | "not_connected";
  lastUpdated: string;
  points: number;
  details: string;
}

export interface Opportunity {
  id: string;
  title: string;
  provider: string;
  category: "scholarship" | "benefit" | "credit" | "accelerator" | "financing";
  description: string;
  requiredScore: number;
  rewardValue: string;
  status: "unlocked" | "locked";
  linkText: string;
  targetCategory?: "Engineering / Technology" | "Medical / Healthcare" | "Commerce / Finance" | "Science / Research" | "All";
}

export interface RoadmapLevel {
  level: number;
  title: string;
  minScore: number;
  perks: string[];
  status: "active" | "unlocked" | "locked";
}

export interface SimulatorFactor {
  id: string;
  label: string;
  description: string;
  pointsImpact: number;
  category: "academic" | "skills" | "professional" | "leadership";
  active: boolean;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  content: string;
  timestamp: string;
}
