import { GoogleGenAI, Type, GenerateContentResponse } from "@google/generative-ai";
import { UserProfile, UserRole, ScanResult } from "../types";

export interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

// Inicialización corregida para el entorno de producción
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAresResponse = async (history: ChatMessage[], user: UserProfile): Promise<string> => {
  const isFrancisco = user.role === UserRole.VP;
  const systemInstruction = `
    Eres ARES, el Asistente de Respuesta Estratégica del ZEUS CCE.
    Operador actual: ${user.name} (${user.role}).
    Ubicación Central: Medellín, Colombia (Valle de Aburrá).
    ${isFrancisco ? "AVISO: Francisco Anduaga (VP). Acceso ejecutivo total." : "Asiste al operador en tareas tácticas."}
    TONO: Militar, ultra-profesional, ejecutivo, directo.
    Responde siempre en español. No menciones lugares fuera de Colombia.
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: history.map(h => ({ 
        role: h.role === 'user' ? 'user' : 'model', 
        parts: h.parts 
      })),
      config: { 
        systemInstruction,
        temperature: 0.7
      }
    });
    return response.text || "Comando recibido. Sin respuesta del núcleo.";
  } catch (error) {
    console.error("ARES API Error:", error);
    return "Error de enlace táctico. Reintente en un momento.";
  }
};

export const generateRealisticLeads = async (context: string): Promise<ScanResult[]> => {
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Genera una lista de 5 objetivos de negocio realistas (estaciones de servicio, flotas o terrenos) en Medellín o Colombia. Contexto: "${context}".`,
      config: {
        temperature: 0.7,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              name: { type: Type.STRING },
              type: { type: Type.STRING },
              value: { type: Type.STRING },
              dist: { type: Type.STRING },
              term: { type: Type.STRING }
            },
            required: ["id", "name", "type", "value", "dist", "term"]
          }
        }
      }
    });
    return JSON.parse(response.text || '[]');
  } catch (e) {
    return [
      { id: 'C1', name: 'EDS Primax El Poblado', type: 'COMPETENCIA', value: '$2.8M', dist: '0.4km', term: '2025-08-15' },
      { id: 'C2', name: 'Logística Envigado Sur', type: 'B2B', value: '$950k', dist: '1.8km', term: '2024-12-10' }
    ];
  }
};

export const getAIInsights = async (prompt: string): Promise<string> => {
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: { temperature: 0.5 }
    });
    return response.text || "Evaluación finalizada.";
  } catch (e) {
    return "No se pudo generar el análisis.";
  }
};
