import { X, Link, Mail, MessageCircle, Facebook, Linkedin, Twitter } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { useState } from 'react';
import QRCode from 'react-qr-code';

interface ShareDialogProps {
  onClose: () => void;
}

export function ShareDialog({ onClose }: ShareDialogProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOptions = [
    { icon: Mail, label: 'Email', color: 'bg-chart-5', onClick: () => window.location.href = 'mailto:?subject=Check out my digital business card' },
    { icon: MessageCircle, label: 'WhatsApp', color: 'bg-chart-2', onClick: () => window.open('https://wa.me/?text=Check out my digital business card', '_blank') },
    { icon: Facebook, label: 'Facebook', color: 'bg-chart-1', onClick: () => window.open('https://www.facebook.com/sharer/sharer.php?u=' + window.location.href, '_blank') },
    { icon: Linkedin, label: 'LinkedIn', color: 'bg-chart-1', onClick: () => window.open('https://www.linkedin.com/sharing/share-offsite/?url=' + window.location.href, '_blank') },
    { icon: Twitter, label: 'X', color: 'bg-foreground', onClick: () => window.open('https://twitter.com/intent/tweet?url=' + window.location.href, '_blank') },
  ];

  return (
    <div className="fixed inset-0 bg-foreground/50 z-50 flex items-end justify-center p-4 animate-in fade-in">
      <Card className="w-full max-w-md p-6 animate-in slide-in-from-bottom border-border">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-foreground">Share Contact</h2>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Copy Link */}
        <div className="mb-6">
          <Button
            variant="outline"
            className="w-full justify-start gap-3 h-12"
            onClick={handleCopyLink}
          >
            <Link className="w-5 h-5" />
            <span className="flex-1 text-left">
              {copied ? 'Link Copied!' : 'Copy Link'}
            </span>
          </Button>
        </div>

        {/* Share Options */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {shareOptions.map((option, index) => {
            const Icon = option.icon;
            return (
              <button
                key={index}
                onClick={option.onClick}
                className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-muted transition-colors"
              >
                <div className={`w-12 h-12 rounded-full ${option.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-muted-foreground">{option.label}</span>
              </button>
            );
          })}
        </div>

        {/* QR Code */}
        <div className="flex flex-col items-center pt-4 border-t border-border">
          <p className="text-muted-foreground mb-3">Scan to share</p>
          <div className="p-2 bg-muted rounded-lg">
            <QRCode value={window.location.href} size={100} />
          </div>
        </div>
      </Card>
    </div>
  );
}