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

// TODO: remove s m l, use semantic text instead,
const spacingValues = {
  xxs: 4,
  xs: 8,
  s: 12,
  m: 16,
  l: 20,
  xl: 24,
  xxl: 28,
  xxxl: 32,
  blockPaddingTop: 20,
};

const iconSizes = {
  small: 30 / spacingUnits.desktop,
  default: 60 / spacingUnits.desktop,
  large: 100 / spacingUnits.desktop,
};

const headerHeight = 140 / spacingUnits.desktop;
const contentMaxWidth = 1440 / spacingUnits.desktop;

const paddingAll = {
  paddingHorizontal: 5,
  paddingVertical: 5,
};
const paddingAllLarge = {
  paddingHorizontal: 10,
  paddingVertical: 10,
};

/**
 * TODO: domain name is https://evisa-vn.com, how the page urls should be?
 * should page names have "visa-" prefix for SEO purposes?
 * like "visa-fees", "how-to-apply", "other-services", "contact-us"..
 */
const pageNames = {
  home: '/',
  apply: '/apply',
  fees: '/fees',
  how: '/how',
  services: '/services',
  contact: '/contact',
};

/**
 * NOTES using dayjs library:
 * - `dayjs('2018-12-31').format('DD/MM/YYYY')` // console: "31/12/2018"
 * - `dayjs('31-12-2018').format('DD/MM/YYYY')` // console: "NaN/NaN/NaN"
 */
const dateFormat = 'DD/MM/YYYY';
const postgresDateFormat = 'YYYY/MM/DD';
const dateTimeFormat = 'DD/MM/YYYY HH:mm:ss A';

export {
  screenSizes,
  spacingUnits,
  borderRadius,
  colors,
  fontSizes,
  spacingValues,
  dateFormat,
  postgresDateFormat,
  dateTimeFormat,
  headerHeight,
  contentMaxWidth,
  paddingAll,
  paddingAllLarge,
  pageNames,
  iconSizes,
};
