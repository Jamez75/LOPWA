import { ArrowLeft, FileText, Download, ExternalLink, BookOpen, Video, HelpCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { CompanyFooter } from './CompanyFooter';
import { MiniProfileHeader } from './MiniProfileHeader';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';

interface ResourcesProps {
  onBack: () => void;
  onShare: () => void;
}

export function Resources({ onBack, onShare }: ResourcesProps) {
  const guides = [
    {
      title: 'International Buyer Program',
      description: 'Special mortgage options for international clients',
      icon: FileText,
      color: 'bg-accent',
      type: 'PDF',
    },
    {
      title: 'Refinancing Made Simple',
      description: 'When and how to refinance your mortgage',
      icon: BookOpen,
      color: 'bg-secondary',
      type: 'PDF',
    },
    {
      title: 'Understanding Credit Scores',
      description: 'How your credit affects mortgage approval',
      icon: FileText,
      color: 'bg-chart-3',
      type: 'PDF',
    },
  ];

  const videos = [
    {
      title: 'Mortgage Process Explained',
      duration: '5:30',
      thumbnail: 'video',
    },
    {
      title: 'Document Checklist',
      duration: '3:15',
      thumbnail: 'video',
    },
    {
      title: 'International Buyers FAQ',
      duration: '8:20',
      thumbnail: 'video',
    },
  ];

  const faqs = [
    {
      question: 'What documents do I need?',
      answer: 'Typically: ID, proof of income, bank statements, tax returns, and employment verification.',
    },
    {
      question: 'Can I get a mortgage as an international buyer?',
      answer: 'Yes! We specialize in helping international clients secure U.S. mortgages.',
    },
    {
      question: 'How long does pre-approval take?',
      answer: 'Usually 24-48 hours with all required documentation.',
    },
    {
      question: 'What credit score do I need?',
      answer: 'Generally 620+ for conventional loans, though exceptions may apply.',
    },
  ];

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
          <h1>Resources & Guides</h1>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Guides Section */}
        <div>
          <h2 className="text-foreground mb-4">Downloadable Guides</h2>
          <div className="grid gap-3">
            {guides.map((guide, index) => {
              const Icon = guide.icon;
              return (
                <Card
                  key={index}
                  className="p-4 cursor-pointer hover:shadow-lg transition-all active:scale-98"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-lg ${guide.color} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-foreground mb-1">{guide.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{guide.description}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded">
                          {guide.type}
                        </span>
                        <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                          <Download className="w-3 h-3 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Video Tutorials */}
        <div>
          <h2 className="text-foreground mb-4">Video Tutorials</h2>
          <div className="grid gap-3">
            {videos.map((video, index) => (
              <Card
                key={index}
                className="p-4 cursor-pointer hover:shadow-lg transition-all active:scale-98"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg bg-destructive flex items-center justify-center flex-shrink-0">
                    <Video className="w-8 h-8 text-destructive-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-foreground mb-1">{video.title}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{video.duration}</span>
                      <ExternalLink className="w-3 h-3 text-muted-foreground" />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div>
          <h2 className="text-foreground mb-4 flex items-center gap-2">
            <HelpCircle className="w-5 h-5" />
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg">
                <Card className="border-0">
                  <AccordionTrigger className="px-4 py-4 hover:no-underline">
                    <h3 className="text-foreground text-left">{faq.question}</h3>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <p className="text-sm text-muted-foreground">{faq.answer}</p>
                  </AccordionContent>
                </Card>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Quick Links */}
        <Card className="p-6 bg-primary/5 border-primary/20">
          <h3 className="text-foreground mb-4">Quick Links</h3>
          <div className="space-y-2">
            <a href="https://americamortgages.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 bg-card rounded-lg hover:shadow-md transition-all">
              <span className="text-foreground">Visit AmericaMortgages.com</span>
              <ExternalLink className="w-4 h-4 text-primary" />
            </a>
            <a href="#" className="flex items-center justify-between p-3 bg-card rounded-lg hover:shadow-md transition-all">
              <span className="text-foreground">Loan Programs</span>
              <ExternalLink className="w-4 h-4 text-primary" />
            </a>
          </div>
        </Card>
      </div>

      {/* Footer */}
      <CompanyFooter onShare={onShare} />
    </div>
  );
}