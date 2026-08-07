export type ThemeMode = 'light' | 'dark';

export type BibleTranslation = 'NVI' | 'NTLH' | 'ARC' | 'AA';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  devotionalTime: string; // e.g. "07:00"
  secondaryDevotionalTime?: string;
  language: 'pt' | 'en' | 'es';
  theme: ThemeMode;
  preferredTranslation: BibleTranslation;
  readingGoalMinutesPerDay: number;
  streakDays: number;
  lastCompletedDate: string | null;
  notificationsEnabled: boolean;
  activePlanId: string | null;
  role: 'user' | 'admin';
}

export interface Devotional {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  category: 'Fé' | 'Oração' | 'Esperança' | 'Amor' | 'Sabedoria' | 'Família' | 'Propósito' | 'Paz';
  verse: {
    text: string;
    reference: string;
    translation: BibleTranslation;
  };
  context: string;
  explanation: string;
  practicalApplication: string;
  reflectionQuestion: string;
  dailyChallenge: string;
  closingPrayer: string;
  author: string;
  readingTimeMinutes: number;
  audioUrl?: string;
  likesCount: number;
  isPublished: boolean;
}

export interface ReadingPlan {
  id: string;
  title: string;
  description: string;
  durationDays: number;
  category: string;
  iconName: string;
  totalChapters: number;
  completedChapters: number;
  days: {
    dayNumber: number;
    title: string;
    readingReference: string;
    completed: boolean;
    devotionalRefId?: string;
  }[];
}

export interface PrayerRequest {
  id: string;
  userId: string;
  title: string;
  description: string;
  category: 'Família' | 'Saúde' | 'Espiritual' | 'Finanças' | 'Trabalho' | 'Relacionamentos' | 'Outros';
  createdAt: string;
  isAnswered: boolean;
  answeredAt?: string;
  testimony?: string;
}

export interface JournalEntry {
  id: string;
  userId: string;
  date: string;
  title: string;
  whatGodSpoke: string;
  notes: string;
  revelations: string;
  spiritualGoals: string[];
  tags: string[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  requiredStreak: number;
  unlockedAt: string | null;
  isUnlocked: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'reminder' | 'streak' | 'broadcast' | 'prayer';
}

export interface BibleVerse {
  book: string;
  chapter: number;
  verse: number;
  text: string;
  translation: BibleTranslation;
}
