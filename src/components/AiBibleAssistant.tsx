import React, { useState } from 'react';
import {
  Sparkles,
  Send,
  BookOpen,
  HelpCircle,
  Loader2,
  Bot,
  User,
  Copy,
  Check,
  Volume2
} from 'lucide-react';

export const AiBibleAssistant: React.FC = () => {
  const [messages, setMessages] = useState<
    { sender: 'user' | 'ai'; text: string; time: string }[]
  >([
    {
      sender: 'ai',
      text: 'Olá! Sou o seu Assistente Teológico e Bíblico com Inteligência Artificial do Devocional Diário. Como posso lhe ajudar hoje? Você pode me fazer perguntas teológicas, pedir explicações de passagens bíblicas ou buscar orientação sobre temas específicos.',
      time: 'Agora mesmo',
    },
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const suggestedQuestions = [
    'O que a Bíblia ensina sobre como superar a ansiedade?',
    'Qual é o contexto teológico de Romanos 8:28?',
    'Como praticar o perdão com quem nos magoou profundamente?',
    'O que Jesus ensinou sobre as orações nas Montanhas?',
  ];

  const handleSendQuery = async (queryText?: string) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim() || isLoading) return;

    const userMsg = {
      sender: 'user' as const,
      text: textToSend.trim(),
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/gemini/qa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: textToSend.trim() }),
      });

      if (response.ok) {
        const data = await response.json();
        const aiMsg = {
          sender: 'ai' as const,
          text: data.answer || 'Desculpe, não consegui elaborar a resposta.',
          time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, aiMsg]);
      } else {
        const errData = await response.json().catch(() => ({}));
        setMessages((prev) => [
          ...prev,
          {
            sender: 'ai',
            text: errData.error || 'Não foi possível conectar ao assistente no momento.',
            time: 'Erro',
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: 'Falha na conexão com o servidor. Tente novamente em instantes.',
          time: 'Erro',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyText = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Banner Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30 uppercase tracking-widest inline-flex items-center gap-1.5 mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Inteligência Artificial Bíblica
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Perguntas & Respostas sobre a Bíblia
          </h1>
          <p className="text-sm text-slate-300 max-w-xl mt-1">
            Tire dúvidas teológicas, busque versículos de consolo e aprofunde seu entendimento da Palavra com auxílio de IA server-side.
          </p>
        </div>
      </div>

      {/* Suggested Quick Questions */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Sugestões de perguntas:</span>
        {suggestedQuestions.map((q, i) => (
          <button
            key={i}
            onClick={() => handleSendQuery(q)}
            className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-blue-800 hover:text-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium transition cursor-pointer border border-slate-200 dark:border-slate-700"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Chat Messages Container */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden flex flex-col h-[550px]">
        {/* Messages Feed */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.map((msg, index) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={index}
                className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {/* Avatar */}
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                    isUser
                      ? 'bg-blue-800 text-white'
                      : 'bg-gradient-to-tr from-amber-500 to-amber-600 text-slate-950 shadow-xs'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-5 h-5" />}
                </div>

                {/* Message Bubble */}
                <div
                  className={`max-w-[85%] sm:max-w-[75%] p-4 rounded-2xl space-y-1.5 text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? 'bg-blue-800 text-white rounded-tr-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-tl-xs border border-slate-200/80 dark:border-slate-700/80'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 border-b border-black/5 dark:border-white/5 pb-1 text-[10px] opacity-70">
                    <span className="font-bold">{isUser ? 'Você' : 'Assistente Devocional IA'}</span>
                    <span>{msg.time}</span>
                  </div>

                  <p className="whitespace-pre-line">{msg.text}</p>

                  {!isUser && (
                    <div className="flex justify-end pt-1">
                      <button
                        onClick={() => handleCopyText(msg.text, index)}
                        className="p-1 rounded text-[10px] flex items-center gap-1 opacity-70 hover:opacity-100 transition"
                      >
                        {copiedIndex === index ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-500" />
                            <span>Copiado!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copiar</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl w-fit animate-pulse">
              <Loader2 className="w-4 h-4 animate-spin text-amber-500" />
              <span>Consultando teologia bíblica com IA...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendQuery();
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Digite sua dúvida bíblica (ex: Como perdoar quem me feriu?)"
              className="flex-1 p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-700"
            />
            <button
              type="submit"
              disabled={isLoading || !inputQuery.trim()}
              className="px-5 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-2xl text-xs flex items-center gap-1.5 transition cursor-pointer shadow-md disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Perguntar</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
