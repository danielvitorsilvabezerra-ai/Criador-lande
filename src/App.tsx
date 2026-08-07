import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { DevotionalView } from './components/DevotionalView';
import { ReadingPlansSection } from './components/ReadingPlansSection';
import { PrayerWallSection } from './components/PrayerWallSection';
import { SpiritualJournalSection } from './components/SpiritualJournalSection';
import { AiBibleAssistant } from './components/AiBibleAssistant';
import { BibleExplorer } from './components/BibleExplorer';
import { ProfileModal } from './components/ProfileModal';
import { AdminPanel } from './components/AdminPanel';
import { ShareModal } from './components/ShareModal';
import { LegalModals } from './components/LegalModals';
import { Footer } from './components/Footer';

import { INITIAL_DEVOTIONALS } from './data/mockDevotionals';
import { INITIAL_READING_PLANS, INITIAL_ACHIEVEMENTS } from './data/mockReadingPlans';
import {
  UserProfile,
  Devotional,
  ReadingPlan,
  PrayerRequest,
  JournalEntry,
  Achievement,
  NotificationItem
} from './types';

export default function App() {
  // User Profile State
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('devocional_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return {
      id: 'usr-123',
      name: 'Daniel Vitor',
      email: 'danielvitorsilvabezerra@gmail.com',
      avatar: '',
      devotionalTime: '07:00',
      language: 'pt',
      theme: 'light',
      preferredTranslation: 'NVI',
      readingGoalMinutesPerDay: 15,
      streakDays: 7,
      lastCompletedDate: null,
      notificationsEnabled: true,
      activePlanId: 'plan-365',
      role: 'admin',
    };
  });

  // Theme Sync
  useEffect(() => {
    if (user.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('devocional_user', JSON.stringify(user));
  }, [user]);

  // Devotionals
  const [devotionals, setDevotionals] = useState<Devotional[]>(INITIAL_DEVOTIONALS);
  const [selectedDevotional, setSelectedDevotional] = useState<Devotional>(
    INITIAL_DEVOTIONALS[0]
  );

  // Favorites & Completed
  const [favorites, setFavorites] = useState<string[]>(['dev-001']);
  const [completedDevotionals, setCompletedDevotionals] = useState<string[]>([]);

  // Reading Plans
  const [readingPlans, setReadingPlans] = useState<ReadingPlan[]>(INITIAL_READING_PLANS);

  // Prayer Wall
  const [prayers, setPrayers] = useState<PrayerRequest[]>([
    {
      id: 'pr-1',
      userId: 'usr-123',
      title: 'Saúde e restauração da família',
      description: 'Pedindo pela recuperação física da minha avó e bênçãos no lar.',
      category: 'Saúde',
      createdAt: '2026-08-05',
      isAnswered: false,
    },
    {
      id: 'pr-2',
      userId: 'usr-123',
      title: 'Aprovação no novo emprego',
      description: 'Agradeço a Deus pois a porta de emprego abriu!',
      category: 'Trabalho',
      createdAt: '2026-08-01',
      isAnswered: true,
      answeredAt: '2026-08-06',
      testimony: 'Fiz a entrevista e fui contratado no dia seguinte! Glória a Deus!',
    },
  ]);

  // Spiritual Journal
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([
    {
      id: 'je-1',
      userId: 'usr-123',
      date: '2026-08-07',
      title: 'Meditação na Paz de Cristo',
      whatGodSpoke: 'Não ande ansioso por nada. Descanse no meu cuidado.',
      notes: 'No culto de domingo aprendemos sobre Filipenses 4:7. A oração com gratidão traz guarda para o coração.',
      revelations: 'A paz de Deus é uma guarda militar celestial para os sentimentos.',
      spiritualGoals: ['Orar 15min todos os dias de manhã', 'Ler 3 capítulos dos Salmos'],
      tags: ['Paz', 'Oração', 'Consolo'],
    },
  ]);

  // Achievements
  const [achievements, setAchievements] = useState<Achievement[]>(INITIAL_ACHIEVEMENTS);

  // Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'not-1',
      title: 'Hora do Devocional',
      message: 'Está na hora do seu encontro com Deus.',
      time: '07:00',
      read: false,
      type: 'reminder',
    },
    {
      id: 'not-2',
      title: 'Conquista Desbloqueada!',
      message: 'Você completou 7 dias consecutivos de devocional! 🔥',
      time: 'Ontem',
      read: true,
      type: 'streak',
    },
  ]);

  // App Modals & Navigation
  const [activeTab, setActiveTab] = useState<string>('devotional');
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [shareDevotional, setShareDevotional] = useState<Devotional | null>(null);
  const [legalModalType, setLegalModalType] = useState<
    'sobre' | 'contato' | 'privacidade' | 'termos' | null
  >(null);

  // Favorite toggle
  const handleToggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Completed toggle
  const handleToggleCompleted = (id: string) => {
    setCompletedDevotionals((prev) => {
      const isAlready = prev.includes(id);
      if (!isAlready) {
        // Increase streak if first completion of today
        setUser((u) => ({
          ...u,
          streakDays: u.streakDays + 1,
          lastCompletedDate: new Date().toISOString().split('T')[0],
        }));
        // Add streak notification
        setNotifications((n) => [
          {
            id: `not-${Date.now()}`,
            title: 'Devocional Concluído! 🎉',
            message: 'Que a Palavra frutifique em sua vida hoje.',
            time: 'Agora mesmo',
            read: false,
            type: 'streak',
          },
          ...n,
        ]);
        return [...prev, id];
      } else {
        return prev.filter((item) => item !== id);
      }
    });
  };

  // Toggle chapter in reading plan
  const handleTogglePlanChapter = (planId: string, dayNumber: number) => {
    setReadingPlans((prev) =>
      prev.map((plan) => {
        if (plan.id === planId) {
          const updatedDays = plan.days.map((day) => {
            if (day.dayNumber === dayNumber) {
              return { ...day, completed: !day.completed };
            }
            return day;
          });
          return { ...plan, days: updatedDays };
        }
        return plan;
      })
    );
  };

  // Test Notification simulation
  const handleTriggerTestNotification = (customMsg?: string) => {
    const messages = [
      'Está na hora do seu encontro com Deus.',
      'Separe alguns minutos para ouvir a voz do Senhor.',
      'Seu devocional de hoje já está disponível.',
      'Deus deseja falar com você hoje.',
    ];
    const msg = customMsg || messages[Math.floor(Math.random() * messages.length)];

    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Devocional Diário 📖',
      message: msg,
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      read: false,
      type: 'reminder',
    };

    setNotifications((prev) => [newNotif, ...prev]);

    // Native Browser Notification if permitted
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Devocional Diário', {
        body: msg,
        icon: '/favicon.ico',
      });
    } else if ('Notification' in window && Notification.permission !== 'denied') {
      Notification.requestPermission();
    }
  };

  // Add Prayer
  const handleAddPrayer = (newP: Omit<PrayerRequest, 'id' | 'createdAt' | 'isAnswered'>) => {
    const created: PrayerRequest = {
      ...newP,
      id: `pr-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      isAnswered: false,
    };
    setPrayers([created, ...prayers]);
  };

  const handleToggleAnsweredPrayer = (id: string, testimony?: string) => {
    setPrayers((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              isAnswered: true,
              answeredAt: new Date().toISOString().split('T')[0],
              testimony,
            }
          : p
      )
    );
  };

  const handleDeletePrayer = (id: string) => {
    setPrayers((prev) => prev.filter((p) => p.id !== id));
  };

  // Add Journal Entry
  const handleAddJournalEntry = (newEntry: Omit<JournalEntry, 'id' | 'userId'>) => {
    const created: JournalEntry = {
      ...newEntry,
      id: `je-${Date.now()}`,
      userId: user.id,
    };
    setJournalEntries([created, ...journalEntries]);
  };

  const handleDeleteJournalEntry = (id: string) => {
    setJournalEntries((prev) => prev.filter((e) => e.id !== id));
  };

  // Admin Actions
  const handleAddDevotional = (newDev: Devotional) => {
    setDevotionals([newDev, ...devotionals]);
    setSelectedDevotional(newDev);
  };

  const handleDeleteDevotional = (id: string) => {
    setDevotionals((prev) => prev.filter((d) => d.id !== id));
  };

  const handleBroadcastNotification = (title: string, message: string) => {
    const broadcast: NotificationItem = {
      id: `notif-${Date.now()}`,
      title,
      message,
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      read: false,
      type: 'broadcast',
    };
    setNotifications((prev) => [broadcast, ...prev]);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-amber-400 selection:text-slate-950 transition-colors duration-300">
      {/* Header */}
      <Header
        user={user}
        setUser={setUser}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        notifications={notifications}
        setNotifications={setNotifications}
        onOpenProfile={() => setShowProfileModal(true)}
        onOpenAdmin={() => setShowAdminModal(true)}
        onTestNotification={handleTriggerTestNotification}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-8">
        {/* Tab 1: Devocional Diário */}
        {activeTab === 'devotional' && (
          <>
            <HeroSection
              todayDevotional={selectedDevotional}
              onStartNow={() => {
                const el = document.getElementById('devotional-content-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenNotifications={() => setShowProfileModal(true)}
              streakDays={user.streakDays}
            />

            <div id="devotional-content-section">
              <DevotionalView
                devotional={selectedDevotional}
                allDevotionals={devotionals}
                onSelectDevotional={setSelectedDevotional}
                isFavorite={favorites.includes(selectedDevotional.id)}
                onToggleFavorite={handleToggleFavorite}
                isCompleted={completedDevotionals.includes(selectedDevotional.id)}
                onToggleCompleted={handleToggleCompleted}
                onShare={setShareDevotional}
              />
            </div>
          </>
        )}

        {/* Tab 2: Planos de Leitura */}
        {activeTab === 'plans' && (
          <ReadingPlansSection
            plans={readingPlans}
            onToggleChapter={handleTogglePlanChapter}
            onSelectActivePlan={(planId) => setUser({ ...user, activePlanId: planId })}
            activePlanId={user.activePlanId}
          />
        )}

        {/* Tab 3: Mural de Oração */}
        {activeTab === 'prayers' && (
          <PrayerWallSection
            prayers={prayers}
            onAddPrayer={handleAddPrayer}
            onToggleAnswered={handleToggleAnsweredPrayer}
            onDeletePrayer={handleDeletePrayer}
          />
        )}

        {/* Tab 4: Diário Espiritual */}
        {activeTab === 'journal' && (
          <SpiritualJournalSection
            entries={journalEntries}
            onAddEntry={handleAddJournalEntry}
            onDeleteEntry={handleDeleteJournalEntry}
          />
        )}

        {/* Tab 5: IA Bíblica Assistant */}
        {activeTab === 'assistant' && <AiBibleAssistant />}

        {/* Tab 6: Bíblia Explorer */}
        {activeTab === 'bible' && <BibleExplorer />}
      </main>

      {/* Footer */}
      <Footer onOpenLegalModal={(type) => setLegalModalType(type)} />

      {/* Modals */}
      <ProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        user={user}
        setUser={setUser}
        achievements={achievements}
        onTriggerTestNotification={handleTriggerTestNotification}
      />

      <AdminPanel
        isOpen={showAdminModal}
        onClose={() => setShowAdminModal(false)}
        devotionals={devotionals}
        onAddDevotional={handleAddDevotional}
        onDeleteDevotional={handleDeleteDevotional}
        onBroadcastNotification={handleBroadcastNotification}
      />

      <ShareModal
        devotional={shareDevotional}
        onClose={() => setShareDevotional(null)}
      />

      <LegalModals
        modalType={legalModalType}
        onClose={() => setLegalModalType(null)}
      />
    </div>
  );
}
