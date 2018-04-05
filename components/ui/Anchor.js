// @flow
// vendor
import * as React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
// custom
import { colors } from '../../constants/ui';

const StyledLink = styled.a`
  text-decoration: none;
  color: ${props => colors[props.color || 'visaBlue']};
  &:hover {
    color: ${props => colors[props.activeColor || 'visaRed']};
  }
  &.active {
    color: ${props => colors[props.activeColor || 'visaRed']};
  }
`;

type Props = {
  href: string,
  children: string | React.Node,
};
class Anchor extends React.Component<Props> {
  render() {
    const { href, children, ...rest } = this.props;
    return (
      <Link prefetch passHref href={href} scroll>
        <StyledLink {...rest}>{children}</StyledLink>
      </Link>
    );
  }
}

export default Anchor;
