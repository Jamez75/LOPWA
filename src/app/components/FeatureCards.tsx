import { Calculator, DollarSign, Calendar, BookOpen, FileText, Video, ClipboardCheck, Sparkles } from 'lucide-react';
import { Card } from './ui/card';

interface FeatureCardsProps {
  onFeatureClick: (feature: string) => void;
}

export function FeatureCards({ onFeatureClick }: FeatureCardsProps) {
  const features = [
    {
      id: 'propertyai',
      icon: Sparkles,
      title: 'Property AI',
      description: 'AI-powered insights',
      gradient: 'from-secondary to-secondary/80',
    },
    {
      id: 'calculator',
      icon: Calculator,
      title: 'Mortgage Calculators',
      description: 'Calculate payments',
      gradient: 'from-primary to-primary/80',
    },
    {
      id: 'currency',
      icon: DollarSign,
      title: 'Currency Converter',
      description: 'Global exchange rates',
      gradient: 'from-accent to-accent/80',
    },
    {
      id: 'needslist',
      icon: ClipboardCheck,
      title: 'Needs List',
      description: 'Documents per program',
      gradient: 'from-chart-2 to-chart-2/80',
    },
    {
      id: 'resources',
      icon: BookOpen,
      title: 'Resources',
      description: 'Mortgage guides',
      gradient: 'from-chart-3 to-chart-3/80',
    },
  ];

  return (
    <div className="px-6">
      <h2 className="text-foreground mb-6">Services & Tools</h2>
      <div className="space-y-4">
        {/* Property AI - Full Width Featured Card */}
        {features
          .filter((feature) => feature.id === 'propertyai')
          .map((feature) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.id}
                className="cursor-pointer transition-all hover:shadow-md active:scale-[0.98] border-border overflow-hidden bg-gradient-to-br from-secondary to-secondary/90"
                onClick={() => onFeatureClick(feature.id)}
              >
                <div className="py-6 px-6 flex items-center gap-4">
                  <div className="w-12 h-12 bg-secondary-foreground/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-secondary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-secondary-foreground mb-1">{feature.title}</h3>
                    <p className="text-secondary-foreground/80">{feature.description}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        
        {/* Other Features - 2 Column Grid */}
        <div className="grid grid-cols-2 gap-4">
          {features
            .filter((feature) => feature.id !== 'propertyai')
            .map((feature) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={feature.id}
                  className="cursor-pointer transition-all hover:shadow-md active:scale-[0.98] border-border overflow-hidden bg-card"
                  onClick={() => onFeatureClick(feature.id)}
                >
                  <div className="p-5">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-foreground mb-1">{feature.title}</h4>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </Card>
              );
            })}
        </div>
      </div>
    </div>
  );
}