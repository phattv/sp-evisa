// @flow
// vendor
import * as React from 'react';
import withRedux from 'next-redux-wrapper';
import { Form } from 'react-final-form';
import { Div, Input, Label } from 'glamorous';
import ReactDOM from 'react-dom';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
// custom
import { configureStore } from '../redux/store';
import { updatePaymentStatus, updateStepThree } from '../redux/actions';
import { Button, Flexbox, Text } from '../components';
import { borderRadius, colors, spacingValues } from '../constants/ui';
import ApplyFormReviewForm from './ApplyFormReviewForm';
import { reducerNames } from '../constants/reducerNames';
import { countryOptions } from '../constants/dropDownOptions';
import { order } from '../utils/apiClient';

let componentInstance

type Props = {
  stepOne: Object,
  stepTwo: Object,
  stepThree: Object,
  price: number,
  paid: boolean,
  updateStepThree: Object => void,
  onSubmit: () => void,
  goBack: Object => void,
  account: Object,
  guest: Object,
  updatePaymentStatus: boolean => void,
};
type State = {
  hasFlightInfo: boolean,
  flightNumber: string,
  shouldShowErrorMessage: boolean,
  shouldShowSuccessMessage: boolean,
  isTermsAgreed: boolean,

  // paypal
  isPaypalLoaded: boolean,
  env: string,
  client: Object,
  commit: boolean,
  style: Object,
};

class ApplyFormStepThree extends React.Component<Props, State> {
  static defaultProps: Props = {};

  state = {
    hasFlightInfo: false,
    flightNumber: '',
    shouldShowErrorMessage: false,
    shouldShowSuccessMessage: false,
    isTermsAgreed: false,

    // paypal
    isPaypalLoaded: false,
    env: process.env.NODE_ENV === 'production' ? 'production' : 'sandbox',
    client: {
      sandbox:
        'AfrAzUUAV1ZrMzohzMi77Mrt0Nt8NWjX0YIm0kyWe3i2usiNKFyAi6kMtgvVcgITe4PNqh4p5xZyRJOa',
      production:
        'AY3OKXbVGVvkPFnhJjR3A95t7Cf2Dqdza6OB_W38fGZZ-CjIf-yMD4hqNieLT9-R9vTk2Z3gedfSh1hC',
    },
    commit: true,
    style: {
      size: 'responsive',
      label: 'pay',
      fundingicons: true,
    },
  };

  toggleHasFlightInfo = () => {
    this.setState({
      hasFlightInfo: !this.state.hasFlightInfo,
    });
  };

  updateFlightNumber = (event: Object) => {
    this.setState(
      {
        flightNumber: event.target.value,
      },
      () => this.updateStore(),
    );
  };

  updateStore = () => {
    this.props.updateStepThree(this.state);
  };

  updateIsTermsAgreed = (isTermsAgreed: boolean) => {
    this.setState({
      isTermsAgreed,
    });
  };

  onSubmit = () => {
    const { isTermsAgreed } = this.state;
    const { account, guest, paid } = this.props;
    const contact = isEmpty(account) ? guest : account;
    const isContactEmpty =
      isEmpty(contact) ||
      isEmpty(contact.name) ||
      isEmpty(contact.email) ||
      isEmpty(contact.phone);

    const shouldShowErrorMessage = !isTermsAgreed || isContactEmpty || !paid;

    this.setState({
      shouldShowSuccessMessage: !shouldShowErrorMessage,
      shouldShowErrorMessage,
    });

    if (!shouldShowErrorMessage) {
      this.finishForm()
    }
  };

  finishForm = () => {
    const { stepOne, stepTwo, stepThree, price, paid, account, guest } = this.props;

    let contact;
    let applicants;
    try {
      contact = JSON.stringify(isEmpty(account) ? guest : account);
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
      status: 'paid'
    };

    order(params, () => console.log('xxx', 'form is finished'));
  };

