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
 * FeesCard show fees as Card layout with a background image
 */
type Props = {};
type State = {
  shouldShowMoreInfoButton: boolean,
};

class FeesCard extends React.Component<Props, State> {
  state = {
    shouldShowMoreInfoButton: false,
  };
  componentDidMount() {
    const shouldShowMoreInfoButton = !window.location.pathname.includes(
      pageNames.fees,
    );
    this.setState({ shouldShowMoreInfoButton });
  }

  render() {
    const { shouldShowMoreInfoButton } = this.state;

    return (
      <ContentMaxWidth backgroundImage="url('../static/images/bg-airport.jpg')">
        <Flexbox width="100%">
          <Card flex={1}>
            <Text fontSize="m" semibold>
              Fees you have to pay
            </Text>
            <Divider />
            <Text paddingTop={6}>
              <Text semibold>Service fee</Text> is paid online to evisa-vn.com
              which is the service fee for the process of getting the visa
              approval letter. You use the letter to get Vietnam visa stamp at
              the airports.
            </Text>
            <Text paddingTop={2}>
              <Text semibold>Stamping fee</Text> is paid in cash (USD) at the
              landing visa counter at the arrival airport. It costs{' '}
              <Text semibold>25 USD for a single entry visa</Text> and{' '}
              <Text semibold>50 USD for a multiple visa</Text>.
            </Text>

            {shouldShowMoreInfoButton && (
              <Flexbox paddingTop={4}>
                <Anchor href={pageNames.fees} changeBackground>
                  <Text color="green" fontSize="m" bold paddingHorizontal={1}>
                    More info >
                  </Text>
                </Anchor>
              </Flexbox>
            )}
          </Card>
          <Flexbox flex={1} />
          <Flexbox flex={1} />
        </Flexbox>
      </ContentMaxWidth>
    );
  }
}

export default FeesCard;
