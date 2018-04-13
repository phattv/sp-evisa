// @flow

const genderOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
];
const typeOptions = [
  { value: 'one_month_single', label: '1 Month single' },
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
  { value: 'normal', label: 'Normal (Guaranteed 2 working days)' },
  {
    value: 'urgent',
    label: 'Urgent (Guaranteed 4-8 working hours)',
  },
  {
    value: 'emergency',
    label: 'Emergency (Guaranteed 1 working hour)',
  },
  { value: 'overtime', label: 'Overtime' },
  { value: 'holiday', label: 'Holiday' },
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

export {
  genderOptions,
  typeOptions,
  purposeOptions,
  processingTimeOptions,
  airportOptions,
};