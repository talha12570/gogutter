import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import logo from '../../../imgs/logo.jpeg';

interface HeaderProps {
  onBookNowClick: () => void;
}

export function Header({ onBookNowClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
      return;
    }
    window.location.assign(`/#${id}`);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="Go Gutter logo"
              className="h-8 w-12 sm:h-9 sm:w-14 object-contain"
            />
            <h1 className="text-primary text-lg sm:text-xl font-bold tracking-wide">
              GO GUTTER
            </h1>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('home')} className="text-foreground hover:text-primary transition-colors">
              Home
            </button>
            <button onClick={() => scrollToSection('services')} className="text-foreground hover:text-primary transition-colors">
              Services
            </button>
            <button onClick={() => scrollToSection('locations')} className="text-foreground hover:text-primary transition-colors">
              Locations
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-foreground hover:text-primary transition-colors">
              Contact
            </button>
            <button
              onClick={onBookNowClick}
              className="bg-accent text-accent-foreground px-6 py-2.5 rounded-lg hover:opacity-90 transition-opacity"
            >
              Book Now
            </button>
          </nav>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-4">
              <button onClick={() => scrollToSection('home')} className="text-left text-foreground hover:text-primary transition-colors">
                Home
              </button>
              <button onClick={() => scrollToSection('services')} className="text-left text-foreground hover:text-primary transition-colors">
                Services
              </button>
              <button onClick={() => scrollToSection('locations')} className="text-left text-foreground hover:text-primary transition-colors">
                Locations
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-left text-foreground hover:text-primary transition-colors">
                Contact
              </button>
              <button
                onClick={() => {
                  onBookNowClick();
                  setMobileMenuOpen(false);
                }}
                className="bg-accent text-accent-foreground px-6 py-2.5 rounded-lg hover:opacity-90 transition-opacity text-center"
              >
                Book Now
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
