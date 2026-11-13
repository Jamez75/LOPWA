import { useState } from 'react';
import { ProfileHeader } from './components/ProfileHeader';
import { RatesDisplay } from './components/RatesDisplay';
import { QuickActions } from './components/QuickActions';
import { FeatureCards } from './components/FeatureCards';
import { MortgageCalculator } from './components/MortgageCalculator';
import { CurrencyConverter } from './components/CurrencyConverter';
import { AppointmentScheduler } from './components/AppointmentScheduler';
import { Resources } from './components/Resources';
import { CompanyFooter } from './components/CompanyFooter';
import { ShareDialog } from './components/ShareDialog';
import { SplashScreen } from './components/SplashScreen';
import { Contact } from './components/Contact';
import { NeedsList } from './components/NeedsList';
import { Form } from './components/Form';
import { QuickApp } from './components/QuickApp';

export default function App() {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  const handleFeatureClick = (feature: string) => {
    setActiveFeature(activeFeature === feature ? null : feature);
  };

  const handleBackToMain = () => {
    setActiveFeature(null);
  };

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-md">
        {/* Main Business Card View */}
        {!activeFeature && (
          <div className="space-y-6 pb-20">
            <ProfileHeader />
            <RatesDisplay />
            <QuickActions 
              onContactClick={() => setActiveFeature('contact')} 
              onQuickAppClick={() => setActiveFeature('quickapp')}
            />
            <FeatureCards onFeatureClick={handleFeatureClick} />
            <CompanyFooter onShare={() => setShowShareDialog(true)} />
          </div>
        )}

        {/* Feature Views */}
        {activeFeature === 'contact' && (
          <Contact 
            onBack={handleBackToMain}
            onSetAppointment={() => setActiveFeature('appointment')}
            onShare={() => setShowShareDialog(true)}
          />
        )}
        {activeFeature === 'calculator' && (
          <MortgageCalculator 
            onBack={handleBackToMain}
            onShare={() => setShowShareDialog(true)}
          />
        )}
        {activeFeature === 'currency' && (
          <CurrencyConverter 
            onBack={handleBackToMain}
            onShare={() => setShowShareDialog(true)}
          />
        )}
        {activeFeature === 'appointment' && (
          <AppointmentScheduler 
            onBack={handleBackToMain}
            onShare={() => setShowShareDialog(true)}
          />
        )}
        {activeFeature === 'resources' && (
          <Resources 
            onBack={handleBackToMain}
            onShare={() => setShowShareDialog(true)}
          />
        )}
        {activeFeature === 'needslist' && (
          <NeedsList 
            onBack={handleBackToMain}
            onShare={() => setShowShareDialog(true)}
          />
        )}
        {activeFeature === 'form' && (
          <Form 
            onBack={handleBackToMain}
            onShare={() => setShowShareDialog(true)}
          />
        )}
        {activeFeature === 'quickapp' && (
          <QuickApp 
            onBack={handleBackToMain}
            onShare={() => setShowShareDialog(true)}
          />
        )}

        {/* Share Dialog */}
        {showShareDialog && (
          <ShareDialog onClose={() => setShowShareDialog(false)} />
        )}
      </div>
    </div>
  );
}