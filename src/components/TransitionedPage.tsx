import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

interface TransitionedPageProps {
  children: React.ReactNode;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98
  },
  in: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.98,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const TransitionedPage: React.FC<TransitionedPageProps> = ({ children }) => {
  const location = useLocation();
  
  // Skip animation wrapper for the chapters page since it has its own animations
  const isChaptersPage = location.pathname === '/chapters';
  
  if (isChaptersPage) {
    return <>{children}</>;
  }
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="in"
        exit="exit"
        variants={pageVariants}
        className="page-content"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default TransitionedPage; 