// @flow
// vendor
import React from 'react';
// custom
import {
  Anchor,
  Layout,
  Content,
  Text,
  Flexbox,
  Button,
  Image,
  BlockHeader,
} from '../components';

const applyVisaSteps = [
  {
    image: 'submit-application',
    title: '1. Submit application',
    content:
      'Fill out the secured online application form. You are required to enter the exact personal information of the applicant(s) that matches the information on your passport(s).',
  },
  {
    image: 'pay-service-fee',
    title: '2. Pay Service Fee',
    content:
      'Fill out the secured online application form. You are required to enter the exact personal information of the applicant(s) that matches the information on your passport(s).',
  },
  {
    image: 'get-approval-letter',
    title: '3. Get approval letter',
    content:
      'Fill out the secured online application form. You are required to enter the exact personal information of the applicant(s) that matches the information on your passport(s).',
  },
];
const whyChooseUs = [
  {
    image: 'directions',
    title: 'Faster, cheaper and easier',
    content:
      'Save your time, save your money,it only takes you 5 minutes to fill in the visa online form.',
  },
  {
    image: 'lock',
    title: 'Prompt responses, safe and secure',
    content:
      'Save your time, save your money,it only takes you 5 minutes to fill in the visa online form.',
  },
  {
    image: 'quality',
    title: 'Quality and Reliability',
    content:
      'Save your time, save your money,it only takes you 5 minutes to fill in the visa online form.',
  },
  {
    image: 'time',
    title:
      'On time gurantee, \n' +
      'Refund in full if Rejected visa and \n' +
      'our services are not good',
    content:
      'Save your time, save your money,it only takes you 5 minutes to fill in the visa online form.',
  },
];
const extraServices = [
  {
    image: 'airport-track',
    title: 'Air port fast-track Service',
  },
  {
    image: 'car-pickup',
    title: 'Car pick-up service',
  },
  {
    image: 'visa-renewal',
    title: 'Vietnam visa extension and renewal service',
  },
  {
    image: 'hotel-booking',
    title: 'Hotel booking service',
  },
  {
    image: 'domestic-flight',
    title: 'Vietnam domestic flights',
  },
  {
    image: 'travel-booking',
    title: 'Tour and travel booking',
  },
];

const typesOfVisa = [
  { value: 'touristSingle', label: 'Tourist - single (1 month)' },
  { value: 'touristMultiple', label: 'Tourist - multiple (1 month)' },
  { value: 'businessSingle', label: 'Business - single (3 months)' },
  { value: 'businessMultiple', label: 'Business - multiple (3 months)' },
  { value: 'student', label: 'Student (on arrival)' },
  { value: 'transit', label: 'Transit - single (5 days)' },
];
const processingTimeOptions = [
  { value: 'normal', label: 'Normal (Guaranteed 2 working days)' },
  { value: 'urgent', label: 'Urgent (Urgent (Guaranteed 4-8 working hours)' },
  { value: 'emergency', label: 'Emergency (Guaranteed 1 working hour)' },
  { value: 'overtime', label: 'Overtime' },
  { value: 'holidy', label: 'Holiday' },
];
const purposeOptions = [
  { value: 'tourism', label: 'Tourism' },
  { value: 'work', label: 'Work' },
];

const bookingOnlineReasons = [
  {
    title: 'Hassle-free',
    content: '100% online procedure, no passport send off',
  },
  {
    title: 'Convenience',
    content: 'Applicable for all air-travellers to Vietnam',
  },
  {
    title: 'Faster',
    content: 'Maximum 48 hours processing time',
  },
  {
    title: 'Cheaper',
    content: 'Low service fee, no hidden charge',
  },
  {
    title: 'More accessible',
    content: 'Best choice for those living far from Embassies',
  },
  {
    title: 'Safe & Sercure',
    content: 'Our website is secured by 256 bit SSL encryption and SiteLock.',
  },
];
const visaKnowledge = [
  {
    title: 'Vietnam Visa Tips',
    content: 'Guide to apply and get Visa to Vietnam.',
  },
  {
    title: 'Vietnam-visa-application',
    content: 'Useful informations about Vietnam Visa.',
  },
  {
    title: 'Apply and Get Visa to Vietnam for foreigners',
    content: 'Necessary info for tourist or business to get Vietam Visa.',
  },
  {
    title: 'VietNam Visa On Arrival',
    content:
      'Most likely the legally easiest way to obtain your visa to Vietnam.',
  },
  {
    title: 'Urgent VietNam Visa',
    content:
      'Booking visa on Holidays or Weekends or different reasons for everyone.',
  },
];
const applyWithConfidence = [
  'Safe and Secure',
  'Good Quality & Reliability',
  'Prombt Responses',
  'Competitive Prices ($18)',
  'Save your time and money',
  '2 working day',
  'Money back guarantee for declined applications',
];

