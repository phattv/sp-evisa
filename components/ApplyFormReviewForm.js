// @flow
// vendor
import * as React from 'react';
import ReactDOM from 'react-dom';
import { Div, Input, Label } from 'glamorous';
import withRedux from 'next-redux-wrapper';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
// custom
import { Anchor, Flexbox, Text } from '../components';
import { borderRadius, colors, spacingValues } from '../constants/ui';
import { configureStore } from '../redux/store';
import { reducerNames } from '../constants/reducerNames';
import { typeOptions, airportOptions } from '../constants/dropDownOptions';

// TODO: Handle extra services
const airportFastTrackCost = 45;
const stampingFeeCost = 8;
const privateVisaLetterCost = 8;
const carPickUpCost = 30;

type Props = {
  stepOne: Object,
  updatePaymentMethod: string => void,
  updateIsTermsAgreed: boolean => void,
  fees: Array<Object>,
  account: Object,
};
type State = {
  costPerPerson: number,
  paymentMethod: string,
  isTermsAgreed: boolean,
  totalFee: number,
  shouldShowErrorMessage: boolean,

  isPaypalLoaded: boolean,
  env: string,
  client: Object,
  commit: boolean,
  style: Object,
};

class ApplyFormReviewForm extends React.Component<Props, State> {
  state = {
    costPerPerson: 0,
    paymentMethod: '',
    isTermsAgreed: false,
    totalFee: 0,
    shouldShowErrorMessage: false,
    // Paypal configs:
    isPaypalLoaded: false,
    env: process.env.NODE_ENV === 'production' ? 'production' : 'sandbox',
    client: {
      sandbox:
        'ARbpiltFosCc8bt1e1DnQvUeaWirbKNSdfNccETRH2cOnTn6jB5sg7tOTaHCMlyZngMBSgGIvZOCOk6S',
      production:
        'AeposU75PsU1HDeKovqhb-komh_0cm5uJlbecPvnN4epIla8DyfOwTTvbrup8UWGv6vRiUMXPXFL-6kz',
    },
    commit: true,
    style: {
      size: 'responsive',
      label: 'pay',
      fundingicons: true,
    },
  };

  updatePaymentMethod = (event: Object) => {
    const { updatePaymentMethod } = this.props;
    this.setState(
      {
        paymentMethod: event.target.value,
      },
      () =>
        updatePaymentMethod && updatePaymentMethod(this.state.paymentMethod),
    );
  };

  updateIsTermsAgreed = (event: Object) => {
    const { updateIsTermsAgreed } = this.props;
    this.setState(
      {
        isTermsAgreed: !this.state.isTermsAgreed,
      },
      () =>
        updateIsTermsAgreed && updateIsTermsAgreed(this.state.isTermsAgreed),
    );
  };

  calculateTotalFee = (nextProps: Object) => {
    const quantity = get(
      nextProps,
      'stepOne.quantity',
      get(this, 'props.stepOne.quantity'),
    );
    const parsedQuantity = Number.parseInt(quantity, 10);
    this.setState({
      totalFee: parsedQuantity * this.state.costPerPerson,
    });
  };

  componentDidMount() {
    require('../static/paypal-checkout.min');
    this.setState({
      isPaypalLoaded: true,
    });
    this.syncStateAndCalculateTotalFee(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.fees !== nextProps.fees ||
      this.props.stepOne !== nextProps.stepOne
    ) {
      this.syncStateAndCalculateTotalFee(nextProps);
    }
  }

  syncStateAndCalculateTotalFee = props => {
    const type = get(props, 'stepOne.type', '');
    const purpose = get(props, 'stepOne.purpose', '');
    const fees = get(props, 'fees', []).find(fees => fees.type === purpose);
    this.setState(
      {
        costPerPerson: isEmpty(fees) ? 0 : fees[type],
      },
      () => this.calculateTotalFee(props),
    );
  };

