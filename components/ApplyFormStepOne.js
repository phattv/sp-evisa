// @flow
// vendor
import * as React from 'react';
import Select from 'react-select';
import { Form } from 'react-final-form';
import { Div, Input, Label } from 'glamorous';
import ReactTooltip from 'react-tooltip';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { connect } from 'react-redux';
import withRedux from 'next-redux-wrapper';
// custom
import { Button, Flexbox, Text } from '../components';
import { borderRadius, colors, spacingValues } from '../constants/ui';
import countryOptions from '../static/countries.json';
import { initialStore } from '../store';
import { finishStepOne } from '../actions';

const costPerPerson = 8;
const airportFastTrackCost = 45;
const stampingFeeCost = 8;
const privateVisaLetterCost = 8;
const carPickUpCost = 30;

const typeOptions = [
  { value: '1 month single', label: '1 month single' },
  { value: '1 month multiple', label: '1 month multiple' },
  { value: '3 months single', label: '3 months single' },
  { value: '3 months multiple', label: '3 months multiple' },
  { value: '6 months multiple', label: '6 months multiple' },
  { value: '1 year multiple', label: '1 year multiple' },
];
const purposeOptions = [
  { value: 'tourist', label: 'Tourist' },
  { value: 'business', label: 'Business' },
];
const processingTimeOptions = [
  { value: 'normal', label: 'Normal (Guaranteed 2 working days)' },
  {
    value: 'urgent',
    label: 'Urgent (Guaranteed 4-8 working hours)',
  },
  {
    value: 'emergency',
    label: 'Emergency (Guaranteed 1 working hour)',
  },
  { value: 'overtime', label: 'Overtime' },
  { value: 'holiday', label: 'Holiday' },
];
const airportOptions = [
  {
    value: 'SGN',
    label: 'Tan Son Nhat International Airport (Ho Chi Minh City)',
  },
  { value: 'HAN', label: 'Noi Bai International Airport (Ha Noi)' },
  { value: 'DAD', label: 'Da Nang International Airport' },
  { value: 'CRX', label: 'Cam Ranh International Airport (Khanh Hoa)' },
];

type Props = {
  onSubmit: () => void,
  stepOne: Object,
  finishStepOne: Object => void,
};
type State = {
  country: string,
  quantity: number | string,
  type: string,
  purpose: string,
  processingTime: string,
  airport: string,
  arrivalDate: string,
  departureDate: string,
  extraServices: Object,
  paymentMethod: string,
  isTermsAgreed: boolean,
  totalFee: number,
  shouldShowErrorMessage: boolean,
};
class ApplyFormStepOne extends React.Component<Props, State> {
  state = {
    country: '',
    quantity: 1,
    type: typeOptions[0].value,
    purpose: purposeOptions[0].value,
    processingTime: processingTimeOptions[0].value,
    airport: airportOptions[0].value,
    arrivalDate: '',
    departureDate: '',
    extraServices: {
      airportFastTrack: false,
      stampingFee: false,
      privateVisaLetter: false,
      carPickUp: false,
    },
    paymentMethod: '',
    isTermsAgreed: false,
    totalFee: 0,
    shouldShowErrorMessage: false,
  };

  onSubmit = (event: Object) => {
    const { country, quantity, type, processingTime, purpose } = this.state;

    // required fields
    const shouldShowErrorMessage =
      !country ||
      parseInt(quantity) <= 0 ||
      !type ||
      !processingTime ||
      !purpose;
    this.setState({
      shouldShowErrorMessage: shouldShowErrorMessage,
    });

    // save to store
    this.props.finishStepOne(this.state);

    // onSubmit callback
    if (shouldShowErrorMessage === false) {
      const { onSubmit } = this.props;
      onSubmit && onSubmit();
    }
  };

  updateCountry = (selectedOption: Object) => {
    this.setState({
      country: selectedOption.value,
    });
  };

  updateQuantity = (event: Object) =>
    this.setState(
      {
        quantity: event.target.value,
      },
      () => this.calculateTotalFee(),
    );

  updateType = (selectedOption: Object) =>
    this.setState({
      type: selectedOption ? (selectedOption ? selectedOption.value : '') : '',
    });

  updateProcessingTime = (selectedOption: Object) =>
    this.setState(
      {
        processingTime: selectedOption ? selectedOption.value : '',
      },
      () => this.calculateTotalFee(),
    );

