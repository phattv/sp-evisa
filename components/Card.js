// @flow
// vendor
import React from 'react';
import type { Node } from 'react';
// custom
import { Flexbox } from './ui';
import { borderRadius } from '../constants/ui';

type Props = {
  children: Node,
};
type State = {};

class Card extends React.Component<Props, State> {
  render() {
    const { children, ...rest } = this.props;
    return (
      <Flexbox
        column
        backgroundColor="white"
        paddingHorizontal={6}
        paddingVertical={6}
        borderRadius={borderRadius}
        style={{
          boxShadow: '8px 8px 40px 0 rgba(91, 108, 148, 0.2)',
        }}
        {...rest}
      >
        {children}
      </Flexbox>
    );
  }
}

export default Card;
