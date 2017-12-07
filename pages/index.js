// @flow
// vendor
import React from "react";
import Select from "react-select";
// custom
import {
  Layout,
  Content,
  Text,
  Flexbox,
  Button,
  Image,
  Form,
  Input,
  Dropdown
} from "../components";

const applyVisaSteps = [
  {
    image: "submit-application",
    title: "Submit application",
    content:
      "Fill out the secured online application form. You are required to enter the exact personal information of the applicant(s) that matches the information on your passport(s)."
  },
  {
    image: "pay-service-fee",
    title: "Pay Service Fee",
    content:
      "Fill out the secured online application form. You are required to enter the exact personal information of the applicant(s) that matches the information on your passport(s)."
  },
  {
    image: "get-approval-letter",
    title: "Get approval letter",
    content:
      "Fill out the secured online application form. You are required to enter the exact personal information of the applicant(s) that matches the information on your passport(s)."
  }
];
const typeOptions = [{ value: "oneMonth", label: "1 month single" }];
const processingTimeOptions = [
  { value: "normal", label: "Normal (Guaranteed 1 working)" }
];
const purposeOptions = [
  { value: "tourism", label: "Tourism" },
  { value: "work", label: "Work" }
];

type State = {
  quantity?: number,
  type?: string,
  processingTime?: string,
  purpose?: string
};
export default class Home extends React.Component<null, State> {
  state: State = {
    quantity: 0,
    type: "",
    processingTime: "",
    purpose: ""
  };

  updateQuantity = (event: Object) => {
    this.setState({
      quantity: event.target.value
    });
  };

  updateType = (selectedOption: Object) => {
    this.setState({
      type: selectedOption.value
    });
  };

  updateProcessingTime = (selectedOption: Object) => {
    this.setState({
      processingTime: selectedOption.value
    });
  };

  updatePurpose = (selectedOption: Object) => {
    this.setState({
      purpose: selectedOption.value
    });
  };

