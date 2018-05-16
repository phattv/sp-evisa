// @flow
// vendor
import * as React from 'react';
import { Div } from 'glamorous';
import withRedux from 'next-redux-wrapper';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import get from 'lodash/get';
// custom
import { Content, Flexbox, Layout, Text } from '../components';
import { borderRadius, colors, spacingValues } from '../constants/ui';
import ApplyFormStepOne from '../components/ApplyFormStepOne';
import ApplyFormStepTwo from '../components/ApplyFormStepTwo';
import ApplyFormStepThree from '../components/ApplyFormStepThree';
import { configureStore } from '../redux/store';
import { order } from '../utils/apiClient';
import { reducerNames } from '../constants/reducerNames';

type Props = {
  stepOne: Object,
  stepTwo: Object,
  stepThree: Object,
  price: number,
  account: Object,
  guest: Object,
};
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
    const { stepOne, stepTwo, stepThree, price, account, guest } = this.props;

    let contact;
    let applicants;
    try {
      contact = JSON.stringify(account || guest);
      applicants = JSON.stringify(stepTwo);
    } catch (exception) {
      contact = '';
      applicants = '';
    }

    // prepare params
    const params = {
      price,
      country_id: get(stepOne, 'country', ''),
      quantity: get(stepOne, 'quantity', ''),
      type: get(stepOne, 'type', ''),
      purpose: get(stepOne, 'purpose', ''),
      processing_time: get(stepOne, 'processingTime', ''),
      airport: get(stepOne, 'airport', ''),
      arrival_date: get(stepOne, 'arrivalDate', ''),
      departure_date: get(stepOne, 'departureDate', ''),
      airport_fast_track: get(stepOne, 'extraServices.fastTrack', ''),
      car_pick_up: get(stepOne, 'extraServices.carPickup', ''),
      private_visa_letter: get(
        stepOne,
        'extraServices.privateVisaLetter',
        false,
      ),
      contact,
      applicants,
      flight_number: get(stepThree, 'flightNumber', ''),
    };
    console.log('xxx', params);

    order(params, () => console.log('xxx', 'form is finished'));
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

type CustomfTabProps = {
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

const mapStateToProps = store => {
  return {
    stepOne: store[reducerNames.form].stepOne,
    stepTwo: store[reducerNames.form].stepTwo,
    stepThree: store[reducerNames.form].stepThree,
    price: store[reducerNames.form].price,
    account: store[reducerNames.account],
    guest: store[reducerNames.guest],
  };
};
const mapDispatchToProps = {};
export default withRedux(configureStore, mapStateToProps, mapDispatchToProps)(
  ApplyVisaOnline,
);
