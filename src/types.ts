<<<<<<< HEAD
// ===============================
// Tipos de MENSAJES (NO MEZCLAR)
// ===============================

// 👉 Mensajes que usa la UI (frontend)
export type UIChatRole = "user" | "ares";

export interface UIMessage {
  role: UIChatRole;
  text: string;
}

// 👉 Mensajes que se envían a Gemini / Google
export interface GeminiMessage {
  role: "user" | "model";
  parts: { text: string }[];
=======
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
>>>>>>> f1dfb34f4dc52255a7e9cfc0d30e780f6b3726b7
}
