import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { z } from 'zod';
import crypto from 'crypto';

dotenv.config();

const app = express();

const TRUST_PROXY = process.env.TRUST_PROXY ?? '1';
const trustProxyValue = TRUST_PROXY === 'true' ? true : TRUST_PROXY === 'false' ? false : Number(TRUST_PROXY) || 0;
app.set('trust proxy', trustProxyValue);
app.disable('x-powered-by');

const PORT = Number(process.env.PORT) || 3001;
const WHATSAPP_NUMBER = process.env.WHATSAPP_NUMBER || '';
const HCAPTCHA_SECRET = process.env.HCAPTCHA_SECRET || '';
const HCAPTCHA_REQUIRED = process.env.HCAPTCHA_REQUIRED !== 'false';
const BOOKING_TOKEN_SECRET = process.env.BOOKING_TOKEN_SECRET || '';
const BOOKING_TOKEN_TTL_MS = Number(process.env.BOOKING_TOKEN_TTL_MS) || 5 * 60 * 1000;
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || 'https://gogutter.vercel.app')
  .split(',')
  .map((value) => value.trim())
  .filter(Boolean);

const captchaReplayStore = new Map();
const tokenReplayStore = new Map();

const hashIp = (ip) => crypto.createHash('sha256').update(String(ip || '')).digest('hex');

const base64urlEncode = (value) => Buffer.from(value).toString('base64url');
const base64urlDecode = (value) => Buffer.from(value, 'base64url').toString('utf8');

const hmacSignature = (value) => {
  return crypto.createHmac('sha256', BOOKING_TOKEN_SECRET).update(value).digest('base64url');
};

const markReplay = (store, key, ttlMs) => {
  const now = Date.now();
  for (const [storedKey, expiresAt] of store) {
    if (expiresAt <= now) store.delete(storedKey);
  }

  const existing = store.get(key);
  if (existing && existing > now) {
    return true;
  }

  store.set(key, now + ttlMs);
  return false;
};

const SERVICE_IDS = [
  'home-cleaning',
  'ac-services',
  'watertank-cleaning',
  'swimming-pool-cleaning',
  'welding-services',
  'paint-services',
  'gutter-cleaning',
  'hospital-cleaning',
  'glass-mirror-cleaning',
  'rooftop-skylight-cleaning',
];

const SERVICE_LABELS = {
  'home-cleaning': 'Home Cleaning',
  'ac-services': 'AC Services',
  'watertank-cleaning': 'Water Tank Cleaning',
  'swimming-pool-cleaning': 'Swimming Pool Cleaning',
  'welding-services': 'Welding Services',
  'paint-services': 'Paint Services',
  'gutter-cleaning': 'Gutter Cleaning',
  'hospital-cleaning': 'Hospital Cleaning',
  'glass-mirror-cleaning': 'Glass & Mirror Cleaning',
  'rooftop-skylight-cleaning': 'Rooftop Skylight Cleaning',
};

const CITY_ALLOWLIST = ['Rawalpindi / Islamabad', 'Murree', 'Peshawar'];
const TOWNS_BY_CITY = {
  'Rawalpindi / Islamabad': [
    'DHA Phase 1',
    'DHA Phase 2',
    'DHA Phase 3',
    'DHA Phase 4',
    'DHA Phase 5',
    'Bahria Phase 1',
    'Bahria Phase 2',
    'Bahria Phase 3',
    'Bahria Phase 4',
    'Bahria Phase 5',
    'Bahria Phase 6',
    'Bahria Phase 7',
    'Bahria Phase 8',
    'PWD Housing Society',
    'Ghouri Town',
    'Gulrez',
    'Gulberg Greens',
    'Adyala Road',
    'Other (if area not in list)',
  ],
  Murree: [],
  Peshawar: [],
};

const BookingSchema = z
  .object({
  serviceId: z.enum(SERVICE_IDS),
    city: z.enum(CITY_ALLOWLIST),
    town: z.string().max(80).optional().or(z.literal('')),
  fullAddress: z.string().min(5).max(160),
  name: z.string().min(2).max(60),
  phone: z.string().regex(/^\+?\d{10,15}$/),
  issueDetails: z.string().max(200).optional().or(z.literal('')),
  captchaToken: z.string().min(1),
  deviceFingerprint: z.string().max(128).optional().or(z.literal('')),
  })
  .refine((data) => {
    if (!data.town) return true;
    const towns = TOWNS_BY_CITY[data.city] || [];
    return towns.includes(data.town);
  }, { message: 'Invalid town for selected city', path: ['town'] });

