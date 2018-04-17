// @flow
// vendor
import React from 'react';
import { Div } from 'glamorous';
import withRedux from 'next-redux-wrapper';
// custom
import {
  Anchor,
  BlockHeader,
  Button,
  Content,
  Flexbox,
  Image,
  Layout,
  PageHeader,
  Text,
} from '../components';
import { configureStore } from '../redux/store';

class ExtraServices extends React.Component {
  componentDidMount() {
    window.Intercom('update');
  }

  render() {
    return (
      <Layout>
        <Image src="/static/images/services-background.png" />
        <PageHeader header="EXTRA SERVICES" />
        <Content>
          <Flexbox width="100%" column>
            <Text p textAlign="center" bold>
              In order to help our customers in choosing a care-free service, we
              offer an all-in-one package which covers all your demands for a
              Vietnam trip.
            </Text>
            <BlockHeader header="EXTRA SERVICES UPON ARRIVAL" />

            <Flexbox column>
              <Flexbox
                column
                alignItems="flex-start"
                paddingTop={10}
                width="100%"
              >
                <BlockHeader header="AIRPORT FAST TRACK" />
                <Flexbox responsiveLayout width="100%">
                  <Flexbox flex={1} paddingHorizontal={5} paddingVertical={2}>
                    <Image
                      src="/static/images/airport-fast-track.png"
                      alt="airport fast track"
                      maxWidth={400}
                    />
                  </Flexbox>
                  <Flexbox flex={2} column alignItems="flex-start">
                    <Div overflowX="auto">
                      <table>
                        <thead>
                          <tr>
                            <th>TYPE OF FAST TRACK</th>
                            <th colSpan="4">AIRPORT</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th />
                            <th>IN HA NOI</th>
                            <th>HA NOI</th>
                            <th>DA NANG</th>
                            <th>CAM RANH</th>
                          </tr>
                          <tr>
                            <td>Airport Fast Track</td>
                            <td>29 USD/pax</td>
                            <td>29 USD/pax</td>
                            <td>29 USD/pax</td>
                            <td>29 USD/pax</td>
                          </tr>
                          <tr>
                            <td>Airport VIP Fast Track</td>
                            <td>44 USD/pax</td>
                            <td>44 USD/pax</td>
                            <td>44 USD/pax</td>
                            <td>44 USD/pax</td>
                          </tr>
                        </tbody>
                      </table>
                    </Div>
                    <Text p paddingTop={2}>
                      A. Fast track: Our staff will meet you at the Visa Landing
                      Counter with your name on the welcome board and assist you
                      to get visa stamp and visa sticker without getting line as
                      others. Just 5 -10 minutes (it depends on the number of
                      applicants at Visa Landing Counter) you will at the
                      luggage lounge to wait for your belonging.
                    </Text>
                    <Text p>
                      B. VIP Fast track: Our staff will meet you at the Visa
                      Landing Counter with your name on the welcome board and
                      assist you to get visa stamp and visa sticker without
                      getting line as others. After that, our staff will escort
                      you go to luggage lounge to assist you take care of your
                      luggage as baggage porters.
                    </Text>
                    <Anchor href="/apply">
                      <Button solid marginTop={3}>
                        APPLY
                      </Button>
                    </Anchor>
                  </Flexbox>
                </Flexbox>
              </Flexbox>

              <Flexbox
                column
                alignItems="flex-start"
                paddingTop={10}
                width="100%"
              >
                <BlockHeader header="PICK UP AT THE AIRPORT" />
                <Flexbox responsiveLayout width="100%">
                  <Flexbox flex={1} paddingHorizontal={5} paddingVertical={2}>
                    <Image
                      src="/static/images/car-pickup.png"
                      alt="car pickup"
                      maxWidth={400}
                    />
                  </Flexbox>
                  <Flexbox flex={2} column alignItems="flex-start">
                    <Div overflowX="auto">
                      <table>
                        <thead>
                          <tr>
                            <th>ECONOMY CAR</th>
                            <th colSpan="4">PICK-UP AIRPORT</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th />
                            <th>IN HA NOI</th>
                            <th>HA NOI</th>
                            <th>DA NANG</th>
                            <th>CAM RANH</th>
                          </tr>
                          <tr>
                            <td>4 seats</td>
                            <td>29 USD</td>
                            <td>29 USD</td>
                            <td>29 USD</td>
                            <td>29 USD</td>
                          </tr>
                          <tr>
                            <td>7 seats</td>
                            <td>34 USD</td>
                            <td>34 USD</td>
                            <td>34 USD</td>
                            <td>34 USD</td>
                          </tr>
                          <tr>
                            <td>16 seats</td>
                            <td>94 USD</td>
                            <td>94 USD</td>
                            <td>94 USD</td>
                            <td>94 USD</td>
                          </tr>
                          <tr>
                            <td>24 seats</td>
                            <td>154 USD</td>
                            <td>154 USD</td>
                            <td>154 USD</td>
                            <td>154 USD</td>
                          </tr>
                        </tbody>
                      </table>
                    </Div>
                    <Text p paddingTop={2}>
                      You will be picked up to inner city by our friendly driver
                      who stands outside the airport with your name on the
                      welcome sign to save your waiting time. Highly recommend
                      if you are visiting Vietnam for the first time and/or your
                      arrival is at night.
                    </Text>
                    <Text p>
                      * Accompanying fast-track service is recommended so that
                      the pick-up is as scheduled.
                    </Text>
                    <Anchor href="/apply">
                      <Button solid marginTop={3}>
                        APPLY
                      </Button>
                    </Anchor>
                  </Flexbox>
                </Flexbox>
              </Flexbox>

              <Flexbox
                column
                alignItems="flex-start"
                paddingTop={10}
                width="100%"
              >
                <BlockHeader header="PRIVATE LETTER" />
                <Flexbox responsiveLayout width="100%">
                  <Flexbox flex={1} paddingHorizontal={5} paddingVertical={2}>
                    <Image
                      src="/static/images/private-visa-letter.jpg"
                      alt="private visa letter"
                      maxWidth={400}
                    />
                  </Flexbox>
                  <Flexbox flex={2} column alignItems="flex-start">
                    <Div overflowX="auto" />
                    <Text p paddingTop={2}>
                      Because of Vietnam Immigration Office policy, they list a
                      number of people on the same visa letter, so we offer
                      private/confidential visa letter is showing your name or
                      your group in 1 letter without others name on your letter.
                      But you have to pay extra 8 USD/letter for you or your
                      group.
                    </Text>
                    <Anchor href="/apply">
                      <Button solid marginTop={3}>
                        APPLY
                      </Button>
                    </Anchor>
                  </Flexbox>
                </Flexbox>
              </Flexbox>
            </Flexbox>
          </Flexbox>
        </Content>
      </Layout>
    );
  }
}

export default withRedux(configureStore, null, null)(ExtraServices);
