import { GoogleGenerativeAI } from "@google/generative-ai";
import { UserProfile, UserRole, ScanResult } from "../types";

export interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

// CORRECCIÓN: Uso de GoogleGenerativeAI y variables de entorno para Vite
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const getAresResponse = async (history: ChatMessage[], user: UserProfile): Promise<string> => {
  const isFrancisco = user.role === UserRole.VP;
  const systemInstruction = `
    Eres ARES, el Asistente de Respuesta Estratégica del ZEUS CCE.
    Operador actual: ${user.name} (${user.role}).
    Ubicación Central: Medellín, Colombia.
    ${isFrancisco ? "AVISO: Francisco Anduaga (VP). Acceso ejecutivo total." : "Asiste al operador en tareas tácticas."}
    TONO: Militar, profesional, ejecutivo, directo.
    Responde siempre en español.
  `;

  try {
    const chat = model.startChat({
      history: history.map(h => ({
        role: h.role,
        parts: h.parts,
      })),
    });

    const result = await chat.sendMessage(systemInstruction);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("ARES API Error:", error);
    return "Error de enlace táctico. Reintente en un momento.";
  }
};

export const generateRealisticLeads = async (context: string): Promise<ScanResult[]> => {
  try {
    const prompt = `Genera un JSON con 5 objetivos de negocio en Medellín. Contexto: "${context}".`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return JSON.parse(response.text().replace(/```json|```/g, ""));
  } catch (e) {
    return [
      { id: 'C1', name: 'EDS Primax El Poblado', type: 'COMPETENCIA', value: '$2.8M', dist: '0.4km', term: '2025-08-15' }
    ];
  }
};

export const getAIInsights = async (prompt: string): Promise<string> => {
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (e) {
    return "No se pudo generar el análisis.";
  }
};
