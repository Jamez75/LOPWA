import { ArrowLeft, Mail, MessageCircle, Linkedin, QrCode, Download, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { CompanyFooter } from './CompanyFooter';
import { MiniProfileHeader } from './MiniProfileHeader';
import { useState } from 'react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { ChevronDown, Send } from 'lucide-react';

interface ContactProps {
  onBack: () => void;
  onSetAppointment?: () => void;
  onShare: () => void;
}

export function Contact({ onBack, onSetAppointment, onShare }: ContactProps) {
  const [showQR, setShowQR] = useState(false);
  const [showMessageForm, setShowMessageForm] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleEmail = () => {
    window.location.href = 'mailto:loanofficer@americamortgages.com';
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/1234567890', '_blank');
  };

  const handleLinkedIn = () => {
    window.open('https://linkedin.com/in/loanofficer', '_blank');
  };

  const handleAppointment = () => {
    if (onSetAppointment) {
      onSetAppointment();
    }
  };

  const handleSaveContact = () => {
    // Create vCard data
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:James Morales
TITLE:Senior Loan Officer
ORG:AmericaMortgages.com
TEL;TYPE=WORK,VOICE:+1234567890
EMAIL:loanofficer@americamortgages.com
URL:https://americamortgages.com
END:VCARD`;

    const blob = new Blob([vcard], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'loan-officer-contact.vcf';
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you can add logic to handle form submission, e.g., sending data to a server
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Mini Profile Header */}
      <MiniProfileHeader />
      
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-6 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-primary-foreground hover:bg-primary-foreground/10"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-primary-foreground">Contact Information</h1>
        </div>
      </div>

      <div className="px-6 py-6 space-y-4">
        {/* Contact Methods */}
        <div className="space-y-3">
          {/* Email */}
          <Card
            className="p-5 cursor-pointer hover:shadow-md transition-all active:scale-[0.98] border-border"
            onClick={handleEmail}
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-destructive to-destructive/80 flex items-center justify-center">
                <Mail className="w-6 h-6 text-destructive-foreground" />
              </div>
              <div className="flex-1">
                <h4 className="text-foreground mb-1">Email</h4>
                <p className="text-muted-foreground">james.morales@americamortgages.com</p>
              </div>
            </div>
          </Card>

          {/* WhatsApp */}
          <Card
            className="p-5 cursor-pointer hover:shadow-md transition-all active:scale-[0.98] border-border"
            onClick={handleWhatsApp}
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-chart-2 to-chart-2/80 flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="text-foreground mb-1">WhatsApp</h4>
                <p className="text-muted-foreground">+1 (480) 788-4832</p>
              </div>
            </div>
          </Card>

          {/* Set Appointment */}
          <Card
            className="p-5 cursor-pointer hover:shadow-md transition-all active:scale-[0.98] border-border"
            onClick={handleAppointment}
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-secondary to-secondary/80 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-secondary-foreground" />
              </div>
              <div className="flex-1">
                <h4 className="text-foreground mb-1">Set Appointment</h4>
                <p className="text-muted-foreground">Schedule a consultation</p>
              </div>
            </div>
          </Card>

          {/* Send a Message - Collapsible */}
          <Card className="border-border overflow-hidden">
            <div
              className="p-5 cursor-pointer hover:bg-muted transition-all active:scale-[0.98]"
              onClick={() => setShowMessageForm(!showMessageForm)}
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                  <Send className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <h4 className="text-foreground mb-1">Send a Message</h4>
                  <p className="text-muted-foreground">Contact us directly</p>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground transition-transform ${
                    showMessageForm ? 'rotate-180' : ''
                  }`}
                />
              </div>
            </div>

            {/* Collapsible Form */}
            {showMessageForm && (
              <div className="px-5 pb-5 border-t border-border pt-4 animate-in slide-in-from-top-2">
                {formSubmitted ? (
                  <div className="p-4 bg-accent/10 border border-accent rounded-lg text-center">
                    <p className="text-foreground">
                      ✓ Thank you! Your message has been sent.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitForm} className="space-y-3">
                    <div>
                      <Input
                        type="text"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Input
                        type="email"
                        placeholder="Your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Textarea
                        placeholder="Your Message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={4}
                        required
                        className="resize-none"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                )}
              </div>
            )}
          </Card>

          {/* LinkedIn */}
          <Card
            className="p-5 cursor-pointer hover:shadow-md transition-all active:scale-[0.98] border-border"
            onClick={handleLinkedIn}
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-chart-1 to-chart-1/80 flex items-center justify-center">
                <Linkedin className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="text-foreground mb-1">LinkedIn</h4>
                <p className="text-muted-foreground">Connect with me</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-4">
          <Button
            variant="outline"
            className="h-12"
            onClick={() => setShowQR(!showQR)}
          >
            <QrCode className="w-4 h-4 mr-2" />
            QR Code
          </Button>
          <Button
            variant="outline"
            className="h-12"
            onClick={handleSaveContact}
          >
            <Download className="w-4 h-4 mr-2" />
            Save Contact
          </Button>
        </div>

        {/* QR Code Display */}
        {showQR && (
          <Card className="p-6 bg-gradient-to-br from-primary to-primary/90 text-primary-foreground border-0 shadow-md animate-in fade-in slide-in-from-bottom-4">
            <div className="text-center">
              <p className="text-primary-foreground/80 mb-4">Scan to Save Contact</p>
              <div className="w-48 h-48 bg-card rounded-xl mx-auto flex items-center justify-center">
                <QrCode className="w-32 h-32 text-primary" />
              </div>
              <p className="text-primary-foreground/60 mt-4">
                Use your camera to scan this QR code
              </p>
            </div>
          </Card>
        )}
      </div>

      {/* Company Footer */}
      <CompanyFooter onShare={onShare} />
    </div>
  );
}