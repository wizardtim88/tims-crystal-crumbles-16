import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Sparkles, Gem } from 'lucide-react';
interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose
}) => {
  return <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto backdrop-blur-sm border border-primary/30 bg-slate-600">
        <DialogHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="relative">
              <Gem className="h-12 w-12 text-primary animate-pulse-glow" />
              <Sparkles className="h-6 w-6 text-accent absolute -top-1 -right-1 animate-sparkle" />
            </div>
          </div>
          
          <DialogTitle className="font-wizard text-xl text-primary">
            Welcome, Mortal!
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 text-center">
          <div className="space-y-3 font-scroll text-foreground/90">
            <p className="text-sm leading-relaxed text-slate-900">
              Greetings! I'm <span className="font-wizard text-primary font-semibold">Tim the Wizard</span>, 
              the laziest, most food-obsessed seer in all of Halfass.
            </p>
            
            <p className="text-sm leading-relaxed text-slate-900">
              You've stumbled into my cozy hole where I offer cosmic insights... 
              when I'm not napping or hunting for snacks.
            </p>
            
            <div className="rounded-lg p-3 border border-primary/20 bg-slate-900">
              <p className="text-xs font-medium mb-1 text-slate-50">What can I do for you?</p>
              <ul className="text-xs space-y-1 text-left">
                <li className="bg-slate-900">🔮 <strong>Crystal Ball Fortunes</strong> - Ask about love, career, health, or life in general</li>
                <li>✨ <strong>Optional Questions</strong> - Type your specific question or let the cosmos surprise you</li>
                <li>🌟 <strong>Tim's Wisdom</strong> - Every reading comes with my signature snark and humor</li>
              </ul>
            </div>
          </div>
          
          <Button onClick={onClose} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-wizard">
            <Sparkles className="mr-2 h-4 w-4" />
            Begin the Mystical Journey
            <Sparkles className="ml-2 h-4 w-4" />
          </Button>
          
          <p className="text-xs text-muted-foreground font-scroll">
            *Tim grumbles about being interrupted but secretly enjoys the company*
          </p>
        </div>
      </DialogContent>
    </Dialog>;
};
export default OnboardingModal;