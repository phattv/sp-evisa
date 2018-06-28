// @flow
// vendor
import React from 'react';
// custom
import { Flexbox } from '../components/ui';
import Header from './Header';
import Footer from './Footer';

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

          <Flexbox flex={1} width="100%" backgroundColor="bgGrey2">
            <Flexbox width="100%" {...rest} column alignItems="center">
              {children}
            </Flexbox>
          </Flexbox>

          <Footer />
        </Flexbox>
      </Flexbox>
    );
  }
}
