import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Gem, Sparkles } from 'lucide-react';
import { FortuneCategory } from '@/types/fortune';
interface EnhancedAskFormProps {
  onGenerateFortune: (question?: string) => void;
  isGenerating: boolean;
  selectedCategory: FortuneCategory;
}
const EnhancedAskForm: React.FC<EnhancedAskFormProps> = ({
  onGenerateFortune,
  isGenerating,
  selectedCategory
}) => {
  const [question, setQuestion] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerateFortune(question.trim() || undefined);
  };
  const categoryPlaceholders = {
    general: "What does the future hold for me?",
    love: "Will I find true love this year?",
    career: "Should I pursue that new opportunity?",
    health: "How can I improve my well-being?"
  };
  return <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto space-y-4">
      <div className="space-y-2">
        <Label htmlFor="question" className="text-sm font-wizard text-foreground/90">
          Ask Tim a question (optional)
        </Label>
        <Input id="question" type="text" placeholder={categoryPlaceholders[selectedCategory]} value={question} onChange={e => setQuestion(e.target.value)} maxLength={200} disabled={isGenerating} className="border-primary/30 focus:border-primary/60 placeholder:text-muted-foreground/60 font-scroll bg-slate-100" />
        <p className="text-xs text-muted-foreground font-scroll">
          Leave blank for a surprise reading from Tim's crystal ball
        </p>
      </div>

      <Button type="submit" disabled={isGenerating} className={`
          w-full bg-primary hover:bg-primary/90 text-primary-foreground 
          font-wizard px-6 py-6 text-lg flex items-center justify-center gap-2 
          transition-all hover:shadow-lg relative overflow-hidden
          ${isGenerating ? 'animate-pulse-glow' : ''}
        `} size="lg">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-transparent opacity-50"></div>
        <Gem className="w-5 h-5" />
        {isGenerating ? "Tim is peering into the crystal ball..." : "Gaze into the Crystal Ball"}
        
        {!isGenerating && <>
            <span className="absolute -top-1 left-1/4 text-accent text-xs animate-sparkle">✨</span>
            <span className="absolute -bottom-1 right-1/4 text-accent text-xs animate-sparkle delay-1000">✨</span>
          </>}
      </Button>

      {question && <div className="bg-muted/30 rounded-lg p-3 border border-primary/20">
          <p className="text-xs font-wizard text-primary mb-1">Your Question:</p>
          <p className="text-sm font-scroll text-foreground/80 italic">"{question}"</p>
        </div>}
    </form>;
};
export default EnhancedAskForm;