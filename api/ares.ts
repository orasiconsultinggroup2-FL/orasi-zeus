import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI, Type, GenerateContentResponse } from '@google/genai';

// Inicializa con la KEY SEGURA (backend)
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { history, user } = req.body as {
      history: { role: 'user' | 'model'; parts: { text: string }[] }[];
      user: { name: string; role: string };
    };

    const isFrancisco = user?.role === 'VP';
    const systemInstruction = `
      Eres ARES, el Asistente de Respuesta Estratégica del ZEUS CCE.
      Operador actual: ${user?.name} (${user?.role}).
      Ubicación Central: Medellín, Colombia (Valle de Aburrá).
      ${isFrancisco ? "AVISO: Francisco Anduaga (VP). Acceso ejecutivo total." : "Asiste al operador en tareas tácticas."}
      TONO: Militar, ultra-profesional, ejecutivo, directo.
      Responde siempre en español. No menciones lugares fuera de Colombia.
    `;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: history,
      config: { systemInstruction, temperature: 0.7 }
    });

    return res.status(200).json({ text: response.text || '' });
  } catch (e) {
    console.error('ARES API Error:', e);
    return res.status(500).json({ error: 'Error de enlace táctico' });
  }
}
