// @flow
import {
  borderRadius,
  colors,
  fontSizes,
  spacingUnits,
} from '../../constants/ui';

// <editor-fold desc="Helper functions">
/**
 * Implementation of unit * spacingUnit (based on screen size)
 * @param unit
 * @param spacingUnit
 * @param halve
 * @returns {string}
 */
export const getSpacingValue = (
  unit: number,
  spacingUnit: number,
  halve?: boolean,
) => `${halve ? unit * spacingUnit / 2 : unit * spacingUnit}px`;

/**
 * Standardize metric props:
 * If input is a number, apply spacingUnit constant based on screen size,
 * else return the original input
 * e.g.:
 * - input is 5
 * - on desktop screen  => spacingUnit is 5 => returns 25
 * - on tablet screen   => spacingUnit is 4 => returns 20
 * - on tablet screen   => spacingUnit is 3 => returns 15
 * @param prop
 * @param spacingUnit
 * @returns {string}
 */
export const standardizeMetricProp = (
  prop: number | string,
  spacingUnit: number,
) => (typeof prop === 'number' ? getSpacingValue(prop, spacingUnit) : prop);

/**
 * Set font size for different screen sizes:
 * there's a set of font sizes for desktop,
 * on tablet layout: desktop font size -1px,
 * on mobile layout: desktop font size -2px.
 * @param fontSize
 * @param spacingUnit
 * @param noDoubleLineHeight
 * @returns {string}
 */
const setResponsiveFontSize = (
  fontSize?: string,
  spacingUnit: number,
  noDoubleLineHeight?: boolean,
): string => {
  let actualFontSize;
  switch (spacingUnit) {
    case spacingUnits.desktop: {
      actualFontSize = fontSizes[fontSize || 'default'];
      break;
    }
    case spacingUnits.tablet: {
      actualFontSize = fontSizes[fontSize || 'default'] - 1;
      break;
    }
    case spacingUnits.mobile: {
      actualFontSize = fontSizes[fontSize || 'default'] - 2;
      break;
    }
    default: {
      actualFontSize = fontSizes.default;
      break;
    }
  }

  return `font-size: ${actualFontSize}px;line-height: ${
    noDoubleLineHeight ? actualFontSize * 1.25 : actualFontSize * 2
  }px;`;
};

/**
 * Set padding-left & padding-right for some edge cases on mobile screen:
 * - if responsiveNoPaddingHorizontal prop is true, set no padding-left & padding-right
 * - if responsivePaddingHorizontal props is true, reduce padding-left & padding-right by half
 * @param paddingHorizontal
 * @param spacingUnit
 * @param responsiveNoPaddingHorizontal
 * @param responsivePaddingHorizontal
 * @returns {*}
 */
const setResponsiveNoPaddingHorizontal = (
  paddingHorizontal: number,
  spacingUnit: number,
  responsiveNoPaddingHorizontal?: boolean,
  responsivePaddingHorizontal?: boolean,
) => {
  if (spacingUnit === spacingUnits.mobile) {
    if (responsiveNoPaddingHorizontal) {
      return '';
    } else {
      if (responsivePaddingHorizontal) {
        return `padding-right: ${getSpacingValue(
          paddingHorizontal,
          spacingUnit,
          true,
        )};padding-left: ${getSpacingValue(
          paddingHorizontal,
          spacingUnit,
          true,
        )};`;
      }
    }
  }

  return `padding-right: ${getSpacingValue(
    paddingHorizontal,
    spacingUnit,
  )};padding-left: ${getSpacingValue(paddingHorizontal, spacingUnit)};`;
};
// </editor-fold>

/**
 * Generate common css properties as string
 * @param props
 * @param spacingUnit
 * @returns {string}
 */
