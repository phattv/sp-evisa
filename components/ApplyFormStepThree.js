// @flow
// vendor
import * as React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Checkbox } from 'semantic-ui-react';
import ReactDOM from 'react-dom';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import dayjs from 'dayjs';
import Router from 'next/router';
import humps from 'humps';
// custom
import { updateStepThree } from '../redux/actions';
import { Flexbox, Text, Button } from './ui';
import {
  displayDateFormat,
  pageNames,
  postgresDateFormat,
} from '../constants/ui';
import { reducerNames } from '../constants/reducerNames';
import { countryOptions } from '../constants/dropDownOptions';
import { order } from '../utils/apiClient';
import FormHeading from './FormHeading';
import FormErrorMessage from './FormErrorMessage';
import { scrollToFirstErrorMessage } from '../utils/form';

let componentInstance;
let paypalActions;

type Props = {
  stepOne: Object,
  stepTwo: Object,
  stepThree: Object,
  price: number,
  updateStepThree: Object => void,
  goBack: () => void,
};
type State = {
  name: string,
  email: string,
  phone: string,
  isTermsAgreed: boolean,

  shouldShowErrorMessage: boolean,

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
      () => {
        this.togglePaypalButton(paypalActions);
      },
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
    const stepThree = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      isTermsAgreed: this.state.isTermsAgreed,
    };

    this.props.updateStepThree(stepThree);
  };

  getFormInvalidity = () => {
    const { name, email, phone, isTermsAgreed } = this.state;
    return (
      _isEmpty(name) ||
      _isEmpty(email) ||
      _isEmpty(phone) ||
      isTermsAgreed !== true
    );
  };

  saveOrderAndNavigateToThankYou = () => {
    const { stepThree: { name, email, phone } } = this.props;
    const { stepOne, stepTwo, price } = this.props;
    const contact = {
      name,
      email,
      phone,
    };

    const parsedArrivalDate = dayjs(_get(stepTwo, 'arrivalDate', ''));
    let arrivalDate = parsedArrivalDate.isValid()
      ? dayjs(stepTwo.arrivalDate).format(postgresDateFormat)
      : '';
    const parsedDepartureDate = dayjs(_get(stepTwo, 'departureDate', ''));
    let departureDate = parsedDepartureDate.isValid()
      ? dayjs(stepTwo.departureDate).format(postgresDateFormat)
      : '';

    let contactString = '';
    let applicantsString = '';
    try {
      contactString = JSON.stringify(humps.decamelizeKeys(contact));
      applicantsString = JSON.stringify(
        humps.decamelizeKeys(_get(stepTwo, 'applicants', [])),
      );
    } catch (exception) {
      Rollbar.error('cannot stringify contact & applicants', {
        contactString: contactString,
        applicantsString: applicantsString,
        exception: exception,
      });
      console.error(exception);
    }

    // prepare params
    const params = {
      quantity: _get(stepTwo, 'quantity', 0),
      price,
      country_id: _get(stepOne, 'countryId', ''),
      type: _get(stepOne, 'type', ''),
      purpose: _get(stepOne, 'purpose', ''),
      processing_time: _get(stepOne, 'processingTime', ''),
      airport_fast_track: _get(stepOne, 'extraServices.fastTrack', ''),
      car_pick_up: _get(stepOne, 'extraServices.carPickup', ''),
      private_visa_letter: _get(
        stepOne,
        'extraServices.privateVisaLetter',
        false,
      ),

      applicants: applicantsString,
      airport: _get(stepTwo, 'airport', ''),
      arrival_date: arrivalDate,
      departure_date: departureDate,
      flight_number: _get(stepTwo, 'flightNumber', ''),

      contact: contactString,
      status: 'paid',
    };

    order(params, () => {
      setTimeout(() => {
        Router.push(pageNames.thankYou);
      }, 1000);
    });
  };

  navigateToPaymentFailed = () => {
    Router.push(pageNames.paymentFailed);
  };

  goBack = () => {
    const { goBack } = this.props;
    goBack && goBack();
  };

  //<editor-fold desc="Paypal configs">
  togglePaypalButton = (actions, callback) => {
    const shouldDisablePaypalButton = this.getFormInvalidity();

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
      const shouldShowErrorMessage = this.getFormInvalidity();

      if (shouldShowErrorMessage) {
        scrollToFirstErrorMessage();
      }

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

    return actions.payment
      .execute()
      .then(function(payment) {
        componentInstance.saveOrderAndNavigateToThankYou();
      })
      .catch(error => {
        componentInstance.navigateToPaymentFailed();
        console.error('xxx paypal error', JSON.stringify(error));
        Rollbar.critical('payment failed', error);
      });
  };

  onCancel = (data, actions) => {
    alert('payment cancelled');
    console.log('The payment was cancelled!');
    console.log('Payment ID = ', data.paymentID);
    Rollbar.warning('payment cancelled, payment id: ', data.paymentID);
  };

  onError = error => {
    alert('payment failed');
    console.error('paypal error', error);
    Rollbar.critical('payment failed', error);
  };
  //</editor-fold>

  // Life cycle functions
  componentWillReceiveProps(nextProps) {
    if (this.props.stepThree !== nextProps.stepThree) {
      this.syncPropsToState(nextProps);
    }
  }

  componentDidMount() {
    componentInstance = this;
    require('../static/checkout.v4');
    this.setState({
      isPaypalLoaded: true,
    });
    this.syncPropsToState(this.props);
  }

  syncPropsToState = (nextProps: Props) => {
    this.setState({
      name: _get(nextProps, 'stepThree.name', ''),
      email: _get(nextProps, 'stepThree.email', ''),
      phone: _get(nextProps, 'stepThree.phone', ''),
      isTermsAgreed: _get(nextProps, 'stepThree.isTermsAgreed', false),
    });
  };

  render() {
    const {
      name,
      email,
      phone,

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
      <Form style={{ width: '100%' }}>
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
            error={shouldShowErrorMessage && !name}
            name="name"
            placeholder="Enter..."
            value={name}
            onChange={this.updateTextField}
          />
        </Form.Field>
        <Form.Field required>
          <label>Email</label>
          <Input
            error={shouldShowErrorMessage && !email}
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
            error={shouldShowErrorMessage && !phone}
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

        {shouldShowErrorMessage && (
          <FormErrorMessage
            message={
              !isTermsAgreed
                ? 'Please click on accept Terms of Use checkbox'
                : ''
            }
          />
        )}

        <FormHeading text="Applicants Details" hasPaddingTop />
        {this.renderApplicants()}

        <Flexbox paddingTop={6} column>
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
    const { stepTwo: { applicants } } = this.props;

    return applicants.map((applicant, index) => {
      const countryObject = countryOptions.find(
        option => option.value === applicant.countryId,
      );
      const parsedBirthday = dayjs(applicant.birthday).isValid()
        ? dayjs(applicant.birthday).format(displayDateFormat)
        : '';
      const parsedPassportExpiry = dayjs(applicant.passportExpiry).isValid()
        ? dayjs(applicant.passportExpiry).format(displayDateFormat)
        : '';

      return (
        <Flexbox key={index} column width="100%" paddingBottom={6}>
          <Text semibold>{applicant.name}</Text>
          <Flexbox justifyContent="space-between">
            <Text>{countryObject.text}</Text>
            <Text>/</Text>
            <Text>DOB: {parsedBirthday}</Text>
            <Text>/</Text>
            <Text textTransform="capitalize">{applicant.gender}</Text>
          </Flexbox>
          <Flexbox justifyContent="space-between">
            <Text>Passport: {applicant.passport}</Text>
            <Text>/</Text>
            <Text>Exp. on {parsedPassportExpiry}</Text>
          </Flexbox>
        </Flexbox>
      );
    });
  };
}

const mapStateToProps = store => {
  return {
    stepOne: store[reducerNames.form].stepOne,
    stepTwo: _get(store, `${reducerNames.form}.stepTwo`, {}),
    stepThree: store[reducerNames.form].stepThree,
    fees: store[reducerNames.fees].fees,
    price: store[reducerNames.form].price,
  };
};
const mapDispatchToProps = {
  updateStepThree,
};
export default connect(mapStateToProps, mapDispatchToProps)(ApplyFormStepThree);
