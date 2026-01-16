
import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile, UserRole, ScanResult } from "../types";

export interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

// Inicialización del cliente AI siguiendo las guías de @google/genai
// Fix: Use process.env.API_KEY directly as a named parameter as required by the SDK guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAresResponse = async (history: ChatMessage[], user: UserProfile) => {
  const isFrancisco = user.role === UserRole.VP;
  const systemInstruction = `
    Eres ARES, el Asistente de Respuesta Estratégica del ZEUS CCE.
    Operador actual: ${user.name} (${user.role}).
    ${isFrancisco ? "AVISO: Francisco Anduaga (VP). Acceso ejecutivo total." : "Asiste al operador en tareas tácticas."}
    TONO: Militar, ultra-profesional, ejecutivo.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: history,
      config: { 
        systemInstruction,
        temperature: 0.5
      }
    });
    return response.text || "Comando recibido, sin respuesta textual.";
  } catch (error) {
    console.error("ARES API Error:", error);
    return "Enlace inestable. Operando bajo protocolo de contingencia local.";
  }
};

export const generateRealisticLeads = async (context: string): Promise<ScanResult[]> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Genera una lista de 5 objetivos de negocio realistas (estaciones de servicio, flotas o terrenos) para un radar de ventas de hidrocarburos. 
      Contexto de búsqueda: "${context}".
      Responde únicamente en formato JSON puro con esta estructura:
      [{ "id": "string", "name": "string", "type": "COMPETENCIA"|"PROPIA"|"B2B"|"EXPANSION", "value": "string", "dist": "string", "term": "YYYY-MM-DD" }]`,
      config: {
        temperature: 0.7,
        responseMimeType: "application/json"
      }
    });
    const text = response.text || '[]';
    return JSON.parse(text);
  } catch (e) {
    console.warn("Radar AI Offline, usando datos de reserva local.", e);
    return getDefaultLeads();
  }
};

const getDefaultLeads = (): ScanResult[] => [
  { id: 'F1', name: 'EDS Sector Primario (Reserva)', type: 'COMPETENCIA', value: '$1.4M', dist: '0.2km', term: '2025-01-01' },
  { id: 'F2', name: 'Terreno Expansión Local', type: 'EXPANSION', value: '$800k', dist: '1.5km', term: '2025-03-12' }
];

export const parseVoiceCommand = async (command: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Extrae la ubicación del comando de voz: "${command}". Responde solo con el lugar.`,
      config: { temperature: 0.1 }
    });
    return response.text?.trim() || command;
  } catch (e) {
    return command;
  }
};

export const getAIInsights = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: { temperature: 0.7 }
    });
    return response.text || "Evaluación completada.";
  } catch (e) {
    return "Error en evaluación AI. Consulte logs de sistema.";
  }
};
