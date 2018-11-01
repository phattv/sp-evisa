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
  transparent: 'transparent',
};

const fontSizes = {
  s: 16,
  default: 18,
  m: 22,
  l: 32,
  xl: 40,
  xxl: 48,
};

const fontSizesSmall = {
  s: 14,
  default: 16,
  m: 18,
  l: 22,
  xl: 32,
  xxl: 40,
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
// TODO: simplify maxWidth for all pages: text, form, table
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
 * TODO: share with server.js to generate sitemap.xml
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
  terms: '/terms',
  privacy: '/privacy',
};

const htmlIds = {
  airportFastTrack: 'airport-fast-track',
  pickUp: 'pick-up',
  privateLetter: 'private-letter',
  formErrorMessage: 'form-error-message',
};

/**
 * NOTES using dayjs library:
 * - `dayjs('2018-12-31').format('DD/MM/YYYY')` // console: "31/12/2018"
 * - `dayjs('31-12-2018').format('DD/MM/YYYY')` // console: "NaN/NaN/NaN"
 */
const dateInputDateFormat = 'YYYY-MM-DD';
const postgresDateFormat = 'YYYY/MM/DD';
const displayDateFormat = 'DD/MM/YYYY';
const displayShortDateFormat = 'MMM DD';
const displayTimeFormat = 'hh:mm A';
const displayShortTimeFormat = 'hh A';
const displayDateTimeFormat = `${displayDateFormat} ${displayTimeFormat}`;
const displayShortDateTimeFormat = `${displayShortDateFormat} - ${
  displayTimeFormat
}`;

export {
  screenSizes,
  spacingUnits,
  borderRadius,
  colors,
  fontSizes,
  fontSizesSmall,
  spacingValues,
  dateInputDateFormat,
  postgresDateFormat,
  displayDateFormat,
  displayShortDateFormat,
  displayTimeFormat,
  displayShortTimeFormat,
  displayDateTimeFormat,
  displayShortDateTimeFormat,
  headerHeight,
  contentMaxWidth,
  tableWidth,
  textMaxWidth,
  formMaxWidth,
  paddingAll,
  paddingAllLarge,
  boxShadow,
  pageNames,
  htmlIds,
  iconSizes,
};
