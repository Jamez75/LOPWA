import { User, Building2 } from 'lucide-react';
import profileImage from 'figma:asset/fea8ab82441948b702f356dba308b0284f40ab05.png';
import logo from 'figma:asset/2eb96cd52ae70f8e3d64b50543bf4c5f515330fb.png';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function ProfileHeader() {
  return (
    <div className="relative">
      {/* Header Background */}
      <div className="bg-primary relative overflow-hidden pt-8 pb-12">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/90" />
        
        {/* Profile Photo at Top */}
        <div className="relative z-10 flex justify-center mb-6">
          <div className="w-28 h-28 rounded-full bg-card p-1 shadow-lg ring-2 ring-primary-foreground/10">
            <img 
              src={profileImage} 
              alt="Loan Officer" 
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        </div>

        {/* Name and Title */}
        <div className="relative z-10 text-center px-6 text-primary-foreground">
          <h1 className="text-primary-foreground mb-2">James Morales</h1>
          <p className="text-primary-foreground/80">Senior Loan Officer</p>
          
          {/* Co-branded logo */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-card/10 backdrop-blur-sm rounded-lg border border-primary-foreground/10">
              <img src={logo} alt="AmericaMortgages.com" className="w-4 h-4 object-contain" />
              <span className="text-primary-foreground/90">AmericaMortgages.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}