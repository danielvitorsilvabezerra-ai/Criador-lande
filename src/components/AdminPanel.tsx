import React, { useState } from 'react';
import {
  ShieldCheck,
  Plus,
  Trash2,
  Edit3,
  Send,
  Users,
  BarChart2,
  BookOpen,
  Check,
  Calendar,
  Sparkles,
  Search,
  Bell
} from 'lucide-react';
import { Devotional, BibleTranslation } from '../types';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  devotionals: Devotional[];
  onAddDevotional: (dev: Devotional) => void;
  onDeleteDevotional: (id: string) => void;
  onBroadcastNotification: (title: string, message: string) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen,
  onClose,
  devotionals,
  onAddDevotional,
  onDeleteDevotional,
  onBroadcastNotification,
}) => {
  const [activeTab, setActiveTab] = useState<'devotionals' | 'stats' | 'broadcast'>('devotionals');

  // New Devotional Form State
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Devotional['category']>('Fé');
  const [verseText, setVerseText] = useState('');
  const [verseRef, setVerseRef] = useState('');
  const [translation, setTranslation] = useState<BibleTranslation>('NVI');
  const [context, setContext] = useState('');
  const [explanation, setExplanation] = useState('');
  const [practicalApplication, setPracticalApplication] = useState('');
  const [reflectionQuestion, setReflectionQuestion] = useState('');
  const [dailyChallenge, setDailyChallenge] = useState('');
  const [closingPrayer, setClosingPrayer] = useState('');
  const [author, setAuthor] = useState('Pr. Painel Admin');
  const [publishDate, setPublishDate] = useState(new Date().toISOString().split('T')[0]);

  // Broadcast Notification Form
  const [broadcastTitle, setBroadcastTitle] = useState('Lembrete Abençoado');
  const [broadcastMsg, setBroadcastMsg] = useState('Separe alguns minutos para ouvir a voz do Senhor hoje.');
  const [broadcastSentMessage, setBroadcastSentMessage] = useState(false);

  if (!isOpen) return null;

  const handleCreateDevotional = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !verseText.trim()) return;

    const newDev: Devotional = {
      id: `dev-${Date.now()}`,
      title: title.trim(),
      date: publishDate,
      category,
      verse: {
        text: verseText.trim(),
        reference: verseRef.trim() || 'Filipenses 4:13',
        translation,
      },
      context: context.trim(),
      explanation: explanation.trim(),
      practicalApplication: practicalApplication.trim(),
      reflectionQuestion: reflectionQuestion.trim(),
      dailyChallenge: dailyChallenge.trim(),
      closingPrayer: closingPrayer.trim(),
      author: author.trim(),
      readingTimeMinutes: 4,
      likesCount: 0,
      isPublished: true,
    };

    onAddDevotional(newDev);
    setShowCreateForm(false);
    // Reset
    setTitle('');
    setVerseText('');
    setVerseRef('');
    setContext('');
    setExplanation('');
    setPracticalApplication('');
    setReflectionQuestion('');
    setDailyChallenge('');
    setClosingPrayer('');
  };

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastMsg.trim()) return;
    onBroadcastNotification(broadcastTitle, broadcastMsg);
    setBroadcastSentMessage(true);
    setTimeout(() => setBroadcastSentMessage(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-4xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6 my-8 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-900 text-amber-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
                Painel Administrativo Devocional Diário
              </h2>
              <p className="text-xs text-slate-500">Gestão de conteúdo, notificações e métricas</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-base font-bold p-2"
          >
            ✕
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
          <button
            onClick={() => setActiveTab('devotionals')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'devotionals'
                ? 'bg-blue-800 text-white'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Devocionais ({devotionals.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('stats')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'stats'
                ? 'bg-blue-800 text-white'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <BarChart2 className="w-4 h-4" />
            <span>Métricas & Acessos</span>
          </button>

          <button
            onClick={() => setActiveTab('broadcast')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'broadcast'
                ? 'bg-blue-800 text-white'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Bell className="w-4 h-4" />
            <span>Notificação em Massa</span>
          </button>
        </div>

        {/* TAB 1: Devotionals Management */}
        {activeTab === 'devotionals' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Lista de Devocionais Publicados e Agendados
              </h3>
              <button
                onClick={() => setShowCreateForm(true)}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Novo Devocional</span>
              </button>
            </div>

            {/* List */}
            <div className="space-y-3">
              {devotionals.map((dev) => (
                <div
                  key={dev.id}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-4 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-blue-900 dark:text-amber-300">
                        {dev.title}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 font-bold text-[10px]">
                        {dev.category}
                      </span>
                    </div>
                    <p className="text-slate-500 text-[11px]">
                      {dev.date} • {dev.verse.reference} • Autor: {dev.author}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onDeleteDevotional(dev.id)}
                      className="p-2 text-rose-500 hover:bg-rose-100 dark:hover:bg-rose-950 rounded-lg transition"
                      title="Excluir"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* New Devotional Modal Form */}
            {showCreateForm && (
              <div className="p-6 rounded-3xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-4 text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-700">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                    Cadastrar / Agendar Novo Devocional
                  </h4>
                  <button
                    onClick={() => setShowCreateForm(false)}
                    className="text-slate-400 font-bold"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleCreateDevotional} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block font-bold mb-1">Título do Devocional</label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Ex: Confiança nas Tempestades"
                      required
                      className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-bold mb-1">Categoria</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as any)}
                      className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border text-xs"
                    >
                      {['Fé', 'Oração', 'Esperança', 'Amor', 'Sabedoria', 'Família', 'Propósito', 'Paz'].map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold mb-1">Data de Publicação / Agendamento</label>
                    <input
                      type="date"
                      value={publishDate}
                      onChange={(e) => setPublishDate(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-bold mb-1">Referência Bíblica</label>
                    <input
                      type="text"
                      value={verseRef}
                      onChange={(e) => setVerseRef(e.target.value)}
                      placeholder="Ex: Salmos 46:1"
                      className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-bold mb-1">Tradução</label>
                    <select
                      value={translation}
                      onChange={(e) => setTranslation(e.target.value as any)}
                      className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border text-xs"
                    >
                      <option value="NVI">NVI</option>
                      <option value="NTLH">NTLH</option>
                      <option value="ARC">ARC</option>
                      <option value="AA">AA</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-bold mb-1">Texto do Versículo Principal</label>
                    <textarea
                      value={verseText}
                      onChange={(e) => setVerseText(e.target.value)}
                      rows={2}
                      placeholder="Texto do versículo..."
                      required
                      className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border text-xs"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-bold mb-1">Explicação Teológica & Pastoral</label>
                    <textarea
                      value={explanation}
                      onChange={(e) => setExplanation(e.target.value)}
                      rows={3}
                      placeholder="Corpo do devocional..."
                      className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-bold mb-1">Aplicação Prática</label>
                    <textarea
                      value={practicalApplication}
                      onChange={(e) => setPracticalApplication(e.target.value)}
                      rows={2}
                      className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-bold mb-1">Oração Final</label>
                    <textarea
                      value={closingPrayer}
                      onChange={(e) => setClosingPrayer(e.target.value)}
                      rows={2}
                      className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border text-xs"
                    />
                  </div>

                  <div className="sm:col-span-2 flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowCreateForm(false)}
                      className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl font-bold"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl font-bold"
                    >
                      Salvar Devocional
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Metrics */}
        {activeTab === 'stats' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-5 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 space-y-2">
              <span className="font-bold text-slate-500">Usuários Ativos Hoje</span>
              <span className="block text-2xl font-extrabold text-blue-900 dark:text-amber-300">
                1.420
              </span>
              <p className="text-[10px] text-emerald-600">+12% em relação a ontem</p>
            </div>

            <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 space-y-2">
              <span className="font-bold text-slate-500">Devocionais Lidos este Mês</span>
              <span className="block text-2xl font-extrabold text-amber-900 dark:text-amber-300">
                18.950
              </span>
              <p className="text-[10px] text-amber-600">Taxa de conclusão: 88%</p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 space-y-2">
              <span className="font-bold text-slate-500">Notificações Entregues</span>
              <span className="block text-2xl font-extrabold text-emerald-900 dark:text-emerald-300">
                42.100
              </span>
              <p className="text-[10px] text-emerald-600">Taxa de clique: 64%</p>
            </div>
          </div>
        )}

        {/* TAB 3: Broadcast */}
        {activeTab === 'broadcast' && (
          <form onSubmit={handleSendBroadcast} className="space-y-4 text-xs">
            <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
              Disparar Notificação Push em Massa
            </h3>

            <div>
              <label className="block font-bold mb-1">Título da Notificação</label>
              <input
                type="text"
                value={broadcastTitle}
                onChange={(e) => setBroadcastTitle(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs"
              />
            </div>

            <div>
              <label className="block font-bold mb-1">Mensagem Push</label>
              <textarea
                value={broadcastMsg}
                onChange={(e) => setBroadcastMsg(e.target.value)}
                rows={3}
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs"
              />
            </div>

            <div className="flex justify-between items-center pt-2">
              {broadcastSentMessage && (
                <span className="font-bold text-emerald-600 flex items-center gap-1">
                  <Check className="w-4 h-4" /> Disparo de notificação enviado para todos os inscritos!
                </span>
              )}
              <button
                type="submit"
                className="ml-auto px-6 py-2.5 bg-blue-800 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Enviar Notificação Agora</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
