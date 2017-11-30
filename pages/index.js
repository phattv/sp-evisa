// @flow
// vendor
import React from "react";
// custom
import { Layout, Content, Text, Flexbox, Button, Image } from "../components";

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

export default class Home extends React.Component<null> {
  render() {
    return (
      <Layout>
        {/* Welcome */}
        <Content backgroundColor="white">
          <Flexbox column>
            <Flexbox paddingBottom={6}>
              <Text fontSize="xxl" black color="visaBlue">
                Welcome to&nbsp;
              </Text>
              <Text fontSize="xxl" black color="visaRed">
                Vietnamvisa
              </Text>
              <Text fontSize="xxl" black color="visaBlue">
                fast-cheap.
              </Text>
              <Text fontSize="xxl" black color="darkGrey">
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
              {" "}
              Contact with us now
            </Button>
          </Flexbox>
        </Content>

        <Content backgroundColor="lightBlue">
          <Flexbox column width="100%">
            <Text fontSize="xxl" black color="visaBlue">
              3 steps to get Visa
            </Text>
            <Flexbox justifyContent="between-around" width="100%">
              {applyVisaSteps.map((step, index) => (
                <div>
                  <Flexbox>
                    <Image
                      src={`/static/images/${step.image}.png`}
                      alt={step.image}
                      maxWidth={20}
                      clickable
                    />
                  </Flexbox>
                  <Flexbox paddingBottom={4}>
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
      </Layout>
    );
  }
}
