// @flow
// vendor
import React from 'react';
// custom
import {
  Button,
  BlockHeader,
  PageHeader,
  Content,
  Flexbox,
  Image,
  Layout,
  Text,
} from '../components';

class ExtraServices extends React.Component {
  componentDidMount() {
    window.Intercom("update");
  }

  render() {
    return (
      <Layout>
        <Image src="/static/images/services-background.png" />
        <PageHeader header="EXTRA SERVICES" />
        <Content>
          <Flexbox width="100%" column flex={1}>
            <Text p textAlign="center" bold>
              In order to help Foreigners avoid confusing to choose the required
              services in their trip, We offer an all-in-one package which
              covers every little thing the visitor need for their trip.
            </Text>

            <Flexbox column>
              <Flexbox column alignItems="flex-start" paddingTop={10}>
                <BlockHeader header="1. Airport fast-track Service" />
                <Flexbox responsiveLayout>
                  <Flexbox flex={1} paddingRight={5} paddingLeft={5}>
                    <Image
                      src="/static/images/airport-fast-track.png"
                      alt="passport"
                      maxWidth={400}
                    />
                  </Flexbox>
                  <Flexbox flex={2} column alignItems="flex-start">
                    <Text p>There are two options for choosing:</Text>
                    <Text p>
                      <Text color="visaBlue" bold>
                        A. Fast track:
                      </Text>{' '}
                      Our staff will meet you at the Visa Landing Counter with
                      your name on the welcome board and assist you to get visa
                      stamp and visa sticker without getting line as others.
                      Just 5 -10 minutes (it depends on the number of applicants
                      at Visa Landing Counter) you will at the luggage lounge to
                      wait for your belonging.
                    </Text>
                    <Text p>
                      <Text color="visaBlue" bold>
                        B. VIP Fast track:
                      </Text>{' '}
                      Our staff will meet you at the Visa Landing Counter with
                      your name on the welcome board and assist you to get visa
                      stamp and visa sticker without getting line as others.
                      After that, our staff will escort you go to luggage lounge
                      to assist you take care your luggage as baggage porters.
                    </Text>
                    <Button solid marginTop={3}>
                      View more
                    </Button>
                  </Flexbox>
                </Flexbox>
              </Flexbox>

              <Flexbox column alignItems="flex-start" paddingTop={10}>
                <BlockHeader header="2. Car pick-up service" />
                <Flexbox responsiveLayout>
                  <Flexbox flex={1} paddingRight={5} paddingLeft={5}>
                    <Image
                      src="/static/images/car-pickup.png"
                      alt="passport"
                      maxWidth={400}
                    />
                  </Flexbox>
                  <Flexbox flex={2} column alignItems="flex-start">
                    <Text color="visaBlue" bold>
                      Why do you use Car Pick-up Service?
                    </Text>
                    <Text p>
                      You are tired and just want to seat in luxury, comfortable
                      car with cool atmosphere and be driven directly to your
                      hotel. We can provide a private car like that in some
                      minutes as soon as coming at the airport.
                    </Text>
                    <Button solid marginTop={3}>
                      View more
                    </Button>
                  </Flexbox>
                </Flexbox>
              </Flexbox>

              <Flexbox column alignItems="flex-start" paddingTop={10}>
                <BlockHeader header="3. Vietnam visa extension and renewal service" />
                <Flexbox responsiveLayout>
                  <Flexbox flex={1} paddingRight={5} paddingLeft={5}>
                    <Image
                      src="/static/images/visa-renewal.png"
                      alt="passport"
                      maxWidth={400}
                    />
                  </Flexbox>
                  <Flexbox flex={2} column alignItems="flex-start">
                    <Text p>
                      This section explains the customer how to apply to their
                      visa extension for the temporary staying permission in
                      Vietnam with the purpose for visiting relatives,
                      traveling, business or others.
                    </Text>
                    <Text p>
                      You have opportunity to extend your stay in Vietnam by
                      visa extension and renewal. So what is difference between
                      a visa extension and renewal? Please note that visa
                      extension or renewals belongs to your current visa.
                    </Text>
                    <Button solid marginTop={3}>
                      View more
                    </Button>
                  </Flexbox>
                </Flexbox>
              </Flexbox>

              <Flexbox column alignItems="flex-start" paddingTop={10}>
                <BlockHeader header="4. Hotel booking service" />
                <Flexbox responsiveLayout>
                  <Flexbox flex={1} paddingRight={5} paddingLeft={5}>
                    <Image
                      src="/static/images/hotel-booking.png"
                      alt="passport"
                      maxWidth={400}
                    />
                  </Flexbox>
                  <Flexbox flex={2} column alignItems="flex-start">
                    <Text p>
                      * With more than 2000 hotels in our system stretching from
                      the north to the south of Viet Nam, we can recommend you a
                      good place for resting after a long flight.
                    </Text>
                    <Text p>
                      This is special offer for your business trip or vacation.
                    </Text>
                    <Button solid marginTop={3}>
                      View more
                    </Button>
                  </Flexbox>
                </Flexbox>
              </Flexbox>

              <Flexbox column alignItems="flex-start" paddingTop={10}>
                <BlockHeader header="5. Vietnam domestic flights" />
                <Flexbox responsiveLayout>
                  <Flexbox flex={1} paddingRight={5} paddingLeft={5}>
                    <Image
                      src="/static/images/domestic-flight.png"
                      alt="passport"
                      maxWidth={400}
                    />
                  </Flexbox>
                  <Flexbox flex={2} column alignItems="flex-start">
                    <Text p>
                      Vietnam airline, Jetstar airline or Vietjet airline ,
                      which airline do you prefer? Let us search it for you ,
                      business class or cheap class ,we have enough capabilities
                      searching query flights to match for your needs.
                    </Text>
                    <Button solid marginTop={3}>
                      View more
                    </Button>
                  </Flexbox>
                </Flexbox>
              </Flexbox>

              <Flexbox column alignItems="flex-start" paddingTop={10}>
                <BlockHeader header="6. Tour and travel booking" />
                <Flexbox responsiveLayout>
                  <Flexbox flex={1} paddingRight={5} paddingLeft={5}>
                    <Image
                      src="/static/images/travel-booking.png"
                      alt="passport"
                      maxWidth={400}
                    />
                  </Flexbox>
                  <Flexbox flex={2} column alignItems="flex-start">
                    <Text p>
                      With a deep knowledge about people and country of Vietnam
                      is our advantage , we will help you to understand of
                      experience History, Culture, Traditional culinary of
                      Indochina in general and Viet Nam in particular.
                    </Text>
                    <Button solid marginTop={3}>
                      View more
                    </Button>
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

export default ExtraServices;
