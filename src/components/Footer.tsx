import React from 'react';
import { BookOpen, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

interface FooterProps {
  className?: string;
  style?: React.CSSProperties;
}

const Footer: React.FC<FooterProps> = ({ className = '', style = {} }) => {
  return (
    <motion.footer 
      className={`relative z-10 border-t border-indigo-800/30 bg-indigo-950/80 backdrop-blur-md py-6 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      style={style}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center">
              <motion.div 
                className="text-amber-400 mr-2"
                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <BookOpen className="w-5 h-5" />
              </motion.div>
              <h3 className="font-serif text-xl text-amber-400 border-expand">Florante at Laura</h3>
            </div>
            <p className="text-xs text-ivory-300 mt-1">Digital na Klasiko</p>
          </div>
          
          <div className="text-right">
            <p className="text-sm text-ivory-200 flex items-center justify-center md:justify-end">
              Made with <Heart className="w-4 h-4 text-rose-500 mx-1 fill-rose-500 float-subtle" /> for Filipino literature © 2025
            </p>
            <p className="text-xs text-ivory-300 mt-1">Developed by Clarence Edoria</p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer; 