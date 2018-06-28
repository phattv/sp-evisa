// @flow
// vendor
import React from 'react';
import type { Node } from 'react';
// custom
import { Flexbox } from './ui';
import ContentMaxWidth from './ContentMaxWidth';

type Props = {
  backgroundImage?: string,
  children: Node,
};
type State = {};

class FullWidthBackgroundContainer extends React.Component<Props, State> {
  render() {
    const { backgroundImage, children } = this.props;
    return backgroundImage ? (
      <Flexbox
        width="100%"
        style={{
          backgroundImage,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <ContentMaxWidth>{children}</ContentMaxWidth>
      </Flexbox>
    ) : (
      <ContentMaxWidth>{children}</ContentMaxWidth>
    );
  }
}

export default FullWidthBackgroundContainer;
