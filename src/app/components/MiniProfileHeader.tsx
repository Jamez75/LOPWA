import profileImage from 'figma:asset/fea8ab82441948b702f356dba308b0284f40ab05.png';
import logo from 'figma:asset/2eb96cd52ae70f8e3d64b50543bf4c5f515330fb.png';

export function MiniProfileHeader() {
  return (
    <div className="bg-card border-b border-border shadow-sm">
      <div className="px-6 py-4 flex items-center gap-3">
        {/* Small Profile Photo */}
        <div className="w-12 h-12 rounded-full bg-muted border-2 border-primary shadow-sm overflow-hidden flex-shrink-0">
          <img 
            src={profileImage} 
            alt="Loan Officer" 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Name and Logo */}
        <div className="flex-1 min-w-0">
          <h4 className="text-foreground truncate">James Morales</h4>
          <span className="text-muted-foreground">AmericaMortgages.com</span>
        </div>
      </div>
    </div>
  );
}