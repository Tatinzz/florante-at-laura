import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Lightbulb, Users } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AnimatedBackground from '../components/AnimatedBackground';

const HomePage: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  // Ensure the component is properly mounted
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Add floating animation effect only to the card
  useEffect(() => {
    if (!mounted) return;
    
    const cardElement = document.querySelector('.floating-card');
    
    if (cardElement) {
      cardElement.animate(
        [
          { transform: 'translateY(0px) rotate(3deg)' },
          { transform: 'translateY(-15px) rotate(3deg)' },
          { transform: 'translateY(0px) rotate(3deg)' }
        ],
        {
          duration: 4000,
          iterations: Infinity,
          easing: 'ease-in-out'
        }
      );
    }
  }, [mounted]);

  return (
    <div className="min-h-screen bg-indigo-950 text-ivory-100 overflow-hidden">
      <Header />
      <AnimatedBackground bubbleCount={5} />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-amber-400/5 rounded-full blur-3xl transform translate-x-1/4 -translate-y-1/4 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-indigo-600/10 rounded-full blur-3xl transform -translate-x-1/4 translate-y-1/4 animate-pulse" style={{animationDuration: '8s'}}></div>
        </div>
        
        <div className="container mx-auto px-4 pt-20 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-amber-400 leading-tight mb-6 fade-in" style={{animationDelay: '0.2s'}}>
                Florante at Laura
              </h1>
              <p className="text-xl md:text-2xl text-ivory-200 mb-4 fade-in" style={{animationDelay: '0.4s'}}>Digital na Klasiko</p>
              <p className="text-ivory-300 mb-8 max-w-lg fade-in" style={{animationDelay: '0.6s'}}>
                Tuklasin muli ang isa sa mga pinakamagandang akdang Pilipino. Isang makabagong digital na karanasan 
                na nagdadala sa epiko ni Francisco Balagtas sa bagong henerasyon.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 fade-in" style={{animationDelay: '0.8s'}}>
                <Link 
                  to="/chapters" 
                  className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-indigo-900 font-medium rounded-lg flex items-center justify-center sm:justify-start btn-glow btn-press"
                >
                  <span>Magsimula</span>
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link 
                  to="/about" 
                  className="px-6 py-3 bg-indigo-800/50 hover:bg-indigo-800/80 text-ivory-100 font-medium rounded-lg flex items-center justify-center sm:justify-start btn-glow btn-press"
                >
                  Tungkol sa Akda
                </Link>
              </div>
              
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 fade-in" style={{animationDelay: '1s'}}>
                <div className="flex items-center p-3 bg-indigo-900/30 rounded-xl backdrop-blur-sm hover:bg-indigo-800/40 transition-all card-3d">
                  <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center mr-3">
                    <BookOpen className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <p className="font-medium text-ivory-100">30 Kabanata</p>
                    <p className="text-xs text-ivory-300">Buong akda</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-indigo-900/30 rounded-xl backdrop-blur-sm hover:bg-indigo-800/40 transition-all card-3d">
                  <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center mr-3">
                    <Lightbulb className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <p className="font-medium text-ivory-100">90+ Pagsusulit</p>
                    <p className="text-xs text-ivory-300">Interactive quizzes</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-indigo-900/30 rounded-xl backdrop-blur-sm hover:bg-indigo-800/40 transition-all card-3d">
                  <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center mr-3">
                    <Users className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <p className="font-medium text-ivory-100">Para sa Estudyante</p>
                    <p className="text-xs text-ivory-300">High school friendly</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              <div className="relative">
                {/* Cover image card - Only this element is floating and slanted */}
                <div className="floating-card w-72 h-96 md:w-80 md:h-[30rem] bg-indigo-900/50 backdrop-blur-md rounded-xl border border-indigo-700/30 shadow-xl relative overflow-hidden transform rotate-3 hover:rotate-0 transition-transform duration-300 glow-effect">
                  {/* Cover image */}
                  <img 
                    src="/florante-at-laura-images/cover.png" 
                    alt="Florante at Laura Cover" 
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-indigo-950/90"></div>
                  
                  {/* Information overlay at the bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                    <h3 className="font-serif text-2xl text-amber-400 mb-1">Florante at Laura</h3>
                    <p className="text-sm text-ivory-200 mb-1">Francisco Balagtas</p>
                    <p className="text-xs text-ivory-300">Kathang Awit (1838)</p>
                  </div>
                  
                  {/* Decorative floating elements */}
                  <div className="absolute top-10 right-10 w-16 h-16 bg-amber-400/10 rounded-full blur-xl animate-pulse"></div>
                  <div className="absolute top-20 left-10 w-12 h-12 bg-indigo-600/10 rounded-full blur-xl animate-pulse" style={{animationDuration: '6s'}}></div>
                </div>
                
                {/* Glowing effect */}
                <div className="absolute -bottom-8 left-0 right-0 h-16 bg-amber-500/20 filter blur-xl rounded-full opacity-70 z-0 animate-pulse" style={{animationDuration: '4s'}}></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
      
      {/* Add keyframes for float animation */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
      `}</style>
    </div>
  );
};

export default HomePage;