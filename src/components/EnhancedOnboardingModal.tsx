import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sparkles, Gem, Heart, Coins, Thermometer, Book, Stars, Calendar, Zap, ChevronRight, ChevronLeft } from 'lucide-react';
interface EnhancedOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const EnhancedOnboardingModal: React.FC<EnhancedOnboardingModalProps> = ({
  isOpen,
  onClose
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = [{
    title: "Welcome to Tim's Mystical World",
    content: <div className="space-y-4 text-center">
          <div className="flex justify-center">
            <div className="relative">
              <Gem className="h-16 w-16 text-primary animate-pulse-glow" />
              <Sparkles className="h-8 w-8 text-accent absolute -top-2 -right-2 animate-sparkle" />
            </div>
          </div>
          
          <div className="space-y-3 font-scroll text-foreground/90">
            <p className="text-sm leading-relaxed">
              Greetings! I'm <span className="font-wizard text-primary font-semibold">Tim the Wizard</span>, 
              the laziest, most food-obsessed seer in all of Halfass.
            </p>
            
            <p className="text-sm leading-relaxed">
              You've stumbled into my cozy hole where I offer cosmic insights... 
              when I'm not napping or hunting for snacks.
            </p>
          </div>
        </div>
  }, {
    title: "Crystal Ball Fortunes",
    content: <div className="space-y-4">
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-wizard-purple to-wizard-dark flex items-center justify-center">
              <Book className="h-12 w-12 text-wizard-cream" />
            </div>
          </div>
          
          <div className="space-y-3">
            <p className="text-sm text-center leading-relaxed">
              Ask Tim about any aspect of your life and receive his mystical wisdom (with a side of sarcasm).
            </p>
            
            <div className="grid grid-cols-2 gap-3">
              <Card className="p-3 border-wizard-gold/30 bg-wizard-dark/20">
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-red-400" />
                  <span className="text-xs font-wizard">Love</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Romance & relationships</p>
              </Card>
              
              <Card className="p-3 border-wizard-gold/30 bg-wizard-dark/20">
                <div className="flex items-center gap-2">
                  <Coins className="h-4 w-4 text-yellow-400" />
                  <span className="text-xs font-wizard">Career</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Work & success</p>
              </Card>
              
              <Card className="p-3 border-wizard-gold/30 bg-wizard-dark/20">
                <div className="flex items-center gap-2">
                  <Thermometer className="h-4 w-4 text-green-400" />
                  <span className="text-xs font-wizard">Health</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Wellbeing & vitality</p>
              </Card>
              
              <Card className="p-3 border-wizard-gold/30 bg-wizard-dark/20">
                <div className="flex items-center gap-2">
                  <Book className="h-4 w-4 text-blue-400" />
                  <span className="text-xs font-wizard">General</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Life guidance</p>
              </Card>
            </div>
          </div>
        </div>
  }, {
    title: "Zodiac Horoscopes",
    content: <div className="space-y-4">
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-wizard-purple to-wizard-dark flex items-center justify-center">
              <Stars className="h-12 w-12 text-wizard-cream" />
            </div>
          </div>
          
          <div className="space-y-3">
            <p className="text-sm text-center leading-relaxed">
              Get personalized daily horoscopes based on your zodiac sign. Tim's skeptical about "star nonsense," but he delivers anyway.
            </p>
            
            <Card className="p-4 border-wizard-gold/30 bg-wizard-dark/20">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-wizard text-sm text-wizard-cream">Daily Cosmic Guidance</h4>
                  <p className="text-xs text-muted-foreground">Personalized for your sign</p>
                </div>
                <Stars className="h-6 w-6 text-wizard-gold" />
              </div>
            </Card>
          </div>
        </div>
  }, {
    title: "Tarot Readings",
    content: <div className="space-y-4">
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-wizard-purple to-wizard-dark flex items-center justify-center">
              <div className="text-3xl">🎴</div>
            </div>
          </div>
          
          <div className="space-y-3">
            <p className="text-sm text-center leading-relaxed">
              Draw from Tim's "borrowed" deck for deeper insights. Choose your spread and reveal your cards.
            </p>
            
            <div className="grid grid-cols-1 gap-3">
              <Card className="p-3 border-wizard-gold/30 bg-wizard-dark/20">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-wizard-gold" />
                  <span className="text-xs font-wizard">Single Card</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Quick guidance for any question</p>
              </Card>
              
              <Card className="p-3 border-wizard-gold/30 bg-wizard-dark/20">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-wizard-gold" />
                  <span className="text-xs font-wizard">Past • Present • Future</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">See the full timeline of your situation</p>
              </Card>
            </div>
          </div>
        </div>
  }, {
    title: "Getting Started",
    content: <div className="space-y-4">
          <div className="flex justify-center">
            <Sparkles className="h-16 w-16 text-wizard-gold animate-sparkle" />
          </div>
          
          <div className="space-y-3">
            <p className="text-sm text-center leading-relaxed">
              You're ready to begin your mystical journey! Here are some tips:
            </p>
            
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-wizard-gold rounded-full mt-1.5"></div>
                <p className="text-xs text-muted-foreground">Ask specific questions for better guidance</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-wizard-gold rounded-full mt-1.5"></div>
                <p className="text-xs text-muted-foreground">Use the suggested questions if you're stuck</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-wizard-gold rounded-full mt-1.5"></div>
                <p className="text-xs text-muted-foreground">Tim provides wisdom with humor - don't take it too seriously!</p>
              </div>
            </div>
          </div>
        </div>
  }];
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  const handleClose = () => {
    setCurrentStep(0);
    onClose();
  };
  return <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md mx-auto backdrop-blur-sm border border-primary/30 bg-slate-50">
        <DialogHeader className="text-center space-y-2">
          <DialogTitle className="font-wizard text-xl text-primary">
            {steps[currentStep].title}
          </DialogTitle>
          
          {/* Progress indicator */}
          <div className="flex justify-center gap-2">
            {steps.map((_, index) => <div key={index} className={`w-2 h-2 rounded-full transition-colors ${index === currentStep ? 'bg-wizard-gold' : 'bg-wizard-gold/30'}`} />)}
          </div>
        </DialogHeader>
        
        <div className="py-4">
          {steps[currentStep].content}
        </div>
        
        <div className="flex justify-between items-center">
          <Button variant="ghost" onClick={prevStep} disabled={currentStep === 0} className="text-wizard-cream/70 hover:text-wizard-cream">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          
          <span className="text-xs text-wizard-cream/50 font-scroll">
            {currentStep + 1} of {steps.length}
          </span>
          
          {currentStep === steps.length - 1 ? <Button onClick={handleClose} className="bg-primary hover:bg-primary/90 text-primary-foreground font-wizard">
              <Sparkles className="mr-2 h-4 w-4" />
              Begin Journey
            </Button> : <Button onClick={nextStep} className="bg-wizard-purple hover:bg-wizard-purple/90 text-white font-wizard">
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>}
        </div>
        
        <p className="text-xs text-center text-muted-foreground font-scroll">
          *Tim grumbles about being interrupted but secretly enjoys the company*
        </p>
      </DialogContent>
    </Dialog>;
};
export default EnhancedOnboardingModal;