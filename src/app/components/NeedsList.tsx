import { ArrowLeft, CheckCircle2, Circle, FileText, User, Building, CreditCard, Home, ChevronDown, ChevronUp, Square, CheckSquare, Briefcase, RefreshCw } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { CompanyFooter } from './CompanyFooter';
import { MiniProfileHeader } from './MiniProfileHeader';
import { useState } from 'react';

interface NeedsListProps {
  onBack: () => void;
  onShare: () => void;
}

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  category: string;
  checked: boolean;
}

export function NeedsList({ onBack, onShare }: NeedsListProps) {
  const [checklist, setChecklist] = useState<ChecklistItem[]>([
    // DSCR Preapproval
    {
      id: '18',
      title: 'Copy of Passport',
      description: 'Valid government-issued passport',
      category: 'dscr',
      checked: false,
    },
    {
      id: '16',
      title: 'Last two months of Bank Statements',
      description: 'Recent bank statements showing available funds',
      category: 'dscr',
      checked: false,
    },
    {
      id: '19',
      title: 'Mortgage Application',
      description: 'Completed mortgage application form',
      category: 'dscr',
      checked: false,
    },
    {
      id: '17',
      title: 'Credit Score Report',
      description: 'Minimum 620 credit score required',
      category: 'dscr',
      checked: false,
    },
    // Closing in an Entity
    {
      id: '20',
      title: 'Articles of Organization/Incorporation',
      description: 'Legal formation documents for the entity',
      category: 'entity',
      checked: false,
    },
    {
      id: '21',
      title: 'Operating Agreement',
      description: 'Agreement outlining entity ownership and operations',
      category: 'entity',
      checked: false,
    },
    {
      id: '22',
      title: 'EIN Letter',
      description: 'IRS Employer Identification Number confirmation',
      category: 'entity',
      checked: false,
    },
    {
      id: '23',
      title: 'Certificate of Good Standing',
      description: 'State certification that entity is in compliance',
      category: 'entity',
      checked: false,
    },
    {
      id: '24',
      title: 'Entity Bank Statements',
      description: 'Business account statements showing funds',
      category: 'entity',
      checked: false,
    },
    // Refinance/Release Equity
    {
      id: '32',
      title: 'Copy of Passport',
      description: 'Valid government-issued passport',
      category: 'refinance',
      checked: false,
    },
    {
      id: '25',
      title: 'Current Mortgage Statement',
      description: 'Most recent statement showing balance and payment',
      category: 'refinance',
      checked: false,
    },
    {
      id: '31',
      title: 'Current Lease Agreement(s)',
      description: 'Active rental agreements for the property',
      category: 'refinance',
      checked: false,
    },
    {
      id: '33',
      title: 'Last Two Months of Bank Statements',
      description: 'Recent bank statements showing available funds',
      category: 'refinance',
      checked: false,
    },
    {
      id: '28',
      title: 'Homeowners Insurance Policy',
      description: 'Current insurance documentation',
      category: 'refinance',
      checked: false,
    },
    {
      id: '34',
      title: 'Mortgage Application',
      description: 'Completed mortgage application form',
      category: 'refinance',
      checked: false,
    },
    {
      id: '35',
      title: 'Credit Report',
      description: 'U.S. or international credit history',
      category: 'refinance',
      checked: false,
    },
    // Employment Documentation
    {
      id: '9',
      title: 'Employment Verification',
      description: 'Letter from employer or contract',
      category: 'employment',
      checked: false,
    },
    {
      id: '10',
      title: 'Business License',
      description: 'If self-employed',
      category: 'employment',
      checked: false,
    },
  ]);

  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    dscr: false,
    employment: false,
    entity: false,
    refinance: false,
  });

  const toggleItem = (id: string) => {
    setChecklist(checklist.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const toggleCategoryAll = (category: string) => {
    const categoryItems = checklist.filter(item => item.category === category);
    const allChecked = categoryItems.every(item => item.checked);
    
    setChecklist(checklist.map(item => 
      item.category === category ? { ...item, checked: !allChecked } : item
    ));
  };

  const getCategoryInfo = (category: string) => {
    switch (category) {
      case 'financial':
        return { icon: CreditCard, color: 'bg-accent', label: 'Financial Documents' };
      case 'employment':
        return { icon: Building, color: 'bg-secondary', label: 'Full Income Doc Loan' };
      case 'dscr':
        return { icon: FileText, color: 'bg-destructive', label: 'DSCR Preapproval' };
      case 'entity':
        return { icon: Briefcase, color: 'bg-chart-2', label: 'Closing in an Entity' };
      case 'refinance':
        return { icon: RefreshCw, color: 'bg-chart-4', label: 'Refinance/Release Equity' };
      default:
        return { icon: FileText, color: 'bg-muted', label: 'Documents' };
    }
  };

  const categories = ['dscr', 'refinance', 'employment', 'entity'];
  const getProgress = () => {
    const checked = checklist.filter(item => item.checked).length;
    return Math.round((checked / checklist.length) * 100);
  };

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Mini Profile Header */}
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
          <h1>Document Checklist</h1>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Info Card */}
        <Card className="p-4 bg-primary/5 border-primary/20">
          <p className="text-sm text-foreground">
            <strong>Note:</strong> This checklist helps you track the documents needed for your mortgage application. Requirements may vary based on your specific situation.
          </p>
        </Card>

        {/* Checklist by Category */}
        {categories.map((category) => {
          const categoryInfo = getCategoryInfo(category);
          const CategoryIcon = categoryInfo.icon;
          const categoryItems = checklist.filter(item => item.category === category);
          const allChecked = categoryItems.every(item => item.checked);
          const someChecked = categoryItems.some(item => item.checked);
          
          return (
            <div key={category}>
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-lg ${categoryInfo.color} flex items-center justify-center shadow-sm`}>
                  <CategoryIcon className="w-5 h-5 text-primary-foreground" />
                </div>
                <h3 className="text-foreground">{categoryInfo.label}</h3>
                {expandedCategories[category] && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleCategoryAll(category)}
                    className="ml-auto text-sm hover:bg-muted h-8 px-3"
                  >
                    {allChecked ? (
                      <CheckSquare className="w-4 h-4 text-accent mr-1" />
                    ) : someChecked ? (
                      <Square className="w-4 h-4 text-muted-foreground mr-1" />
                    ) : (
                      <Square className="w-4 h-4 text-muted-foreground mr-1" />
                    )}
                    Select All
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setExpandedCategories(prev => ({ ...prev, [category]: !prev[category] }))}
                  className={`${expandedCategories[category] ? '' : 'ml-auto'} hover:bg-muted`}
                >
                  {expandedCategories[category] ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </Button>
              </div>
              
              <div className="space-y-2 mb-6" style={{ display: expandedCategories[category] ? 'block' : 'none' }}>
                {categoryItems.map((item) => (
                  <Card
                    key={item.id}
                    className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                      item.checked ? 'bg-accent/10 border-accent' : 'border-border'
                    }`}
                    onClick={() => toggleItem(item.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="pt-0.5">
                        {item.checked ? (
                          <CheckSquare className="w-5 h-5 text-accent" />
                        ) : (
                          <Square className="w-5 h-5 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className={`mb-1 ${item.checked ? 'text-accent-foreground' : 'text-foreground'}`}>
                          {item.title}
                        </h4>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}

        {/* CTA Button */}
        <Button className="w-full h-12 bg-destructive hover:bg-destructive/90 text-destructive-foreground shadow-md">
          Save Copy of List
        </Button>
      </div>

      {/* Company Footer */}
      <CompanyFooter onShare={onShare} />
    </div>
  );
}