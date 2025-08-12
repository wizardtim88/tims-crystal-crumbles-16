import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Loader2, Image as ImageIcon } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { generateComprehensiveImage, downloadImage, ImageTemplateType } from '@/utils/imageGenerator';
import TarotImageTemplate from '@/components/TarotImageTemplate';
import ZodiacImageTemplate from '@/components/ZodiacImageTemplate';
import ComprehensiveFortuneImageTemplate from '@/components/ComprehensiveFortuneImageTemplate';
import { TarotReading } from '@/types/tarot';
import { ZodiacSign } from '@/types/zodiac';
import { FortuneCategory } from '@/types/fortune';

interface BookRecommendation {
  bookId: number;
  title: string;
  subtitle?: string;
  creators?: string;
  description?: string;
  url?: string;
  reason: string;
}

interface ShareableImageGeneratorProps {
  type: ImageTemplateType;
  data: {
    // For tarot readings
    tarotReading?: TarotReading;
    // For zodiac readings
    zodiacReading?: string;
    zodiacSign?: ZodiacSign;
    // For fortune readings
    fortuneResponse?: string;
    fortuneCategory?: FortuneCategory;
    // Common
    bookRecommendations?: BookRecommendation[];
  };
  className?: string;
}

const ShareableImageGenerator: React.FC<ShareableImageGeneratorProps> = ({
  type,
  data,
  className = ''
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const templateRef = useRef<HTMLDivElement>(null);

  const handleGenerateImage = async () => {
    if (!templateRef.current) {
      toast.error("Template not ready", {
        description: "Tim's magical template seems to be taking a nap...",
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      toast("Tim is crafting your mystical image...", {
        description: "This might take a moment for the magic to work properly.",
      });

      const imageDataUrl = await generateComprehensiveImage(templateRef.current, type);
      
      // Generate filename based on type and current date
      const timestamp = new Date().toISOString().split('T')[0];
      const filename = `tim-${type}-reading-${timestamp}.png`;
      
      downloadImage(imageDataUrl, filename);
      
      toast.success("Magical image created!", {
        description: "Tim has successfully conjured your shareable reading image.",
      });
    } catch (error) {
      console.error("Error generating image:", error);
      toast.error("Image generation failed", {
        description: "Tim mutters something about 'temperamental magic'...",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const renderTemplate = () => {
    switch (type) {
      case 'tarot':
        if (!data.tarotReading) return null;
        return (
          <TarotImageTemplate
            ref={templateRef}
            reading={data.tarotReading}
            bookRecommendations={data.bookRecommendations}
          />
        );
      case 'zodiac':
        if (!data.zodiacReading || !data.zodiacSign) return null;
        return (
          <ZodiacImageTemplate
            ref={templateRef}
            reading={data.zodiacReading}
            sign={data.zodiacSign}
            bookRecommendations={data.bookRecommendations}
          />
        );
      case 'fortune':
        if (!data.fortuneResponse || !data.fortuneCategory) return null;
        return (
          <ComprehensiveFortuneImageTemplate
            ref={templateRef}
            response={data.fortuneResponse}
            category={data.fortuneCategory}
            bookRecommendations={data.bookRecommendations}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={className}>
      <Button
        onClick={handleGenerateImage}
        disabled={isGenerating}
        variant="outline"
        size="sm"
        className="text-wizard-purple hover:bg-wizard-purple/10 text-xs sm:text-sm px-2 sm:px-3"
      >
        {isGenerating ? (
          <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 animate-spin" />
        ) : (
          <ImageIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
        )}
        <span className="hidden xs:inline">Create </span>Image
      </Button>
      
      {/* Hidden template for image generation */}
      <div className="absolute -left-[9999px] top-0 pointer-events-none">
        {renderTemplate()}
      </div>
    </div>
  );
};

export default ShareableImageGenerator;