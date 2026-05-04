import HCaptcha from '@hcaptcha/react-hcaptcha';
import { X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { ADS } from '../data/adsData';
import { SERVICE_CATEGORY_MAP, SERVICES, type CategoryId } from '../data/servicesData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedService?: string;
}

const services = SERVICES.map((service) => service.title);

const cities = [
  'Rawalpindi / Islamabad',
  'Murree',
  'Peshawar',
];

const townsByCity: Record<string, string[]> = {
  'Rawalpindi / Islamabad': [
    'DHA Phase 1', 'DHA Phase 2', 'DHA Phase 3', 'DHA Phase 4', 'DHA Phase 5',
    'Bahria Phase 1', 'Bahria Phase 2', 'Bahria Phase 3', 'Bahria Phase 4',
    'Bahria Phase 5', 'Bahria Phase 6', 'Bahria Phase 7', 'Bahria Phase 8',
    'PWD Housing Society', 'Ghouri Town', 'Gulrez', 'Gulberg Greens',
    'Adyala Road', 'Other (if area not in list)',
  ],
  'Murree': [],
  'Peshawar': [],
};

const categoryIdSet = new Set(SERVICES.map((service) => service.categoryId));

const normalizeService = (value: string): CategoryId | null => {
  const directMatch = SERVICE_CATEGORY_MAP[value];
  if (directMatch) return directMatch;

  const slug = value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-+|-+$)/g, '');

  if (categoryIdSet.has(slug as CategoryId)) {
    return slug as CategoryId;
  }

  return null;
};

