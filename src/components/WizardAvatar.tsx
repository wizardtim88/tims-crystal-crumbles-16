import React, { useState } from "react";
import { toast } from "@/components/ui/sonner";
interface WizardAvatarProps {
  className?: string;
}
const WizardAvatar: React.FC<WizardAvatarProps> = ({
  className = ""
}) => {
  const [isNapping, setIsNapping] = useState(false);
  const [imageError, setImageError] = useState(false);
  const toggleNap = () => {
    setIsNapping(!isNapping);
    toast(isNapping ? "Tim wakes up!" : "Tim falls asleep...", {
      description: isNapping ? "Grumbling about being disturbed from his nap." : "Snoring loudly with cookie crumbs on his robe."
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
        className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-wizard-dark border-2 border-wizard-gold cursor-pointer hover:scale-105 transition-transform duration-300 flex items-center justify-center"
        onClick={toggleNap}
        role="button"
        aria-label="Tim the Wizard"
      >
        {imageError ? (
          <div className="text-wizard-cream font-wizard text-xl">
            {isNapping ? "😴" : "🧙‍♂️"}
          </div>
        ) : (
          <div className="text-wizard-cream font-wizard text-xl">
            {isNapping ? "😴" : "🧙‍♂️"}
          </div>
        )}
      </div>
    </div>
  );
};
export default WizardAvatar;