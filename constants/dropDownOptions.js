// @flow
import countryOptions from '../static/countries.json';
import countryOptionsSemantic from '../static/countries.semantic.json';

const genderOptions = [
  { value: 'male', text: 'Male' },
  { value: 'female', text: 'Female' },
];
const typeOptions = [
  { value: 'one_month_single', text: '1 month - single entry' },
  { value: 'one_month_multiple', text: '1 month - multiple entries' },
  { value: 'three_month_single', text: '3 months - single entry' },
  { value: 'three_month_multiple', text: '3 months - multiple entries' },
  { value: 'six_month_multiple', text: '6 months - multiple entries' },
  { value: 'one_year_multiple', text: '1 year - multiple entries' },
];
const purposeOptions = [
  { value: 'tourist', text: 'Tourist' },
  { value: 'business', text: 'Business' },
];
const processingTimeOptions = [
  { value: 'normal', text: 'Normal (Guaranteed 1 working day)', price: 0 },
  {
    value: 'urgent',
    text: 'Urgent (Guaranteed 4-8 working hours)',
    price: 20,
  },
  {
    value: 'emergency',
    text: 'Emergency (Guaranteed 1 working hour)',
    price: 180,
  },
];
const airportOptions = [
  {
    value: 'SGN',
    text: 'Tan Son Nhat International Airport (Ho Chi Minh City)',
  },
  { value: 'HAN', text: 'Noi Bai International Airport (Ha Noi)' },
  { value: 'DAD', text: 'Da Nang International Airport' },
  { value: 'CRX', text: 'Cam Ranh International Airport (Khanh Hoa)' },
];
const airportFastTrackOptions = [
  { value: '', text: 'None', price: 0 },
  { value: 'airportFastTrack', text: 'Airport fast track', price: 29 },
  { value: 'airportVipFastTrack', text: 'Airport VIP fast track', price: 44 },
];
const carPickUpOptions = [
  { value: '', text: 'None', price: 0 },
  { value: 'fourSeats', text: 'Car pick-up (4 seats)', price: 29 },
  { value: 'sevenSeats', text: 'Car pick-up (7 seats)', price: 34 },
  { value: 'sixteenSeats', text: 'Car pick-up (16 seats)', price: 94 },
  { value: 'twentyFourSeats', text: 'Car pick-up (24 seats)', price: 154 },
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
