import React, { useState } from 'react';
import { Cross, Mail, ShieldCheck, FileText, Send, CheckCircle2 } from 'lucide-react';

interface LegalModalsProps {
  modalType: 'sobre' | 'contato' | 'privacidade' | 'termos' | null;
  onClose: () => void;
}

export const LegalModals: React.FC<LegalModalsProps> = ({ modalType, onClose }) => {
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMsg, setContactMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!modalType) return null;

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6 my-8 max-h-[85vh] overflow-y-auto">
        <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800">
          <h3 className="font-extrabold text-lg text-slate-900 dark:text-slate-100 flex items-center gap-2">
            {modalType === 'sobre' && <Cross className="w-5 h-5 text-amber-500" />}
            {modalType === 'contato' && <Mail className="w-5 h-5 text-blue-700" />}
            {modalType === 'privacidade' && <ShieldCheck className="w-5 h-5 text-emerald-600" />}
            {modalType === 'termos' && <FileText className="w-5 h-5 text-indigo-600" />}
            <span>
              {modalType === 'sobre' && 'Sobre o Devocional Diário'}
              {modalType === 'contato' && 'Fale Conosco'}
              {modalType === 'privacidade' && 'Política de Privacidade'}
              {modalType === 'termos' && 'Termos de Uso'}
            </span>
          </h3>
          <button onClick={onClose} className="text-slate-400 font-bold p-1">
            ✕
          </button>
        </div>

        {/* Sobre Nós */}
        {modalType === 'sobre' && (
          <div className="space-y-4 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
            <p>
              O <strong>Devocional Diário</strong> é uma plataforma moderna criada com o propósito de incentivar e fortalecer a rotina espiritual de cristãos em todo o mundo.
            </p>
            <p>
              Acreditamos que alguns minutos diários de reflexão na Palavra de Deus, oração e busca sincera transformam corações, famílias e comunidades.
            </p>
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 space-y-1">
              <h4 className="font-bold text-amber-900 dark:text-amber-300">Nossa Missão:</h4>
              <p>Conectar pessoas ao ensino vivo de Cristo todos os dias através de tecnologia acessível, inspiradora e segura.</p>
            </div>
          </div>
        )}

        {/* Contato */}
        {modalType === 'contato' && (
          <div className="space-y-4 text-xs">
            {submitted ? (
              <div className="p-6 text-center space-y-2 bg-emerald-50 text-emerald-900 rounded-2xl">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-sm">Mensagem enviada com sucesso!</h4>
                <p>Nossa equipe responderá em breve. Deus abençoe!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitContact} className="space-y-3">
                <div>
                  <label className="block font-bold mb-1">Seu Nome</label>
                  <input
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    required
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Seu E-mail</label>
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    required
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Sua Mensagem / Dúvida / Sugestão</label>
                  <textarea
                    value={contactMsg}
                    onChange={(e) => setContactMsg(e.target.value)}
                    rows={3}
                    required
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-blue-800 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar Mensagem</span>
                </button>
              </form>
            )}
          </div>
        )}

        {/* Política de Privacidade */}
        {modalType === 'privacidade' && (
          <div className="space-y-3 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
            <p>
              A sua privacidade é extremamente importante para nós. O <strong>Devocional Diário</strong> assegura o compromisso com a proteção de seus dados pessoais.
            </p>
            <h4 className="font-bold text-slate-900 dark:text-slate-100">1. Coleta de Informações:</h4>
            <p>Coletamos apenas dados essenciais para personalizar sua experiência, como preferências de horário de notificação e diário espiritual local.</p>
            <h4 className="font-bold text-slate-900 dark:text-slate-100">2. Notificações Push:</h4>
            <p>As notificações só são enviadas mediante prévia autorização no seu navegador ou dispositivo celular.</p>
          </div>
        )}

        {/* Termos de Uso */}
        {modalType === 'termos' && (
          <div className="space-y-3 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
            <p>
              Ao utilizar o <strong>Devocional Diário</strong>, você concorda em cumprir estes termos de serviço e todas as leis aplicáveis.
            </p>
            <h4 className="font-bold text-slate-900 dark:text-slate-100">1. Uso Pessoal:</h4>
            <p>O conteúdo de devocionais, versículos e áudios é destinado ao fortalecimento espiritual pessoal e comunitário sem fins comerciais danosos.</p>
          </div>
        )}
      </div>
    </div>
  );
};
