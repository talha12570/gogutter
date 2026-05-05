import type { LucideIcon } from 'lucide-react';
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
  Pipette,
  Factory,
  School,
  Zap,
  Refrigerator,
} from 'lucide-react';
import gutterCleaningImage from '../../../imgs/gutter-cleaning.jpg';
import homeCleaningImage from '../../../imgs/home-cleaning.jpg';
import hospitalCleaningImage from '../../../imgs/hospital-cleaning.jpg';
import acServiceImage from '../../../imgs/AC-Service.jpg';
import waterTankCleaningImage from '../../../imgs/watertankcleaning.jpg';
import swimmingPoolCleaningImage from '../../../imgs/swimming-pool-cleaning.jpg';
import glassMirrorCleaningImage from '../../../imgs/glassandmirrorcleaning.jpg';
import rooftopSkylightCleaningImage from '../../../imgs/rooftop-skylight-cleaning.jpeg';
import weldingServicesImage from '../../../imgs/welding-services.jpg';
import paintServicesImage from '../../../imgs/paintservices.jpg';
import sewageCleaningImage from '../../../imgs/sewage.jpg';
import factoryGutterImage from '../../../imgs/gutter-cleaning.jpg';
import schoolGutterImage from '../../../imgs/school gutter & general cleaning.png';
import gutterMotorImage from '../../../imgs/guttermotor.jpg';
import electronicsRepairingImage from '../../../imgs/electronics repairing.jpg';

export type CategoryId =
  | 'home-cleaning'
  | 'ac-services'
  | 'watertank-cleaning'
  | 'swimming-pool-cleaning'
  | 'welding-services'
  | 'paint-services'
  | 'gutter-cleaning'
  | 'hospital-cleaning'
  | 'glass-mirror-cleaning'
  | 'rooftop-skylight-cleaning'
  | 'sewage-cleaning'
  | 'factory-gutter-cleaning'
  | 'school-gutter-general-cleaning'
  | 'gutter-electronic-motor-repairing'
  | 'fridge-oven-ac-electronics-repairing';

export type ServiceItem = {
  title: string;
  categoryId: CategoryId;
  description: string;
  icon: LucideIcon;
  image: string;
  hasAds: boolean;
  isCoreService?: boolean;
};

export const SERVICES: ServiceItem[] = [
  // ── Core services in client-specified order ──────────────────────────────
  {
    title: 'Gutter Cleaning',
    categoryId: 'gutter-cleaning',
    description: 'Professional gutter cleaning and maintenance for rainwater drainage systems.',
    icon: Droplets,
    image: gutterCleaningImage,
    hasAds: false,
    isCoreService: true,
  },
  {
    title: 'Sewage Cleaning',
    categoryId: 'sewage-cleaning',
    description: 'Expert sewage line cleaning, unblocking, and maintenance for homes and commercial properties.',
    icon: Pipette,
    image: sewageCleaningImage,
    hasAds: false,
    isCoreService: true,
  },
  {
    title: 'Water Tank Cleaning',
    categoryId: 'watertank-cleaning',
    description: 'Thorough water tank cleaning and disinfection for safe, clean water supply.',
    icon: Droplet,
    image: waterTankCleaningImage,
    hasAds: true,
    isCoreService: true,
  },
  {
    title: 'Factory Gutter Cleaning',
    categoryId: 'factory-gutter-cleaning',
    description: 'Industrial-grade gutter and drainage cleaning for factories, warehouses, and large facilities.',
    icon: Factory,
    image: factoryGutterImage,
    hasAds: false,
    isCoreService: true,
  },
  {
    title: 'School Gutter & General Cleaning',
    categoryId: 'school-gutter-general-cleaning',
    description: 'Comprehensive gutter, corridor, and general cleaning services tailored for schools and educational institutions.',
    icon: School,
    image: schoolGutterImage,
    hasAds: false,
    isCoreService: true,
  },
  {
    title: 'Hospital Cleaning',
    categoryId: 'hospital-cleaning',
    description: 'Specialized hospital and medical facility cleaning with strict hygiene and sanitization standards.',
    icon: Hospital,
    image: hospitalCleaningImage,
    hasAds: false,
    isCoreService: true,
  },

  // ── Additional services ──────────────────────────────────────────────────
  {
    title: 'Home Cleaning',
    categoryId: 'home-cleaning',
    description: 'Complete home cleaning services including deep cleaning and sanitization.',
    icon: Home,
    image: homeCleaningImage,
    hasAds: true,
  },
  {
    title: 'AC Services',
    categoryId: 'ac-services',
    description: 'AC installation, repair, maintenance, and cleaning services.',
    icon: Wind,
    image: acServiceImage,
    hasAds: true,
  },
  {
    title: 'Swimming Pool Cleaning',
    categoryId: 'swimming-pool-cleaning',
    description: 'Complete pool cleaning, chemical balancing, and maintenance.',
    icon: Waves,
    image: swimmingPoolCleaningImage,
    hasAds: true,
  },
  {
    title: 'Glass & Mirror Cleaning',
    categoryId: 'glass-mirror-cleaning',
    description: 'Streak-free cleaning of windows, glass facades, and mirrors.',
    icon: Sparkles,
    image: glassMirrorCleaningImage,
    hasAds: false,
  },
  {
    title: 'Rooftop Skylight Cleaning',
    categoryId: 'rooftop-skylight-cleaning',
    description: 'Safe and efficient cleaning of rooftop skylights and glass structures.',
    icon: Sun,
    image: rooftopSkylightCleaningImage,
    hasAds: false,
  },
  {
    title: 'Welding Services',
    categoryId: 'welding-services',
    description: 'Professional welding and metalwork for gates, grills, and structures.',
    icon: Wrench,
    image: weldingServicesImage,
    hasAds: true,
  },
  {
    title: 'Paint Services',
    categoryId: 'paint-services',
    description: 'Interior and exterior painting with quality materials and finish.',
    icon: PaintBucket,
    image: paintServicesImage,
    hasAds: true,
  },
  {
    title: 'Gutter & Electronic Motor Repairing',
    categoryId: 'gutter-electronic-motor-repairing',
    description: 'Expert repair and servicing of gutter motors, electronic pumps, and water drainage motor systems.',
    icon: Zap,
    image: gutterMotorImage,
    hasAds: false,
  },
  {
    title: 'Fridge, Oven, AC & General Electronics Repairing',
    categoryId: 'fridge-oven-ac-electronics-repairing',
    description: 'Reliable repair services for fridges, ovens, air conditioners, and all household electronic appliances.',
    icon: Refrigerator,
    image: electronicsRepairingImage,
    hasAds: false,
  },
];

export const SERVICE_CATEGORY_MAP = SERVICES.reduce<Record<string, CategoryId>>((acc, service) => {
  acc[service.title] = service.categoryId;
  return acc;
}, {});

export const SERVICE_BY_CATEGORY = SERVICES.reduce<Record<CategoryId, ServiceItem>>((acc, service) => {
  acc[service.categoryId] = service;
  return acc;
}, {} as Record<CategoryId, ServiceItem>);

export const SERVICE_BY_TITLE = SERVICES.reduce<Record<string, ServiceItem>>((acc, service) => {
  acc[service.title] = service;
  return acc;
}, {});

export const CORE_SERVICES = SERVICES.filter((s) => s.isCoreService);
