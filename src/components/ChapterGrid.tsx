import React from 'react';
import { motion } from 'framer-motion';
import ChapterCard from './ChapterCard';
import { Chapter } from '../types';

interface ChapterGridProps {
  chapters: Chapter[];
  emptyMessage?: React.ReactNode;
}

// Grid container and item animations
const gridVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
};

const ChapterGrid: React.FC<ChapterGridProps> = ({ chapters, emptyMessage }) => {
  if (chapters.length === 0 && emptyMessage) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {emptyMessage}
      </div>
    );
  }
  
  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
      variants={gridVariants}
      initial="hidden"
      animate="show"
    >
      {chapters.map((chapter, index) => (
        <div key={chapter.id}>
          <ChapterCard chapter={chapter} index={index} />
        </div>
      ))}
    </motion.div>
  );
};

export default ChapterGrid;