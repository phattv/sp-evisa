// @flow
// vendor
import React from 'react';
import Router from 'next/router';
// custom
import ContentMaxWidth from '../components/ContentMaxWidth';
import Heading from '../components/Heading';
import { Button, Flexbox, Image, Text } from '../components/ui';
import {
  iconSizes,
  pageNames,
  spacingValues,
  textMaxWidth,
} from '../constants/ui';
import { logPageView } from '../utils/analytics';

/**
 * ThankYou shows after payment is successful
 */
type Props = {};
type State = {};

class ThankYou extends React.Component<Props, State> {
  navigateToHome = () => Router.push(pageNames.home);

  componentDidMount() {
    logPageView();
  }

  render() {
    return (
      <ContentMaxWidth>
        <Flexbox
          paddingVertical={spacingValues.blockPaddingTop}
          maxWidth={textMaxWidth}
          column
          alignItems="center"
          width="100%"
        >
          <Flexbox alignItems="center">
            <Image
              src="../static/icons/tick-icon.svg"
              width={iconSizes.small}
            />
            <Text
              paddingLeft={2}
              fontSize="xl"
              color="green"
              textAlign="center"
            >
              Payment Successful!
            </Text>
          </Flexbox>
          <Text fontSize="l" textAlign="center" noDoubleLineHeight>
            Thank you, we have received your application and payment
          </Text>
          <Flexbox
            marginTop={5}
            paddingHorizontal={5}
            paddingVertical={5}
            backgroundColor="bgGrey2"
            column
            boxShadow
          >
            <Text>Here's what will happen next:</Text>
            <Text>
              1. Please check your inbox for our email and follow the
              instructions to confirm.
            </Text>
            <Text>
              2. Our customer service agent will respond personally to you by
              the end of the next working day or usually much sooner.
            </Text>
            <Button
              marginTop={5}
              margin="auto"
              onClick={this.navigateToHome}
              backgroundColor="mediumBlue"
            >
              Back to Home
            </Button>
          </Flexbox>
        </Flexbox>
      </ContentMaxWidth>
    );
  }
}

export default ThankYou;
