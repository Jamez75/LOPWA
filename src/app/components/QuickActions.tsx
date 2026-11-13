import { Phone, Mail, MessageCircle, UserCircle, Bot, FileText } from 'lucide-react';
import { Button } from './ui/button';

interface QuickActionsProps {
  onContactClick: () => void;
  onQuickAppClick?: () => void;
}

export function QuickActions({ onContactClick, onQuickAppClick }: QuickActionsProps) {
  const handleCall = () => {
    window.location.href = 'tel:+1234567890';
  };

  const handleEmail = () => {
    window.location.href = 'mailto:loanofficer@americamortgages.com';
  };

  const handleQuickApp = () => {
    if (onQuickAppClick) {
      onQuickAppClick();
    }
  };

  return (
    <div className="px-6">
      <div className="grid grid-cols-3 gap-4">
        <Button
          onClick={handleCall}
          className="flex-col h-auto py-6 bg-primary hover:bg-primary/90 text-primary-foreground transition-all hover:shadow-md rounded-lg"
        >
          <Bot className="w-5 h-5 mb-2" />
          <span>AI Chat</span>
        </Button>
        <Button
          onClick={handleQuickApp}
          className="flex-col h-auto py-6 bg-destructive hover:bg-destructive/90 text-destructive-foreground transition-all hover:shadow-md rounded-lg"
        >
          <FileText className="w-5 h-5 mb-2" />
          <span>Quick App</span>
        </Button>
        <Button
          onClick={onContactClick}
          className="flex-col h-auto py-6 bg-secondary hover:bg-secondary/90 text-secondary-foreground transition-all hover:shadow-md rounded-lg"
        >
          <UserCircle className="w-5 h-5 mb-2" />
          <span>Contact</span>
        </Button>
      </div>
    </div>
  );
}