// @flow
// vendor
import React, { Fragment } from 'react';
// custom
import { Flexbox, Image, Text } from '../components/ui';
import ContentMaxWidth from '../components/ContentMaxWidth';
import { colors, iconSizes, spacingValues } from '../constants/ui';
import { logPageView } from '../utils/analytics';
import Heading from '../components/Heading';

const faqMaxWidth = 800 / 5;
const faqsConstants = [
  {
    question: 'What is Vietnam visa on arrival?',
    answer:
      'Visa on arrival is an alternative way to obtain a visa for Vietnam in addition to the traditional way of getting a visa at Vietnam Embassy. Applying for this kind of visa, you – the visa applicant is required to submit an online application for a visa approval letter which functions as an official permission allowing you to board the flight and have your visa stamped at the arrival airport in Vietnam. To get your visa stamped, you need to submit your Vietnam approval letter together with your passport (at least 6 months validity), two passport-sized photos, Vietnamese visa application form and stamping fee to Immigration Officers at the airport. There is a basic difference between visa on arrival and visa at Vietnam embassies. With visa on arrival, the Vietnam Immigration Department will issue a visa approval letter with your name on it stating that you are allowed to enter Vietnam on a specified date. Then, you will have the visa stamped onto your passport at the arrival airport in Vietnam. But for visa applied at the Vietnam embassies, the visa stamp will be on your passport when they send it back to you.',
    showAnswer: false,
  },
  {
    question: 'What is Vietnam Visa approval letter?',
    answer:
      '- The Vietnam Visa Approval Letter is a pre-approved application you need before entering Vietnam. You can get the Approval Letter or Vietnam Visa at local Vietnam Embassy by yourself.\n' +
      '- If you have no free-time or stay far away the local Vietnam Embassy, our service can support you to apply the pre-approved letter for Vietnam Visa through a travel agent in Vietnam quickly and most conveniently.\n' +
      '- Please fill in the online secured form in this website to get pre-approved letter for Vietnam visa online with us. After receiving your visa request, we will contact with the Vietnam Immigration Department for arrangement as soon as possible.\n' +
      '- Please be noted that:\n' +
      '•\tWe will arrange Vietnam visa upon arrival if having no special request.\n' +
      '•\tYour visa request will be processing in 2 working days.\n' +
      '\n' +
      '- If you want to get the visa immediately (30 minutes to less than an hour) , please contact our hotline \n',
    showAnswer: false,
  },
  {
    question:
      'What information do I need to provide to apply for my Vietnam visa approval letter?',
    answer:
      'Just some simple steps, fill in the online secured form in this website to get pre-approved letter for Vietnam visa online with us. You are going to give us your name, your date of birth, your nationality, your visa number, the type of visa you are applying for, your entry-exit day. After receiving your visa request, we will contact with the Vietnam Immigration Department for arrangement as soon as possible\n',
    showAnswer: false,
  },
  {
    question:
      'Can I enter Vietnam earlier or leave Vietnam later than my granted arrival date in the visa approval letter?',
    answer:
      'Please be informed that a visa will be valid from the entry date to the exit date as printed on the visa approval letter. \n' +
      'You can stay in Vietnam at any time between the entry date and the exit date.\n' +
      ' In other words, you can’t enter Vietnam before the entry date and you have to leave by the exit date.\n' +
      'As a result, we regret to inform you that you cannot enter Vietnam earlier than your granted arrival date in visa approval letter. \n' +
      ' You need to enter on exact day of arrival granted in your visa approval letter.',
    showAnswer: false,
  },
];
// is this the official Government Website?
// how fast i get approved
// we’ve made the payment. Now what?

/**
 * FAQ
 */
type Props = {};
type State = {
  faqs: Array<Object>,
};

class FAQ extends React.Component<Props, State> {
  static defaultProps: Props = {};

  state = {
    faqs: faqsConstants,
  };

  toggleShowAnswer = index => {
    const { faqs } = this.state;
    faqs[index].showAnswer = !faqs[index].showAnswer;
    this.setState({
      faqs,
    });
  };

  componentDidMount() {
    logPageView();
  }

  render() {
    const { faqs } = this.state;

    return (
      <ContentMaxWidth>
        <Flexbox
          paddingVertical={spacingValues.blockPaddingTop}
          column
          alignItems="center"
          width="100%"
          maxWidth={faqMaxWidth}
        >
          <Heading text="Why visa on arrival?" />
          <Text textAlign="left" fontSize="s" width="100%" p>
            A valid visa is required for most foreign travelers to Vietnam.
            There are two options:
          </Text>
          <Text textAlign="justify" fontSize="s" p>
            <Text fontSize="s" color="green">
              Via a Vietnam Embassy:
            </Text>{' '}
            This is the traditional method that requires some trips to the
            nearest embassy. This method can be time-consuming or not an option
            for some people if there is no embassy in your area.
          </Text>
          <Text fontSize="s" textAlign="justify">
            <Text fontSize="s" color="green">
              Online application:
            </Text>{' '}
            This method will let you do everything online for the visa approval
            letter, and you will get your visa stamped onto your passport at the
            arrival airport in Vietnam.
          </Text>

          <Flexbox paddingBottom={5} alignItems="center" paddingTop={15}>
            <Image
              src="../static/icons/team.svg"
              alt="team"
              width={iconSizes.default}
            />
            <Flexbox paddingLeft={3}>
              <Text fontSize="l">Frequently Asked Questions</Text>
            </Flexbox>
          </Flexbox>

          {faqs.map((faq, index) => (
            <Flexbox
              width="100%"
              clickable
              backgroundColor="white"
              key={index}
              paddingHorizontal={3}
              paddingVertical={3}
              marginVertical={2}
              column
              onClick={() => this.toggleShowAnswer(index)}
            >
              <Flexbox justifyContent="space-between" alignItems="center">
                <Text
                  color={faq.showAnswer ? 'green' : 'mediumBlue'}
                  textNotSelectable
                  paddingRight={4}
                >
                  {faq.question}
                </Text>
                <i
                  className={`fa fa-chevron-${faq.showAnswer ? 'up' : 'down'}`}
                  color={colors.green}
                />
              </Flexbox>
              {faq.showAnswer && (
                <Text fontSize="s" paddingTop={2}>
                  {faq.answer}
                </Text>
              )}
            </Flexbox>
          ))}
        </Flexbox>
      </ContentMaxWidth>
    );
  }
}

export default FAQ;
