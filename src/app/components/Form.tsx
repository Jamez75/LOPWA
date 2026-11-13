import { ArrowLeft, Send, User, Mail, Phone, Home, DollarSign, Calendar, FileText } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { CompanyFooter } from './CompanyFooter';
import { MiniProfileHeader } from './MiniProfileHeader';
import { useState } from 'react';

interface FormProps {
  onBack: () => void;
  onShare: () => void;
}

export function Form({ onBack, onShare }: FormProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    loanType: '',
    propertyType: '',
    purchasePrice: '',
    downPayment: '',
    creditScore: '',
    timeframe: '',
    additionalInfo: '',
  });
  
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock form submission
    console.log('Form submitted:', formData);
    setFormSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        loanType: '',
        propertyType: '',
        purchasePrice: '',
        downPayment: '',
        creditScore: '',
        timeframe: '',
        additionalInfo: '',
      });
      setFormSubmitted(false);
    }, 3000);
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
          <h1>Mortgage Application Form</h1>
        </div>
      </div>

      <div className="px-4 py-6 space-y-4">
        {formSubmitted ? (
          <Card className="p-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <h3 className="text-foreground">Application Submitted!</h3>
              <p className="text-muted-foreground">
                Thank you for your submission. James Morales will review your information and contact you within 24 hours.
              </p>
            </div>
          </Card>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Personal Information */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <User className="w-5 h-5 text-destructive" />
                <h3 className="text-foreground">Personal Information</h3>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">First Name</label>
                    <Input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      placeholder="John"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Last Name</label>
                    <Input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      placeholder="Doe"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Email Address</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="john.doe@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Phone Number</label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    required
                  />
                </div>
              </div>
            </Card>

            {/* Loan Information */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Home className="w-5 h-5 text-destructive" />
                <h3 className="text-foreground">Loan Details</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Loan Type</label>
                  <Select value={formData.loanType} onValueChange={(value) => handleInputChange('loanType', value)} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select loan type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="purchase">Purchase</SelectItem>
                      <SelectItem value="refinance">Refinance</SelectItem>
                      <SelectItem value="cashout">Cash-Out Refinance</SelectItem>
                      <SelectItem value="heloc">HELOC</SelectItem>
                      <SelectItem value="construction">Construction</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Property Type</label>
                  <Select value={formData.propertyType} onValueChange={(value) => handleInputChange('propertyType', value)} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single-family">Single Family Home</SelectItem>
                      <SelectItem value="condo">Condo</SelectItem>
                      <SelectItem value="townhouse">Townhouse</SelectItem>
                      <SelectItem value="multi-family">Multi-Family (2-4 units)</SelectItem>
                      <SelectItem value="investment">Investment Property</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Purchase Price / Property Value</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="number"
                      value={formData.purchasePrice}
                      onChange={(e) => handleInputChange('purchasePrice', e.target.value)}
                      placeholder="500000"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Down Payment Amount</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="number"
                      value={formData.downPayment}
                      onChange={(e) => handleInputChange('downPayment', e.target.value)}
                      placeholder="100000"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              </div>
            </Card>

            {/* Financial Information */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-destructive" />
                <h3 className="text-foreground">Financial Information</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Credit Score Range</label>
                  <Select value={formData.creditScore} onValueChange={(value) => handleInputChange('creditScore', value)} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select credit score range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="excellent">Excellent (740+)</SelectItem>
                      <SelectItem value="good">Good (670-739)</SelectItem>
                      <SelectItem value="fair">Fair (580-669)</SelectItem>
                      <SelectItem value="poor">Poor (Below 580)</SelectItem>
                      <SelectItem value="unknown">Not Sure</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Timeframe to Close</label>
                  <Select value={formData.timeframe} onValueChange={(value) => handleInputChange('timeframe', value)} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select timeframe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="asap">ASAP (Within 30 days)</SelectItem>
                      <SelectItem value="1-2months">1-2 Months</SelectItem>
                      <SelectItem value="3-6months">3-6 Months</SelectItem>
                      <SelectItem value="6months+">6+ Months</SelectItem>
                      <SelectItem value="exploring">Just Exploring</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Additional Information</label>
                  <Textarea
                    value={formData.additionalInfo}
                    onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                    placeholder="Tell us about your situation, any special requirements, or questions you have..."
                    rows={4}
                    className="resize-none"
                  />
                </div>
              </div>
            </Card>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-12 bg-destructive hover:bg-destructive/90 text-destructive-foreground shadow-md"
            >
              <Send className="w-4 h-4 mr-2" />
              Submit Application
            </Button>

            {/* Disclaimer */}
            <Card className="p-4 bg-primary/5 border-primary/20">
              <p className="text-xs text-foreground">
                🔒 Your information is secure and confidential. By submitting this form, you consent to be contacted by AmericaMortgages.com regarding your mortgage needs.
              </p>
            </Card>
          </form>
        )}
      </div>

      {/* Footer */}
      <CompanyFooter onShare={onShare} />
    </div>
  );
}