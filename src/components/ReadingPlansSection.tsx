import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Sparkles,
  Plus,
  Flame,
  Calendar,
  ChevronRight,
  BarChart3,
  Search,
  Bot,
  Loader2
} from 'lucide-react';
import { ReadingPlan } from '../types';

interface ReadingPlansSectionProps {
  plans: ReadingPlan[];
  onToggleChapter: (planId: string, dayNumber: number) => void;
  onSelectActivePlan: (planId: string) => void;
  activePlanId: string | null;
}

export const ReadingPlansSection: React.FC<ReadingPlansSectionProps> = ({
  plans,
  onToggleChapter,
  onSelectActivePlan,
  activePlanId,
}) => {
  const [selectedPlan, setSelectedPlan] = useState<ReadingPlan>(
    plans.find((p) => p.id === activePlanId) || plans[0]
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [customGoalTopic, setCustomGoalTopic] = useState('');
  const [isGeneratingAiPlan, setIsGeneratingAiPlan] = useState(false);
  const [aiCustomPlanResult, setAiCustomPlanResult] = useState<string | null>(null);

  const filteredPlans = plans.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const calculateProgress = (plan: ReadingPlan) => {
    if (!plan.days || plan.days.length === 0) return 0;
    const completed = plan.days.filter((d) => d.completed).length;
    return Math.round((completed / plan.days.length) * 100);
  };

  const handleGenerateAiPlan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customGoalTopic.trim()) return;

    setIsGeneratingAiPlan(true);
    setAiCustomPlanResult(null);

    try {
      const response = await fetch('/api/gemini/qa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: `Crie um plano de leitura bíblica personalizado de 7 dias focado em: "${customGoalTopic}". Para cada dia inclua a referência bíblica e o objetivo do dia.`,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setAiCustomPlanResult(data.answer);
      } else {
        setAiCustomPlanResult('Não foi possível gerar o plano via IA no momento.');
      }
    } catch {
      setAiCustomPlanResult('Erro ao conectar ao servidor para gerar plano.');
    } finally {
      setIsGeneratingAiPlan(false);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Title & Stats Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30 uppercase tracking-widest inline-flex items-center gap-1.5 mb-2">
            <CheckCircle2 className="w-3.5 h-3.5" /> Planos de Leitura Bíblica
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Consistência na Palavra de Deus
          </h1>
          <p className="text-sm text-slate-300 max-w-xl mt-1">
            Escolha um plano de leitura temática ou cronológica e acompanhe seu progresso diário em porcentagem.
          </p>
        </div>

        {/* Selected Plan Quick Progress Widget */}
        {selectedPlan && (
          <div className="w-full md:w-auto min-w-[240px] p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-2">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-amber-300 truncate max-w-[150px]">{selectedPlan.title}</span>
              <span className="text-white">{calculateProgress(selectedPlan)}%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-amber-400 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${calculateProgress(selectedPlan)}%` }}
              />
            </div>
            <p className="text-[10px] text-slate-300 text-right">
              {selectedPlan.days.filter((d) => d.completed).length} de {selectedPlan.days.length} dias lidos
            </p>
          </div>
        )}
      </div>

      {/* Plans Catalog Grid */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-700 dark:text-amber-400" />
            Catálogo de Planos
          </h2>

          {/* Search bar */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar plano por nome ou tema..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-700"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPlans.map((plan) => {
            const progress = calculateProgress(plan);
            const isSelected = selectedPlan.id === plan.id;
            const isActive = activePlanId === plan.id;

            return (
              <div
                key={plan.id}
                onClick={() => setSelectedPlan(plan)}
                className={`p-5 rounded-2xl border transition cursor-pointer flex flex-col justify-between space-y-4 ${
                  isSelected
                    ? 'bg-blue-50/80 dark:bg-blue-950/40 border-blue-600 dark:border-amber-400 shadow-md'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-blue-800 dark:text-amber-300">
                      {plan.category}
                    </span>
                    {isActive && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-500 text-white">
                        Ativo
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">
                    {plan.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
                    {plan.description}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
                    <span>{plan.durationDays} dias</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{progress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-blue-700 dark:bg-amber-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectActivePlan(plan.id);
                      setSelectedPlan(plan);
                    }}
                    className={`w-full py-1.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                      isActive
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 hover:bg-blue-800 hover:text-white dark:bg-slate-800 text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    <span>{isActive ? 'Plano Ativo' : 'Definir como Meu Plano'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Plan Chapters & Days Tracker */}
      {selectedPlan && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <span className="text-xs font-bold text-blue-800 dark:text-amber-400 uppercase tracking-wider">
                Detalhamento do Plano
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
                {selectedPlan.title}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-3 py-1 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 rounded-full border border-amber-200">
                {calculateProgress(selectedPlan)}% Concluído
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {selectedPlan.days.map((day) => (
              <div
                key={day.dayNumber}
                onClick={() => onToggleChapter(selectedPlan.id, day.dayNumber)}
                className={`p-4 rounded-2xl border transition cursor-pointer flex items-center justify-between ${
                  day.completed
                    ? 'bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                    : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="space-y-0.5">
                  <div className="text-xs font-bold flex items-center gap-2">
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                        day.completed
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {day.dayNumber}
                    </span>
                    <span className="truncate max-w-[180px]">{day.readingReference}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 pl-7">
                    {day.title}
                  </p>
                </div>

                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center border ${
                    day.completed
                      ? 'bg-emerald-600 border-emerald-600 text-white'
                      : 'border-slate-300 dark:border-slate-600'
                  }`}
                >
                  {day.completed && <CheckCircle2 className="w-4 h-4" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Personalized Reading Plan Generator */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-400/30 flex items-center justify-center">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold">Criar Plano Personalizado com Inteligência Artificial</h3>
            <p className="text-xs text-slate-300">
              Digite uma necessidade, luta ou objetivo específico (ex: "Lidando com luto", "Financeiro", "Liderança jovem") e a IA criará um roteiro bíblico especial.
            </p>
          </div>
        </div>

        <form onSubmit={handleGenerateAiPlan} className="flex flex-col sm:flex-row gap-3 pt-2">
          <input
            type="text"
            value={customGoalTopic}
            onChange={(e) => setCustomGoalTopic(e.target.value)}
            placeholder="Ex: Como vencer o medo do futuro e ter paz..."
            className="flex-1 p-3.5 rounded-2xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          <button
            type="submit"
            disabled={isGeneratingAiPlan}
            className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-2xl text-xs flex items-center justify-center gap-2 transition cursor-pointer shadow-md disabled:opacity-50"
          >
            {isGeneratingAiPlan ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Criando Plano...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Gerar Roteiro IA</span>
              </>
            )}
          </button>
        </form>

        {aiCustomPlanResult && (
          <div className="mt-4 p-5 rounded-2xl bg-slate-800/90 border border-amber-500/30 text-xs leading-relaxed text-slate-200 whitespace-pre-line animate-in fade-in">
            <div className="font-bold text-amber-300 mb-2 flex items-center gap-2 text-sm">
              <Sparkles className="w-4 h-4" /> Roteiro Bíblico Personalizado Gerado
            </div>
            {aiCustomPlanResult}
          </div>
        )}
      </div>
    </div>
  );
};