export function BookingModal({ isOpen, onClose, selectedService }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [service, setService] = useState(selectedService || '');
  const [city, setCity] = useState('');
  const [town, setTown] = useState('');
  const [fullAddress, setFullAddress] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [captchaToken, setCaptchaToken] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [deviceFingerprint, setDeviceFingerprint] = useState('');

  const selectedCategory = normalizeService(service);
  const filteredAds = useMemo(
    () => (selectedCategory ? ADS.filter((ad) => ad.categoryId === selectedCategory) : []),
    [selectedCategory]
  );
  const captchaSiteKey = import.meta.env.VITE_HCAPTCHA_SITE_KEY as string | undefined;
  const apiBase = (import.meta.env.VITE_API_URL as string | undefined) || '';

  useEffect(() => {
    if (isOpen) {
      setService(selectedService || '');
    }
  }, [isOpen, selectedService]);

  useEffect(() => {
    if (import.meta.env.DEV && service) {
      console.log('[Ads] selectedService:', service);
      console.log('[Ads] selectedCategory:', selectedCategory);
      console.log('[Ads] filteredAds:', filteredAds);
    }
  }, [service, selectedCategory, filteredAds]);

  useEffect(() => {
    if (!import.meta.env.DEV) return;
    const invalidAds = ADS.filter((ad) => !ad.categoryId);
    if (invalidAds.length > 0) {
      console.warn('[Ads] Invalid ads missing categoryId:', invalidAds);
    }
  }, []);

  useEffect(() => {
    const seed = `${navigator.userAgent}|${navigator.language}|${window.screen.width}x${window.screen.height}|${window.screen.colorDepth}`;
    if (window.crypto?.subtle) {
      const encoder = new TextEncoder();
      window.crypto.subtle
        .digest('SHA-256', encoder.encode(seed))
        .then((hash) => {
          const bytes = Array.from(new Uint8Array(hash));
          const hex = bytes.map((byte) => byte.toString(16).padStart(2, '0')).join('');
          setDeviceFingerprint(hex.slice(0, 64));
        })
        .catch(() => {
          setDeviceFingerprint(btoa(seed).slice(0, 64));
        });
    } else {
      setDeviceFingerprint(btoa(seed).slice(0, 64));
    }
  }, []);

  if (!isOpen) return null;

  const handleNext = () => {
    if (step === 1 && service) {
      setStep(2);
    } else if (step === 2 && city) {
      const towns = townsByCity[city];
      if (towns && towns.length > 0) {
        setStep(3);
      } else {
        setTown('');
        setStep(4);
      }
    } else if (step === 3 && (town || townsByCity[city]?.length === 0)) {
      setStep(4);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!selectedCategory) {
      setSubmitError('Please select a valid service.');
      return;
    }

    if (!captchaSiteKey) {
      setSubmitError('Captcha is not configured.');
      return;
    }

    if (!captchaToken) {
      setSubmitError('Please complete the captcha verification.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${apiBase}/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceId: selectedCategory,
          city,
          town,
          fullAddress,
          name,
          phone,
          issueDetails: notes,
          captchaToken,
          deviceFingerprint,
        }),
      });

      const data = await response.json().catch(() => null);
      if (!response.ok) {
        setSubmitError(data?.message || 'Booking failed. Please try again.');
        return;
      }

      if (data?.redirectUrl) {
        window.open(data.redirectUrl, '_blank', 'noopener,noreferrer');
      }

      setStep(1);
      setService(selectedService || '');
      setCity('');
      setTown('');
      setFullAddress('');
      setName('');
      setPhone('');
      setNotes('');
      setCaptchaToken('');
      onClose();
    } catch (error) {
      setSubmitError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setStep(1);
    setService(selectedService || '');
    setCity('');
    setTown('');
    setFullAddress('');
    setName('');
    setPhone('');
    setNotes('');
    setCaptchaToken('');
    setSubmitError(null);
    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-border p-4 flex justify-between items-center">
          <h2 style={{ fontSize: '20px', fontWeight: '600' }}>Book a Service</h2>
          <button onClick={handleClose} className="p-2 hover:bg-muted rounded-lg transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center flex-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= s ? 'bg-secondary text-white' : 'bg-muted text-muted-foreground'
                  }`}
                  style={{ fontSize: '14px', fontWeight: '600' }}
                >
                  {s}
                </div>
                {s < 4 && (
                  <div className={`flex-1 h-1 mx-2 ${step > s ? 'bg-secondary' : 'bg-muted'}`} />
                )}
              </div>
            ))}
          </div>

          {step === 1 && (
            <div>
              {filteredAds.length > 0 ? (
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground mb-2">Service Highlight</p>
                  {filteredAds.map((ad) => (
                    <video
                      key={ad.id}
                      src={ad.image}
                      className="w-full h-40 object-cover rounded-lg"
                      controls
                      muted
                      playsInline
                    />
                  ))}
                </div>
              ) : (
                <p className="mb-4 text-sm text-muted-foreground">No ads available for this service</p>
              )}
              <h3 className="mb-4" style={{ fontSize: '16px', fontWeight: '600' }}>
                Select Your Service
              </h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {services.map((s) => (
                  <button
                    key={s}
                    onClick={() => setService(s)}
                    className={`w-full text-left p-3 rounded-lg border transition-colors ${
                      service === s
                        ? 'border-secondary bg-secondary/10'
                        : 'border-border hover:border-secondary/50'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <div className="sticky bottom-0 bg-white pt-4">
                <button
                  onClick={handleNext}
                  disabled={!service}
                  className="w-full bg-accent text-accent-foreground py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 className="mb-4" style={{ fontSize: '16px', fontWeight: '600' }}>
                Select Your City
              </h3>
              <div className="space-y-2">
                {cities.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCity(c)}
                    className={`w-full text-left p-3 rounded-lg border transition-colors ${
                      city === c
                        ? 'border-secondary bg-secondary/10'
                        : 'border-border hover:border-secondary/50'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
              <div className="sticky bottom-0 bg-white pt-4">
                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 bg-muted text-foreground py-3 rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={!city}
                    className="flex-1 bg-accent text-accent-foreground py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h3 className="mb-4" style={{ fontSize: '16px', fontWeight: '600' }}>
                Select Your Town
              </h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {townsByCity[city]?.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTown(t)}
                    className={`w-full text-left p-3 rounded-lg border transition-colors ${
                      town === t
                        ? 'border-secondary bg-secondary/10'
                        : 'border-border hover:border-secondary/50'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <div className="sticky bottom-0 bg-white pt-4">
                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 bg-muted text-foreground py-3 rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={!town}
                    className="flex-1 bg-accent text-accent-foreground py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <form onSubmit={handleSubmit}>
              <h3 className="mb-4" style={{ fontSize: '16px', fontWeight: '600' }}>
                Enter Your Details
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block mb-2">Name *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full p-3 border border-border rounded-lg bg-input-background"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full p-3 border border-border rounded-lg bg-input-background"
                    placeholder="03XX XXXXXXX"
                  />
                </div>
                <div>
                  <label className="block mb-2">Complete Location *</label>
                  <input
                    type="text"
                    value={fullAddress}
                    onChange={(e) => setFullAddress(e.target.value)}
                    required
                    className="w-full p-3 border border-border rounded-lg bg-input-background"
                    placeholder="House/Street, landmark, nearest road"
                  />
                </div>
                <div>
                  <label className="block mb-2">Issue Details (Optional)</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full p-3 border border-border rounded-lg bg-input-background resize-none"
                    rows={3}
                    placeholder="Describe the problem or requirements..."
                  />
                </div>
                <div>
                  {captchaSiteKey ? (
                    <HCaptcha
                      sitekey={captchaSiteKey}
                      onVerify={(token) => setCaptchaToken(token)}
                      onExpire={() => setCaptchaToken('')}
                      onError={() => setCaptchaToken('')}
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground">Captcha is not configured.</p>
                  )}
                </div>
                {submitError && (
                  <p className="text-sm text-destructive">{submitError}</p>
                )}
                <div className="bg-muted p-4 rounded-lg">
                  <p style={{ fontSize: '14px' }} className="text-muted-foreground mb-2">
                    Summary:
                  </p>
                  <p style={{ fontSize: '14px' }}>
                    <strong>Service:</strong> {service}
                  </p>
                  <p style={{ fontSize: '14px' }}>
                    <strong>Location:</strong> {town ? `${city} - ${town}` : city}
                  </p>
                  <p style={{ fontSize: '14px' }}>
                    <strong>Complete Location:</strong> {fullAddress}
                  </p>
                </div>
              </div>
              <div className="sticky bottom-0 bg-white pt-4">
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      const towns = townsByCity[city];
                      if (towns && towns.length > 0) {
                        setStep(3);
                      } else {
                        setStep(2);
                      }
                    }}
                    className="flex-1 bg-muted text-foreground py-3 rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={!captchaToken || isSubmitting}
                    className="flex-1 bg-secondary text-white py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : 'Send via WhatsApp'}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
