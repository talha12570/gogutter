import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BookingModal } from '../components/BookingModal';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Seo } from '../components/Seo';
import { CITIES, CITY_BY_SLUG } from '../data/seoData';
import { SERVICE_BY_CATEGORY, SERVICES, type CategoryId } from '../data/servicesData';
import { NotFound } from './NotFound';

const buildServiceKeywords = (serviceTitle: string, cityName: string) => {
  const base = serviceTitle.toLowerCase();
  const primary = `${serviceTitle} in ${cityName}`;
  const secondary = [
    `professional ${base} ${cityName}`,
    `affordable ${base} ${cityName}`,
    `best ${base} in ${cityName}`,
  ];
  const longTail = [
    `best ${base} service in ${cityName}`,
    `emergency ${base} near me`,
  ];

  return { primary, secondary, longTail };
};

const getCityFromSlug = (slug?: string) => {
  if (!slug) return null;
  return CITY_BY_SLUG[slug] || null;
};

const parseServiceCity = (slug?: string) => {
  if (!slug) return null;
  const cityMatch = CITIES.find((city) => slug.endsWith(`-${city.slug}`));
  if (!cityMatch) return null;
  const serviceSlug = slug.slice(0, -(cityMatch.slug.length + 1));
  const service = SERVICE_BY_CATEGORY[serviceSlug as CategoryId];
  if (!service) return null;
  return { service, city: cityMatch };
};

export function SeoPage() {
  const { slug } = useParams();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | undefined>();

  const city = useMemo(() => getCityFromSlug(slug), [slug]);
  const serviceCity = useMemo(() => parseServiceCity(slug), [slug]);

  const handleBookNow = () => {
    setSelectedService(undefined);
    setIsBookingOpen(true);
  };

  const handleServiceSelect = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    setIsBookingOpen(true);
  };

  if (!city && !serviceCity) {
    return <NotFound />;
  }

  if (city) {
    const title = `Cleaning & Maintenance Services in ${city.name} | GoGutter`;
    const description = `Professional cleaning and maintenance services in ${city.regionLabel}. Explore home, AC, gutter, and specialty services tailored for ${city.name}.`;
    const keywords = SERVICES.map((service) => `${service.title} ${city.name}`).join(', ');

    return (
      <div className="min-h-screen bg-background">
        <Seo title={title} description={description} canonicalPath={`/${city.slug}`} keywords={keywords} />
        <Header onBookNowClick={handleBookNow} />

        <section className="py-16 md:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-sm text-muted-foreground mb-3">GoGutter City Services</p>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
              Cleaning & Maintenance Services in {city.name}
            </h1>
            <p className="text-muted-foreground mb-6 text-base sm:text-lg">
              {city.description} We deliver professional, affordable, and reliable services across {city.regionLabel}.
            </p>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICES.map((service) => (
                <div key={service.categoryId} className="border border-border rounded-xl p-5 bg-white">
                  <Link
                    to={`/${service.categoryId}-${city.slug}`}
                    className="text-base font-semibold text-foreground hover:text-primary transition-colors"
                  >
                    {service.title} in {city.name}
                  </Link>
                  <p className="text-sm text-muted-foreground mt-2">
                    Professional {service.title.toLowerCase()} services for homes and businesses in {city.name}.
                  </p>
                  <div className="mt-4 flex gap-3">
                    <Link
                      to={`/${service.categoryId}-${city.slug}`}
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      View details
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleServiceSelect(service.title)}
                      className="text-sm font-medium text-accent hover:underline"
                    >
                      Book now
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/#contact"
                className="inline-flex items-center justify-center bg-accent text-accent-foreground px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
              >
                Contact GoGutter
              </Link>
              <a
                href="https://wa.me/923053283513"
                className="inline-flex items-center justify-center bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp Us
              </a>
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

  if (!serviceCity) return <NotFound />;

  const { service, city: serviceCityInfo } = serviceCity;
  const keywords = buildServiceKeywords(service.title, serviceCityInfo.name);
  const title = `${service.title} in ${serviceCityInfo.name} | GoGutter`;
  const description = `Professional ${service.title.toLowerCase()} in ${serviceCityInfo.name}. Affordable, reliable, and fast service across ${serviceCityInfo.regionLabel}.`;

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title={title}
        description={description}
        canonicalPath={`/${service.categoryId}-${serviceCityInfo.slug}`}
        keywords={[keywords.primary, ...keywords.secondary, ...keywords.longTail].join(', ')}
      />
      <Header onBookNowClick={handleBookNow} />

      <section className="py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-muted-foreground mb-3">GoGutter {serviceCityInfo.name}</p>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">{keywords.primary}</h1>
          <p className="text-muted-foreground mb-6 text-base sm:text-lg">
            We deliver professional, affordable, and reliable {service.title.toLowerCase()} services in {serviceCityInfo.regionLabel}.
          </p>

          <div className="bg-white border border-border rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold mb-3">Why GoGutter?</h2>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>Professional {service.title.toLowerCase()} teams for {serviceCityInfo.name}</li>
              <li>Affordable service plans with transparent pricing</li>
              <li>Fast response times and reliable scheduling</li>
              <li>Local experts serving {serviceCityInfo.regionLabel}</li>
            </ul>
          </div>

          <div className="flex flex-wrap gap-3 mb-10">
            <button
              type="button"
              onClick={() => handleServiceSelect(service.title)}
              className="inline-flex items-center justify-center bg-accent text-accent-foreground px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
            >
              Book {service.title}
            </button>
            <a
              href="https://wa.me/923053283513"
              className="inline-flex items-center justify-center bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp Us
            </a>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3">Popular searches in {serviceCityInfo.name}</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>{keywords.secondary[0]}</li>
              <li>{keywords.secondary[1]}</li>
              <li>{keywords.secondary[2]}</li>
              <li>{keywords.longTail[0]}</li>
              <li>{keywords.longTail[1]}</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Explore other services in {serviceCityInfo.name}</h3>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICES.map((item) => (
                <Link
                  key={item.categoryId}
                  to={`/${item.categoryId}-${serviceCityInfo.slug}`}
                  className="border border-border rounded-lg p-4 text-sm font-medium hover:border-primary hover:text-primary transition-colors"
                >
                  {item.title} in {serviceCityInfo.name}
                </Link>
              ))}
            </div>
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
