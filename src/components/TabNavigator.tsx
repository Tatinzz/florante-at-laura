import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
}

interface TabNavigatorProps {
  tabs: TabItem[];
  defaultActiveTab?: string;
  onChange?: (tabId: string) => void;
  className?: string;
}

const TabNavigator: React.FC<TabNavigatorProps> = ({ 
  tabs, 
  defaultActiveTab, 
  onChange,
  className = ''
}) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab || tabs[0]?.id || '');

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    if (onChange) {
      onChange(tabId);
    }
  };

  const activeContent = tabs.find(tab => tab.id === activeTab)?.content;

  return (
    <div className={`tab-navigator ${className}`}>
      <div className="flex overflow-x-auto no-scrollbar space-x-0 p-1 bg-indigo-900/30 backdrop-blur-sm rounded-t-lg border border-indigo-800/50">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`relative flex items-center gap-2 whitespace-nowrap px-4 py-3 transition-all ${
              activeTab === tab.id
                ? 'bg-amber-500/20 text-amber-400 font-medium'
                : 'text-ivory-300 hover:bg-indigo-800/30'
            }`}
          >
            {tab.icon && <span className="flex-shrink-0">{tab.icon}</span>}
            <span>{tab.label}</span>
            {activeTab === tab.id && (
              <motion.div 
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400"
                layoutId="activeTabIndicator"
              />
            )}
          </button>
        ))}
      </div>
      
      <div className="bg-indigo-900/60 backdrop-blur-md border-b border-l border-r border-indigo-800/50 rounded-b-lg">
        <motion.div 
          className="relative overflow-hidden"
          initial={false}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeContent}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default TabNavigator; 