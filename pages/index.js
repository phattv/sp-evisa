// @flow
// vendor
import React, { Fragment } from 'react';
import { logPageView } from '../utils/analytics';
import Router from 'next/router';
// custom
import { Button, Flexbox, Image, Text } from '../components/ui';
import ContentMaxWidth from '../components/ContentMaxWidth';
import Card from '../components/Card';
import Divider from '../components/Divider';
import Heading from '../components/Heading';
import FeesCard from '../components/FeesCard';
import ServicesCard from '../components/ServicesCard';
import PaymentMethodImages from '../components/PaymentMethodImages';
import {
  iconSizes,
  paddingAll,
  pageNames,
  spacingValues,
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
              <Button onClick={this.navigateApplyPage}>Apply Now!</Button>
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
            <Heading text="Why evisa-vn?" />
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
                    24/7 customer service
                  </Text>
                  <Divider small />
                  <Text paddingTop={6}>
                    We reply to all enquiries within 5 minutes.
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
                    Confidentiality
                  </Text>
                  <Divider small />
                  <Text paddingTop={6}>
                    All information provided to us will be kept confidential and
                    secured.
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
                    Reliability
                  </Text>
                  <Divider small />
                  <Text paddingTop={6}>
                    All applications will be processed in 1 working day or less.
                  </Text>
                </Flexbox>
              </Flexbox>
            </Card>
          </Flexbox>
        </ContentMaxWidth>

        <ContentMaxWidth>
          <Flexbox column alignItems="center">
            <Flexbox paddingTop={4}>
              <Image
                src="../static/icons/shield-ico.svg"
                alt="shield"
                width={iconSizes.small}
              />
              <Text paddingLeft={2}>Money-back guarantee</Text>
            </Flexbox>
            <Text>
              All service fee will be reimbursed if your application is rejected
              or we don't deliver your applications on time.
            </Text>
          </Flexbox>
        </ContentMaxWidth>

        <ContentMaxWidth>
          <Flexbox
            paddingVertical={spacingValues.blockPaddingTop}
            column
            width="100%"
          >
            <Flexbox paddingBottom={3} column>
              <Heading text="How to apply?" />
              <Heading text="Fast, Cheap and Simple" secondary />
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
                  5 minutes to finish application
                </Text>
                <Divider />
                <Text paddingTop={6}>
                  Fill in our secured online application. You are required to
                  enter the precise information which appears on your passport.
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
                  Secured online payment
                </Text>
                <Divider />
                <Text paddingTop={6}>
                  You can make payment via PayPal or your Credit/Debit Card.
                </Text>
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
                  Approval result within 24 hours
                </Text>
                <Divider />
                <Text paddingTop={6}>
                  Check your email for your approval letter. Please follow the
                  instructions to prepare all your supporting documents.
                </Text>
              </Card>
            </Flexbox>
          </Flexbox>
        </ContentMaxWidth>

        <FeesCard />

        <ServicesCard />

        <PaymentMethodImages />

        <Flexbox paddingBottom={30} />
      </Fragment>
    );
  }
}

export default Home;
