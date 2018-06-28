// @flow
// vendor
import React from 'react';
// custom
import { borderRadius, colors } from '../constants/ui';

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
