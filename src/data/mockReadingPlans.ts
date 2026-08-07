import { ReadingPlan, Achievement } from '../types';

export const INITIAL_READING_PLANS: ReadingPlan[] = [
  {
    id: 'plan-365',
    title: 'Bíblia Completa em 365 Dias',
    description: 'Um plano equilibrado para ler toda a Palavra de Deus em um ano, com trechos diários do Antigo e Novo Testamento.',
    durationDays: 365,
    category: 'Geral',
    iconName: 'BookOpen',
    totalChapters: 1189,
    completedChapters: 42,
    days: Array.from({ length: 30 }, (_, i) => ({
      dayNumber: i + 1,
      title: `Dia ${i + 1}: Caminhada Bíblica`,
      readingReference: i === 0 ? 'Gênesis 1-3 & Mateus 1' : i === 1 ? 'Gênesis 4-7 & Mateus 2' : `Gênesis ${i * 3 + 1}-${i * 3 + 3} & Mateus ${i + 1}`,
      completed: i < 5
    }))
  },
  {
    id: 'plan-nt',
    title: 'Novo Testamento em 90 Dias',
    description: 'Mergulhe na vida de Jesus, na história da igreja primitiva e nas cartas apostólicas em 3 meses.',
    durationDays: 90,
    category: 'Novo Testamento',
    iconName: 'Sparkles',
    totalChapters: 260,
    completedChapters: 18,
    days: Array.from({ length: 15 }, (_, i) => ({
      dayNumber: i + 1,
      title: `Dia ${i + 1}: Vida de Cristo`,
      readingReference: `Mateus ${i * 2 + 1}-${i * 2 + 2}`,
      completed: i < 3
    }))
  },
  {
    id: 'plan-salmos-prov',
    title: 'Salmos & Provérbios em 30 Dias',
    description: 'Encontre sabedoria prática e consolo profundo nas orações de Davi e nos provérbios de Salomão.',
    durationDays: 30,
    category: 'Devocional',
    iconName: 'Heart',
    totalChapters: 181,
    completedChapters: 12,
    days: Array.from({ length: 30 }, (_, i) => ({
      dayNumber: i + 1,
      title: `Dia ${i + 1}: Sabedoria Diária`,
      readingReference: `Salmos ${i * 5 + 1}-${i * 5 + 5} & Provérbios ${i + 1}`,
      completed: i < 4
    }))
  },
  {
    id: 'plan-evangelhos',
    title: 'Os 4 Evangelhos em 40 Dias',
    description: 'Acompanhe os passos, milagres, parábolas e ensinamentos de Jesus pelos escritos de Mateus, Marcos, Lucas e João.',
    durationDays: 40,
    category: 'Evangelhos',
    iconName: 'Flame',
    totalChapters: 89,
    completedChapters: 8,
    days: Array.from({ length: 20 }, (_, i) => ({
      dayNumber: i + 1,
      title: `Dia ${i + 1}: Seguindo Jesus`,
      readingReference: `Marcos ${i + 1}`,
      completed: i < 2
    }))
  },
  {
    id: 'plan-oracao',
    title: 'Jornada de Oração & Jejum',
    description: '21 dias dedicados ao fortalecimento espiritual, quebra de correntes e busca da presença de Deus.',
    durationDays: 21,
    category: 'Oração',
    iconName: 'Cross',
    totalChapters: 21,
    completedChapters: 5,
    days: Array.from({ length: 21 }, (_, i) => ({
      dayNumber: i + 1,
      title: `Dia ${i + 1}: Clamor e Entrega`,
      readingReference: `Isaías ${58 + (i % 5)} & Daniel ${9 + (i % 3)}`,
      completed: i < 5
    }))
  },
  {
    id: 'plan-familia',
    title: 'Família Edificada',
    description: '10 dias de leituras focadas no amor, respeito, perdão e liderança cristã no ambiente familiar.',
    durationDays: 10,
    category: 'Família',
    iconName: 'User',
    totalChapters: 10,
    completedChapters: 2,
    days: Array.from({ length: 10 }, (_, i) => ({
      dayNumber: i + 1,
      title: `Dia ${i + 1}: Aliança e Paz`,
      readingReference: `Efésios ${5 + (i % 2)} & Colossenses 3`,
      completed: i < 2
    }))
  }
];

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach-7days',
    title: 'Iniciante Fiel',
    description: 'Concluiu devocionais por 7 dias consecutivos!',
    icon: 'Flame',
    requiredStreak: 7,
    unlockedAt: new Date().toISOString().split('T')[0],
    isUnlocked: true
  },
  {
    id: 'ach-30days',
    title: 'Guerreiro da Palavra',
    description: 'Manteve uma constância abençoada de 30 dias de leitura.',
    icon: 'Award',
    requiredStreak: 30,
    unlockedAt: null,
    isUnlocked: false
  },
  {
    id: 'ach-100days',
    title: 'Mestre da Meditação',
    description: '100 dias ininterruptos buscando a presença do Senhor!',
    icon: 'Crown',
    requiredStreak: 100,
    unlockedAt: null,
    isUnlocked: false
  },
  {
    id: 'ach-365days',
    title: 'Ano de Graça e Luz',
    description: 'Completou um ano inteiro de comunhão diária.',
    icon: 'Sparkles',
    requiredStreak: 365,
    unlockedAt: null,
    isUnlocked: false
  }
];
