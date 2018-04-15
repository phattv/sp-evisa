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
import {
  typeOptions,
  airportOptions,
  purposeOptions,
  processingTimeOptions,
  countryOptions,
  airportFastTrackOptions,
  carPickUpOptions,
} from '../constants/dropDownOptions';

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
  processingTimeObject: Object,
  shouldShowProcessingFees: boolean,
  fastTrackObject: Object,
  carPickupObject: Object,
  shouldShowExtraServices: boolean,

  contactName: string,
  contactPhone: string,
  contactEmail: string,

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
    processingTimeObject: {},
    shouldShowProcessingFees: false,
    fastTrackObject: {},
    carPickupObject: {},
    shouldShowExtraServices: false,

    contactName: '',
    contactPhone: '',
    contactEmail: '',

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

  updateTextField = (event: Object) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
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
    const {
      processingTimeObject,
      shouldShowProcessingFees,
      shouldShowExtraServices,
      fastTrackObject,
      carPickupObject,
    } = this.state;
    const processingFees = shouldShowProcessingFees
      ? parsedQuantity * get(processingTimeObject, 'price', 1)
      : 0;
    const extraFees = shouldShowExtraServices
      ? fastTrackObject.price + carPickupObject.price
      : 0;

    const totalFee =
      parsedQuantity * this.state.costPerPerson + processingFees + extraFees;

    this.setState({
      totalFee,
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
    const processingTime = get(props, 'stepOne.processingTime', '');

    // Processing time
    const processingTimeObject = processingTimeOptions.find(
      option => option.value === processingTime,
    );
    const shouldShowProcessingFees =
      processingTimeObject !== processingTimeOptions[0];

    // Extra services
    const { fastTrack, carPickup } = get(props, 'stepOne.extraServices', {});
    const fastTrackObject = airportFastTrackOptions.find(
      option => option.value === fastTrack,
    );
    const carPickupObject = carPickUpOptions.find(
      option => option.value === carPickup,
    );
    const shouldShowExtraServices =
      (!isEmpty(fastTrackObject) &&
        fastTrackObject !== airportFastTrackOptions[0]) ||
      (!isEmpty(carPickupObject) && carPickupObject !== carPickUpOptions[0]);

    this.setState(
      {
        costPerPerson: isEmpty(fees) ? 0 : fees[type],
        processingTimeObject,
        shouldShowProcessingFees,
        fastTrackObject,
        carPickupObject,
        shouldShowExtraServices,
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

  //<editor-fold desc="render functions">
  renderType = (type: string) => {
    const selectedOption = (typeOptions || []).find(
      option => option.value === type,
    );
    if (selectedOption) {
      return selectedOption.label;
    }
  };

  renderPurpose = (type: string) => {
    const selectedOption = (purposeOptions || []).find(
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

  renderTotalFee = () => {
    const {
      totalFee,
      costPerPerson,
      processingTimeObject,
      shouldShowProcessingFees,
      fastTrackObject,
      carPickupObject,
      shouldShowExtraServices,
    } = this.state;
    const { stepOne: { quantity, type, purpose, country } } = this.props;

    const parsedQuantity = parseInt(quantity, 10);
    const applicants = [];
    for (let index = 0; index < parsedQuantity; index++) {
      applicants.push(index);
    }
    const countryObject = countryOptions.find(
      option => option.value === country,
    );

    return (
      <Flexbox
        paddingTop={5}
        paddingBottom={5}
        display="flex"
        column
        borderTop
        borderColor="darkGrey"
      >
        {/* Cost per person (quantity, type, purpose */}
        <Flexbox display="flex" justifyContent="flex-start" width="100%">
          <i
            className="fa fa-circle fa-fw"
            style={{
              fontSize: 8,
            }}
          />
          <Text paddingLeft={2}>
            {quantity} Applicant{quantity > 1 && 's'} - {this.renderType(type)}{' '}
            - {this.renderPurpose(purpose)} - {get(countryObject, 'label', '')}:
          </Text>
        </Flexbox>
        <Flexbox display="flex" justifyContent="space-between" width="100%">
          <Text size="l">
            {quantity} x ${costPerPerson}
          </Text>
          <Text size="l" color="visaRed">
            ${quantity * costPerPerson}
          </Text>
        </Flexbox>

        {/* Processing time */}
        {shouldShowProcessingFees && (
          <Flexbox width="100%" column>
            <Flexbox display="flex" justifyContent="flex-start" width="100%">
              <i
                className="fa fa-circle fa-fw"
                style={{
                  fontSize: 8,
                }}
              />
              <Text paddingLeft={2}>Processing Time:</Text>
            </Flexbox>
            <Flexbox display="flex" justifyContent="space-between" width="100%">
              <Text size="l">
                {quantity} x ${get(processingTimeObject, 'price', 1)}
              </Text>
              <Text size="l" color="visaRed">
                ${quantity * get(processingTimeObject, 'price', 1)}
              </Text>
            </Flexbox>
          </Flexbox>
        )}

        {/* Extra services */}
        {shouldShowExtraServices && (
          <Flexbox width="100%" column>
            <Flexbox display="flex" justifyContent="flex-start" width="100%">
              <i
                className="fa fa-circle fa-fw"
                style={{
                  fontSize: 8,
                }}
              />
              <Text paddingLeft={2}>Extra services:</Text>
            </Flexbox>

            {!isEmpty(fastTrackObject) &&
              fastTrackObject !== airportFastTrackOptions[0] && (
                <Flexbox
                  display="flex"
                  justifyContent="space-between"
                  width="100%"
                >
                  <Text>- {fastTrackObject.label}</Text>
                  <Text size="l" color="visaRed">
                    ${fastTrackObject.price}
                  </Text>
                </Flexbox>
              )}

            {!isEmpty(carPickupObject) &&
              carPickupObject !== carPickUpOptions[0] && (
                <Flexbox
                  display="flex"
                  justifyContent="space-between"
                  width="100%"
                >
                  <Text>- {carPickupObject.label}</Text>
                  <Text size="l" color="visaRed">
                    ${carPickupObject.price}
                  </Text>
                </Flexbox>
              )}
          </Flexbox>
        )}

        <Flexbox
          display="flex"
          justifyContent="space-between"
          width="100%"
          paddingTop={2}
        >
          <Text color="visaRed" size="l" bold>
            TOTAL FEE:
          </Text>
          {totalFee && (
            <Text bold color="visaRed" size="xxl">
              ${totalFee}
            </Text>
          )}
        </Flexbox>
      </Flexbox>
    );
  };
  //</editor-fold>

  render() {
    const {
      stepOne: { airport, arrivalDate, departureDate, isTermsAgreed },
      account,
    } = this.props;
    const {
      commit,
      env,
      client,
      style,
      isPaypalLoaded,
      contactName,
      contactPhone,
      contactEmail,
    } = this.state;
    const isLoggedIn = account && Object.keys(account).length > 0;

    let PayPalButton = React.Fragment;
    if (isPaypalLoaded) {
      PayPalButton = paypal.Button.driver('react', { React, ReactDOM });
    }

    return (
      <Div>
        {/* Contact information */}
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
            <Div>
              <Flexbox
                alignItems="flex-start"
                paddingBottom={3}
                column
                width="100%"
              >
                <Text bold>
                  Name&nbsp;<Text color="visaRed">*</Text>
                </Text>
                <Input
                  name="contactName"
                  backgroundColor="white"
                  padding={`${spacingValues.xs}px ${spacingValues.s}px`}
                  borderRadius={borderRadius}
                  border={`1px solid ${colors.lightGrey}`}
                  width="100%"
                  value={contactName}
                  onChange={this.updateTextField}
                  marginTop={2}
                />
              </Flexbox>
              <Flexbox
                alignItems="flex-start"
                paddingBottom={3}
                column
                width="100%"
              >
                <Text bold>
                  Email&nbsp;<Text color="visaRed">*</Text>
                </Text>
                <Input
                  type="email"
                  name="contactEmail"
                  backgroundColor="white"
                  padding={`${spacingValues.xs}px ${spacingValues.s}px`}
                  borderRadius={borderRadius}
                  border={`1px solid ${colors.lightGrey}`}
                  width="100%"
                  value={contactEmail}
                  onChange={this.updateTextField}
                  marginTop={2}
                />
              </Flexbox>
              <Flexbox
                alignItems="flex-start"
                paddingBottom={3}
                column
                width="100%"
              >
                <Text bold>
                  Phone&nbsp;<Text color="visaRed">*</Text>
                </Text>
                <Input
                  type="tel"
                  name="contactPhone"
                  backgroundColor="white"
                  padding={`${spacingValues.xs}px ${spacingValues.s}px`}
                  borderRadius={borderRadius}
                  border={`1px solid ${colors.lightGrey}`}
                  width="100%"
                  value={contactPhone}
                  onChange={this.updateTextField}
                  marginTop={2}
                />
              </Flexbox>
              <Anchor href="/login">Login</Anchor>
            </Div>
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

        <Flexbox>
          <Text size="xl" bold color="visaRed" textAlign="center">
            REVIEW YOUR ORDER
          </Text>
        </Flexbox>
        <Div
          width="100%"
          marginTop={spacingValues.m}
          border={`3px solid ${colors.visaBlue}`}
          borderRadius={borderRadius}
          padding={spacingValues.xxl}
        >
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

          {/* Total fee */}
          {this.renderTotalFee()}

          {/* Paypal */}
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

          {/* Terms checkbox */}
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
            <Text bold textAlign="center">
              I have read and agreed with the Terms of Use
            </Text>
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
