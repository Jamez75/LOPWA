import { ArrowLeft, Shield, Lock, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { CompanyFooter } from './CompanyFooter';
import { MiniProfileHeader } from './MiniProfileHeader';
import { useState } from 'react';
import logoImage from 'figma:asset/46b118a3b21fb90325bd6e108c6fdf6b50606f20.png';

interface QuickAppProps {
  onBack: () => void;
  onShare: () => void;
}

export function QuickApp({ onBack, onShare }: QuickAppProps) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically authenticate with your backend
    setLoggedIn(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loggedIn) {
    return (
      <div className="min-h-screen bg-background">
        <MiniProfileHeader />
        
        <div className="bg-primary text-primary-foreground p-4 sticky top-0 z-10 shadow-md">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="text-primary-foreground hover:bg-primary-foreground/10"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1>Quick Application</h1>
          </div>
        </div>

        <div className="px-4 py-8 max-w-2xl mx-auto">
          <Card className="p-8 text-center border-0 shadow-lg">
            <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-12 h-12 text-accent" />
            </div>
            <h2 className="text-foreground mb-4">Login Successful!</h2>
            <p className="text-muted-foreground mb-6">
              Welcome back! You have successfully logged in to your account.
            </p>
            <div className="space-y-3">
              <Button
                onClick={onBack}
                className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground"
              >
                Return to Home
              </Button>
              <Button
                variant="outline"
                onClick={() => setLoggedIn(false)}
                className="w-full"
              >
                Logout
              </Button>
            </div>
          </Card>
        </div>

        <CompanyFooter onShare={onShare} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-6">
      <MiniProfileHeader />
      
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4 sticky top-0 z-10 shadow-md">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-primary-foreground hover:bg-primary-foreground/10"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1>Quick Application</h1>
            <p className="text-xs text-primary-foreground/70 mt-1">Secure Login Portal</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 max-w-md mx-auto space-y-6">
        {/* Privacy & Security Notice */}
        <Card className="p-5 bg-accent/10 border-accent">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                <Shield className="w-6 h-6 text-accent" />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Lock className="w-4 h-4 text-accent" />
                <h3 className="text-accent-foreground">Your Privacy & Security</h3>
              </div>
              <p className="text-sm text-foreground leading-relaxed">
                Your information is protected with bank-level encryption and will never be shared with third parties. 
                This application is secure and confidential. We comply with all federal privacy regulations including 
                GLBA and FCRA standards.
              </p>
            </div>
          </div>
        </Card>

        {/* Login Card */}
        <Card className="p-8 border-0 shadow-lg bg-card">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img src={logoImage} alt="America Mortgages" className="h-16" />
          </div>

          {/* Login Heading */}
          <h2 className="text-center text-foreground mb-8">Login to your account</h2>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <Label htmlFor="email" className="text-sm text-foreground mb-2 block">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                className="h-12"
              />
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="password" className="text-sm text-foreground">
                  Password
                </Label>
                <button
                  type="button"
                  className="text-sm text-primary hover:text-primary/80"
                >
                  Forgot ?
                </button>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                  className="h-12 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg"
            >
              Login now
            </Button>

            {/* Sign Up Link */}
            <p className="text-center text-sm text-muted-foreground">
              Don't Have An Account ?{' '}
              <button
                type="button"
                className="text-primary hover:text-primary/80"
              >
                Sign Up
              </button>
            </p>
          </form>
        </Card>

        {/* reCAPTCHA */}
        <div className="flex justify-center">
          <div className="bg-muted border border-border rounded-lg p-4 inline-block">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="recaptcha"
                className="w-6 h-6 rounded border-border cursor-pointer"
              />
              <label htmlFor="recaptcha" className="text-sm text-foreground cursor-pointer">
                I'm not a robot
              </label>
              <div className="ml-4">
                <svg className="w-10 h-10" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="256" height="256" fill="var(--primary)"/>
                  <path d="M128 48L48 88V168L128 208L208 168V88L128 48Z" fill="white"/>
                  <path d="M128 80L80 104V152L128 176L176 152V104L128 80Z" fill="var(--primary)"/>
                </svg>
              </div>
            </div>
            <div className="mt-2 text-xs text-muted-foreground flex items-center gap-1">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              <span>reCAPTCHA</span>
              <span className="mx-1">•</span>
              <a href="#" className="hover:underline">Privacy</a>
              <span className="mx-1">-</span>
              <a href="#" className="hover:underline">Terms</a>
            </div>
          </div>
        </div>
      </div>

      <CompanyFooter onShare={onShare} />
    </div>
  );
}