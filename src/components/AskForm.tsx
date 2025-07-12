
import React from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { Sparkles } from "lucide-react"; // Changed to Sparkles icon for a more magical feel

interface FortuneButtonProps {
  onGenerateFortune: () => void;
  isGenerating: boolean;
}

const FortuneButton: React.FC<FortuneButtonProps> = ({ onGenerateFortune, isGenerating }) => {
  const handleClick = () => {
    if (isGenerating) {
      toast("Tim is busy...", {
        description: "He's still formulating your fortune (or finishing his snack).",
      });
      return;
    }
    
    onGenerateFortune();
  };

  return (
    <div className="w-full max-w-md mx-auto mt-4 flex justify-center">
      <Button 
        onClick={handleClick}
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
        <Sparkles className="w-5 h-5" />
        {isGenerating ? "Tim is thinking..." : "Ask Tim for a Fortune"}
        
        {/* Add magical particles when button is hovered/active */}
        <span className="absolute -top-1 left-1/4 text-wizard-gold text-xs">✨</span>
        <span className="absolute -bottom-1 right-1/4 text-wizard-gold text-xs">✨</span>
      </Button>
    </div>
  );
};

export default FortuneButton;
