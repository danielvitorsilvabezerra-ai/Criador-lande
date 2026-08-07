import React, { useState } from 'react';
import {
  User,
  Bell,
  Clock,
  Globe,
  Sun,
  Moon,
  Flame,
  Award,
  Crown,
  Sparkles,
  Target,
  CheckCircle2,
  Shield,
  Save
} from 'lucide-react';
import { UserProfile, Achievement } from '../types';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  achievements: Achievement[];
  onTriggerTestNotification: (customMsg?: string) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  user,
  setUser,
  achievements,
  onTriggerTestNotification,
}) => {
  const [devotionalTime, setDevotionalTime] = useState(user.devotionalTime);
  const [language, setLanguage] = useState(user.language);
  const [theme, setTheme] = useState(user.theme);
  const [goalMinutes, setGoalMinutes] = useState(user.readingGoalMinutesPerDay);
  const [notificationsEnabled, setNotificationsEnabled] = useState(user.notificationsEnabled);
  const [savedSuccessMessage, setSavedSuccessMessage] = useState(false);

  if (!isOpen) return null;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setUser((prev) => ({
      ...prev,
      devotionalTime,
      language,
      theme,
      readingGoalMinutesPerDay: goalMinutes,
      notificationsEnabled,
    }));
    setSavedSuccessMessage(true);
    setTimeout(() => setSavedSuccessMessage(false), 2500);
  };

  const motivationMessages = [
    'Está na hora do seu encontro com Deus.',
    'Separe alguns minutos para ouvir a voz do Senhor.',
    'Seu devocional de hoje já está disponível.',
    'Deus deseja falar com você hoje.',
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6 my-8">
        {/* Header */}
        <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-700 to-amber-500 text-white font-extrabold text-lg flex items-center justify-center shadow-md">
              {user.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
                Perfil Espiritual & Configurações
              </h2>
              <p className="text-xs text-slate-500">{user.email}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-base font-bold p-2"
          >
            ✕
          </button>
        </div>

        {/* Streak & Achievements Bar */}
        <div className="p-5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-amber-800 dark:text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-amber-500 animate-pulse" /> Sequência de Constância
            </span>
            <span className="text-base font-extrabold text-amber-900 dark:text-amber-300">
              {user.streakDays} Dias Seguidos!
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
            {achievements.map((ach) => (
              <div
                key={ach.id}
                className={`p-2.5 rounded-xl border text-center space-y-1 transition ${
                  ach.isUnlocked
                    ? 'bg-white dark:bg-slate-800 border-amber-400 text-amber-900 dark:text-amber-300 shadow-xs'
                    : 'bg-slate-100/50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-700 text-slate-400'
                }`}
              >
                <div className="text-lg">
                  {ach.icon === 'Flame' ? '🔥' : ach.icon === 'Award' ? '🎖️' : ach.icon === 'Crown' ? '👑' : '✨'}
                </div>
                <h4 className="text-[11px] font-bold truncate">{ach.title}</h4>
                <p className="text-[9px]">{ach.requiredStreak} dias</p>
              </div>
            ))}
          </div>
        </div>

        {/* Settings Form */}
        <form onSubmit={handleSaveProfile} className="space-y-5 text-xs">
          {/* Horário do Devocional & Metas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-blue-700 dark:text-amber-400" />
                Horário Escolhido do Devocional
              </label>
              <input
                type="time"
                value={devotionalTime}
                onChange={(e) => setDevotionalTime(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
                <Target className="w-4 h-4 text-blue-700 dark:text-amber-400" />
                Meta Diária de Leitura (minutos)
              </label>
              <input
                type="number"
                min={1}
                max={120}
                value={goalMinutes}
                onChange={(e) => setGoalMinutes(Number(e.target.value))}
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 focus:outline-none"
              />
            </div>
          </div>

          {/* Idioma & Tema */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-blue-700 dark:text-amber-400" />
                Idioma da Aplicação
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as any)}
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 focus:outline-none"
              >
                <option value="pt">Português (Brasil)</option>
                <option value="en">English</option>
                <option value="es">Español</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
                {theme === 'light' ? (
                  <Sun className="w-4 h-4 text-amber-500" />
                ) : (
                  <Moon className="w-4 h-4 text-indigo-400" />
                )}
                Aparência (Tema)
              </label>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value as any)}
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 focus:outline-none"
              >
                <option value="light">Tema Claro</option>
                <option value="dark">Tema Escuro</option>
              </select>
            </div>
          </div>

          {/* Push Notifications Settings */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-amber-500" />
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 text-xs">
                    Notificações Push no Celular
                  </h4>
                  <p className="text-[10px] text-slate-500">
                    Lembretes diários no horário escolhido ({devotionalTime})
                  </p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={notificationsEnabled}
                onChange={(e) => setNotificationsEnabled(e.target.checked)}
                className="w-4 h-4 rounded text-blue-800 focus:ring-blue-800 cursor-pointer"
              />
            </div>

            {/* Test Push Messages Bar */}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
              <span className="block text-[10px] font-bold text-slate-600 dark:text-slate-400 mb-1.5">
                Testar Mensagens Motivacionais Push:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {motivationMessages.map((msg, i) => (
                  <button
                    type="button"
                    key={i}
                    onClick={() => onTriggerTestNotification(msg)}
                    className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px] text-blue-900 dark:text-amber-300 font-medium hover:bg-amber-100 dark:hover:bg-amber-950 transition cursor-pointer"
                  >
                    "{msg}"
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex items-center justify-between pt-2">
            {savedSuccessMessage ? (
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Alterações salvas com sucesso!
              </span>
            ) : (
              <span className="text-[10px] text-slate-400">Suas preferências são salvas no seu navegador.</span>
            )}

            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-800 hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center gap-2 transition cursor-pointer shadow-xs"
            >
              <Save className="w-4 h-4" />
              <span>Salvar Perfil</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
