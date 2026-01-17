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
}
