// @flow
// vendor
import * as React from 'react';
import { Div } from 'glamorous';
import withRedux from 'next-redux-wrapper';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
// custom
import { Content, Flexbox, Layout, Text } from '../components';
import { borderRadius, colors, spacingValues } from '../constants/ui';
import ApplyFormStepOne from '../components/ApplyFormStepOne';
import ApplyFormStepTwo from '../components/ApplyFormStepTwo';
import ApplyFormStepThree from '../components/ApplyFormStepThree';
import { store } from '../store';

type Props = {};
type State = {
  currentTabIndex: number,
};
class ApplyVisaOnline extends React.Component<Props, State> {
  state = {
    currentTabIndex: 0,
  };

  navigateToStep = (index: number) => {
    this.setState({
      currentTabIndex: index || 0,
    });
  };

  finishForm = () => {
    // TODO: make API call to save order
    console.log('xxx', 'form is finished');
  };

  componentDidMount() {
    window.Intercom('update');
  }

  render() {
    const { currentTabIndex } = this.state;
    return (
      <Layout>
        <Content>
          <Div
            display="flex"
            flex={1}
            border={`3px solid ${colors.visaBlue}`}
            backgroundColor={colors.lightGrey}
            borderRadius={borderRadius}
            padding={spacingValues.xl}
          >
            <Flexbox flex={1}>
              <Tabs
                onSelect={() => {}}
                selectedIndex={currentTabIndex}
                style={{
                  width: '100%',
                }}
              >
                <TabList
                  style={{
                    listStyleType: 'none',
                  }}
                >
                  <Flexbox justifyContent="flex-end" responsiveLayout>
                    <Tab disabled>
                      <CustomTab index={0} currentIndex={currentTabIndex}>
                        1. Visa Options
                      </CustomTab>
                    </Tab>
                    <Tab disabled>
                      <CustomTab index={1} currentIndex={currentTabIndex}>
                        2. Applicant Details
                      </CustomTab>
                    </Tab>
                    <Tab disabled>
                      <CustomTab index={2} currentIndex={currentTabIndex}>
                        3. Review & Finalize
                      </CustomTab>
                    </Tab>
                  </Flexbox>
                </TabList>

                <TabPanel>
                  <ApplyFormStepOne onSubmit={() => this.navigateToStep(1)} />
                </TabPanel>
                <TabPanel>
                  <ApplyFormStepTwo
                    onSubmit={() => this.navigateToStep(2)}
                    goBack={() => this.navigateToStep(0)}
                  />
                </TabPanel>
                <TabPanel>
                  <ApplyFormStepThree
                    onSubmit={this.finishForm}
                    goBack={() => this.navigateToStep(1)}
                  />
                </TabPanel>
              </Tabs>
            </Flexbox>
          </Div>
        </Content>
      </Layout>
    );
  }
}

type CustomTabProps = {
  children: React.Node,
  index: number,
  currentIndex: number,
};
class CustomTab extends React.Component<CustomTabProps> {
  render() {
    const { children, index, currentIndex } = this.props;
    return (
      <Div
        backgroundColor={
          index === currentIndex ? colors.visaRed : colors.darkGrey
        }
        padding={`${spacingValues.xs}px ${spacingValues.l}px`}
      >
        <Text size="l" bold color="white">
          {children}
        </Text>
      </Div>
    );
  }
}

const mapStateToProps = null;
const mapDispatchToProps = {};
export default withRedux(store, mapStateToProps, mapDispatchToProps)(
  ApplyVisaOnline,
);
