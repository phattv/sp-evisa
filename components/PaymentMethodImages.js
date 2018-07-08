// @flow
// vendor
import React from 'react';
// custom
import { Flexbox, Image, Text } from './ui';
import ContentMaxWidth from './ContentMaxWidth';

/**
 * PaymentMethodImages show accepted payment methods
 */
type Props = {};
type State = {};
class PaymentMethodImages extends React.Component<Props, State> {
  render() {
    return (
      <ContentMaxWidth>
        <Flexbox column alignItems="center" paddingTop={16}>
          <Text paddingBottom={6} textAlign="center">
            We accept many different online payment gateways.
          </Text>
          <Image
            src="../static/icons/payment-methods.svg"
            alt="payment methods"
            paddingHorizontal={2}
          />
        </Flexbox>
      </ContentMaxWidth>
    );
  }
}

export default PaymentMethodImages;
