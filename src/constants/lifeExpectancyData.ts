export interface LifeExpectancyCountry {
  male: number;
  female: number;
  other: number;
}

export const LifeExpectancyData: Record<string, LifeExpectancyCountry> = {
  // Global average fallback
  GLOBAL: { male: 70.8, female: 75.6, other: 73.2 },

  // Country-specific data
  MC: { male: 84.4, female: 88.5, other: 86.5 }, // Monaco
  SM: { male: 84.2, female: 87.1, other: 85.7 }, // San Marino
  KW: { male: 82.7, female: 83.7, other: 83.2 }, // Kuwait
  HK: { male: 82.5, female: 88.1, other: 85.3 }, // Hong Kong
  LI: { male: 82.5, female: 87.3, other: 84.9 }, // Liechtenstein
  CH: { male: 82.3, female: 85.9, other: 84.1 }, // Switzerland
  AD: { male: 82.1, female: 86.1, other: 84.1 }, // Andorra
  AE: { male: 82.0, female: 84.2, other: 83.1 }, // United Arab Emirates
  MT: { male: 81.8, female: 85.3, other: 83.6 }, // Malta
  PF: { male: 81.8, female: 86.5, other: 84.2 }, // French Polynesia
  IT: { male: 81.7, female: 85.8, other: 83.8 }, // Italy
  LU: { male: 81.7, female: 85.1, other: 83.4 }, // Luxembourg
  SE: { male: 81.7, female: 85.0, other: 83.4 }, // Sweden
  QA: { male: 81.6, female: 83.4, other: 82.5 }, // Qatar
  NO: { male: 81.6, female: 84.7, other: 83.2 }, // Norway
  IE: { male: 81.3, female: 84.5, other: 82.9 }, // Ireland
  ES: { male: 81.2, female: 86.7, other: 84.0 }, // Spain
  NZ: { male: 81.2, female: 84.9, other: 83.1 }, // New Zealand
  AU: { male: 81.1, female: 85.1, other: 83.1 }, // Australia
  JP: { male: 81.1, female: 87.1, other: 84.1 }, // Japan
  IL: { male: 81.0, female: 85.5, other: 83.3 }, // Israel
  GI: { male: 80.9, female: 86.1, other: 83.5 }, // Gibraltar
  IS: { male: 80.9, female: 84.4, other: 82.7 }, // Iceland
  FO: { male: 80.9, female: 85.5, other: 83.2 }, // Faroe Islands
  SG: { male: 80.7, female: 85.2, other: 83.0 }, // Singapore
  BH: { male: 80.7, female: 82.0, other: 81.4 }, // Bahrain
  KR: { male: 80.6, female: 86.4, other: 83.5 }, // South Korea
  NL: { male: 80.5, female: 83.4, other: 82.0 }, // Netherlands
  MO: { male: 80.4, female: 86.1, other: 83.3 }, // Macao
  BE: { male: 80.3, female: 84.6, other: 82.5 }, // Belgium
  FR: { male: 80.1, female: 85.9, other: 83.0 }, // France
  DK: { male: 80.0, female: 83.8, other: 81.9 }, // Denmark
  MV: { male: 79.7, female: 82.8, other: 81.3 }, // Maldives
  CY: { male: 79.6, female: 83.7, other: 81.7 }, // Cyprus
  CA: { male: 79.5, female: 83.9, other: 81.7 }, // Canada
  PT: { male: 79.5, female: 85.2, other: 82.4 }, // Portugal
  GB: { male: 79.4, female: 83.2, other: 81.3 }, // United Kingdom
  CL: { male: 79.2, female: 83.1, other: 81.2 }, // Chile
  AT: { male: 79.2, female: 84.0, other: 81.6 }, // Austria
  FI: { male: 79.1, female: 84.4, other: 81.8 }, // Finland
  SI: { male: 79.1, female: 85.0, other: 82.1 }, // Slovenia
  GR: { male: 79.0, female: 84.2, other: 81.6 }, // Greece
  IM: { male: 78.9, female: 83.1, other: 81.0 }, // Isle of Man
  BM: { male: 78.9, female: 85.7, other: 82.3 }, // Bermuda
  OM: { male: 78.5, female: 81.9, other: 80.2 }, // Oman
  DE: { male: 78.2, female: 83.0, other: 80.6 }, // Germany
  CR: { male: 78.1, female: 83.4, other: 80.8 }, // Costa Rica
  PR: { male: 78.0, female: 85.2, other: 81.6 }, // Puerto Rico
  KY: { male: 78.0, female: 82.9, other: 80.5 }, // Cayman Islands
  AL: { male: 77.7, female: 81.4, other: 79.6 }, // Albania
  VI: { male: 77.3, female: 83.9, other: 80.6 }, // Virgin Islands
  MP: { male: 77.1, female: 80.7, other: 78.9 }, // Northern Marianas
  SA: { male: 77.1, female: 81.2, other: 79.2 }, // Saudi Arabia
  CZ: { male: 77.0, female: 82.9, other: 80.0 }, // Czechia
  MF: { male: 76.8, female: 83.8, other: 80.3 }, // St. Martin
  PA: { male: 76.7, female: 82.6, other: 79.7 }, // Panama
  NC: { male: 76.3, female: 81.3, other: 78.8 }, // New Caledonia
  TC: { male: 75.8, female: 80.3, other: 78.1 }, // Turks and Caicos Islands
  XK: { male: 75.8, female: 80.1, other: 78.0 }, // Kosovo
  US: { male: 75.8, female: 81.1, other: 78.5 }, // United States
  IR: { male: 75.8, female: 79.6, other: 77.7 }, // Iran
  LB: { male: 75.7, female: 79.7, other: 77.7 }, // Lebanon
  JO: { male: 75.7, female: 80.2, other: 78.0 }, // Jordan
  CU: { male: 75.7, female: 80.5, other: 78.1 }, // Cuba
  PE: { male: 75.4, female: 80.1, other: 77.8 }, // Peru
  HR: { male: 75.4, female: 81.7, other: 78.6 }, // Croatia
  CN: { male: 75.2, female: 80.9, other: 78.1 }, // China
  ME: { male: 75.1, female: 80.2, other: 77.7 }, // Montenegro
  CO: { male: 75.0, female: 80.5, other: 77.8 }, // Colombia
  DZ: { male: 74.9, female: 77.7, other: 76.3 }, // Algeria
  AR: { male: 74.8, female: 79.9, other: 77.4 }, // Argentina
  PL: { male: 74.8, female: 82.4, other: 78.6 }, // Poland
  SK: { male: 74.7, female: 81.5, other: 78.1 }, // Slovakia
  EC: { male: 74.7, female: 80.1, other: 77.4 }, // Ecuador
  AG: { male: 74.5, female: 80.3, other: 77.4 }, // Antigua and Barbuda
  TR: { male: 74.5, female: 79.9, other: 77.2 }, // Turkey
  VG: { male: 74.5, female: 80.0, other: 77.3 }, // British Virgin Islands
  BA: { male: 74.4, female: 80.9, other: 77.7 }, // Bosnia and Herzegovina
  MY: { male: 74.3, female: 79.4, other: 76.9 }, // Malaysia
  LK: { male: 74.2, female: 80.6, other: 77.4 }, // Sri Lanka
  UY: { male: 74.2, female: 81.9, other: 78.1 }, // Uruguay
  AM: { male: 74.1, female: 81.0, other: 77.6 }, // Armenia
  EE: { male: 74.1, female: 83.1, other: 78.6 }, // Estonia
  TN: { male: 73.9, female: 79.1, other: 76.5 }, // Tunisia
  RS: { male: 73.9, female: 78.7, other: 76.3 }, // Serbia
  AW: { male: 73.7, female: 78.8, other: 76.3 }, // Aruba
  SX: { male: 73.7, female: 79.5, other: 76.6 }, // Sint Maarten
  BB: { male: 73.6, female: 78.6, other: 76.1 }, // Barbados
  HU: { male: 73.6, female: 80.1, other: 76.9 }, // Hungary
  GU: { male: 73.4, female: 81.4, other: 77.4 }, // Guam
  BN: { male: 73.3, female: 77.6, other: 75.5 }, // Brunei
  MA: { male: 73.2, female: 77.6, other: 75.4 }, // Morocco
  MK: { male: 73.2, female: 77.6, other: 75.4 }, // North Macedonia
  BD: { male: 73.0, female: 76.4, other: 74.7 }, // Bangladesh
  RO: { male: 72.9, female: 80.5, other: 76.7 }, // Romania
  CV: { male: 72.9, female: 79.2, other: 76.1 }, // Cape Verde
  BR: { male: 72.8, female: 79.0, other: 75.9 }, // Brazil
  LT: { male: 72.5, female: 81.7, other: 77.1 }, // Lithuania
  CW: { male: 72.5, female: 80.8, other: 76.7 }, // Curacao
  GD: { male: 72.4, female: 78.4, other: 75.4 }, // Grenada
  NI: { male: 72.3, female: 77.4, other: 74.9 }, // Nicaragua
  MX: { male: 72.2, female: 77.8, other: 75.0 }, // Mexico
  TH: { male: 72.2, female: 80.9, other: 76.6 }, // Thailand
  BG: { male: 72.0, female: 79.6, other: 75.8 }, // Bulgaria
  AZ: { male: 71.6, female: 77.1, other: 74.4 }, // Azerbaijan
  KP: { male: 71.5, female: 75.7, other: 73.6 }, // North Korea
  BT: { male: 71.3, female: 75.0, other: 73.2 }, // Bhutan
  SC: { male: 71.3, female: 78.8, other: 75.1 }, // Seychelles
  BZ: { male: 70.9, female: 76.5, other: 73.7 }, // Belize
  BS: { male: 70.9, female: 78.2, other: 74.6 }, // Bahamas
  PY: { male: 70.9, female: 77.0, other: 74.0 }, // Paraguay
  LV: { male: 70.8, female: 80.8, other: 75.8 }, // Latvia
  DO: { male: 70.5, female: 77.0, other: 73.8 }, // Dominican Republic
  IN: { male: 70.5, female: 73.6, other: 72.1 }, // India
  SR: { male: 70.5, female: 76.8, other: 73.7 }, // Suriname
  IQ: { male: 70.4, female: 74.1, other: 72.3 }, // Iraq
  TT: { male: 70.4, female: 76.7, other: 73.6 }, // Trinidad and Tobago
  HN: { male: 70.3, female: 75.5, other: 72.9 }, // Honduras
  GT: { male: 70.3, female: 74.9, other: 72.6 }, // Guatemala
  AS: { male: 70.2, female: 75.8, other: 73.0 }, // American Samoa
  KZ: { male: 70.1, female: 78.4, other: 74.3 }, // Kazakhstan
  MU: { male: 70.1, female: 76.9, other: 73.5 }, // Mauritius
  VN: { male: 69.9, female: 79.3, other: 74.6 }, // Vietnam
  WS: { male: 69.9, female: 73.7, other: 71.8 }, // Samoa
  SY: { male: 69.8, female: 74.4, other: 72.1 }, // Syria
  GL: { male: 69.7, female: 73.5, other: 71.6 }, // Greenland
  TJ: { male: 69.6, female: 74.0, other: 71.8 }, // Tajikistan
  GE: { male: 69.6, female: 79.1, other: 74.4 }, // Georgia
  BY: { male: 69.5, female: 79.1, other: 74.3 }, // Belarus
  EG: { male: 69.5, female: 73.8, other: 71.7 }, // Egypt
  UZ: { male: 69.5, female: 75.4, other: 72.5 }, // Uzbekistan
  VU: { male: 69.4, female: 73.9, other: 71.7 }, // Vanuatu
  TO: { male: 69.4, female: 76.4, other: 72.9 }, // Tonga
  LC: { male: 69.3, female: 76.3, other: 72.8 }, // Saint Lucia
  SB: { male: 69.2, female: 72.0, other: 70.6 }, // Solomon Islands
  ID: { male: 69.0, female: 73.3, other: 71.2 }, // Indonesia
  JM: { male: 69.0, female: 74.0, other: 71.5 }, // Jamaica
  NP: { male: 68.8, female: 71.8, other: 70.3 }, // Nepal
  VE: { male: 68.7, female: 76.5, other: 72.6 }, // Venezuela
  VC: { male: 68.7, female: 74.3, other: 71.5 }, // Saint Vincent and the Grenadines
  KN: { male: 68.6, female: 76.0, other: 72.3 }, // Saint Kitts and Nevis
  LY: { male: 68.3, female: 70.4, other: 69.4 }, // Libya
  DM: { male: 68.2, female: 74.5, other: 71.4 }, // Dominica
  KG: { male: 68.2, female: 76.5, other: 72.4 }, // Kyrgyzstan
  RU: { male: 68.0, female: 78.7, other: 73.4 }, // Russia
  KH: { male: 68.0, female: 73.2, other: 70.6 }, // Cambodia
  MN: { male: 67.6, female: 76.9, other: 72.3 }, // Mongolia
  SV: { male: 67.5, female: 76.3, other: 71.9 }, // El Salvador
  YE: { male: 67.2, female: 71.4, other: 69.3 }, // Yemen
  PW: { male: 67.2, female: 71.8, other: 69.5 }, // Palau
  UA: { male: 66.9, female: 80.2, other: 73.6 }, // Ukraine
  PH: { male: 66.9, female: 72.8, other: 69.9 }, // Philippines
  TM: { male: 66.9, female: 72.8, other: 69.9 }, // Turkmenistan
  SN: { male: 66.8, female: 70.8, other: 68.8 }, // Senegal
  LA: { male: 66.8, female: 71.3, other: 69.1 }, // Laos
  BW: { male: 66.7, female: 71.7, other: 69.2 }, // Botswana
  MD: { male: 66.6, female: 75.5, other: 71.1 }, // Moldova
  ER: { male: 66.5, female: 70.7, other: 68.6 }, // Eritrea
  GY: { male: 66.5, female: 73.9, other: 70.2 }, // Guyana
  MR: { male: 66.5, female: 70.5, other: 68.5 }, // Mauritania
  ST: { male: 66.2, female: 73.7, other: 70.0 }, // Sao Tome and Principe
  BO: { male: 66.1, female: 71.1, other: 68.6 }, // Bolivia
  TL: { male: 66.1, female: 69.4, other: 67.8 }, // East Timor
  GA: { male: 65.9, female: 71.1, other: 68.5 }, // Gabon
  RW: { male: 65.5, female: 69.9, other: 67.7 }, // Rwanda
  FJ: { male: 65.3, female: 69.4, other: 67.4 }, // Fiji
  PK: { male: 65.3, female: 70.2, other: 67.8 }, // Pakistan
  UG: { male: 65.3, female: 71.1, other: 68.2 }, // Uganda
  MH: { male: 64.9, female: 69.3, other: 67.1 }, // Marshall Islands
  KM: { male: 64.8, female: 68.9, other: 66.9 }, // Comoros
  KI: { male: 64.6, female: 68.2, other: 66.4 }, // Kiribati
  AF: { male: 64.5, female: 67.5, other: 66.0 }, // Afghanistan
  TZ: { male: 64.2, female: 69.8, other: 67.0 }, // Tanzania
  GM: { male: 64.2, female: 67.5, other: 65.9 }, // Gambia
  CG: { male: 64.1, female: 67.5, other: 65.8 }, // Congo
  ET: { male: 64.1, female: 70.7, other: 67.4 }, // Ethiopia
  MW: { male: 64.1, female: 70.6, other: 67.4 }, // Malawi
  ZM: { male: 63.9, female: 68.7, other: 66.3 }, // Zambia
  MM: { male: 63.8, female: 70.2, other: 67.0 }, // Myanmar
  TV: { male: 63.8, female: 70.7, other: 67.3 }, // Tuvalu
  PG: { male: 63.7, female: 69.1, other: 66.4 }, // Papua New Guinea
  DJ: { male: 63.5, female: 68.5, other: 66.0 }, // Djibouti
  FM: { male: 63.5, female: 71.1, other: 67.3 }, // Micronesia
  NA: { male: 63.3, female: 71.3, other: 67.3 }, // Namibia
  SD: { male: 63.3, female: 69.6, other: 66.5 }, // Sudan
  GH: { male: 63.1, female: 67.9, other: 65.5 }, // Ghana
  ZA: { male: 62.6, female: 69.6, other: 66.1 }, // South Africa
  TG: { male: 62.5, female: 62.9, other: 62.7 }, // Togo
  AO: { male: 62.1, female: 67.1, other: 64.6 }, // Angola
  GQ: { male: 62.0, female: 65.7, other: 63.9 }, // Equatorial Guinea
  MG: { male: 61.9, female: 65.4, other: 63.7 }, // Madagascar
  HT: { male: 61.7, female: 68.3, other: 65.0 }, // Haiti
  GW: { male: 61.7, female: 66.4, other: 64.1 }, // Guinea-Bissau
  BI: { male: 61.6, female: 65.7, other: 63.7 }, // Burundi
  CM: { male: 61.5, female: 65.9, other: 63.7 }, // Cameroon
  KE: { male: 61.5, female: 65.9, other: 63.7 }, // Kenya
  SZ: { male: 61.2, female: 67.0, other: 64.1 }, // Eswatini
  LR: { male: 60.9, female: 63.4, other: 62.2 }, // Liberia
  MZ: { male: 60.3, female: 66.5, other: 63.4 }, // Mozambique
  NR: { male: 60.3, female: 64.0, other: 62.2 }, // Nauru
  NE: { male: 60.3, female: 62.1, other: 61.2 }, // Niger
  ZW: { male: 60.2, female: 65.0, other: 62.6 }, // Zimbabwe
  SL: { male: 60.1, female: 63.5, other: 61.8 }, // Sierra Leone
  CI: { male: 60.0, female: 64.1, other: 62.1 }, // Ivory Coast
  CD: { male: 59.8, female: 64.0, other: 61.9 }, // Congo (Dem. Republic)
  PS: { male: 59.7, female: 71.5, other: 65.6 }, // Palestine
  GN: { male: 59.5, female: 61.9, other: 60.7 }, // Guinea
  BJ: { male: 59.3, female: 62.2, other: 60.8 }, // Benin
  ML: { male: 59.0, female: 61.9, other: 60.5 }, // Mali
  BF: { male: 58.9, female: 63.2, other: 61.1 }, // Burkina Faso
  SO: { male: 56.4, female: 61.4, other: 58.9 }, // Somalia
  CF: { male: 55.3, female: 59.3, other: 57.3 }, // Central Africa
  SS: { male: 54.6, female: 60.6, other: 57.6 }, // South Sudan
  LS: { male: 54.6, female: 60.0, other: 57.3 }, // Lesotho
  NG: { male: 54.2, female: 54.7, other: 54.5 }, // Nigeria
  TD: { male: 53.2, female: 57.0, other: 55.1 }, // Chad
};
