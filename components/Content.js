// @flow
// Vendor
import * as React from 'react';
// Custom
import { Flexbox } from '../components/ui';

type Props = {
  id?: string,
  backgroundColor?: string,
  children?: string | React.Node,
};

export default class Content extends React.Component<Props> {
  render() {
    const { id, backgroundColor, children, ...rest } = this.props;

    return (
      <Flexbox width="100%" backgroundColor={backgroundColor || null} {...rest}>
        <Flexbox
          maxWidth={288}
          paddingVertical={18}
          paddingHorizontal={5}
          responsivePaddingHorizontal
          width="100%"
        >
          {children}
        </Flexbox>
      </Flexbox>
    );
  }
}
