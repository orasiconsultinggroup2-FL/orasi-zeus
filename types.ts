
export enum AppRoute {
  HOME = '/',
  PIPELINE = '/pipeline',
  RADAR = '/radar',
  KPIS = '/kpis',
  GOVERNANCE = '/governance',
  RESOURCES = '/resources',
  OFFERS = '/offers',
  ACADEMY = '/academy'
}

export enum UserRole {
  FFVV = 'FFVV',
  SUPERVISOR = 'SUPERVISOR',
  VP = 'VP_FRANCISCO'
}

export interface UserProfile {
  name: string;
  role: UserRole;
  unit: string;
}

export type LeadStatus = 'PENDIENTE' | 'VALIDADO' | 'FALLIDO' | 'RESERVA';

export interface PipelineCard {
  id: string;
  title: string;
  probability: string;
  value: string;
  owner: string;
  ownerName?: string;
  nextStep: string;
  date: string;
  type: 'COMPETENCIA' | 'PROPIA' | 'B2B' | 'EXPANSION';
  status?: LeadStatus;
  validationReason?: string;
  contractTerm?: string;
}

export interface Offer {
  id: string;
  client: string;
  amount: string;
  status: string;
  date: string;
  type: string;
  recipient?: string;
  recipientEmail?: string;
}

export interface KanbanColumn {
  id: string;
  name: string;
  color: string;
  totalValue: string;
  cards: PipelineCard[];
}

export interface ScanResult {
  id: string;
  name: string;
  type: 'COMPETENCIA' | 'PROPIA' | 'B2B' | 'EXPANSION';
  value: string;
  dist: string;
  term: string;
}

export interface AcademyModule {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export interface BeltLevel {
  level: string;
  color: string;
  modules: AcademyModule[];
  achievement: string;
  opportunity: string;
}
