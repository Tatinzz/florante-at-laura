import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle, ChevronRight, BookOpen } from 'lucide-react';
import { Chapter } from '../types/index';

interface ChapterListProps {
  chapters: Chapter[];
  emptyMessage?: React.ReactNode;
}

// List container and item animations
const listVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

// Individual row animations
const rowVariants = {
  hidden: { 
    opacity: 0, 
    x: -20,
  },
  show: { 
    opacity: 1, 
    x: 0,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 120
    }
  }
};

const ChapterList: React.FC<ChapterListProps> = ({ chapters, emptyMessage }) => {
  if (chapters.length === 0 && emptyMessage) {
    return <>{emptyMessage}</>;
  }
  
  return (
    <motion.div 
      className="bg-indigo-900/30 backdrop-blur-sm rounded-xl border border-indigo-800/30 overflow-hidden"
      variants={listVariants}
      initial="hidden"
      animate="show"
    >
      {chapters.map((chapter, index) => (
        <motion.div
          key={chapter.id}
          variants={rowVariants}
          custom={index}
          className={`group ${index !== chapters.length - 1 ? 'border-b border-indigo-800/30' : ''}`}
        >
          <Link 
            to={`/chapter/${chapter.id}`}
            className="flex items-center gap-4 p-4 transition-colors duration-300 hover:bg-indigo-800/20"
          >
            {/* Chapter number */}
            <div className="bg-indigo-900/80 w-12 h-12 flex-shrink-0 rounded-lg border border-indigo-700/50 flex items-center justify-center">
              <span className="font-serif font-bold text-amber-400 text-xl group-hover:scale-110 transition-transform duration-300">
                {chapter.id}
              </span>
            </div>
            
            {/* Chapter info */}
            <div className="flex-grow min-w-0">
              <h3 className="font-serif text-lg text-amber-400 mb-0.5 truncate group-hover:text-amber-300 transition-colors">
                {chapter.title}
              </h3>
              <p className="text-ivory-300 text-sm truncate">{chapter.subtitle}</p>
            </div>
            
            {/* Indicators */}
            <div className="flex items-center gap-3">
              {/* Completion badge */}
              {chapter.completed && (
                <div className="relative">
                  <CheckCircle className="w-5 h-5 text-emerald-400 drop-shadow-md" />
                </div>
              )}
              
              <BookOpen className="w-5 h-5 text-ivory-300/70 group-hover:text-amber-400 transition-colors" />
              
              <ChevronRight className="w-5 h-5 text-ivory-300/70 group-hover:text-amber-400 transform group-hover:translate-x-1 transition-all" />
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ChapterList; 