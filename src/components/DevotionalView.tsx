import React, { useState } from 'react';
import {
  Heart,
  Share2,
  CheckCircle2,
  Volume2,
  BookOpen,
  Sparkles,
  MessageSquare,
  Send,
  HelpCircle,
  Award,
  Calendar,
  UserCheck,
  ChevronRight,
  Flame,
  Loader2
} from 'lucide-react';
import { Devotional, BibleTranslation } from '../types';

interface DevotionalViewProps {
  devotional: Devotional;
  allDevotionals: Devotional[];
  onSelectDevotional: (dev: Devotional) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  isCompleted: boolean;
  onToggleCompleted: (id: string) => void;
  onShare: (dev: Devotional) => void;
}

export const DevotionalView: React.FC<DevotionalViewProps> = ({
  devotional,
  allDevotionals,
  onSelectDevotional,
  isFavorite,
  onToggleFavorite,
  isCompleted,
  onToggleCompleted,
  onShare,
}) => {
  const [selectedTranslation, setSelectedTranslation] = useState<BibleTranslation>(
    devotional.verse.translation || 'NVI'
  );
  const [userReflectionNote, setUserReflectionNote] = useState('');
  const [savedReflections, setSavedReflections] = useState<
    { id: string; text: string; date: string; author: string }[]
  >([
    {
      id: 'ref-1',
      text: 'Esta leitura reforçou meu coração sobre não ter medo do amanhã.',
      date: 'Hoje às 08:30',
      author: 'Maria Clara',
    },
    {
      id: 'ref-2',
      text: 'Entregar minhas ansiedades tem sido um aprendizado diário.',
      date: 'Ontem às 19:15',
      author: 'João Pedro',
    },
  ]);
  const [isLoadingTts, setIsLoadingTts] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handleAddReflection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userReflectionNote.trim()) return;
    const newRef = {
      id: `ref-${Date.now()}`,
      text: userReflectionNote.trim(),
      date: 'Agora mesmo',
      author: 'Você',
    };
    setSavedReflections([newRef, ...savedReflections]);
    setUserReflectionNote('');
  };

  const handlePlayAudioDevotional = async () => {
    if (isPlayingAudio) {
      window.speechSynthesis?.cancel();
      setIsPlayingAudio(false);
      return;
    }

    setIsLoadingTts(true);
    const fullTextToRead = `Devocional: ${devotional.title}. Versículo principal de ${devotional.verse.reference}: ${devotional.verse.text}. Explicação: ${devotional.explanation}. Aplicação prática: ${devotional.practicalApplication}. Oração final: ${devotional.closingPrayer}`;

    try {
      // Try Gemini Server-side TTS endpoint first
      const response = await fetch('/api/gemini/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: fullTextToRead }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.audioBase64) {
          const audio = new Audio(`data:audio/mp3;base64,${data.audioBase64}`);
          setIsLoadingTts(false);
          setIsPlayingAudio(true);
          audio.play();
          audio.onended = () => setIsPlayingAudio(false);
          audio.onerror = () => {
            fallbackSpeechSynthesis(fullTextToRead);
          };
          return;
        }
      }
      fallbackSpeechSynthesis(fullTextToRead);
    } catch {
      fallbackSpeechSynthesis(fullTextToRead);
    } finally {
      setIsLoadingTts(false);
    }
  };

  const fallbackSpeechSynthesis = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      utterance.rate = 0.95;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      setIsPlayingAudio(true);
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Aúdio indisponível no dispositivo.');
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Devotional Date & Selection Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 flex items-center justify-center font-bold">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Devocionais Recentes
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Escolha uma mensagem para meditar
            </p>
          </div>
        </div>

        {/* Devotional Selector Pills */}
        <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1 sm:pb-0">
          {allDevotionals.map((item) => {
            const isSelected = item.id === devotional.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectDevotional(item)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  isSelected
                    ? 'bg-blue-800 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {item.date} • {item.category}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Devotional Card */}
      <article className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 card-shadow overflow-hidden">
        {/* Top Header Banner */}
        <div className="p-6 sm:p-10 bg-devocional text-white relative">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-bold uppercase tracking-wider">
              {devotional.category}
            </span>
            <div className="flex items-center gap-3 text-xs text-slate-200">
              <span>{devotional.readingTimeMinutes} min de leitura</span>
              <span>•</span>
              <span>Por {devotional.author}</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-snug mb-4">
            {devotional.title}
          </h1>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onToggleCompleted(devotional.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-xs cursor-pointer ${
                isCompleted
                  ? 'bg-emerald-600 text-white'
                  : 'bg-amber-500 hover:bg-amber-400 text-slate-950'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isCompleted ? 'Concluído Hoje!' : 'Marcar como Concluído'}</span>
            </button>

            <button
              onClick={handlePlayAudioDevotional}
              disabled={isLoadingTts}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 border border-white/20 cursor-pointer ${
                isPlayingAudio
                  ? 'bg-amber-500 text-slate-950 animate-pulse'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              {isLoadingTts ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Volume2 className="w-4 h-4 text-amber-300" />
              )}
              <span>{isPlayingAudio ? 'Pausar Áudio' : 'Ouvir Devocional em Áudio'}</span>
            </button>

            <button
              onClick={() => onToggleFavorite(devotional.id)}
              className={`p-2.5 rounded-xl border transition cursor-pointer ${
                isFavorite
                  ? 'bg-rose-500/20 border-rose-500 text-rose-400'
                  : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
              }`}
              title="Favoritar devocional"
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-400' : ''}`} />
            </button>

            <button
              onClick={() => onShare(devotional)}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white transition cursor-pointer"
              title="Compartilhar"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Devotional Body Sections */}
        <div className="p-6 sm:p-10 space-y-8 text-slate-800 dark:text-slate-200">
          {/* Section 1: Key Verse & Translation Selector */}
          <section className="bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 rounded-2xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" /> Versículo Principal
              </h3>
              {/* Translation Pills */}
              <div className="flex items-center gap-1 bg-white dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700">
                {(['NVI', 'NTLH', 'ARC', 'AA'] as BibleTranslation[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedTranslation(t)}
                    className={`px-2 py-0.5 text-[10px] font-bold rounded transition ${
                      selectedTranslation === t
                        ? 'bg-blue-800 text-white'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <blockquote className="text-xl sm:text-2xl font-serif italic text-slate-900 dark:text-slate-100 leading-relaxed border-l-4 border-amber-500 pl-4 py-1">
              "{devotional.verse.text}"
            </blockquote>
            <p className="text-sm font-bold text-amber-700 dark:text-amber-400 text-right">
              — {devotional.verse.reference} ({selectedTranslation})
            </p>
          </section>

          {/* Section 2: Contexto Bíblico */}
          <section className="space-y-3">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-700 dark:text-amber-400" />
              Contexto Bíblico
            </h3>
            <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
              {devotional.context}
            </p>
          </section>

          {/* Section 3: Explicação Profunda */}
          <section className="space-y-3">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-700 dark:text-amber-400" />
              Explicação da Palavra
            </h3>
            <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300 whitespace-pre-line">
              {devotional.explanation}
            </p>
          </section>

          {/* Section 4: Aplicação Prática */}
          <section className="bg-blue-50/60 dark:bg-slate-800/60 border border-blue-100 dark:border-slate-700 rounded-2xl p-6 space-y-3">
            <h3 className="text-lg font-bold text-blue-900 dark:text-blue-300 flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-blue-700 dark:text-amber-400" />
              Aplicação Prática para Hoje
            </h3>
            <p className="text-sm sm:text-base leading-relaxed text-slate-800 dark:text-slate-200">
              {devotional.practicalApplication}
            </p>
          </section>

          {/* Section 5: Pergunta para Reflexão & Desafio do Dia */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4" /> Pergunta para Reflexão
              </span>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                {devotional.reflectionQuestion}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400 flex items-center gap-1.5">
                <Flame className="w-4 h-4" /> Desafio Prático do Dia
              </span>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                {devotional.dailyChallenge}
              </p>
            </div>
          </div>

          {/* Section 6: Oração Final */}
          <section className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white space-y-3 shadow-lg">
            <h3 className="text-base font-bold text-amber-300 flex items-center gap-2 uppercase tracking-wider text-xs">
              <Sparkles className="w-4 h-4 text-amber-400" /> Oração Final
            </h3>
            <p className="text-base sm:text-lg font-serif italic leading-relaxed text-slate-100">
              "{devotional.closingPrayer}"
            </p>
          </section>

          {/* Reflection & Community Notes */}
          <section className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-700 dark:text-amber-400" />
                Sua Reflexão & Comunidade
              </h3>
              <span className="text-xs text-slate-500">
                {savedReflections.length} reflexões salvas
              </span>
            </div>

            {/* Reflection Input Form */}
            <form onSubmit={handleAddReflection} className="space-y-3">
              <textarea
                value={userReflectionNote}
                onChange={(e) => setUserReflectionNote(e.target.value)}
                placeholder="Escreva aqui o que Deus falou ao seu coração durante este devocional..."
                rows={3}
                className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-700 dark:focus:ring-amber-400 text-slate-900 dark:text-slate-100"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-800 hover:bg-blue-700 text-white font-semibold rounded-xl text-xs flex items-center gap-2 transition cursor-pointer shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Salvar Reflexão</span>
                </button>
              </div>
            </form>

            {/* Saved Reflections Feed */}
            <div className="space-y-3">
              {savedReflections.map((ref) => (
                <div
                  key={ref.id}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 space-y-1.5 text-xs"
                >
                  <div className="flex justify-between items-center text-slate-500 dark:text-slate-400">
                    <span className="font-bold text-blue-900 dark:text-amber-300">
                      {ref.author}
                    </span>
                    <span>{ref.date}</span>
                  </div>
                  <p className="text-slate-800 dark:text-slate-200 text-sm leading-relaxed">
                    {ref.text}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </article>
    </div>
  );
};
