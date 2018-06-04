// @flow
// vendor
import React from 'react'
import withRedux from 'next-redux-wrapper'
// custom
import {
  BlockHeader,
  PageHeader,
  Content,
  Flexbox,
  Image,
  Layout,
  Text,
} from '../components'
import { configureStore } from '../redux/store'

class Partners extends React.Component {
  render() {
    return (
      <Layout title="Partners">
        <Image src="/static/images/partners-background.png" />
        <PageHeader header="LOCAL PARTNERS" />
        <Content>
          <Flexbox width="100%" column flex={1}>
            <BlockHeader header="About Vietnam discovery travel" />
            <Text p textAlign="center">
              Vietnam-visa.com has been cooperating with Vietnamdiscovery.com to
              ensure you the most memorable trip to Vietnam. For those who are
              planning a tour to Vietnam and as well as Southeast Asian
              countries and wish to have a professional,
              www.Vietnamdiscovery.com is an ideal choice. Not only proposing
              special city discovery tours, Vietnamdiscovery.com also offers a
              wide range of tour packages throughout Vietnam and even from
              Vietnam to other Southeast Asian countries such as Laos, Cambodia
              and Myanmar.
            </Text>
            <Text p textAlign="center" marginBottom={10}>
              In order to achieve more convenience for your holidays in Vietnam,
              Vietnamdiscovery.com also offers commodious befitting services.
              Please follow the brief introduction below for more details.
            </Text>

            <BlockHeader header="Our services" />
            <Text p textAlign="center" bold color="visaBlue">
              At your fingertips at Vietnamdiscovery.com, you may find:
            </Text>

            <Flexbox responsiveLayout>
              <Flexbox
                flex={1}
                column
                paddingVertical={2}
                paddingHorizontal={2}
              >
                <Image
                  src="/static/images/tour-booking.png"
                  alt="passport"
                  maxWidth={400}
                />
                <Text
                  p
                  bold
                  color="visaBlue"
                  size="l"
                  marginTop={2}
                  textAlign="center"
                >
                  Tour Booking Service
                </Text>
                <Text p textAlign="center">
                  Being the main online portal for travel arrangement of Vietnam
                  Discovery Travel., JSC, www.Vietnamdiscovery.com offers you a
                  wide range of package tours of both short and long holidays &
                  travel throughout Vietnam and other Southeast Asian countries
                  at favorable price.
                </Text>
              </Flexbox>
              <Flexbox
                flex={1}
                column
                paddingVertical={2}
                paddingHorizontal={2}
              >
                <Image
                  src="/static/images/hotel-reservation.png"
                  alt="passport"
                  maxWidth={400}
                />
                <Text
                  p
                  bold
                  color="visaBlue"
                  size="l"
                  marginTop={2}
                  textAlign="center"
                >
                  Vietnam Hotel Reservation
                </Text>
                <Text p textAlign="center">
                  Whether you prefer sea activities, mountain activities, or
                  pure rest and relaxation, find the short- or long-stay, the
                  hotel service on Vietnam Discovery fits you. All of our
                  selected hotels are fantastic from which to explore this
                  magical country and make your stay in Vietnam more memorable.
                </Text>
              </Flexbox>
              <Flexbox
                flex={1}
                column
                paddingVertical={2}
                paddingHorizontal={2}
              >
                <Image
                  src="/static/images/transportation.png"
                  alt="passport"
                  maxWidth={400}
                />
                <Text
                  p
                  bold
                  color="visaBlue"
                  size="l"
                  marginTop={2}
                  textAlign="center"
                >
                  Transportation Service
                </Text>
                <Text p textAlign="center">
                  In order to meet any demands of your transportation in
                  Vietnam, Vietnamdiscovery.com offers you reliable Private Car
                  service, Airport Pick-up, Train Ticket and Air Ticket with
                  good quality, cheap price and flexible option for your most
                  convenient package holidays in Vietnam.
                </Text>
              </Flexbox>
            </Flexbox>

            <Flexbox column alignItems="flex-start" width="100%" marginTop={10}>
              <Text p>
                Please contact our support center using the available channels
                below to get direct assistance from Vietnam Discovery Travel
                Team.
              </Text>
              <Text p bold color="visaBlue">
                support@vietnamdiscovery.com
              </Text>
              <Text p bold color="visaBlue">
                24/7 Hotline: +84.989.383.767
              </Text>
              <Text p bold color="visaBlue">
                Office number: +84.473.005.333 (ext. 212 or 214)
              </Text>
              <Text p bold color="visaBlue">
                Online chat
              </Text>
              <Text p bold color="visaBlue">
                Our office: 23rd floor, Vinaconex 9 Tower, Pham Hung Street, Me
                Tri Ward, Tu Liem District, Hanoi, Vietnam
              </Text>
            </Flexbox>
          </Flexbox>
        </Content>
      </Layout>
    )
  }
}

export default withRedux(configureStore, null, null)(Partners)
