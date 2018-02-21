// @flow
// vendor
import * as React from 'react';
// custom
import { Text } from './ui';

type Props = {
  header: string,
};
class BlockHeader extends React.Component<Props> {
  render() {
    const { header, ...rest } = this.props;
    return (
      <Text
        bold
        size="xxl"
        color="white"
        lineHeight="xxl"
        marginTop={-10}
        letterSpacing={2}
        {...rest}
      >
        {header}
      </Text>
    );
  }
}

export default BlockHeader;
