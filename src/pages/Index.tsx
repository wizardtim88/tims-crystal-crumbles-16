import React, { useState, useEffect, useRef } from 'react';
import CrystalBall from '@/components/CrystalBall';
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
import TarotReading from '@/components/TarotReading';
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
interface Fortune {
  response: string;
  id: number;
  category: FortuneCategory;
  question?: string;
}
const Index = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDrawingTarot, setIsDrawingTarot] = useState(false);
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
  const fortunesRef = useRef<HTMLDivElement>(null);

  // Check for first visit and show onboarding
  useEffect(() => {
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
  }, [isDarkMode]);
  const handleGenerateFortune = (question?: string) => {
    setIsGenerating(true);
    setShowIntro(false);
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
    setTimeout(() => {
      const reading = generateZodiacReading(selectedZodiacSign);
      setZodiacReadings(prev => [...prev, {
        sign: selectedZodiacSign,
        reading,
        date: new Date().toDateString(),
        id: Date.now()
      }]);
      setIsGenerating(false);
      if (Math.random() < 0.2) {
        setTimeout(() => {
          toast("Tim sighs dramatically...", {
            description: "The stars made me do it! Now can I please get back to my cosmic snacks?"
          });
        }, 1000);
      }
    }, 1500 + Math.random() * 1000);
  };
  const handleDrawTarotCard = (question?: string, spread: TarotSpread = 'single') => {
    setIsDrawingTarot(true);
    setShowIntro(false);
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
  const clearAll = () => {
    setFortunes([]);
    setZodiacReadings([]);
    setTarotReadings([]);
    setCurrentTarotReading(undefined);
    setShowIntro(true);
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
    if (type === 'fortune') {
      handleGenerateFortune(question);
    } else if (type === 'tarot') {
      handleDrawTarotCard(question, selectedSpread);
    }
  };
  return <div className={`min-h-screen flex flex-col transition-all duration-300 ${isDarkMode ? 'starry-night' : 'bg-wizard-study bg-cover bg-center bg-fixed'}`}>
      {isDarkMode && <MagicalParticles />}
      {!isDarkMode && <div className="absolute inset-0 backdrop-blur-[1px] bg-slate-900"></div>}
      
      {/* Header */}
      <header className="w-full backdrop-blur-sm border-b border-border/50 py-4 px-6 flex justify-between items-center z-10 relative bg-slate-700">
        <div className="flex flex-col">
          <h1 className="text-2xl md:text-3xl font-wizard text-amber-500">
            The Wizard Tim's Crystal Ball
          </h1>
          <p className="text-sm font-scroll text-slate-200">
            Gaze into the Mysteries with the Laziest Wizard Around
          </p>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle isDark={isDarkMode} onToggle={() => setIsDarkMode(!isDarkMode)} />
          <Sparkles className="h-5 w-5 text-accent animate-sparkle" />
        </div>
      </header>
      
      <main className="w-full max-w-4xl mx-auto px-4 flex-1 flex flex-col items-center z-10 relative bg-slate-900">
        {/* Scattered food crumbs - wizard's messy study */}
        <div className="absolute top-1/4 left-10 w-8 h-8 bg-wizard-cream rounded-full opacity-20 transform rotate-12"></div>
        <div className="absolute top-1/3 right-16 w-10 h-3 bg-wizard-peach rounded-full opacity-30"></div>
        <div className="absolute bottom-1/4 left-20 w-12 h-4 bg-wizard-cream rounded-full opacity-25 transform -rotate-6"></div>
        
        {/* Floating magical elements */}
        <div className="absolute top-1/3 left-1/4 text-wizard-gold text-xl animate-float opacity-40">✨</div>
        <div className="absolute bottom-1/3 right-1/4 text-wizard-gold text-2xl animate-float delay-1000 opacity-50">✨</div>
        <div className="absolute top-2/3 right-1/3 text-wizard-cream text-lg animate-float delay-500 opacity-30">✨</div>
        
        {/* Crystal Ball Section */}
        <div className="relative flex flex-col items-center my-6">
          <WizardAvatar className="z-10 mb-4" />
          <CrystalBall isActive={isGenerating} className="animate-float" />
        </div>
        
        {/* Tabs for Fortunes vs Horoscope vs Tarot */}
        <Tabs value={activeTab} onValueChange={value => setActiveTab(value as "fortunes" | "horoscope" | "tarot")} className="w-full max-w-2xl">
          <TabsList className="grid w-full grid-cols-3 mb-4 bg-wizard-dark/40 border-wizard-gold/30">
            <TabsTrigger value="fortunes" className="font-wizard data-[state=active]:bg-wizard-purple text-orange-200">
              <Book className="mr-2 h-4 w-4" />
              Fortunes
            </TabsTrigger>
            <TabsTrigger value="horoscope" className="font-wizard data-[state=active]:bg-wizard-purple text-orange-200">
              <Stars className="mr-2 h-4 w-4" />
              Horoscope
            </TabsTrigger>
            <TabsTrigger value="tarot" className="font-wizard data-[state=active]:bg-wizard-purple text-orange-200">
              <Spade className="mr-2 h-4 w-4" />
              Tarot
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="fortunes" className="space-y-4">
            {/* Fortune Categories */}
            <div className="w-full max-w-md mx-auto mb-4 flex flex-wrap justify-center gap-2">
              <Button variant={selectedCategory === "general" ? "default" : "outline"} className={`border-wizard-gold/30 font-wizard ${selectedCategory === "general" ? "bg-wizard-purple text-white" : "bg-wizard-dark/40 text-wizard-cream hover:bg-wizard-purple/40"}`} onClick={() => setSelectedCategory("general")}>
                <Book className="mr-2 h-4 w-4" />
                General
              </Button>
              <Button variant={selectedCategory === "love" ? "default" : "outline"} className={`border-wizard-gold/30 font-wizard ${selectedCategory === "love" ? "bg-wizard-purple text-white" : "bg-wizard-dark/40 text-wizard-cream hover:bg-wizard-purple/40"}`} onClick={() => setSelectedCategory("love")}>
                <Heart className="mr-2 h-4 w-4" />
                Love
              </Button>
              <Button variant={selectedCategory === "career" ? "default" : "outline"} className={`border-wizard-gold/30 font-wizard ${selectedCategory === "career" ? "bg-wizard-purple text-white" : "bg-wizard-dark/40 text-wizard-cream hover:bg-wizard-purple/40"}`} onClick={() => setSelectedCategory("career")}>
                <Coins className="mr-2 h-4 w-4" />
                Career
              </Button>
              <Button variant={selectedCategory === "health" ? "default" : "outline"} className={`border-wizard-gold/30 font-wizard ${selectedCategory === "health" ? "bg-wizard-purple text-white" : "bg-wizard-dark/40 text-wizard-cream hover:bg-wizard-purple/40"}`} onClick={() => setSelectedCategory("health")}>
                <Thermometer className="mr-2 h-4 w-4" />
                Health
              </Button>
            </div>
            
            {/* Enhanced Fortune Form */}
            <EnhancedAskForm onGenerateFortune={handleGenerateFortune} isGenerating={isGenerating} selectedCategory={selectedCategory} />
            
            {/* Question Suggestions */}
            <QuestionSuggestions type="fortune" category={selectedCategory} onSelectQuestion={question => handleQuestionSelect(question, 'fortune')} />
          </TabsContent>
          
          <TabsContent value="horoscope" className="space-y-4">
            {/* Zodiac Sign Selector */}
            <ZodiacSelector selectedSign={selectedZodiacSign} onSignSelect={setSelectedZodiacSign} />
            
            {/* Horoscope Button */}
            <div className="w-full max-w-md mx-auto flex justify-center">
              <Button onClick={handleGenerateHoroscope} disabled={isGenerating} className={`
                  bg-wizard-purple hover:bg-wizard-purple/80 text-white 
                  font-wizard px-6 py-6 text-lg flex items-center gap-2 
                  transition-all hover:shadow-lg relative overflow-hidden
                  ${isGenerating ? 'animate-pulse' : ''}
                `} size="lg">
                <div className="absolute inset-0 bg-gradient-to-r from-wizard-gold/10 to-transparent opacity-50"></div>
                <Stars className="w-5 h-5" />
                {isGenerating ? "Tim is consulting the stars..." : "Get Daily Horoscope"}
                
                <span className="absolute -top-1 left-1/4 text-wizard-gold text-xs">✨</span>
                <span className="absolute -bottom-1 right-1/4 text-wizard-gold text-xs">✨</span>
              </Button>
            </div>
            
            {/* Question Suggestions for Horoscope */}
            <QuestionSuggestions type="horoscope" zodiacSign={selectedZodiacSign} onSelectQuestion={question => {
            // For horoscope, we don't use the question directly but it gives users ideas
            handleGenerateHoroscope();
          }} />
          </TabsContent>

          <TabsContent value="tarot" className="space-y-4">
            <TarotReading onDrawCard={handleDrawTarotCard} isDrawing={isDrawingTarot} currentReading={currentTarotReading} />
            
            {/* Question Suggestions for Tarot */}
            <QuestionSuggestions type="tarot" tarotSpread={selectedSpread} onSelectQuestion={question => handleQuestionSelect(question, 'tarot')} />
          </TabsContent>
        </Tabs>
        
        {/* Combined Responses */}
        <div ref={fortunesRef} className="w-full mt-8 max-h-[400px] overflow-y-auto px-4 py-2 rounded-lg scrollbar-thin scrollbar-thumb-wizard-purple/30 scrollbar-track-transparent">
          {showIntro && <div className="bg-card/90 backdrop-blur-sm p-4 rounded-lg border border-border shadow-md mb-4">
              <p className="font-scroll text-card-foreground italic">
                Welcome to the cozy hole of The Wizard Tim, the laziest, most food-obsessed wizard in all of Halfass. 
                Get your fortune told or disturb Tim for a daily horoscope reading - though he's quite skeptical about "star nonsense."
              </p>
            </div>}
          
          {/* Show all responses chronologically */}
          {[...fortunes, ...zodiacReadings, ...tarotReadings].sort((a, b) => a.id - b.id).map(item => {
          if ('category' in item) {
            // It's a fortune
            return <div key={item.id} className="mb-4">
                    <TimResponse response={item.response} category={item.category} isNew={item.id === Math.max(...fortunes.map(f => f.id), ...zodiacReadings.map(z => z.id), ...tarotReadings.map(t => t.id))} />
                  </div>;
          } else if ('sign' in item) {
            // It's a zodiac reading
            return <div key={item.id} className="mb-4">
                    <ZodiacResponse reading={item.reading} sign={item.sign} isNew={item.id === Math.max(...fortunes.map(f => f.id), ...zodiacReadings.map(z => z.id), ...tarotReadings.map(t => t.id))} />
                  </div>;
          } else {
            // It's a tarot reading
            return <div key={item.id} className="mb-4">
                    <TarotResponse reading={item} isNew={item.id === Math.max(...fortunes.map(f => f.id), ...zodiacReadings.map(z => z.id), ...tarotReadings.map(t => t.id))} />
                  </div>;
          }
        })}
        </div>
        
        {/* Clear button - now above book advertisement */}
        {hasAnyContent && <Button variant="outline" onClick={clearAll} className="mt-4 mb-6 border-wizard-purple/30 text-wizard-purple font-scroll hover:bg-wizard-purple/10">
            Clear All
          </Button>}
        
        {/* Book Advertisement - moved below responses and clear button */}
        <BookAdvertisement />
      </main>
      
      {/* Footer */}
      <footer className="w-full bg-background/90 backdrop-blur-sm border-t border-border/50 py-3 px-6 mt-8 text-center z-10 relative">
        <p className="text-sm text-muted-foreground font-scroll">
          Based on The Wizard Tim by Joseph Eleam and Tim Canada
        </p>
      </footer>

      {/* Enhanced Onboarding Modal */}
      <EnhancedOnboardingModal isOpen={showOnboarding} onClose={() => setShowOnboarding(false)} />
    </div>;
};
export default Index;