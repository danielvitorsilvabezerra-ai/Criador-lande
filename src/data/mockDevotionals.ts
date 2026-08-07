import { Devotional } from '../types';

export const INITIAL_DEVOTIONALS: Devotional[] = [
  {
    id: 'dev-001',
    title: 'A Paz que Excede Todo Entendimento',
    date: new Date().toISOString().split('T')[0],
    category: 'Paz',
    verse: {
      text: 'E a paz de Deus, que excede todo o entendimento, guardará o seu coração e a sua mente em Cristo Jesus.',
      reference: 'Filipenses 4:7',
      translation: 'NVI'
    },
    context: 'Paulo escreveu esta carta enquanto estava preso em Roma. Apesar das algemas físicas e das incertezas, ele experimentou uma alegria indescritível e uma paz inabalável que desafiava suas circunstâncias externas.',
    explanation: 'A paz do mundo depende de fatores externos favorables, mas a paz de Deus é uma sentinela celestial que guarda nossas emoções e pensamentos. Quando entregamos nossas ansiedades através da oração de gratidão, Deus coloca Sua paz como guardiã de nossa mente.',
    practicalApplication: 'Hoje, quando sentir a ansiedade tentar dominar seus pensamentos, pare por um minuto, respire fundo e faça uma oração de gratidão listando três bênçãos concretas que Deus já lhe concedeu.',
    reflectionQuestion: 'Qual área da sua vida você precisa entregar nas mãos de Deus para experimentar a paz que excede o entendimento hoje?',
    dailyChallenge: 'Envie uma mensagem de encorajamento para alguém que você sabe que está passando por um momento de ansiedade ou desafio.',
    closingPrayer: 'Senhor meu Deus, entrego em Tuas mãos todas as minhas preocupações e incertezas. Peço que a Tua paz guarde meu coração e minha mente em Cristo Jesus. Ensina-me a confiar no Teu amor perfeito todos os dias. Amém.',
    author: 'Pr. Lucas Oliveira',
    readingTimeMinutes: 4,
    likesCount: 124,
    isPublished: true
  },
  {
    id: 'dev-002',
    title: 'Fé para Mover Montanhas',
    date: '2026-08-06',
    category: 'Fé',
    verse: {
      text: 'Se vocês tiverem fé do tamanho de uma semente de mostarda, poderão dizer a este monte: "Vá daqui para lá", e ele irá. Nada lhes será impossível.',
      reference: 'Mateus 17:20',
      translation: 'NVI'
    },
    context: 'Jesus havia acabado de curar um menino endemoninhado que os discípulos não conseguiram curar. Ele usou a metáfora da semente de mostarda para ensinar sobre a qualidade e direção da fé, não apenas sua quantidade visual.',
    explanation: 'A semente de mostarda é minúscula, mas carrega em si um potencial vital para crescer e se tornar uma grande árvore. Fé não é a ausência de dúvidas, mas a decisão de confiar no Deus Onipotente mesmo com recursos humanos pequenos.',
    practicalApplication: 'Não foque no tamanho do problema diante de você, mas na grandeza do Deus que caminha ao seu lado. Dê o primeiro passo de obediência hoje.',
    reflectionQuestion: 'Qual montanha na sua vida parece grande demais, mas precisa ser colocada sob a autoridade de Cristo?',
    dailyChallenge: 'Anote um pedido de oração grande que exige fé e ore por ele com perseverança hoje.',
    closingPrayer: 'Pai celestial, aumenta a minha fé! Ajuda-me a enxergar além das minhas limitações físicas e a confiar totalmente no Teu poder infinito. Em nome de Jesus, amém.',
    author: 'Dra. Sarah Mendes',
    readingTimeMinutes: 3,
    likesCount: 98,
    isPublished: true
  },
  {
    id: 'dev-003',
    title: 'O Poder da Oração Fervorosa',
    date: '2026-08-05',
    category: 'Oração',
    verse: {
      text: 'A oração de um justo é poderosa e eficaz.',
      reference: 'Tiago 5:16b',
      translation: 'NVI'
    },
    context: 'Tiago encoraja a comunidade cristã a orar uns pelos outros na doença e nas provações, usando Elias como exemplo de um homem comum cuja oração fervorosa fechou e abriu os céus.',
    explanation: 'Orar não é tentar convencer Deus a fazer a nossa vontade, mas alinhar o nosso coração com a soberania Dele. A oração constante e com fé tem poder para transformar corações, curar enfermidades e mover céus e terra.',
    practicalApplication: 'Separe um momento sem distrações ou celular para orar com sinceridade e intencionalidade pelos seus familiares e amigos.',
    reflectionQuestion: 'Sua rotina de oração tem sido um diálogo constante ou apenas um pedido de emergência?',
    dailyChallenge: 'Ore hoje por três pessoas com quem você não fala há algum tempo.',
    closingPrayer: 'Senhor Jesus, ensina-me a orar sem cessar. Que as minhas orações sejam sinceras, cheias de fé e alinhadas com a Tua santa vontade. Em Teu nome, amém.',
    author: 'Pr. Marcos Silva',
    readingTimeMinutes: 5,
    likesCount: 156,
    isPublished: true
  },
  {
    id: 'dev-004',
    title: 'Renovados na Esperança',
    date: '2026-08-04',
    category: 'Esperança',
    verse: {
      text: 'Mas aqueles que esperam no Senhor renovam as suas forças. Voam alto como águias; correm e não se cansam, caminham e não se fatigam.',
      reference: 'Isaías 40:31',
      translation: 'NVI'
    },
    context: 'Isaías trazia uma mensagem de consolo ao povo de Israel no cativeiro, lembrando que o Criador do universo não se cansa nem se fatiga, e renova os exaustos.',
    explanation: 'A exaustão física e espiritual surge quando tentamos carregar fardos com nossa própria força humana. A águia aproveita as correntes térmicas de ar para subir alto sem bater asas desesperadamente; da mesma forma, esperar no Senhor nos eleva acima das tempestades.',
    practicalApplication: 'Se você se sente cansado fisicamente ou mentalmente hoje, pare e declare com sua boca que sua força vem do Senhor.',
    reflectionQuestion: 'Você tem tentado resolver seus dilemas pela própria força ou descansado na promessa divina?',
    dailyChallenge: 'Medite no Salmo 23 antes de dormir hoje e declare o cuidado do Bom Pastor.',
    closingPrayer: 'Pai Santo, confesso meu cansaço e minhas limitações. Renova minhas forças como as da águia! Dá-me vigor e perseverança para prosseguir. Amém.',
    author: 'Dra. Sarah Mendes',
    readingTimeMinutes: 4,
    likesCount: 210,
    isPublished: true
  },
  {
    id: 'dev-005',
    title: 'Edificando o Lar na Rocha',
    date: '2026-08-03',
    category: 'Família',
    verse: {
      text: 'Se o Senhor não edificar a casa, em vão trabalham os que a edificam.',
      reference: 'Salmos 127:1',
      translation: 'ARC'
    },
    context: 'Salmo de Salomão lembrando que todos os esforços humanos para proteger ou prosperar uma família são nulos sem o amparo e bênção direta do Senhor.',
    explanation: 'Construir uma família saudável exige mais do que sustento financeiro e boas intenções; requer fundação espiritual diária, perdão, paciência e o amor de Cristo permeando as conversas à mesa.',
    practicalApplication: 'Promova um momento de gratidão e oração em família hoje, mesmo que seja breve durante a refeição.',
    reflectionQuestion: 'Como você pode demonstrar mais paciência e perdão dentro de sua casa hoje?',
    dailyChallenge: 'Elogie expressamente um membro da sua família e diga o quanto você o ama.',
    closingPrayer: 'Senhor, abençoa meu lar e minha família. Seja Tu o centro da nossa casa e a rocha inabalável da nossa vida. Guarda-nos no Teu amor. Amém.',
    author: 'Pr. Lucas Oliveira',
    readingTimeMinutes: 4,
    likesCount: 142,
    isPublished: true
  }
];
