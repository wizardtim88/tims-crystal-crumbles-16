import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Share, ExternalLink, Shuffle } from 'lucide-react';
import { TarotReading } from '@/types/tarot';
interface ShareButtonProps {
  reading: TarotReading;
}
const ShareButton: React.FC<ShareButtonProps> = ({
  reading
}) => {
  const [currentTemplate, setCurrentTemplate] = useState(0);

  // Only show sharing for single card readings
  if (reading.spread !== 'single') {
    return null;
  }
  const card = reading.cards[0];
  const cardName = card.card.name + (card.isReversed ? ' (Reversed)' : '');
  const interpretation = reading.interpretation.split('.')[0] + '.';

  // Get card-specific emojis
  const getCardEmojis = () => {
    const cardLower = card.card.name.toLowerCase();
    if (cardLower.includes('death')) return '💀✨';
    if (cardLower.includes('star')) return '⭐✨';
    if (cardLower.includes('sun')) return '☀️🌟';
    if (cardLower.includes('moon')) return '🌙✨';
    if (cardLower.includes('tower')) return '⚡🏰';
    if (cardLower.includes('fool')) return '🃏✨';
    if (cardLower.includes('magician')) return '🎩✨';
    if (cardLower.includes('empress')) return '👑💫';
    if (cardLower.includes('emperor')) return '👑⚡';
    if (cardLower.includes('lovers')) return '💕✨';
    if (cardLower.includes('chariot')) return '🏺⚡';
    if (cardLower.includes('strength')) return '🦁💪';
    if (cardLower.includes('hermit')) return '🏮✨';
    if (cardLower.includes('wheel')) return '🎡🔮';
    if (cardLower.includes('justice')) return '⚖️✨';
    if (cardLower.includes('hanged')) return '🔄💫';
    if (cardLower.includes('temperance')) return '🌊✨';
    if (cardLower.includes('devil')) return '😈🔥';
    if (cardLower.includes('judgement')) return '📯✨';
    if (cardLower.includes('world')) return '🌍✨';
    if (cardLower.includes('cups')) return '🥤💧';
    if (cardLower.includes('wands')) return '🔥⚡';
    if (cardLower.includes('swords')) return '⚔️💨';
    if (cardLower.includes('pentacles')) return '💰✨';
    return '🎴✨';
  };
  const templates = [
  // Question-Hook Format
  () => {
    const hooks = ["Ever wonder what the universe is trying to tell you?", "What if I told you the cards knew something you didn't?", "Ready for some cosmic truth?", "The universe just dropped some wisdom..."];
    const hook = hooks[Math.floor(Math.random() * hooks.length)];
    return `${getCardEmojis()} ${hook}\n\nI drew ${cardName}: "${interpretation}"\n\nWhat's your sign telling you today? 🔮 #tarot #dailyreading`;
  },
  // Relatable Scenario Format
  () => {
    const scenarios = ["POV: You're scrolling and need a sign...", "Me: *shuffles tarot deck* Also me:", "When you ask the universe for clarity:", "Plot twist: The cards always know"];
    const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];
    return `${getCardEmojis()} ${scenario}\n\n${cardName} says: "${interpretation}"\n\nAnyone else getting chills? 👀 #tarot #mystical #vibes`;
  },
  // Mystery/Curiosity Format
  () => {
    const mysteries = ["The cards revealed something wild today...", "This gave me CHILLS 👻", "Not me getting called out by a tarot card...", "The universe said what it said ✨"];
    const mystery = mysteries[Math.floor(Math.random() * mysteries.length)];
    return `${getCardEmojis()} ${mystery}\n\n${cardName}: "${interpretation}"\n\nWho else needs to hear this? 🤔 #tarot #spiritual #truth`;
  },
  // Tim's Direct Voice Format
  () => {
    const timVoice = ["Tim here with your cosmic tea ☕", "Your boy Tim shuffled the deck and...", "Tim's crystal ball is GLOWING today:", "Not Tim serving spiritual facts again 💅"];
    const voice = timVoice[Math.floor(Math.random() * timVoice.length)];
    return `${getCardEmojis()} ${voice}\n\n${cardName} dropped this wisdom: "${interpretation}"\n\nDM me if this hit different 📱 #TimReads #tarot #mystic`;
  }];
  const generateShareText = () => {
    return templates[currentTemplate]();
  };
  const cycleTemplate = () => {
    setCurrentTemplate(prev => (prev + 1) % templates.length);
  };
  const shareToX = () => {
    const text = generateShareText();
    const url = `https://x.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };
  const shareToThreads = () => {
    const text = generateShareText();
    const url = `https://www.threads.net/intent/post?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'width=600,height=600');
  };
  const templateNames = ['Question Hook', 'Relatable Vibe', 'Mystery Mode', "Tim's Voice"];
  return <div className="space-y-3 mt-4">
      {/* Template Preview */}
      <div className="bg-wizard-dark/20 border border-wizard-gold/20 rounded-lg p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-wizard-gold font-wizard">
            {templateNames[currentTemplate]} Style
          </span>
          <Button onClick={cycleTemplate} variant="ghost" size="sm" className="text-wizard-cream/70 hover:text-wizard-cream p-1 h-auto">
            <Shuffle className="w-3 h-3" />
          </Button>
        </div>
        <div className="text-xs text-wizard-cream/80 font-scroll whitespace-pre-line">
          {generateShareText()}
        </div>
      </div>

      {/* Share Buttons */}
      <div className="flex justify-center gap-3">
        <Button onClick={shareToX} variant="outline" size="sm" className="border-wizard-gold/30 font-wizard hover:bg-wizard-gold/10 flex items-center gap-2 text-gray-950">
          <ExternalLink className="w-4 h-4" />
          Share on X
        </Button>
        <Button onClick={shareToThreads} variant="outline" size="sm" className="border-wizard-gold/30 font-wizard hover:bg-wizard-gold/10 flex items-center gap-2 text-gray-950">
          <Share className="w-4 h-4" />
          Share on Threads
        </Button>
      </div>
    </div>;
};
export default ShareButton;