  render() {
    const { quantity, type, processingTime, purpose } = this.state;
    const serviceFee = quantity * 18;
    const processingFee = 0;

    return (
      <Layout>
        <Content
          style={{
            backgroundImage: "url(/static/images/form-background.png)",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
            backgroundPosition: "center",
            backgroundSize: "cover"
          }}
        >
          <Flexbox width="100%" responsiveLayout>
            <Flexbox flex={1} />
            <Flexbox flex={1} paddingVertical={4}>
              <Flexbox column alignItems="center" justifyContent="center">
                <Text bold color="white" fontSize="l">
                  1. Best price guarantee <br />
                  2. Vietnam Urgent visa <br />
                  3. Vietnam Extension visa <br />
                  4. Payment online
                </Text>
                <Button solid marginTop={5}>
                  GET STARTED NOW!
                </Button>
              </Flexbox>
            </Flexbox>
            <Flexbox
              flex={1}
              border
              borderColor="visaBlue"
              backgroundColor="lightGrey"
              borderRadius
            >
              <Form paddingVertical={6} paddingHorizontal={6}>
                <Flexbox>
                  <Text color="visaRed" fontSize="xl" bold textAlign="center">
                    VIETNAM VISA FORM
                  </Text>
                </Flexbox>
                <Flexbox alignItems="flex-start" paddingTop={5} column>
                  <Text bold>NUMBER OF VISA</Text>
                  <Input
                    value={quantity}
                    onChange={this.updateQuantity}
                    marginTop={2}
                    type="number"
                    placeholder="1 applicant"
                  />
                </Flexbox>
                <Flexbox alignItems="flex-start" paddingTop={5} column>
                  <Text bold>TYPE OF VISA</Text>
                  <Select
                    value={type}
                    placeholder="1 month single"
                    onChange={this.updateType}
                    options={typeOptions}
                  />
                </Flexbox>
                <Flexbox alignItems="flex-start" paddingTop={5} column>
                  <Text bold>PROCESSING TIME</Text>
                  <Select
                    value={type}
                    placeholder="Normal (Guaranteed 1 working)"
                    onChange={this.updateProcessingTime}
                    options={processingTimeOptions}
                  />
                </Flexbox>
                <Flexbox alignItems="flex-start" paddingTop={5} column>
                  <Text bold>PURPOSE OF VISA</Text>
                  <Select
                    value={type}
                    placeholder="Tourism"
                    onChange={this.updatePurpose}
                    options={purposeOptions}
                  />
                </Flexbox>

                <Flexbox paddingTop={4} justifyContent="space-between">
                  <Text bold>Service Fee: </Text>
                  <Text bold>{`${quantity} x $18 = $${serviceFee}`}</Text>
                </Flexbox>
                <Flexbox paddingTop={4} justifyContent="space-between">
                  <Text bold>Processing Fee: </Text>
                  <Text bold>{`${quantity} x $0 = $${processingFee}`}</Text>
                </Flexbox>

                <Flexbox paddingTop={4} justifyContent="space-between">
                  <Text bold>TOTAL SERVICE FEE:</Text>
                  <Text bold>${serviceFee + processingFee}</Text>
                </Flexbox>

                <Button solid marginTop={5}>
                  APPLY NOW
                </Button>
              </Form>
            </Flexbox>
          </Flexbox>
        </Content>
        {/* Welcome */}
        <Content backgroundColor="white">
          <Flexbox column>
            <Flexbox paddingBottom={6}>
              <Text fontSize="xl" black color="visaBlue">
                Welcome to&nbsp;
              </Text>
              <Text fontSize="xl" black color="visaRed">
                Vietnamvisa
              </Text>
              <Text fontSize="xl" black color="visaBlue">
                fast-cheap.
              </Text>
              <Text fontSize="xl" black color="darkGrey">
                com
              </Text>
            </Flexbox>
            <Text bold textAlign="center">
              We are pleased to serve you at website{" "}
              <Text bold fontStyle="italic" color="visaBlue">
                Vietnamvisafast-cheap.com
              </Text>
              <br />
              Vietnam visa online is applied for all citizens all over the world
              when they come to Vietnam via airline.
            </Text>
            <br />
            <Text textAlign="center">
              Vietnam visa fast-cheap is a legal and that is approved by the
              government of vietnam.
              <br />
              We provide the supporting service for visa approval letter
              application.
              <br />
              For further information, please contact us at below.
              <br />
              <Text bold>Hotline:</Text>{" "}
              <Text bold color="visaBlue">
                (+84).124.456.789
              </Text>
              <br />
              <Text bold>Email:</Text>{" "}
              <Text bold color="visaBlue">
                sales@vietnamvisafast-cheap.com |
                support@vietnamvisafast-cheap.com
              </Text>
            </Text>
            <Button solid marginTop={8}>
              Contact with us now
            </Button>
          </Flexbox>
        </Content>

        <Content backgroundColor="lightBlue">
          <Flexbox column width="100%">
            <Text fontSize="xl" black color="visaBlue">
              3 steps to get Visa
            </Text>
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
                      clickable
                    />
                  </Flexbox>
                  <Flexbox paddingVertical={3}>
                    <Text fontSize="l" color="visaRed" bold>
                      {index + 1}
                    </Text>
                    &nbsp;
                    <Text fontSize="l" bold color="visaBlue">
                      {step.title}
                    </Text>
                  </Flexbox>
                  <Flexbox>
                    <Text textAlign="center">{step.content}</Text>
                  </Flexbox>
                </div>
              ))}
            </Flexbox>
          </Flexbox>
        </Content>

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
                <Text bold fontSize="l">
                  When using{" "}
                  <Text bold fontSize="l" color="visaBlue">
                    Vietnamvisafast-cheap.com
                  </Text>, you need to pay 2 kind of fees
                </Text>
              </Flexbox>
              <Flexbox paddingTop={2}>
                <Text>
                  <Text bold color="visaBlue">
                    Visa service fee
                  </Text>{" "}
                  is paid on our website for our processing your vietnam visa
                  request. We – Vietnam Visa Services shafast-cheap will be
                  representative for customers to apply with the Immigration
                  Department to get the visa approval letter in time as your
                  booking( normal service: 2days, urgent : 4-8 hours -Excluding
                  weekends/national holidays)
                </Text>
              </Flexbox>
              <Flexbox paddingTop={2}>
                <Text>
                  <Text bold color="visaRed">
                    Stamping fee
                  </Text>{" "}
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
      </Layout>
    );
  }
}
