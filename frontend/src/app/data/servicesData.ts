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
  | 'rooftop-skylight-cleaning';

export type ServiceItem = {
  title: string;
  categoryId: CategoryId;
  description: string;
  icon: LucideIcon;
  image: string;
  hasAds: boolean;
};

export const SERVICES: ServiceItem[] = [
  {
    title: 'Gutter Cleaning',
    categoryId: 'gutter-cleaning',
    description: 'Professional gutter cleaning and maintenance for rainwater drainage.',
    icon: Droplets,
    image: gutterCleaningImage,
    hasAds: false,
  },
  {
    title: 'Home Cleaning',
    categoryId: 'home-cleaning',
    description: 'Complete home cleaning services including deep cleaning and sanitization.',
    icon: Home,
    image: homeCleaningImage,
    hasAds: true,
  },
  {
    title: 'Hospital Cleaning',
    categoryId: 'hospital-cleaning',
    description: 'Specialized hospital and medical facility cleaning with strict hygiene standards.',
    icon: Hospital,
    image: hospitalCleaningImage,
    hasAds: false,
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
    title: 'Water Tank Cleaning',
    categoryId: 'watertank-cleaning',
    description: 'Thorough water tank cleaning and disinfection for safe water supply.',
    icon: Droplet,
    image: waterTankCleaningImage,
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
