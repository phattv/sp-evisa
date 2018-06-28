// @flow
// vendor
import React from 'react';
// custom
import { borderRadius, colors } from '../constants/ui';

/**
 * Divider component acts as a fixed width and height line that is 5px tall,
 * set "small" prop to true to set shorter width.
 */
type Props = {
  small?: boolean,
};
type State = {};
class Divider extends React.Component<Props, State> {
  render() {
    const { small } = this.props;
    return (
      <div
        style={{
          height: 5,
          width: small ? 60 : 112,
          borderRadius: borderRadius,
          backgroundColor: colors.green,
        }}
      />
    );
  }
}

export default Divider;
