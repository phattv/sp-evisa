// @flow
const colors = {
  green: '#2BC47D',
  darkGreen: '#28A86D',
  red: '#D53A4D',
  darkRed: '#B83040',
  darkBlue: '#2C3F60',
  mediumBlue: '#5B6C94',
  lightBlue: '#8193A9',
  bgGrey: '#F8F9FC',
  bgGrey2: '#F2F7FF',
  bgRed: '#FFD1D7',
  white: '#FFFFFF',
};

const fontSizes = {
  xs: 14,
  s: 16,
  default: 18,
  m: 22,
  l: 32,
  xl: 40,
  xxl: 48,
};

const screenSizes = {
  desktop: 1440,
  tablet: 768,
  mobile: 480,
};

const spacingUnits = {
  desktop: 5,
  tablet: 4,
  mobile: 3,
};

const borderRadius = 6;

const spacingValues = {
  blockPaddingTop: 20,
};

const iconSizes = {
  small: 30 / spacingUnits.desktop,
  default: 60 / spacingUnits.desktop,
  large: 100 / spacingUnits.desktop,
};

const headerHeight = 140 / spacingUnits.desktop;
const contentMaxWidth = 1440 / spacingUnits.desktop;
const tableWidth = 380 / spacingUnits.desktop;
const textMaxWidth = 580 / spacingUnits.desktop;
const formMaxWidth = 950 / spacingUnits.desktop;

const paddingAll = {
  paddingHorizontal: 5,
  paddingVertical: 5,
};
const paddingAllLarge = {
  paddingHorizontal: 10,
  paddingVertical: 10,
};

const boxShadow = '8px 8px 40px 0 rgba(91, 108, 148, 0.2)';
/**
 * TODO: domain name is https://evisa-vn.com, how the page urls should be?
 * should page names have "visa-" prefix for SEO purposes?
 * like "visa-fees", "how-to-apply", "other-services", "contact-us"..
 */
const pageNames = {
  home: '/',
  apply: '/apply',
  fees: '/fees',
  faq: '/faq',
  services: '/services',
  contact: '/contact',
  reviews: '/reviews',
  thankYou: '/thank-you',
  paymentFailed: '/payment-failed',
};

/**
 * NOTES using dayjs library:
 * - `dayjs('2018-12-31').format('DD/MM/YYYY')` // console: "31/12/2018"
 * - `dayjs('31-12-2018').format('DD/MM/YYYY')` // console: "NaN/NaN/NaN"
 */
const displayDateFormat = 'DD/MM/YYYY';
const postgresDateFormat = 'YYYY/MM/DD';
const displayDateTimeFormat = 'DD/MM/YYYY HH:mm:ss A';

export {
  screenSizes,
  spacingUnits,
  borderRadius,
  colors,
  fontSizes,
  spacingValues,
  displayDateFormat,
  postgresDateFormat,
  displayDateTimeFormat,
  headerHeight,
  contentMaxWidth,
  tableWidth,
  textMaxWidth,
  formMaxWidth,
  paddingAll,
  paddingAllLarge,
  boxShadow,
  pageNames,
  iconSizes,
};
