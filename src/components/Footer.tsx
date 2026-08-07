import React from 'react';
import { Cross, Heart, Sparkles, Smartphone, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onOpenLegalModal: (type: 'sobre' | 'contato' | 'privacidade' | 'termos') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegalModal }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-700 to-amber-500 flex items-center justify-center text-white">
                <Cross className="w-5 h-5 text-amber-300" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Devocional Diário
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Sua caminhada diária com Deus através da meditação na Bíblia, oração perseverante, planos de leitura e tecnologia inspiradora.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-amber-400 font-semibold pt-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>"Lâmpada para os meus pés é tua palavra e luz, para o meu caminho." — Salmos 119:105</span>
            </div>
          </div>

          {/* Links */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Institucional</h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onOpenLegalModal('sobre')}
                  className="hover:text-amber-300 transition"
                >
                  Sobre Nós
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegalModal('contato')}
                  className="hover:text-amber-300 transition"
                >
                  Contato & Suporte
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegalModal('privacidade')}
                  className="hover:text-amber-300 transition"
                >
                  Política de Privacidade
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegalModal('termos')}
                  className="hover:text-amber-300 transition"
                >
                  Termos de Uso
                </button>
              </li>
            </ul>
          </div>

          {/* PWA & Mobile App Applet */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Smartphone className="w-4 h-4 text-amber-400" /> Aplicativo Web & PWA
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Instale este site no seu computador ou celular para receber notificações sem precisar abrir a loja de aplicativos.
            </p>
            <div className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-[11px] text-slate-300 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Modo PWA Offline Ativo</span>
            </div>
          </div>
        </div>

        {/* Bottom Rights */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center text-[11px] text-slate-500 gap-2">
          <p>© {new Date().getFullYear()} Devocional Diário. Todos os direitos reservados.</p>
          <p className="flex items-center gap-1">
            Feito com <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> para honra e glória do Senhor Jesus.
          </p>
        </div>
      </div>
    </footer>
  );
};
