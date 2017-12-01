// @flow
import styled from "styled-components";
import { screenSizes, spacingUnits } from "../../constants/ui";
import { generateCommonProps } from "../utils/generateCommonProps";

const Form = styled.form`
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

export default Form;
