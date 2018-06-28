// @flow
// vendor
import * as React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
// custom
import { colors } from '../../constants/ui';

const StyledLink = styled.a`
  text-decoration: none;
  color: ${props => colors[props.color || 'green']};
  &:hover {
    color: ${props => colors[props.activeColor || 'red']};
    ${props =>
      props.changeBackground &&
      `background-color: ${colors[props.backgroundColor || 'bgGrey2']}`};
  }
  &.active {
    color: ${props => colors[props.activeColor || 'red']};
  }
`;

/**
 * Anchor component acts as <a> tag with customizable styles,
 * set "prefetch" prop to true for maximum performance on production
 */
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
