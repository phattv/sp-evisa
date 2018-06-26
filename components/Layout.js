// @flow
// vendor
import * as React from 'react';
// custom
import { Flexbox } from '../components/ui';
import Header from './Header';
import Footer from './Footer';
import { contentMaxWidth } from '../constants/ui';

type Props = {
  children: string | React.Node,
  title?: string,
  backgroundColor?: string,
};

export default class Layout extends React.Component<Props> {
  render() {
    const { children, ...rest } = this.props;

    return (
      <Flexbox {...rest}>
        <Flexbox column flex={1} minHeight="100vh">
          <Header />

          <Flexbox
            maxWidth={contentMaxWidth}
            flex={1}
            width="100%"
            column
            {...rest}
          >
            {children}
          </Flexbox>

          <Footer />
        </Flexbox>
      </Flexbox>
    );
  }
}
