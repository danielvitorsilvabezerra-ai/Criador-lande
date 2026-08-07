import React, { useState } from 'react';
import { Share2, Check, Copy, MessageCircle, Instagram, Facebook } from 'lucide-react';
import { Devotional } from '../types';

interface ShareModalProps {
  devotional: Devotional | null;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ devotional, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!devotional) return null;

  const shareText = `*${devotional.title}*\n\n"${devotional.verse.text}" — _${devotional.verse.reference}_\n\nConfira o devocional de hoje no app Devocional Diário!`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  const handleFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-sm w-full border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6">
        <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800">
          <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Share2 className="w-5 h-5 text-blue-700 dark:text-amber-400" />
            Compartilhar Devocional
          </h3>
          <button onClick={onClose} className="text-slate-400 font-bold">
            ✕
          </button>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          Abênçoe a vida de amigos e familiares compartilhando a mensagem de hoje.
        </p>

        <div className="space-y-2">
          <button
            onClick={handleWhatsApp}
            className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Enviar no WhatsApp</span>
          </button>

          <button
            onClick={handleFacebook}
            className="w-full py-3 px-4 bg-blue-700 hover:bg-blue-600 text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <Facebook className="w-4 h-4" />
            <span>Compartilhar no Facebook</span>
          </button>

          <button
            onClick={handleCopy}
            className="w-full py-3 px-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-bold rounded-2xl text-xs flex items-center justify-center gap-2 transition cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copiado para a área de transferência!' : 'Copiar Texto Formatado'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
