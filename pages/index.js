// @flow
// vendor
import React from "react";
import withRedux from 'next-redux-wrapper'
// custom
import {
  Anchor,
  Layout,
  Content,
  Text,
  Flexbox,
  Button,
  Image,
  BlockHeader
} from "../components";
import { companyInfo } from "../constants/companyInfo";
import { configureStore } from '../redux/store';

const applyVisaSteps = [
  {
    image: "submit-application",
    title: "1. Submit your application",
    content:
      "Fill in the secured online application online. You are required to enter the precise personal information which appears on your passport."
  },
  {
    image: "pay-service-fee",
    title: "2. Pay for service fee",
    content:
      "You can make payment with your Credit/ Debit Card via OnePay/PayPal or pay via Western Union"
  },
  {
    image: "get-approval-letter",
    title: "3. Get your approval letter",
    content:
      "Check your email for your visa approval letter (attached with entry-and- exit form).\n" +
      "Print the documents out and fill in the entry-and- exit form.\n" +
      "Prepare 2 passport sized photos (4x6cm) and stamping fee which is $25 for single entry or $50 for multiple entry visa"
  }
];
const whyChooseUs = [
  {
    image: "directions",
    title: "Faster, cheaper and simpler",
    content:
      "Save your time (it costs you less than 3 minutes to fill in the online form)"
  },
  {
    image: "lock",
    title: "Prompt response, strictly confidential information",
    content:
      "You will get responses within 5 minutes when contacting evisa-vn.com Your information is kept confidentially"
  },
  {
    image: "quality",
    title: "Quality and reliability",
    content:
      "Evisa-vn.com is trusted by clients from all over the world. We guarantee to return all your fee in case your application is rejected."
  },
  {
    image: "time",
    title: "Punctuality guarantee and full-fee return",
    content:
      "We guarantee you will get your visa approval letter within 2 working days/or within 1 working day depending on the services chosen. You get all-your- fee return if your application is rejected and our services do not satisfy your demands."
  }
];
const extraServices = [
  {
    image: "airport-fast-track",
    title: "Air port fast-track Service"
  },
  {
    image: "car-pickup",
    title: "Car pick-up service"
  },
  // {
  //   image: "visa-renewal",
  //   title: "Vietnam visa extension and renewal service"
  // },
  // {
  //   image: "hotel-booking",
  //   title: "Hotel booking service"
  // },
  // {
  //   image: "domestic-flight",
  //   title: "Vietnam domestic flights"
  // },
  // {
  //   image: "travel-booking",
  //   title: "Tour and travel booking"
  // }
];

const typesOfVisa = [
  { value: "touristSingle", label: "Tourist - single (1 month)" },
  { value: "touristMultiple", label: "Tourist - multiple (1 month)" },
  { value: "businessSingle", label: "Business - single (3 months)" },
  { value: "businessMultiple", label: "Business - multiple (3 months)" },
  { value: "student", label: "Student (on arrival)" },
  { value: "transit", label: "Transit - single (5 days)" }
];
const processingTimeOptions = [
  { value: "normal", label: "Normal (Guaranteed 2 working days)" },
  { value: "urgent", label: "Urgent (Urgent (Guaranteed 4-8 working hours)" },
  { value: "emergency", label: "Emergency (Guaranteed 1 working hour)" },
  { value: "overtime", label: "Overtime" },
  { value: "holidy", label: "Holiday" }
];
const purposeOptions = [
  { value: "tourism", label: "Tourism" },
  { value: "work", label: "Work" }
];

