/* Town-centre coordinates for the towns the portfolio covers, used to geotag
 * project images via schema.org contentLocation.
 *
 * Deliberately the town centre and never the customer's address — these are
 * private homes, and a precise lat/long would be published with the page. */
export const CITY_GEO: Record<string, [number, number]> = {
  'Atkinson, NH': [42.8389, -71.15],
  'Concord, MA': [42.4604, -71.3489],
  'Framingham, MA': [42.2793, -71.4162],
  'Grafton, MA': [42.207, -71.6856],
  'Hudson, MA': [42.3918, -71.5662],
  'Lexington, MA': [42.4473, -71.2245],
  'Marlborough, MA': [42.3459, -71.5523],
  'Natick, MA': [42.2775, -71.3468],
  'Norfolk, MA': [42.1194, -71.325],
  'Northborough, MA': [42.3195, -71.6412],
  'Reading, MA': [42.5256, -71.1097],
  'Shrewsbury, MA': [42.2959, -71.7128],
  'Sudbury, MA': [42.3834, -71.4162],
  'Westborough, MA': [42.2695, -71.6162],
  'Woburn, MA': [42.4792, -71.1528],
  'Worcester, MA': [42.2626, -71.8023],
};
