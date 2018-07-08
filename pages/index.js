// @flow
// vendor
import React, { Fragment } from 'react';
import { logPageView } from '../utils/analytics';
import Router from 'next/router';
import { Form, Dropdown } from 'semantic-ui-react';
import _get from 'lodash/get';
import { connect } from 'react-redux';
// custom
import { Button, Flexbox, Image, Text } from '../components/ui';
import ContentMaxWidth from '../components/ContentMaxWidth';
import Card from '../components/Card';
import Divider from '../components/Divider';
import Heading from '../components/Heading';
import FeesCard from '../components/FeesCard';
import ServicesCard from '../components/ServicesCard';
import PaymentMethodImages from '../components/PaymentMethodImages';
import {
  iconSizes,
  paddingAll,
  pageNames,
  spacingValues,
  borderRadius,
} from '../constants/ui';
import {
  airportFastTrackOptions,
  countryOptions,
  processingTimeOptions,
  purposeOptions,
  typeOptions,
} from '../constants/dropDownOptions';
import {
  updateFees,
  updateFeesSelectedCountry,
  updateStepOne,
} from '../redux/actions';
import { getFeesByCountryId } from '../utils/apiClient';
import { fees } from '../constants/fees';
import { reducerNames } from '../constants/reducerNames';

type Props = {
  countryId: number,
  stepOne: Object,
  updateStepOne: Object => void,
  updateFees: (Array<Object>) => void,
  updateFeesSelectedCountry: number => void,
  fees: Array<Object>,
};
type State = {
  countryId: number | string,
  purpose: string,
  type: string,
  processingTime: string,
  extraServices: Object,
  totalFee: number,
};
class Home extends React.Component<Props, State> {
  state = {
    countryId: '',
    purpose: purposeOptions[0].value,
    type: typeOptions[0].value,
    processingTime: processingTimeOptions[0].value,
    extraServices: {
      fastTrack: '',
      carPickup: '',
      privateVisaLetter: false,
    },
    totalFee: 0,
  };

  navigateToApply = () => {
    Router.push(pageNames.apply);
  };

  //<editor-fold desc="TODO: repeated code & logic between this & ApplyFormStepOne">
  updateCountryId = (event: Object, selectedOption: Object) => {
    if (selectedOption) {
      this.setState(
        {
          countryId: selectedOption.value,
        },
        () => {
          this.updateStepOneToStore();
          this.props.updateFeesSelectedCountry(selectedOption.value);
          getFeesByCountryId(
            { countryId: selectedOption.value },
            this.updateFees,
          );
        },
      );
    } else {
      this.setState({
        countryId: 0,
      });
    }
  };

  updateFees = data => {
    this.props.updateFees(data);
  };

  updatePurpose = (event: Object, selectedOption: Object) => {
    return this.setState(
      {
        purpose: selectedOption ? selectedOption.value : '',
      },
      () => this.updateStepOneToStore(),
    );
  };

  updateType = (event: Object, selectedOption: Object) =>
    this.setState(
      {
        type: selectedOption ? selectedOption.value : '',
      },
      () => this.updateStepOneToStore(),
    );

  updateProcessingTime = (event: Object, selectedOption: Object) => {
    // Logic note: if choose emergency, fast track is chosen
    this.setState(
      {
        processingTime: selectedOption ? selectedOption.value : '',
        extraServices: {
          ...this.state.extraServices,
          fastTrack:
            selectedOption.value === 'emergency'
              ? airportFastTrackOptions[1].value
              : '',
        },
      },
      () => this.updateStepOneToStore(),
    );
  };

  updateStepOneToStore = () => {
    this.props.updateStepOne({
      countryId: this.state.countryId,
      purpose: this.state.purpose,
      type: this.state.type,
      processingTime: this.state.processingTime,
      extraServices: this.state.extraServices,
    });
  };

