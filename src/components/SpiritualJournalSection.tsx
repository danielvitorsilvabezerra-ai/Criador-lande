import React, { useState } from 'react';
import {
  User,
  Plus,
  BookOpen,
  Sparkles,
  Calendar,
  Search,
  Tag,
  Target,
  Trash2,
  Lock,
  Bookmark
} from 'lucide-react';
import { JournalEntry } from '../types';

interface SpiritualJournalSectionProps {
  entries: JournalEntry[];
  onAddEntry: (entry: Omit<JournalEntry, 'id' | 'userId'>) => void;
  onDeleteEntry: (id: string) => void;
}

export const SpiritualJournalSection: React.FC<SpiritualJournalSectionProps> = ({
  entries,
  onAddEntry,
  onDeleteEntry,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Form state
  const [title, setTitle] = useState('');
  const [whatGodSpoke, setWhatGodSpoke] = useState('');
  const [notes, setNotes] = useState('');
  const [revelations, setRevelations] = useState('');
  const [goalInput, setGoalInput] = useState('');
  const [goals, setGoals] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>(['Revelação', 'Gratidão']);

  const handleAddGoal = () => {
    if (goalInput.trim()) {
      setGoals([...goals, goalInput.trim()]);
      setGoalInput('');
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddEntry({
      date: new Date().toISOString().split('T')[0],
      title: title.trim(),
      whatGodSpoke: whatGodSpoke.trim(),
      notes: notes.trim(),
      revelations: revelations.trim(),
      spiritualGoals: goals,
      tags: tags,
    });

    // Reset
    setTitle('');
    setWhatGodSpoke('');
    setNotes('');
    setRevelations('');
    setGoals([]);
    setShowAddModal(false);
  };

  const filteredEntries = entries.filter(
    (e) =>
      e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.whatGodSpoke.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.notes.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-12">
      {/* Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30 uppercase tracking-widest inline-flex items-center gap-1.5 mb-2">
            <User className="w-3.5 h-3.5" /> Diário Espiritual Pessoal
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Registre o que Deus Falou ao Seu Coração
          </h1>
          <p className="text-sm text-slate-300 max-w-xl mt-1">
            Espaço reservado e seguro para guardar anotações, revelações das escrituras, direcionamentos e suas metas espirituais.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-2xl text-xs flex items-center gap-2 transition shadow-lg shadow-amber-500/20 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Escrever no Diário</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Pesquisar em suas anotações do diário..."
          className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-700"
        />
      </div>

      {/* Entries List */}
      <div className="space-y-6">
        {filteredEntries.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 space-y-3">
            <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-700 dark:text-slate-300">
              Seu diário espiritual ainda está em branco.
            </h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Registre a mensagem do culto de hoje, um versículo de revelação ou seus objetivos espirituais.
            </p>
          </div>
        ) : (
          filteredEntries.map((entry) => (
            <div
              key={entry.id}
              className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md space-y-5"
            >
              <div className="flex justify-between items-start border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400 font-bold">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{entry.date}</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
                    {entry.title}
                  </h3>
                </div>

                <button
                  onClick={() => onDeleteEntry(entry.id)}
                  className="p-2 text-slate-400 hover:text-rose-500 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  title="Excluir do diário"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* What God Spoke Callout */}
              {entry.whatGodSpoke && (
                <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> O que Deus Falou Comigo
                  </span>
                  <p className="text-sm font-serif italic text-slate-800 dark:text-slate-200">
                    "{entry.whatGodSpoke}"
                  </p>
                </div>
              )}

              {/* Notes & Revelations Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {entry.notes && (
                  <div className="space-y-1 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl">
                    <span className="font-bold text-slate-700 dark:text-slate-300">
                      Anotações Principais:
                    </span>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line">
                      {entry.notes}
                    </p>
                  </div>
                )}

                {entry.revelations && (
                  <div className="space-y-1 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl">
                    <span className="font-bold text-slate-700 dark:text-slate-300">
                      Revelações & Entendimento:
                    </span>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line">
                      {entry.revelations}
                    </p>
                  </div>
                )}
              </div>

              {/* Spiritual Goals List */}
              {entry.spiritualGoals && entry.spiritualGoals.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Target className="w-4 h-4 text-blue-700 dark:text-amber-400" />
                    Metas Espirituais Vinculadas
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {entry.spiritualGoals.map((g, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-900 dark:text-amber-300 border border-blue-200 dark:border-blue-900 text-xs font-medium"
                      >
                        ✓ {g}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              {entry.tags && entry.tags.length > 0 && (
                <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <Tag className="w-3.5 h-3.5 text-slate-400" />
                  {entry.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Add Journal Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-extrabold text-lg text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-700 dark:text-amber-400" />
                Nova Entrada no Diário Espiritual
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Título da Anotação
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: Mensagem do culto de domingo, Revelação no Salmo 91..."
                  required
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-700"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  O que Deus falou especificamente ao seu coração?
                </label>
                <textarea
                  value={whatGodSpoke}
                  onChange={(e) => setWhatGodSpoke(e.target.value)}
                  rows={2}
                  placeholder="Palavras de encorajamento, direcionamento ou consolo..."
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-700"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Anotações Gerais & Esboço
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  placeholder="Pontos chave da pregado ou estudo..."
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-700"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Revelações Espirituais
                </label>
                <textarea
                  value={revelations}
                  onChange={(e) => setRevelations(e.target.value)}
                  rows={2}
                  placeholder="Versículos conectados, visão futura..."
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-700"
                />
              </div>

              {/* Metas espirituais input */}
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Adicionar Meta Espiritual
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={goalInput}
                    onChange={(e) => setGoalInput(e.target.value)}
                    placeholder="Ex: Orar 15min de manhã todas as terças..."
                    className="flex-1 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 text-xs"
                  />
                  <button
                    type="button"
                    onClick={handleAddGoal}
                    className="px-3 py-2 bg-blue-800 text-white rounded-xl text-xs font-bold"
                  >
                    + Add Meta
                  </button>
                </div>
                {goals.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {goals.map((g, i) => (
                      <span key={i} className="px-2 py-0.5 bg-blue-100 text-blue-900 rounded-md text-[10px]">
                        {g}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-xs"
                >
                  Guardar no Diário
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
