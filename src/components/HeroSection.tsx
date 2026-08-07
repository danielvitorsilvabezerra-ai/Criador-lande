import React, { useState } from 'react';
import {
  BookOpen,
  Sparkles,
  Volume2,
  Share2,
  Bell,
  CheckCircle,
  ArrowRight,
  Flame,
  VolumeX
} from 'lucide-react';
import { Devotional } from '../types';

interface HeroSectionProps {
  todayDevotional: Devotional;
  onStartNow: () => void;
  onOpenNotifications: () => void;
  streakDays: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  todayDevotional,
  onStartNow,
  onOpenNotifications,
  streakDays,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handlePlayVerseAudio = () => {
    if ('speechSynthesis' in window) {
      if (isPlayingAudio) {
        window.speechSynthesis.cancel();
        setIsPlayingAudio(false);
        return;
      }
      const utterance = new SpeechSynthesisUtterance(
        `${todayDevotional.verse.reference}. ${todayDevotional.verse.text}`
      );
      utterance.lang = 'pt-BR';
      utterance.rate = 0.95;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      setIsPlayingAudio(true);
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Seu navegador não suporta leitura em áudio.');
    }
  };

  return (
    <section className="relative overflow-hidden rounded-3xl my-4 sm:my-6 border border-slate-200/80 dark:border-slate-800 shadow-xl bg-slate-900 text-white">
      {/* Background Image with Warm Sunrise Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/open_bible_sunrise_1786127188773.jpg"
          alt="Bíblia aberta ao nascer do sol com café"
          className="w-full h-full object-cover object-center opacity-40 scale-105 transition-transform duration-1000 hover:scale-100"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-blue-950/70" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 py-12 sm:py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Callout Text */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-amber-400 animate-spin-slow" />
            <span>Devocional Diário do Dia</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span>{todayDevotional.date}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-sm">
            Transforme seus dias através da{' '}
            <span className="bg-gradient-to-r from-amber-300 via-amber-200 to-yellow-400 bg-clip-text text-transparent">
              Palavra de Deus.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-200 font-normal leading-relaxed max-w-2xl drop-shadow-xs">
            Receba um novo devocional todos os dias e fortaleça sua caminhada com Cristo. Meditação, oração, planos de leitura e notificações diárias no seu celular.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              id="btn-hero-start-now"
              onClick={onStartNow}
              className="px-6 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-2xl text-sm shadow-lg shadow-amber-500/20 flex items-center gap-2.5 transition transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <BookOpen className="w-5 h-5 text-slate-950" />
              <span>Começar Agora</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>

            <button
              id="btn-hero-notifications"
              onClick={onOpenNotifications}
              className="px-5 py-3.5 bg-white/10 hover:bg-white/20 text-white font-medium rounded-2xl text-sm backdrop-blur-md border border-white/15 flex items-center gap-2 transition cursor-pointer"
            >
              <Bell className="w-4 h-4 text-amber-300" />
              <span>Configurar Lembretes</span>
            </button>
          </div>

          {/* Highlights Row */}
          <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-300 border-t border-white/10">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-amber-400" />
              <span>Leitura diária em 4 minutos</span>
            </div>
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-400" />
              <span>{streakDays} dias de constância</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Assistente Teológico com IA</span>
            </div>
          </div>
        </div>

        {/* Right Daily Verse Feature Card */}
        <div className="lg:col-span-5">
          <div className="p-6 sm:p-7 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-amber-500/30 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Versículo de Hoje
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-md bg-amber-400/20 text-amber-300 font-mono font-medium">
                {todayDevotional.verse.translation}
              </span>
            </div>

            <blockquote className="text-base sm:text-lg font-serif italic text-slate-100 leading-relaxed border-l-2 border-amber-400 pl-4 py-1">
              "{todayDevotional.verse.text}"
            </blockquote>

            <div className="flex items-center justify-between pt-2">
              <span className="text-sm font-bold text-amber-300">
                — {todayDevotional.verse.reference}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePlayVerseAudio}
                  className={`p-2 rounded-xl text-xs font-medium transition flex items-center gap-1.5 ${
                    isPlayingAudio
                      ? 'bg-amber-500 text-slate-950 animate-pulse'
                      : 'bg-white/10 text-slate-200 hover:bg-white/20'
                  }`}
                  title="Ouvir áudio do versículo"
                >
                  {isPlayingAudio ? (
                    <>
                      <VolumeX className="w-4 h-4" />
                      <span>Pausar</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4 text-amber-300" />
                      <span>Ouvir</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
