// @flow
// vendor
import React from 'react';
import { logPageView } from '../utils/analytics';
import Router from 'next/router';
// custom
import { Flexbox, Text, Image, Button } from '../components/ui';
import { paddingAll, pageNames } from '../constants/ui';
import ContentMaxWidth from '../components/ContentMaxWidth';

type Props = {};
type State = {};

class Home extends React.Component<Props, State> {
  static defaultProps: Props = {};

  state = {};

  componentDidMount() {
    logPageView();
  }

  navigateToHowToApply = () => {
    Router.push(pageNames.apply);
  };

  render() {
    return (
      <ContentMaxWidth backgroundImage="url('../static/images/bg-banner.jpg')">
        <Flexbox paddingTop={20} responsiveLayout>
          <Flexbox flex={1} column {...paddingAll}>
            <Text
              bold
              color="white"
              fontSize="xxxl"
              paddingBottom={8}
              noDoubleLineHeight
            >
              Easiest way to get your Visa.
            </Text>
            <Text color="white" paddingBottom={7}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Text>
            <Button fontSize="m" onClick={this.navigateToHowToApply}>
              Get Started
            </Button>
          </Flexbox>
          <Flexbox flex={1} column paddingHorizontal={5} paddingTop={5}>
            <Image src="../static/images/right-banner.png" alt="right banner" />
          </Flexbox>
        </Flexbox>
      </ContentMaxWidth>
    );
  }
}

export default Home;
