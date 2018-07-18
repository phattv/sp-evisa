// @flow
import styled from 'styled-components';
import { generateCommonProps } from './generateCommonProps';
import { boxShadow, screenSizes, spacingUnits } from '../../constants/ui';

/**
 * Set responsive flex-direction:
 * on mobile screen, if responsiveLayout prop is true,
 * switch value between 'column' & 'row'
 * @param props
 * @param spacingUnit
 * @returns {string}
 */
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

/**
 * Flexbox component acts as a <div> tag with "display: flex" pre-defined.
 */
const Flexbox = styled.div`
  display: flex;
  ${props =>
    props.justifyContent && `justify-content: ${props.justifyContent}`};
  ${props => props.alignItems && `align-items: ${props.alignItems}`};
  ${props => props.flex && `flex: ${props.flex}`};
  ${props => props.alignSelf && `align-self: ${props.alignSelf}`};
  ${props => props.boxShadow && `box-shadow: ${boxShadow}`};

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