type Props = {};
type State = {};
export default class Home extends React.Component<Props, State> {
  render() {
    return (
      <Layout>
        {/* Form */}
        <Content
          style={{
            backgroundImage: 'url(/static/images/form-background.png)',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        >
          <Flexbox width="100%" responsiveLayout>
            <Flexbox flex={1} />
            <Flexbox flex={1} paddingVertical={4} />
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
                <Text bold color="white" size="l">
                  1. Best price guarantee <br />
                  2. Vietnam Urgent visa <br />
                  3. Vietnam Extension visa <br />
                  4. Payment online
                </Text>
                <Anchor href="/apply">
                  <Button solid marginTop={5}>
                    GET STARTED NOW!
                  </Button>
                </Anchor>
              </Flexbox>
            </Flexbox>
          </Flexbox>
        </Content>

        {/* Welcome */}
        <Content backgroundColor="white">
          <Flexbox column>
            <Flexbox paddingBottom={6}>
              <Text size="xl" black color="visaBlue">
                Welcome to&nbsp;
              </Text>
              <Text size="xl" black color="visaRed">
                evisa-vn.com
              </Text>
            </Flexbox>
            <Text bold textAlign="center">
              We are pleased to serve you at website{' '}
              <Text bold fontStyle="italic" color="visaBlue">
                evisa-vn.com
              </Text>
              <br />
              Vietnam visa online is applied for all citizens all over the world
              when they come to Vietnam via airline.
            </Text>
            <br />
            <Text textAlign="center" color="grey">
              evisa-vn.com is a legal and that is approved by the government of
              vietnam.
              <br />
              We provide the supporting service for visa approval letter
              application.
              <br />
              For further information, please contact us at below.
              <br />
              <Text bold>Hotline:</Text>{' '}
              <Text bold color="visaBlue">
                (+84).124.456.789
              </Text>
              <br />
              <Text bold>Email:</Text>{' '}
              <Text bold color="visaBlue">
                sales@evisa-vn.com | support@evisa-vn.com
              </Text>
            </Text>
            <Button solid marginTop={8}>
              Contact with us now
            </Button>
          </Flexbox>
        </Content>

        {/* 3-step */}
        <Content backgroundColor="lightBlue">
          <Flexbox column width="100%">
            <BlockHeader header="3 steps to get Visa" />
            <Flexbox
              justifyContent="between-around"
              width="100%"
              responsiveLayout
            >
              {applyVisaSteps.map((step, index) => (
                <div key={index}>
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
                </div>
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
                  When using{' '}
                  <Text bold size="l" color="visaBlue">
                    evisa-vn.com
                  </Text>, you need to pay 2 kind of fees
                </Text>
              </Flexbox>
              <Flexbox paddingTop={2}>
                <Text color="grey">
                  <Text bold color="visaBlue">
                    Visa service fee
                  </Text>{' '}
                  is paid on our website for our processing your vietnam visa
                  request. We – evisa-vn will be representative for customers to
                  apply with the Immigration Department to get the visa approval
                  letter in time as your booking( normal service: 2days, urgent
                  : 4-8 hours -Excluding weekends/national holidays)
                </Text>
              </Flexbox>
              <Flexbox paddingTop={2}>
                <Text color="grey">
                  <Text bold color="visaRed">
                    Stamping fee
                  </Text>{' '}
                  is ruled by the Immigration Department and the rate of
                  stamping fee is publicly announced at any legal Governmental
                  website and on the landing visa counter at any international
                  airport. You can pay this fee directly to the Immigration
                  Department ‘s officer at landing visa desk by cash (in USD or
                  VND) and receive the red bill for this fee.
                </Text>
              </Flexbox>
            </Flexbox>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  position: 'relative',
                  paddingTop: 0,
                  paddingBottom: '56.25%',
                  height: 0,
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
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                  }}
                />
              </div>
            </div>
          </Flexbox>
        </Content>

        {/* Why */}
        <Content>
          <Flexbox column width="100%">
            <BlockHeader header="Why choose us" />
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
                    ),
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
                    ),
                )}
              </Flexbox>
            </Flexbox>
          </Flexbox>
        </Content>

        {/* Extra Services */}
        <Content>
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
                  ),
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
                  ),
              )}
            </Flexbox>
          </Flexbox>
        </Content>

        {/* Check marks */}
        <Content>
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
