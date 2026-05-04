export type CityItem = {
  name: string;
  slug: string;
  regionLabel: string;
  description: string;
};

export const CITIES: CityItem[] = [
  {
    name: 'Islamabad',
    slug: 'islamabad',
    regionLabel: 'Islamabad & Rawalpindi',
    description: 'Serving residential and commercial clients across Islamabad and Rawalpindi.',
  },
  {
    name: 'Rawalpindi',
    slug: 'rawalpindi',
    regionLabel: 'Islamabad & Rawalpindi',
    description: 'Trusted service coverage across Rawalpindi and surrounding areas.',
  },
  {
    name: 'Peshawar',
    slug: 'peshawar',
    regionLabel: 'Peshawar',
    description: 'Reliable maintenance and cleaning solutions for Peshawar.',
  },
  {
    name: 'Murree',
    slug: 'murree',
    regionLabel: 'Murree',
    description: 'Professional services for homes and businesses in Murree.',
  },
];

export const CITY_BY_SLUG = CITIES.reduce<Record<string, CityItem>>((acc, city) => {
  acc[city.slug] = city;
  return acc;
}, {});
