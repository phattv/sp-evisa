// @flow
const screenSizes = {
  desktop: 1440 - 1,
  tablet: 768 - 1,
  mobile: 425 - 1,
};

const spacingUnits = {
  desktop: 5,
  tablet: 4,
  mobile: 3,
};

const borderRadius = 8;

const colors = {
  visaRed: '#CD2122',
  darkRed: '#9F0F12',
  visaBlue: '#0061B1',
  darkBlue: '#003058',
  lightBlue: '#F0F5F8',
  darkGrey: '#3E3E3E',
  grey: '#626262',
  lightGrey: '#D6D9DF',
  lighterGrey: '#EFEFEF',
  white: '#FFFFFF',
};

const fontSizes = {
  xs: 12,
  s: 14,
  default: 16,
  m: 18,
  l: 22,
  xl: 32,
  xxl: 42,
};

const spacingValues = {
  xxs: 4,
  xs: 8,
  s: 12,
  m: 16,
  l: 20,
  xl: 24,
  xxl: 28,
  xxxl: 32,
};

export {
  screenSizes,
  spacingUnits,
  borderRadius,
  colors,
  fontSizes,
  spacingValues,
};
