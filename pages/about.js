// @flow
// vendor
import React from 'react'
// custom
import {
  BlockHeader,
  Content,
  Flexbox,
  Image,
  Layout,
  Text,
} from '../components'

class HowToApply extends React.Component {
  render() {
    return (
      <Layout>
        <Image src="/static/images/contact-us-background.png" />
        <Content>
          <Flexbox width="100%" column flex={1}>
            <Flexbox>
              <Flexbox flex={2} column alignItems="flex-start">
                <BlockHeader header="Who We Are" />
                <Text p bold color="visaBlue">
                  “The warmest greeting from Vietnam Visa Online Service !"
                </Text>
                <Text p>
                  * It’s a great honor for us to support those who needs Vietnam
                  visa. Thank you for interesting in our visa service!
                </Text>
                <Text p>
                  * www.Vietnam-Evisa.org is is non-governmental website, but we
                  are on your behalf to contact with the Vietnamese Immigration
                  Department to proceed the Vietnam visa approval letter which
                  is permitted for who want to get the visa at the airport
                  because of some difficult reasons at Vietnamese Embassy in
                  your country.
                </Text>
                <Text p>
                  * Vietnam-Evisa is one of the leading services with
                  10-years-experience in visa service for Vietnam Embassy. We
                  provide a high quality Vietnam visa on arrival service with an
                  organized and professional team as slogan “ Creating values
                  for clients, growing up with clients, being the valuable
                  partner with the clients are our insistent faith.”
                </Text>
                <Text p>
                  * Our service is available to avoid the lengthy procedures to
                  get visa of the client’s local Vietnamese Embassies. Visa
                  Vietnam Online is legitimated by the Vietnamese Immigration
                  Department. So we confidently recommend you the Visa Booking
                  Online service via website www.vietnam-evisa.org. This site
                  not only offers the most convenient, economic and fastest
                  service but also provides a helpful guide for those who needs
                  visa to enter Vietnam.
                </Text>
                <Text p>
                  * It’s so simple, fast and secured with No hidden charge, No
                  failure transactions to receive the visa stamp at all of
                  Vietnam International Airport. Please give Vietnam E-Visa Team
                  an opportunity to help you save money and time! You now can
                  get your visa to Vietnam in couple of minutes with your
                  Internet Connected computers or Wifi built-in Mobile phones.
                  Besides, our payment method is also most convenient, simple
                  and secured.
                </Text>
                <Text p>
                  For more information, please feel free to contact
                  Vietnam-Evisa team. Our Customer Care Center is online 24/7 to
                  support traveller via
                </Text>
                <Text p>
                  <Text bold color="visaBlue">
                    Hotline:
                  </Text>
                  {' '}(+84) 909.343.525;
                </Text>
                <Text p>
                  <Text bold color="visaBlue">
                    Tollfree:
                  </Text>
                  {' '}+1-800-642-1567 or{' '}
                </Text>
                <Text p>
                  <Text bold color="visaBlue">
                    Email:
                  </Text>
                  {' '}Info@Vietnam-Evisa.Org
                </Text>
                <Text p bold fontStyle="italic">
                  Have a nice trip to Vietnam!
                </Text>
                <Text p bold color="visaBlue">
                  Director
                </Text>{' '}
                David La (Mr.)
              </Flexbox>

              <Flexbox flex={1}>
                <Image src="/static/images/passport.png" alt="passport" />
              </Flexbox>
            </Flexbox>
          </Flexbox>
        </Content>
      </Layout>
    )
  }
}

export default HowToApply
