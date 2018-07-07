// @flow
// vendor
import * as React from 'react';
import withRedux from 'next-redux-wrapper';
import { Form } from 'semantic-ui-react';
import { Div, Input, Label } from 'glamorous';
import ReactDOM from 'react-dom';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import dayjs from 'dayjs';
// custom
import { configureStore } from '../redux/store';
import { updatePaymentStatus, updateStepThree } from '../redux/actions';
import { Button, Flexbox, Text } from './ui';
import {
  borderRadius,
  colors,
  postgresDateFormat,
  spacingValues,
} from '../constants/ui';
import ApplyFormReviewForm from './ApplyFormReviewForm';
import { reducerNames } from '../constants/reducerNames';
import { countryOptions } from '../constants/dropDownOptions';
import { order } from '../utils/apiClient';
import FormHeading from './FormHeading';

let componentInstance;
let paypalActions;

type Props = {
  stepOne: Object,
  stepTwo: Object,
  stepThree: Object,
  price: number,
  updateStepThree: Object => void,
  goBack: Object => void,
  account: Object,
  guest: Object,
  // updatePaymentStatus: boolean => void,
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

  updateIsTermsAgreed = () => {
    this.setState(
      {
        isTermsAgreed: !this.state.isTermsAgreed,
      },
      () => this.togglePaypalButton(paypalActions),
    );
  };

  shouldDisablePaypalButton = () => {
    const { isTermsAgreed } = this.state;
    const { account, guest } = this.props;
    const contact = isEmpty(account) ? guest : account;

    const isContactEmpty =
      isEmpty(contact) ||
      isEmpty(contact.name) ||
      isEmpty(contact.email) ||
      isEmpty(contact.phone);
    return !isTermsAgreed || isContactEmpty;
  };

  finishForm = () => {
    const { stepOne, stepTwo, stepThree, price, account, guest } = this.props;

    let contact;
    let applicants;
    try {
      contact = JSON.stringify(isEmpty(account) ? guest : account);
      applicants = JSON.stringify(stepTwo);
    } catch (exception) {
      contact = '';
      applicants = '';
    }

    const arrivalDate = get(stepOne, 'arrivalDate', '')
      ? dayjs(stepOne.arrivalDate).format(postgresDateFormat)
      : '';
    const departureDate = get(stepOne, 'departureDate', '')
      ? dayjs(stepOne.departureDate).format(postgresDateFormat)
      : '';

    // prepare params
    const params = {
      price,
      country_id: get(stepOne, 'country', ''),
      quantity: get(stepOne, 'quantity', ''),
      type: get(stepOne, 'type', ''),
      purpose: get(stepOne, 'purpose', ''),
      processing_time: get(stepOne, 'processingTime', ''),
      airport: get(stepOne, 'airport', ''),
      arrival_date: arrivalDate,
      departure_date: departureDate,
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
      status: 'paid',
    };

    order(params, () => {
      this.setState({
        shouldShowSuccessMessage: true,
      });
      console.log('xxx', 'form is finished');

      setTimeout(() => {
        window.location = '/';
      }, 1000);
    });
  };

  onSubmit = () => {
    console.log('xxx', 'onSubmit');
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
  togglePaypalButton = (actions, callback) => {
    const shouldDisablePaypalButton = this.shouldDisablePaypalButton();

    if (actions) {
      if (shouldDisablePaypalButton) {
        console.log('xxx', 'disable');
        actions.disable();
      } else {
        console.log('xxx', 'enable');
        actions.enable();
      }
    }

    /**
     * TODO: update contact information doesn't call togglePaypalButton immediately
     * REPRODUCE:
     * - tick accept terms, fill in contact info
     * - close paypal popup
     * - remove contact info
     * - click paypal button
     * + EXPECTATION: should't be able to click, second time ok
     * + ACTUAL RESULT: able to click
     */
    setTimeout(() => {
      callback && callback();
    }, 500);
  };

  onPaypalClick = () => {
    this.togglePaypalButton(paypalActions, () => {
      const shouldShowErrorMessage = this.shouldDisablePaypalButton();

      this.setState({
        shouldShowErrorMessage,
      });
    });
  };

  validatePaypal = (actions: any) => {
    paypalActions = actions;
    this.togglePaypalButton(actions);
  };

  payment = (data, actions) => {
    // this.props.updatePaymentStatus(false);
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
      window.alert('Payment Succeeded!');
      // componentInstance.props.updatePaymentStatus(true);
      componentInstance.finishForm();
      // The payment is complete!
      // You can now show a confirmation message to the customer
    });
  };

  onCancel = (data, actions) => {
    // this.props.updatePaymentStatus(false);
    console.log('The payment was cancelled!');
    console.log('Payment ID = ', data.paymentID);
  };

  onError = error => {
    // this.props.updatePaymentStatus(false);
    console.error('paypal error', error);
  };
  //</editor-fold>

  componentDidMount() {
    componentInstance = this;
    require('../static/checkout');
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
      isTermsAgreed,

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
      <Form onSubmit={this.onSubmit} style={{ width: '100%' }}>
        <Text>
          Please review your application details below before starting visa
          processing with Vietnam Immigration Department.
        </Text>

        <FormHeading text="Contact Information" hasPaddingTop />
      </Form>
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
    account: store[reducerNames.account],
    guest: store[reducerNames.guest],
  };
};
const mapDispatchToProps = {
  updateStepThree,
  // updatePaymentStatus,
};
export default withRedux(configureStore, mapStateToProps, mapDispatchToProps)(
  ApplyFormStepThree,
);