const sanitizeText = (value, maxLength) => {
  return value
    .replace(/[\r\n]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
};

const sanitizeOptional = (value, maxLength) => {
  if (!value) return '';
  return sanitizeText(value, maxLength);
};

const buildMessage = (payload) => {
  const safeName = sanitizeText(payload.name, 60);
  const safePhone = sanitizeText(payload.phone, 20);
  const safeAddress = sanitizeText(payload.fullAddress, 160);
  const safeIssue = sanitizeOptional(payload.issueDetails, 200);
  const safeTown = sanitizeOptional(payload.town, 80);

  return [
    'Hello Go Gutter,',
    `Service: ${SERVICE_LABELS[payload.serviceId] || payload.serviceId}`,
    `Location: ${payload.city}${safeTown ? ` - ${safeTown}` : ''}`,
    `Complete Location: ${safeAddress}`,
    `Name: ${safeName}`,
    `Phone: ${safePhone}`,
    safeIssue ? `Issue Details: ${safeIssue}` : null,
    'Please contact me.',
  ]
    .filter(Boolean)
    .join('\n');
};

const normalizeWhatsAppNumber = (value) => {
  const digits = String(value || '').replace(/\D/g, '');
  if (!/^\d{10,15}$/.test(digits)) return '';
  return digits;
};

const safeLogValue = (value) => String(value || '').replace(/[\r\n]+/g, ' ').slice(0, 200);

const verifyCaptcha = async (token, ip) => {
  if (!HCAPTCHA_REQUIRED) return true;
  if (!HCAPTCHA_SECRET) return false;

  const params = new URLSearchParams({
    secret: HCAPTCHA_SECRET,
    response: token,
    remoteip: ip || '',
  });

  const response = await fetch('https://hcaptcha.com/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  });

  if (!response.ok) return false;
  const data = await response.json();
  if (!data.success) return false;

  if (data['challenge_ts']) {
    const challengeTime = Date.parse(data['challenge_ts']);
    if (!Number.isFinite(challengeTime)) return false;
    if (Date.now() - challengeTime > 2 * 60 * 1000) return false;
  }

  const replayKey = `captcha:${token}`;
  if (markReplay(captchaReplayStore, replayKey, 5 * 60 * 1000)) {
    return false;
  }

  return true;
};

app.use(express.json({ limit: '10kb' }));
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'none'"],
        frameAncestors: ["'none'"],
        baseUri: ["'none'"],
        formAction: ["'none'"],
      },
    },
  })
);

const originAllowlist = new Set(ALLOWED_ORIGINS);
const ALLOW_NO_ORIGIN = process.env.ALLOW_NO_ORIGIN === 'true' || process.env.NODE_ENV !== 'production';
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        if (ALLOW_NO_ORIGIN) return callback(null, true);
        return callback(null, true); // Allow requests without origin header
      }
      if (!originAllowlist.has(origin)) {
        return callback(new Error('Origin not allowed by CORS'), false);
      }
      return callback(null, true);
    },
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'x-booking-token'],
    maxAge: 600,
  })
);

const limiter = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: Number(process.env.RATE_LIMIT_MAX) || 30,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    const fingerprint = typeof req.body?.deviceFingerprint === 'string' ? req.body.deviceFingerprint : 'unknown';
    return `${hashIp(req.ip)}:${fingerprint}`;
  },
});

app.use(limiter);

app.get('/api/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.get('/api/booking-token', (req, res) => {
  if (!BOOKING_TOKEN_SECRET) {
    return res.status(500).json({ message: 'Booking token secret is not configured.' });
  }

  const tokenId = crypto.randomUUID();
  const issuedAt = Date.now();
  const payload = JSON.stringify({ tokenId, issuedAt });
  const signature = hmacSignature(payload);
  const token = `${base64urlEncode(payload)}.${signature}`;

  return res.status(200).json({ token, issuedAt });
});

app.post('/api/bookings', async (req, res) => {
  const bookingToken = req.header('x-booking-token') || '';
  if (!BOOKING_TOKEN_SECRET || !bookingToken) {
    return res.status(401).json({ message: 'Missing booking token.' });
  }

  const [encodedPayload, signature] = bookingToken.split('.');
  if (!encodedPayload || !signature) {
    return res.status(401).json({ message: 'Invalid booking token.' });
  }

  const decodedPayload = base64urlDecode(encodedPayload);
  const expectedSignature = hmacSignature(decodedPayload);
  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
    return res.status(401).json({ message: 'Invalid booking token signature.' });
  }

  let tokenPayload;
  try {
    tokenPayload = JSON.parse(decodedPayload);
  } catch {
    return res.status(401).json({ message: 'Invalid booking token payload.' });
  }

  if (!tokenPayload?.tokenId || !tokenPayload?.issuedAt) {
    return res.status(401).json({ message: 'Invalid booking token contents.' });
  }

  if (Date.now() - Number(tokenPayload.issuedAt) > BOOKING_TOKEN_TTL_MS) {
    return res.status(401).json({ message: 'Booking token expired.' });
  }

  if (!WHATSAPP_NUMBER) {
    return res.status(500).json({ message: 'Missing WhatsApp configuration.' });
  }

  const normalizedWhatsApp = normalizeWhatsAppNumber(WHATSAPP_NUMBER);
  if (!normalizedWhatsApp) {
    return res.status(500).json({ message: 'Invalid WhatsApp configuration.' });
  }

  const parseResult = BookingSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({ message: 'Invalid payload.', errors: parseResult.error.flatten() });
  }

  const payload = parseResult.data;

  const captchaOk = await verifyCaptcha(payload.captchaToken, req.ip);
  if (!captchaOk) {
    return res.status(403).json({ message: 'Captcha verification failed.' });
  }

  if (markReplay(tokenReplayStore, tokenPayload.tokenId, BOOKING_TOKEN_TTL_MS)) {
    return res.status(409).json({ message: 'Duplicate booking request detected.' });
  }

  const bookingId = crypto.randomUUID();
  const message = buildMessage(payload);
  if (message.length > 800) {
    return res.status(400).json({ message: 'Message too long.' });
  }

  const redirectUrl = `https://wa.me/${normalizedWhatsApp}?text=${encodeURIComponent(message)}`;

  console.info('[booking]', {
    bookingId,
    serviceId: safeLogValue(payload.serviceId),
    ip: safeLogValue(hashIp(req.ip)),
  });

  return res.status(200).json({ bookingId, redirectUrl });
});

app.use((err, _req, res, _next) => {
  console.error('[error]', err);
  res.status(500).json({ message: 'Unexpected server error.' });
});

app.listen(PORT, () => {
  console.info(`Booking API listening on ${PORT}`);
});
