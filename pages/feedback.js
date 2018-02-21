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
  Input,
} from '../components'

const faqs = [
  {
    question: 'What is Vietnam visa on arrival?',
    answer:
      'Visa on arrival is an alternative way to obtain a visa for Vietnam in addition to the traditional way of getting a visa at Vietnam Embassy.\n' +
      'With this kind of visa, you – the visa applicant is required to submit an online application for a visa approval letter which functions as an official permission allowing you to board the flight and have visa stamped at the arrival airport in Vietnam. To get visa stamped, you need to submit your Vietnam approval letter together with your passport (at least 6 months validity), two passport-sized photos, Vietnamese visa application form and stamping fee to Immigration Officers at the airport.\n' +
      '\n' +
      'There is a basic difference between visa on arrival and visa at Vietnam embassies. With visa on arrival, the Vietnam Immigration Department will issue a visa approval letter with your name on it stating that you are allowed to enter Vietnam on a specified date. Then, you will have the visa stamped onto your passport at the arrival airport in Vietnam. But for visa applied at the Vietnam embassies, the visa stamp will be on your passport when they send it back to you.',
  },
  {
    question: 'What is Vietnam Visa approval letter?',
    answer: 'answer',
  },
  {
    question:
      'What information do I need to provide to apply for my Vietnam visa approval letter?',
    answer: 'answer',
  },
  {
    question:
      'Can I enter Vietnam earlier than my granted arrival date in the visa approval letter?',
    answer: 'answer',
  },
  {
    question:
      'Can I exit Vietnam later than the exit date granted in my visa approval letter?',
    answer: 'answer',
  },
  {
    question: 'Can I use Vietnam visa on arrival for my entry by land or sea?',
    answer: 'answer',
  },
  {
    question: 'What if my arrival airport changes?',
    answer: 'answer',
  },
  {
    question:
      'What is difference between a single entry visa and a multiple entry visa?',
    answer: 'answer',
  },
  {
    question: '',
    answer: 'answer',
  },
]

type Props = {}
type State = {
  shouldShowMore: boolean,
}
class Feedback extends React.Component<Props, State> {
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
        <Image src="/static/images/feedback-background.png" />
        <PageHeader header="FEEDBACK" />
        <Content>
          <Flexbox width="100%" column flex={1} alignItems="flex-start">
            <BlockHeader header="Frequently Asked Questions" />
            {shouldShowMore
              ? faqs.map((faq, index) => (
                  <Flexbox column alignItems="flex-start" key={index}>
                    <Text p bold>
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
                    <Text p bold>
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
                  SHOW LESS{' '}
                  <i className="fa fa-arrow-up" />
                </Text>
              ) : (
                <Text alignItems="center" color="white">
                  READ MORE{' '}
                  <i className="fa fa-arrow-down" />
                </Text>
              )}
            </Button>

            <Flexbox
              widtd="100%"
              column
              paddingTop={10}
              width="100%"
              backgroundColor="lighterGrey"
              paddingVertical={2}
              paddingHorizontal={2}
            >
              <Text p bold color="visaBlue">
                Still got question(s)? Fill in the below form to submit it to
                our support center. Answers will be provided within 24 hours!
              </Text>
              <Flexbox width="100%" marginVertical={2}>
                <Flexbox flex={1} marginRight={2}>
                  <Input placeholder="Name" />
                </Flexbox>
                <Flexbox flex={1}>
                  <Input placeholder="Email" />
                </Flexbox>
              </Flexbox>
              <Flexbox width="100%" marginVertical={2}>
                <Flexbox flex={1} marginRight={2}>
                  <Input placeholder="Phone" />
                </Flexbox>
                <Flexbox flex={1}>
                  <Input placeholder="Subject" />
                </Flexbox>
              </Flexbox>
              <Flexbox width="100%" marginVertical={2}>
                <textarea
                  rows="5"
                  placeholder="Message"
                  style={{
                    width: '100%',
                    backgroundColor: 'white',
                    borderColor: 'white',
                    paddingTop: 10,
                    paddingRight: 10,
                    paddingLeft: 10,
                    borderRadius: 6,
                  }}
                />
              </Flexbox>

              <Button solid minWidth={30}>
                SUBMIT
              </Button>
            </Flexbox>
          </Flexbox>
        </Content>
      </Layout>
    )
  }
}

export default Feedback
