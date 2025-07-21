
import React, { useState, useRef, useEffect } from 'react';
import { DrawnCard } from '@/types/tarot';
import { Card } from '@/components/ui/card';

interface TarotCardProps {
  drawnCard?: DrawnCard;
  isRevealed: boolean;
  onReveal?: () => void;
  className?: string;
}

const TarotCard: React.FC<TarotCardProps> = ({ 
  drawnCard, 
  isRevealed, 
  onReveal,
  className = "" 
}) => {
  const [isFlipping, setIsFlipping] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Handle video reveal
  useEffect(() => {
    if (isRevealed && drawnCard?.card.videoUrl && !prefersReducedMotion) {
      setShowVideo(true);
      setVideoEnded(false);
      
      // Start video playback
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {
          // If video fails to play, show static image immediately
          setShowVideo(false);
          setVideoEnded(true);
        });
      }
    }
  }, [isRevealed, drawnCard?.card.videoUrl, prefersReducedMotion]);

  const handleClick = () => {
    if (!isRevealed && onReveal && !isFlipping) {
      setIsFlipping(true);
      setTimeout(() => {
        onReveal();
        setIsFlipping(false);
      }, 300);
    }
  };

  const handleVideoEnded = () => {
    setShowVideo(false);
    setVideoEnded(true);
  };

  const shouldShowVideo = showVideo && !videoEnded && drawnCard?.card.videoUrl && !prefersReducedMotion;
  const shouldShowImage = !shouldShowVideo && isRevealed && drawnCard;

  return (
    <div className={`relative w-36 h-64 ${onReveal && !isRevealed ? 'cursor-pointer' : ''} ${className}`} onClick={handleClick}>
      <div className={`
        relative w-full h-full transition-transform duration-500
        [transform-style:preserve-3d] [perspective:1000px]
        ${isRevealed ? '[transform:rotateY(180deg)]' : ''}
        ${isFlipping ? 'animate-pulse' : ''}
      `}>
        {/* Card Back */}
        <Card className={`
          absolute inset-0 w-full h-full [backface-visibility:hidden]
          border-2 border-wizard-gold/50 bg-gradient-to-br from-wizard-purple to-wizard-dark
          flex items-center justify-center hover:border-wizard-gold hover:shadow-lg
          hover:shadow-wizard-gold/20 transition-all
        `}>
          <div className="text-center text-wizard-cream p-4">
            <div className="text-4xl mb-2">🔮</div>
            <div className="font-wizard text-sm">Tim's Stolen Deck</div>
            <div className="text-xs opacity-70 mt-1">Click to reveal</div>
          </div>
        </Card>

        {/* Card Front */}
        <Card className={`
          absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)]
          border-2 border-wizard-gold/50 bg-gradient-to-br from-wizard-cream to-wizard-peach
          ${drawnCard?.isReversed ? 'rotate-180' : ''}
          hover:shadow-lg hover:shadow-wizard-gold/20 transition-all overflow-hidden
        `}>
          {/* Video Element */}
          {shouldShowVideo && (
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              muted
              playsInline
              preload="metadata"
              onEnded={handleVideoEnded}
              onError={() => {
                setShowVideo(false);
                setVideoEnded(true);
              }}
            >
              <source src={drawnCard.card.videoUrl} type="video/mp4" />
            </video>
          )}

          {/* Static Image */}
          {shouldShowImage && (
            <img 
              src={drawnCard.card.imageUrl}
              alt={drawnCard.card.imageAlt}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                videoEnded ? 'opacity-100' : 'opacity-0'
              }`}
              loading="lazy"
              onError={(e) => {
                // Fallback to emoji if image fails to load
                e.currentTarget.style.display = 'none';
                const fallback = document.createElement('div');
                fallback.className = 'absolute inset-0 w-full h-full flex items-center justify-center bg-wizard-dark/10';
                fallback.innerHTML = '<div class="text-6xl opacity-50">🎴</div>';
                e.currentTarget.parentNode?.appendChild(fallback);
              }}
            />
          )}
        </Card>
      </div>
    </div>
  );
};

export default TarotCard;
