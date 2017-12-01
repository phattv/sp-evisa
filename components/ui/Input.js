// @flow
import styled from "styled-components";
import { screenSizes, spacingUnits } from "../../constants/ui";
import { generateCommonProps } from "../utils/generateCommonProps";

const Input = styled.input`
  background-color: white;
  border: 2px solid white;
  padding-right: 10px;
  padding-left: 10px;
  height: 34px;
  border-radius: 6px;
  width: 100%;

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

export default Input;
