// @flow
// vendor
import React from 'react';
// custom
import { Anchor, Flexbox, Text } from '../components/ui';
import ContentMaxWidth from '../components/ContentMaxWidth';
import Card from '../components/Card';
import Divider from '../components/Divider';
import { pageNames, spacingValues } from '../constants/ui';

/**
 * FeesCard show cards with a background image
 */
type Props = {};
type State = {};

class FeesCard extends React.Component<Props, State> {
  render() {
    return (
      <ContentMaxWidth backgroundImage="url('../static/images/bg-airport.jpg')">
        <Flexbox paddingVertical={spacingValues.blockPaddingTop} width="100%">
          <Card flex={1} marginHorizontal={5}>
            <Text fontSize="m" semibold>
              Get your approval letter
            </Text>
            <Divider />
            <Text paddingTop={6}>
              <Text semibold>Visa service fee:</Text> Applicants have to pay for
              the visa processing conducting by evisa-vn.com to get the visa
              approval letter according to the service chosen.
            </Text>
            <Text paddingTop={2}>
              <Text semibold>Stamping fee:</Text> Applicants must pay in cash
              (in VND or USD) at the landing visa counter on arrival. The fee is
              ruled by Immigration Department and publicly announces on
              governmental websites. Applicants will get the receipt after
              paying for the fee.
            </Text>
            <Flexbox paddingTop={4}>
              <Anchor href={pageNames.fees} changeBackground>
                <Text color="green" fontSize="m" bold paddingHorizontal={1}>
                  More info >
                </Text>
              </Anchor>
            </Flexbox>
          </Card>
          <Flexbox flex={1} />
          <Flexbox flex={1} />
        </Flexbox>
      </ContentMaxWidth>
    );
  }
}

export default FeesCard;
