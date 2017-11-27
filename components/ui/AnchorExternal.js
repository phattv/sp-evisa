// @flow
import styled from "styled-components";
import { colors, screenSizes, spacingUnits } from "../../constants/ui";
import { generateCommonProps } from "../utils/generateCommonProps";

const AnchorExternal = styled.a.attrs({
  target: "_blank"
})`
  user-select: none;
  cursor: pointer;
  color: ${colors.caroBlue};
  text-decoration: none;
  ${props => props.width && `width: ${props.width}`};

  &:hover {
    color: ${colors.darkBlue};
  }

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

export default AnchorExternal;
