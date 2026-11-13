import { Building2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import logo from 'figma:asset/054ea096877ae55fc6a893f2495856f5bd8a9517.png';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 300);
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 bg-primary flex flex-col items-center justify-center z-50 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Logo */}
      <div className="animate-in fade-in duration-700 slide-in-from-bottom-4">
        <div className="w-24 h-24 bg-card rounded-2xl flex items-center justify-center mb-6 shadow-lg p-4">
          <img src={logo} alt="AmericaMortgages.com" className="w-full h-full object-contain" />
        </div>
      </div>

      {/* Company Name */}
      <div className="animate-in fade-in duration-700 delay-200 slide-in-from-bottom-4">
        <h1 className="text-primary-foreground mb-2 tracking-tight">America Mortgages</h1>
      </div>

      {/* Tagline */}
      <div className="animate-in fade-in duration-700 delay-300 slide-in-from-bottom-4">
        <p className="text-primary-foreground/90">US Mortgage Specialist</p>
      </div>

      {/* Loading Dots */}
      <div className="absolute bottom-20 animate-in fade-in duration-700 delay-500">
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-accent rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-accent rounded-full animate-pulse" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-accent rounded-full animate-pulse" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
}