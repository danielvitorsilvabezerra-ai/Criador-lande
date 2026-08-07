import React, { useState } from 'react';
import {
  Cross,
  Plus,
  CheckCircle2,
  Heart,
  Sparkles,
  MessageSquare,
  Search,
  Tag,
  Calendar,
  Share2,
  Trash2,
  Smile
} from 'lucide-react';
import { PrayerRequest } from '../types';

interface PrayerWallSectionProps {
  prayers: PrayerRequest[];
  onAddPrayer: (prayer: Omit<PrayerRequest, 'id' | 'createdAt' | 'isAnswered'>) => void;
  onToggleAnswered: (id: string, testimony?: string) => void;
  onDeletePrayer: (id: string) => void;
}

export const PrayerWallSection: React.FC<PrayerWallSectionProps> = ({
  prayers,
  onAddPrayer,
  onToggleAnswered,
  onDeletePrayer,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'answered'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [searchTerm, setSearchTerm] = useState('');

  // Form State
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newCategory, setNewCategory] = useState<PrayerRequest['category']>('Família');

  // Answer Modal State
  const [answeringPrayerId, setAnsweringPrayerId] = useState<string | null>(null);
  const [testimonyText, setTestimonyText] = useState('');

  const categories = ['Todos', 'Família', 'Saúde', 'Espiritual', 'Finanças', 'Trabalho', 'Relacionamentos', 'Outros'];

  const filteredPrayers = prayers.filter((p) => {
    const matchesTab =
      activeTab === 'all' ||
      (activeTab === 'active' && !p.isAnswered) ||
      (activeTab === 'answered' && p.isAnswered);

    const matchesCategory = selectedCategory === 'Todos' || p.category === selectedCategory;

    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesTab && matchesCategory && matchesSearch;
  });

  const handleCreatePrayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    onAddPrayer({
      userId: 'user-1',
      title: newTitle.trim(),
      description: newDescription.trim(),
      category: newCategory,
    });

    setNewTitle('');
    setNewDescription('');
    setShowAddForm(false);
  };

  const handleConfirmAnswered = (e: React.FormEvent) => {
    e.preventDefault();
    if (answeringPrayerId) {
      onToggleAnswered(answeringPrayerId, testimonyText.trim());
      setAnsweringPrayerId(null);
      setTestimonyText('');
    }
  };

  const answeredCount = prayers.filter((p) => p.isAnswered).length;

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-blue-950 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30 uppercase tracking-widest inline-flex items-center gap-1.5 mb-2">
            <Cross className="w-3.5 h-3.5" /> Mural de Oração & Testemunhos
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Coloque seus Pedidos diante de Deus
          </h1>
          <p className="text-sm text-slate-300 max-w-xl mt-1">
            Mantenha seus clamores organizados e celebre cada oração respondida com gratidão no seu diário espiritual.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center">
            <span className="block text-2xl font-extrabold text-amber-400">{answeredCount}</span>
            <span className="text-[10px] uppercase tracking-wider text-slate-300">Orações Respondidas</span>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="px-5 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-2xl text-xs flex items-center gap-2 transition shadow-lg shadow-amber-500/20 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Novo Pedido</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs & Search Row */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        {/* Status Tab Toggle */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              activeTab === 'all'
                ? 'bg-blue-800 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Todas ({prayers.length})
          </button>
          <button
            onClick={() => setActiveTab('active')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              activeTab === 'active'
                ? 'bg-blue-800 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Em Oração ({prayers.length - answeredCount})
          </button>
          <button
            onClick={() => setActiveTab('answered')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              activeTab === 'answered'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Respondidas ({answeredCount}) 🎉
          </button>
        </div>

        {/* Category Pills & Search */}
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <div className="relative min-w-[200px]">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar em pedidos..."
              className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-700"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="py-1.5 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Prayers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPrayers.length === 0 ? (
          <div className="col-span-full text-center py-12 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 space-y-3">
            <Cross className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-700 dark:text-slate-300">
              Nenhum pedido de oração encontrado.
            </h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Clique no botão "Novo Pedido" para registrar suas intenções e motivos de oração.
            </p>
          </div>
        ) : (
          filteredPrayers.map((prayer) => (
            <div
              key={prayer.id}
              className={`p-6 rounded-3xl border transition flex flex-col justify-between space-y-4 shadow-sm ${
                prayer.isAnswered
                  ? 'bg-emerald-50/70 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800/60'
                  : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800'
              }`}
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                      prayer.isAnswered
                        ? 'bg-emerald-500 text-white'
                        : 'bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-amber-300'
                    }`}
                  >
                    {prayer.category}
                  </span>
                  <span className="text-[10px] text-slate-400">{prayer.createdAt}</span>
                </div>

                <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 leading-snug">
                  {prayer.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {prayer.description}
                </p>

                {/* Testimony block if answered */}
                {prayer.isAnswered && prayer.testimony && (
                  <div className="p-3 rounded-2xl bg-white dark:bg-slate-800 border border-emerald-200 dark:border-emerald-800/80 space-y-1">
                    <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Testemunho do Milagre:
                    </span>
                    <p className="text-xs italic text-slate-700 dark:text-slate-300">
                      "{prayer.testimony}"
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                {!prayer.isAnswered ? (
                  <button
                    onClick={() => setAnsweringPrayerId(prayer.id)}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Marcar Respondida</span>
                  </button>
                ) : (
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                    <Sparkles className="w-4 h-4" /> Oração Respondida!
                  </span>
                )}

                <button
                  onClick={() => onDeletePrayer(prayer.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  title="Excluir pedido"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Prayer Modal */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-extrabold text-lg text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Cross className="w-5 h-5 text-blue-700 dark:text-amber-400" />
                Novo Motivo de Oração
              </h3>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreatePrayer} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Título do Pedido
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Ex: Saúde da minha mãe, entrevista de emprego..."
                  required
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-700"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Categoria
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 focus:outline-none"
                >
                  {categories.filter((c) => c !== 'Todos').map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Detalhes / O que colocar nas mãos de Deus
                </label>
                <textarea
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  rows={3}
                  placeholder="Descreva seu pedido com fé..."
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-700"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-blue-800 hover:bg-blue-700 text-white shadow-xs"
                >
                  Salvar Pedido
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Answered Prayer Testimony Modal */}
      {answeringPrayerId && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mx-auto text-xl">
                🎉
              </div>
              <h3 className="font-extrabold text-xl text-slate-900 dark:text-slate-100">
                Oração Respondida por Deus!
              </h3>
              <p className="text-xs text-slate-500">
                Glória a Deus! Escreva uma breve nota ou testemunho sobre como Ele respondeu este clamor.
              </p>
            </div>

            <form onSubmit={handleConfirmAnswered} className="space-y-4">
              <textarea
                value={testimonyText}
                onChange={(e) => setTestimonyText(e.target.value)}
                rows={3}
                placeholder="Ex: Deus abriu as portas e a bênção chegou em meu lar no dia..."
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setAnsweringPrayerId(null)}
                  className="flex-1 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs"
                >
                  Confirmar Resposta
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
