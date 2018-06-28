// @flow
// vendor
import React, { Fragment } from 'react';
import { logPageView } from '../utils/analytics';
import Router from 'next/router';
// custom
import { Anchor, Flexbox, Text, Image, Button } from '../components/ui';
import {
  paddingAll,
  pageNames,
  spacingValues,
  iconSizes,
} from '../constants/ui';
import Card from '../components/Card';
import ContentMaxWidth from '../components/ContentMaxWidth';
import Divider from '../components/Divider';

type Props = {};
type State = {};

class Home extends React.Component<Props, State> {
  static defaultProps: Props = {};

  state = {};

  componentDidMount() {
    logPageView();
  }

  navigateToHowToApply = () => {
    Router.push(pageNames.apply);
  };

  render() {
    return (
      <Fragment>
        <ContentMaxWidth backgroundImage="url('../static/images/bg-banner.jpg')">
          <Flexbox paddingTop={spacingValues.blockPaddingTop} responsiveLayout>
            <Flexbox flex={1} column {...paddingAll}>
              <Text
                bold
                color="white"
                fontSize="xxl"
                paddingBottom={8}
                noDoubleLineHeight
              >
                Easiest way to get your Visa.
              </Text>
              <Text color="white" paddingBottom={7}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </Text>
              <Button onClick={this.navigateToHowToApply}>Get Started</Button>
            </Flexbox>
            <Flexbox flex={1} column paddingHorizontal={5} paddingTop={5}>
              <Image
                src="../static/images/right-banner.png"
                alt="right banner"
              />
            </Flexbox>
          </Flexbox>
        </ContentMaxWidth>

        <ContentMaxWidth>
          <Flexbox
            paddingVertical={spacingValues.blockPaddingTop}
            column
            width="100%"
          >
            <Text
              bold
              fontSize="xxl"
              paddingBottom={2}
              noDoubleLineHeight
              color="darkBlue"
              textAlign={'center'}
            >
              Fast, Cheap and Simple
            </Text>
            <Text
              fontSize="xxl"
              paddingBottom={8}
              color="darkBlue"
              textAlign={'center'}
            >
              3 steps to get your Visa
            </Text>
            <Flexbox responsiveLayout>
              <Card flex={1} marginHorizontal={5}>
                <Flexbox>
                  <Image
                    src="../static/icons/step-1.svg"
                    alt="step-1"
                    width={iconSizes.default}
                  />
                </Flexbox>
                <Text fontSize="m" semibold>
                  Submit your application
                </Text>
                <Divider />
                <Text paddingTop={6}>
                  Fill in the secured online application online. You are
                  required to enter the precise personal information which
                  appears on your passport.
                </Text>
              </Card>
              <Card flex={1} marginHorizontal={5}>
                <Flexbox>
                  <Image
                    src="../static/icons/step-2.svg"
                    alt="step-2"
                    width={iconSizes.default}
                  />
                </Flexbox>
                <Text fontSize="m" semibold>
                  Pay for service fee
                </Text>
                <Divider />
                <Text paddingTop={6}>
                  You can make payment with your Credit/ Debit Card via
                  OnePay/PayPal or pay via Western Union
                </Text>
                <Flexbox paddingTop={4}>
                  <Image
                    src="../static/icons/shield-ico.svg"
                    alt="shield"
                    width={iconSizes.small}
                  />
                  <Text paddingLeft={2}>Money-back guarantee</Text>
                </Flexbox>
              </Card>
              <Card flex={1} marginHorizontal={5}>
                <Flexbox>
                  <Image
                    src="../static/icons/step-3.svg"
                    alt="step-3"
                    width={iconSizes.default}
                  />
                </Flexbox>
                <Text fontSize="m" semibold>
                  Get your approval letter
                </Text>
                <Divider />
                <Text paddingTop={6}>
                  Check your email for your visa approval letter. Print the
                  documents out and fill in the entry and exit form. Prepare 2
                  passport sized photos (4x6cm) and stamping fee which is $25
                  for single entry or $50 for multiple entry visa
                </Text>
              </Card>
            </Flexbox>
          </Flexbox>
        </ContentMaxWidth>

        <ContentMaxWidth backgroundImage="url('../static/images/bg-airport.jpg')">
          <Flexbox paddingVertical={spacingValues.blockPaddingTop} width="100%">
            <Card flex={1} marginHorizontal={5}>
              <Text fontSize="m" semibold>
                Get your approval letter
              </Text>
              <Divider />
              <Text paddingTop={6}>
                <Text semibold>Visa service fee:</Text> Applicants have to pay
                for the visa processing conducting by evisa-vn.com to get the
                visa approval letter according to the service chosen.
              </Text>
              <Text paddingTop={2}>
                <Text semibold>Stamping fee:</Text> Applicants must pay in cash
                (in VND or USD) at the landing visa counter on arrival. The fee
                is ruled by Immigration Department and publicly announces on
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
      </Fragment>
    );
  }
}

export default Home;
