// @flow
// vendor
import React from 'react';
import type { Node } from 'react';
// custom
import { Flexbox } from './ui';
import { borderRadius } from '../constants/ui';

/**
 * Card component is a pre-styled container, mostly to show text and icons.
 */
type Props = {
  children: Node,
  flexDirection?: string,
};
type State = {};

class Card extends React.Component<Props, State> {
  static defaultProps = {
    flexDirection: 'column',
  };

  render() {
    const { children, flexDirection, ...rest } = this.props;
    const flexDirectionStyles = {
      row: flexDirection === 'row',
      column: flexDirection === 'column',
    };

    return (
      <Flexbox
        {...flexDirectionStyles}
        backgroundColor="white"
        paddingHorizontal={6}
        paddingVertical={6}
        marginVertical={6}
        marginHorizontal={6}
        borderRadius={borderRadius}
        boxShadow
        {...rest}
      >
        {children}
      </Flexbox>
    );
  }
}

export default Card;
