// @flow
// vendor
import React from 'react';
// custom
import {
  Anchor,
  BlockHeader,
  Content,
  Flexbox,
  Image,
  Layout,
  Text,
} from '../components';

type Props = {};
type State = {};

class Contact extends React.Component<Props, State> {
  constructor(props: Object) {
    super(props);
  }

  static defaultProps: Props = {};

  state = {};

  render() {
    return (
      <Layout>
        <Image src="/static/images/contact-us-background.png" />
        <Content>
          <Flexbox width="100%" responsiveLayout>
            <Flexbox flex={2} column alignItems="flex-start">
              <BlockHeader header="Get in touch" />
              <Text p>
                Whether you are our esteemed customer or just have a question
                about Vietnam visa on arrival,{' '}
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
                available 24/7. Please visit our{' '}
                <Anchor href="/faq">Frequently Asked Questions today</Anchor>.
              </Text>
              <Flexbox paddingBottom={3}>
                <i className="fa fa-fw fa-2x fa-map-marker" aria-hidden="true" />
                <Text bold paddingLeft={2}>
                  23rd Floor, Vinaconex 9 Building, Pham Hung Road, Me Tri, Tu
                  Liem, Hanoi, Vietnam
                </Text>
              </Flexbox>
              <Flexbox paddingBottom={3}>
                <i className="fa fa-fw fa-2x fa-phone" aria-hidden="true" />
                <Text bold paddingLeft={2}>
                  +84.473.005.333 (ext. 221 or 224)
                  <br />
                  +1 (559) 922-2468 (ext. 1)
                </Text>
              </Flexbox>
              <Flexbox paddingBottom={3}>
                <i className="fa fa-fw fa-2x fa-envelope" aria-hidden="true" />
                <Text bold paddingLeft={2}>
                  <Anchor href="mailto:sales@vietnamvisafast-cheap.com">
                    Sales@vietnamvisafast-cheap.com
                  </Anchor>{' '}
                  (for booking our service)
                  <br />
                  <Anchor href="mailto:support@vietnamvisafast-cheap.com">
                    Support@vietnamvisafast-cheap.com
                  </Anchor>{' '}
                  (for questions/information)
                </Text>
              </Flexbox>
              <Flexbox paddingBottom={3}>
                <i className="fa fa-fw fa-2x fa-clock-o" aria-hidden="true" />
                <Text bold paddingLeft={2}>
                  Mon-Fri: 8:00 AM – 6:00 PM (GMT+7)
                  <br />
                  Sat: 8:30 AM – 12:00 PM (GMT+7)
                </Text>
              </Flexbox>
            </Flexbox>
            <Flexbox flex={1} column alignItems="flex-start">
              <BlockHeader header="Maps" />
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.428072752236!2d105.78072111568572!3d21.01555108600561!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab533bc5be8d%3A0xa2500ae3d7fb30fc!2sVinaconex+9!5e0!3m2!1sen!2s!4v1515116450829"
                width="400"
                height="300"
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