  updatePurpose = (selectedOption: Object) =>
    this.setState(
      {
        purpose: selectedOption ? selectedOption.value : '',
      },
      () => this.calculateTotalFee(),
    );

  updateAirport = (selectedOption: Object) =>
    this.setState(
      {
        airport: selectedOption ? selectedOption.value : '',
      },
      () => this.calculateTotalFee(),
    );

  updateArrivalDate = (event: Object) => {
    this.setState(
      {
        arrivalDate: event.target.value,
      },
      () => this.calculateTotalFee(),
    );
  };

  updateDepartureDate = (event: Object) => {
    this.setState(
      {
        departureDate: event.target.value,
      },
      () => this.calculateTotalFee(),
    );
  };

  updateAirportFastTrack = (event: Object) => {
    this.setState(
      {
        extraServices: {
          ...this.state.extraServices,
          airportFastTrack: !this.state.extraServices.airportFastTrack,
        },
      },
      () => this.calculateTotalFee(),
    );
  };

  updateStampingFee = (event: Object) => {
    this.setState(
      {
        extraServices: {
          ...this.state.extraServices,
          stampingFee: !this.state.extraServices.stampingFee,
        },
      },
      () => this.calculateTotalFee(),
    );
  };

  updatePrivateVisaLetter = (event: Object) => {
    this.setState(
      {
        extraServices: {
          ...this.state.extraServices,
          privateVisaLetter: !this.state.extraServices.privateVisaLetter,
        },
      },
      () => this.calculateTotalFee(),
    );
  };

  updateCarPickUp = (event: Object) => {
    this.setState(
      {
        extraServices: {
          ...this.state.extraServices,
          carPickUp: !this.state.extraServices.carPickUp,
        },
      },
      () => this.calculateTotalFee(),
    );
  };

  updatePaymentMethod = (event: Object) => {
    this.setState(
      {
        paymentMethod: event.target.value,
      },
      () => this.calculateTotalFee(),
    );
  };

  updateIsTermsAgreed = (event: Object) => {
    this.setState(
      {
        isTermsAgreed: !this.state.isTermsAgreed,
      },
      () => this.calculateTotalFee(),
    );
  };

  calculateTotalFee = () => {
    const { quantity } = this.state;
    const parsedQuantity = Number.parseInt(quantity, 10);
    this.setState({
      totalFee: parsedQuantity * costPerPerson,
    });
  };

  componentDidMount() {
    this.calculateTotalFee();
  }

