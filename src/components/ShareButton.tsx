import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Share, ExternalLink, Image, Loader2 } from 'lucide-react';
import { TarotReading } from '@/types/tarot';
import html2canvas from 'html2canvas';

interface ShareButtonProps {
  reading: TarotReading;
  cardRef?: React.RefObject<HTMLElement>;
}

const ShareButton: React.FC<ShareButtonProps> = ({ reading, cardRef }) => {
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

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

  const captureCardImage = async (): Promise<Blob | null> => {
    if (!cardRef?.current) return null;
    
    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null,
        scale: 2,
        logging: false,
        useCORS: true,
      });
      
      return new Promise((resolve) => {
        canvas.toBlob((blob) => resolve(blob), 'image/png', 0.9);
      });
    } catch (error) {
      console.error('Failed to capture card image:', error);
      return null;
    }
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

  const shareImageToX = async () => {
    setIsGeneratingImage(true);
    try {
      const imageBlob = await captureCardImage();
      if (imageBlob) {
        const text = generateShareText();
        // Try Web Share API first
        if (navigator.share && navigator.canShare) {
          const file = new File([imageBlob], 'tarot-card.png', { type: 'image/png' });
          if (navigator.canShare({ files: [file] })) {
            await navigator.share({
              title: 'My Tarot Reading',
              text: text,
              files: [file]
            });
            return;
          }
        }
        // Fallback: download image and share text
        const url = URL.createObjectURL(imageBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'tarot-card.png';
        link.click();
        URL.revokeObjectURL(url);
        shareToX();
      } else {
        shareToX();
      }
    } catch (error) {
      console.error('Failed to share image:', error);
      shareToX();
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const shareImageToThreads = async () => {
    setIsGeneratingImage(true);
    try {
      const imageBlob = await captureCardImage();
      if (imageBlob) {
        const text = generateShareText();
        // Try Web Share API first
        if (navigator.share && navigator.canShare) {
          const file = new File([imageBlob], 'tarot-card.png', { type: 'image/png' });
          if (navigator.canShare({ files: [file] })) {
            await navigator.share({
              title: 'My Tarot Reading',
              text: text,
              files: [file]
            });
            return;
          }
        }
        // Fallback: download image and share text
        const url = URL.createObjectURL(imageBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'tarot-card.png';
        link.click();
        URL.revokeObjectURL(url);
        shareToThreads();
      } else {
        shareToThreads();
      }
    } catch (error) {
      console.error('Failed to share image:', error);
      shareToThreads();
    } finally {
      setIsGeneratingImage(false);
    }
  };

  return (
    <div className="space-y-3 mt-4">
      {/* Text Sharing */}
      <div className="flex justify-center gap-3">
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

      {/* Image Sharing */}
      {cardRef && (
        <div className="flex justify-center gap-3">
          <Button
            onClick={shareImageToX}
            variant="outline"
            size="sm"
            disabled={isGeneratingImage}
            className="border-wizard-gold/30 text-wizard-cream font-wizard hover:bg-wizard-gold/10 flex items-center gap-2"
          >
            {isGeneratingImage ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Image className="w-4 h-4" />
            )}
            Share Image on X
          </Button>
          <Button
            onClick={shareImageToThreads}
            variant="outline"
            size="sm"
            disabled={isGeneratingImage}
            className="border-wizard-gold/30 text-wizard-cream font-wizard hover:bg-wizard-gold/10 flex items-center gap-2"
          >
            {isGeneratingImage ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Image className="w-4 h-4" />
            )}
            Share Image on Threads
          </Button>
        </div>
      )}
    </div>
  );
};

export default ShareButton;