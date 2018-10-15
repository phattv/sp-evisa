// @flow
// vendor
import React, { Fragment } from 'react';
// custom
import { Flexbox, Image, Text } from '../components/ui';
import ContentMaxWidth from '../components/ContentMaxWidth';
import Heading from '../components/Heading';
import { iconSizes, spacingValues } from '../constants/ui';
import { logPageView } from '../utils/analytics';

const faqMaxWidth = 800 / 5;
const faqsConstants = [
  {
    question: 'What is Vietnam visa on arrival?',
    answer:
      'Visa on arrival is an alternative way to obtain a visa for Vietnam in addition to the traditional way of getting a visa at Vietnam Embassy. Applying for this kind of visa, you – the visa applicant is required to submit an online application for a visa approval letter which functions as an official permission allowing you to board the flight and have your visa stamped at the arrival airport in Vietnam.\n' +
      'To get your visa stamped, you need to submit your Vietnam approval letter together with your passport (at least 6 months validity), two passport-sized photos, Vietnamese visa application form and stamping fee to Immigration Officers at the airport.\n' +
      'There is a basic difference between visa on arrival and visa at Vietnam embassies. With visa on arrival, the Vietnam Immigration Department will issue a visa approval letter with your name on it stating that you are allowed to enter Vietnam on a specified date. Then, you will have the visa stamped onto your passport at the arrival airport in Vietnam. But for visa applied at the Vietnam embassies, the visa stamp will be on your passport when they send it back to you.',
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
  },
  {
    question:
      'What information do I need to provide to apply for my Vietnam visa approval letter?',
    answer:
      'Just some simple steps, fill in the online secured form in this website to get pre-approved letter for Vietnam visa online with us. You are going to give us your name, your date of birth, your nationality, your visa number, the type of visa you are applying for, your entry-exit day. After receiving your visa request, we will contact with the Vietnam Immigration Department for arrangement as soon as possible\n',
  },
  {
    question: 'How do the Vietnam visa pre-approved letter and code look like?',
    answer: '../static/images/sample-approval-letter.jpg',
    isImage: true,
  },
  {
    question: 'How do I receive my visa approval letter?',
    answer:
      'A colored scanned copy of the approval letter will be sent to you by email, so please make sure that you have provided us with the correct email address.\n' +
      'Note: The approval letter is in PDF format. So please make sure you have a PDF reader application in order to open the file.',
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
  },
  {
    question: 'Can I travel without the letter and get the visa when I arrive?',
    answer:
      'No, you cannot. In order to board the plane, you must show the approval letter to the airlines. This letter is also compulsory in order for you to get the visa at the Vietnam airport.\n' +
      'Therefore, we recommend that you leave enough time to apply for the visa to avoid having to delay or change your flight.',
  },
  {
    question: 'How safe are my credit card details?',
    answer:
      'For secure online payment, we use Secure Socket Layers (SSL). At no time are your debit/credit card details transmitted unencrypted over the internet. For further information, please refer to our privacy statement.',
  },
  {
    question: 'What credit/debit cards are accepted for online payment?',
    answer:
      'We currently accept both Debit/Credit cards (Visa & Master) for our online approval letter service.',
  },
  {
    question: 'What if my passport has expired?',
    answer:
      "To apply for a visa to Vietnam, your passport must have at least 6 month's validity. Therefore, if your passport is about to expire, please get a new one before applying for your visa in order to avoid unwanted problems at the airport.",
  },
  {
    question:
      'How long does it take to complete the procedure at Vietnam airport?',
    answer:
      'It normally takes 15 -30 minutes to complete the procedure at Vietnam airport. However it also depends on the traffic of passengers coming to Vietnam at that moment.\n' +
      'To avoid wasting your time and get long line for getting visa stamp, we suggest you should choose our airport fast track services http://evisa-vn.com/services/. Our staff will prepare an entry and exit form filled with your information and process all of procedure for you to get your visa stamped the fastest way at the airport.',
  },
  {
    question: 'My credit card number is correct, but it is not accepted. Why?',
    answer:
      'You may encounter one of these problems:\n' +
      '- The card expiration is incorrectly entered.\n' +
      '- You have reached your credit limit.\n' +
      '- There is a computer error.\n' +
      '- Visa Verified password / Master Secure Code incorrectly entered.',
  },
  {
    question: 'What if my arrival airport changes?',
    answer:
      'Be kindly informed that there will be no problem if you change your arrival airport. Since the visa approval letter works at three International Airports of Vietnam:\n' +
      '- Noi Bai International Airport in Hanoi\n' +
      '- Tan Son Nhat International Airport in Ho Chi Minh City\n' +
      '- Danang Airport in Danang City\n' +
      'You still get the visa stamped onto your passport at any of these three airports regardless of which you put in your visa application.',
  },
  {
    question:
      'Can I get visa to Vietnam upon arrival if I come to Vietnam by ship or land?',
    answer:
      "We only support a Vietnam visa upon arrival by air. If you come to Vietnam by sea or road, contact Vietnam Embassy where you're living for help.",
  },
  {
    question: 'How long in advance should I apply for a visa?',
    answer:
      'Normally, you will receive the approval letter within 1 Working day. There is no time frame required to apply for a visa in advance.\n' +
      'However we suggest you should apply at least 1 week in advance to avoid any hassle or unwanted problems',
  },
  {
    question: 'Do I need a single or multiple entries visa?',
    answer:
      'First of all, we would like to inform you that our Vietnam visa services are available at the airport only. Therefore your visa must be picked up at the airport of Vietnam when you arrive if you use our visa service.\n' +
      'Warning: Because this service is available at airports only, so you should contact Vietnamese embassy to get visa if you do not enter Vietnam by air.\n' +
      'Please consider our advice below to decide single or multiple entries visa:\n' +
      '- Single entry visa allows you enter/exit Vietnam 1 time or it is also called visa with single use. Once your single entry visa used, you cannot enter Vietnam again with the used visa. You must apply for the new one if you want to come back Vietnam. For example, with 1 month single entry visa, you can enter Vietnam for 1 time and stay there for less than 30 days. You cannot re-enter Vietnam if you exit Vietnam after 10 days staying, even your visa valid for 30 days.\n' +
      '- Multiple entries visa allows you enter/exit Vietnam unlimited times as long as your visa still valid. Your multiple entries visa must be picked at the airport when you arrive. After getting your multiple entries visa at the airport, you can exit and re-enter Vietnam at any ports you want. Once you want to come back Vietnam but your visa is expired, you also need to apply for a new visa.\n' +
      'In conclusion, your visa must be picked up upon arrival at the airport of Vietnam, but you can exit Vietnam at any ports you want after you get your Vietnam visa stamped on your passport at the airport. We recommend you apply for multiple entries visa if you intend to enter/exit Vietnam many times for a period.',
  },
  {
    question:
      'In emergency/urgent case, how fast can I get Vietnam visa approval letter?',
    answer:
      'There is ways to get visa to Vietnam express within 30 minutes/4-8 hours by apply Vietnam visa on arrival at http://evisa-vn.com/apply/ . For emergency/urgent visa to Vietnam, please do the following step:\n' +
      'Send your passport details with emergency/urgent Vietnam visa request. Please send us your passport detail by scan your passport then send to dieu@evisa-vn.com/contact@evisa-vn.com with request of emergency/urgent visa or send the form online through our site with special request for emergency/urgent visa. We can process visa Vietnam express for you base on your request. Please advise us exactly which airport you will enter Vietnam.\n' +
      'Notes:\n' +
      '- We are not responsible for any refusal on your emergency/urgent visa to Vietnam, as Vietnam Immigration Department will check your records and deciding your visa request approved or dis-approved.\n' +
      '- Emergency/ urgent visa to Vietnam will be stamped at Vietnam International Airport (Noi Bai or Tan Son Nhat or Da Nang Airport).\n' +
      '- You are asked to choose airport fast-track service when you apply for emergency service',
  },
  {
    question: 'Do I have to provide you with my exact arrival date?',
    answer:
      'You should provide us with an estimate arrival date and it should be the earliest time possible you can enter Vietnam because you cannot travel to Vietnam before the granted arrival date.',
  },
  {
    question: 'Can I apply 6-month visas in Vietnam?',
    answer:
      'From 24th August 2014, the Immigration Dept temporarily has stopped granting 6 months multiple visa. Therefore the maximum length you can apply is a 3 months multiple visa.',
  },
  {
    question: 'Where to get the visa stamp?',
    answer:
      'We arrange visa upon arrival at the airport for those entering Vietnam by air and wish to get visa at the airport. Therefore your visa must be picked up at the airport. You should contact Vietnamese embassy to get visa if you do not enter Vietnam by air.\n' +
      'You must have pre-approved letter from Vietnam Immigration Department that allow you to pick up your visa upon arrival to Vietnam at the airport. Without this letter you cannot board the airplane and get visa when you arrive.\n' +
      'When you arrive at the airport of Vietnam, you will see "LANDING VISA" counter before you check-in, come to the "Landing visa" counter, show the pre-approved letter for checking on the system then wait for your visa stamped on your passport.',
  },
  {
    question: 'How can I extend my visa when I am in Vietnam?',
    answer:
      'When the expired day of your Vietnamese visa is nearly coming up, please contact directly Vietnam Immigration Office, located at:\n' +
      '- In Hanoi: No. 40A Hang Bai Street, Hoan Kiem District, Ha Noi\n' +
      '- In Da Nang City: No. 7 Tran Quy Cap Street, Da Nang City\n' +
      '- In Ho Chi Minh City (Saigon): No. 254 Nguyen Trai Street, District 1, Ho Chi Minh City\n' +
      "If you don't know how to do or you don't want to waste your valuable time, we are pleased to do it for you. Let our experts who have good relationship with the Vietnamese Immigration Department proceed the Vietnam visa extension for you.\n" +
      'Whenever need our helps, please scan your passport and visa then send them to us via email: contact@evisa-vn.com. After receiving them, we will advise you what to do next. Please contact us to have the price for visa extension.',
  },
  {
    question: 'What is the photo requirement for Vietnam visa on arrival?',
    answer:
      'The photo size requirement is 4 x 6 cm but it’s not so strict at all. Therefore, a bit smaller or larger one can be accepted.',
  },
  {
    question: 'How much in total do I have to pay for Vietnam Visa on arrival?',
    answer:
      'There are two kinds of Vietnam visa fees that you have to pay to get visa on arrival to Vietnam, including visa service fee and visa stamping fee:\n' +
      "1. Service fee: Visa service fee is the amount that the applicant have to pay in advance for service during a Vietnam visa online processing from receiving and checking the applicant's personal information to collecting the pre-approval visa letter from the Vietnam Immigration Department and sending it to applicant in order to get their visa stamped at the Vietnam Airports (Hanoi, HoChiMinh, Danang) on arrival.\n" +
      '2. Visa Stamping Fee: Visa Stamping fee is the amount that you will directly pay to Immigration Officers by USD or VND cash at the Immigration Counter to get your Vietnam Visa stamped on your passport on arrival at the Vietnam airport.',
  },
  {
    question:
      'Which documents have I show to the customs to get Vietnam Visa Stamp at the airport?',
    answer:
      'When having the approval letter, you need to print it out for boarding airplane. The customs at your airport will check it and allow you to board the plane. (Those who do not have the visa approval letter will be not allowed for boarding).\n' +
      'Besides the approval letter, every customer needs to prepare below things for their application to get their visa stamped at the airport:\n' +
      '- Passport (valid for at least 6 months on arrival)\n' +
      '- Filled entry and exit form\n' +
      '- 02 passport-sized photos\n' +
      '- Stamping fee\n' +
      'If you need any help, please feel free to contact us via email: contact@evisa-vn.com/dieu@evisa-vn.com\n' +
      'Then, you will come to "LANDING VISA/VISA ON ARRIVAL" counter after landing to apply. Then wait until your name is called. Get your visa and enjoy your trip.',
  },
  {
    question: 'Do you require my passport scan?',
    answer:
      'Normally you are not required to send us your passport scan. All you need to do is just fill out our Vietnam visa online form with all your detailed information.\n' +
      'However, in some case, you are required to do so because the Immigration Office may need to verify your passport number, such as: Chinese citizens.',
  },
  {
    question: 'Who needs Visa to Vietnam?',
    answer:
      'Vietnam allows nationals of 17 countries to enter Vietnam without a visa for varying time periods, most of the countries being members of the ASEAN:\n' +
      '- Thailand,Singapore,Indonesia,Malaysia,Cambodia,Lao,Kyrgyzstan passport holders (valid for 30 days)\n' +
      '- Philippines passport holders (valid for 21 days)\n' +
      '- South Korea, Japan, Russian, Norway, Denmark, Sweden and Finland passport holders) (valid for 15 days) - required to hold a passport valid for at least 6 months on arrival and they also must make 30 day pause between two arrivals.\n' +
      '- Brunei and Myanmar passport holders (valid for 14 days)\n' +
      'Other Exceptions:\n' +
      '- French diplomatic or official passport holders (90 days or several visits within 6 months)\n' +
      '- Chile diplomatic or official passport holders (less than 60 days).\n' +
      '- APEC Business Travel Card (ABTC) Holders from Asia-Pacific Economic Cooperation (APEC) member economies (less than 60 days).\n' +
      '- Vietnam Visa exemption for visiting Phu Quoc Island: applied for foreigners and Vietnamese Nationals who hold foreign passport (15 days)\n' +
      '- Vietnamese oversea holding visa exemption certificate (less than 90 days).',
  },
  {
    question: 'I have made the payment, what happens next?',
    answer:
      "Here's what will happen next:\n" +
      '1. Please check your inbox for our email and follow the instructions to confirm.\n' +
      '2. Our customer service agent will respond personally to you by the end of the next working day or usually much sooner.',
  },
  {
    question: 'Is this the official Government Website?',
    answer:
      'evisa-vn.com is a non-government site (managed by a private agency) providing visa approval letter service for travelers to Vietnam for a fee and whilst every effort is made to ensure the information is correct and up to date, there may be changes which we are not aware of.',
  },
];

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
                <Image
                  src={`../static/icons/arrow-${
                    faq.showAnswer ? 'up' : 'down'
                  }.svg`}
                  alt="arrow"
                  width={iconSizes.default}
                />
              </Flexbox>
              {faq.showAnswer ? (
                faq.isImage ? (
                  <Image src={faq.answer} />
                ) : (
                  <Text fontSize="s" paddingTop={2} whiteSpace="pre-line">
                    {faq.answer}
                  </Text>
                )
              ) : null}
            </Flexbox>
          ))}
        </Flexbox>
      </ContentMaxWidth>
    );
  }
}

export default FAQ;
