import { useState } from 'react';
import { ArrowLeft, Calendar as CalendarIcon, Clock, Video, Phone, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Calendar } from './ui/calendar';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { CompanyFooter } from './CompanyFooter';

interface AppointmentSchedulerProps {
  onBack: () => void;
  onShare: () => void;
}

export function AppointmentScheduler({ onBack, onShare }: AppointmentSchedulerProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [meetingType, setMeetingType] = useState<'video' | 'phone' | 'office'>('video');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [isBooked, setIsBooked] = useState(false);

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  const handleBooking = () => {
    setIsBooked(true);
    setTimeout(() => {
      setIsBooked(false);
      onBack();
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background pb-6">
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
          <h1>Schedule Meeting</h1>
        </div>
      </div>

      {isBooked ? (
        <div className="px-4 py-12 text-center">
          <Card className="p-8 bg-accent/10 border-accent">
            <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
              <CalendarIcon className="w-8 h-8 text-primary-foreground" />
            </div>
            <h2 className="text-foreground mb-2">Appointment Confirmed!</h2>
            <p className="text-muted-foreground mb-4">
              Your meeting has been scheduled for {date?.toLocaleDateString()} at {selectedTime}
            </p>
            <p className="text-sm text-muted-foreground">
              A confirmation email has been sent to {email}
            </p>
          </Card>
        </div>
      ) : (
        <div className="px-4 py-6 space-y-6">
          {/* Meeting Type */}
          <Card className="p-6">
            <Label className="mb-3 block">Meeting Type</Label>
            <div className="grid grid-cols-3 gap-3">
              <Button
                variant={meetingType === 'video' ? 'default' : 'outline'}
                onClick={() => setMeetingType('video')}
                className="flex-col h-auto py-4"
              >
                <Video className="w-5 h-5 mb-2" />
                <span className="text-xs">Video Call</span>
              </Button>
              <Button
                variant={meetingType === 'phone' ? 'default' : 'outline'}
                onClick={() => setMeetingType('phone')}
                className="flex-col h-auto py-4"
              >
                <Phone className="w-5 h-5 mb-2" />
                <span className="text-xs">Phone Call</span>
              </Button>
              <Button
                variant={meetingType === 'office' ? 'default' : 'outline'}
                onClick={() => setMeetingType('office')}
                className="flex-col h-auto py-4"
              >
                <MapPin className="w-5 h-5 mb-2" />
                <span className="text-xs">In Office</span>
              </Button>
            </div>
          </Card>

          {/* Calendar */}
          <Card className="p-6">
            <Label className="mb-3 block">Select Date</Label>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border mx-auto"
              disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
            />
          </Card>

          {/* Time Slots */}
          <Card className="p-6">
            <Label className="mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Available Times
            </Label>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((time) => (
                <Button
                  key={time}
                  variant={selectedTime === time ? 'default' : 'outline'}
                  onClick={() => setSelectedTime(time)}
                  className="text-xs"
                >
                  {time}
                </Button>
              ))}
            </div>
          </Card>

          {/* Contact Information */}
          <Card className="p-6 space-y-4">
            <h3>Your Information</h3>
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="What would you like to discuss?"
                rows={3}
              />
            </div>
          </Card>

          {/* Book Button */}
          <Button
            className="w-full h-12 bg-destructive hover:bg-destructive/90 text-destructive-foreground shadow-md"
            onClick={handleBooking}
            disabled={!date || !selectedTime || !name || !email || !phone}
          >
            Confirm Appointment
          </Button>

          {/* Time Zone Info */}
          <p className="text-xs text-center text-muted-foreground">
            All times shown in Eastern Time (ET)
          </p>
        </div>
      )}
      {/* Footer */}
      <CompanyFooter onShare={onShare} />
    </div>
  );
}