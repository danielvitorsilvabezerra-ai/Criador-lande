import React, { useState } from 'react';
import {
  BookOpen,
  Bell,
  Sun,
  Moon,
  User,
  Flame,
  ShieldCheck,
  Search,
  Cross,
  CheckCircle2,
  Volume2
} from 'lucide-react';
import { UserProfile, NotificationItem } from '../types';

interface HeaderProps {
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  notifications: NotificationItem[];
  setNotifications: React.Dispatch<React.SetStateAction<NotificationItem[]>>;
  onOpenProfile: () => void;
  onOpenAdmin: () => void;
  onTestNotification: (msg?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  setUser,
  activeTab,
  setActiveTab,
  notifications,
  setNotifications,
  onOpenProfile,
  onOpenAdmin,
  onTestNotification,
}) => {
  const [showNotificationsPopover, setShowNotificationsPopover] = useState(false);

  const toggleTheme = () => {
    setUser((prev) => ({
      ...prev,
      theme: prev.theme === 'light' ? 'dark' : 'light',
    }));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const navItems = [
    { id: 'devotional', label: 'Devocional Diário', icon: BookOpen },
    { id: 'plans', label: 'Planos de Leitura', icon: CheckCircle2 },
    { id: 'prayers', label: 'Mural de Oração', icon: Cross },
    { id: 'journal', label: 'Diário Espiritual', icon: User },
    { id: 'assistant', label: 'IA Bíblica', icon: Volume2 },
    { id: 'bible', label: 'Bíblia', icon: Search },
  ];

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-white/90 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 transition-colors shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          className="flex items-center gap-2.5 cursor-pointer group"
          onClick={() => setActiveTab('devotional')}
        >
          <div className="w-9 h-9 rounded-xl bg-devocional flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
            <Cross className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100">
              Devocional<span className="gold-text italic font-serif ml-0.5">Diário</span>
            </span>
          </div>
        </div>

        {/* Navigation Tabs (Desktop) */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-100/90 dark:bg-slate-800/90 p-1.5 rounded-full border border-slate-200/60 dark:border-slate-700/60">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-tab-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all ${
                  isActive
                    ? 'bg-[#2B5A91] text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-[#2B5A91] dark:hover:text-amber-300 hover:bg-slate-200/60 dark:hover:bg-slate-700/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-300' : ''}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Streak Counter */}
          <div
            onClick={onOpenProfile}
            className="flex items-center gap-1.5 px-3 py-1 streak-badge rounded-full text-xs font-bold uppercase tracking-wider cursor-pointer hover:opacity-90 transition shadow-xs"
            title="Sua sequência atual de dias de devocional!"
          >
            <Flame className="w-3.5 h-3.5 text-amber-500 animate-pulse fill-amber-500" />
            <span>{user.streakDays} DIAS SEGUIDOS</span>
          </div>

          {/* Theme Toggle */}
          <button
            id="btn-theme-toggle"
            onClick={toggleTheme}
            className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition"
            title="Alternar modo claro / escuro"
          >
            {user.theme === 'light' ? (
              <Moon className="w-4 h-4 text-indigo-700" />
            ) : (
              <Sun className="w-4 h-4 text-amber-400" />
            )}
          </button>

          {/* Notification Bell */}
          <div className="relative">
            <button
              id="btn-notifications-bell"
              onClick={() => setShowNotificationsPopover(!showNotificationsPopover)}
              className="relative p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition"
              title="Notificações"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-amber-500 rounded-full ring-2 ring-white dark:ring-slate-900 animate-ping" />
              )}
            </button>

            {/* Notifications Popover */}
            {showNotificationsPopover && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-4 z-50 text-slate-800 dark:text-slate-100 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-blue-700 dark:text-amber-400" />
                    <h4 className="font-semibold text-sm">Lembretes & Notificações</h4>
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-xs text-blue-700 dark:text-amber-400 hover:underline font-medium"
                    >
                      Marcar lidas
                    </button>
                  )}
                </div>

                <div className="max-h-64 overflow-y-auto my-2 space-y-2 pr-1">
                  {notifications.length === 0 ? (
                    <p className="text-xs text-slate-500 dark:text-slate-400 text-center py-6">
                      Nenhuma notificação recente.
                    </p>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        className={`p-2.5 rounded-xl text-xs transition ${
                          n.read
                            ? 'bg-slate-50 dark:bg-slate-800/40 text-slate-600 dark:text-slate-400'
                            : 'bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900 text-slate-800 dark:text-slate-200'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-semibold text-blue-900 dark:text-amber-300">
                            {n.title}
                          </span>
                          <span className="text-[10px] text-slate-400">{n.time}</span>
                        </div>
                        <p className="leading-snug">{n.message}</p>
                      </div>
                    ))
                  )}
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-1.5">
                  <button
                    onClick={() => {
                      onTestNotification();
                    }}
                    className="w-full py-1.5 px-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold rounded-xl text-xs transition flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <Bell className="w-3.5 h-3.5" />
                    Simular Notificação Push de Hoje
                  </button>
                  <p className="text-[10px] text-slate-400 text-center">
                    Horário escolhido: <strong className="text-slate-700 dark:text-slate-300">{user.devotionalTime}</strong>
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Admin Panel Button */}
          {user.role === 'admin' && (
            <button
              id="btn-admin-panel"
              onClick={onOpenAdmin}
              className="p-2 text-indigo-700 dark:text-amber-400 hover:bg-indigo-50 dark:hover:bg-slate-800 rounded-full transition"
              title="Painel Administrativo"
            >
              <ShieldCheck className="w-4 h-4" />
            </button>
          )}

          {/* User Profile Avatar */}
          <button
            id="btn-user-profile"
            onClick={onOpenProfile}
            className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-700 to-amber-500 flex items-center justify-center text-white font-bold text-xs shadow-xs">
              {user.name.charAt(0)}
            </div>
            <span className="hidden sm:inline text-xs font-medium text-slate-700 dark:text-slate-200 max-w-[80px] truncate">
              {user.name.split(' ')[0]}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Nav Bar */}
      <div className="lg:hidden flex items-center justify-around border-t border-slate-200/60 dark:border-slate-800 py-2 bg-white dark:bg-slate-900 px-2 overflow-x-auto gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg text-[11px] whitespace-nowrap transition ${
                isActive
                  ? 'text-blue-800 dark:text-amber-400 font-bold bg-blue-50 dark:bg-slate-800'
                  : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