  //<editor-fold desc="Paypal configs">
  payment = (data, actions) => {
    return actions.payment.create({
      payment: {
        transactions: [
          {
            // TODO: get amount from store
            amount: { total: '1.00', currency: 'USD' },
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
      alert('Payment Succeeded!');
      // The payment is complete!
      // You can now show a confirmation message to the customer
    });
  };

  onCancel = (data, actions) => {
    console.log('The payment was cancelled!');
    console.log('Payment ID = ', data.paymentID);
  };

  onError = error => {
    console.error('paypal error', error);
  };
  //</editor-fold>

  renderType = (type: string) => {
    const selectedOption = (typeOptions || []).find(
      option => option.value === type,
    );
    if (selectedOption) {
      return selectedOption.label;
    }
  };

  renderAirport = (airport: string) => {
    const selectedOption = (airportOptions || []).find(
      option => option.value === airport,
    );
    if (selectedOption) {
      return selectedOption.label;
    }
  };

  render() {
    const {
      stepOne: {
        quantity,
        type,
        purpose,
        airport,
        arrivalDate,
        departureDate,
        extraServices,
        isTermsAgreed,
      },
      account,
    } = this.props;
    const { totalFee, commit, env, client, style, isPaypalLoaded } = this.state;
    const isLoggedIn = account && Object.keys(account).length > 0;

    let PayPalButton = React.Fragment;
    if (isPaypalLoaded) {
      PayPalButton = paypal.Button.driver('react', { React, ReactDOM });
    }

    return (
      <Div>
        <Text size="l" bold>
          CONTACT INFORMATION
        </Text>
        <Div
          width="100%"
          marginTop={spacingValues.m}
          border={`3px solid ${colors.visaBlue}`}
          borderRadius={borderRadius}
          padding={spacingValues.xxl}
          marginBottom={spacingValues.xl}
        >
          {!isLoggedIn ? (
            <Anchor href="/login">Login</Anchor>
          ) : (
            <Div>
              <Flexbox display="flex" justifyContent="space-between">
                <Text bold>Name:</Text>
                <Text>{account.name}</Text>
              </Flexbox>
              <Flexbox display="flex" justifyContent="space-between">
                <Text bold>Email:</Text>
                <Text>{account.email}</Text>
              </Flexbox>
              <Flexbox display="flex" justifyContent="space-between">
                <Text bold>Phone:</Text>
                <Text>{account.phone}</Text>
              </Flexbox>
            </Div>
          )}
        </Div>

        <Text size="l" bold>
          REVIEW YOUR ORDER
        </Text>
        <Div
          width="100%"
          marginTop={spacingValues.m}
          border={`3px solid ${colors.visaBlue}`}
          borderRadius={borderRadius}
          padding={spacingValues.xxl}
        >
          <Flexbox paddingBottom={spacingValues.xxs}>
            <Text color="visaRed" size="l" bold>
              Your Info
            </Text>
          </Flexbox>
          <Flexbox display="flex" justifyContent="space-between">
            <Text bold>Number of applicants:</Text>
            <Text>{quantity}</Text>
          </Flexbox>
          <Flexbox display="flex" justifyContent="space-between">
            <Text bold>Type of visa:</Text>
            <Text>{this.renderType(type)}</Text>
          </Flexbox>
          <Flexbox display="flex" justifyContent="space-between">
            <Text bold>Purpose of visit:</Text>
            <Text>{purpose}</Text>
          </Flexbox>
          <Flexbox display="flex" justifyContent="space-between">
            <Text bold>Arrival airport:</Text>
            <Text textAlign="right" maxWidth={40}>
              {this.renderAirport(airport)}
            </Text>
          </Flexbox>
          <Flexbox display="flex" justifyContent="space-between">
            <Text bold>Arrival date:</Text>
            <Text>{arrivalDate}</Text>
          </Flexbox>
          <Flexbox
            display="flex"
            justifyContent="space-between"
            paddingBottom={2}
          >
            <Text bold>Departure date:</Text>
            <Text>{departureDate}</Text>
          </Flexbox>

          <Flexbox
            paddingTop={2}
            display="flex"
            justifyContent="space-between"
            borderTop
            borderColor="darkGrey"
          >
            <Text bold>Extra services:</Text>
          </Flexbox>
          {get(extraServices, 'airportFastTrack', false) && (
            <Flexbox display="flex" justifyContent="space-between">
              <Text bold>Airport fast track</Text>
              <Text>{airportFastTrackCost}</Text>
            </Flexbox>
          )}
          {get(extraServices, 'stampingFee', false) && (
            <Flexbox display="flex" justifyContent="space-between">
              <Text bold>Stamping fee</Text>
              <Text>{stampingFeeCost}</Text>
            </Flexbox>
          )}
          {get(extraServices, 'privateVisaLetter', false) && (
            <Flexbox display="flex" justifyContent="space-between">
              <Text bold>Private visa letter</Text>
              <Text>{privateVisaLetterCost}</Text>
            </Flexbox>
          )}
          {get(extraServices, 'carPickUp', false) && (
            <Flexbox display="flex" justifyContent="space-between">
              <Text bold>Car pick-up (4 seats)</Text>
              <Text>{carPickUpCost}</Text>
            </Flexbox>
          )}

          <Flexbox
            paddingTop={2}
            paddingBottom={2}
            display="flex"
            justifyContent="space-between"
            borderTop
            borderColor="darkGrey"
          >
            <Text bold>TOTAL FEE:</Text>
            {totalFee && (
              <Text bold color="visaRed" size="xxl">
                ${totalFee}
              </Text>
            )}
          </Flexbox>

          {isPaypalLoaded && (
            <PayPalButton
              commit={commit}
              env={env}
              client={client}
              style={style}
              payment={(data, actions) => this.payment(data, actions)}
              onAuthorize={(data, actions) => this.onAuthorize(data, actions)}
              onCanccel={(data, actions) => this.onCancel(data, actions)}
              onError={error => this.onError(error)}
            />
          )}

          <Label
            paddingTop={16}
            display="flex"
            alignItems="center"
            justifyContent="center"
            cursor="pointer"
          >
            <Input
              type="checkbox"
              onChange={this.updateIsTermsAgreed}
              value={isTermsAgreed}
              marginRight={spacingValues.s}
            />
            <Text bold>I have read and agreed with the Terms of Use</Text>
          </Label>
        </Div>
      </Div>
    );
  }
}

const mapStateToProps = store => {
  return {
    account: store[reducerNames.account],
    stepOne: store[reducerNames.form].stepOne,
    fees: store[reducerNames.fees].fees,
  };
};
const mapDispatchToProps = {};
export default withRedux(configureStore, mapStateToProps, mapDispatchToProps)(
  ApplyFormReviewForm,
);
