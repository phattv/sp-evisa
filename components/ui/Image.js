// @flow
import styled from 'styled-components';
import { screenSizes, spacingUnits } from '../../constants/ui';
import generateCommonProps from './generateCommonProps';

/**
 * Image component act as a <img> tag.
 * TODO: https://github.com/cyrilwanner/next-optimized-images
 */
const Image = styled.img`
  height: ${props => props.height || 'auto'};
  display: block;

  @media only screen and (min-width: ${screenSizes.desktop}px) {
    ${props => generateCommonProps(props, spacingUnits.desktop)};
  }

  @media only screen and (min-width: ${screenSizes.tablet}px) and (max-width: ${screenSizes.desktop -
      1}px) {
    ${props => generateCommonProps(props, spacingUnits.tablet)};
  }

  @media only screen and (max-width: ${screenSizes.tablet - 1}px) {
    ${props => generateCommonProps(props, spacingUnits.mobile)};
  }
`;

export default Image;
