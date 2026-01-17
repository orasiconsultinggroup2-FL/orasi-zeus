export enum UserRole {
  ADMIN = 'ADMIN',
  OPERATOR = 'OPERATOR',
  VP = 'VP'
}

export interface UserProfile {
  name: string;
  role: UserRole;
  avatar?: string;
}

export interface ScanResult {
  id: string;
  name: string;
  type: 'EDS' | 'COMPETENCIA' | 'B2B' | 'TERRENO';
  value: string;
  dist: string;
  term: string;
  status?: 'active' | 'pending' | 'closed';
}

export interface Mission {
  id: string;
  title: string;
  objective: string;
  status: 'active' | 'completed' | 'failed';
}
