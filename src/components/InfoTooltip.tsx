import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info } from 'lucide-react';
import { DEFINITIONS } from '../data/assets';

interface Props {
  term: string;
  side?: 'top' | 'bottom';
}

export const InfoTooltip: React.FC<Props> = ({ term, side = 'top' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const definition = DEFINITIONS[term] || "설명이 아직 준비되지 않았어요.";

  return (
    <div className="relative inline-block ml-1">
      <button 
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="text-slate-400 hover:text-indigo-500 transition-colors cursor-help"
        aria-label={`Info about ${term}`}
      >
        <Info className="w-3.5 h-3.5" />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: side === 'top' ? 5 : -5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: side === 'top' ? 5 : -5 }}
            className={`absolute z-[100] ${side === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'} left-1/2 -translate-x-1/2 w-48 p-3 bg-slate-900 text-white text-[11px] rounded-xl shadow-2xl pointer-events-none border border-white/10`}
          >
            <p className="font-bold mb-1 text-indigo-400">{term}</p>
            <p className="leading-normal opacity-90">{definition}</p>
            <div className={`absolute left-1/2 -translate-x-1/2 border-8 border-transparent ${side === 'top' ? 'top-full border-t-slate-900' : 'bottom-full border-b-slate-900'}`}></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
