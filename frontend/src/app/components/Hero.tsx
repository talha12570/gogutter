import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onBookNowClick: () => void;
}

export function Hero({ onBookNowClick }: HeroProps) {
  return (
    <section id="home" className="bg-gradient-to-br from-primary via-primary to-secondary py-16 sm:py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-white mb-6 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
          Professional Cleaning & Maintenance Services
          <br />
          <span className="text-secondary">in Islamabad & Rawalpindi</span>
        </h1>
        <p className="text-white/90 mb-8 max-w-2xl mx-auto text-base sm:text-lg">
          Fast, reliable, and affordable solutions for homes, hospitals, and commercial spaces.
        </p>
        <button
          onClick={onBookNowClick}
          className="bg-accent text-accent-foreground px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:opacity-90 transition-opacity inline-flex items-center gap-2 shadow-lg text-base sm:text-lg font-semibold"
        >
          Book a Service
          <ArrowRight size={20} />
        </button>
      </div>
    </section>
  );
}
