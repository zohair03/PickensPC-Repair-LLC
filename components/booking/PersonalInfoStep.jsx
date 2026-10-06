'use client';

import Input, { Textarea } from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function PersonalInfoStep({ data, onChange, onNext }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">Your Information</h2>
      <Input
        id="user_name"
        label="Full Name *"
        type="text"
        placeholder="John Doe"
        value={data.user_name}
        onChange={(e) => onChange('user_name', e.target.value)}
        required
      />
      <Input
        id="user_email"
        label="Email Address *"
        type="email"
        placeholder="john@example.com"
        value={data.user_email}
        onChange={(e) => onChange('user_email', e.target.value)}
        required
      />
      <Input
        id="user_phone"
        label="Phone Number *"
        type="tel"
        placeholder="+1 (555) 000-0000"
        value={data.user_phone}
        onChange={(e) => onChange('user_phone', e.target.value)}
        required
      />
      <Textarea
        id="notes"
        label="Notes (optional)"
        placeholder="Any special requests or information..."
        value={data.notes}
        onChange={(e) => onChange('notes', e.target.value)}
      />
      <div className="flex justify-end pt-2">
        <Button type="submit">Next →</Button>
      </div>
    </form>
  );
}
