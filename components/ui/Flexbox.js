// @flow
import styled from "styled-components";
import { generateCommonProps } from "../utils/generateCommonProps";
import { screenSizes, spacingUnits } from "../../constants/ui";

const setResponsiveFlexDirection = (props, spacingUnit) => {
  if (spacingUnit === spacingUnits.mobile) {
    if (props.resonsiveLayout) {
      return !props.flexDirection || props.flexDirection === "row"
        ? "column"
        : "row";
    } else {
      return props.flexDirection || "row";
    }
  } else {
    return props.flexDirection || "row";
  }
};

const setResponsiveAlignItems = (props, spacingUnit) => {
  if (spacingUnit === spacingUnits.mobile) {
    if (props.responsiveAlignItemsCenter) {
      return "center";
    } else {
      return props.alignItems || "center";
    }
  } else {
    return props.alignItems || "center";
  }
};

// https://www.w3schools.com/css/css3_flexbox.asp
const Flexbox = styled.div`
  display: flex;
  justify-content: ${props => props.justifyContent || "center"};
  ${props => props.flex && `flex: ${props.flex}`};
  ${props => props.alignSelf && `align-self: ${props.alignSelf}`};

  @media only screen and (min-width: ${screenSizes.desktop}px) {
    ${props => generateCommonProps(props, spacingUnits.desktop)};
    flex-direction: ${props =>
      setResponsiveFlexDirection(props, spacingUnits.desktop)};
    align-items: ${props =>
      setResponsiveAlignItems(props, spacingUnits.desktop)};
  }

  @media only screen and (min-width: ${screenSizes.tablet}px) and (max-width: ${screenSizes.desktop}px) {
    ${props => generateCommonProps(props, spacingUnits.tablet)};
    flex-direction: ${props =>
      setResponsiveFlexDirection(props, spacingUnits.tablet)};
    align-items: ${props =>
      setResponsiveAlignItems(props, spacingUnits.tablet)};
  }

  @media only screen and (max-width: ${screenSizes.tablet}px) {
    ${props => generateCommonProps(props, spacingUnits.mobile)};
    flex-direction: ${props =>
      setResponsiveFlexDirection(props, spacingUnits.mobile)};
    align-items: ${props =>
      setResponsiveAlignItems(props, spacingUnits.mobile)};
  }
`;

export default Flexbox;
