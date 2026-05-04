import { useState } from 'react';
import { CheckCircle, MapPin, MousePointerClick, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServiceCard } from './components/ServiceCard';
import { BookingModal } from './components/BookingModal';
import { Footer } from './components/Footer';
import { CITIES } from './data/seoData';
import { SERVICES } from './data/servicesData';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | undefined>();

  const locations = [
    'DHA Phase 1-5',
    'Bahria Phase 1-8',
    'PWD',
    'Ghouri Town',
    'Gulrez',
    'Gulberg Green',
    'Adyala Road',
    'Islamabad',
    'Rawalpindi',
    'Murree',
    'Peshawar',
  ];

  const handleServiceSelect = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    setIsBookingOpen(true);
  };

  const handleBookNow = () => {
    setSelectedService(undefined);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onBookNowClick={handleBookNow} />

      <Hero onBookNowClick={handleBookNow} />

      <section id="services" className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4 text-3xl sm:text-4xl font-bold">
              Our Services
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
              Choose from our comprehensive range of professional cleaning and maintenance services
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {SERVICES.map((service) => (
              <ServiceCard
                key={service.title}
                icon={service.icon}
                title={service.title}
                description={service.description}
                image={service.image}
                onSelect={() => handleServiceSelect(service.title)}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4 text-3xl sm:text-4xl font-bold">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
              Simple and quick booking process in just 4 easy steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MousePointerClick size={32} className="text-secondary" />
              </div>
              <h3 className="mb-2 text-base sm:text-lg font-semibold">
                Choose Your Service
              </h3>
              <p className="text-muted-foreground text-sm">
                Select from our range of professional services
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin size={32} className="text-secondary" />
              </div>
              <h3 className="mb-2 text-base sm:text-lg font-semibold">
                Select Your Location
              </h3>
              <p className="text-muted-foreground text-sm">
                Pick your area from our coverage zones
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send size={32} className="text-secondary" />
              </div>
              <h3 className="mb-2 text-base sm:text-lg font-semibold">
                Request Sent Instantly
              </h3>
              <p className="text-muted-foreground text-sm">
                Your request is sent via WhatsApp instantly
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-secondary" />
              </div>
              <h3 className="mb-2 text-base sm:text-lg font-semibold">
                Provider Contacts You
              </h3>
              <p className="text-muted-foreground text-sm">
                Our team reaches out to confirm and schedule
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="locations" className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4 text-3xl sm:text-4xl font-bold">
              Locations We Cover
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
              Serving major areas across Islamabad, Rawalpindi, and surrounding regions
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {locations.map((location) => (
              <div
                key={location}
                className="bg-white border border-border px-4 sm:px-6 py-2.5 rounded-full text-sm font-medium"
              >
                {location}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="seo-cities" className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="mb-3 text-2xl sm:text-3xl font-bold">
              Service Areas
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
              Explore dedicated pages for each city we serve to find the right service quickly.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {CITIES.map((city) => (
              <Link
                key={city.slug}
                to={`/${city.slug}`}
                className="bg-white border border-border px-5 py-2.5 rounded-full text-sm font-medium hover:border-primary hover:text-primary transition-colors"
              >
                {city.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        selectedService={selectedService}
      />
    </div>
  );
}