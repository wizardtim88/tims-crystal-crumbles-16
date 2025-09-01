// Enhanced Fortune Sharing Component with Character Limits and Previews

import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Twitter, MessageCircle, Shuffle, Copy } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { FortuneCategory } from '@/types/fortune';
import {
  generateFortuneTemplates,
  generateShareUrl,
  openShareWindow,
  countSocialChars,
  PLATFORM_LIMITS
} from '@/utils/socialSharing';

interface EnhancedShareButtonProps {
  response: string;
  category: FortuneCategory;
  className?: string;
}

const EnhancedShareButton: React.FC<EnhancedShareButtonProps> = ({ 
  response, 
  category, 
  className = '' 
}) => {
  const [currentTemplateIndex, setCurrentTemplateIndex] = useState(0);
  
  // Generate templates based on fortune content
  const templates = useMemo(() => 
    generateFortuneTemplates(response, category), 
    [response, category]
  );
  
  const currentTemplate = templates[currentTemplateIndex];
  const shareText = currentTemplate.generate();
  const charCount = countSocialChars(shareText);
  const isValidForX = charCount <= PLATFORM_LIMITS.x;
  const isValidForThreads = charCount <= PLATFORM_LIMITS.threads;
  
  const cycleTemplate = () => {
    setCurrentTemplateIndex(prev => (prev + 1) % templates.length);
  };
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      toast("Copied to clipboard!", {
        description: "Tim begrudgingly allows you to paste his wisdom elsewhere.",
      });
    } catch (error) {
      toast("Copy failed", {
        description: "Tim mutters about 'unreliable modern magic'...",
      });
    }
  };
  
  const handleShareToX = () => {
    if (!isValidForX) {
      toast("Post too long for X", {
        description: "Try a shorter template or Tim will get truncated!",
      });
      return;
    }
    
    try {
      const url = generateShareUrl('x', shareText);
      openShareWindow(url);
      
      toast("Fortune shared on X!", {
        description: "Tim has begrudgingly allowed you to share his wisdom.",
      });
    } catch (error) {
      console.error("Error sharing fortune:", error);
      toast("X sharing failed", {
        description: "Tim mutters something about 'unreliable magic networks'...",
      });
    }
  };
  
  const handleShareToThreads = () => {
    if (!isValidForThreads) {
      toast("Post too long for Threads", {
        description: "Even Threads has limits on Tim's verbosity!",
      });
      return;
    }
    
    try {
      const url = generateShareUrl('threads', shareText);
      openShareWindow(url);
      
      toast("Fortune shared on Threads!", {
        description: "Tim sighs but admits 'more platforms means more nap interruptions'.",
      });
    } catch (error) {
      console.error("Error sharing fortune:", error);
      toast("Threads sharing failed", {
        description: "Tim grumbles about 'too many social networks to keep track of'...",
      });
    }
  };
  
  const getCharCountColor = (count: number, limit: number) => {
    const ratio = count / limit;
    if (ratio < 0.8) return 'text-green-600';
    if (ratio < 0.95) return 'text-yellow-600';
    return 'text-red-600';
  };
  
  return (
    <div className={`space-y-3 ${className}`}>
      {/* Template Selection */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-600 font-medium">
          Share Style: {currentTemplate.name}
        </span>
        <Button 
          onClick={cycleTemplate} 
          variant="ghost" 
          size="sm" 
          className="text-wizard-purple hover:bg-wizard-purple/10 p-1 h-auto"
        >
          <Shuffle className="w-3 h-3" />
        </Button>
      </div>
      
      {/* Preview Box */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-gray-500">Preview</span>
          <div className="flex items-center gap-2 text-xs">
            <span className={getCharCountColor(charCount, PLATFORM_LIMITS.x)}>
              X: {charCount}/{PLATFORM_LIMITS.x}
            </span>
            <span className="text-gray-300">|</span>
            <span className={getCharCountColor(charCount, PLATFORM_LIMITS.threads)}>
              Threads: {charCount}/{PLATFORM_LIMITS.threads}
            </span>
          </div>
        </div>
        <div className="text-xs text-gray-700 whitespace-pre-line bg-white rounded p-2 border">
          {shareText}
        </div>
      </div>
      
      {/* Share Buttons */}
      <div className="flex flex-wrap justify-center gap-2">
        <Button 
          variant="ghost" 
          size="sm"
          className={`text-wizard-purple hover:bg-wizard-purple/10 text-xs px-2 ${
            !isValidForX ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={handleShareToX}
          disabled={!isValidForX}
        >
          <Twitter className="h-3 w-3 mr-1" />
          Share on X
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm"
          className={`text-wizard-purple hover:bg-wizard-purple/10 text-xs px-2 ${
            !isValidForThreads ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={handleShareToThreads}
          disabled={!isValidForThreads}
        >
          <MessageCircle className="h-3 w-3 mr-1" />
          Threads
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm"
          className="text-wizard-purple hover:bg-wizard-purple/10 text-xs px-2"
          onClick={copyToClipboard}
        >
          <Copy className="h-3 w-3 mr-1" />
          Copy
        </Button>
      </div>
    </div>
  );
};

export default EnhancedShareButton;