// @flow
// vendor
import React from "react";
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
  Input
} from "../components";

const faqs = [
  {
    question: "What is Vietnam visa on arrival?",
    answer:
      "Visa on arrival is an alternative way to obtain a visa for Vietnam in addition to the traditional way of getting a visa at Vietnam Embassy. Applying for this kind of visa, you – the visa applicant is required to submit an online application for a visa approval letter which functions as an official permission allowing you to board the flight and have your visa stamped at the arrival airport in Vietnam. To get your visa stamped, you need to submit your Vietnam approval letter together with your passport (at least 6 months validity), two passport-sized photos, Vietnamese visa application form and stamping fee to Immigration Officers at the airport. There is a basic difference between visa on arrival and visa at Vietnam embassies. With visa on arrival, the Vietnam Immigration Department will issue a visa approval letter with your name on it stating that you are allowed to enter Vietnam on a specified date. Then, you will have the visa stamped onto your passport at the arrival airport in Vietnam. But for visa applied at the Vietnam embassies, the visa stamp will be on your passport when they send it back to you."
  },
  {
    question: "What is Vietnam Visa approval letter?",
    answer:
      "- The Vietnam Visa Approval Letter is a pre-approved application you need before entering Vietnam. You can get the Approval Letter or Vietnam Visa at local Vietnam Embassy by yourself.\n" +
      "- If you have no free-time or stay far away the local Vietnam Embassy, our service can support you to apply the pre-approved letter for Vietnam Visa through a travel agent in Vietnam quickly and most conveniently.\n" +
      "- Please fill in the online secured form in this website to get pre-approved letter for Vietnam visa online with us. After receiving your visa request, we will contact with the Vietnam Immigration Department for arrangement as soon as possible.\n" +
      "- Please be noted that:\n" +
      "•\tWe will arrange Vietnam visa upon arrival if having no special request.\n" +
      "•\tYour visa request will be processing in 2 working days.\n" +
      "\n" +
      "- If you want to get the visa immediately (30 minutes to less than an hour) , please contact our hotline \n"
  },
  {
    question:
      "What information do I need to provide to apply for my Vietnam visa approval letter?",
    answer:
      "Just some simple steps, fill in the online secured form in this website to get pre-approved letter for Vietnam visa online with us. You are going to give us your name, your date of birth, your nationality, your visa number, the type of visa you are applying for, your entry-exit day. After receiving your visa request, we will contact with the Vietnam Immigration Department for arrangement as soon as possible\n"
  },
  {
    question:
      "Can I enter Vietnam earlier than my granted arrival date in the visa approval letter?",
    answer:
      "Just some simple steps, fill in the online secured form in this website to get pre-approved letter for Vietnam visa online with us. You are going to give us your name, your date of birth, your nationality, your visa number, the type of visa you are applying for, your entry-exit day. After receiving your visa request, we will contact with the Vietnam Immigration Department for arrangement as soon as possible\n"
  },
  {
    question:
      "Can I exit Vietnam later than the exit date granted in my visa approval letter?",
    answer:
      "•\tA single entry visa allows you enter/ exit Vietnam one time or it is also called visa with single use. Once your single entry visa used, you cannot enter Vietnam without a new visa. You must apply for the new one if you want to come back to Vietnam. You cannot re-enter Vietnam if you exit Vietnam after 10 days staying, even your visa valid for 30days.\n" +
      "A multiple entry visa allows you to enter/exit Vietnam as many times as you want in case your Vietnam visa is still valid"
  }
];

type Props = {};
type State = {
  shouldShowMore: boolean
};
class Feedback extends React.Component<Props, State> {
  state = {
    shouldShowMore: false
  };

  toggleShouldShowMore = () => {
    this.setState({
      shouldShowMore: !this.state.shouldShowMore
    });
  };

  componentDidMount() {
    window.Intercom("update");
  }

  render() {
    const { shouldShowMore } = this.state;

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
                  SHOW LESS <i className="fa fa-arrow-up" />
                </Text>
              ) : (
                <Text alignItems="center" color="white">
                  READ MORE <i className="fa fa-arrow-down" />
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
                    width: "100%",
                    backgroundColor: "white",
                    borderColor: "white",
                    paddingTop: 10,
                    paddingRight: 10,
                    paddingLeft: 10,
                    borderRadius: 6
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
    );
  }
}

export default Feedback;
