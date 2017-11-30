// @flow
import {
  borderRadius,
  colors,
  fontSizes,
  spacingUnits
} from "../../constants/ui";

// <editor-fold desc="Helper functions">
// Convention: all spacing/metric values is based on "spacingUnit"
export const getSpacingValue = (
  unit: number,
  spacingUnit: number,
  halve?: boolean
) => `${halve ? unit * spacingUnit / 2 : unit * spacingUnit}px;`;

export const getLineHeightValue = (unit: number) =>
  `${fontSizes[unit] + 10}px;`;

export const standardizeMetricProp = (
  prop: number | string,
  spacingUnit: number
) =>
  typeof prop === "number" ? `${getSpacingValue(prop, spacingUnit)}` : prop;

const setResponsiveFontSize = (
  fontSize?: string,
  spacingUnit: number
): string => {
  let actualFontSize;
  switch (spacingUnit) {
    case spacingUnits.desktop:
    case spacingUnits.tablet: {
      actualFontSize = fontSizes[fontSize || "default"];
      break;
    }
    case spacingUnits.mobile: {
      actualFontSize = fontSizes[fontSize || "default"] - 2;
      break;
    }
    default: {
      actualFontSize = fontSizes.default;
      break;
    }
  }

  return `font-size: ${actualFontSize}px;`;
};

const setResponsiveNoPaddingHorizontal = (
  paddingHorizontal: number,
  spacingUnit: number,
  responsiveNoPaddingHorizontal?: boolean,
  responsivePaddingHorizontal?: boolean
) => {
  if (spacingUnit === spacingUnits.mobile) {
    if (responsiveNoPaddingHorizontal) {
      return null;
    } else {
      if (responsivePaddingHorizontal) {
        return `
padding-right: ${getSpacingValue(paddingHorizontal, spacingUnit, true)};
padding-left: ${getSpacingValue(paddingHorizontal, spacingUnit, true)};
        `;
      }
    }
  }

  return `
padding-right: ${getSpacingValue(paddingHorizontal, spacingUnit)};
padding-left: ${getSpacingValue(paddingHorizontal, spacingUnit)};
  `;
};
// </editor-fold>

export const generateCommonProps = (
  props: Object,
  spacingUnit: number
): string => {
  return `
${setResponsiveFontSize(props.fontSize, spacingUnit)};
font-family: ${
    props.fontWeight === "black"
      ? "Lato_Black"
      : props.fontWeight === "bold" ? "Lato_Bold" : "Lato_Regular"
  };

${props.backgroundColor &&
    `background-color: ${colors[props.backgroundColor]}`};

${!props.fixedWidth &&
    props.width &&
    `width: ${standardizeMetricProp(props.width, spacingUnit)}`};
${props.minWidth &&
    `min-width: ${standardizeMetricProp(props.minWidth, spacingUnit)}`};
${props.maxWidth &&
    `max-width: ${
      props.responsiveLayout
        ? "100%"
        : standardizeMetricProp(props.maxWidth, spacingUnit)
    }`};

${props.height &&
    `height: ${standardizeMetricProp(props.height, spacingUnit)}`};
${props.minHeight &&
    `min-height: ${standardizeMetricProp(props.minHeight, spacingUnit)}`};
${props.maxHeight &&
    `max-height: ${standardizeMetricProp(props.maxHeight, spacingUnit)}`};

${props.paddingTop &&
    `padding-top: ${getSpacingValue(props.paddingTop, spacingUnit)}`};
${props.paddingRight &&
    `padding-right: ${getSpacingValue(props.paddingRight, spacingUnit)}`};
${props.paddingBottom &&
    `padding-bottom: ${getSpacingValue(props.paddingBottom, spacingUnit)}`};
${props.paddingLeft &&
    `padding-left: ${getSpacingValue(props.paddingLeft, spacingUnit)}`};
${props.paddingVertical &&
    `
  padding-top: ${getSpacingValue(props.paddingVertical, spacingUnit)};
  padding-bottom: ${getSpacingValue(props.paddingVertical, spacingUnit)};
  `};
${props.paddingHorizontal &&
    setResponsiveNoPaddingHorizontal(
      props.paddingHorizontal,
      spacingUnit,
      props.responsiveNoPaddingHorizontal,
      props.responsizePaddingHorizontal
    )};
  
${props.marginTop &&
    `margin-top: ${getSpacingValue(props.marginTop, spacingUnit)}`};
${props.marginRight &&
    `margin-right: ${getSpacingValue(props.marginRight, spacingUnit)}`};
${props.marginBottom &&
    `margin-bottom: ${getSpacingValue(props.marginBottom, spacingUnit)}`};
${props.marginLeft &&
    `margin-left: ${getSpacingValue(props.marginLeft, spacingUnit)}`};
${props.marginVertical &&
    `
  margin-top: ${getSpacingValue(props.marginVertical, spacingUnit)};
  margin-bottom: ${getSpacingValue(props.marginVertical, spacingUnit)};
  `};
${props.marginHorizontal &&
    `
  margin-right: ${getSpacingValue(props.marginHorizontal, spacingUnit)};
  margin-left: ${getSpacingValue(props.marginHorizontal, spacingUnit)};
  `};

${props.border &&
    `border: 1px solid ${colors[props.borderColor || "lightGrey"]}`};
${props.borderTop && `border-top: 1px solid ${colors.lightGrey}`};
${props.borderRight && `border-right: 1px solid ${colors.lightGrey}`};
${props.borderBottom && `border-bottom: 1px solid ${colors.lightGrey}`};
${props.borderLeft && `border-left: 1px solid ${colors.lightGrey}`};
${props.borderRadius && `border-radius: ${borderRadius}px`};
${props.borderTopRightRadius && `border-top-right-radius: ${borderRadius}px`};
${props.borderBottomRightRadius &&
    `border-bottom-right-radius: ${borderRadius}px`};
${props.borderTopLeftRadius && `border-top-left-radius: ${borderRadius}px`};
${props.borderBottomLeftRadius &&
    `border-bottom-left-radius: ${borderRadius}px`};
    
${props.overflow && `overflow: ${props.overflow}`};
${props.position && `position: ${props.position}`};
${
    typeof props.top === "number"
      ? `top: ${getSpacingValue(props.top, spacingUnit)}`
      : null
  };
${
    typeof props.right === "number"
      ? `right: ${getSpacingValue(props.right, spacingUnit)}`
      : null
  };
${
    typeof props.bottom === "number"
      ? `bottom: ${getSpacingValue(props.bottom, spacingUnit)}`
      : null
  };
${
    typeof props.left === "number"
      ? `left: ${getSpacingValue(props.left, spacingUnit)}`
      : null
  };

${props.clickable && `cursor: pointer`};
${props.textNotSelectable && `user-select: none`}
`;
};

export default generateCommonProps;
