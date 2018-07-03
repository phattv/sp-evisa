// @flow
// vendor
import React, { Fragment } from 'react';
import { logPageView } from '../utils/analytics';
import Router from 'next/router';
// custom
import { Flexbox, Text, Image, Button } from '../components/ui';
import ContentMaxWidth from '../components/ContentMaxWidth';
import Card from '../components/Card';
import Divider from '../components/Divider';
import Heading from '../components/Heading';
import FeesCard from '../components/FeesCard';
import ServicesCard from '../components/ServicesCard';
import PaymentMethodImages from '../components/PaymentMethodImages';
import {
  paddingAll,
  pageNames,
  spacingValues,
  iconSizes,
} from '../constants/ui';

type Props = {};
type State = {};
class Home extends React.Component<Props, State> {
  componentDidMount() {
    logPageView();
  }

  navigateApplyPage = () => {
    Router.push(pageNames.apply);
  };

  render() {
    return (
      <Fragment>
        <ContentMaxWidth backgroundImage="url('../static/images/bg-banner.jpg')">
          <Flexbox paddingTop={spacingValues.blockPaddingTop} responsiveLayout>
            <Flexbox flex={1} column {...paddingAll}>
              <Heading
                color="white"
                text="Easiest way to get your Vietnam Visa."
                textAlign="left"
              />
              <Text color="white" paddingBottom={7}>
                Visa application can be intimidate to everyone and bothersome to
                even the most seasoned travelers. If you are traveling to
                Vietnam, let evisa-vn take care of all the hassles. Get your
                visa in just 3 simple steps with evisa-vn, so you would have
                more time planning your trips.
              </Text>
              <Button onClick={this.navigateApplyPage}>Get Started</Button>
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
            <Flexbox paddingBottom={3} column>
              <Heading text="Fast, Cheap and Simple" />
              <Heading text="3 steps to get your Visa" secondary />
            </Flexbox>
            <Flexbox responsiveLayout>
              <Card flex={1}>
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
              <Card flex={1}>
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
              <Card flex={1}>
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

        <FeesCard />

        <ContentMaxWidth>
          <Flexbox
            paddingVertical={spacingValues.blockPaddingTop}
            column
            width="100%"
          >
            <Heading text="Why choose us?" />
            <Card>
              <Flexbox responsiveLayout>
                <Flexbox flex={1} column marginHorizontal={5}>
                  <Flexbox>
                    <Image
                      src="../static/icons/development.svg"
                      alt="development"
                      width={iconSizes.default}
                    />
                  </Flexbox>
                  <Text fontSize="m" semibold>
                    Prompt response, strictly confidential information
                  </Text>
                  <Divider small />
                  <Text paddingTop={6}>
                    You will get responses within 5 minutes when contacting
                    evisa-vn.com Your information is kept confidentially
                  </Text>
                </Flexbox>
                <Flexbox flex={1} column marginHorizontal={5}>
                  <Flexbox>
                    <Image
                      src="../static/icons/medal.svg"
                      alt="medal"
                      width={iconSizes.default}
                    />
                  </Flexbox>
                  <Text fontSize="m" semibold>
                    Quality and reliability
                  </Text>
                  <Divider small />
                  <Text paddingTop={6}>
                    Evisa-vn.com is trusted by clients from all over the world.
                    We guarantee to return all your fee in case your application
                    is rejected.
                  </Text>
                </Flexbox>
                <Flexbox flex={1} column marginHorizontal={5}>
                  <Flexbox>
                    <Image
                      src="../static/icons/stopwatch.svg"
                      alt="stopwatch"
                      width={iconSizes.default}
                    />
                  </Flexbox>
                  <Text fontSize="m" semibold>
                    Punctuality guarantee and full-fee return
                  </Text>
                  <Divider small />
                  <Text paddingTop={6}>
                    We guarantee you will get your visa approval letter within 2
                    working days/or within 1 working day depending on the
                    services chosen. You get all-your- fee return if your
                    application is rejected and our services do not satisfy your
                    demands.
                  </Text>
                </Flexbox>
              </Flexbox>
              <Button marginTop={8} onClick={this.navigateApplyPage}>
                Get Started
              </Button>
            </Card>
          </Flexbox>
        </ContentMaxWidth>

        <ServicesCard />

        <PaymentMethodImages />
      </Fragment>
    );
  }
}

export default Home;
