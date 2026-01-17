export enum UserRole {
  ADMIN = 'ADMIN',
  OPERATOR = 'OPERATOR',
  VP = 'VP'
}

export interface UserProfile {
  name: string;
  role: UserRole;
}

export interface ScanResult {
  id: string;
  name: string;
  type: string;
  value: string;
  dist: string;
  term: string;
}
