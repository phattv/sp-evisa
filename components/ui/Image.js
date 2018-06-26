// @flow
import styled from "styled-components";
import { screenSizes, spacingUnits } from "../../constants/ui";
import generateCommonProps from "./generateCommonProps";

const Image = styled.img`
  width: ${props => (props.fixedWidth ? props.width : props.width || "100%")};
  height: ${props => props.height || "auto"};
  display: block;

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

export default Image;
