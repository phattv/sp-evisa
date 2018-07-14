// @flow
// vendor
import React from 'react';
import Router from 'next/router';
// custom
import ContentMaxWidth from '../components/ContentMaxWidth';
import { Button, Flexbox, Text } from '../components/ui';
import {
  boxShadow,
  pageNames,
  spacingValues,
  textMaxWidth,
} from '../constants/ui';
import { companyInfo } from '../constants/companyInfo';
import { logPageView } from '../utils/analytics';
import { openChatBox } from '../utils/crisp';

/**
 * PaymentFailed shows if payment is failed
 */
type Props = {};
type State = {};

class PaymentFailed extends React.Component<Props, State> {
  navigateToApply = () => Router.push(pageNames.apply);

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
          <Flexbox
            marginTop={5}
            paddingHorizontal={5}
            paddingVertical={5}
            backgroundColor="bgGrey2"
            column
            style={{
              boxShadow,
            }}
          >
            <Text fontSize="l" color="red">
              Sorry, your payment failed.
            </Text>
            <Text>
              Please try again,{' '}
              <Text color="green" onClick={openChatBox} clickable>
                give us a chat message
              </Text>{' '}
              or email us at{' '}
              <a href={`mailto:${companyInfo.email}`}>
                <Text color="green" clickable>
                  {companyInfo.email}
                </Text>
              </a>
            </Text>
            <Button
              marginTop={5}
              margin="auto"
              onClick={this.navigateToApply}
              backgroundColor="mediumBlue"
            >
              Try Again
            </Button>
          </Flexbox>
        </Flexbox>
      </ContentMaxWidth>
    );
  }
}

export default PaymentFailed;
