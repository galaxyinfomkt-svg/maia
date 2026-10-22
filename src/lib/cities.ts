import { City } from '@/types';
import { neighbours } from './geo';

/* The 109 towns we serve — the same service area as our sister site, so the
   two businesses never describe the map differently. Ordered by distance from
   the Charlton shop.

   `distance` is the straight-line mileage from 13 Stoneybrook Rd, Charlton,
   computed from the coordinates in geo.ts. It is generated, never typed:
   the old file measured from a point near Marlborough while the copy said
   Charlton, which put "5 miles from our Charlton shop" on the Framingham page
   (the real figure is 30). */
export const cities: City[] = [
  { name: 'Charlton', slug: 'charlton', county: 'Worcester', region: 'Metro West', state: 'MA', zip: '01507', distance: 0, isHeadquarters: true },
  { name: 'Oxford', slug: 'oxford', county: 'Worcester', region: 'Worcester Area', state: 'MA', zip: '01540', distance: 6 },
  { name: 'Dudley', slug: 'dudley', county: 'Worcester', region: 'Metro West', state: 'MA', zip: '01571', distance: 7 },
  { name: 'Webster', slug: 'webster', county: 'Worcester', region: 'Worcester Area', state: 'MA', zip: '01570', distance: 7 },
  { name: 'Auburn', slug: 'auburn', county: 'Worcester', region: 'Worcester Area', state: 'MA', zip: '01501', distance: 8 },
  { name: 'Leicester', slug: 'leicester', county: 'Worcester', region: 'Metro West', state: 'MA', zip: '01524', distance: 8 },
  { name: 'Spencer', slug: 'spencer', county: 'Worcester', region: 'Metro West', state: 'MA', zip: '01562', distance: 8 },
  { name: 'Millbury', slug: 'millbury', county: 'Worcester', region: 'Worcester Area', state: 'MA', zip: '01527', distance: 11 },
  { name: 'Sutton', slug: 'sutton', county: 'Worcester', region: 'Worcester Area', state: 'MA', zip: '01590', distance: 11 },
  { name: 'Paxton', slug: 'paxton', county: 'Worcester', region: 'Metro West', state: 'MA', zip: '01612', distance: 12 },
  { name: 'Worcester', slug: 'worcester', county: 'Worcester', region: 'Worcester Area', state: 'MA', zip: '01608', distance: 12 },
  { name: 'Douglas', slug: 'douglas', county: 'Worcester', region: 'Metro West', state: 'MA', zip: '01516', distance: 13 },
  { name: 'Grafton', slug: 'grafton', county: 'Worcester', region: 'Metro West', state: 'MA', zip: '01519', distance: 15 },
  { name: 'Holden', slug: 'holden', county: 'Worcester', region: 'Metro West', state: 'MA', zip: '01520', distance: 16 },
  { name: 'Northbridge', slug: 'northbridge', county: 'Worcester', region: 'Metro West', state: 'MA', zip: '01534', distance: 16 },
  { name: 'Rutland', slug: 'rutland', county: 'Worcester', region: 'Metro West', state: 'MA', zip: '01543', distance: 16 },
  { name: 'Shrewsbury', slug: 'shrewsbury', county: 'Worcester', region: 'Metro West', state: 'MA', zip: '01545', distance: 17 },
  { name: 'Uxbridge', slug: 'uxbridge', county: 'Worcester', region: 'Metro West', state: 'MA', zip: '01569', distance: 18 },
  { name: 'Upton', slug: 'upton', county: 'Worcester', region: 'Metro West', state: 'MA', zip: '01568', distance: 19 },
  { name: 'West Boylston', slug: 'west-boylston', county: 'Worcester', region: 'Metro West', state: 'MA', zip: '01583', distance: 19 },
  { name: 'Westborough', slug: 'westborough', county: 'Worcester', region: 'Metro West', state: 'MA', zip: '01581', distance: 20 },
  { name: 'Mendon', slug: 'mendon', county: 'Worcester', region: 'Metro West', state: 'MA', zip: '01756', distance: 21 },
  { name: 'Northborough', slug: 'northborough', county: 'Worcester', region: 'Metro West', state: 'MA', zip: '01532', distance: 21 },
  { name: 'Hopedale', slug: 'hopedale', county: 'Worcester', region: 'Metro West', state: 'MA', zip: '01747', distance: 22 },
  { name: 'Princeton', slug: 'princeton', county: 'Worcester', region: 'Metro West', state: 'MA', zip: '01541', distance: 22 },
  { name: 'Blackstone', slug: 'blackstone', county: 'Worcester', region: 'Metro West', state: 'MA', zip: '01504', distance: 23 },
  { name: 'Boylston', slug: 'boylston', county: 'Worcester', region: 'Metro West', state: 'MA', zip: '01505', distance: 23 },
  { name: 'Milford', slug: 'milford', county: 'Worcester', region: 'Metro West', state: 'MA', zip: '01757', distance: 23 },
  { name: 'Berlin', slug: 'berlin', county: 'Worcester', region: 'Metro West', state: 'MA', zip: '01503', distance: 24 },
  { name: 'Clinton', slug: 'clinton', county: 'Worcester', region: 'Metro West', state: 'MA', zip: '01510', distance: 24 },
  { name: 'Hopkinton', slug: 'hopkinton', county: 'Middlesex', region: 'Metro West', state: 'MA', zip: '01748', distance: 24 },
  { name: 'Sterling', slug: 'sterling', county: 'Worcester', region: 'Metro West', state: 'MA', zip: '01564', distance: 24 },
  { name: 'Bellingham', slug: 'bellingham', county: 'Norfolk', region: 'Greater Boston', state: 'MA', zip: '02019', distance: 26 },
  { name: 'Marlborough', slug: 'marlborough', county: 'Middlesex', region: 'Metro West', state: 'MA', zip: '01752', distance: 26 },
  { name: 'Southborough', slug: 'southborough', county: 'Worcester', region: 'Metro West', state: 'MA', zip: '01772', distance: 26 },
  { name: 'Ashland', slug: 'ashland', county: 'Middlesex', region: 'Metro West', state: 'MA', zip: '01721', distance: 27 },
  { name: 'Hudson', slug: 'hudson', county: 'Middlesex', region: 'Metro West', state: 'MA', zip: '01749', distance: 27 },
  { name: 'Lancaster', slug: 'lancaster', county: 'Worcester', region: 'Metro West', state: 'MA', zip: '01523', distance: 27 },
  { name: 'Bolton', slug: 'bolton', county: 'Worcester', region: 'Metro West', state: 'MA', zip: '01740', distance: 28 },
  { name: 'Holliston', slug: 'holliston', county: 'Middlesex', region: 'Metro West', state: 'MA', zip: '01746', distance: 28 },
  { name: 'Leominster', slug: 'leominster', county: 'Worcester', region: 'Metro West', state: 'MA', zip: '01453', distance: 29 },
  { name: 'Medway', slug: 'medway', county: 'Norfolk', region: 'Metro West', state: 'MA', zip: '02053', distance: 29 },
  { name: 'Framingham', slug: 'framingham', county: 'Middlesex', region: 'Metro West', state: 'MA', zip: '01701', distance: 30 },
  { name: 'Franklin', slug: 'franklin', county: 'Norfolk', region: 'Greater Boston', state: 'MA', zip: '02038', distance: 30 },
  { name: 'Millis', slug: 'millis', county: 'Norfolk', region: 'Metro West', state: 'MA', zip: '02054', distance: 31 },
  { name: 'Fitchburg', slug: 'fitchburg', county: 'Worcester', region: 'Metro West', state: 'MA', zip: '01420', distance: 32 },
  { name: 'Harvard', slug: 'harvard', county: 'Worcester', region: 'Metro West', state: 'MA', zip: '01451', distance: 32 },
  { name: 'Sherborn', slug: 'sherborn', county: 'Middlesex', region: 'Metro West', state: 'MA', zip: '01770', distance: 32 },
  { name: 'Stow', slug: 'stow', county: 'Middlesex', region: 'Metro West', state: 'MA', zip: '01775', distance: 32 },
  { name: 'Natick', slug: 'natick', county: 'Middlesex', region: 'Metro West', state: 'MA', zip: '01760', distance: 33 },
  { name: 'Norfolk', slug: 'norfolk', county: 'Norfolk', region: 'Metro West', state: 'MA', zip: '02056', distance: 33 },
  { name: 'Shirley', slug: 'shirley', county: 'Middlesex', region: 'Metro West', state: 'MA', zip: '01464', distance: 33 },
  { name: 'Sudbury', slug: 'sudbury', county: 'Middlesex', region: 'Metro West', state: 'MA', zip: '01776', distance: 33 },
  { name: 'Wrentham', slug: 'wrentham', county: 'Norfolk', region: 'Metro West', state: 'MA', zip: '02093', distance: 33 },
  { name: 'Boxborough', slug: 'boxborough', county: 'Middlesex', region: 'Metro West', state: 'MA', zip: '01719', distance: 34 },
  { name: 'Lunenburg', slug: 'lunenburg', county: 'Worcester', region: 'Metro West', state: 'MA', zip: '01462', distance: 34 },
  { name: 'Maynard', slug: 'maynard', county: 'Middlesex', region: 'Metro West', state: 'MA', zip: '01754', distance: 34 },
  { name: 'Medfield', slug: 'medfield', county: 'Norfolk', region: 'Metro West', state: 'MA', zip: '02052', distance: 34 },
  { name: 'Ayer', slug: 'ayer', county: 'Middlesex', region: 'Metro West', state: 'MA', zip: '01432', distance: 35 },
  { name: 'Wayland', slug: 'wayland', county: 'Middlesex', region: 'Metro West', state: 'MA', zip: '01778', distance: 35 },
  { name: 'Dover', slug: 'dover', county: 'Norfolk', region: 'Metro West', state: 'MA', zip: '02030', distance: 36 },
  { name: 'Wellesley', slug: 'wellesley', county: 'Norfolk', region: 'Metro West', state: 'MA', zip: '02481', distance: 36 },
  { name: 'Acton', slug: 'acton', county: 'Middlesex', region: 'Metro West', state: 'MA', zip: '01720', distance: 37 },
  { name: 'Foxborough', slug: 'foxborough', county: 'Norfolk', region: 'South Shore', state: 'MA', zip: '02035', distance: 37 },
  { name: 'Littleton', slug: 'littleton', county: 'Middlesex', region: 'Metro West', state: 'MA', zip: '01460', distance: 37 },
  { name: 'Walpole', slug: 'walpole', county: 'Norfolk', region: 'South Shore', state: 'MA', zip: '02081', distance: 37 },
  { name: 'Weston', slug: 'weston', county: 'Middlesex', region: 'Metro West', state: 'MA', zip: '02493', distance: 38 },
  { name: 'Concord', slug: 'concord', county: 'Middlesex', region: 'Metro West', state: 'MA', zip: '01742', distance: 39 },
  { name: 'Groton', slug: 'groton', county: 'Middlesex', region: 'Metro West', state: 'MA', zip: '01450', distance: 39 },
  { name: 'Needham', slug: 'needham', county: 'Norfolk', region: 'Metro West', state: 'MA', zip: '02492', distance: 39 },
  { name: 'Lincoln', slug: 'lincoln', county: 'Middlesex', region: 'Metro West', state: 'MA', zip: '01773', distance: 40 },
  { name: 'Norwood', slug: 'norwood', county: 'Norfolk', region: 'Greater Boston', state: 'MA', zip: '02062', distance: 40 },
  { name: 'Newton', slug: 'newton', county: 'Middlesex', region: 'Greater Boston', state: 'MA', zip: '02458', distance: 41 },
  { name: 'Sharon', slug: 'sharon', county: 'Norfolk', region: 'South Shore', state: 'MA', zip: '02067', distance: 41 },
  { name: 'Waltham', slug: 'waltham', county: 'Middlesex', region: 'Greater Boston', state: 'MA', zip: '02451', distance: 41 },
  { name: 'Westford', slug: 'westford', county: 'Middlesex', region: 'Metro West', state: 'MA', zip: '01886', distance: 41 },
  { name: 'Canton', slug: 'canton', county: 'Norfolk', region: 'South Shore', state: 'MA', zip: '02021', distance: 42 },
  { name: 'Carlisle', slug: 'carlisle', county: 'Middlesex', region: 'Metro West', state: 'MA', zip: '01741', distance: 42 },
  { name: 'Dedham', slug: 'dedham', county: 'Norfolk', region: 'Greater Boston', state: 'MA', zip: '02026', distance: 42 },
  { name: 'Bedford', slug: 'bedford', county: 'Middlesex', region: 'Greater Boston', state: 'MA', zip: '01730', distance: 43 },
  { name: 'Lexington', slug: 'lexington', county: 'Middlesex', region: 'Greater Boston', state: 'MA', zip: '02420', distance: 43 },
  { name: 'Watertown', slug: 'watertown', county: 'Middlesex', region: 'Greater Boston', state: 'MA', zip: '02472', distance: 43 },
  { name: 'Belmont', slug: 'belmont', county: 'Middlesex', region: 'Greater Boston', state: 'MA', zip: '02478', distance: 44 },
  { name: 'Chelmsford', slug: 'chelmsford', county: 'Middlesex', region: 'Metro West', state: 'MA', zip: '01824', distance: 44 },
  { name: 'Stoughton', slug: 'stoughton', county: 'Norfolk', region: 'South Shore', state: 'MA', zip: '02072', distance: 44 },
  { name: 'Brookline', slug: 'brookline', county: 'Norfolk', region: 'Greater Boston', state: 'MA', zip: '02445', distance: 45 },
  { name: 'Arlington', slug: 'arlington', county: 'Middlesex', region: 'Greater Boston', state: 'MA', zip: '02474', distance: 46 },
  { name: 'Burlington', slug: 'burlington', county: 'Middlesex', region: 'Greater Boston', state: 'MA', zip: '01803', distance: 47 },
  { name: 'Cambridge', slug: 'cambridge', county: 'Middlesex', region: 'Greater Boston', state: 'MA', zip: '02138', distance: 47 },
  { name: 'Milton', slug: 'milton', county: 'Norfolk', region: 'South Shore', state: 'MA', zip: '02186', distance: 47 },
  { name: 'Medford', slug: 'medford', county: 'Middlesex', region: 'Greater Boston', state: 'MA', zip: '02155', distance: 48 },
  { name: 'Randolph', slug: 'randolph', county: 'Norfolk', region: 'South Shore', state: 'MA', zip: '02368', distance: 48 },
  { name: 'Somerville', slug: 'somerville', county: 'Middlesex', region: 'Greater Boston', state: 'MA', zip: '02143', distance: 48 },
  { name: 'Winchester', slug: 'winchester', county: 'Middlesex', region: 'Greater Boston', state: 'MA', zip: '01890', distance: 48 },
  { name: 'Woburn', slug: 'woburn', county: 'Middlesex', region: 'Greater Boston', state: 'MA', zip: '01801', distance: 48 },
  { name: 'Braintree', slug: 'braintree', county: 'Norfolk', region: 'South Shore', state: 'MA', zip: '02184', distance: 50 },
  { name: 'Malden', slug: 'malden', county: 'Middlesex', region: 'Greater Boston', state: 'MA', zip: '02148', distance: 50 },
  { name: 'Quincy', slug: 'quincy', county: 'Norfolk', region: 'South Shore', state: 'MA', zip: '02169', distance: 50 },
  { name: 'Stoneham', slug: 'stoneham', county: 'Middlesex', region: 'Greater Boston', state: 'MA', zip: '02180', distance: 50 },
  { name: 'Melrose', slug: 'melrose', county: 'Middlesex', region: 'Greater Boston', state: 'MA', zip: '02176', distance: 51 },
  { name: 'Reading', slug: 'reading', county: 'Middlesex', region: 'Greater Boston', state: 'MA', zip: '01867', distance: 52 },
  { name: 'Wakefield', slug: 'wakefield', county: 'Middlesex', region: 'Greater Boston', state: 'MA', zip: '01880', distance: 53 },
  { name: 'Weymouth', slug: 'weymouth', county: 'Norfolk', region: 'South Shore', state: 'MA', zip: '02188', distance: 53 },
  { name: 'Saugus', slug: 'saugus', county: 'Essex', region: 'North Shore', state: 'MA', zip: '01906', distance: 54 },
  { name: 'Lynn', slug: 'lynn', county: 'Essex', region: 'North Shore', state: 'MA', zip: '01901', distance: 57 },
  { name: 'Peabody', slug: 'peabody', county: 'Essex', region: 'North Shore', state: 'MA', zip: '01960', distance: 60 },
  { name: 'Danvers', slug: 'danvers', county: 'Essex', region: 'North Shore', state: 'MA', zip: '01923', distance: 61 },
  { name: 'Salem', slug: 'salem', county: 'Essex', region: 'North Shore', state: 'MA', zip: '01970', distance: 61 },
  { name: 'Beverly', slug: 'beverly', county: 'Essex', region: 'North Shore', state: 'MA', zip: '01915', distance: 63 },
];

export function getCityBySlug(slug: string): City | undefined {
  return cities.find((city) => city.slug === slug);
}

export function getCitiesByCounty(county: string): City[] {
  return cities.filter((city) => city.county === county);
}

export function getCitiesByDistance(maxMiles: number): City[] {
  return cities.filter((city) => city.distance <= maxMiles);
}

/** The towns that genuinely border this one, nearest first (computed in geo.ts). */
export function getNearbyCities(slug: string, limit = 6): City[] {
  return neighbours(slug, limit)
    .map((s) => getCityBySlug(s))
    .filter((c): c is City => Boolean(c));
}

export function getAllCitySlugs(): string[] {
  return cities.map((city) => city.slug);
}
