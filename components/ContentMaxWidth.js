// @flow
// vendor
import React from 'react';
import type { Node } from 'react';
// custom
import { Flexbox } from './ui';
import { contentMaxWidth } from '../constants/ui';

type Props = {
  children: Node,
};
type State = {};
class ContentMaxWidth extends React.Component<Props, State> {
  render() {
    const { children } = this.props;
    return (
      <Flexbox
        width={'100%'}
        maxWidth={contentMaxWidth}
        style={{ margin: 'auto' }}
      >
        {children}
      </Flexbox>
    );
  }
}

export default ContentMaxWidth;
