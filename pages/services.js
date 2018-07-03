// @flow
// vendor
import React, { Fragment } from 'react';
import { logPageView } from '../utils/analytics';
import Router from 'next/router';
// custom
import { Button, Flexbox, Image, Text } from '../components/ui';
import ContentMaxWidth from '../components/ContentMaxWidth';
import Heading from '../components/Heading';
import {
  iconSizes,
  pageNames,
  spacingValues,
  tableWidth,
  textMaxWidth,
} from '../constants/ui';

const cities = ['Ha Noi', 'Cam Ranh', 'Da Nang', 'Ho Chi Minh'];
const airportFastTrackTables = [
  {
    title: 'Fast Track',
    price: 29,
    note:
      'Our staff will greet you at the Visa Landing Counter and assist you to get visa stamp and sticker without queuing in line with others. Just 5 -10 minutes and you will at the luggage lounge to wait for your belonging.',
  },
  {
    title: 'VIP Fast Track',
    price: 44,
    note:
      'Same as Fast Track, but our staff will also escort you to the luggage lounge and take care of your luggage.',
  },
];
const pickupAtTheAirportTables = [
  {
    title: '4 Seats',
    price: 29,
  },
  {
    title: '7 Seats',
    price: 34,
  },
  {
    title: '16 Seats',
    price: 94,
  },
  {
    title: '24 Seats',
    price: 154,
  },
];

/**
 * Services show services that evisa-vn offers
 */
type Props = {};
type State = {};
class Services extends React.Component<Props, State> {
  componentDidMount() {
    logPageView();
  }

  navigateToApply = () => Router.push(pageNames.apply);

