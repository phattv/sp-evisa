// @flow
import styled from 'styled-components';
import { colors, screenSizes, spacingUnits } from '../../constants/ui';
import { generateCommonProps } from './generateCommonProps';

/**
 * Button component act as a <button> tag with customizable styles.
 */
const Button = styled.button`
  user-select: none;
  border: none;
  cursor: pointer;
  text-align: center;
  font-weight: bold;
  padding: 10px 25px;
  border-top-left-radius: 10px;
  border-bottom-right-radius: 10px;

  ${props => `
color: ${colors[props.color || 'white']};
background-color: ${colors[props.backgroundColor || 'red']};
        
&:hover {
  background-color: ${colors[props.color || 'darkRed']};
}
`};

  @media only screen and (min-width: ${screenSizes.desktop}px) {
    ${props => generateCommonProps(props, spacingUnits.desktop)};
  }

  @media only screen and (min-width: ${screenSizes.tablet}px) and (max-width: ${screenSizes.desktop -
      1}px) {
    ${props => generateCommonProps(props, spacingUnits.tablet)};
  }

  @media only screen and (max-width: ${screenSizes.tablet - 1}px) {
    ${props => generateCommonProps(props, spacingUnits.mobile)};
  }
`;

export default Button;