const bookingOnlineReasons = [
  {
    title: "Hassle-free",
    content: "100% online procedure, no passport send off"
  },
  {
    title: "Convenience",
    content: "Applicable for all air-travellers to Vietnam"
  },
  {
    title: "Faster",
    content: "Maximum 48 hours processing time"
  },
  {
    title: "Cheaper",
    content: "Low service fee, no hidden charge"
  },
  {
    title: "More accessible",
    content: "Best choice for those living far from Embassies"
  },
  {
    title: "Safe & Sercure",
    content: "Our website is secured by 256 bit SSL encryption and SiteLock."
  }
];
const visaKnowledge = [
  {
    title: "Vietnam Visa Tips",
    content: "Guide to apply and get Visa to Vietnam."
  },
  {
    title: "Vietnam-visa-application",
    content: "Useful informations about Vietnam Visa."
  },
  {
    title: "Apply and Get Visa to Vietnam for foreigners",
    content: "Necessary info for tourist or business to get Vietam Visa."
  },
  {
    title: "VietNam Visa On Arrival",
    content:
      "Most likely the legally easiest way to obtain your visa to Vietnam."
  },
  {
    title: "Urgent VietNam Visa",
    content:
      "Booking visa on Holidays or Weekends or different reasons for everyone."
  }
];
const applyWithConfidence = [
  "Safe and Secure",
  "Good Quality & Reliability",
  "Prompt Responses",
  "Competitive Prices ($11)",
  "Save your time and money",
  "2 working days",
  "Money back guarantee for declined applications"
];

type Props = {};
type State = {};
class Home extends React.Component<Props, State> {
  componentDidMount() {
    window.Intercom("update");
  }

  render() {
    return (
      <Layout
        style={{
          backgroundImage: "url(/static/images/form-background.png)",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundSize: "cover"
        }}
      >
        {/* Form */}
        <Content>
          <Flexbox width="100%" responsiveLayout>
            <Flexbox flex={1} />
            <Flexbox
              flex={1}
              border
              borderColor="visaBlue"
              backgroundColor="lightGrey"
              borderRadius
              paddingVertical={6}
              paddingHorizontal={6}
            >
              <Flexbox column alignItems="center" justifyContent="center">
                <Flexbox paddingBottom={2}>
                  <Text color="visaRed" size="xl" bold textAlign="center">
                    VIETNAM VISA FORM
                  </Text>
                </Flexbox>
                <Text bold size="l">
                  1. BEST PRICE GUARANTEE <br />
                  2. Urgent Vietnam Visa <br />
                  3. Vietnam Visa Extension <br />
                  4. Online Payment
                </Text>
                <Anchor href="/apply">
                  <Button solid marginTop={5}>
                    GET STARTED NOW!
                  </Button>
                </Anchor>
              </Flexbox>
            </Flexbox>
            <Flexbox flex={1} />
          </Flexbox>
        </Content>

        {/* Welcome */}
        <Content>
          <Flexbox column>
            <Flexbox paddingBottom={6}>
              <Text size="xl" bold color="visaBlue" textAlign="center">
                Welcome to evisa-vn.com
              </Text>
            </Flexbox>
            <Text bold textAlign="center" color="white">
              It’s our honor to serve you at{" "}
              <Text bold fontStyle="italic" color="visaBlue">
                evisa-vn.com
              </Text>
              <br />
              Online Vietnam Visa is applied for citizens from all over the
              world who travel to Vietnam by air travel.
            </Text>
            <br />
            <Text textAlign="center" color="white">
              evisa-vn.com is a legal organization approved by Vietnamese
              government
              <br />
              We provide supportive services for online Vietnam Visa applicants
              who need a visa approval letter.
              <br />
              For further information, please contact us at below:
              <br />
              <Text bold color="white">
                Hotline:
              </Text>{" "}
              <Text bold color="white">
                <Anchor href={`tel:${companyInfo.phone}`}>
                  {companyInfo.phoneString}
                </Anchor>
              </Text>
              <br />
              <Text bold color="white">
                Email:
              </Text>{" "}
              <Text bold color="white">
                <Anchor href={`mailto:${companyInfo.email}`}>
                  {companyInfo.email}
                </Anchor>
              </Text>
            </Text>
            <Button solid marginTop={8}>
              Contact us now!
            </Button>
          </Flexbox>
        </Content>

        {/* 3-step */}
        <Content backgroundColor="lightBlue">
          <Flexbox column width="100%">
            <BlockHeader header="3 STEPS TO GET A VIETNAM VISA ONLINE" />
            <Flexbox
              justifyContent="between-around"
              width="100%"
              responsiveLayout
            >
              {applyVisaSteps.map((step, index) => (
                <Flexbox flex={1} column key={index}>
                  <Flexbox height={20}>
                    <Image
                      src={`/static/images/${step.image}.png`}
                      alt={step.image}
                      maxWidth={20}
                    />
                  </Flexbox>
                  <Flexbox paddingVertical={3}>
                    <Text size="l" bold color="visaBlue">
                      {step.title}
                    </Text>
                  </Flexbox>
                  <Flexbox>
                    <Text color="grey" textAlign="center">
                      {step.content}
                    </Text>
                  </Flexbox>
                </Flexbox>
              ))}
            </Flexbox>
          </Flexbox>
        </Content>

        {/* Fee & video */}
        <Content backgroundColor="white">
          <Flexbox responsiveLayout>
            <Flexbox flex={1} column paddingHorizontal={2}>
              <Flexbox>
                <Image
                  src={`/static/images/take-note.png`}
                  alt="price tag"
                  maxWidth={20}
                  clickable
                />
                <Text bold size="l">
                  2 types of fee need to be paid using evisa-vn services.
                </Text>
              </Flexbox>
              <Flexbox paddingTop={2}>
                <Text color="grey">
                  <Text bold color="visaBlue">
                    Visa service fee
                  </Text>{" "}
                  Applicants have to pay for the visa processing conducting by
                  evisa-vn.com to get the visa approval letter according to the
                  service chosen.
                </Text>
              </Flexbox>
              <Flexbox paddingTop={2}>
                <Text color="grey">
                  <Text bold color="visaRed">
                    Stamping fee
                  </Text>{" "}
                  Applicants must pay in cash (in VND or USD) at the landing
                  visa counter on arrival. The fee is ruled by Immigration
                  Department and publicly announces on governmental websites.
                  Applicants will get the receipt after paying for the fee
                </Text>
              </Flexbox>
            </Flexbox>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  position: "relative",
                  paddingTop: 0,
                  paddingBottom: "56.25%",
                  height: 0
                }}
              >
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/LasWgUPNVI4"
                  frameBorder="0"
                  allowFullScreen
                  style={{
                    zIndex: 1,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%"
                  }}
                />
              </div>
            </div>
          </Flexbox>
        </Content>

