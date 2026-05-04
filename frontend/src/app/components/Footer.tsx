import { Mail, MessageCircle, Phone } from 'lucide-react';

export function Footer() {
  return (
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
  );
}
