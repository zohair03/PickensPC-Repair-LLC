import AppointmentBookingManager from '@/components/booking/AppointmentBookingManager';
import HeroHeading from '@/components/ui/texts/HeroHeading';
import HeroSubtitle from '@/components/ui/texts/HeroSubtitle';


export const metadata = {
  title: 'Book Appointment',
  description: 'Book a new appointment with us.',
};

export default function BookPage() {
  return (
    <div className="relative min-h-screen bg-[url('/images/hero-img.webp')] bg-cover flex flex-col items-center justify-center">
      <div className="absolute inset-0 bg-black/50 z-1" />
      <main className="flex flex-col lg:flex-row items-center justify-center mt-33 px-6 lg:px-20 py-15 md:py-0 z-10 gap-4">
        <div className="z-10 flex flex-col items-center justify-start gap-4 md:gap-8">
          <HeroHeading
            text="Book an Appointment with Pickens PC Repair LLC"
            custom="text-xl! lg:text-left! lg:w-full! md:text-2xl! leading-relaxed! pt-0!"
          />
          <HeroSubtitle
            text="Schedule your computer repair and IT support services with us."
            custom="lg:text-left! lg:w-full!"
          />
        </div>
        <AppointmentBookingManager />
      </main>
    </div>
  );
}
