// @flow
// vendor
import * as React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Dropdown, Checkbox } from 'semantic-ui-react';
import ReactDOM from 'react-dom';
import _get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import dayjs from 'dayjs';
// custom
import { updateStepThree } from '../redux/actions';
import { Flexbox, Text, Button } from './ui';
import { postgresDateFormat } from '../constants/ui';
import { reducerNames } from '../constants/reducerNames';
import {
  countryOptions,
  countryOptionsSemantic,
} from '../constants/dropDownOptions';
import { order } from '../utils/apiClient';
import FormHeading from './FormHeading';
import FormErrorMessage from './FormErrorMessage';

let componentInstance;
let paypalActions;

type Props = {
  stepOne: Object,
  applicants: Array<Object>,
  stepThree: Object,
  price: number,
  updateStepThree: Object => void,
  goBack: () => void,
  account: Object,
  guest: Object,
  // updatePaymentStatus: boolean => void,
};
type State = {
  name: string,
  email: string,
  phone: string,
  isTermsAgreed: boolean,

  shouldShowErrorMessage: boolean,
  shouldShowSuccessMessage: boolean,

  // paypal
  isPaypalLoaded: boolean,
  env: string,
  client: Object,
  commit: boolean,
  style: Object,
};

class ApplyFormStepThree extends React.Component<Props, State> {
  state = {
    name: '',
    email: '',
    phone: '',

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

  toggleIsTermsAgreed = () => {
    this.setState(
      {
        isTermsAgreed: !this.state.isTermsAgreed,
      },
      () => this.togglePaypalButton(paypalActions),
    );
  };

  updateTextField = (event: Object) => {
    this.setState(
      {
        [event.target.name]: event.target.value,
      },
      () => this.updateStepThreeToStore(),
    );
  };

  updateStepThreeToStore = () => {
    const contact = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
    };

    this.props.updateStepThree(contact);
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
    debugger;
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

    const arrivalDate = _get(stepOne, 'arrivalDate', '')
      ? dayjs(stepOne.arrivalDate).format(postgresDateFormat)
      : '';
    const departureDate = _get(stepOne, 'departureDate', '')
      ? dayjs(stepOne.departureDate).format(postgresDateFormat)
      : '';

    // prepare params
    const params = {
      price,
      country_id: _get(stepOne, 'country', ''),
      quantity: _get(stepOne, 'quantity', ''),
      type: _get(stepOne, 'type', ''),
      purpose: _get(stepOne, 'purpose', ''),
      processing_time: _get(stepOne, 'processingTime', ''),
      airport: _get(stepOne, 'airport', ''),
      arrival_date: arrivalDate,
      departure_date: departureDate,
      airport_fast_track: _get(stepOne, 'extraServices.fastTrack', ''),
      car_pick_up: _get(stepOne, 'extraServices.carPickup', ''),
      private_visa_letter: _get(
        stepOne,
        'extraServices.privateVisaLetter',
        false,
      ),
      contact,
      applicants,
      flight_number: _get(stepThree, 'flightNumber', ''),
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

  goBack = () => {
    const { goBack } = this.props;
    goBack && goBack();
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
      name,
      email,
      phone,

      shouldShowSuccessMessage,
      shouldShowErrorMessage,
      isTermsAgreed,

      isPaypalLoaded,
      commit,
      env,
      client,
      style,
    } = this.state;

    let PayPalButton = React.Fragment;
    if (isPaypalLoaded) {
      PayPalButton = paypal.Button.driver('react', { React, ReactDOM });
    }

    return (
      <Form onSubmit={this.onSubmit} style={{ width: '100%' }}>
        <Flexbox>
          <Text noDoubleLineHeight>
            Please review your application details below before starting visa
            processing with Vietnam Immigration Department.
          </Text>
        </Flexbox>

        <FormHeading text="Contact Information" hasPaddingTop />
        <Form.Field required>
          <label>Name</label>
          <Input
            name="name"
            placeholder="Enter..."
            value={name}
            onChange={this.updateTextField}
          />
        </Form.Field>
        <Form.Field required>
          <label>Email</label>
          <Input
            name="email"
            type="email"
            placeholder="Enter..."
            value={email}
            onChange={this.updateTextField}
          />
        </Form.Field>
        <Form.Field required>
          <label>Phone</label>
          <Input
            name="phone"
            placeholder="Enter..."
            value={phone}
            onChange={this.updateTextField}
          />
        </Form.Field>
        <Form.Field required>
          <Checkbox
            checked={isTermsAgreed}
            onChange={this.toggleIsTermsAgreed}
            label="I have read and agreed with the Terms of Use"
          />
        </Form.Field>

        {isPaypalLoaded && (
          <PayPalButton
            commit={commit}
            env={env}
            client={client}
            style={style}
            onClick={this.onPaypalClick}
            validate={actions => this.validatePaypal(actions)}
            payment={(data, actions) => this.payment(data, actions)}
            onAuthorize={(data, actions) => this.onAuthorize(data, actions)}
            onCanccel={(data, actions) => this.onCancel(data, actions)}
            onError={error => this.onError(error)}
          />
        )}

        <FormHeading text="Applicants Details" hasPaddingTop />
        {this.renderApplicants()}

        <Flexbox paddingTop={6} column>
          {shouldShowErrorMessage && <FormErrorMessage />}

          <Flexbox justifyContent="space-between" width="100%">
            <Button onClick={this.goBack} backgroundColor="mediumBlue">
              Back
            </Button>
          </Flexbox>
        </Flexbox>
      </Form>
    );
  }

  renderApplicants = () => {
    const { applicants } = this.props;

    return applicants.map((applicant, index) => {
      const countryObject = countryOptions.find(
        option => option.value === applicant.countryId,
      );

      return (
        <Flexbox key={index} column width="100%" paddingBottom={6}>
          <Text semibold>{applicant.name}</Text>
          <Flexbox justifyContent="space-between">
            <Text>{countryObject.label}</Text>
            <Text>/</Text>
            <Text>DOB: {applicant.birthday}</Text>
            <Text>/</Text>
            <Text>{applicant.gender}</Text>
          </Flexbox>
          <Flexbox justifyContent="space-between">
            <Text>Passport: {applicant.passport}</Text>
            <Text>/</Text>
            <Text>Exp. on {applicant.passportExpiry}</Text>
          </Flexbox>
        </Flexbox>
      );
    });
  };
}

const mapStateToProps = store => {
  return {
    stepOne: store[reducerNames.form].stepOne,
    applicants: _get(store, `${reducerNames.form}.stepTwo.applicants`, []),
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
export default connect(mapStateToProps, mapDispatchToProps)(ApplyFormStepThree);
