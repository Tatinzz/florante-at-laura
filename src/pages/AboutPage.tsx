import React, { useEffect, useRef, useState } from 'react';
import { BookOpen, Quote, Feather, ScrollText, Heart, ChevronDown, Users, Scale, Flag } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AnimatedBackground from '../components/AnimatedBackground';
import { Link } from 'react-router-dom';
import styles from '../styles/QuoteMarks.module.css';
import { initializeMagneticEffect } from '../utils/animations';

const AboutPage: React.FC = () => {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Initialize animations
  useEffect(() => {
    // Initialize magnetic effect
    initializeMagneticEffect();
  }, []);
  
  // Add scroll reveal animation for sections
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in', 'visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    // Add scroll position listener to update active section and scroll progress
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Calculate scroll progress
      const progress = scrollPosition / (documentHeight - windowHeight);
      setScrollProgress(progress);
      
      // Find which section is currently in view
      sectionRefs.current.forEach((ref) => {
        if (ref && ref.offsetTop <= scrollPosition + 200) {
          ref.classList.add('scroll-reveal');
          requestAnimationFrame(() => {
            ref.classList.add('visible');
          });
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Add spotlight effect to elements
    document.querySelectorAll('.spotlight').forEach((element) => {
      const handleMouseMove = (e: Event) => {
        if (e instanceof MouseEvent) {
          const rect = element.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;
          (element as HTMLElement).style.setProperty('--x', `${x}%`);
          (element as HTMLElement).style.setProperty('--y', `${y}%`);
        }
      };
      
      element.addEventListener('mousemove', handleMouseMove);
      
      return () => {
        element.removeEventListener('mousemove', handleMouseMove);
      };
    });
    
    return () => {
      sectionRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToNextSection = () => {
    const nextSection = sectionRefs.current[0];
    if (nextSection) {
      window.scrollTo({
        top: nextSection.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-indigo-950 text-ivory-100 overflow-hidden">
      {/* Scroll Progress Indicator */}
      <div 
        className="scroll-progress"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />
      
      <Header />
      <AnimatedBackground bubbleCount={5} speed={0.5} static={true} />
      
      {/* Hero Section - Make background static */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-indigo-950 backdrop-blur-lg border-y border-indigo-800/30">
        <div className="absolute inset-0 z-0">
          {/* Static background with fixed gradients */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-amber-500/10 filter blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-indigo-500/10 filter blur-3xl"></div>
          <div className="absolute top-1/3 right-1/3 w-64 h-64 rounded-full bg-purple-500/10 filter blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-6 relative">
              <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl text-amber-400 mb-0 inline-block relative">
                <span className="absolute -top-12 -left-8 text-9xl opacity-10 font-serif">"</span>
                <span className="relative z-10 slide-in-left" style={{ animationDelay: '0.2s' }}>Tungkol</span>
                <span className="relative z-10 mx-3 text-ivory-100 opacity-80 slide-in-left" style={{ animationDelay: '0.4s' }}>sa</span>
                <span className="relative z-10 slide-in-left" style={{ animationDelay: '0.6s' }}>Akda</span>
                <span className="absolute -bottom-4 -right-8 text-9xl opacity-10 font-serif">"</span>
              </h1>
              <div className="w-40 h-1 bg-amber-500/50 mx-auto mt-8 rounded-full slide-in-right" style={{ animationDelay: '0.8s' }}></div>
            </div>
            
            <p className="text-xl md:text-2xl text-ivory-200/90 mb-12 max-w-3xl mx-auto fade-in slide-in-right" style={{ animationDelay: '0.6s' }}>
              <span className="text-amber-400/80">Isang mahabang kathang-awit</span> na kumikisig sa puso ng ating panitikang Filipino
            </p>
            
            <div className="relative mb-12 py-8 fade-in" style={{ animationDelay: '0.8s' }}>
              <Quote className="w-16 h-16 text-amber-500/40 mx-auto mb-6" />
              <blockquote className="text-ivory-100 italic max-w-2xl mx-auto text-center text-lg md:text-xl leading-relaxed">
                <span className="block" style={{ animationDelay: '0.2s' }}>
                  "Sa loob at labas ng bayan kong sawi,
                </span>
                <span className="block" style={{ animationDelay: '0.4s' }}>
                  kaliluha'y siyang nangyayaring hari,
                </span>
                <span className="block" style={{ animationDelay: '0.6s' }}>
                  kagalinga't bait ay nalulugami,
                </span>
                <span className="block" style={{ animationDelay: '0.8s' }}>
                  ininis sa hukay ng dusa't pighati..."
                </span>
              </blockquote>
            </div>
            
            <div onClick={scrollToNextSection} className="inline-block cursor-pointer mt-8 fade-in" style={{ animationDelay: '1.2s' }}>
              <div className="flex flex-col items-center text-amber-400/70 hover:text-amber-300 transition-colors">
                <span className="text-sm mb-2">Alamin ang Higit Pa</span>
                <div className="w-10 h-10 flex items-center justify-center border border-amber-500/30 rounded-full">
                  <ChevronDown className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <div className="container mx-auto px-4 pt-20 pb-20 relative z-10">
        {/* About the Epic */}
        <div 
          ref={(el) => (sectionRefs.current[0] = el)}
          className="max-w-5xl mx-auto mb-32 scroll-reveal"
        >
          <div className="flex flex-col md:flex-row items-start gap-12">
            <div className="w-full md:w-1/3 md:sticky md:top-32 self-start">
              <div className="flex items-center gap-3 mb-4 slide-in-left" style={{ animationDelay: '0.2s' }}>
                <div className="p-3 rounded-full bg-amber-500/20 text-amber-400">
                  <ScrollText className="w-6 h-6" />
                </div>
                <h2 className="font-serif text-4xl text-amber-400">Ang Epiko</h2>
              </div>
              <div className="h-1 w-24 bg-amber-500/30 mb-6 rounded-full slide-in-left" style={{ animationDelay: '0.3s' }}></div>
              <p className="text-ivory-300 slide-in-left" style={{ animationDelay: '0.4s' }}>
                Akdang walang kaparis na sumasalamin sa kulturang Filipino at pagkakakilanlang Pilipino.
              </p>
              
              <div className="mt-8 p-4 border border-amber-500/20 rounded-lg bg-amber-500/5 backdrop-blur-sm slide-in-left" style={{ animationDelay: '0.5s' }}>
                <div className="flex items-center mb-2">
                  <div className="w-3 h-3 rounded-full bg-amber-400 mr-2"></div>
                  <p className="text-amber-400 text-sm font-medium">Isang maikling tanong</p>
                </div>
                <p className="text-ivory-200 text-sm italic">
                  "Bakit mahalaga ang mga akdang tulad ng 'Florante at Laura' sa kasalukuyang henerasyon?"
                </p>
              </div>
            </div>
            
            <div className="w-full md:w-2/3">
              <div className="bg-indigo-900/50 backdrop-blur-md rounded-xl p-8 border border-indigo-800/30 shadow-lg hover:border-amber-500/30 transition-all hover:bg-indigo-800/40 slide-in-right" style={{ animationDelay: '0.3s' }}>
                <p className="mb-4 text-ivory-200 leading-relaxed">
                  Ang <span className="text-amber-400 font-medium">"Florante at Laura"</span> ay isang awit o sinaklolohan na isinulat ni Francisco Balagtas noong ika-19 na siglo. 
                  Inilathala ito noong 1838 at itinuturing na isa sa pinakamahalagang akdang pampanitikan sa wikang Filipino.
                </p>
                <p className="mb-4 text-ivory-200 leading-relaxed">
                  Ang akda ay naglalaman ng <span className="text-amber-400 font-medium">399 na saknong</span> (stanza) na may tig-apat na taludtod (line) bawat isa. 
                  Ang bawat taludtod ay binubuo ng labindalawang pantig at gumagamit ng tugmang <span className="font-mono text-amber-300/80">A-A-B-B</span>.
                </p>
                <p className="text-ivory-200 leading-relaxed">
                  Sa pamamagitan ng awit na ito, ipinakita ni Balagtas ang kanyang pagmamahal sa bayan, pag-ibig sa kapwa, at pagnanais na 
                  mabago ang mga di-makatarungang sistema sa lipunan sa panahong iyon.
                </p>
                
                <div className="mt-6 pt-6 border-t border-indigo-700/30 grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-4xl font-serif text-amber-400 mb-1">399</div>
                    <p className="text-xs text-ivory-300">Saknong</p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-serif text-amber-400 mb-1">1838</div>
                    <p className="text-xs text-ivory-300">Taon ng Paglalathala</p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-serif text-amber-400 mb-1">AABB</div>
                    <p className="text-xs text-ivory-300">Kayarian ng Tugma</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-6 bg-indigo-800/30 rounded-lg border border-indigo-700/30 mt-6 slide-in-right" style={{ animationDelay: '0.5s' }}>
                <div className="text-amber-400">
                  <Feather className="w-6 h-6" />
                </div>
                <div>
                  <p className={`text-ivory-200 italic text-base relative ${styles.quoteMarks}`}>
                    Ang mahusay na akda ay hindi nawawala sa paglipas ng panahon; ito ay nalilimbag sa puso ng mga bumabasa.
                  </p>
                  <p className="text-amber-400/70 text-xs mt-2">— Kasabihan ng mga Makata</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* The Story */}
        <div 
          ref={(el) => (sectionRefs.current[1] = el)}
          className="max-w-5xl mx-auto mb-32 scroll-reveal"
        >
          <div className="flex flex-col md:flex-row gap-12">
            <div className="w-full md:w-1/3 md:sticky md:top-32 self-start">
              <div className="flex items-center gap-3 mb-4 slide-in-left" style={{ animationDelay: '0.2s' }}>
                <div className="p-3 rounded-full bg-purple-500/20 text-purple-400">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h2 className="font-serif text-4xl text-amber-400">Ang Kwento</h2>
              </div>
              <div className="h-1 w-24 bg-amber-500/30 mb-6 rounded-full slide-in-left" style={{ animationDelay: '0.3s' }}></div>
              <p className="text-ivory-300 slide-in-left" style={{ animationDelay: '0.4s' }}>
                Isang kwento ng pagmamahal, pagtataksil, at katapangan sa gitna ng pagsubok.
              </p>
              
              <div className="mt-8 relative slide-in-left" style={{ animationDelay: '0.6s' }}>
                <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500/50 via-amber-500/50 to-emerald-500/50 rounded-full"></div>
                <div className="pl-6 border-l border-indigo-700/30 py-4">
                  <p className="text-ivory-200 mb-4 opacity-70 text-sm">Ang kwentong ito ay hindi lamang isang kwento ng pag-ibig at katapangan, ito ay isang salamin ng lipunan noong panahon ng kolonya.</p>
                  <div className="text-right">
                    <p className="text-amber-400 text-xs">— Literary Critics</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-2/3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-indigo-900/50 backdrop-blur-md rounded-xl border border-indigo-800/30 overflow-hidden hover:border-blue-500/30 transition-all slide-in-right" style={{ animationDelay: '0.3s' }}>
                  <div className="h-2 bg-blue-500/50"></div>
                  <div className="p-6">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 mb-4">
                      <span className="font-serif text-lg">1</span>
                    </div>
                    <h3 className="font-serif text-amber-400 mb-3 font-medium">Simula</h3>
                    <p className="text-ivory-200 text-sm">
                      Si Florante ay natagpuan ni Aladin, nakatali sa punong higera sa Kagubatan ng Albania, naghihintay ng kamatayan.
                    </p>
                  </div>
                </div>
                
                <div className="bg-indigo-900/50 backdrop-blur-md rounded-xl border border-indigo-800/30 overflow-hidden hover:border-purple-500/30 transition-all slide-in-right" style={{ animationDelay: '0.5s' }}>
                  <div className="h-2 bg-purple-500/50"></div>
                  <div className="p-6">
                    <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 mb-4">
                      <span className="font-serif text-lg">2</span>
                    </div>
                    <h3 className="font-serif text-amber-400 mb-3 font-medium">Gitnaan</h3>
                    <p className="text-ivory-200 text-sm">
                      Nilagay ni Adolfo si Florante sa panganib at inagaw ang kanyang trono at kasintahan na si Laura.
                    </p>
                  </div>
                </div>
                
                <div className="bg-indigo-900/50 backdrop-blur-md rounded-xl border border-indigo-800/30 overflow-hidden hover:border-emerald-500/30 transition-all slide-in-right" style={{ animationDelay: '0.7s' }}>
                  <div className="h-2 bg-emerald-500/50"></div>
                  <div className="p-6">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                      <span className="font-serif text-lg">3</span>
                    </div>
                    <h3 className="font-serif text-amber-400 mb-3 font-medium">Wakas</h3>
                    <p className="text-ivory-200 text-sm">
                      Nagkita muli sina Florante at Laura, at naibalik ang kapayapaan sa Albania matapos maraming pagsubok.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-indigo-900/50 backdrop-blur-md rounded-xl p-8 border border-indigo-800/30 shadow-lg hover:border-purple-500/30 transition-all hover:bg-indigo-800/40 slide-in-right" style={{ animationDelay: '0.9s' }}>
                <div className="flex items-center mb-4">
                  <div className="mr-3 text-purple-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 19a9 9 0 0 1 9 0 9 9 0 0 1 9 0M3 6a9 9 0 0 1 9 0 9 9 0 0 1 9 0M3 6v13M12 6v13M21 6v13"></path></svg>
                  </div>
                  <h4 className="font-serif text-xl text-purple-400">Ang Buod ng Kwento</h4>
                </div>
                
                <p className="mb-4 text-ivory-200 leading-relaxed">
                  Nagsisimula ang kwento sa isang kagubatan sa Albania, kung saan natagpuan si <span className="text-amber-400">Florante</span> na nakatali sa isang punong 
                  higera, naghihintay ng kanyang kamatayan. Siya ay iniligtas ni <span className="text-emerald-400">Aladin</span>, isang Morong prinsipe mula sa Persiya na 
                  nagtatago rin sa kagubatan.
                </p>
                <p className="mb-4 text-ivory-200 leading-relaxed">
                  Sa pamamagitan ng kanilang mga kwento at kuwentuhan, nalaman na si Florante ay anak ni <span className="text-blue-400">Duke Briseo</span>, ang punong
                  tagapayo ng Hari ng Albania. Nagbalik si Florante sa Albania matapos mag-aral sa Atenas upang 
                  ipagtanggol ang kaharian laban sa mga Turko, ngunit siya ay ipinagkanulo ni <span className="text-rose-400">Adolfo</span>, ang kanyang dating kaibigan.
                </p>
                <p className="text-ivory-200 leading-relaxed">
                  Sa huli, nakatutuwa na ang mga magkasintahan—sina Florante at <span className="text-purple-400">Laura</span>, at sina Aladin at <span className="text-teal-400">Flerida</span>—ay nagkita-kita 
                  sa kagubatan kung saan naibalik ang katahimikan at katarungan sa Albania.
                </p>
                
                <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-3 rounded-lg bg-indigo-800/40 border border-indigo-700/30">
                    <div className="text-sm text-amber-400 font-medium mb-1">Pangunahing Tauhan</div>
                    <p className="text-xs text-ivory-300">Florante, Laura, Aladin, Flerida, Adolfo</p>
                  </div>
                  <div className="p-3 rounded-lg bg-indigo-800/40 border border-indigo-700/30">
                    <div className="text-sm text-amber-400 font-medium mb-1">Tagpuan</div>
                    <p className="text-xs text-ivory-300">Albania at mga karatig na lugar</p>
                  </div>
                  <div className="p-3 rounded-lg bg-indigo-800/40 border border-indigo-700/30">
                    <div className="text-sm text-amber-400 font-medium mb-1">Suliranin</div>
                    <p className="text-xs text-ivory-300">Pagtataksil, panganib, pagkawala</p>
                  </div>
                  <div className="p-3 rounded-lg bg-indigo-800/40 border border-indigo-700/30">
                    <div className="text-sm text-amber-400 font-medium mb-1">Resolusyon</div>
                    <p className="text-xs text-ivory-300">Pagkakatagpo at pagsasauli ng katarungan</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* The Author */}
        <div 
          ref={(el) => (sectionRefs.current[2] = el)}
          className="max-w-5xl mx-auto mb-32 scroll-reveal"
        >
          <div className="flex flex-col md:flex-row gap-12">
            <div className="w-full md:w-1/3 md:sticky md:top-32 self-start">
              <div className="flex items-center gap-3 mb-4 slide-in-left" style={{ animationDelay: '0.2s' }}>
                <div className="p-3 rounded-full bg-emerald-500/20 text-emerald-400">
                  <Feather className="w-6 h-6" />
                </div>
                <h2 className="font-serif text-4xl text-amber-400">Ang May-akda</h2>
              </div>
              <div className="h-1 w-24 bg-amber-500/30 mb-6 rounded-full slide-in-left" style={{ animationDelay: '0.3s' }}></div>
              <p className="text-ivory-300 slide-in-left" style={{ animationDelay: '0.4s' }}>
                Si Francisco Balagtas, isa sa mga dakilang makata at manunulat ng panitikang Filipino.
              </p>
              
              <div className="mt-8 p-4 border border-amber-500/20 rounded-lg bg-emerald-500/5 backdrop-blur-sm slide-in-left" style={{ animationDelay: '0.6s' }}>
                <div className="flex justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-amber-500/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9.6 20H7.4C6.08 20 5.42 20 4.98 19.782C4.6 19.59 4.41 19.29 4.22 18.74C4 18.1 4 17.19 4 15.4V15.4C4 13.61 4 12.7 4.22 12.06C4.41 11.51 4.6 11.21 4.98 11.02C5.42 10.8 6.08 10.8 7.4 10.8H9.6M9.6 20V10.8M9.6 20H14.4M9.6 10.8H14.4M14.4 20H16.6C17.92 20 18.58 20 19.02 19.78C19.4 19.59 19.59 19.29 19.78 18.74C20 18.1 20 17.19 20 15.4V15.4C20 13.61 20 12.7 19.78 12.06C19.59 11.51 19.4 11.21 19.02 11.02C18.58 10.8 17.92 10.8 16.6 10.8H14.4M14.4 20V10.8M12 10.8V4M12 4L9 7M12 4L15 7"></path>
                  </svg>
                </div>
                <blockquote className="text-ivory-200 text-sm italic text-center">
                  "Ang makatang hindi nakakilala ng kanyang sariling wika ay higit sa hayop at malansang isda."
                </blockquote>
                <p className="text-amber-400/70 text-xs mt-2 text-right">— Francisco Balagtas</p>
              </div>
            </div>
            
            <div className="w-full md:w-2/3">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8 bg-indigo-900/50 backdrop-blur-md rounded-xl p-8 border border-indigo-800/30 shadow-lg hover:border-emerald-500/30 transition-all hover:bg-indigo-800/40 overflow-hidden mb-6 slide-in-right" style={{ animationDelay: '0.3s' }}>
                <div className="w-full md:w-2/5 flex justify-center">
                  <div className="relative w-56 h-72 overflow-hidden rounded-xl border border-amber-500/30 shadow-xl transform hover:scale-105 transition-all duration-500">
                    <img 
                      src="/florante-at-laura-images/francisco-balagtas.png" 
                      alt="Francisco Balagtas Portrait" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-indigo-900/80 to-transparent"></div>
                  </div>
                </div>
                <div className="w-full md:w-3/5">
                  <div className="relative mb-6">
                    <h3 className="font-serif text-3xl text-amber-400 mb-1">Francisco Balagtas Baltazar</h3>
                    <p className="text-sm text-amber-300/80 mb-4">1788 - 1862</p>
                    <div className="h-1 w-20 bg-amber-500/30 rounded-full"></div>
                  </div>
                  <p className="mb-3 text-ivory-200 leading-relaxed">
                    Si <span className="text-amber-400">Francisco Balagtas Baltazar</span>, na kilala rin sa kanyang pen name na "Francisco Baltazar," 
                    ay isang makata at manunulat na itinuturing na isa sa pinakadakilang manunulat ng panitikang Tagalog. 
                  </p>
                  <p className="mb-3 text-ivory-200 leading-relaxed">
                    Ipinanganak siya sa <span className="text-teal-400">Bigaa, Bulacan</span> (ngayon ay Balagtas, Bulacan na ipinangalan sa kanya) at nakatanggap ng 
                    edukasyon sa Colegio de San Jose at Colegio de San Juan de Letran.
                  </p>
                  <p className="text-ivory-200 leading-relaxed">
                    Isinulat niya ang "Florante at Laura" noong siya ay <span className="text-rose-400">nakakulong sa bilangguan sa Bataan</span>. 
                    Ang akda ay kumakatawan sa kanyang sariling pakikibaka laban sa kawalan ng katarungan at pang-aapi.
                  </p>
                </div>
              </div>
              
              {/* Timeline */}
              <div className="relative border-l-2 border-amber-500/30 pl-6 py-4 ml-4 slide-in-right" style={{ animationDelay: '0.5s' }}>
                <div className="mb-8 slide-in-right" style={{ animationDelay: '0.2s' }}>
                  <div className="absolute -left-[9px] w-4 h-4 rounded-full bg-amber-500"></div>
                  <div className="text-amber-400 font-serif text-xl mb-1">1788</div>
                  <p className="text-ivory-200 text-sm">Ipinanganak sa Bigaa, Bulacan</p>
                  <div className="mt-2 text-ivory-300/70 text-xs">
                    Si Francisco Balagtas ay ipinanganak noong Abril 2, 1788 sa isang simpleng pamilya.
                  </div>
                </div>
                <div className="mb-8 slide-in-right" style={{ animationDelay: '0.4s' }}>
                  <div className="absolute -left-[9px] w-4 h-4 rounded-full bg-amber-500"></div>
                  <div className="text-amber-400 font-serif text-xl mb-1">1838</div>
                  <p className="text-ivory-200 text-sm">Inilathala ang "Florante at Laura"</p>
                  <div className="mt-2 text-ivory-300/70 text-xs">
                    Ang kanyang pinaka-kilalang akda ay inilathala habang siya ay nakakulong dahil sa pagtataksil ng isang kapwa manliligaw.
                  </div>
                </div>
                <div className="slide-in-right" style={{ animationDelay: '0.6s' }}>
                  <div className="absolute -left-[9px] w-4 h-4 rounded-full bg-amber-500"></div>
                  <div className="text-amber-400 font-serif text-xl mb-1">1862</div>
                  <p className="text-ivory-200 text-sm">Pumanaw sa edad na 74</p>
                  <div className="mt-2 text-ivory-300/70 text-xs">
                    Namatay siya sa Udyong, Bataan, ngunit ang kanyang mga akda ay nananatiling buhay hanggang sa kasalukuyan.
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-5 bg-indigo-900/30 rounded-xl border border-indigo-800/50 slide-in-right" style={{ animationDelay: '0.7s' }}>
                <h4 className="font-serif text-amber-400 text-lg mb-3">Iba Pang Akda</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-indigo-800/20 rounded-lg border border-indigo-700/30 hover:border-amber-500/30 transition-all">
                    <p className="text-ivory-200 text-sm font-medium">Orosman at Zafira</p>
                  </div>
                  <div className="p-3 bg-indigo-800/20 rounded-lg border border-indigo-700/30 hover:border-amber-500/30 transition-all">
                    <p className="text-ivory-200 text-sm font-medium">Auredato at Astrome</p>
                  </div>
                  <div className="p-3 bg-indigo-800/20 rounded-lg border border-indigo-700/30 hover:border-amber-500/30 transition-all">
                    <p className="text-ivory-200 text-sm font-medium">Alamansor at Rosalinda</p>
                  </div>
                  <div className="p-3 bg-indigo-800/20 rounded-lg border border-indigo-700/30 hover:border-amber-500/30 transition-all">
                    <p className="text-ivory-200 text-sm font-medium">Clara Belmonte</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Themes */}
        <div 
          ref={(el) => (sectionRefs.current[3] = el)}
          className="max-w-5xl mx-auto mb-32 scroll-reveal"
        >
          <div className="flex flex-col md:flex-row gap-12">
            <div className="w-full md:w-1/3 md:sticky md:top-32 self-start">
              <div className="flex items-center gap-3 mb-4 slide-in-left" style={{ animationDelay: '0.2s' }}>
                <div className="p-3 rounded-full bg-amber-500/20 text-amber-400">
                  <Heart className="w-6 h-6" />
                </div>
                <h2 className="font-serif text-4xl text-amber-400">Tema at Aral</h2>
              </div>
              <div className="h-1 w-24 bg-amber-500/30 mb-6 rounded-full slide-in-left" style={{ animationDelay: '0.3s' }}></div>
              <p className="text-ivory-300 slide-in-left" style={{ animationDelay: '0.4s' }}>
                Ang mga paksang nagbibigay lalim sa akda at umaapaw sa mga aral para sa lipunan.
              </p>

              <div className="mt-8 relative overflow-hidden rounded-xl border border-amber-500/20 bg-amber-500/5 slide-in-left" style={{ animationDelay: '0.6s' }}>
                <svg className="absolute -right-8 -bottom-8 text-amber-500/10 rotate-12 transform scale-150" width="80" height="80" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <div className="p-5">
                  <h3 className="text-amber-400 font-medium mb-2 text-lg">Bakit mahalaga ang tema?</h3>
                  <p className="text-ivory-200 text-sm leading-relaxed mb-0">
                    Ang mga tema ng akda ay nagsisilbing salamin ng lipunan at nagbibigay-daan upang makita ang mas malalim na kahulugan ng akda sa iba't ibang panahon at konteksto.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-2/3">
              <div className="space-y-6">
                <div className="bg-indigo-900/50 backdrop-blur-md rounded-xl border border-indigo-800/30 p-6 transition-colors hover:border-amber-500/30 fade-in" style={{ animationDelay: '0.3s' }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400">
                      <Heart className="w-6 h-6" />
                    </div>
                    <h3 className="font-medium text-xl text-amber-300">Pag-ibig</h3>
                  </div>
                  <p className="text-ivory-200 text-sm leading-relaxed">
                    Ang epiko ay nagpapakita ng iba't ibang uri ng pag-ibig: romantikong pag-ibig, pag-ibig sa bayan, 
                    at pag-ibig sa pamilya. Makikita ito sa mga ugnayan nina Florante at Laura, gayundin sa mithiin ni Florante
                    para sa kanyang bayan.
                  </p>
                  <div className="mt-4 pt-4 border-t border-indigo-700/30">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                      <p className="text-amber-300/80 text-xs font-medium">Simbolo: Puso at Rosas</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-indigo-900/50 backdrop-blur-md rounded-xl border border-indigo-800/30 p-6 transition-colors hover:border-purple-500/30 fade-in" style={{ animationDelay: '0.4s' }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                      <Users className="w-6 h-6" />
                    </div>
                    <h3 className="font-medium text-xl text-purple-300">Pagkakaibigan</h3>
                  </div>
                  <p className="text-ivory-200 text-sm leading-relaxed">
                    Pinagtutuunan din ng akda ang tunay na pagkakaibigan (Florante at Aladin) at ang pagtataksil (Adolfo). 
                    Ito ay nagpapakita kung paano ang tunay na pagkakaibigan ay lumalampas sa mga hadlang tulad ng relihiyon at kultura.
                  </p>
                  <div className="mt-4 pt-4 border-t border-indigo-700/30">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                      <p className="text-purple-300/80 text-xs font-medium">Simbolo: Kamay na Magkahawak</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-indigo-900/50 backdrop-blur-md rounded-xl border border-indigo-800/30 p-6 transition-colors hover:border-blue-500/30 fade-in" style={{ animationDelay: '0.5s' }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                      <Scale className="w-6 h-6" />
                    </div>
                    <h3 className="font-medium text-xl text-blue-300">Katarungan</h3>
                  </div>
                  <p className="text-ivory-200 text-sm leading-relaxed">
                    Ang laban sa pagitan ng kabutihan at kasamaan, at ang hamon ng paghahanap ng katarungan sa isang lipunang 
                    puno ng pang-aapi. Si Adolfo ay kumakatawan sa kasamaan at pang-aapi, habang si Florante ay simbolo ng katarungan.
                  </p>
                  <div className="mt-4 pt-4 border-t border-indigo-700/30">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <p className="text-blue-300/80 text-xs font-medium">Simbolo: Timbangan at Espada</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-indigo-900/50 backdrop-blur-md rounded-xl border border-indigo-800/30 p-6 transition-colors hover:border-emerald-500/30 fade-in" style={{ animationDelay: '0.6s' }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                      <Flag className="w-6 h-6" />
                    </div>
                    <h3 className="font-medium text-xl text-emerald-300">Pagmamahal sa Tinubuang Lupa</h3>
                  </div>
                  <p className="text-ivory-200 text-sm leading-relaxed">
                    Kadalasang binibigyang-kahulugan ang akda bilang isang alegorya para sa pagmamahal sa Pilipinas 
                    at sa pakikibaka para sa kalayaan. Ito ay maaring interpretasyon ng pagnanais ni Balagtas na makita ang Pilipinas na 
                    malaya mula sa kolonyalismo.
                  </p>
                  <div className="mt-4 pt-4 border-t border-indigo-700/30">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                      <p className="text-emerald-300/80 text-xs font-medium">Simbolo: Lupain at Watawat</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-8 bg-gradient-to-br from-indigo-900/50 to-purple-900/30 backdrop-blur-md rounded-xl border border-indigo-800/30 hover:border-amber-500/30 transition-all shadow-lg slide-in-right" style={{ animationDelay: '0.9s' }}>
                <div className="flex items-center mb-6">
                  <div className="p-2 rounded-lg bg-amber-500/20 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
                  </div>
                  <h3 className="font-serif text-2xl text-amber-400">Kahalagahan sa Kasalukuyang Panahon</h3>
                </div>
                <p className="text-ivory-200 leading-relaxed mb-4">
                  Bagaman isinulat noong ika-19 na siglo, ang mga tema at aral ng "Florante at Laura" ay nananatiling makabuluhan at nauugnay sa ating lipunan hanggang ngayon.
                </p>
                <p className="text-ivory-200 leading-relaxed">
                  Ang pakikibaka para sa katarungan, kahalagahan ng tunay na pagkakaibigan, at pagmamahal sa bayan ay mga temang walang hanggang halaga sa anumang panahon at lipunan.
                </p>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex gap-3 items-center p-3 bg-indigo-800/30 rounded-lg border border-indigo-700/30">
                    <div className="text-amber-400">
                      <Heart className="w-5 h-5" fill="currentColor" />
                    </div>
                    <span className="text-ivory-200 text-sm">Makabuluhang Pag-ibig</span>
                  </div>
                  <div className="flex gap-3 items-center p-3 bg-indigo-800/30 rounded-lg border border-indigo-700/30">
                    <div className="text-blue-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                    </div>
                    <span className="text-ivory-200 text-sm">Kritikal na Pag-iisip</span>
                  </div>
                  <div className="flex gap-3 items-center p-3 bg-indigo-800/30 rounded-lg border border-indigo-700/30">
                    <div className="text-emerald-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path></svg>
                    </div>
                    <span className="text-ivory-200 text-sm">Pagkakaisa sa Pagkakaiba</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Call to Action */}
      <div className="relative py-20 bg-indigo-800/20 border-t border-indigo-700/30">
        <div className="container mx-auto px-4 relative z-10 text-center stagger-fade-in">
          <h2 className="font-serif text-3xl md:text-4xl text-amber-400 mb-6">
            Tuklasin ang Kagandahan ng Akda
          </h2>
          <p className="text-ivory-200 max-w-2xl mx-auto mb-8 typewriter">
            Simulan ang iyong paglalakbay sa mundo nina Florante at Laura.
          </p>
          <div className="fade-in" style={{ animationDelay: '0.6s' }}>
            <Link 
              to="/chapters" 
              className="inline-flex items-center px-8 py-4 bg-amber-500 hover:bg-amber-600 text-indigo-900 font-medium rounded-lg transition-all btn-press"
            >
              <span>Magsimula sa Pagbabasa</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutPage; 