// @flow
// vendor
import React from 'react';
import type { Node } from 'react';
// custom
import { Flexbox } from '../components/ui';
import Header from './Header';
import Footer from './Footer';

/**
 * Layout component layouts where and how the header, content and footer show
 */
type Props = {
  children: Node,
};
class Layout extends React.Component<Props> {
  render() {
    const { children } = this.props;

    return (
      <Flexbox>
        <Flexbox column flex={1} minHeight="100vh" backgroundColor="bgGrey">
          <Header />

          <Flexbox flex={1} width="100%">
            <Flexbox width="100%" column alignItems="center">
              {children}
            </Flexbox>
          </Flexbox>

          <Footer />
        </Flexbox>
      </Flexbox>
    );
  }
}

export default Layout;
