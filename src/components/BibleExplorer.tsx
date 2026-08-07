import React, { useState } from 'react';
import {
  Search,
  BookOpen,
  Volume2,
  Share2,
  Sparkles,
  Bookmark,
  ChevronRight,
  Filter
} from 'lucide-react';
import { BIBLE_BOOKS, POPULAR_THEMATIC_VERSES } from '../data/bibleBooks';
import { BibleTranslation } from '../types';

export const BibleExplorer: React.FC = () => {
  const [selectedBook, setSelectedBook] = useState('Salmos');
  const [selectedChapter, setSelectedChapter] = useState(23);
  const [translation, setTranslation] = useState<BibleTranslation>('NVI');
  const [searchTerm, setSearchTerm] = useState('');
  const [testamentFilter, setTestamentFilter] = useState<'Todos' | 'AT' | 'NT'>('Todos');

  const filteredBooks = BIBLE_BOOKS.filter((b) => {
    const matchesTestament = testamentFilter === 'Todos' || b.testament === testamentFilter;
    const matchesSearch = b.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTestament && matchesSearch;
  });

  const currentBookObj = BIBLE_BOOKS.find((b) => b.name === selectedBook) || BIBLE_BOOKS[6];

  // Sample chapter verses mock
  const sampleChapterVerses = [
    { verse: 1, text: 'O Senhor é o meu pastor; nada me faltará.' },
    { verse: 2, text: 'Deitar-me faz em verdes pastos, guia-me suavemente a águas tranqüilas.' },
    { verse: 3, text: 'Refrigera a minha alma; guia-me pelas veredas da justiça, por amor do seu nome.' },
    { verse: 4, text: 'Ainda que eu andasse pelo vale da sombra da morte, não temeria mal algum, porque tu estás comigo; a tua vara e o teu cajado me consolam.' },
    { verse: 5, text: 'Preparas uma mesa perante mim na presença dos meus inimigos, unges a minha cabeça com óleo, o meu cálice transborda.' },
    { verse: 6, text: 'Certamente que a bondade e a misericórdia me seguirão todos os dias da minha vida; e habitarei na casa do Senhor por longos dias.' },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30 uppercase tracking-widest inline-flex items-center gap-1.5 mb-2">
            <BookOpen className="w-3.5 h-3.5" /> Explorador da Sagrada Escritura
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Navegue pelos Livros da Bíblia
          </h1>
          <p className="text-sm text-slate-300 max-w-xl mt-1">
            Explore os 66 livros da Bíblia, compare traduções (NVI, NTLH, ARC, AA) e pesquise por palavras-chave ou temas.
          </p>
        </div>

        {/* Translation Selector */}
        <div className="bg-white/10 p-1.5 rounded-2xl backdrop-blur-md border border-white/15 flex items-center gap-1">
          {(['NVI', 'NTLH', 'ARC', 'AA'] as BibleTranslation[]).map((t) => (
            <button
              key={t}
              onClick={() => setTranslation(t)}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition ${
                translation === t
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Popular Themes Grid */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500" />
          Busca Rápida por Temas da Vida
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {POPULAR_THEMATIC_VERSES.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5 shadow-xs"
            >
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold uppercase text-amber-600 dark:text-amber-400">
                  {item.theme}
                </span>
                <span className="text-xs font-bold text-blue-800 dark:text-blue-300">
                  {item.reference}
                </span>
              </div>
              <p className="text-xs italic text-slate-700 dark:text-slate-300 leading-relaxed">
                "{item.verse}"
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Layout: Book Selection Left, Chapter Content Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Books Selector List */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md space-y-4 max-h-[600px] flex flex-col">
          <div className="space-y-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Pesquisar livro..."
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 focus:outline-none"
              />
            </div>

            {/* AT / NT Filter */}
            <div className="flex gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-semibold">
              {(['Todos', 'AT', 'NT'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setTestamentFilter(f)}
                  className={`flex-1 py-1 text-center rounded-lg transition ${
                    testamentFilter === f
                      ? 'bg-blue-800 text-white'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {f === 'AT' ? 'Antigo Test.' : f === 'NT' ? 'Novo Test.' : 'Todos'}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto space-y-1 pr-1">
            {filteredBooks.map((b) => {
              const isSelected = selectedBook === b.name;
              return (
                <button
                  key={b.name}
                  onClick={() => {
                    setSelectedBook(b.name);
                    setSelectedChapter(1);
                  }}
                  className={`w-full p-2.5 rounded-xl text-xs font-bold transition flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-blue-800 text-white shadow-xs'
                      : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span>{b.name}</span>
                  <span className="text-[10px] opacity-70">{b.chaptersCount} cap.</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Chapter Reader Panel */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">
                {currentBookObj.testament === 'AT' ? 'Antigo Testamento' : 'Novo Testamento'} • {translation}
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
                {selectedBook} {selectedChapter}
              </h2>
            </div>

            {/* Chapter Selector Buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 sm:pb-0">
              {Array.from({ length: Math.min(currentBookObj.chaptersCount, 25) }, (_, i) => i + 1).map((ch) => (
                <button
                  key={ch}
                  onClick={() => setSelectedChapter(ch)}
                  className={`w-7 h-7 rounded-lg text-xs font-bold transition ${
                    selectedChapter === ch
                      ? 'bg-amber-500 text-slate-950 shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {ch}
                </button>
              ))}
            </div>
          </div>

          {/* Verses List */}
          <div className="space-y-4 font-serif text-slate-800 dark:text-slate-200 leading-relaxed">
            {sampleChapterVerses.map((v) => (
              <p key={v.verse} className="text-sm sm:text-base pl-2 hover:bg-slate-50 dark:hover:bg-slate-800/40 p-2 rounded-xl transition">
                <sup className="font-sans font-bold text-amber-600 dark:text-amber-400 mr-2 text-xs">
                  {v.verse}
                </sup>
                {v.text}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
