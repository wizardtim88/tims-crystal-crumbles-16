
import React, { useState } from "react";
import { toast } from "@/components/ui/sonner";

interface WizardAvatarProps {
  className?: string;
}

const WizardAvatar: React.FC<WizardAvatarProps> = ({ className = "" }) => {
  const [isNapping, setIsNapping] = useState(false);
  const [imageError, setImageError] = useState(false);

  const toggleNap = () => {
    setIsNapping(!isNapping);
    toast(isNapping ? "Tim wakes up!" : "Tim falls asleep...", {
      description: isNapping ? 
        "Grumbling about being disturbed from his nap." : 
        "Snoring loudly with cookie crumbs on his robe.",
    });
  };

  const handleImageError = () => {
    console.log("Failed to load wizard image from external URL");
    setImageError(true);
  };

  const handleImageLoad = () => {
    console.log("Wizard image loaded successfully");
    setImageError(false);
  };

  return (
    <div className={`relative ${className}`}>
      <div 
        className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-wizard-gold bg-wizard-dark shadow-lg cursor-pointer hover:border-wizard-gold/80 transition-colors"
        onClick={toggleNap}
      >
        {/* Tim's avatar using external Wix URL */}
        <img 
          src="https://static.wixstatic.com/media/7de40b_44048b60f64b411b88d1bbaf9fe716c7~mv2.png/v1/fill/w_131,h_146,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Sticker1.png"
          alt="The Wizard Tim"
          className={`w-full h-full object-cover transition-all duration-300 ${
            isNapping ? 'opacity-80 grayscale-50' : 'opacity-100'
          }`}
          onError={handleImageError}
          onLoad={handleImageLoad}
        />
        
        {/* Fallback if image fails to load */}
        {imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-wizard-purple text-wizard-gold text-xs font-wizard">
            🧙‍♂️
          </div>
        )}
        
        {/* Napping overlay effect */}
        {isNapping && (
          <div className="absolute inset-0 flex items-center justify-center bg-wizard-dark/20">
            <div className="text-white text-xs font-wizard animate-pulse">zzz</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WizardAvatar;
