// @flow
// vendor
import * as React from 'react';
// custom
import { Text } from './ui';

type Props = {
  header: string,
  smallPadding?: boolean,
};
class BlockHeader extends React.Component<Props> {
  render() {
    const { header, smallPadding, ...rest } = this.props;
    return (
      <Text
        size="xl"
        black
        textAlign="center"
        color="visaBlue"
        paddingBottom={smallPadding ? 4 : 8}
        {...rest}
      >
        {header}
      </Text>
    );
  }
}

export default BlockHeader;
