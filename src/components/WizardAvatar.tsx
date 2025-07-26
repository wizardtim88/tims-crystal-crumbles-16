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
  return <div className={`relative cursor-pointer ${className}`} onClick={toggleNap} role="button" aria-label={isNapping ? "Wake up Tim" : "Put Tim to sleep"}>
      
      {isNapping && <div className="absolute -top-2 -right-2 text-xl animate-pulse">💤</div>}
    </div>;
};
export default WizardAvatar;