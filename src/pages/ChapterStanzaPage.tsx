import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BookOpen, X } from 'lucide-react';
import { getKabanataById } from '../data';
import { motion } from 'framer-motion';

// Utility to group lines into stanzas (split by empty string)
function groupLinesToStanzas(lines: string[]): string[][] {
  const stanzas: string[][] = [];
  let current: string[] = [];
  for (const line of lines) {
    if (line.trim() === '') {
      if (current.length) {
        stanzas.push(current);
        current = [];
      }
    } else {
      current.push(line);
    }
  }
  if (current.length) stanzas.push(current);
  return stanzas;
}

const ChapterStanzaPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const kabanata = getKabanataById(Number(id));

  if (!kabanata) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-indigo-950/95 text-ivory-100 z-50">
        <div className="text-center">
          <p className="text-2xl text-amber-400">Walang nahanap na kabanata.</p>
        </div>
      </div>
    );
  }

  // Only use the first stanza's lines for this modal (as per your data structure)
  const allStanzaLines = kabanata.stanzas[0]?.lines || [];
  const stanzas = groupLinesToStanzas(allStanzaLines);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-indigo-950/95 z-50">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-2xl mx-auto bg-indigo-900/95 rounded-2xl border border-amber-400/20 shadow-2xl p-0"
      >
        <button
          onClick={() => navigate(`/chapter/${kabanata.id}`)}
          className="absolute top-4 right-4 text-ivory-300 hover:text-amber-400 transition-colors bg-indigo-950/70 rounded-full p-2 z-10 shadow-md"
          aria-label="Isara"
        >
          <X size={22} />
        </button>
        <div className="max-h-[80vh] overflow-y-auto custom-scrollbar px-8 py-10">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-serif text-amber-400 flex items-center justify-center gap-2 mb-2">
              <BookOpen className="w-7 h-7" />
              <span>{kabanata.stanzas[0]?.title || 'Mga Saknong'}</span>
            </h1>
            <h2 className="text-lg text-ivory-200 font-medium">Kabanata {kabanata.id}: {kabanata.title}</h2>
          </div>
          <div className="space-y-10">
            {stanzas.map((lines, idx) => (
              <div key={idx} className="text-ivory-200 italic text-center space-y-1">
                {lines.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ChapterStanzaPage; 