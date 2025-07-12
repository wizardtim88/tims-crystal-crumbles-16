
import React, { useState, useEffect, useRef } from 'react';
import CrystalBall from '@/components/CrystalBall';
import FortuneButton from '@/components/AskForm';
import TimResponse from '@/components/TimResponse';
import ZodiacResponse from '@/components/ZodiacResponse';
import ZodiacSelector from '@/components/ZodiacSelector';
import WizardAvatar from '@/components/WizardAvatar';
import BookAdvertisement from '@/components/BookAdvertisement';
import { generateTimResponse } from '@/utils/fortuneTeller';
import { generateZodiacReading } from '@/utils/zodiacReader';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import { Heart, Coins, Thermometer, Book, Sparkles, Stars } from 'lucide-react';
import { FortuneCategory } from '@/types/fortune';
import { ZodiacSign, ZodiacReading } from '@/types/zodiac';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Fortune {
  response: string;
  id: number;
  category: FortuneCategory;
}

const Index = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [fortunes, setFortunes] = useState<Fortune[]>([]);
  const [zodiacReadings, setZodiacReadings] = useState<ZodiacReading[]>([]);
  const [showIntro, setShowIntro] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<FortuneCategory>("general");
  const [selectedZodiacSign, setSelectedZodiacSign] = useState<ZodiacSign>("aries");
  const [activeTab, setActiveTab] = useState<"fortunes" | "horoscope">("fortunes");
  const fortunesRef = useRef<HTMLDivElement>(null);

  const handleGenerateFortune = () => {
    setIsGenerating(true);
    setShowIntro(false);
    
    setTimeout(() => {
      const response = generateTimResponse(selectedCategory);
      
      setFortunes(prev => [
        ...prev, 
        { 
          response, 
          id: Date.now(),
          category: selectedCategory
        }
      ]);
      
      setIsGenerating(false);
      
      if (Math.random() < 0.2) {
        setTimeout(() => {
          toast("Tim grumbles...", {
            description: "Do you know how much energy it takes to predict the future? I could be napping right now!",
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
      
      setZodiacReadings(prev => [
        ...prev,
        {
          sign: selectedZodiacSign,
          reading,
          date: new Date().toDateString(),
          id: Date.now()
        }
      ]);
      
      setIsGenerating(false);
      
      if (Math.random() < 0.2) {
        setTimeout(() => {
          toast("Tim sighs dramatically...", {
            description: "The stars made me do it! Now can I please get back to my cosmic snacks?",
          });
        }, 1000);
      }
    }, 1500 + Math.random() * 1000);
  };
  
  const clearAll = () => {
    setFortunes([]);
    setZodiacReadings([]);
    setShowIntro(true);
    toast("All cleared", {
      description: "Tim has returned to his well-deserved nap.",
    });
  };

  // Scroll to bottom when new responses are added
  useEffect(() => {
    if (fortunesRef.current) {
      fortunesRef.current.scrollTop = fortunesRef.current.scrollHeight;
    }
  }, [fortunes, zodiacReadings]);

  const hasAnyContent = fortunes.length > 0 || zodiacReadings.length > 0;

  return (
    <div className="min-h-screen flex flex-col bg-wizard-study bg-cover bg-center bg-fixed">
      <div className="absolute inset-0 bg-wizard-dark/40 backdrop-blur-[1px]"></div>
      
      {/* Header */}
      <header className="w-full bg-wizard-dark/90 backdrop-blur-sm text-white py-4 px-6 flex justify-between items-center z-10 relative">
        <h1 className="text-2xl md:text-3xl font-wizard text-wizard-gold">
          The Wizard Tim's Crystal Ball
        </h1>
        <div className="flex gap-1">
          <Sparkles className="h-5 w-5 text-wizard-gold animate-pulse" />
        </div>
      </header>
      
      <main className="w-full max-w-4xl mx-auto px-4 flex-1 flex flex-col items-center z-10 relative">
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
        
        {/* Tabs for Fortunes vs Horoscope */}
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "fortunes" | "horoscope")} className="w-full max-w-2xl">
          <TabsList className="grid w-full grid-cols-2 mb-4 bg-wizard-dark/40 border-wizard-gold/30">
            <TabsTrigger value="fortunes" className="font-wizard data-[state=active]:bg-wizard-purple data-[state=active]:text-white">
              <Book className="mr-2 h-4 w-4" />
              Fortunes
            </TabsTrigger>
            <TabsTrigger value="horoscope" className="font-wizard data-[state=active]:bg-wizard-purple data-[state=active]:text-white">
              <Stars className="mr-2 h-4 w-4" />
              Daily Horoscope
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="fortunes" className="space-y-4">
            {/* Fortune Categories */}
            <div className="w-full max-w-md mx-auto mb-4 flex flex-wrap justify-center gap-2">
              <Button 
                variant={selectedCategory === "general" ? "default" : "outline"}
                className={`border-wizard-gold/30 font-wizard ${selectedCategory === "general" ? "bg-wizard-purple text-white" : "bg-wizard-dark/40 text-wizard-cream hover:bg-wizard-purple/40"}`}
                onClick={() => setSelectedCategory("general")}
              >
                <Book className="mr-2 h-4 w-4" />
                General
              </Button>
              <Button 
                variant={selectedCategory === "love" ? "default" : "outline"}
                className={`border-wizard-gold/30 font-wizard ${selectedCategory === "love" ? "bg-wizard-purple text-white" : "bg-wizard-dark/40 text-wizard-cream hover:bg-wizard-purple/40"}`}
                onClick={() => setSelectedCategory("love")}
              >
                <Heart className="mr-2 h-4 w-4" />
                Love
              </Button>
              <Button 
                variant={selectedCategory === "career" ? "default" : "outline"}
                className={`border-wizard-gold/30 font-wizard ${selectedCategory === "career" ? "bg-wizard-purple text-white" : "bg-wizard-dark/40 text-wizard-cream hover:bg-wizard-purple/40"}`}
                onClick={() => setSelectedCategory("career")}
              >
                <Coins className="mr-2 h-4 w-4" />
                Career
              </Button>
              <Button 
                variant={selectedCategory === "health" ? "default" : "outline"}
                className={`border-wizard-gold/30 font-wizard ${selectedCategory === "health" ? "bg-wizard-purple text-white" : "bg-wizard-dark/40 text-wizard-cream hover:bg-wizard-purple/40"}`}
                onClick={() => setSelectedCategory("health")}
              >
                <Thermometer className="mr-2 h-4 w-4" />
                Health
              </Button>
            </div>
            
            {/* Fortune Button */}
            <FortuneButton onGenerateFortune={handleGenerateFortune} isGenerating={isGenerating} />
          </TabsContent>
          
          <TabsContent value="horoscope" className="space-y-4">
            {/* Zodiac Sign Selector */}
            <ZodiacSelector 
              selectedSign={selectedZodiacSign} 
              onSignSelect={setSelectedZodiacSign}
            />
            
            {/* Horoscope Button */}
            <div className="w-full max-w-md mx-auto flex justify-center">
              <Button 
                onClick={handleGenerateHoroscope}
                disabled={isGenerating}
                className={`
                  bg-wizard-purple hover:bg-wizard-purple/80 text-white 
                  font-wizard px-6 py-6 text-lg flex items-center gap-2 
                  transition-all hover:shadow-lg relative overflow-hidden
                  ${isGenerating ? 'animate-pulse' : ''}
                `}
                size="lg"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-wizard-gold/10 to-transparent opacity-50"></div>
                <Stars className="w-5 h-5" />
                {isGenerating ? "Tim is consulting the stars..." : "Get Daily Horoscope"}
                
                <span className="absolute -top-1 left-1/4 text-wizard-gold text-xs">✨</span>
                <span className="absolute -bottom-1 right-1/4 text-wizard-gold text-xs">✨</span>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Combined Responses */}
        <div 
          ref={fortunesRef}
          className="w-full mt-8 max-h-[400px] overflow-y-auto px-4 py-2 rounded-lg scrollbar-thin scrollbar-thumb-wizard-purple/30 scrollbar-track-transparent"
        >
          {showIntro && (
            <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg border border-wizard-gold/30 shadow-md mb-4">
              <p className="font-scroll text-gray-700 italic">
                Welcome to the cozy hole of The Wizard Tim, the laziest, most food-obsessed wizard in all of Halfass. 
                Get your fortune told or disturb Tim for a daily horoscope reading - though he's quite skeptical about "star nonsense."
              </p>
            </div>
          )}
          
          {/* Show all responses chronologically */}
          {[...fortunes, ...zodiacReadings]
            .sort((a, b) => a.id - b.id)
            .map((item) => {
              if ('category' in item) {
                // It's a fortune
                return (
                  <div key={item.id} className="mb-4">
                    <TimResponse 
                      response={item.response} 
                      category={item.category}
                      isNew={item.id === Math.max(...fortunes.map(f => f.id), ...zodiacReadings.map(z => z.id))} 
                    />
                  </div>
                );
              } else {
                // It's a zodiac reading
                return (
                  <div key={item.id} className="mb-4">
                    <ZodiacResponse 
                      reading={item.reading} 
                      sign={item.sign}
                      isNew={item.id === Math.max(...fortunes.map(f => f.id), ...zodiacReadings.map(z => z.id))} 
                    />
                  </div>
                );
              }
          })}
        </div>
        
        {/* Clear button - now above book advertisement */}
        {hasAnyContent && (
          <Button 
            variant="outline" 
            onClick={clearAll}
            className="mt-4 mb-6 border-wizard-purple/30 text-wizard-purple font-scroll hover:bg-wizard-purple/10"
          >
            Clear All
          </Button>
        )}
        
        {/* Book Advertisement - moved below responses and clear button */}
        <BookAdvertisement />
      </main>
      
      {/* Footer */}
      <footer className="w-full bg-wizard-dark/90 backdrop-blur-sm text-white py-3 px-6 mt-8 text-center z-10 relative">
        <p className="text-sm text-wizard-cream/70 font-scroll">
          Based on The Wizard Tim by Joseph Eleam and Tim Canada
        </p>
      </footer>
    </div>
  );
};

export default Index;
