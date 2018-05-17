// @flow
// vendor
import React from 'react';
import withRedux from 'next-redux-wrapper'
// custom
import {
  Anchor,
  Button,
  BlockHeader,
  PageHeader,
  Content,
  Flexbox,
  Image,
  Layout,
  Text,
} from '../components';
import { configureStore } from '../redux/store'

class HowToApply extends React.Component {
  render() {
    return (
      <Layout>
        <Image src="/static/images/how-to-apply-background.png" />
        <PageHeader header="HOW TO APPLY VISA?" />
        <Content>
          <Flexbox width="100%" column flex={1}>
            <BlockHeader header="How Vietnam Visa Works" />
            <Text p textAlign="center">
              Just a few steps fill in online form, you are confident to have
              Vietnam visa approval on your hand.
            </Text>
            <Text p textAlign="center">
              A valid visa is required for almost foreign travelers to Vietnam.
              Today, application for a Vietnam visa has become much easier since
              there are two options to go about this matter.
            </Text>
            <Text p textAlign="center">
              The traditional way would be directly contact the nearest Vietnam
              Embassy to apply for one. Or, those who wish to save some time
              could consider applying for a visa on arrival. With the second
              option, you will need to apply online for a visa approval letter
              in advance, and then get the visa stamped onto your passport at
              the arrival airport in Vietnam.
            </Text>

            <BlockHeader header="You're 3 steps away from a Vietnam visa on arrival." />
            <Text p textAlign="center" bold color="visaBlue">
              No documents to send off. No need to stand in line at the
              consulate.
            </Text>

            <Flexbox column>
              <Flexbox paddingVertical={1} responsiveLayout>
                <Flexbox flex={1} paddingRight={5} paddingLeft={5}>
                  <Image
                    src="/static/images/submit-application-2.png"
                    alt="passport"
                    maxWidth={400}
                  />
                </Flexbox>
                <Flexbox flex={2} column alignItems="flex-start">
                  <BlockHeader header="1. Submit application" smallPadding />
                  <Text p>
                    Fill out the secured online application form. You are
                    required to enter the exact personal information of the
                    applicant(s) that matches the information on your
                    passport(s).
                  </Text>
                  <Text p>
                    You are required to enter the exact personal information of
                    the applicant(s) : Full name – The same as in passport, Date
                    of birth, Nationality, Passport number, Date of arrival,
                    Type of Visa.
                  </Text>
                </Flexbox>
              </Flexbox>

              <Flexbox paddingVertical={1} responsiveLayout>
                <Flexbox flex={1} paddingRight={5} paddingLeft={5}>
                  <Image
                    src="/static/images/pay-service-fee-2.png"
                    alt="passport"
                    maxWidth={400}
                  />
                </Flexbox>
                <Flexbox flex={2} column alignItems="flex-start">
                  <BlockHeader header="2. Pay Service Fee" smallPadding />
                  <Text p>
                    Fill out the secured online application form. You are
                    required to enter the exact personal information of the
                    applicant(s) that matches the information on your
                    passport(s). Please double check to ensure the information
                    is correct, select to use extra services (Airport Fast
                    Track/Car Pick-Up) if any.
                  </Text>
                  <Text p>
                    You can make payment with your Credit/ Debit Card via
                    OnePay/PayPal or pay via Western Union.
                  </Text>
                </Flexbox>
              </Flexbox>

              <Flexbox paddingVertical={1} responsiveLayout>
                <Flexbox flex={1} paddingRight={5} paddingLeft={5}>
                  <Image
                    src="/static/images/get-approval-letter-2.png"
                    alt="passport"
                    maxWidth={400}
                  />
                </Flexbox>
                <Flexbox flex={2} column alignItems="flex-start">
                  <BlockHeader header="3. Get approval letter" smallPadding />
                  <Text p>
                    After 1 working day (urgent service) or 2 working days
                    (normal one), YOU WILL:
                    <ul>
                      <li>
                        Get visa approval letter via email (attached with
                        entry-and-exit form)
                      </li>
                      <li>Print out the letter and the entry-and-exit form</li>
                      <li>Fill out the entry-and-exit form</li>
                      <li>
                        Prepare 2 passport sized photos 4x6cm and an amount of
                        USD for stamping fee ($25 for single entry; $50 for
                        multiple entry visa)
                      </li>
                      <li>
                        Put all above mentioned things along with your passport
                        in a package, then show them to Immigration officer at
                        Vietnam arrival airports.
                      </li>
                      <li>
                        Upon arrival to Vietnam International Airports (Hanoi,
                        Da Nang or Hochiminh), you present all things in the
                        prepared package (passport, visa approval letter, 2
                        passport sized photos 4x6cm, the entry-and-exit form and
                        stamping fee) to the Immigration officer to get your
                        visa stamped.
                      </li>
                    </ul>
                  </Text>
                </Flexbox>
              </Flexbox>
            </Flexbox>

            <Text p textAlign="center" fontStyle="italic">
              Therefore, evisa-vn.com is the fastest and the most convienient
              tool for you to get the Vietnam Visa you need.
            </Text>

            <Anchor href="/apply">
              <Button solid marginBottom={3}>
                Apply for Vietnam Visa on Arrival Now
              </Button>
            </Anchor>
          </Flexbox>
        </Content>
      </Layout>
    );
  }
}

export default withRedux(configureStore, null, null)(HowToApply)