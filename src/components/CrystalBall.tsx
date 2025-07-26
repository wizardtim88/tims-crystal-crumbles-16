import React, { useEffect, useRef, useState } from 'react';
import { createGlowEffect, createMistEffect } from '@/lib/animations';

interface CrystalBallProps {
  isActive: boolean;
  className?: string;
  onCrystalBallClick?: () => void;
  videoUrl?: string;
  videoType?: 'fortunes' | 'horoscope' | 'tarot';
  onVideoComplete?: () => void;
}
const CrystalBall: React.FC<CrystalBallProps> = ({
  isActive,
  className = "",
  onCrystalBallClick,
  videoUrl,
  videoType,
  onVideoComplete
}) => {
  // Refs for animation elements
  const glowRef = useRef<HTMLDivElement>(null);
  const mistRef = useRef<HTMLDivElement>(null);
  const ballRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Video state
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [videoLoading, setVideoLoading] = useState(false);
  useEffect(() => {
    // Apply animations
    createGlowEffect(glowRef.current, 2000);
    createMistEffect(mistRef.current, 5000);
  }, []);

  // Handle video completion
  const handleVideoEnded = () => {
    setIsPlaying(false);
    onVideoComplete?.();
  };

  // Handle video error
  const handleVideoError = () => {
    setVideoError(true);
    setIsPlaying(false);
    setVideoLoading(false);
    // Fall back to bounce animation
    if (ballRef.current) {
      ballRef.current.classList.add('animate-bounce');
      setTimeout(() => {
        if (ballRef.current) {
          ballRef.current.classList.remove('animate-bounce');
        }
      }, 1000);
    }
  };

  // Handle crystal ball click
  const handleBallClick = async () => {
    if (videoUrl && !videoError) {
      setVideoLoading(true);
      setVideoError(false);
      
      try {
        if (videoRef.current) {
          videoRef.current.currentTime = 0;
          await videoRef.current.play();
          setIsPlaying(true);
          setVideoLoading(false);
        }
      } catch (error) {
        handleVideoError();
        onCrystalBallClick?.();
      }
    } else {
      // Fall back to bounce animation and immediate callback
      if (ballRef.current) {
        ballRef.current.classList.add('animate-bounce');
        setTimeout(() => {
          if (ballRef.current) {
            ballRef.current.classList.remove('animate-bounce');
          }
        }, 1000);
      }
      onCrystalBallClick?.();
    }
  };
  return <div className={`relative ${className}`}>
      {/* Main crystal ball sphere */}
      <div ref={ballRef} onClick={handleBallClick} className={`
          relative w-48 h-48 md:w-64 md:h-64 rounded-full 
          crystal-ball shadow-lg cursor-pointer
          border-2 border-white/30
          ${isActive ? 'animate-pulse' : 'hover:scale-105 transition-transform duration-300'}
          overflow-hidden
        `} role="button" aria-label="Crystal Ball">
        {/* Video element */}
        {videoUrl && (
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover rounded-full"
            style={{
              visibility: isPlaying ? 'visible' : 'hidden',
              opacity: isPlaying ? 1 : 0,
              zIndex: 50
            }}
            muted
            playsInline
            preload="metadata"
            onEnded={handleVideoEnded}
            onError={handleVideoError}
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        )}

        {/* Loading indicator */}
        {videoLoading && (
          <div className="absolute inset-0 flex items-center justify-center z-40">
            <div className="w-8 h-8 border-2 border-wizard-gold border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Inner glow */}
        <div ref={glowRef} className="absolute inset-0 crystal-ball-glow opacity-40 transition-opacity duration-1000" />
        
  
        {/* Magic sparkles */}
        {isActive && <>
            <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-wizard-gold rounded-full animate-ping" />
            <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-white rounded-full animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-wizard-gold rounded-full animate-ping" />
            <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-wizard-purple/70 rounded-full animate-pulse" />
            
            {/* Tim's silhouette in the crystal ball when active */}
            <div className="absolute inset-0 flex items-center justify-center opacity-30">
              <div className="w-24 h-24 bg-wizard-dark rounded-full transform scale-75 flex items-center justify-center">
                <span className="text-wizard-cream font-wizard text-lg">Tim</span>
              </div>
            </div>
          </>}
      </div>
      

      {/* Sparkles around ball when active */}
      {isActive && <>
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 text-wizard-gold animate-bounce text-xl">✨</div>
          <div className="absolute -bottom-1 -left-1 text-wizard-gold animate-pulse delay-100 text-lg">✨</div>
          <div className="absolute top-1/4 -right-2 text-wizard-gold animate-pulse delay-300 text-xl">✨</div>
        </>}
    </div>;
};
export default CrystalBall;