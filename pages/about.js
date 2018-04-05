// @flow
// vendor
import React from "react";
// custom
import {
  BlockHeader,
  PageHeader,
  Content,
  Flexbox,
  Image,
  Layout,
  Text
} from "../components";

class AboutUs extends React.Component {
  componentDidMount() {
    window.Intercom("update");
  }

  render() {
    return (
      <Layout>
        <Image src="/static/images/about-us-background.png" />
        <PageHeader header="ABOUT US" />
        <Content>
          <Flexbox width="100%" column flex={1}>
            <Flexbox responsiveLayout>
              <Flexbox flex={2} column alignItems="flex-start">
                <BlockHeader header="Who We Are" />
                <Text p>
                  First of all, on behalf of evisa-vn.com’s group, it’s our
                  honors to welcome all the customers who have placed their
                  trust on us to get our excellent services in return.
                </Text>
                <Text p>
                  Thanks for your interesting in our service. We guarantee our
                  services will never fail you- our customers.
                </Text>
                <Text p>
                  {" "}
                  Evisa-vn.com is a non-governmental website; however, we work
                  on our customers’ behalf to contact Vietnamese Immigration
                  Department to proceed the Vietnam visa approval letter which
                  is permitted for people who want to get their visa at the
                  airport without wasting time at Vietnamese Embassy.
                </Text>
                <Text p>
                  Evisa-vn.com is one of the leading services company with
                  10-years-experience in visa services for Vietnam Embassy. We
                  provide a high quality Vietnam visa on arrival service with an
                  organized and professional team as slogan “ Creating values
                  for clients, growing up with clients, being the valuable
                  partner with the clients are our insistent faith”
                </Text>
                <Text p>
                  Our service is available to avoid the lengthy procedures to
                  get visa of the client’s local Vietnamese Embassies. Vietnam
                  Visa Online is legitimated by the Vietnamese Immigration
                  Department. So we confidently recommend you the Booking Visa
                  Online service via website evisa-vn.com. This site not only
                  offers the most convenient, economic and fastest service but
                  also provides helpful guides for those who need the visa to
                  enter Vietnam.
                </Text>
                <Text p>
                  It’s so simple, fast and secured with No hidden charge, No fee
                  charged if your visa is denied. Please give Vietnam E-Visa
                  Team an opportunity to help you save money and time! You now
                  can get your visa to Vietnam in couple of minutes with your
                  Internet Connected computers or Wifi built-in Mobile phones.
                  Besides, our payment method is also most convenient, simple
                  and secured.
                </Text>
                <Text p>
                  For more information, please feel free to contact Evisa-vn
                  team. Our Customer Care Center is online 24/7 to support
                  travellers via
                </Text>
                <Text p>
                  <Text bold color="visaBlue">
                    Hotline:
                  </Text>{" "}
                  (+84) 092 022 762
                </Text>
                <Text p>
                  <Text bold color="visaBlue">
                    Email:
                  </Text>{" "}
                  contact@evisa-vn.com
                </Text>
              </Flexbox>
            </Flexbox>
          </Flexbox>
        </Content>
      </Layout>
    );
  }
}

export default AboutUs;
