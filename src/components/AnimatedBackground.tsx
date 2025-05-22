import React from 'react';
import { BookOpen, Feather, Bookmark, Quote } from 'lucide-react';

interface AnimatedBackgroundProps {
  bubbleCount?: number;
  className?: string;
  speed?: number;
  static?: boolean;
  theme?: 'default' | 'literary';
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ 
  bubbleCount = 5,
  className = '',
  speed = 1,
  static: isStatic = false,
  theme = 'default'
}) => {
  const literaryIcons = [BookOpen, Feather, Bookmark, Quote];
  
  return (
    <div className={`absolute inset-0 z-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Floating Bubbles */}
      {[...Array(bubbleCount)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full opacity-20"
          style={{
            width: `${Math.random() * 150 + 80}px`,
            height: `${Math.random() * 150 + 80}px`,
            backgroundColor: i % 2 === 0 ? '#FBBF24' : '#4F46E5',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: isStatic ? 'none' : `float ${(Math.random() * 10 + 20) / speed}s infinite ease-in-out`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}
      
      {/* Literary theme elements */}
      {theme === 'literary' && [...Array(6)].map((_, i) => {
        const IconComponent = literaryIcons[i % literaryIcons.length];
        return (
          <div 
            key={`icon-${i}`}
            className="absolute opacity-5"
            style={{
              left: `${Math.random() * 90 + 5}%`,
              top: `${Math.random() * 90 + 5}%`,
              transform: `rotate(${Math.random() * 45 - 22.5}deg) scale(${0.8 + Math.random() * 1.2})`,
              animation: isStatic ? 'none' : `floatSlow ${(Math.random() * 15 + 30) / speed}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 10}s`,
            }}
          >
            <IconComponent size={80} />
          </div>
        );
      })}
      
      {/* Decorative Gradient Elements */}
      <div 
        className={`absolute top-0 right-0 w-1/2 h-1/2 bg-amber-400/5 rounded-full blur-3xl transform translate-x-1/4 -translate-y-1/4 ${isStatic ? '' : 'animate-pulse'}`}
      ></div>
      <div 
        className={`absolute bottom-0 left-0 w-1/2 h-1/2 bg-indigo-600/10 rounded-full blur-3xl transform -translate-x-1/4 translate-y-1/4 ${isStatic ? '' : 'animate-pulse'}`}
        style={isStatic ? {} : {animationDuration: `${8 / speed}s`}}
      ></div>
      
      {/* Additional distant glowing elements */}
      <div 
        className={`absolute top-1/4 left-1/4 w-32 h-32 bg-rose-500/5 rounded-full blur-2xl ${isStatic ? '' : 'animate-pulse'}`} 
        style={isStatic ? {} : {animationDuration: `${15 / speed}s`}}
      ></div>
      <div 
        className={`absolute bottom-1/3 right-1/3 w-40 h-40 bg-emerald-500/5 rounded-full blur-2xl ${isStatic ? '' : 'animate-pulse'}`} 
        style={isStatic ? {} : {animationDuration: `${20 / speed}s`}}
      ></div>
      
      {/* Style for the float animation */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(15deg); }
        }
      `}</style>
    </div>
  );
};

export default AnimatedBackground; 