  componentDidMount() {
    this.syncPropsToState(this.props, true);
    logPageView();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.stepOne !== nextProps.stepOne) {
      this.syncPropsToState(nextProps);
    }
  }

  syncPropsToState = (nextProps: Props, isForced?: boolean) => {
    if (isForced || this.props.stepOne !== nextProps.stepOne) {
      this.setState({
        countryId: _get(nextProps, 'stepOne.countryId', ''),
        type: _get(nextProps, 'stepOne.type', typeOptions[0].value),
        purpose: _get(nextProps, 'stepOne.purpose', purposeOptions[0].value),
        processingTime: _get(
          nextProps,
          'stepOne.processingTime',
          processingTimeOptions[0].value,
        ),
        extraServices: _get(nextProps, 'stepOne.extraServices', {}),
      });
    }

    if (isForced || this.props.countryId !== nextProps.countryId) {
      this.setState({
        countryId: nextProps.countryId,
      });
    }

    this.calculateTotalFee();
  };
  //</editor-fold>

  calculateTotalFee = () => {
    const { purpose, type, processingTime, extraServices } = this.state;

    const fees = _get(this, 'props.fees', []).find(
      fees => fees.type === purpose,
    );
    const processingTimeObject = processingTimeOptions.find(
      option => option.value === processingTime,
    );
    const fastTrackObject = airportFastTrackOptions.find(
      option => option.value === extraServices.fastTrack,
    );

    const costPerPerson = fees && fees[type] > 0 ? fees[type] : 0;
    const processingFees = _get(processingTimeObject, 'price', 0);
    const extraFees = _get(fastTrackObject, 'price', 0);

    const totalFee = costPerPerson + processingFees + extraFees;

    this.setState(
      {
        totalFee,
      },
      // () => this.props.updatePrice(totalFee),
    );
  };

  render() {
    const { countryId, type, processingTime, purpose, totalFee } = this.state;

    let typeOptionsByPurpose = [];
    if (purpose === purposeOptions[0].value) {
      typeOptionsByPurpose = typeOptions.slice(0, 4);
    } else {
      typeOptionsByPurpose = typeOptions;
    }

    return (
      <Fragment>
        <ContentMaxWidth backgroundImage="url('../static/images/bg-banner.jpg')">
          <Flexbox paddingVertical={10} responsiveLayout alignItems="center">
            <Flexbox flex={1} column {...paddingAll}>
              <Heading
                color="white"
                text="Easiest way to get your Vietnam Visa."
                textAlign="left"
              />
              <Text color="white" paddingBottom={7}>
                Visa application can be intimidate to everyone and bothersome to
                even the most seasoned travelers. If you are traveling to
                Vietnam, let evisa-vn take care of all the hassles. Get your
                visa in just 3 simple steps with evisa-vn, so you would have
                more time planning your trips.
              </Text>
            </Flexbox>
            <Flexbox
              flex={1}
              column
              backgroundColor="bgGrey2"
              borderRadius={borderRadius}
              overflow="hidden"
            >
              <Form
                onSubmit={this.navigateToApply}
                style={{
                  width: '100%',
                }}
              >
                <Flexbox {...paddingAll} column>
                  <Text fontSize="m" textAlign="center">
                    How much does it cost?
                  </Text>
                  <Form.Field required>
                    <label>Country</label>
                    <Dropdown
                      value={countryId}
                      placeholder="Select..."
                      fluid
                      search
                      selection
                      options={countryOptions}
                      onChange={this.updateCountryId}
                    />
                  </Form.Field>
                  <Form.Field required>
                    <label>Purpose of Visa</label>
                    <Dropdown
                      value={purpose}
                      placeholder="Select..."
                      fluid
                      search
                      selection
                      options={purposeOptions}
                      onChange={this.updatePurpose}
                    />
                  </Form.Field>
                  <Form.Field required>
                    <label>Type of Visa</label>
                    <Dropdown
                      value={type}
                      placeholder="Select..."
                      fluid
                      search
                      selection
                      options={typeOptionsByPurpose}
                      onChange={this.updateType}
                    />
                  </Form.Field>
                  <Form.Field required>
                    <label>Processing Time</label>
                    <Dropdown
                      value={processingTime}
                      placeholder="Select..."
                      fluid
                      search
                      selection
                      options={processingTimeOptions}
                      onChange={this.updateProcessingTime}
                    />
                  </Form.Field>

                  <Flexbox
                    backgroundColor="darkBlue"
                    paddingHorizontal={3}
                    paddingVertical={2}
                    justifyContent="space-between"
                  >
                    <Text color="white">Total Fee</Text>
                    <Text bold color="white">
                      ${totalFee} / Person
                    </Text>
                  </Flexbox>
                </Flexbox>

                <Button type="submit" width="100%" borderRadius={0}>
                  Apply Now!
                </Button>
              </Form>
            </Flexbox>
          </Flexbox>
        </ContentMaxWidth>

        <ContentMaxWidth>
          <Flexbox
            paddingVertical={spacingValues.blockPaddingTop}
            column
            width="100%"
          >
            <Heading text="Why evisa-vn?" />
            <Card>
              <Flexbox responsiveLayout>
                <Flexbox flex={1} column marginHorizontal={5}>
                  <Flexbox>
                    <Image
                      src="../static/icons/development.svg"
                      alt="development"
                      width={iconSizes.default}
                    />
                  </Flexbox>
                  <Text fontSize="m" semibold>
                    24/7 customer service
                  </Text>
                  <Divider small />
                  <Text paddingTop={6}>
                    We reply to all enquiries within 5 minutes.
                  </Text>
                </Flexbox>
                <Flexbox flex={1} column marginHorizontal={5}>
                  <Flexbox>
                    <Image
                      src="../static/icons/medal.svg"
                      alt="medal"
                      width={iconSizes.default}
                    />
                  </Flexbox>
                  <Text fontSize="m" semibold>
                    Confidentiality
                  </Text>
                  <Divider small />
                  <Text paddingTop={6}>
                    All information provided to us will be kept confidential and
                    secured.
                  </Text>
                </Flexbox>
                <Flexbox flex={1} column marginHorizontal={5}>
                  <Flexbox>
                    <Image
                      src="../static/icons/stopwatch.svg"
                      alt="stopwatch"
                      width={iconSizes.default}
                    />
                  </Flexbox>
                  <Text fontSize="m" semibold>
                    Reliability
                  </Text>
                  <Divider small />
                  <Text paddingTop={6}>
                    All applications will be processed in 1 working day or less.
                  </Text>
                </Flexbox>
              </Flexbox>
            </Card>
          </Flexbox>
        </ContentMaxWidth>

        <ContentMaxWidth>
          <Flexbox column alignItems="center">
            <Flexbox paddingTop={4}>
              <Image
                src="../static/icons/shield-ico.svg"
                alt="shield"
                width={iconSizes.small}
              />
              <Text paddingLeft={2}>Money-back guarantee</Text>
            </Flexbox>
            <Text>
              All service fee will be reimbursed if your application is rejected
              or we don't deliver your applications on time.
            </Text>
          </Flexbox>
        </ContentMaxWidth>

        <ContentMaxWidth>
          <Flexbox
            paddingVertical={spacingValues.blockPaddingTop}
            column
            width="100%"
          >
            <Flexbox paddingBottom={3} column>
              <Heading text="How to apply?" />
              <Heading text="Fast, Cheap and Simple" secondary />
            </Flexbox>
            <Flexbox responsiveLayout>
              <Card flex={1}>
                <Flexbox>
                  <Image
                    src="../static/icons/step-1.svg"
                    alt="step-1"
                    width={iconSizes.default}
                  />
                </Flexbox>
                <Text fontSize="m" semibold>
                  5 minutes to finish application
                </Text>
                <Divider />
                <Text paddingTop={6}>
                  Fill in our secured online application. You are required to
                  enter the precise information which appears on your passport.
                </Text>
              </Card>
              <Card flex={1}>
                <Flexbox>
                  <Image
                    src="../static/icons/step-2.svg"
                    alt="step-2"
                    width={iconSizes.default}
                  />
                </Flexbox>
                <Text fontSize="m" semibold>
                  Secured online payment
                </Text>
                <Divider />
                <Text paddingTop={6}>
                  You can make payment via PayPal or your Credit/Debit Card.
                </Text>
              </Card>
              <Card flex={1}>
                <Flexbox>
                  <Image
                    src="../static/icons/step-3.svg"
                    alt="step-3"
                    width={iconSizes.default}
                  />
                </Flexbox>
                <Text fontSize="m" semibold>
                  Approval result within 24 hours
                </Text>
                <Divider />
                <Text paddingTop={6}>
                  Check your email for your approval letter. Please follow the
                  instructions to prepare all your supporting documents.
                </Text>
              </Card>
            </Flexbox>
          </Flexbox>
        </ContentMaxWidth>

        <FeesCard />

        <ServicesCard />

        <PaymentMethodImages />

        <Flexbox paddingBottom={30} />
      </Fragment>
    );
  }
}
const mapStateToProps = store => {
  return {
    countryId: _get(store, 'fees.countryId', null),
    stepOne: _get(store, 'form.stepOne', {}),
    fees: store[reducerNames.fees].fees,
  };
};
const mapDispatchToProps = {
  updateStepOne,
  updateFees,
  updateFeesSelectedCountry,
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
