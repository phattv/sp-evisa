// @flow
import styled from 'styled-components';
import { generateCommonProps } from './generateCommonProps';
import { screenSizes, spacingUnits } from '../../constants/ui';

const setResponsiveFlexDirection = (props, spacingUnit) => {
  if (spacingUnit === spacingUnits.mobile) {
    if (props.responsiveLayout) {
      return !props.column || props.row ? 'column' : 'row';
    } else {
      return props.column ? 'column' : 'row';
    }
  } else {
    return props.column ? 'column' : 'row';
  }
};

// https://www.w3schools.com/css/css3_flexbox.asp
const Flexbox = styled.div`
  display: flex;
  ${props =>
    props.justifyContent && `justify-content: ${props.justifyContent}`};
  ${props => props.alignItems && `align-items: ${props.alignItems}`};
  ${props => props.flex && `flex: ${props.flex}`};
  ${props => props.alignSelf && `align-self: ${props.alignSelf}`};

  @media only screen and (min-width: ${screenSizes.desktop}px) {
    ${props => generateCommonProps(props, spacingUnits.desktop)};
    flex-direction: ${props =>
      setResponsiveFlexDirection(props, spacingUnits.desktop)};
  }

  @media only screen and (min-width: ${screenSizes.tablet}px) and (max-width: ${screenSizes.desktop -
      1}px) {
    ${props => generateCommonProps(props, spacingUnits.tablet)};
    flex-direction: ${props =>
      setResponsiveFlexDirection(props, spacingUnits.tablet)};
  }

  @media only screen and (max-width: ${screenSizes.tablet - 1}px) {
    ${props => generateCommonProps(props, spacingUnits.mobile)};
    flex-direction: ${props =>
      setResponsiveFlexDirection(props, spacingUnits.mobile)};
  }
`;

export default Flexbox;
