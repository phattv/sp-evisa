// @flow
// vendor
import React from "react";
// custom
import { Layout, Content, Text } from "../components";

export default class Home extends React.Component<null> {
  render() {
    return (
      <Layout>
        <Content>
          <Text color="visaRed">Home page</Text>
        </Content>
      </Layout>
    );
  }
}
