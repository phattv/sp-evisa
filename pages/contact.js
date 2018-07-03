// @flow
// vendor
import React, { Fragment } from 'react';
import { logPageView } from '../utils/analytics';
import { Form } from 'semantic-ui-react';
// custom
import { Anchor, Button, Flexbox, Image, Text } from '../components/ui';
import ContentMaxWidth from '../components/ContentMaxWidth';
import Heading from '../components/Heading';
import { iconSizes } from '../constants/ui';
import { companyInfo } from '../constants/companyInfo';

/**
 * Contact show company contact information
 */
type Props = {};
type State = {};
class Contact extends React.Component<Props, State> {
  componentDidMount() {
    logPageView();
  }

  render() {
    return (
      <Fragment>
        <ContentMaxWidth>
          <Flexbox paddingTop={16} column>
            <Heading text="Get in touch" />
            <Flexbox paddingTop={14} responsiveLayout>
              <Flexbox
                column
                flex={1}
                paddingHorizontal={2}
                paddingVertical={2}
              >
                <Flexbox paddingBottom={6}>
                  <Image
                    src="../static/icons/message.svg"
                    alt="message"
                    width={iconSizes.default}
                  />
                </Flexbox>
                <Text>
                  We are committed to provide the best and most rewarding
                  experience to all travelers to Vietnam. Therefore, whether you
                  plan to use our service or just need help with your visa in
                  Vietnam, feel free to send us an enquiry, or check out our
                  intensive FAQs section.
                </Text>
              </Flexbox>

              <Flexbox
                column
                flex={1}
                paddingHorizontal={2}
                paddingVertical={2}
              >
                <Flexbox paddingBottom={6}>
                  <Image
                    src="../static/icons/store.svg"
                    alt="store"
                    width={iconSizes.default}
                  />
                </Flexbox>
                <Flexbox paddingBottom={4}>
                  <i
                    className="fa fa-fw fa-2x fa-map-marker"
                    aria-hidden="true"
                  />
                  <Text paddingLeft={2}>{companyInfo.address}</Text>
                </Flexbox>
                <Flexbox paddingBottom={4}>
                  <i className="fa fa-fw fa-2x fa-phone" aria-hidden="true" />
                  <Anchor href={`tel:${companyInfo.phone}`}>
                    {companyInfo.phoneString}
                  </Anchor>
                </Flexbox>
                <Flexbox paddingBottom={4}>
                  <i
                    className="fa fa-fw fa-2x fa-envelope"
                    aria-hidden="true"
                  />
                  <Text paddingLeft={2}>
                    <Anchor href={`mailto:${companyInfo.email}`}>
                      {companyInfo.email}
                    </Anchor>
                  </Text>
                </Flexbox>
                <Flexbox paddingBottom={4}>
                  <i className="fa fa-fw fa-2x fa-clock-o" aria-hidden="true" />
                  <Flexbox column>
                    <Text paddingLeft={2} p semibold>
                      Working Hours
                    </Text>
                    <Text>
                      Mon-Fri: 8:00 AM – 5:00 PM (GMT+7)
                      <br />
                      Sat: 8:30 AM – 12:00 PM (GMT+7)
                    </Text>
                  </Flexbox>
                </Flexbox>
              </Flexbox>

              <Flexbox
                column
                flex={1}
                paddingHorizontal={2}
                paddingVertical={2}
              >
                <Flexbox paddingBottom={6}>
                  <Image
                    src="../static/icons/proposal.svg"
                    alt="proposal"
                    width={iconSizes.default}
                  />
                </Flexbox>
                <Flexbox column>
                  <Form>
                    <Form.Field>
                      <input placeholder="Name" />
                    </Form.Field>
                    <Form.Field>
                      <input type="email" placeholder="Email" />
                    </Form.Field>
                    <Form.Field>
                      <input placeholder="Subject" />
                    </Form.Field>
                    <Form.Field>
                      <textarea placeholder="Message" rows={5} />
                    </Form.Field>
                    <Button type="submit">Send Message</Button>
                  </Form>
                </Flexbox>
              </Flexbox>
            </Flexbox>
          </Flexbox>
        </ContentMaxWidth>
      </Fragment>
    );
  }
}

export default Contact;
