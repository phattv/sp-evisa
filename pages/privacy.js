// @flow
// vendor
import React from 'react'
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
} from '../components'

const faqs = [
  {
    question: '1. Security',
    answer: 'Vietnamvisafast-cheat.com is committed to providing the highest level of security and privacy. All transactions of user authentication including credit cards processing are conducted using SSL (Secure Socket Layer) technology, supported by your browser, which encrypts all information that is sent to us. Our security certificate has been verified by Comodo Group (USA), using the best commercially available encryption on the Internet. We take every precaution to protect personal information from loss, misuse, unauthorized access, disclosure, alteration or destruction by implementing policies and procedures to ensure that personal information is kept only for the purposes for which it has been gathered.',
  },
  {
    question: '2. Information',
    answer: 'answer',
  },
  {
    question: '3. Disclaimer',
    answer: 'answer',
  },
  {
    question: '4. Summary',
    answer: 'answer',
  },
]

type Props = {}
type State = {
  shouldShowMore: boolean,
}
class PrivacyPolicy extends React.Component<Props, State> {
  state = {
    shouldShowMore: false,
  }

  toggleShouldShowMore = () => {
    this.setState({
      shouldShowMore: !this.state.shouldShowMore,
    })
  }

  componentDidMount() {
    window.Intercom("update");
  }

  render() {
    const { shouldShowMore } = this.state

    return (
      <Layout>
        <Image src="/static/images/privacy-background.png" />
        <PageHeader header="PRIVACY POLICY" />
        <Content>
          <Flexbox width="100%" column flex={1} alignItems="flex-start">
            <BlockHeader header="Privacy Policy" />
            <Text p>
              By developing this Policy, we – Vietnam-visa.com are committed to protecting and preserving the privacy of our users and clients, ensuring the confidentiality of the information they provide.  By applying for a visa to Vietnam with Vietnam-visa.com, you agree to accept the following conditions of our privacy statement.
            </Text>
            {shouldShowMore
              ? faqs.map((faq, index) => (
                  <Flexbox column alignItems="flex-start" key={index}>
                    <Text p bold size="l">
                      {faq.question}
                    </Text>
                    <Text
                      p
                      dangerouslySetInnerHTML={{ __html: faq.answer }}
                      whiteSpace="pre-line"
                    />
                  </Flexbox>
                ))
              : faqs.slice(0, 2).map((faq, index) => (
                  <Flexbox column alignItems="flex-start" key={index}>
                    <Text p bold size="l">
                      {faq.question}
                    </Text>
                    <Text
                      p
                      dangerouslySetInnerHTML={{ __html: faq.answer }}
                      whiteSpace="pre-line"
                    />
                  </Flexbox>
                ))}

            <Button
              solid
              marginVertical={3}
              onClick={this.toggleShouldShowMore}
            >
              {shouldShowMore ? (
                <Text alignItems="center" color="white">
                  SHOW LESS <i className="fa fa-arrow-up" />
                </Text>
              ) : (
                <Text alignItems="center" color="white">
                  READ MORE <i className="fa fa-arrow-down" />
                </Text>
              )}
            </Button>
          </Flexbox>
        </Content>
      </Layout>
    )
  }
}

export default PrivacyPolicy
