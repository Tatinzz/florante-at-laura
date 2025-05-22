import React, { useEffect } from 'react';
import { 
  BookOpen, 
  Quote,
  Feather, 
  ScrollText, 
  Heart, 
  Users, 
  Scale, 
  Flag 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AnimatedBackground from '../components/AnimatedBackground';
import TabNavigator from '../components/TabNavigator';
import { initializeMagneticEffect } from '../utils/animations';

const AboutTabsPage: React.FC = () => {
  // Initialize animations
  useEffect(() => {
    // Initialize magnetic effect
    initializeMagneticEffect();
    
    // Smooth scroll to top when component mounts
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  // Tab content for the Epic section
  const EpikoContent = (
    <div className="p-8">
      <div>
        <p className="mb-4 text-ivory-200 leading-relaxed">
          Ang <span className="text-amber-400 font-medium">"Florante at Laura"</span> ay isang awit o sinaklolohan na isinulat ni Francisco Balagtas noong ika-19 na siglo. 
          Inilathala ito noong 1838 at itinuturing na isa sa pinakamahalagang akdang pampanitikan sa wikang Filipino.
        </p>
        <p className="mb-4 text-ivory-200 leading-relaxed">
          Ang akda ay naglalaman ng <span className="text-amber-400 font-medium">399 na saknong</span> (stanza) na may tig-apat na taludtod (line) bawat isa. 
          Ang bawat taludtod ay binubuo ng labindalawang pantig at gumagamit ng tugmang <span className="font-mono text-amber-300/80">A-A-B-B</span>.
        </p>
        <p className="text-ivory-200 leading-relaxed mb-8">
          Sa pamamagitan ng awit na ito, ipinakita ni Balagtas ang kanyang pagmamahal sa bayan, pag-ibig sa kapwa, at pagnanais na 
          mabago ang mga di-makatarungang sistema sa lipunan sa panahong iyon.
        </p>
      </div>
      
      {/* Stats display at the bottom */}
      <div className="flex justify-center items-center gap-8 md:gap-24 mt-8 py-8 border-t border-indigo-700/30">
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
  );

  // Tab content for the Story section
  const KwentoContent = (
    <div className="p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-indigo-900/50 backdrop-blur-md rounded-xl border border-indigo-800/30 overflow-hidden hover:border-blue-500/30 transition-all">
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
        
        <div className="bg-indigo-900/50 backdrop-blur-md rounded-xl border border-indigo-800/30 overflow-hidden hover:border-purple-500/30 transition-all">
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
        
        <div className="bg-indigo-900/50 backdrop-blur-md rounded-xl border border-indigo-800/30 overflow-hidden hover:border-emerald-500/30 transition-all">
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
      
      <div className="bg-indigo-900/50 backdrop-blur-md rounded-xl p-8 border border-indigo-800/30 shadow-lg hover:border-purple-500/30 transition-all hover:bg-indigo-800/40">
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
      </div>
    </div>
  );

  // Tab content for the Author section
  const MayAkdaContent = (
    <div>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 bg-indigo-900/50 backdrop-blur-md rounded-xl p-8 border border-indigo-800/30 shadow-lg hover:border-emerald-500/30 transition-all hover:bg-indigo-800/40 overflow-hidden mb-6">
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
      <div className="relative border-l-2 border-amber-500/30 pl-6 py-4 ml-4">
        <div className="mb-8">
          <div className="absolute -left-[9px] w-4 h-4 rounded-full bg-amber-500"></div>
          <div className="text-amber-400 font-serif text-xl mb-1">1788</div>
          <p className="text-ivory-200 text-sm">Ipinanganak sa Bigaa, Bulacan</p>
          <div className="mt-2 text-ivory-300/70 text-xs">
            Si Francisco Balagtas ay ipinanganak noong Abril 2, 1788 sa isang simpleng pamilya.
          </div>
        </div>
        <div className="mb-8">
          <div className="absolute -left-[9px] w-4 h-4 rounded-full bg-amber-500"></div>
          <div className="text-amber-400 font-serif text-xl mb-1">1838</div>
          <p className="text-ivory-200 text-sm">Inilathala ang "Florante at Laura"</p>
          <div className="mt-2 text-ivory-300/70 text-xs">
            Ang kanyang pinaka-kilalang akda ay inilathala habang siya ay nakakulong dahil sa pagtataksil ng isang kapwa manliligaw.
          </div>
        </div>
        <div>
          <div className="absolute -left-[9px] w-4 h-4 rounded-full bg-amber-500"></div>
          <div className="text-amber-400 font-serif text-xl mb-1">1862</div>
          <p className="text-ivory-200 text-sm">Pumanaw sa edad na 74</p>
          <div className="mt-2 text-ivory-300/70 text-xs">
            Namatay siya sa Udyong, Bataan, ngunit ang kanyang mga akda ay nananatiling buhay hanggang sa kasalukuyan.
          </div>
        </div>
      </div>
      
      <div className="mt-8 p-5 bg-indigo-900/30 rounded-xl border border-indigo-800/50">
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
  );

  // Tab content for the Themes section
  const TemaContent = (
    <div className="space-y-6">
      <div className="bg-indigo-900/50 backdrop-blur-md rounded-xl border border-indigo-800/30 p-6 transition-colors hover:border-amber-500/30">
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
      
      <div className="bg-indigo-900/50 backdrop-blur-md rounded-xl border border-indigo-800/30 p-6 transition-colors hover:border-purple-500/30">
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
      
      <div className="bg-indigo-900/50 backdrop-blur-md rounded-xl border border-indigo-800/30 p-6 transition-colors hover:border-blue-500/30">
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
      
      <div className="bg-indigo-900/50 backdrop-blur-md rounded-xl border border-indigo-800/30 p-6 transition-colors hover:border-emerald-500/30">
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
  );

  // Tab content sections
  const tabs = [
    {
      id: "epiko",
      label: "Ang Epiko",
      icon: <ScrollText className="w-5 h-5" />,
      content: EpikoContent
    },
    {
      id: "kwento",
      label: "Ang Kwento",
      icon: <BookOpen className="w-5 h-5" />,
      content: KwentoContent
    },
    {
      id: "mayakda",
      label: "Ang May-akda",
      icon: <Feather className="w-5 h-5" />,
      content: MayAkdaContent
    },
    {
      id: "tema",
      label: "Tema at Aral",
      icon: <Heart className="w-5 h-5 fill-current" />,
      content: TemaContent
    }
  ];

  return (
    <div className="min-h-screen bg-indigo-950 text-ivory-100">
      <div className="overflow-x-hidden">
        <Header />
        <AnimatedBackground bubbleCount={5} speed={0.5} static={true} />
        
        {/* Hero Section - Add animation classes */}
        <section className="relative min-h-[60vh] flex items-center overflow-hidden bg-indigo-950 backdrop-blur-lg border-y border-indigo-800/30 fade-in" style={{animationDelay: '0.2s'}}>
          {/* Decorative Background Elements */}
          <div className="absolute inset-0 z-0">
            {/* Static background with fixed gradients */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-amber-500/10 filter blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-indigo-500/10 filter blur-3xl"></div>
            <div className="absolute top-1/3 right-1/3 w-64 h-64 rounded-full bg-purple-500/10 filter blur-3xl"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10 py-12">
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
              
              <p className="text-xl md:text-2xl text-ivory-200/90 mb-8 max-w-3xl mx-auto fade-in slide-in-right" style={{ animationDelay: '0.6s' }}>
                <span className="text-amber-400/80">Isang mahabang kathang-awit</span> na kumikisig sa puso ng ating panitikang Filipino
              </p>
              
              <div className="relative mb-4 py-4 fade-in" style={{ animationDelay: '0.8s' }}>
                <Quote className="w-14 h-14 text-amber-500/40 mx-auto mb-4" />
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
            </div>
          </div>
        </section>
        
        {/* Main content with tabs - Add animation classes */}
        <div className="container mx-auto px-4 py-8 relative z-10 fade-in" style={{animationDelay: '1s'}}>
          <div className="max-w-5xl mx-auto">
            <div className="relative rounded-xl overflow-hidden">
              {/* Tabs with proper background */}
              <div className="relative z-10">
                <TabNavigator tabs={tabs} defaultActiveTab="epiko" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Call to Action - Add animation classes */}
        <div className="relative py-20 bg-indigo-800/20 border-t border-indigo-700/30 fade-in" style={{animationDelay: '1.2s'}}>
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
    </div>
  );
};

export default AboutTabsPage; 