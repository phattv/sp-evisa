// @flow
import countryOptions from '../static/countries.json';
import { fees } from '../constants/fees';

const genderOptions = [
  { value: 'male', text: 'Male' },
  { value: 'female', text: 'Female' },
];
const typeOptions = [
  {
    value: 'one_month_single',
    text: '1 month - single entry',
    lengthinmonth: 1,
  },
  {
    value: 'one_month_multiple',
    text: '1 month - multiple entries',
    lengthinmonth: 1,
  },
  {
    value: 'three_month_single',
    text: '3 months - single entry',
    lengthinmonth: 3,
  },
  {
    value: 'three_month_multiple',
    text: '3 months - multiple entries',
    lengthinmonth: 3,
  },
  {
    value: 'six_month_multiple',
    text: '6 months - multiple entries',
    lengthinmonth: 6,
  },
  {
    value: 'one_year_multiple',
    text: '1 year - multiple entries',
    lengthinmonth: 12,
  },
];
const purposeOptions = [
  { value: 'tourist', text: 'Tourist' },
  { value: 'business', text: 'Business' },
];
const processingTimeOptions = [
  {
    value: 'normal',
    text: 'Normal (1-2 working days)',
    price: fees.processingTimeNormal,
  },
  {
    value: 'urgent',
    text: 'Urgent (4-8 working hours)',
    price: fees.processingTimeUrgent,
  },
  {
    value: 'emergency',
    text: 'Emergency (1-2 working hours)',
    price: fees.processingTimeEmergency,
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
  {
    value: 'airportFastTrack',
    text: 'Airport Fast Track',
    price: fees.airportFastTrackSingle,
  },
  {
    value: 'airportVipFastTrack',
    text: 'Airport VIP Fast Track',
    price: fees.airportVipFastTrackSingle,
  },
];
const carPickUpOptions = [
  { value: '', text: 'None', price: 0 },
  {
    value: 'fourSeats',
    text: 'Car Pick Up (4 seats)',
    price: fees.carPickUpFourSeats,
  },
  {
    value: 'sevenSeats',
    text: 'Car Pick Up (7 seats)',
    price: fees.carPickUpSevenSeats,
  },
  {
    value: 'sixteenSeats',
    text: 'Car Pick Up (16 seats)',
    price: fees.carPickUpSixteenSeats,
  },
  {
    value: 'twentyFourSeats',
    text: 'Car Pick Up (24 seats)',
    price: fees.carPickUpTwentyFourSeats,
  },
];

export {
  genderOptions,
  typeOptions,
  purposeOptions,
  processingTimeOptions,
  airportOptions,
  countryOptions,
  airportFastTrackOptions,
  carPickUpOptions,
};
