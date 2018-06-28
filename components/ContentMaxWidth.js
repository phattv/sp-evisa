// @flow
// vendor
import React from 'react';
import type { Node } from 'react';
// custom
import { Flexbox } from './ui';
import { contentMaxWidth } from '../constants/ui';

/**
 * ContentMaxWidth component as a container for the content part,
 * limits the content inside a max-width,
 * set "backgroundImage" prop to set full width background image.
 */
type Props = {
  backgroundImage?: string,
  children: Node,
};
type State = {};
class ContentMaxWidth extends React.Component<Props, State> {
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
        <Flexbox
          width="100%"
          justifyContent="center"
          maxWidth={contentMaxWidth}
          style={{ margin: 'auto' }}
        >
          {children}
        </Flexbox>
      </Flexbox>
    ) : (
      <Flexbox
        width="100%"
        justifyContent="center"
        maxWidth={contentMaxWidth}
        style={{ margin: 'auto' }}
      >
        {children}
      </Flexbox>
    );
  }
}

export default ContentMaxWidth;
