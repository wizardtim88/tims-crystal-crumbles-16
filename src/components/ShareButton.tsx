import React from 'react';
import { Button } from '@/components/ui/button';
import { Share, ExternalLink } from 'lucide-react';
import { TarotReading } from '@/types/tarot';

interface ShareButtonProps {
  reading: TarotReading;
}

const ShareButton: React.FC<ShareButtonProps> = ({ reading }) => {

  // Only show sharing for single card readings
  if (reading.spread !== 'single') {
    return null;
  }

  const generateShareText = () => {
    const card = reading.cards[0];
    const cardName = card.card.name + (card.isReversed ? ' (Reversed)' : '');
    // Get first sentence of interpretation for brevity
    const interpretation = reading.interpretation.split('.')[0] + '.';
    return `🎴 I drew ${cardName} - ${interpretation} Link in bio to get your own reading`;
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


  return (
    <div className="flex justify-center gap-3 mt-4">
      <Button
        onClick={shareToX}
        variant="outline"
        size="sm"
        className="border-wizard-gold/30 text-wizard-cream font-wizard hover:bg-wizard-gold/10 flex items-center gap-2"
      >
        <ExternalLink className="w-4 h-4" />
        Share on X
      </Button>
      <Button
        onClick={shareToThreads}
        variant="outline"
        size="sm"
        className="border-wizard-gold/30 text-wizard-cream font-wizard hover:bg-wizard-gold/10 flex items-center gap-2"
      >
        <Share className="w-4 h-4" />
        Share on Threads
      </Button>
    </div>
  );
};

export default ShareButton;