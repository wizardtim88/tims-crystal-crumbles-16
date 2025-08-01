import React, { useState, useEffect, useRef } from 'react';
import CrystalBall, { CrystalBallRef } from '@/components/CrystalBall';
import EnhancedAskForm from '@/components/EnhancedAskForm';
import TimResponse from '@/components/TimResponse';
import ZodiacResponse from '@/components/ZodiacResponse';
import ZodiacSelector from '@/components/ZodiacSelector';
import WizardAvatar from '@/components/WizardAvatar';
import BookAdvertisement from '@/components/BookAdvertisement';
import ThemeToggle from '@/components/ThemeToggle';
import MagicalParticles from '@/components/MagicalParticles';
import EnhancedOnboardingModal from '@/components/EnhancedOnboardingModal';
import QuestionSuggestions from '@/components/QuestionSuggestions';
import TarotControls from '@/components/TarotControls';
import TarotCardDisplay from '@/components/TarotCardDisplay';
import TarotResponse from '@/components/TarotResponse';
import { generateTimResponse } from '@/utils/fortuneTeller';
import { generateZodiacReading } from '@/utils/zodiacReader';
import { drawSingleCard, drawThreeCards } from '@/utils/tarotReader';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import { Heart, Coins, Thermometer, Book, Sparkles, Stars, Spade } from 'lucide-react';
import { FortuneCategory } from '@/types/fortune';
import { ZodiacSign, ZodiacReading } from '@/types/zodiac';
import { TarotReading as TarotReadingType, TarotSpread } from '@/types/tarot';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { analytics, initAnalytics } from '@/utils/analytics';
interface Fortune {
  response: string;
  id: number;
  category: FortuneCategory;
  question?: string;
}
const Index = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDrawingTarot, setIsDrawingTarot] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [fortunes, setFortunes] = useState<Fortune[]>([]);
  const [zodiacReadings, setZodiacReadings] = useState<ZodiacReading[]>([]);
  const [tarotReadings, setTarotReadings] = useState<TarotReadingType[]>([]);
  const [currentTarotReading, setCurrentTarotReading] = useState<TarotReadingType | undefined>();
  const [showIntro, setShowIntro] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<FortuneCategory>("general");
  const [selectedZodiacSign, setSelectedZodiacSign] = useState<ZodiacSign>("aries");
  const [activeTab, setActiveTab] = useState<"fortunes" | "horoscope" | "tarot">("fortunes");
  const [selectedSpread, setSelectedSpread] = useState<TarotSpread>('single');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  
  // Shared form state
  const [fortuneQuestion, setFortuneQuestion] = useState('');
  const [tarotQuestion, setTarotQuestion] = useState('');
  const [selectedTarotSpread, setSelectedTarotSpread] = useState<TarotSpread>('single');
  const fortunesRef = useRef<HTMLDivElement>(null);
  const crystalBallRef = useRef<CrystalBallRef>(null);

  // Function to trigger crystal ball video
  const triggerCrystalBallVideo = () => {
    crystalBallRef.current?.triggerVideo();
  };

  // Auto-scroll to results after video completion
  const scrollToResults = () => {
    if (fortunesRef.current) {
      const headerHeight = 80; // Account for sticky header
      const elementTop = fortunesRef.current.offsetTop - headerHeight;
      window.scrollTo({
        top: elementTop,
        behavior: 'smooth'
      });
    }
  };

  const handleVideoComplete = () => {
    // Small delay to ensure content has rendered
    setTimeout(() => {
      scrollToResults();
    }, 500);
  };

  // Check for first visit and show onboarding
  useEffect(() => {
    // Initialize analytics
    initAnalytics();
    
    const hasVisited = sessionStorage.getItem('wizardTimVisited');
    if (!hasVisited) {
      setShowOnboarding(true);
      sessionStorage.setItem('wizardTimVisited', 'true');
    }

    // Load theme preference
    const savedTheme = localStorage.getItem('wizardTimTheme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('wizardTimTheme', isDarkMode ? 'dark' : 'light');
    analytics.trackThemeToggle(isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);
  const handleGenerateFortune = (question?: string) => {
    setIsGenerating(true);
    setShowIntro(false);
    
    // Track fortune generation
    analytics.trackFortuneGeneration(selectedCategory, !!question);
    
    // Trigger crystal ball video
    triggerCrystalBallVideo();
    setTimeout(() => {
      const response = generateTimResponse(selectedCategory, question);
      setFortunes(prev => [...prev, {
        response,
        id: Date.now(),
        category: selectedCategory,
        question
      }]);
      setIsGenerating(false);
      if (Math.random() < 0.2) {
        setTimeout(() => {
          toast("Tim grumbles...", {
            description: "Do you know how much energy it takes to predict the future? I could be napping right now!"
          });
        }, 1000);
      }
    }, 1500 + Math.random() * 1000);
  };
  const handleGenerateHoroscope = () => {
    setIsGenerating(true);
    setShowIntro(false);
    
    // Track zodiac reading
    analytics.trackZodiacReading(selectedZodiacSign);
    
    // Trigger crystal ball video
    triggerCrystalBallVideo();
    setTimeout(() => {
      const reading = generateZodiacReading(selectedZodiacSign);
      setZodiacReadings(prev => [...prev, {
        sign: selectedZodiacSign,
        reading,
        date: new Date().toDateString(),
        id: Date.now()
      }]);
      setIsGenerating(false);
      if (Math.random() < 0.15) {
        setTimeout(() => {
          toast("Tim mutters about cosmic alignments...", {
            description: "The stars are particularly chatty today. They won't let me take my afternoon nap!"
          });
        }, 1000);
      }
    }, 1500 + Math.random() * 1000);
  };
  const handleDrawTarotCard = (question?: string, spread: TarotSpread = 'single') => {
    setIsDrawingTarot(true);
    setShowIntro(false);
    
    // Track tarot draw
    analytics.trackTarotDraw(spread === 'three-card' ? 'three-card' : 'single');
    
    // Trigger crystal ball video
    triggerCrystalBallVideo();
    setTimeout(() => {
      const reading = spread === 'three-card' ? drawThreeCards(question) : drawSingleCard(question);
      setCurrentTarotReading(reading);
      setTarotReadings(prev => {
        const updated = [reading, ...prev];
        localStorage.setItem('tarotReadings', JSON.stringify(updated));
        return updated;
      });
      setIsDrawingTarot(false);
      if (Math.random() < 0.2) {
        setTimeout(() => {
          toast("Tim grumbles about his stolen deck...", {
            description: "These cards better not be sticky from that time I spilled honey on them..."
          });
        }, 1000);
      }
    }, 2000 + Math.random() * 1000);
  };

  const handleNewTarotReading = () => {
    setCurrentTarotReading(undefined);
  };
  const clearAll = () => {
    setFortunes([]);
    setZodiacReadings([]);
    setTarotReadings([]);
    setCurrentTarotReading(undefined);
    setShowIntro(true);
    
    // Track clear all action
    analytics.trackClearAll();
    
    toast("All cleared", {
      description: "Tim has returned to his well-deserved nap."
    });
  };

  // Scroll to bottom when new responses are added
  useEffect(() => {
    if (fortunesRef.current) {
      fortunesRef.current.scrollTop = fortunesRef.current.scrollHeight;
    }
  }, [fortunes, zodiacReadings, tarotReadings]);
  const hasAnyContent = fortunes.length > 0 || zodiacReadings.length > 0 || tarotReadings.length > 0;
  const handleQuestionSelect = (question: string, type: 'fortune' | 'tarot') => {
    // Track question suggestion usage
    analytics.trackQuestionSuggestion(type, type === 'fortune' ? selectedCategory : undefined);
    
    if (type === 'fortune') {
      handleGenerateFortune(question);
    } else if (type === 'tarot') {
      handleDrawTarotCard(question, selectedSpread);
    }
  };

  const handleCrystalBallClick = () => {
    // Track crystal ball click
    analytics.trackCrystalBallClick();
    
    // Trigger video and action simultaneously
    if (activeTab === "fortunes") {
      handleGenerateFortune(fortuneQuestion.trim() || undefined);
    } else if (activeTab === "horoscope") {
      handleGenerateHoroscope();
    } else if (activeTab === "tarot") {
      handleDrawTarotCard(tarotQuestion.trim() || undefined, selectedTarotSpread);
    }
  };
  return <div className="min-h-screen flex flex-col transition-all duration-300 bg-wizard-purple">
      {isDarkMode && <MagicalParticles />}
      {!isDarkMode && <div className="absolute inset-0 backdrop-blur-[1px] bg-slate-950"></div>}
      
      {/* Optimized Header */}
      <header className="sticky top-0 w-full backdrop-blur-sm border-b border-border/50 py-2 md:py-3 px-4 md:px-6 flex justify-between items-center z-50 relative bg-slate-950/95">
        <div className="flex flex-col md:flex-row md:items-center md:gap-4">
          <h1 className="text-lg md:text-2xl lg:text-3xl font-wizard text-amber-500">
            The Wizard Tim's Crystal Ball
          </h1>
          <p className="font-scroll text-slate-200 text-xs md:text-sm">
            Gaze into the Mysteries with the Laziest Wizard Around
          </p>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle isDark={isDarkMode} onToggle={() => setIsDarkMode(!isDarkMode)} />
          <Sparkles className="h-4 w-4 md:h-5 md:w-5 text-accent animate-sparkle" />
        </div>
      </header>
      
      {/* Responsive Main Layout */}
      <main className="w-full max-w-7xl mx-auto px-2 md:px-4 flex-1 z-10 relative bg-slate-900">
        {/* Background Elements */}
        <div className="absolute top-1/4 left-4 md:left-10 w-6 h-6 md:w-8 md:h-8 bg-wizard-cream rounded-full opacity-20 transform rotate-12"></div>
        <div className="absolute top-1/3 right-8 md:right-16 w-8 h-2 md:w-10 md:h-3 bg-wizard-peach rounded-full opacity-30"></div>
        <div className="absolute bottom-1/4 left-10 md:left-20 w-8 h-3 md:w-12 md:h-4 bg-wizard-cream rounded-full opacity-25 transform -rotate-6"></div>
        
        {/* Floating magical elements */}
        <div className="absolute top-1/3 left-1/4 text-wizard-gold text-lg md:text-xl animate-float opacity-40">✨</div>
        <div className="absolute bottom-1/3 right-1/4 text-wizard-gold text-xl md:text-2xl animate-float delay-1000 opacity-50">✨</div>
        <div className="absolute top-2/3 right-1/3 text-wizard-gold text-base md:text-lg animate-float delay-500 opacity-30">✨</div>
        
        {/* Desktop Side-by-Side Layout / Mobile Stacked */}
        <div className="flex flex-col lg:flex-row lg:gap-6">
          {/* Controls Column (Left on desktop, top on mobile) */}
          <div className="flex-shrink-0 lg:w-2/5 xl:w-1/3 flex flex-col">
            {/* Crystal Ball Section - Optimized Size */}
            <div className="relative flex flex-col items-center my-4 lg:my-6">
              <WizardAvatar className="z-10 mb-2 md:mb-4 scale-75 md:scale-100" />
              <CrystalBall 
                ref={crystalBallRef}
                isActive={isGenerating || isDrawingTarot} 
                className="animate-float scale-75 md:scale-90 lg:scale-100" 
                onCrystalBallClick={handleCrystalBallClick}
                videoUrl="https://grand-sable-38a0e9.netlify.app/videos/Cosmic%20Pie.mp4"
                videoType={activeTab}
                onVideoComplete={handleVideoComplete}
              />
            </div>
            
            {/* Tabs and Forms Section */}
            <Tabs value={activeTab} onValueChange={value => {
              setActiveTab(value as "fortunes" | "horoscope" | "tarot");
              analytics.trackTabChange(value);
            }} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-3 md:mb-4 bg-wizard-dark/40 border-wizard-gold/30">
                <TabsTrigger value="fortunes" className="font-wizard data-[state=active]:bg-wizard-purple text-orange-200 text-xs md:text-sm">
                  <Book className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
                  <span className="hidden sm:inline">Fortunes</span>
                  <span className="sm:hidden">Fort</span>
                </TabsTrigger>
                <TabsTrigger value="horoscope" className="font-wizard data-[state=active]:bg-wizard-purple text-orange-200 text-xs md:text-sm">
                  <Stars className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
                  <span className="hidden sm:inline">Horoscope</span>
                  <span className="sm:hidden">Horo</span>
                </TabsTrigger>
                <TabsTrigger value="tarot" className="font-wizard data-[state=active]:bg-wizard-purple text-orange-200 text-xs md:text-sm">
                  <Spade className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
                  Tarot
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="fortunes" className="space-y-3 md:space-y-4">
                {/* Fortune Categories */}
                <div className="w-full flex flex-wrap justify-center gap-1 md:gap-2">
                  <Button variant={selectedCategory === "general" ? "default" : "outline"} 
                    className={`border-wizard-gold/30 font-wizard text-xs md:text-sm px-2 md:px-3 py-1 md:py-2 ${selectedCategory === "general" ? "bg-wizard-purple text-white" : "bg-wizard-dark/40 text-wizard-cream hover:bg-wizard-purple/40"}`} 
                    onClick={() => setSelectedCategory("general")}>
                    <Book className="mr-1 h-3 w-3 md:h-4 md:w-4" />
                    General
                  </Button>
                  <Button variant={selectedCategory === "love" ? "default" : "outline"} 
                    className={`border-wizard-gold/30 font-wizard text-xs md:text-sm px-2 md:px-3 py-1 md:py-2 ${selectedCategory === "love" ? "bg-wizard-purple text-white" : "bg-wizard-dark/40 text-wizard-cream hover:bg-wizard-purple/40"}`} 
                    onClick={() => setSelectedCategory("love")}>
                    <Heart className="mr-1 h-3 w-3 md:h-4 md:w-4" />
                    Love
                  </Button>
                  <Button variant={selectedCategory === "career" ? "default" : "outline"} 
                    className={`border-wizard-gold/30 font-wizard text-xs md:text-sm px-2 md:px-3 py-1 md:py-2 ${selectedCategory === "career" ? "bg-wizard-purple text-white" : "bg-wizard-dark/40 text-wizard-cream hover:bg-wizard-purple/40"}`} 
                    onClick={() => setSelectedCategory("career")}>
                    <Coins className="mr-1 h-3 w-3 md:h-4 md:w-4" />
                    Career
                  </Button>
                  <Button variant={selectedCategory === "health" ? "default" : "outline"} 
                    className={`border-wizard-gold/30 font-wizard text-xs md:text-sm px-2 md:px-3 py-1 md:py-2 ${selectedCategory === "health" ? "bg-wizard-purple text-white" : "bg-wizard-dark/40 text-wizard-cream hover:bg-wizard-purple/40"}`} 
                    onClick={() => setSelectedCategory("health")}>
                    <Thermometer className="mr-1 h-3 w-3 md:h-4 md:w-4" />
                    Health
                  </Button>
                </div>
                
                <EnhancedAskForm 
                  onGenerateFortune={handleGenerateFortune} 
                  isGenerating={isGenerating} 
                  selectedCategory={selectedCategory}
                  question={fortuneQuestion}
                  onQuestionChange={setFortuneQuestion}
                />
                <QuestionSuggestions type="fortune" category={selectedCategory} onSelectQuestion={question => handleQuestionSelect(question, 'fortune')} />
              </TabsContent>
              
              <TabsContent value="horoscope" className="space-y-3 md:space-y-4">
                <ZodiacSelector selectedSign={selectedZodiacSign} onSignSelect={setSelectedZodiacSign} />
                
                <div className="w-full flex justify-center">
                  <Button onClick={handleGenerateHoroscope} disabled={isGenerating} className={`
                      bg-wizard-purple hover:bg-wizard-purple/80 text-white 
                      font-wizard px-4 md:px-6 py-3 md:py-6 text-sm md:text-lg flex items-center gap-2 
                      transition-all hover:shadow-lg relative overflow-hidden
                      ${isGenerating ? 'animate-pulse' : ''}
                    `} size="lg">
                    <div className="absolute inset-0 bg-gradient-to-r from-wizard-gold/10 to-transparent opacity-50"></div>
                    <Stars className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="hidden md:inline">{isGenerating ? "Tim is consulting the stars..." : "Get Daily Horoscope"}</span>
                    <span className="md:hidden">{isGenerating ? "Consulting..." : "Horoscope"}</span>
                    
                    <span className="absolute -top-1 left-1/4 text-wizard-gold text-xs">✨</span>
                    <span className="absolute -bottom-1 right-1/4 text-wizard-gold text-xs">✨</span>
                  </Button>
                </div>
                
                <QuestionSuggestions type="horoscope" zodiacSign={selectedZodiacSign} onSelectQuestion={question => {
                  handleGenerateHoroscope();
                }} />
              </TabsContent>

              <TabsContent value="tarot" className="space-y-3 md:space-y-4">
                <TarotControls
                  onDrawCard={handleDrawTarotCard}
                  isDrawing={isDrawingTarot}
                  isShuffling={isShuffling}
                  setIsShuffling={setIsShuffling}
                  question={tarotQuestion}
                  onQuestionChange={setTarotQuestion}
                  selectedSpread={selectedTarotSpread}
                  onSpreadChange={setSelectedTarotSpread}
                />
                <QuestionSuggestions type="tarot" tarotSpread={selectedSpread} onSelectQuestion={question => handleQuestionSelect(question, 'tarot')} />
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Responses Column (Right on desktop, bottom on mobile) */}
          <div className="flex-1 flex flex-col mt-4 lg:mt-0">
            <div ref={fortunesRef} className="px-2 md:px-4 py-2 rounded-lg">
              {showIntro && !hasAnyContent && (
                <div className="text-center text-wizard-cream/60 font-scroll py-8 lg:py-16">
                  <p className="text-lg md:text-xl mb-2">✨ Welcome to Tim's Mystical Realm ✨</p>
                  <p className="text-sm md:text-base">Click the crystal ball or use the tabs to begin your journey into the unknown...</p>
                </div>
              )}
              
              {/* Tarot Card Display - Show in right column when active */}
              {activeTab === "tarot" && currentTarotReading && (
                <div className="mb-6 w-full max-w-full overflow-hidden">
                  <TarotCardDisplay
                    currentReading={currentTarotReading}
                    onNewReading={handleNewTarotReading}
                  />
                </div>
              )}
              
              {/* Fortune Responses - Only show when fortunes tab is active */}
              {activeTab === "fortunes" && fortunes.map(item => (
                <div key={item.id} className="mb-4 w-full max-w-full overflow-hidden">
                  <TimResponse response={item.response} category={item.category} isNew={item.id === Math.max(...fortunes.map(f => f.id))} />
                </div>
              ))}
              
              {/* Zodiac Responses - Only show when horoscope tab is active */}
              {activeTab === "horoscope" && zodiacReadings.map(item => (
                <div key={item.id} className="mb-4 w-full max-w-full overflow-hidden">
                  <ZodiacResponse reading={item.reading} sign={item.sign} isNew={item.id === Math.max(...zodiacReadings.map(z => z.id))} />
                </div>
              ))}
              
              {/* Tarot Summary Cards - Show previous readings */}
              {activeTab === "tarot" && tarotReadings.slice(1).map(item => (
                <div key={item.id} className="mb-4 w-full max-w-full overflow-hidden">
                  <TarotResponse reading={item} isNew={false} />
                </div>
              ))}
            </div>
            
            {/* Clear button and Book Advertisement in responses column */}
            <div className="flex-shrink-0 mt-4 space-y-4">
              {hasAnyContent && (
                <div className="text-center">
                  <Button variant="outline" onClick={clearAll} className="border-wizard-purple/30 text-wizard-purple font-scroll hover:bg-wizard-purple/10">
                    Clear All
                  </Button>
                </div>
              )}
              <BookAdvertisement />
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="w-full backdrop-blur-sm border-t border-border/50 py-3 px-6 mt-8 text-center z-10 relative bg-slate-600">
        <p className="text-sm text-muted-foreground font-scroll">
          Based on The Wizard Tim by Joseph Eleam and Tim Canada
        </p>
      </footer>

      {/* Enhanced Onboarding Modal */}
      <EnhancedOnboardingModal isOpen={showOnboarding} onClose={() => {
        setShowOnboarding(false);
        analytics.trackOnboardingComplete();
      }} />
    </div>;
};
export default Index;