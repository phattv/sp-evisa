// @flow
import styled from "styled-components";
import Flexbox from "./Flexbox";
import { colors, screenSizes, spacingUnits } from "../../constants/ui";
import {
  generateCommonProps,
  getSpacingValue
} from "../utils/generateCommonProps";

const Button = styled(Flexbox)`
  user-select: none;
  border: 2px solid;
  cursor: pointer;
  text-align: center;
  padding: 15px;

  ${props =>
    props.solid
      ? `
border-radius: 3px;
color: ${colors[props.color || "white"]};
background-color: ${colors[props.backgroundColor || "caroBlue"]};
border-color: ${colors[props.backgroundColor || "caroBlue"]};
        
&:hover {
  color: ${colors[props.backgroundColor || "white"]};
  background-color: ${colors[props.color || "darkBlue"]};
  border-color: ${colors[props.color || "darkBlue"]};
}
`
      : `
border-radius: 100px;
color: ${colors[props.color || "white"]};
background-color: transparent;
border-color: ${colors[props.borderColor || "white"]};

&:hover {
  color: ${colors[props.invertColor || "caroRed"]};
  background-color: ${colors[props.invertBorderColor || "white"]};
  border-color: ${colors[props.invertColor || "caroRed"]};
}
`};
  ${props =>
    props.letterSpacing && `letter-spacing: ${props.letterSpacing}px`}};

  @media only screen and (min-width: ${screenSizes.desktop}px) {
    ${props => generateCommonProps(props, spacingUnits.desktop)};
    ${props =>
      !props.solid && `padding: ${getSpacingValue(3, spacingUnits.desktop)};`};
  }

  @media only screen and (min-width: ${screenSizes.tablet}px) and (max-width: ${screenSizes.desktop}px) {
    ${props => generateCommonProps(props, spacingUnits.tablet)};
    ${props =>
      !props.solid && `padding: ${getSpacingValue(3, spacingUnits.tablet)};`};
  }

  @media only screen and (max-width: ${screenSizes.tablet}px) {
    ${props => generateCommonProps(props, spacingUnits.mobile)};
    ${props =>
      !props.solid && `padding: ${getSpacingValue(3, spacingUnits.mobile)};`};
  }
`;

export default Button;
