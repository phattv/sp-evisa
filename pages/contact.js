// @flow
// vendor
import React, { Fragment } from 'react';
import { logPageView } from '../utils/analytics';
import { Form } from 'semantic-ui-react';
// custom
import { Anchor, Button, Flexbox, Image, Text } from '../components/ui';
import ContentMaxWidth from '../components/ContentMaxWidth';
import Heading from '../components/Heading';
import { iconSizes, pageNames } from '../constants/ui';
import { companyInfo } from '../constants/companyInfo';
import { feedback } from '../utils/apiClient';

/**
 * Contact show company contact information
 */
type Props = {};
type State = {
  name: string,
  email: string,
  subject: string,
  message: string,
  responseMessage: string,
};
class Contact extends React.Component<Props, State> {
  state = {
    name: '',
    email: '',
    subject: '',
    message: '',
    responseMessage: '',
  };

  componentDidMount() {
    logPageView();
  }

  updateTextInput = (event: Object) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onSubmit = () => {
    this.setState({
      responseMessage: '',
    });

    const { name, email, subject, message } = this.state;
    if (!message || !email) {
      return this.setState({
        responseMessage: 'Please fill in the required fields',
      });
    }
    feedback(
      {
        name,
        email,
        subject,
        message,
      },
      this.showMessage,
    );
  };

  showMessage = (response: Object) => {
    this.setState({
      responseMessage: response.message,
    });
  };

  render() {
    const { name, email, subject, message, responseMessage } = this.state;

    return (
      <Fragment>
        <ContentMaxWidth>
          <Flexbox paddingTop={16} column alignItems="center">
            <Heading text="Get In Touch" />
            <Text textAlign="center" maxWidth={150}>
              We are committed to provide the best and most rewarding experience
              to all travelers to Vietnam. Therefore, whether you plan to use
              our service or just need help with your visa in Vietnam, feel free
              to drop us instant messages, send us an enquiry, or check out our
              intensive <Anchor href={pageNames.faq}>FAQs</Anchor>.
            </Text>

            <Flexbox paddingVertical={14} responsiveLayout>
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
                {/*<Flexbox paddingBottom={4} alignItems="baseline">*/}
                {/*<Flexbox width={10}>*/}
                {/*<Image*/}
                {/*src="../static/icons/location.svg"*/}
                {/*alt="location"*/}
                {/*width={iconSizes.small}*/}
                {/*/>*/}
                {/*</Flexbox>*/}
                {/*<Text paddingLeft={4}>{companyInfo.address}</Text>*/}
                {/*</Flexbox>*/}
                <Flexbox paddingBottom={4}>
                  <Flexbox width={10}>
                    <Image
                      src="../static/icons/call.svg"
                      alt="call"
                      width={iconSizes.small}
                    />
                  </Flexbox>
                  <Flexbox paddingLeft={4}>
                    <a href={`tel:${companyInfo.phone}`}>
                      <Text color="green" clickable>
                        {companyInfo.phoneString}
                      </Text>
                    </a>
                  </Flexbox>
                </Flexbox>
                <Flexbox paddingBottom={4}>
                  <Flexbox width={10}>
                    <Image
                      src="../static/icons/email.svg"
                      alt="email"
                      width={iconSizes.small}
                    />
                  </Flexbox>
                  <Text paddingLeft={4}>
                    <a href={`mailto:${companyInfo.email}`}>
                      <Text color="green" clickable>
                        {companyInfo.email}
                      </Text>
                    </a>
                  </Text>
                </Flexbox>
                <Flexbox paddingBottom={4} alignItems="baseline">
                  <Flexbox width={10}>
                    <Image
                      src="../static/icons/time.svg"
                      alt="time"
                      width={iconSizes.small}
                    />
                  </Flexbox>
                  <Flexbox column paddingLeft={4}>
                    <Text semibold>Working Hours</Text>
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
                  <Form onSubmit={this.onSubmit}>
                    <Form.Field>
                      <input
                        name="name"
                        value={name}
                        placeholder="Name"
                        onChange={this.updateTextInput}
                      />
                    </Form.Field>
                    <Form.Field>
                      <input
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Email"
                        onChange={this.updateTextInput}
                      />
                    </Form.Field>
                    <Form.Field>
                      <input
                        name="subject"
                        value={subject}
                        placeholder="Subject"
                        onChange={this.updateTextInput}
                      />
                    </Form.Field>
                    <Form.Field>
                      <textarea
                        name="message"
                        value={message}
                        placeholder="Message"
                        onChange={this.updateTextInput}
                        rows={5}
                      />
                    </Form.Field>
                    <Button type="submit">Send Message</Button>
                  </Form>

                  {responseMessage && (
                    <Text paddingTop={4}>{responseMessage}</Text>
                  )}
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
