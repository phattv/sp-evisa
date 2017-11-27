// @flow
import styled from "styled-components";
import { colors, screenSizes, spacingUnits } from "../../constants/ui";
import {
  generateCommonProps,
  getLineHeightValue
} from "../utils/generateCommonProps";

// https://www.w3schools.com/css/css_text.asp
const Text = styled.span`
  color: ${props => colors[props.color || "darkGrey"]};
  line-height: ${props =>
    getLineHeightValue(props.lineHeight || props.fontSize || "default")};

  ${props =>
    props.letterSpacing && `letter-spacing: ${props.letterSpacing}px`}};
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
