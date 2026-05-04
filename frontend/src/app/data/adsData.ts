import acServiceAd from '../../assets/ads/acservicead.mp4';
import homeCleaningAd from '../../assets/ads/homecleaningad.mp4';
import paintAd from '../../assets/ads/paintad.mp4';
import poolCleaningAd from '../../assets/ads/poolcleaningad.mp4';
import waterTankCleaningAd from '../../assets/ads/Watertankcleaningad.mp4';
import weldingAd from '../../assets/ads/weldingad.mp4';
import type { CategoryId } from './servicesData';

export type AdItem = {
  id: number;
  title: string;
  categoryId: CategoryId;
  image: string;
};

export const ADS: AdItem[] = [
  { id: 1, title: 'Home Cleaning Promo', categoryId: 'home-cleaning', image: homeCleaningAd },
  { id: 2, title: 'AC Services Offer', categoryId: 'ac-services', image: acServiceAd },
  { id: 3, title: 'Water Tank Cleaning', categoryId: 'watertank-cleaning', image: waterTankCleaningAd },
  { id: 4, title: 'Pool Cleaning', categoryId: 'swimming-pool-cleaning', image: poolCleaningAd },
  { id: 5, title: 'Welding Deal', categoryId: 'welding-services', image: weldingAd },
  { id: 6, title: 'Paint Services', categoryId: 'paint-services', image: paintAd },
];
