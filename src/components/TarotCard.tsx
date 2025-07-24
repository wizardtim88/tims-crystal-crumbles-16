
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
  const [videoError, setVideoError] = useState(false);
  const [videoLoading, setVideoLoading] = useState(false);
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
      console.log('🎬 Starting video reveal for:', drawnCard.card.name);
      console.log('🎬 Video URL:', drawnCard.card.videoUrl);
      setVideoLoading(true);
      setShowVideo(true);
      setVideoEnded(false);
      setVideoError(false);
      
      // Start video playback when ready
      if (videoRef.current) {
        const video = videoRef.current;
        console.log('🎬 Video element found, setting up event listeners');
        
        const handleCanPlay = () => {
          console.log('🎬 Video can play, starting playback');
          setVideoLoading(false);
          video.play().catch((error) => {
            console.error('🎬 Video play failed:', error);
            setVideoError(true);
            setShowVideo(false);
            setVideoEnded(true);
          });
        };

        const handleError = (e: Event) => {
          console.error('🎬 Video loading error:', e);
          setVideoError(true);
          setVideoLoading(false);
          setShowVideo(false);
          setVideoEnded(true);
        };

        const handleLoadStart = () => {
          console.log('🎬 Video load started');
        };

        const handleLoadedData = () => {
          console.log('🎬 Video data loaded');
        };

        video.addEventListener('canplay', handleCanPlay);
        video.addEventListener('error', handleError);
        video.addEventListener('loadstart', handleLoadStart);
        video.addEventListener('loadeddata', handleLoadedData);
        
        // Reset video to start
        video.currentTime = 0;
        video.load();

        return () => {
          video.removeEventListener('canplay', handleCanPlay);
          video.removeEventListener('error', handleError);
          video.removeEventListener('loadstart', handleLoadStart);
          video.removeEventListener('loadeddata', handleLoadedData);
        };
      } else {
        console.error('🎬 Video element not found');
      }
    } else if (isRevealed) {
      // No video or reduced motion - show static image immediately
      console.log('🎬 No video or reduced motion, showing static image');
      setShowVideo(false);
      setVideoEnded(true);
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
    console.log('🎬 Video ended, transitioning to static image');
    setShowVideo(false);
    setVideoEnded(true);
  };

  const shouldShowVideo = showVideo && !videoEnded && !videoError && drawnCard?.card.videoUrl && !prefersReducedMotion;
  const shouldShowImage = !shouldShowVideo && isRevealed && drawnCard;

  console.log('🎬 Render state:', {
    isRevealed,
    shouldShowVideo,
    shouldShowImage,
    videoLoading,
    videoError,
    hasVideoUrl: !!drawnCard?.card.videoUrl
  });

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
          absolute inset-0 w-full h-full [backface-visibility:hidden] z-10
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
          absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] z-20
          border-2 border-wizard-gold/50 bg-gradient-to-br from-wizard-cream to-wizard-peach
          ${drawnCard?.isReversed ? 'rotate-180' : ''}
          hover:shadow-lg hover:shadow-wizard-gold/20 transition-all overflow-hidden
        `}>
          {/* Video Loading Indicator */}
          {videoLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-wizard-dark/10 z-[90]">
              <div className="text-wizard-dark/60 text-center">
                <div className="text-2xl mb-2">📽️</div>
                <div className="text-sm">Loading magical animation...</div>
              </div>
            </div>
          )}

          {/* Video Element */}
          {shouldShowVideo && (
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover z-[100]"
              muted
              playsInline
              preload="auto"
              onEnded={handleVideoEnded}
              onError={(e) => {
                console.error('🎬 Video playback error:', e);
                setVideoError(true);
                setShowVideo(false);
                setVideoEnded(true);
              }}
              style={{ 
                visibility: shouldShowVideo ? 'visible' : 'hidden',
                opacity: shouldShowVideo ? 1 : 0,
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 100
              }}
            >
              <source src={drawnCard?.card.videoUrl} type="video/mp4" />
            </video>
          )}

          {/* Static Image */}
          {shouldShowImage && (
            <img 
              src={drawnCard.card.imageUrl}
              alt={drawnCard.card.imageAlt}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 z-[80] ${
                videoEnded ? 'opacity-100' : 'opacity-0'
              }`}
              loading="lazy"
              onError={(e) => {
                console.error('🎬 Image loading error for:', drawnCard.card.name);
                // Fallback to emoji if image fails to load
                e.currentTarget.style.display = 'none';
                const fallback = document.createElement('div');
                fallback.className = 'absolute inset-0 w-full h-full flex items-center justify-center bg-wizard-dark/10 z-[75]';
                fallback.innerHTML = '<div class="text-6xl opacity-50">🎴</div>';
                e.currentTarget.parentNode?.appendChild(fallback);
              }}
            />
          )}

          {/* Video Error Fallback */}
          {videoError && isRevealed && (
            <div className="absolute inset-0 flex items-center justify-center bg-wizard-dark/5 z-[85]">
              <div className="text-wizard-dark/60 text-center p-4">
                <div className="text-3xl mb-2">🎴</div>
                <div className="text-xs">Video unavailable</div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default TarotCard;
