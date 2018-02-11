// @flow
// vendor
import React from 'react'
// custom
import {
  Button,
  BlockHeader,
  Content,
  Flexbox,
  Image,
  Layout,
  Text,
} from '../components'

const faqs = [
  {
    question: 'Processing time',
    answer:
      'Processing time is the time for arranging your visa approval letter and returning it to your registered email. The processing time offered by Vietnam-visa.com is based on the processing time frame provided by the Vietnam Immigration Department (the agency directly handles your Vietnam visa application and issues your visa approval letter): 8.00 am – 10.30 am and 13.30 pm – 15.00 pm (GMT+7) (except for Saturday, Sunday and national holidays). Under normal circumstances, it takes 2 working days (normal processing) or 1 working (urgent processing), starting immediately if your application and payment are delivered to us within the above stated time frames OR starting from the next working day/shift otherwise, to return visa approval letter to your registered email.\n' +
      '\n' +
      'In special cases, additional documents or confirmations may be required and processing time may be longer than usual. In such cases, we will inform you by email.\n' +
      '\n' +
      'The Vietnam Immigration Department may delay and/or deny the visa processing without any explanation. Vietnam-visa.com has no responsibility for any delay, cancellation, financial and other losses due to denial or delay in processing. No service fees, embassy fees, courier fees, shipping charges or any portion thereof will be refunded in case of delay or denial.\n' +
      '\n',
  },
  {
    question: 'Fees & payments',
    answer: 'answer',
  },
  {
    question: 'Cancellation and Refund Policy',
    answer: 'answer',
  },
  {
    question: 'Disclaimer',
    answer: 'answer',
  },
  {
    question: 'Privacy',
    answer: 'answer',
  },
  {
    question: 'Can I use Vietnam visa on arrival for my entry by land or sea?',
    answer: 'answer',
  },
  {
    question: 'Security',
    answer: 'answer',
  },
  {
    question:
      'What is difference between a single entry visa and a multiple entry visa?',
    answer: 'answer',
  },
  {
    question: 'Entire Agreement',
    answer: 'answer',
  },
  {
    question: 'Contacting the website',
    answer: 'answer',
  },
]

type Props = {}
type State = {
  shouldShowMore: boolean,
}
class TermsAndCondition extends React.Component<Props, State> {
  state = {
    shouldShowMore: false,
  }

  toggleShouldShowMore = () => {
    this.setState({
      shouldShowMore: !this.state.shouldShowMore,
    })
  }

  render() {
    const { shouldShowMore } = this.state

    return (
      <Layout>
        <Image src="/static/images/contact-us-background.png" />
        <Content>
          <Flexbox width="100%" column flex={1} alignItems="flex-start">
            <BlockHeader header="Terms Of Use" />
            <Text p>
              In these Terms and Conditions “we, our, us” refers to
              <Text bold color="visaRed">
                Vietnamvisafast-cheap.com
              </Text>. Please read these Terms of Use before using this website.
            </Text>
            <Text p>
              By accessing to{' '}
              <Text bold color="visaRed">
                Vietnamvisafast-cheap.com
              </Text>, by sending or delivering your application(s) and other
              document(s) to us, you express your unconditional agreement with
              these Terms of Use and to follow these terms and any applicable
              regulations and laws. If you do not agree with the terms stated in
              this agreement or are dissatisfied with the site, please contact
              us immediately. Your failure to follow these Terms & Conditions
              may result in legal action, suspension or termination of your
              access to this Site without notice. Vietnam-visa.com reserves the
              right to change the Terms & Conditions without notice.
            </Text>
            {shouldShowMore
              ? faqs.map((faq, index) => (
                  <Flexbox column alignItems="flex-start" key={index}>
                    <Text p bold size={l}>
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
                    <Text p bold size={l}>
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

export default TermsAndCondition
