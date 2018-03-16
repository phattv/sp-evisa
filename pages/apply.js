// @flow
// vendor
import * as React from 'react';
import { Div } from 'glamorous';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// custom
import { Flexbox, Layout, Content } from '../components';
import {
  colors,
  fontSizes,
  borderRadius,
  spacingValues,
} from '../constants/ui';
import ApplyFormStepOne from '../components/ApplyFormStepOne';
import ApplyFormStepTwo from '../components/ApplyFormStepTwo';
import ApplyFormStepThree from '../components/ApplyFormStepThree';

type Props = {};
type State = {
  currentTabIndex: number,
};
class ApplyVisaOnline extends React.Component<Props, State> {
  state = {
    currentTabIndex: 0,
  };

  updateCurrentTabIndex = (tabIndex: number) => {
    this.setState({
      currentTabIndex: tabIndex,
    });
  };

  nagivateToStepTwo = () => {
    this.updateCurrentTabIndex(1);
  };

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
                selectedIndex={currentTabIndex}
                onSelect={this.updateCurrentTabIndex}
                style={{
                  width: '100%',
                }}
              >
                <TabList
                  style={{
                    listStyleType: 'none',
                  }}
                >
                  <Flexbox justifyContent="flex-end">
                    <Tab>
                      <CustomTab index={0} currentIndex={currentTabIndex}>
                        1. Visa Options
                      </CustomTab>
                    </Tab>
                    <Tab>
                      <CustomTab index={1} currentIndex={currentTabIndex}>
                        2. Applicant Details
                      </CustomTab>
                    </Tab>
                    <Tab>
                      <CustomTab index={2} currentIndex={currentTabIndex}>
                        3. Review & Finalize
                      </CustomTab>
                    </Tab>
                  </Flexbox>
                </TabList>

                <TabPanel>
                  <ApplyFormStepOne onSubmit={this.nagivateToStepTwo} />
                </TabPanel>
                <TabPanel>
                  <ApplyFormStepTwo />
                </TabPanel>
                <TabPanel>
                  <ApplyFormStepThree />
                </TabPanel>
              </Tabs>
            </Flexbox>
          </Div>
        </Content>
      </Layout>
    );
  }
}

export default ApplyVisaOnline;

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
        color="white"
        fontSize={fontSizes.l}
        fontWeight="bold"
        padding={`${spacingValues.xs}px ${spacingValues.l}px`}
        cursor="pointer"
        css={{
          ':hover': {
            backgroundColor: colors.darkRed,
          },
        }}
      >
        {children}
      </Div>
    );
  }
}
