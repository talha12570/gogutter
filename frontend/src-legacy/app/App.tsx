import { useState } from 'react';
import {
  Droplets,
  Home,
  Hospital,
  Wind,
  Droplet,
  Waves,
  Sparkles,
  Sun,
  Wrench,
  PaintBucket,
  CheckCircle,
  MousePointerClick,
  Send,
  Phone,
  Mail,
  MessageCircle,
  MapPin,
} from 'lucide-react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServiceCard } from './components/ServiceCard';
import { BookingModal } from './components/BookingModal';
import gutterCleaningImage from '../../imgs/gutter-cleaning.jpg';
import homeCleaningImage from '../../imgs/home-cleaning.jpg';
import hospitalCleaningImage from '../../imgs/hospital-cleaning.jpg';
import acServiceImage from '../../imgs/AC-Service.jpg';
import waterTankCleaningImage from '../../imgs/watertankcleaning.jpg';
import swimmingPoolCleaningImage from '../../imgs/swimming-pool-cleaning.jpg';
import glassMirrorCleaningImage from '../../imgs/glassandmirrorcleaning.jpg';
import rooftopSkylightCleaningImage from '../../imgs/rooftop-skylight-cleaning.jpeg';
import weldingServicesImage from '../../imgs/welding-services.jpg';
import paintServicesImage from '../../imgs/paintservices.jpg';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | undefined>();

  const services = [
    {
      icon: Droplets,
      title: 'Gutter Cleaning',
      description: 'Professional gutter cleaning and maintenance for rainwater drainage.',
      image: gutterCleaningImage,
    },
    {
      icon: Home,
      title: 'Home Cleaning',
      description: 'Complete home cleaning services including deep cleaning and sanitization.',
      image: homeCleaningImage,
    },
    {
      icon: Hospital,
      title: 'Hospital Cleaning',
      description: 'Specialized hospital and medical facility cleaning with strict hygiene standards.',
      image: hospitalCleaningImage,
    },
    {
      icon: Wind,
      title: 'AC Services',
      description: 'AC installation, repair, maintenance, and cleaning services.',
      image: acServiceImage,
    },
    {
      icon: Droplet,
      title: 'Water Tank Cleaning',
      description: 'Thorough water tank cleaning and disinfection for safe water supply.',
      image: waterTankCleaningImage,
    },
    {
      icon: Waves,
      title: 'Swimming Pool Cleaning',
      description: 'Complete pool cleaning, chemical balancing, and maintenance.',
      image: swimmingPoolCleaningImage,
    },
    {
      icon: Sparkles,
      title: 'Glass & Mirror Cleaning',
      description: 'Streak-free cleaning of windows, glass facades, and mirrors.',
      image: glassMirrorCleaningImage,
    },
    {
      icon: Sun,
      title: 'Rooftop Skylight Cleaning',
      description: 'Safe and efficient cleaning of rooftop skylights and glass structures.',
      image: rooftopSkylightCleaningImage,
    },
    {
      icon: Wrench,
      title: 'Welding Services',
      description: 'Professional welding and metalwork for gates, grills, and structures.',
      image: weldingServicesImage,
    },
    {
      icon: PaintBucket,
      title: 'Paint Services',
      description: 'Interior and exterior painting with quality materials and finish.',
      image: paintServicesImage,
    },
  ];

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
            {services.map((service) => (
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

      <footer id="contact" className="bg-primary text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="mb-4 text-lg sm:text-xl font-bold">
                GO GUTTER
              </h3>
              <p className="text-primary-foreground/80 text-sm">
                Professional cleaning and maintenance services for homes, hospitals, and commercial spaces across Pakistan.
              </p>
            </div>

            <div>
              <h4 className="mb-4 text-base font-semibold">
                Contact Us
              </h4>
              <div className="space-y-3">
                <a
                  href="tel:+923407776585"
                  className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                >
                  <Phone size={16} />
                  +92 340 7776585
                </a>
                <a
                  href="mailto:h36505311@gmail.com"
                  className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                >
                  <Mail size={16} />
                  h36505311@gmail.com
                </a>
                <a
                  href="https://wa.me/923053283513"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                >
                  <MessageCircle size={16} />
                  WhatsApp
                </a>
              </div>
            </div>

          </div>

          <div className="border-t border-primary-foreground/20 pt-8 text-center">
            <p className="text-primary-foreground/60 text-sm">
              © 2026 GO GUTTER. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        selectedService={selectedService}
      />
    </div>
  );
}