// @flow
// vendor
import React from 'react';
import type { Node } from 'react';
// custom
import { Flexbox } from '../components/ui';
import Header from './Header';
import Footer from './Footer';

type Props = {
  children: Node,
};

export default class Layout extends React.Component<Props> {
  render() {
    const { children } = this.props;

    return (
      <Flexbox>
        <Flexbox column flex={1} minHeight="100vh">
          <Header />

          <Flexbox flex={1} width="100%" backgroundColor="bgGrey2">
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
