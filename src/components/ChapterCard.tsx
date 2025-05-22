import React, { useState, useEffect } from 'react';
import { ChevronRight, BookOpen, CheckCircle, Star, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Chapter } from '../types';

interface ChapterCardProps {
  chapter: Chapter;
  index?: number;
}

const ChapterCard: React.FC<ChapterCardProps> = ({ chapter }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isRead, setIsRead] = useState(false);

  useEffect(() => {
    setIsRead(localStorage.getItem(`chapter_read_${chapter.id}`) === 'true');
  }, [chapter.id]);
  
  return (
    <Link 
      to={`/chapter/${chapter.id}`}
      className="group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div 
        className="relative overflow-hidden rounded-xl bg-gradient-to-br from-indigo-800/80 to-indigo-950/90 backdrop-blur-sm shadow-lg p-6 border border-indigo-700/30 hover:border-amber-400/40 transition-colors duration-300 hover:shadow-amber-400/10 hover:shadow-xl card-3d"
        layoutId={`chapter-card-${chapter.id}`}
        whileHover={{ y: -8 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Glowing background effects */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 group-hover:bg-amber-400/20 transition-all duration-500"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-700/20 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2 group-hover:bg-indigo-700/30 transition-all duration-500"></div>
        
        {/* Chapter number */}
        <motion.div 
          className="absolute -top-2 -left-2 bg-indigo-900/80 backdrop-blur-sm w-14 h-14 rounded-br-2xl border-b border-r border-amber-400/20 flex items-center justify-center shadow-lg transform -rotate-6 group-hover:rotate-0 transition-all duration-300"
          layoutId={`chapter-number-${chapter.id}`}
        >
          <motion.span 
            className="font-serif font-bold text-amber-400 text-xl group-hover:scale-110 transition-transform duration-300"
            layoutId={`chapter-number-text-${chapter.id}`}
          >
            {chapter.id}
          </motion.span>
        </motion.div>
        
        {/* Completion badge */}
        {isRead && (
          <motion.div 
            className="absolute top-4 right-4 transform rotate-12 group-hover:rotate-0 transition-all duration-300"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="relative">
              <CheckCircle className="w-6 h-6 text-emerald-400 drop-shadow-md" />
              <div className="absolute inset-0 text-emerald-400 animate-ping opacity-30 w-6 h-6 rounded-full" />
            </div>
          </motion.div>
        )}
        
        <motion.div className="flex flex-col h-full pt-6" layoutId={`chapter-content-${chapter.id}`}>
          <motion.h3 
            className="font-serif text-xl text-amber-400 mb-1 group-hover:text-amber-300 transition-colors"
            layoutId={`chapter-title-${chapter.id}`}
          >
            {chapter.title}
          </motion.h3>
          
          <motion.p 
            className="text-ivory-200 text-sm mb-4"
            layoutId={`chapter-subtitle-${chapter.id}`}
          >
            {chapter.subtitle}
          </motion.p>
          
          <div className="relative">
            <p className="text-ivory-300/80 text-sm line-clamp-3 mb-6 flex-grow">
              {chapter.summary.substring(0, 100)}...
            </p>
            
            {isHovered && (
              <motion.div 
                className="absolute inset-0 bg-gradient-to-b from-transparent to-indigo-950/90 flex items-end justify-center pb-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <span className="text-amber-300 text-xs animate-bounce">Mag-click upang basahin</span>
              </motion.div>
            )}
          </div>
          
          <div className="flex items-center justify-between mt-auto pt-2 border-t border-indigo-800/30">
            <div className="flex items-center text-amber-300/90 group-hover:text-amber-300 transition-colors">
              <BookOpen className="w-4 h-4 mr-2 group-hover:animate-pulse" />
              <span className="text-sm font-medium">Basahin</span>
              <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
            </div>
            
            <div className="flex items-center">
              <Star className="w-4 h-4 text-amber-400/50 group-hover:text-amber-400 transition-colors" />
              <Menu className="w-4 h-4 ml-2 text-ivory-300/50 group-hover:text-ivory-300 transition-colors" />
            </div>
          </div>
        </motion.div>
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-amber-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      </motion.div>
    </Link>
  );
};

export default ChapterCard;