        {/* Why */}
        <Content backgroundColor="white">
          <Flexbox column width="100%">
            <BlockHeader header="Why choose us?" />
            <Flexbox responsiveLayout>
              <Flexbox flex={1}>
                <Image
                  src="/static/images/passport.png"
                  alt="passport"
                  maxWidth={400}
                />
              </Flexbox>

              <Flexbox
                flex={1}
                paddingHorizontal={2}
                paddingVertical={2}
                column
              >
                {whyChooseUs.map(
                  (reason, index) =>
                    index < 2 && (
                      <Flexbox
                        alignItems="center"
                        paddingVertical={2}
                        key={index}
                      >
                        <Image
                          src={`/static/images/${reason.image}.png`}
                          alt={reason.image}
                          paddingRight={3}
                          maxWidth={20}
                        />
                        <Flexbox column>
                          <Text
                            bold
                            size="l"
                            paddingBottom={1}
                            textAlign="center"
                          >
                            {reason.title}
                          </Text>
                          <Text color="grey">{reason.content}</Text>
                        </Flexbox>
                      </Flexbox>
                    )
                )}
              </Flexbox>

              <Flexbox
                flex={1}
                paddingHorizontal={2}
                paddingVertical={2}
                column
              >
                {whyChooseUs.map(
                  (reason, index) =>
                    index >= 2 && (
                      <Flexbox
                        alignItems="center"
                        paddingVertical={2}
                        key={index}
                      >
                        <Image
                          src={`/static/images/${reason.image}.png`}
                          alt={reason.image}
                          paddingRight={3}
                          maxWidth={20}
                        />
                        <Flexbox column>
                          <Text
                            bold
                            size="l"
                            paddingBottom={1}
                            textAlign="center"
                          >
                            {reason.title}
                          </Text>
                          <Text color="grey">{reason.content}</Text>
                        </Flexbox>
                      </Flexbox>
                    )
                )}
              </Flexbox>
            </Flexbox>
          </Flexbox>
        </Content>

