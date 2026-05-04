import { Link } from 'react-router-dom';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Seo } from '../components/Seo';

export function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Page Not Found | GoGutter"
        description="The page you are looking for could not be found."
        canonicalPath="/404"
      />
      <Header onBookNowClick={() => window.location.assign('/#services')} />
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Page Not Found</h1>
          <p className="text-muted-foreground mb-6">
            Please return to the home page or explore our service areas.
          </p>
          <Link
            to="/"
            className="inline-flex items-center justify-center bg-accent text-accent-foreground px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
          >
            Back to Home
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}