export const generateCommonProps = (
  props: Object,
  spacingUnit: number,
): string => {
  let styleString = `
${setResponsiveFontSize(props.fontSize, spacingUnit, props.noDoubleLineHeight)}

${
    props.backgroundColor
      ? `background-color: ${colors[props.backgroundColor]};`
      : ''
  }

${
    !props.fixedWidth && props.width
      ? `width: ${standardizeMetricProp(props.width, spacingUnit)};`
      : ''
  }
${
    props.minWidth
      ? `min-width: ${standardizeMetricProp(props.minWidth, spacingUnit)};`
      : ''
  }
${
    props.maxWidth
      ? `max-width: ${
          props.responsiveLayout
            ? '100%'
            : standardizeMetricProp(props.maxWidth, spacingUnit)
        };`
      : ''
  }

${
    props.height
      ? `height: ${standardizeMetricProp(props.height, spacingUnit)};`
      : ''
  }
${
    props.minHeight
      ? `min-height: ${standardizeMetricProp(props.minHeight, spacingUnit)};`
      : ''
  }
${
    props.maxHeight
      ? `max-height: ${standardizeMetricProp(props.maxHeight, spacingUnit)};`
      : ''
  }

${
    props.paddingTop
      ? `padding-top: ${getSpacingValue(props.paddingTop, spacingUnit)};`
      : ''
  }
${
    props.paddingRight
      ? `padding-right: ${getSpacingValue(props.paddingRight, spacingUnit)};`
      : ''
  }
${
    props.paddingBottom
      ? `padding-bottom: ${getSpacingValue(props.paddingBottom, spacingUnit)};`
      : ''
  }
${
    props.paddingLeft
      ? `padding-left: ${getSpacingValue(props.paddingLeft, spacingUnit)};`
      : ''
  }
${
    props.paddingVertical
      ? `padding-top: ${getSpacingValue(
          props.paddingVertical,
          spacingUnit,
        )};padding-bottom: ${getSpacingValue(
          props.paddingVertical,
          spacingUnit,
        )};`
      : ''
  }
${
    props.paddingHorizontal
      ? setResponsiveNoPaddingHorizontal(
          props.paddingHorizontal,
          spacingUnit,
          props.responsiveNoPaddingHorizontal,
          props.responsivePaddingHorizontal,
        )
      : ''
  }
  
${
    props.marginTop
      ? `margin-top: ${getSpacingValue(props.marginTop, spacingUnit)};`
      : ''
  }
${
    props.marginRight
      ? `margin-right: ${getSpacingValue(props.marginRight, spacingUnit)};`
      : ''
  }
${
    props.marginBottom
      ? `margin-bottom: ${getSpacingValue(props.marginBottom, spacingUnit)};`
      : ''
  }
${
    props.marginLeft
      ? `margin-left: ${getSpacingValue(props.marginLeft, spacingUnit)};`
      : ''
  }
${
    props.marginVertical
      ? `margin-top: ${getSpacingValue(
          props.marginVertical,
          spacingUnit,
        )};margin-bottom: ${getSpacingValue(
          props.marginVertical,
          spacingUnit,
        )};`
      : ''
  }
${
    props.marginHorizontal
      ? `margin-right: ${getSpacingValue(
          props.marginHorizontal,
          spacingUnit,
        )};margin-left: ${getSpacingValue(
          props.marginHorizontal,
          spacingUnit,
        )};`
      : ''
  }

${
    props.border
      ? `border: ${props.borderWidth || 1}px solid ${
          colors[props.borderColor || 'darkBlue']
        };`
      : ''
  }
${
    props.borderTop
      ? `border-top: ${props.borderWidth || 1}px solid ${
          colors[props.borderColor || 'darkBlue']
        };`
      : ''
  }
${
    props.borderRight
      ? `border-right: ${props.borderWidth || 1}px solid ${
          colors[props.borderColor || 'darkBlue']
        };`
      : ''
  }
${
    props.borderBottom
      ? `border-bottom: ${props.borderWidth || 1}px solid ${
          colors[props.borderColor || 'darkBlue']
        };`
      : ''
  }
${
    props.borderLeft
      ? `border-left: ${props.borderWidth || 1}px solid ${
          colors[props.borderColor || 'darkBlue']
        };`
      : ''
  }
${props.borderRadius ? `border-radius: ${props.borderRadius}px;` : ''}

${props.overflow ? `overflow: ${props.overflow};` : ''}
${props.position ? `position: ${props.position};` : ''}
${
    typeof props.top === 'number'
      ? `top: ${getSpacingValue(props.top, spacingUnit)};`
      : ''
  }
${
    typeof props.right === 'number'
      ? `right: ${getSpacingValue(props.right, spacingUnit)};`
      : ''
  }
${
    typeof props.bottom === 'number'
      ? `bottom: ${getSpacingValue(props.bottom, spacingUnit)};`
      : ''
  }
${
    typeof props.left === 'number'
      ? `left: ${getSpacingValue(props.left, spacingUnit)};`
      : ''
  }

${
    props.clickable
      ? `cursor: pointer;
&:hover {
  background-color: ${colors[props.hoverBackgroundColor || 'bgGrey2']}
}`
      : ''
  }
${props.textNotSelectable ? `user-select: none;` : ''}`;

  return styleString.replace(/\n/g, '');
};

export default generateCommonProps;
