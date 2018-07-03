// @flow
import countryOptions from '../static/countries.json';
import countryOptionsSemantic from '../static/countries.semantic.json';

const genderOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
];
const typeOptions = [
  { value: 'one_month_single', label: '1 month single' },
  { value: 'one_month_multiple', label: '1 month multiple' },
  { value: 'three_month_single', label: '3 months single' },
  { value: 'three_month_multiple', label: '3 months multiple' },
  { value: 'six_month_multiple', label: '6 months multiple' },
  { value: 'one_year_multiple', label: '1 year multiple' },
];
const purposeOptions = [
  { value: 'tourist', label: 'Tourist' },
  { value: 'business', label: 'Business' },
];
const processingTimeOptions = [
  { value: 'normal', label: 'Normal (Guaranteed 1 working day)', price: 0 },
  {
    value: 'urgent',
    label: 'Urgent (Guaranteed 4-8 working hours)',
    price: 20,
  },
  {
    value: 'emergency',
    label: 'Emergency (Guaranteed 1 working hour)',
    price: 180,
  },
];
const airportOptions = [
  {
    value: 'SGN',
    label: 'Tan Son Nhat International Airport (Ho Chi Minh City)',
  },
  { value: 'HAN', label: 'Noi Bai International Airport (Ha Noi)' },
  { value: 'DAD', label: 'Da Nang International Airport' },
  { value: 'CRX', label: 'Cam Ranh International Airport (Khanh Hoa)' },
];
const airportFastTrackOptions = [
  { value: '', label: 'None', price: 0 },
  { value: 'airportFastTrack', label: 'Airport fast track', price: 29 },
  { value: 'airportVipFastTrack', label: 'Airport VIP fast track', price: 44 },
];
const carPickUpOptions = [
  { value: '', label: 'None', price: 0 },
  { value: 'fourSeats', label: 'Car pick-up (4 seats)', price: 29 },
  { value: 'sevenSeats', label: 'Car pick-up (7 seats)', price: 34 },
  { value: 'sixteenSeats', label: 'Car pick-up (16 seats)', price: 94 },
  { value: 'twentyFourSeats', label: 'Car pick-up (24 seats)', price: 154 },
];

export {
  genderOptions,
  typeOptions,
  purposeOptions,
  processingTimeOptions,
  airportOptions,
  countryOptions,
  countryOptionsSemantic,
  airportFastTrackOptions,
  carPickUpOptions,
};
