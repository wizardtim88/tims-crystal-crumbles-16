// Enhanced Social Sharing Utilities with Character Limits

export interface ShareTemplate {
  id: string;
  name: string;
  maxLength: number;
  generate: () => string;
}

export interface ShareContent {
  text: string;
  length: number;
  isValid: boolean;
  platform: 'x' | 'threads';
}

// Platform character limits
export const PLATFORM_LIMITS = {
  x: 280,
  threads: 500,
} as const;

// Accurate character counting for social media
export const countSocialChars = (text: string): number => {
  // URLs count as 23 characters on X regardless of actual length
  const urlRegex = /https?:\/\/[^\s]+/g;
  const urls = text.match(urlRegex) || [];
  let charCount = text.length;
  
  // Subtract actual URL length and add standardized count
  urls.forEach(url => {
    charCount = charCount - url.length + 23;
  });
  
  return charCount;
};

// Smart content truncation that preserves meaning
export const smartTruncate = (text: string, maxLength: number, preserveWords: boolean = true): string => {
  if (countSocialChars(text) <= maxLength) return text;
  
  const ellipsis = '...';
  const targetLength = maxLength - ellipsis.length;
  
  if (!preserveWords) {
    return text.substring(0, targetLength) + ellipsis;
  }
  
  // Find the last complete word that fits
  const words = text.split(' ');
  let result = '';
  
  for (const word of words) {
    const testResult = result ? `${result} ${word}` : word;
    if (countSocialChars(testResult) <= targetLength) {
      result = testResult;
    } else {
      break;
    }
  }
  
  return result ? result + ellipsis : text.substring(0, targetLength) + ellipsis;
};

// Extract Tim's full personality from fortune text
export const extractFortuneContent = (response: string) => {
  // Extract different parts of Tim's response
  const actionMatch = response.match(/\*([^*]+)\*/);
  const quoteMatch = response.match(/"([^"]+)"/);
  
  // Find text after the quote (Tim's commentary)
  let commentary = '';
  if (quoteMatch) {
    const afterQuote = response.split(quoteMatch[0])[1];
    if (afterQuote) {
      commentary = afterQuote.replace(/^\s*[.!?]*\s*/, '').trim();
      // Remove any trailing actions
      commentary = commentary.replace(/\s*\*[^*]+\*\s*$/, '').trim();
    }
  }
  
  return {
    action: actionMatch ? actionMatch[1] : '',
    quote: quoteMatch ? quoteMatch[1] : '',
    commentary: commentary,
    fullText: response.replace(/\*[^*]*\*/g, '').trim() // Remove actions from full text
  };
};

// Generate tiered fortune sharing templates
export const generateFortuneTemplates = (response: string, category: string): ShareTemplate[] => {
  const content = extractFortuneContent(response);
  const categoryEmoji = getCategoryEmoji(category);
  
  return [
    // Full personality (longest)
    {
      id: 'full-personality',
      name: 'Full Tim Experience',
      maxLength: 280,
      generate: () => {
        const promoText = "🔮 Get your fortune from Wizard Tim! 🔗 in bio.";
        let shareText = `${categoryEmoji} Tim's Fortune:\n\n"${content.quote}"`;
        
        if (content.commentary) {
          shareText += `\n\n${content.commentary}`;
        }
        
        shareText += `\n\n${promoText}`;
        return smartTruncate(shareText, PLATFORM_LIMITS.x);
      }
    },
    // Quote + commentary (medium)
    {
      id: 'quote-commentary',
      name: 'Wisdom + Tim\'s Take',
      maxLength: 280,
      generate: () => {
        const promoText = "🔮 Wizard Tim speaks! 🔗 in bio.";
        let shareText = `${categoryEmoji} "${content.quote}"`;
        
        if (content.commentary && content.commentary.length < 100) {
          shareText += `\n\n${content.commentary}`;
        }
        
        shareText += `\n\n${promoText}`;
        return smartTruncate(shareText, PLATFORM_LIMITS.x);
      }
    },
    // Quote only with hook (short)
    {
      id: 'quote-hook',
      name: 'Pure Wisdom',
      maxLength: 280,
      generate: () => {
        const hooks = [
          "Tim's crystal ball revealed:",
          "The Wizard has spoken:",
          "Fortune delivered with grumpy wisdom:",
          "Tim's cosmic truth bomb:"
        ];
        const hook = hooks[Math.floor(Math.random() * hooks.length)];
        const promoText = "🔮 Get yours! 🔗 in bio.";
        
        const shareText = `${categoryEmoji} ${hook}\n\n"${content.quote}"\n\n${promoText}`;
        return smartTruncate(shareText, PLATFORM_LIMITS.x);
      }
    },
    // Shortest emergency version
    {
      id: 'minimal',
      name: 'Quick Share',
      maxLength: 280,
      generate: () => {
        const shareText = `${categoryEmoji} "${content.quote}"\n\n🔮 Wizard Tim 🔗 in bio.`;
        return smartTruncate(shareText, PLATFORM_LIMITS.x);
      }
    }
  ];
};

// Enhanced tarot template validation
export const validateTarotTemplate = (template: () => string, platform: 'x' | 'threads' = 'x'): ShareContent => {
  const text = template();
  const length = countSocialChars(text);
  const maxLength = PLATFORM_LIMITS[platform];
  
  return {
    text: text,
    length: length,
    isValid: length <= maxLength,
    platform: platform
  };
};

// Auto-fix tarot templates that exceed limits
export const fixTarotTemplate = (template: () => string, platform: 'x' | 'threads' = 'x'): string => {
  const validation = validateTarotTemplate(template, platform);
  
  if (validation.isValid) {
    return validation.text;
  }
  
  // If too long, create a shorter version
  return smartTruncate(validation.text, PLATFORM_LIMITS[platform]);
};

// Category emojis
const getCategoryEmoji = (category: string): string => {
  const emojis = {
    love: '💕',
    career: '💰',
    health: '🌿',
    general: '✨'
  };
  return emojis[category as keyof typeof emojis] || '🔮';
};

// Generate share URL with proper encoding
export const generateShareUrl = (platform: 'x' | 'threads', text: string): string => {
  const encodedText = encodeURIComponent(text);
  
  const urls = {
    x: `https://twitter.com/intent/tweet?text=${encodedText}`,
    threads: `https://threads.net/intent/post?text=${encodedText}`
  };
  
  return urls[platform];
};

// Open share window with proper dimensions
export const openShareWindow = (url: string): void => {
  const width = 550;
  const height = 420;
  const left = (screen.width / 2) - (width / 2);
  const top = (screen.height / 2) - (height / 2);
  
  window.open(
    url,
    '_blank',
    `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes`
  );
};