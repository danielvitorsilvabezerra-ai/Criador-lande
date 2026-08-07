export interface BibleBook {
  name: string;
  abbreviation: string;
  testament: 'AT' | 'NT';
  chaptersCount: number;
}

export const BIBLE_BOOKS: BibleBook[] = [
  { name: 'Gênesis', abbreviation: 'Gn', testament: 'AT', chaptersCount: 50 },
  { name: 'Êxodo', abbreviation: 'Êx', testament: 'AT', chaptersCount: 40 },
  { name: 'Levítico', abbreviation: 'Lv', testament: 'AT', chaptersCount: 27 },
  { name: 'Números', abbreviation: 'Nm', testament: 'AT', chaptersCount: 36 },
  { name: 'Deuteronômio', abbreviation: 'Dt', testament: 'AT', chaptersCount: 34 },
  { name: 'Josué', abbreviation: 'Js', testament: 'AT', chaptersCount: 24 },
  { name: 'Salmos', abbreviation: 'Sl', testament: 'AT', chaptersCount: 150 },
  { name: 'Provérbios', abbreviation: 'Pv', testament: 'AT', chaptersCount: 31 },
  { name: 'Isaías', abbreviation: 'Is', testament: 'AT', chaptersCount: 66 },
  { name: 'Jeremias', abbreviation: 'Jr', testament: 'AT', chaptersCount: 52 },
  { name: 'Mateus', abbreviation: 'Mt', testament: 'NT', chaptersCount: 28 },
  { name: 'Marcos', abbreviation: 'Mc', testament: 'NT', chaptersCount: 16 },
  { name: 'Lucas', abbreviation: 'Lc', testament: 'NT', chaptersCount: 24 },
  { name: 'João', abbreviation: 'Jo', testament: 'NT', chaptersCount: 21 },
  { name: 'Atos', abbreviation: 'At', testament: 'NT', chaptersCount: 28 },
  { name: 'Romanos', abbreviation: 'Rm', testament: 'NT', chaptersCount: 16 },
  { name: '1 Coríntios', abbreviation: '1Co', testament: 'NT', chaptersCount: 16 },
  { name: '2 Coríntios', abbreviation: '2Co', testament: 'NT', chaptersCount: 13 },
  { name: 'Gálatas', abbreviation: 'Gl', testament: 'NT', chaptersCount: 6 },
  { name: 'Efésios', abbreviation: 'Ef', testament: 'NT', chaptersCount: 6 },
  { name: 'Filipenses', abbreviation: 'Fp', testament: 'NT', chaptersCount: 4 },
  { name: 'Colossenses', abbreviation: 'Cl', testament: 'NT', chaptersCount: 4 },
  { name: '1 Tessalonicenses', abbreviation: '1Ts', testament: 'NT', chaptersCount: 5 },
  { name: 'Hebreus', abbreviation: 'Hb', testament: 'NT', chaptersCount: 13 },
  { name: 'Tiago', abbreviation: 'Tg', testament: 'NT', chaptersCount: 5 },
  { name: '1 Pedro', abbreviation: '1Pe', testament: 'NT', chaptersCount: 5 },
  { name: '1 João', abbreviation: '1Jo', testament: 'NT', chaptersCount: 5 },
  { name: 'Apocalipse', abbreviation: 'Ap', testament: 'NT', chaptersCount: 22 }
];

export const POPULAR_THEMATIC_VERSES = [
  {
    theme: 'Ansiedade & Paz',
    verse: 'Não andem ansiosos por coisa alguma, mas em tudo, pela oração e súplicas, e com ação de graças, apresentem seus pedidos a Deus.',
    reference: 'Filipenses 4:6'
  },
  {
    theme: 'Força & Coragem',
    verse: 'Não fui eu que lhe ordenei? Seja forte e corajoso! Não se apavore nem desanime, pois o Senhor, o seu Deus, estará com você por onde você andar.',
    reference: 'Josué 1:9'
  },
  {
    theme: 'Amor & Perdão',
    verse: 'Se confessarmos os nossos pecados, ele é fiel e justo para nos perdoar os pecados e nos purificar de toda injustiça.',
    reference: '1 João 1:9'
  },
  {
    theme: 'Providência & Cuidado',
    verse: 'O Senhor é o meu pastor; nada me faltará. Em verdes pastagens me faz repousar e me conduz a águas tranqüilas.',
    reference: 'Salmos 23:1-2'
  },
  {
    theme: 'Propósito & Futuro',
    verse: 'Porque sou eu que conheço os planos que tenho para vocês", diz o Senhor, "planos de fazê-los prosperar e não de causar dano, planos de dar a vocês esperança e um futuro.',
    reference: 'Jeremias 29:11'
  }
];
