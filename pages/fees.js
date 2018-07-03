// @flow
// vendor
import React, { Fragment } from 'react';
// custom
import { Flexbox, Image, Text } from '../components/ui';
import { spacingValues, iconSizes } from '../constants/ui';
import ContentMaxWidth from '../components/ContentMaxWidth';
import Card from '../components/Card';
import Divider from '../components/Divider';
import Heading from '../components/Heading';
import FeesCard from '../components/FeesCard';
import ServicesCard from '../components/ServicesCard';
import PaymentMethodImages from '../components/PaymentMethodImages';

/**
 * Fees show all the fees a person must pay to apply visa
 */
type Props = {};
type State = {};
class Fees extends React.Component<Props, State> {
  render() {
    return (
      <Fragment>
        <FeesCard />
        <ContentMaxWidth>
          <Flexbox
            column
            paddingTop={spacingValues.blockPaddingTop}
            alignItems="center"
          >
            <Image
              width={iconSizes.large}
              src="../static/icons/world.svg"
              alt="world icon"
            />
            <Text paddingTop={2} textAlign="center" fontSize="xl">
              Select your country to see the price in details
            </Text>
          </Flexbox>
        </ContentMaxWidth>

        <ServicesCard />

        <PaymentMethodImages />
      </Fragment>
    );
  }
}

export default Fees;
