// @flow
import styled from "styled-components";
import { colors, screenSizes, spacingUnits } from "../../constants/ui";
import {
  generateCommonProps,
  getLineHeightValue
} from "./generateCommonProps";

// https://www.w3schools.com/css/css_text.asp
const Text = styled.span`
  color: ${props => colors[props.color || "mediumBlue"]};
  
  ${props =>
    props.letterSpacing && `letter-spacing: ${props.letterSpacing}px`}};
  ${props =>
    props.lineHeight && `line-height: ${props.lineHeight}px`}};
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

  @media only screen and (min-width: ${screenSizes.tablet}px) and (max-width: ${screenSizes.desktop}px) {
    ${props => generateCommonProps(props, spacingUnits.tablet)};
  }

  @media only screen and (max-width: ${screenSizes.tablet}px) {
    ${props => generateCommonProps(props, spacingUnits.mobile)};
  }
`;

export default Text;
