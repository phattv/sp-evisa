// @flow
// vendor
import React from "react";
// custom
import { Layout, Content, Text, Flexbox } from "../components";

export default class Home extends React.Component<null> {
  render() {
    return (
      <Layout>
        <Content backgroundColor="white">
          <Flexbox column>
            <Flexbox paddingBottom={6}>
              <Text fontSize="xxl" bold color="visaBlue">
                Welcome to&nbsp;
              </Text>
              <Text fontSize="xxl" bold color="visaRed">
                Vietnamvisa
              </Text>
              <Text fontSize="xxl" bold color="visaBlue">
                fast-cheap.
              </Text>
              <Text fontSize="xxl" bold color="darkGrey">
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
          </Flexbox>
        </Content>
      </Layout>
    );
  }
}
