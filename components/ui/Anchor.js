// @flow
import styled from 'styled-components';
import { colors } from '../../constants/ui';
import Link from 'next/link';

const Anchor = styled(Link).attrs({
  prefetch: true,
})`
  text-decoration: none;
  g: ${props => colors[props.color || 'darkGrey']};
  &:hover {
    color: ${props => colors[props.activeColor || 'visaRed']};
  }
  &.active {
    color: ${props => colors[props.activeColor || 'visaRed']};
  }
`;

export default Anchor;
