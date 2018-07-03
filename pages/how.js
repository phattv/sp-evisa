// @flow
// vendor
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import { Dropdown } from 'semantic-ui-react';
// custom
import { Flexbox, Image, Text } from '../components/ui';
import ContentMaxWidth from '../components/ContentMaxWidth';
import Heading from '../components/Heading';
import ServicesCard from '../components/ServicesCard';
import PaymentMethodImages from '../components/PaymentMethodImages';

import { logPageView } from '../utils/analytics';
import { spacingValues, iconSizes, paddingAllLarge } from '../constants/ui';
import { updateFees, updateFeesSelectedCountry } from '../redux/actions';
import { getFeesByCountryId } from '../utils/apiClient';
import { countryOptionsSemantic } from '../constants/dropDownOptions';

/**
 * How show how to apply
 */
type Props = {};
type State = {};

class How extends React.Component<Props, State> {
  componentDidMount() {
    logPageView();
  }
  render() {
    return (
      <Fragment>
        <ContentMaxWidth>
          <Flexbox responsiveLayout>
            <Flexbox flex={1} column justifyContent="center" marginRight={10}>
              <Flexbox alignItems="center" paddingBottom={2}>
                <Image
                  width={iconSizes.default}
                  src="../static/icons/inspiration.svg"
                  alt="inspiration"
                />
                <Text fontSize="l" paddingLeft={2}>
                  How Vietnam Visa Works
                </Text>
              </Flexbox>
              <Text p>
                A valid visa is required for almost foreign travelers to
                Vietnam. Today, application for a Vietnam visa has become much
                easier since there are two options to go about this matter.
              </Text>
              <Text>
                The traditional way would be directly contact the nearest
                Vietnam Embassy to apply for one. Or, those who wish to save
                some time could consider applying for a visa on arrival. With
                the second option, you will need to apply online for a visa
                approval letter in advance, and then get the visa stamped onto
                your passport at the arrival airport in Vietnam.
              </Text>
            </Flexbox>
            <Flexbox flex={1} column>
              <Image
                src="../static/images/approved-pass.jpg"
                alt="approved pass"
              />
            </Flexbox>
          </Flexbox>
        </ContentMaxWidth>

        <ContentMaxWidth backgroundImage="url('../static/images/bg-map.jpg')">
          <Flexbox {...paddingAllLarge} column>
            <Heading text="3 steps to get your Visa" />
            <Text textAlign="center">
              No documents to send off. No need to stand in line at the
              consulate.
            </Text>
            <Flexbox paddingTop={20}>
              <Flexbox column flex={1}>
                <Flexbox column paddingVertical={5}>
                  <Flexbox alignItems="center" paddingBottom={2}>
                    <Image
                      width={iconSizes.default}
                      src="../static/icons/transport.svg"
                      alt="transport"
                    />
                    <Text fontSize="l" paddingLeft={2}>
                      Submit application
                    </Text>
                  </Flexbox>
                  <Text>
                    Fill out the secured online application form. You are
                    required to enter the exact personal information of the
                    applicant(s) that matches the information on your
                    passport(s).
                  </Text>
                </Flexbox>
                <Flexbox column paddingVertical={5}>
                  <Flexbox alignItems="center" paddingBottom={2}>
                    <Image
                      width={iconSizes.default}
                      src="../static/icons/wallet.svg"
                      alt="wallet"
                    />
                    <Text fontSize="l" paddingLeft={2}>
                      Pay Service Fee
                    </Text>
                  </Flexbox>
                  <Text p>
                    Please double check to ensure the information is correct,
                    select to use extra services (Airport Fast Track/Car
                    Pick-Up) if any.
                  </Text>
                  <Text>
                    You can make payment with your Credit/ Debit Card via
                    OnePay/PayPal or pay via Western Union. passport
                  </Text>
                </Flexbox>
                <Flexbox column paddingVertical={5}>
                  <Flexbox alignItems="center" paddingBottom={2}>
                    <Image
                      width={iconSizes.default}
                      src="../static/icons/awards.svg"
                      alt="awards"
                    />
                    <Text fontSize="l" paddingLeft={2}>
                      Get approval letter
                    </Text>
                  </Flexbox>
                  <Text>
                    After 1 working day (urgent service) or 2 working days
                    (normal one), you will get visa approval letter via email
                    (attached with entry-and-exit form).
                  </Text>
                </Flexbox>
              </Flexbox>
              <Flexbox column flex={1}>
                <Flexbox alignItems="center" paddingBottom={2}>
                  <Image
                    width={iconSizes.default}
                    src="../static/icons/air-tickets.svg"
                    alt="air tickets"
                  />
                  <Text fontSize="l" paddingLeft={2}>
                    Final Steps
                  </Text>
                </Flexbox>
                <Flexbox>
                  <ul>
                    <li>Print out the letter and the entry-and-exit form</li>
                    <li>Fill out the entry-and-exit form</li>
                    <li>
                      Prepare 2 passport sized photos 4x6cm and an amount of USD
                      for stamping fee ($25 for single entry; $50 for multiple
                      entry visa)
                    </li>
                    <li>
                      Put all above mentioned things along with your passport in
                      a package, then show them to Immigration officer at
                      Vietnam arrival airports.
                    </li>
                    <li>
                      Upon arrival to Vietnam International Airports (Hanoi, Da
                      Nang or Hochiminh), you present all things in the prepared
                      package (passport, visa approval letter, 2 passport sized
                      photos 4x6cm, the entry-and-exit form and stamping fee) to
                      the Immigration officer to get your visa stamped.
                    </li>
                  </ul>
                </Flexbox>
              </Flexbox>
            </Flexbox>
          </Flexbox>
        </ContentMaxWidth>

        <PaymentMethodImages />
      </Fragment>
    );
  }
}

export default How;
