export interface Branch {
  id: string;
  name: string;
  description: string;
  coordinator_name: string;
  coordinator_email: string;
  coordinator_phone: string;
  cutoff_rank?: number;
}

export interface PlacementData {
  id: string;
  year: number;
  highest_package: string;
  average_package: string;
  top_companies: string[];
  placement_percentage: number;
  students_eligible?: number;
  students_placed?: number;
  offers?: number;
  note?: string;
}

export interface Infrastructure {
  id: string;
  category: string;
  details: string;
}

export interface Message {
  id: string;
  role: 'bot' | 'user';
  content: string;
  timestamp: Date;
}

export type Language = 'en' | 'te';
