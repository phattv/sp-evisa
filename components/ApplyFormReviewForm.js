// @flow
// vendor
import * as React from 'react';
import { Div, Input, Label } from 'glamorous';
import { connect } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
// custom
import { Flexbox, Text } from '../components';
import { borderRadius, colors, spacingValues } from '../constants/ui';
import { initialStore } from '../store';

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
};
type State = {
  costPerPerson: number,
  paymentMethod: string,
  isTermsAgreed: boolean,
  totalFee: number,
  shouldShowErrorMessage: boolean,
};

class ApplyFormReviewForm extends React.Component<Props, State> {
  static defaultProps: Props = {};

  state = {
    costPerPerson: 0,
    paymentMethod: '',
    isTermsAgreed: false,
    totalFee: 0,
    shouldShowErrorMessage: false,
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

  componentWillReceiveProps(nextProps) {
    if (
      this.props.fees !== nextProps.fees ||
      this.props.stepOne !== nextProps.stepOne
    ) {
      const type = get(nextProps, 'stepOne.type', '');
      const purpose = get(nextProps, 'stepOne.purpose', '');
      const fees = get(nextProps, 'fees', []).find(
        fees => fees.type === purpose,
      );
      this.setState(
        {
          costPerPerson: isEmpty(fees) ? 0 : fees[type],
        },
        () => this.calculateTotalFee(nextProps),
      );
    }
  }

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
    } = this.props;
    const { totalFee } = this.state;

    return (
      <Div>
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
            <Text>{type}</Text>
          </Flexbox>
          <Flexbox display="flex" justifyContent="space-between">
            <Text bold>Purpose of visit:</Text>
            <Text>{purpose}</Text>
          </Flexbox>
          <Flexbox display="flex" justifyContent="space-between">
            <Text bold>Arrival airport:</Text>
            <Text>{airport}</Text>
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
          {get(extraServices, 'airportFastTrack') && (
            <Flexbox display="flex" justifyContent="space-between">
              <Text bold>Airport fast track</Text>
              <Text>{airportFastTrackCost}</Text>
            </Flexbox>
          )}
          {get(extraServices, 'stampingFee') && (
            <Flexbox display="flex" justifyContent="space-between">
              <Text bold>Stamping fee</Text>
              <Text>{stampingFeeCost}</Text>
            </Flexbox>
          )}
          {get(extraServices, 'privateVisaLetter') && (
            <Flexbox display="flex" justifyContent="space-between">
              <Text bold>Private visa letter</Text>
              <Text>{privateVisaLetterCost}</Text>
            </Flexbox>
          )}
          {get(extraServices, 'carPickUp') && (
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
          <Text>
            Payment method&nbsp;<Text color="visaRed">*</Text>
          </Text>
          {/*<Label display="flex" alignItems="center" cursor="pointer">*/}
            {/*<Input*/}
              {/*type="radio"*/}
              {/*name="paymentMethod"*/}
              {/*onChange={this.updatePaymentMethod}*/}
              {/*value="paypal"*/}
              {/*marginRight={spacingValues.s}*/}
            {/*/>*/}
            {/*<Text>Paypal</Text>*/}
          {/*</Label>*/}
          {/*<Label display="flex" alignItems="center" cursor="pointer">*/}
            {/*<Input*/}
              {/*type="radio"*/}
              {/*name="paymentMethod"*/}
              {/*onChange={this.updatePaymentMethod}*/}
              {/*value="credit"*/}
              {/*marginRight={spacingValues.s}*/}
            {/*/>*/}
            {/*<Text>Visa/Master/AMEX/JCB/Union Pay</Text>*/}
          {/*</Label>*/}
          {/*<Label display="flex" alignItems="center" cursor="pointer">*/}
            {/*<Input*/}
              {/*type="radio"*/}
              {/*name="paymentMethod"*/}
              {/*onChange={this.updatePaymentMethod}*/}
              {/*value="wu"*/}
              {/*marginRight={spacingValues.s}*/}
            {/*/>*/}
            {/*<Text>Western Union</Text>*/}
          {/*</Label>*/}
          <div id="paypal-button" />

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

const ApplyFormReviewFormWithRedux = connect(null, null)(ApplyFormReviewForm);

const mapStateToProps = store => {
  return {
    stepOne: store.stepOne,
    fees: store.fees,
  };
};
const mapDispatchToProps = {};
export default withRedux(initialStore, mapStateToProps, mapDispatchToProps)(
  ApplyFormReviewFormWithRedux,
);