  renderApplicants = () => {
    const { stepTwo } = this.props;

    return Object.keys(stepTwo).map(index => {
      const countryObject = countryOptions.find(
        option => option.value === stepTwo[index].country_id,
      );

      return (
        <Flexbox
          key={index}
          column
          alignItems="flex-start"
          border
          borderRadius
          borderColor="visaBlue"
          width="100%"
          paddingVertical={2}
          paddingHorizontal={2}
          marginVertical={1}
          marginHorizontal={1}
        >
          <Div>
            <Text bold>Full name:</Text> <Text>{stepTwo[index].name}</Text>
          </Div>
          <Div>
            <Text bold>Country:</Text> <Text>{countryObject.label}</Text>
          </Div>
          <Div>
            <Text bold>Date of birth:</Text>{' '}
            <Text>{stepTwo[index].birthday}</Text>
          </Div>
          <Div>
            <Text bold>Passport number:</Text>{' '}
            <Text>{stepTwo[index].passport}</Text>
          </Div>
          <Div>
            <Text bold>Passport expiry date:</Text>{' '}
            <Text>{stepTwo[index].passport_expiry}</Text>
          </Div>
          <Div>
            <Text bold>Gender:</Text> <Text>{stepTwo[index].gender}</Text>
          </Div>
        </Flexbox>
      );
    });
  };

  //<editor-fold desc="Paypal configs">
  payment = (data, actions) => {
    this.props.updatePaymentStatus(false);
    const { price } = this.props;

    return actions.payment.create({
      payment: {
        transactions: [
          {
            amount: { total: price.toFixed(2), currency: 'USD' },
          },
        ],
      },
    });
  };

  onAuthorize = (data, actions) => {
    console.log('The payment was authorized!');
    console.log('Payment ID = ', data.paymentID);
    console.log('PayerID = ', data.payerID);

    return actions.payment.execute().then(function(payment) {
      console.log('xxxxx', 'Payment Succeeded!');
      componentInstance.props.updatePaymentStatus(true);
      componentInstance.finishForm()
      // The payment is complete!
      // You can now show a confirmation message to the customer
    });
  };

  onCancel = (data, actions) => {
    this.props.updatePaymentStatus(false);
    console.log('The payment was cancelled!');
    console.log('Payment ID = ', data.paymentID);
  };

  onError = error => {
    this.props.updatePaymentStatus(false);
    console.error('paypal error', error);
  };
  //</editor-fold>

  componentDidMount() {
    componentInstance = this
    require('../static/paypal-checkout.min');
    this.setState({
      isPaypalLoaded: true,
    });
  }

