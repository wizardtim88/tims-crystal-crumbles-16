import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}
const ThemeToggle: React.FC<ThemeToggleProps> = ({
  isDark,
  onToggle
}) => {
  return <Button variant="ghost" size="sm" onClick={onToggle} className="relative p-2 text-foreground hover:bg-background/20 transition-all duration-300" aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}>
      <div className="relative w-5 h-5 bg-slate-950">
        <Sun className={`h-5 w-5 absolute transition-all duration-300 ${isDark ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}`} />
        <Moon className={`h-5 w-5 absolute transition-all duration-300 ${isDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'}`} />
      </div>
    </Button>;
};
export default ThemeToggle;