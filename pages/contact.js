// @flow
// vendor
import React from "react";
// custom
import {
  Anchor,
  BlockHeader,
  PageHeader,
  Content,
  Flexbox,
  Image,
  Layout,
  Text
} from "../components";

type Props = {};
type State = {};

class Contact extends React.Component<Props, State> {
  constructor(props: Object) {
    super(props);
  }

  static defaultProps: Props = {};

  state = {};

  componentDidMount() {
    window.Intercom("update");
  }

  render() {
    return (
      <Layout>
        <Image src="/static/images/contact-us-background.png" />
        <PageHeader header="CONTACT US" />
        <Content>
          <Flexbox width="100%" responsiveLayout>
            <Flexbox flex={2} column alignItems="flex-start">
              <BlockHeader header="Get in touch" />
              <Text p>
                Whether you are our esteemed customer or just have a question
                about Vietnam visa on arrival,{" "}
                <Anchor href="/">evisa-vn.com</Anchor> is committed to providing
                a rewarding customer experience. Select the most convenient way
                to reach us, and we look forward to assisting you.
              </Text>
              <Text p>
                Need help? Have a question? Get instant answers 24/7.
              </Text>
              <Text p>
                We are here to serve you. Whether you have questions about
                Vietnam visa procedure, your answers are just a click away. It’s
                available 24/7. Please visit our{" "}
                <Anchor href="/feedback">
                  Frequently Asked Questions today
                </Anchor>.
              </Text>
              <Flexbox paddingBottom={3}>
                <i
                  className="fa fa-fw fa-2x fa-map-marker"
                  aria-hidden="true"
                />
                <Text bold paddingLeft={2}>
                  7th Floor, Kim Nguyên Building, 74 Nguyễn Khoái street,
                  District 4, Ho Chi Minh City, Vietnam
                </Text>
              </Flexbox>
              <Flexbox paddingBottom={3}>
                <i className="fa fa-fw fa-2x fa-phone" aria-hidden="true" />
                <Text bold paddingLeft={2}>
                  +84. 0932 022 762
                </Text>
              </Flexbox>
              <Flexbox paddingBottom={3}>
                <i className="fa fa-fw fa-2x fa-envelope" aria-hidden="true" />
                <Text bold paddingLeft={2}>
                  <Anchor href="mailto:contact@evisa-vn.com">
                    contact@evisa-vn.com
                  </Anchor>{" "}
                </Text>
              </Flexbox>
              <Flexbox paddingBottom={3}>
                <i className="fa fa-fw fa-2x fa-clock-o" aria-hidden="true" />
                <Text bold paddingLeft={2}>
                  Mon-Fri: 8:00 AM – 5:00 PM (GMT+7)
                  <br />
                  Sat: 8:30 AM – 12:00 PM (GMT+7)
                </Text>
              </Flexbox>
            </Flexbox>
            <Flexbox flex={1} column alignItems="flex-start">
              <BlockHeader header="Maps" />
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.729362099555!2d106.69216831594012!3d10.7553289923358!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f0dddd8cfbb%3A0xbc825dce9a152e94!2zNzQgTmd1eeG7hW4gS2hvw6FpLCBwaMaw4budbmcgMiwgUXXhuq1uIDQsIEjhu5MgQ2jDrSBNaW5oLCBWaWV0bmFt!5e0!3m2!1sen!2s!4v1522893117988"
                width="350"
                height="262.5"
                frameBorder="0"
                style={{ border: 0 }}
                allowFullScreen
              />
            </Flexbox>
          </Flexbox>
        </Content>
      </Layout>
    );
  }
}

export default Contact;