  render() {
    return (
      <Fragment>
        <ContentMaxWidth>
          <Flexbox
            column
            alignItems="center"
            paddingTop={spacingValues.blockPaddingTop}
          >
            <Flexbox paddingBottom={5}>
              <Image
                src="../static/icons/share.svg"
                alt="share"
                width={iconSizes.large}
              />
            </Flexbox>
            <Heading secondary text="Services Upon Arrival" />
            <Text textAlign="center" width={textMaxWidth}>
              We offer an all-in-one arrival package which covers all your needs
              for your trip in Vietnam.
            </Text>
          </Flexbox>
        </ContentMaxWidth>

        <ContentMaxWidth>
          <Flexbox
            column
            alignItems="center"
            paddingVertical={spacingValues.blockPaddingTop}
          >
            <Flexbox paddingBottom={5} alignItems="center">
              <Image
                src="../static/icons/airplane.svg"
                alt="airplane"
                width={iconSizes.default}
              />
              <Flexbox paddingLeft={3}>
                <Heading secondary text="Airport Fast Track" />
              </Flexbox>
            </Flexbox>
            <Flexbox>
              {airportFastTrackTables.map((airportFastTrack, index) => (
                <Flexbox
                  key={index}
                  column
                  width={tableWidth}
                  backgroundColor="white"
                  borderTop
                  borderWidth={3}
                  borderColor="green"
                  marginHorizontal={2}
                  marginVertical={4}
                >
                  <Flexbox
                    paddingVertical={6}
                    column
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Text fontSize="l" color="darkBlue" bold noDoubleLineHeight>
                      {airportFastTrack.title}
                    </Text>
                    <Text color="lightBlue">(Price per pax)</Text>
                  </Flexbox>
                  {cities.map((field, index) => (
                    <Flexbox
                      paddingVertical={1}
                      paddingHorizontal={5}
                      key={index}
                      justifyContent="space-between"
                      width="100%"
                      backgroundColor={index % 2 === 0 ? 'bgGrey2' : 'white'}
                    >
                      <Text>{field}</Text>
                      <Text>{airportFastTrack.price} USD</Text>
                    </Flexbox>
                  ))}
                  <Flexbox paddingHorizontal={5} paddingVertical={5}>
                    <Text fontSize="s" color="lightBlue">
                      {airportFastTrack.note}
                    </Text>
                  </Flexbox>
                </Flexbox>
              ))}
            </Flexbox>
          </Flexbox>
        </ContentMaxWidth>

        <ContentMaxWidth backgroundImage="url('../static/images/bg-pickup.jpg')">
          <Flexbox
            column
            alignItems="center"
            paddingVertical={spacingValues.blockPaddingTop}
          >
            <Flexbox column alignItems="center">
              <Flexbox paddingBottom={5} alignItems="center">
                <Image
                  src="../static/icons/man.svg"
                  alt="man"
                  width={iconSizes.default}
                />
                <Flexbox paddingLeft={3}>
                  <Heading color="white" secondary text="Pick Up At Airport" />
                </Flexbox>
              </Flexbox>
              <Text color="white" textAlign="center" width={textMaxWidth}>
                You will be picked up to inner city by our friendly driver who
                stands outside the airport with your name on the welcome sign to
                save your waiting time. Highly recommend if you are visiting
                Vietnam for the first time and/or your arrival is at night.
              </Text>
            </Flexbox>
            <Flexbox>
              <Flexbox
                responsiveLayout
                justifyContent="center"
                style={{ flexWrap: 'wrap', maxWidth: tableWidth * 5 * 2.5 }}
              >
                {pickupAtTheAirportTables.map((pickupAtTheAirport, index) => (
                  <Flexbox
                    key={index}
                    column
                    width={tableWidth}
                    backgroundColor="white"
                    borderTop
                    borderWidth={3}
                    borderColor="green"
                    marginHorizontal={2}
                    marginVertical={4}
                  >
                    <Flexbox
                      paddingVertical={6}
                      column
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Text
                        fontSize="l"
                        color="darkBlue"
                        bold
                        noDoubleLineHeight
                      >
                        {pickupAtTheAirport.title}
                      </Text>
                      <Text color="lightBlue">(Price per pax)</Text>
                    </Flexbox>
                    {cities.map((field, index) => (
                      <Flexbox
                        paddingVertical={1}
                        paddingHorizontal={5}
                        key={index}
                        justifyContent="space-between"
                        width="100%"
                        backgroundColor={index % 2 === 0 ? 'bgGrey2' : 'white'}
                      >
                        <Text>{field}</Text>
                        <Text>{pickupAtTheAirport.price} USD</Text>
                      </Flexbox>
                    ))}
                  </Flexbox>
                ))}
              </Flexbox>
            </Flexbox>
            <Text color="white" fontSize="s" textAlign="center" paddingTop={4}>
              * Accompanying fast-track service is recommended so that the
              pick-up is as scheduled.
            </Text>
          </Flexbox>
        </ContentMaxWidth>

        <ContentMaxWidth backgroundImage="url('../static/images/bg-letter.jpg')">
          <Flexbox
            column
            alignItems="center"
            paddingVertical={spacingValues.blockPaddingTop}
          >
            <Flexbox column alignItems="center">
              <Flexbox paddingBottom={5} alignItems="center">
                <Image
                  src="../static/icons/comment.svg"
                  alt="comment"
                  width={iconSizes.default}
                />
                <Flexbox paddingLeft={3}>
                  <Heading secondary text="Private Letter" />
                </Flexbox>
              </Flexbox>
              <Text textAlign="center" width={textMaxWidth}>
                Confidentiality is crucial. Because of Vietnam Immigration
                Office policy, all names for people getting visas on the same
                day will be on the same letter. We offer a private letter
                service so your name and the names of all members in your group
                will in a a private letter. The fee for each private letter is 8
                USD per letter (one letter can be for one person or for a
                group).
              </Text>
            </Flexbox>

            <Flexbox paddingTop={4} width="100%">
              <Button width="100%" onClick={this.navigateToApply}>
                Apply Now!
              </Button>
            </Flexbox>
          </Flexbox>
        </ContentMaxWidth>
      </Fragment>
    );
  }
}

export default Services;
