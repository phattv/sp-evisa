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
    const { header } = this.props;
    return (
      <Text size="xl" black color="visaBlue" paddingBottom={8}>
        {header}
      </Text>
    );
  }
}

export default BlockHeader;
