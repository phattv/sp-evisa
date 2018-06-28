// @flow
// vendor
import React from 'react';
// custom
import { borderRadius, colors } from '../constants/ui';

type Props = {};
type State = {};

class Divider extends React.Component<Props, State> {
  render() {
    return (
      <div
        style={{
          height: 5,
          width: 112,
          borderRadius: borderRadius,
          backgroundColor: colors.green,
        }}
      />
    );
  }
}

export default Divider;