  render() {
    const {
      hasFlightInfo,
      flightNumber,
      shouldShowSuccessMessage,
      shouldShowErrorMessage,

      isPaypalLoaded,
      commit,
      env,
      client,
      style,
    } = this.state;
    const { goBack } = this.props;

    let PayPalButton = React.Fragment;
    if (isPaypalLoaded) {
      PayPalButton = paypal.Button.driver('react', { React, ReactDOM });
    }

    return (
      <Div>
        <Flexbox
          marginLeft={spacingValues.xxs}
          marginRight={spacingValues.xxs}
          paddingBottom={5}
        >
          <Text>
            Please review your application details below before starting visa
            processing with Vietnam Immigration Department.
          </Text>
        </Flexbox>
        <Form
          onSubmit={this.onSubmit}
          render={({ handleSubmit, pristine, invalid }) => (
            <Flexbox alignItems="flex-start" flex={1} responsiveLayout>
              <Flexbox
                flex={1}
                column
                width="100%"
                marginLeft={spacingValues.xxs}
                marginRight={spacingValues.xxs}
              >
                {/* Flight info */}
                <Flexbox
                  alignItems="flex-start"
                  justifyContent="space-between"
                  width="100%"
                  marginTop={5}
                >
                  <Text size="l" bold>
                    FLIGHT INFORMATION
                  </Text>
                </Flexbox>
                <Flexbox>
                  <Text>
                    It is recommended that you provide us with your flight
                    details for better support. (In case you apply for express
                    visa service or extra service at Vietnam airport, this
                    information is required)
                  </Text>
                </Flexbox>
                <Flexbox
                  alignItems="flex-start"
                  justifyContent="space-between"
                  width="100%"
                >
                  <Label display="flex" alignItems="center" cursor="pointer">
                    <Input
                      type="checkbox"
                      onChange={this.toggleHasFlightInfo}
                      value={hasFlightInfo}
                      marginRight={spacingValues.s}
                    />
                    <Text>I have booked</Text>
                  </Label>
                </Flexbox>

                <Div
                  display={hasFlightInfo ? 'flex' : 'none'}
                  flexDirection="column"
                  width="100%"
                >
                  <Text bold>FLIGHT NUMBER</Text>
                  <Input
                    backgroundColor="white"
                    padding={`${spacingValues.xs}px ${spacingValues.s}px`}
                    borderRadius={borderRadius}
                    border={`1px solid ${colors.lightGrey}`}
                    width="100%"
                    value={flightNumber}
                    onChange={this.updateFlightNumber}
                    marginTop={2}
                  />
                </Div>

                <Div width="100%" marginTop={25}>
                  {/* Paypal */}
                  {isPaypalLoaded && (
                    <PayPalButton
                      commit={commit}
                      env={env}
                      client={client}
                      style={style}
                      payment={(data, actions) => this.payment(data, actions)}
                      onAuthorize={(data, actions) =>
                        this.onAuthorize(data, actions)
                      }
                      onCanccel={(data, actions) =>
                        this.onCancel(data, actions)
                      }
                      onError={error => this.onError(error)}
                    />
                  )}
                </Div>

                {/* Applicants information */}
                <Flexbox
                  alignItems="flex-start"
                  justifyContent="space-between"
                  width="100%"
                  marginTop={5}
                >
                  <Text size="l" bold>
                    APPLICANT(S) INFORMATION
                  </Text>
                </Flexbox>

                {this.renderApplicants()}
              </Flexbox>

              {/* Review form */}
              <Flexbox
                flex={1}
                column
                width="100%"
                marginHorizontal={spacingValues.xxs}
                marginVertical={spacingValues.xxs}
              >
                <ApplyFormReviewForm
                  updateIsTermsAgreed={this.updateIsTermsAgreed}
                />

                <Flexbox
                  width="100%"
                  justifyContent="space-around"
                  marginTop={5}
                  marginBottom={5}
                >
                  <Button solid onClick={goBack}>
                    <i className="fa fa-arrow-left" />
                    &nbsp;&nbsp;BACK
                  </Button>

                  {/*{!shouldShowSuccessMessage && (*/}
                    {/*<Button solid onClick={this.onSubmit}>*/}
                      {/*FINISH&nbsp;&nbsp;*/}
                      {/*<i className="fa fa-check" />*/}
                    {/*</Button>*/}
                  {/*)}*/}
                </Flexbox>

                {shouldShowSuccessMessage && (
                  <Text color="visaBlue" textAlign="center">
                    Thank you for choosing us, we will contact you shortly!
                  </Text>
                )}

                {shouldShowErrorMessage && (
                  <Text color="visaRed" textAlign="center">
                    Please fill in the Contact information inputs & accept Terms
                    of Use & pay
                  </Text>
                )}
              </Flexbox>
            </Flexbox>
          )}
        />
      </Div>
    );
  }
}

const mapStateToProps = store => {
  return {
    stepOne: store[reducerNames.form].stepOne,
    stepTwo: store[reducerNames.form].stepTwo,
    stepThree: store[reducerNames.form].stepThree,
    fees: store[reducerNames.fees].fees,
    price: store[reducerNames.form].price,
    paid: store[reducerNames.form].paid,
    account: store[reducerNames.account],
    guest: store[reducerNames.guest],
  };
};
const mapDispatchToProps = {
  updateStepThree,
  updatePaymentStatus,
};
export default withRedux(configureStore, mapStateToProps, mapDispatchToProps)(
  ApplyFormStepThree,
);