        {/* Extra Services */}
        <Content backgroundColor="lightBlue">
          <Flexbox width="100%" column>
            <BlockHeader header="Extra services" />
            <Flexbox width="100%" responsiveLayout>
              {extraServices.map(
                (service, index) =>
                  index < 3 && (
                    <Flexbox column flex={1} key={index}>
                      <Image
                        src={`/static/images/${service.image}.png`}
                        alt={service.image}
                        paddingVertical={2}
                        paddingHorizontal={2}
                        maxWidth={50}
                      />
                      <Text textAlign="center" bold size="l">
                        {service.title}
                      </Text>
                    </Flexbox>
                  )
              )}
            </Flexbox>
            <Flexbox width="100%" responsiveLayout>
              {extraServices.map(
                (service, index) =>
                  index >= 3 && (
                    <Flexbox column flex={1} key={index}>
                      <Image
                        src={`/static/images/${service.image}.png`}
                        alt={service.image}
                        paddingVertical={2}
                        paddingHorizontal={2}
                        maxWidth={50}
                      />
                      <Text textAlign="center" bold size="l">
                        {service.title}
                      </Text>
                    </Flexbox>
                  )
              )}
            </Flexbox>
          </Flexbox>
        </Content>

        {/* Check marks */}
        <Content backgroundColor="white">
          <Flexbox responsiveLayout alignItems="stretch">
            <Flexbox flex={1} column height="100%">
              <Text
                size="l"
                color="visaBlue"
                bold
                paddingVertical={2}
                textAlign="center"
              >
                REASONS TO BOOK VISA ONLINE
              </Text>

              <Flexbox
                width="90%"
                paddingVertical={4}
                marginVertical={4}
                paddingHorizontal={4}
                marginHorizontal={4}
                border
                column
                borderRadius
              >
                {bookingOnlineReasons.map((reason, index) => (
                  <Flexbox justifyContent="flex-start" width="100%" key={index}>
                    <div>
                      ✓<Text paddingLeft={1} bold>
                        {reason.title}
                      </Text>
                      :&nbsp;
                      <Text>{reason.content}</Text>
                    </div>
                  </Flexbox>
                ))}
              </Flexbox>
            </Flexbox>

            <Flexbox flex={1} column height="100%">
              <Text
                size="l"
                color="visaBlue"
                bold
                paddingVertical={2}
                textAlign="center"
              >
                VIETNAM VISA KNOWLEDGE
              </Text>

              <Flexbox
                width="90%"
                paddingVertical={4}
                marginVertical={4}
                paddingHorizontal={4}
                marginHorizontal={4}
                border
                column
                borderRadius
              >
                {visaKnowledge.map((reason, index) => (
                  <Flexbox justifyContent="flex-start" width="100%" key={index}>
                    <div>
                      ✓<Text paddingLeft={1} bold>
                        {reason.title}
                      </Text>
                      :&nbsp;
                      <Text>{reason.content}</Text>
                    </div>
                  </Flexbox>
                ))}
              </Flexbox>
            </Flexbox>

            <Flexbox flex={1} column height="100%">
              <Text
                size="l"
                color="visaBlue"
                bold
                paddingVertical={2}
                textAlign="center"
              >
                APPLY WITH CONFIDENT
              </Text>

              <Flexbox
                width="90%"
                paddingVertical={4}
                marginVertical={4}
                paddingHorizontal={4}
                marginHorizontal={4}
                border
                column
                borderRadius
              >
                {applyWithConfidence.map((reason, index) => (
                  <Flexbox justifyContent="flex-start" width="100%" key={index}>
                    <div>
                      ✓<Text paddingLeft={1} bold>
                        {reason}
                      </Text>
                    </div>
                  </Flexbox>
                ))}
              </Flexbox>
            </Flexbox>
          </Flexbox>
        </Content>
      </Layout>
    );
  }
}

export default withRedux(configureStore, null, null)(Home)