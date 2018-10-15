// @flow
import styled from 'styled-components';
import { colors, screenSizes, spacingUnits } from '../../constants/ui';
import { generateCommonProps } from './generateCommonProps';

/**
 * Text component acts as a <span> tag with customizable styles.
 */
const Text = styled.span`
  color: ${props => colors[props.color || 'mediumBlue']};
  font-weight: ${props => (props.bold ? 700 : props.semibold ? 500 : 400)};

  ${props =>
    props.letterSpacing && `letter-spacing: ${props.letterSpacing}px`}};
  ${props => props.fontStyle && `font-style: ${props.fontStyle}`}};
  ${props => props.p && `margin-bottom: 15px`}};
  ${props => props.wordSpacing && `word-spacing: ${props.wordSpacing}px`}};
  ${props => props.textAlign && `text-align: ${props.textAlign}`};
  ${props => props.whiteSpace && `white-space: ${props.whiteSpace}`};
  ${props => props.textTransform && `text-transform: ${props.textTransform}`};
  ${props =>
    props.hoverColor && `&:hover {color: ${colors[props.hoverColor]}}`};

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

export default Text;
