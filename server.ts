import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini AI Client
  const getAiClient = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn('GEMINI_API_KEY is not defined in process.env');
    }
    return new GoogleGenAI({
      apiKey: apiKey || '',
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  };

  // 1. Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // 2. AI Biblical Question Answering
  app.post('/api/gemini/qa', async (req, res) => {
    try {
      const { question } = req.body;
      if (!question || typeof question !== 'string') {
        return res.status(400).json({ error: 'Pergunta é obrigatória.' });
      }

      const ai = getAiClient();
      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: `Você é um sábio, acolhedor e teologicamente fundamentado assistente de estudos bíblicos chamado "Assistente Devocional Diário". 
Responda em português fluente à seguinte pergunta do usuário com empatia, versículos bíblicos relevantes e explicação prática para a vida cristã diária.

Pergunta do usuário: "${question}"`,
        config: {
          systemInstruction: 'Sempre forneça referências bíblicas claras (e.g. João 3:16) e mantenha um tom de encorajamento, paz e sabedoria cristã.',
          temperature: 0.7,
        },
      });

      return res.json({ answer: response.text });
    } catch (error: any) {
      console.error('Erro na API Gemini QA:', error);
      return res.status(500).json({
        error: 'Não foi possível consultar a IA no momento. Verifique sua chave de API do Gemini.',
        details: error?.message,
      });
    }
  });

  // 3. AI Custom Devotional Generator
  app.post('/api/gemini/devotional', async (req, res) => {
    try {
      const { topic } = req.body;
      if (!topic || typeof topic !== 'string') {
        return res.status(400).json({ error: 'Tema é obrigatório.' });
      }

      const ai = getAiClient();
      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: `Gere um devocional bíblico completo e inspirador em português sobre o tema: "${topic}".`,
        config: {
          systemInstruction: 'Gere um objeto JSON estruturado com versículo, contexto histórico/teológico, explicação, aplicação prática, pergunta para reflexão, desafio do dia e oração final.',
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              category: { type: Type.STRING },
              verse: {
                type: Type.OBJECT,
                properties: {
                  text: { type: Type.STRING },
                  reference: { type: Type.STRING },
                  translation: { type: Type.STRING },
                },
                required: ['text', 'reference'],
              },
              context: { type: Type.STRING },
              explanation: { type: Type.STRING },
              practicalApplication: { type: Type.STRING },
              reflectionQuestion: { type: Type.STRING },
              dailyChallenge: { type: Type.STRING },
              closingPrayer: { type: Type.STRING },
              author: { type: Type.STRING },
            },
            required: ['title', 'category', 'verse', 'context', 'explanation', 'practicalApplication', 'reflectionQuestion', 'dailyChallenge', 'closingPrayer'],
          },
        },
      });

      const jsonText = response.text || '{}';
      const data = JSON.parse(jsonText);
      return res.json({ devotional: data });
    } catch (error: any) {
      console.error('Erro ao gerar devocional com Gemini:', error);
      return res.status(500).json({ error: 'Falha ao gerar devocional.', details: error?.message });
    }
  });

  // 4. Gemini TTS Speech Audio Generation
  app.post('/api/gemini/tts', async (req, res) => {
    try {
      const { text } = req.body;
      if (!text || typeof text !== 'string') {
        return res.status(400).json({ error: 'Texto é obrigatório para áudio.' });
      }

      const ai = getAiClient();
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-tts-preview',
        contents: [{ parts: [{ text: `Leia em português do Brasil com tom calmo, acolhedor e inspirador: ${text.slice(0, 400)}` }] }],
        config: {
          responseModalities: ['AUDIO' as any],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Zephyr' },
            },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        return res.json({ audioBase64: base64Audio });
      } else {
        return res.status(500).json({ error: 'Áudio não gerado pela API.' });
      }
    } catch (error: any) {
      console.error('Erro no TTS Gemini:', error);
      return res.status(500).json({ error: 'Falha na geração de áudio por voz.', details: error?.message });
    }
  });

  // 5. Broadcast Push Notification Endpoint
  app.post('/api/notifications/send', (req, res) => {
    const { title, message } = req.body;
    res.json({
      success: true,
      deliveredCount: 1,
      notification: {
        id: `notif-${Date.now()}`,
        title: title || 'Devocional Diário',
        message: message || 'Está na hora do seu encontro com Deus.',
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        read: false,
        type: 'broadcast',
      },
    });
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server devocional running at http://localhost:${PORT}`);
  });
}

startServer();
