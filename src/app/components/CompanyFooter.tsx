import { Share2, MoreVertical, Building2, Smartphone, Download } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from './ui/sheet';
import { useState } from 'react';
import footerIcon from 'figma:asset/054ea096877ae55fc6a893f2495856f5bd8a9517.png';

interface CompanyFooterProps {
  onShare: () => void;
}

export function CompanyFooter({ onShare }: CompanyFooterProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="px-6">
      <Card className="p-5 border-border shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center p-2">
              <img src={footerIcon} alt="AmericaMortgages.com" className="w-full h-full object-contain" />
            </div>
            <div>
              <h4 className="text-foreground">America Mortgages</h4>
              <p className="text-muted-foreground">U.S. Mortgage Specialists</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onShare}
              className="h-10 w-10 p-0 rounded-full"
            >
              <Share2 className="w-4 h-4 text-foreground" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(true)}
              className="h-10 w-10 p-0 rounded-full"
            >
              <MoreVertical className="w-4 h-4 text-foreground" />
            </Button>
          </div>
        </div>
      </Card>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="bottom" className="h-[80vh] rounded-t-2xl">
          <SheetHeader className="sr-only">
            <SheetTitle>About America Mortgages</SheetTitle>
            <SheetDescription>
              Learn about America Mortgages and how to install this app on your device.
            </SheetDescription>
          </SheetHeader>
          
          <div className="mt-6 space-y-6 overflow-y-auto pb-6">
            {/* Company Logo and About Us */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center p-3">
                <img src={footerIcon} alt="AmericaMortgages.com" className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="text-foreground mb-2">About Us</h3>
                <p className="text-muted-foreground">
                  America Mortgages specializes in helping international clients secure U.S. mortgages. 
                  Install this app for quick access to your dedicated mortgage specialist and helpful tools.
                </p>
              </div>
            </div>

            {/* iOS Instructions */}
            <div>
              <h4 className="text-foreground mb-3 flex items-center gap-2">
                <Smartphone className="w-5 h-5" />
                iOS (iPhone/iPad)
              </h4>
              <Card className="p-4 border-border">
                <ol className="space-y-3 text-muted-foreground">
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center">1</span>
                    <span>Open this page in <strong className="text-foreground">Safari</strong> browser (not Chrome or other browsers)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center">2</span>
                    <span>Tap the <strong className="text-foreground">Share</strong> button at the bottom of the screen (square with arrow pointing up)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center">3</span>
                    <span>Scroll down and tap <strong className="text-foreground">"Add to Home Screen"</strong></span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center">4</span>
                    <span>Tap <strong className="text-foreground">"Add"</strong> in the top right corner</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center">5</span>
                    <span>The app icon will now appear on your home screen!</span>
                  </li>
                </ol>
              </Card>
            </div>

            {/* Android Instructions */}
            <div>
              <h4 className="text-foreground mb-3 flex items-center gap-2">
                <Smartphone className="w-5 h-5" />
                Android
              </h4>
              <Card className="p-4 border-border">
                <ol className="space-y-3 text-muted-foreground">
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center">1</span>
                    <span>Open this page in <strong className="text-foreground">Chrome</strong> browser</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center">2</span>
                    <span>Tap the <strong className="text-foreground">three dots menu</strong> (⋮) in the top right corner</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center">3</span>
                    <span>Tap <strong className="text-foreground">"Add to Home screen"</strong> or <strong className="text-foreground">"Install app"</strong></span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center">4</span>
                    <span>Tap <strong className="text-foreground">"Add"</strong> or <strong className="text-foreground">"Install"</strong> to confirm</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center">5</span>
                    <span>The app icon will now appear on your home screen!</span>
                  </li>
                </ol>
              </Card>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}