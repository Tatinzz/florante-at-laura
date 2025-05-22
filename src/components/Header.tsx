import React, { useState, useEffect } from 'react';
import { BookOpen, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <motion.header 
      className={`fixed w-full top-0 z-50 ${
        isScrolled 
          ? 'bg-indigo-900/90 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 100, 
        damping: 20
      }}
    >
      <div className="container mx-auto px-4 py-5 flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center gap-3 text-gold-500"
        >
          <motion.div 
            className="text-amber-400 min-w-[32px]"
            whileHover={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5 }}
          >
            <BookOpen className="h-8 w-8" />
          </motion.div>
          <div className="flex flex-col">
            <motion.h1 
              className="font-serif text-xl md:text-2xl font-bold text-amber-400 leading-tight whitespace-nowrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Florante at Laura
            </motion.h1>
            <motion.p 
              className="text-xs md:text-sm text-amber-200 font-light whitespace-nowrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Digital Klasiko
            </motion.p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {[
            { path: '/', label: 'Tahanan' },
            { path: '/chapters', label: 'Mga Kabanata' },
            { path: '/about', label: 'Tungkol' }
          ].map((item, index) => (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.2 }}
            >
              <Link 
                to={item.path} 
                className={`text-ivory-100 hover:text-amber-300 px-2 py-1 relative ${location.pathname === item.path ? 'text-amber-300' : ''}`}
              >
                {item.label}
                {location.pathname === item.path && (
                  <motion.div 
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-amber-400 rounded-full"
                    layoutId="navIndicator"
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30
                    }}
                  />
                )}
              </Link>
            </motion.div>
          ))}
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link 
                to="/progress" 
                className="ml-2 px-5 py-2 bg-amber-500/80 hover:bg-amber-500 text-indigo-900 rounded-md font-medium"
              >
                Progreso
              </Link>
            </motion.div>
          </motion.div>
        </nav>

        {/* Mobile Menu Button */}
        <motion.button 
          className="md:hidden text-ivory-100 p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={isMenuOpen ? 'close' : 'menu'}
              initial={{ opacity: 0, rotate: isMenuOpen ? 45 : -45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: isMenuOpen ? -45 : 45 }}
              transition={{ duration: 0.3 }}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.div>
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="md:hidden absolute top-full left-0 w-full bg-indigo-900/95 backdrop-blur-md shadow-lg py-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-4 flex flex-col gap-4">
              {[
                { path: '/', label: 'Tahanan' },
                { path: '/chapters', label: 'Mga Kabanata' },
                { path: '/about', label: 'Tungkol' }
              ].map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link 
                    to={item.path} 
                    className={`text-ivory-100 hover:text-amber-300 py-3 px-2 block transition-colors border-b border-indigo-800/50 ${location.pathname === item.path ? 'text-amber-300' : ''}`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Link 
                  to="/progress" 
                  className="mt-2 py-3 text-center block bg-amber-500/80 hover:bg-amber-500 text-indigo-900 rounded-md transition-colors font-medium"
                >
                  Progreso
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;