  render() {
    const {
      country,
      quantity,
      type,
      processingTime,
      purpose,
      airport,
      arrivalDate,
      departureDate,
      extraServices,
      isTermsAgreed,
      totalFee,
      shouldShowErrorMessage,
    } = this.state;

    return (
      <Form
        onSubmit={this.onSubmit}
        render={({ handleSubmit, pristine, invalid }) => (
          <Flexbox alignItems="flex-start" flex={1} responsiveLayout>
            <Flexbox
              flex={1}
              column
              alignItems="flex-start"
              width="100%"
              marginLeft={spacingValues.xxs}
              marginRight={spacingValues.xxs}
            >
              <Flexbox
                alignItems="flex-start"
                paddingBottom={3}
                column
                width="100%"
              >
                <Text bold>
                  COUNTRY &nbsp;<Text color="visaRed">*</Text>
                </Text>
                <Select
                  autoFocus
                  value={country}
                  placeholder="Select..."
                  onChange={this.updateCountry}
                  options={countryOptions}
                />
              </Flexbox>
              <Flexbox
                alignItems="flex-start"
                paddingBottom={3}
                column
                width="100%"
              >
                <Text bold>
                  NUMBER OF APPLICANT&nbsp;<Text color="visaRed">*</Text>
                </Text>
                <Input
                  backgroundColor="white"
                  padding={`${spacingValues.xs}px ${spacingValues.s}px`}
                  borderRadius={borderRadius}
                  border={`1px solid ${colors.lightGrey}`}
                  width="100%"
                  value={quantity}
                  onChange={this.updateQuantity}
                  marginTop={2}
                  type="number"
                  placeholder="1"
                  min={1}
                />
              </Flexbox>
              <Flexbox
                alignItems="flex-start"
                paddingBottom={3}
                column
                width="100%"
              >
                <Text bold>
                  TYPE OF VISA&nbsp;<Text color="visaRed">*</Text>
                </Text>
                <Select
                  value={type}
                  placeholder="Select..."
                  onChange={this.updateType}
                  options={typeOptions}
                />
              </Flexbox>
              <Flexbox
                alignItems="flex-start"
                paddingBottom={3}
                column
                width="100%"
              >
                <Text bold>
                  PROCESSING TIME&nbsp;<Text color="visaRed">*</Text>
                </Text>
                <Select
                  value={processingTime}
                  placeholder="Normal"
                  onChange={this.updateProcessingTime}
                  options={processingTimeOptions}
                />
              </Flexbox>
              <Flexbox
                alignItems="flex-start"
                paddingBottom={3}
                column
                width="100%"
              >
                <Text bold>
                  PURPOSE OF VISA&nbsp;<Text color="visaRed">*</Text>
                </Text>
                <Select
                  value={purpose}
                  placeholder="Select..."
                  onChange={this.updatePurpose}
                  options={purposeOptions}
                />
              </Flexbox>
              <Flexbox
                alignItems="flex-start"
                paddingBottom={3}
                column
                width="100%"
              >
                <Text bold>ARRIVAL AIRPORT</Text>
                <Select
                  value={airport}
                  placeholder="Select..."
                  onChange={this.updateAirport}
                  options={airportOptions}
                />
              </Flexbox>
              <Flexbox
                alignItems="flex-start"
                paddingBottom={3}
                column
                width="100%"
              >
                <Text bold>ARRIVAL DATE</Text>
                <Input
                  type="date"
                  value={arrivalDate}
                  backgroundColor="white"
                  padding={`${spacingValues.xs}px ${spacingValues.s}px`}
                  borderRadius={borderRadius}
                  border={`1px solid ${colors.lightGrey}`}
                  width="100%"
                  onChange={this.updateArrivalDate}
                />
              </Flexbox>
              <Flexbox
                alignItems="flex-start"
                paddingBottom={3}
                column
                width="100%"
              >
                <Text bold>DEPARTURE DATE</Text>
                <Input
                  type="date"
                  value={departureDate}
                  backgroundColor="white"
                  padding={`${spacingValues.xs}px ${spacingValues.s}px`}
                  borderRadius={borderRadius}
                  border={`1px solid ${colors.lightGrey}`}
                  width="100%"
                  onChange={this.updateDepartureDate}
                />
              </Flexbox>

              <Flexbox
                borderColor="darkGrey"
                borderTop
                alignItems="flex-start"
                paddingTop={1}
                paddingBottom={3}
                column
                width="100%"
              >
                <Text bold>EXTRA SERVICES</Text>
                <ReactTooltip multiline />
                <Label
                  data-tip="All immigration procedures shall be handled by our staff in the most timely manner.
                        <br/>
                        You will not need to get in line and wait for visa stamping.
                        <br/>
                        Highly recommended if you don't want to waste time at the airport or/and you are visiting Vietnam for the first time.
                        <br/>
                        * Visa stamping fee shall be paid in cash and borne by you."
                  display="flex"
                  alignItems="center"
                  cursor="pointer"
                >
                  <Input
                    type="checkbox"
                    onChange={this.updateAirportFastTrack}
                    value={extraServices.airportFastTrack}
                    marginRight={spacingValues.s}
                  />
                  <Text bold>Airport fast track</Text>
                </Label>
                <ReactTooltip multiline />
                <Label
                  data-tip="
                        Highly recommended to accelerate immigration procedures at Vietnam airport.
                        <br/>
                        You will not need to pay this fee again upon arrival.
                        <br/>
                        * Only available when fast-track service is applied."
                  display="flex"
                  alignItems="center"
                  cursor="pointer"
                >
                  <Input
                    type="checkbox"
                    onChange={this.updateStampingFee}
                    value={extraServices.stampingFee}
                    marginRight={spacingValues.s}
                  />
                  <Text bold>Stamping fee</Text>
                </Label>
                <ReactTooltip multiline />
                <Label
                  data-tip="
                        Private/confidential visa approval letter is efficient in case you want your visa approval letter to contain only your name or the name of your group
                        <br/>
                        because it is typical for a visa approval letter to contain a number of names of unacquainted people.
                        "
                  display="flex"
                  alignItems="center"
                  cursor="pointer"
                >
                  <Input
                    type="checkbox"
                    onChange={this.updatePrivateVisaLetter}
                    value={extraServices.privateVisaLetter}
                    marginRight={spacingValues.s}
                  />
                  <Text bold>Private visa letter</Text>
                </Label>
                <ReactTooltip multiline />
                <Label
                  data-tip="
                        You will be picked up to inner city by our friendly driver who stands outside the airport with your name on the welcome sign to save your waiting time.
                        <br/>
                        Highly recommend if you are visiting Vietnam for the first time and/or your arrival is at night.
                        <br />
                        * Accompanying fast-track service is recommended so that the pick-up is as scheduled.
                        "
                  display="flex"
                  alignItems="center"
                  cursor="pointer"
                >
                  <Input
                    type="checkbox"
                    onChange={this.updateCarPickUp}
                    value={extraServices.carPickUp}
                    marginRight={spacingValues.s}
                  />
                  <Text bold>Car pick-up (4 seats)</Text>
                </Label>
              </Flexbox>
            </Flexbox>
            <Flexbox
              flex={1}
              column
              width="100%"
              marginLeft={spacingValues.xxs}
              marginRight={spacingValues.xxs}
            >
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
                {extraServices.airportFastTrack && (
                  <Flexbox display="flex" justifyContent="space-between">
                    <Text bold>Airport fast track</Text>
                    <Text>{airportFastTrackCost}</Text>
                  </Flexbox>
                )}
                {extraServices.stampingFee && (
                  <Flexbox display="flex" justifyContent="space-between">
                    <Text bold>Stamping fee</Text>
                    <Text>{stampingFeeCost}</Text>
                  </Flexbox>
                )}
                {extraServices.privateVisaLetter && (
                  <Flexbox display="flex" justifyContent="space-between">
                    <Text bold>Private visa letter</Text>
                    <Text>{privateVisaLetterCost}</Text>
                  </Flexbox>
                )}
                {extraServices.carPickUp && (
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
                <Text>Payment method:</Text>
                <Label display="flex" alignItems="center" cursor="pointer">
                  <Input
                    type="radio"
                    name="paymentMethod"
                    onChange={this.updatePaymentMethod}
                    value="paypal"
                    marginRight={spacingValues.s}
                  />
                  <Text>Paypal</Text>
                </Label>
                <Label display="flex" alignItems="center" cursor="pointer">
                  <Input
                    type="radio"
                    name="paymentMethod"
                    onChange={this.updatePaymentMethod}
                    value="credit"
                    marginRight={spacingValues.s}
                  />
                  <Text>Visa/Master/AMEX/JCB/Union Pay</Text>
                </Label>
                <Label display="flex" alignItems="center" cursor="pointer">
                  <Input
                    type="radio"
                    name="paymentMethod"
                    onChange={this.updatePaymentMethod}
                    value="wu"
                    marginRight={spacingValues.s}
                  />
                  <Text>Western Union</Text>
                </Label>
                <Label display="flex" alignItems="center" cursor="pointer">
                  <Input
                    type="radio"
                    name="paymentMethod"
                    onChange={this.updatePaymentMethod}
                    value="later"
                    marginRight={spacingValues.s}
                  />
                  <Text>I will page later</Text>
                </Label>

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
                  <Text bold>I have read and agree with the Terms of Use</Text>
                </Label>
              </Div>

              <Button
                solid
                marginTop={5}
                marginBottom={5}
                onClick={this.onSubmit}
              >
                NEXT&nbsp;&nbsp;
                <i className="fa fa-arrow-right" />
              </Button>

              {shouldShowErrorMessage && (
                <Text color="visaRed" bold>
                  Please fill in the required inputs and accept Terms of Use
                </Text>
              )}
            </Flexbox>
          </Flexbox>
        )}
      />
    );
  }
}

const ApplyFormStepOneWithRedux = connect(null, null)(ApplyFormStepOne);

const mapStateToProps = store => {
  return {
    stepOne: store.stepOne,
  };
};
const mapDispatchToProps = {
  finishStepOne: finishStepOne,
};
export default withRedux(initialStore, mapStateToProps, mapDispatchToProps)(
  ApplyFormStepOneWithRedux,
);
