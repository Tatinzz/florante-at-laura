import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NameModalProps {
  onSave: (name: string) => void;
}

const NameModal: React.FC<NameModalProps> = ({ onSave }) => {
  const [name, setName] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if name exists in localStorage
    const savedName = localStorage.getItem('studentName');
    if (!savedName) {
      setIsVisible(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      localStorage.setItem('studentName', name.trim());
      onSave(name.trim());
      setIsVisible(false);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-md shadow-xl"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Magandang Araw!</h2>
            <p className="text-gray-600 mb-6">
              Para ma-track ang iyong progress, pakilagay ang iyong pangalan.
            </p>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ilagay ang iyong pangalan"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all mb-4"
                required
              />
              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 px-6 rounded-xl transition-colors"
              >
                Simulan
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NameModal; 