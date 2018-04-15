// @flow
// vendor
import * as React from 'react';
import Select from 'react-select';
import { Form } from 'react-final-form';
import { Input, Label } from 'glamorous';
import ReactTooltip from 'react-tooltip';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import withRedux from 'next-redux-wrapper';
import get from 'lodash/get';
// custom
import { Button, Flexbox, Text } from '../components';
import { borderRadius, colors, spacingValues } from '../constants/ui';
import { configureStore } from '../redux/store';
import {
  updateStepOne,
  updateFees,
  updateFeesSelectedCountry,
} from '../redux/actions';
import ApplyFormReviewForm from './ApplyFormReviewForm';
import { getFeesByCountryId } from '../utils/apiClient';
import {
  typeOptions,
  purposeOptions,
  processingTimeOptions,
  airportOptions,
  countryOptions,
} from '../constants/dropDownOptions';

type Props = {
  countryId: number,
  onSubmit: () => void,
  stepOne: Object,
  updateStepOne: Object => void,
  updateFees: (Array<Object>) => void,
  updateFeesSelectedCountry: number => void,
};
type State = {
  country: number | string,
  quantity: string,
  type: string,
  purpose: string,
  processingTime: string,
  airport: string,
  arrivalDate: string,
  departureDate: string,
  extraServices: Object,
  shouldShowErrorMessage: boolean,
};
class ApplyFormStepOne extends React.Component<Props, State> {
  state = {
    country: '',
    quantity: '1',
    type: typeOptions[0].value,
    purpose: purposeOptions[0].value,
    processingTime: processingTimeOptions[0].value,
    airport: airportOptions[0].value,
    arrivalDate: '',
    departureDate: '',
    extraServices: {
      airportFastTrack: false,
      airportVipFastTrack: false,
      carPickUp4Seats: false,
      carPickUp7Seats: false,
      carPickUp16Seats: false,
      carPickUp24Seats: false,
    },
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
      shouldShowErrorMessage,
    });

    // save to store
    this.props.updateStepOne(this.state);

    // onSubmit callback
    if (shouldShowErrorMessage === false) {
      const { onSubmit } = this.props;
      onSubmit && onSubmit();
    }
  };

  updateCountry = (selectedOption: Object) => {
    this.setState(
      {
        country: selectedOption.value,
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
  };

  updateFees = data => {
    this.props.updateFees(data);
  };

  updateDefaultInput = (event: Object) => {
    this.setState(
      {
        [event.target.name]: event.target.value,
      },
      () => this.updateStepOneToStore(),
    );
  };

  //<editor-fold desc="Update <Select> inputs">
  updateType = (selectedOption: Object) =>
    this.setState(
      {
        type: selectedOption
          ? selectedOption ? selectedOption.value : ''
          : '',
      },
      () => this.updateStepOneToStore(),
    );

  updateProcessingTime = (selectedOption: Object) =>
    this.setState(
      {
        processingTime: selectedOption ? selectedOption.value : '',
      },
      () => this.updateStepOneToStore(),
    );

  updatePurpose = (selectedOption: Object) =>
    this.setState(
      {
        purpose: selectedOption ? selectedOption.value : '',
      },
      () => this.updateStepOneToStore(),
    );

  updateAirport = (selectedOption: Object) =>
    this.setState(
      {
        airport: selectedOption ? selectedOption.value : '',
      },
      () => this.updateStepOneToStore(),
    );
  //</editor-fold>

  updateExtraService = (event: Object) => {
    this.setState(
      {
        extraServices: {
          ...this.state.extraServices,
          [event.target.name]: !this.state.extraServices[event.target.name],
        },
      },
      () => this.updateStepOneToStore(),
    );
  };

  updateStepOneToStore = () => {
    console.log('xxx', this.state);
    this.props.updateStepOne(this.state);
  };

  componentDidMount() {
    this.syncPropsToState(this.props, true);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.stepOne !== nextProps.stepOne) {
      this.syncPropsToState(nextProps);
    }
  }

  syncPropsToState = (nextProps: Props, isForced?: boolean) => {
    if (isForced || this.props.stepOne !== nextProps.stepOne) {
      this.setState({
        country: get(nextProps, 'stepOne.country', ''),
        quantity: get(nextProps, 'stepOne.quantity', '1'),
        type: get(nextProps, 'stepOne.type', typeOptions[0].value),
        purpose: get(nextProps, 'stepOne.purpose', purposeOptions[0].value),
        processingTime: get(
          nextProps,
          'stepOne.processingTime',
          processingTimeOptions[0].value,
        ),
        airport: get(nextProps, 'stepOne.airport', airportOptions[0].value),
        arrivalDate: get(nextProps, 'stepOne.arrivalDate', ''),
        departureDate: get(nextProps, 'stepOne.departureDate', ''),
        extraServices: get(nextProps, 'stepOne.extraServices', {}),
      });
    }

    if (isForced || this.props.countryId !== nextProps.countryId) {
      this.setState({
        country: nextProps.countryId,
      });
    }
  };

  renderExtraServices = () => {
    const { extraServices } = this.state;

    return (
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
        <ReactTooltip html />
        <Label
          data-tip="
                  <div style='max-width: 250px; text-align: center;'>
                    <p>Our staff will meet you at the Visa Landing Counter with your name on the welcome board and assist you to get visa stamp and visa sticker without getting line as others.</p>
                    <p>Just 5 -10 minutes (it depends on the number of applicants at Visa Landing Counter) you will at the luggage lounge to wait for your belonging.</p>
                  </div>"
          data-html
          display="flex"
          width="100%"
          alignItems="center"
          cursor="pointer"
        >
          <Input
            name="airportFastTrack"
            type="checkbox"
            onChange={this.updateExtraService}
            value={extraServices.airportFastTrack}
            marginRight={spacingValues.s}
          />
          <Text bold>Airport fast track</Text>
        </Label>

        <ReactTooltip html />
        <Label
          data-tip="
                  <div style='max-width: 250px; text-align: center;'>
                    <p>Our staff will meet you at the Visa Landing Counter with your name on the welcome board and assist you to get visa stamp and visa sticker without getting line as others.</p>
                    <p>After that, our staff will escort you go to luggage lounge to assist you take care of your luggage as baggage porters.</p>
                  </div>"
          data-html
          display="flex"
          width="100%"
          alignItems="center"
          cursor="pointer"
        >
          <Input
            name="airportVipFastTrack"
            type="checkbox"
            onChange={this.updateExtraService}
            value={extraServices.airportFastTrack}
            marginRight={spacingValues.s}
          />
          <Text bold>Airport VIP fast track</Text>
        </Label>

        <ReactTooltip multiline />
        <Label
          data-tip="
                  <div style='max-width: 250px; text-align: center;'>
                    <p>You will be picked up to inner city by our friendly driver who stands outside the airport with your name on the welcome sign to save your waiting time.</p>
                    <p>Highly recommend if you are visiting Vietnam for the first time and/or your arrival is at night.</p>
                    <p>* Accompanying fast-track service is recommended so that the pick-up is as scheduled.</p>
                  </div>
                  "
          data-html
          display="flex"
          width="100%"
          alignItems="center"
          cursor="pointer"
        >
          <Input
            name="carPickUp4Seats"
            type="checkbox"
            onChange={this.updateExtraService}
            value={extraServices.carPickUp4Seats}
            marginRight={spacingValues.s}
          />
          <Text bold>Car pick-up (4 seats)</Text>
        </Label>

        <ReactTooltip multiline />
        <Label
          data-tip="
                  <div style='max-width: 250px; text-align: center;'>
                    <p>You will be picked up to inner city by our friendly driver who stands outside the airport with your name on the welcome sign to save your waiting time.</p>
                    <p>Highly recommend if you are visiting Vietnam for the first time and/or your arrival is at night.</p>
                    <p>* Accompanying fast-track service is recommended so that the pick-up is as scheduled.</p>
                  </div>
                  "
          data-html
          display="flex"
          width="100%"
          alignItems="center"
          cursor="pointer"
        >
          <Input
            name="carPickUp7Seats"
            type="checkbox"
            onChange={this.updateExtraService}
            value={extraServices.carPickUp7Seats}
            marginRight={spacingValues.s}
          />
          <Text bold>Car pick-up (7 seats)</Text>
        </Label>

        <ReactTooltip multiline />
        <Label
          data-tip="
                  <div style='max-width: 250px; text-align: center;'>
                    <p>You will be picked up to inner city by our friendly driver who stands outside the airport with your name on the welcome sign to save your waiting time.</p>
                    <p>Highly recommend if you are visiting Vietnam for the first time and/or your arrival is at night.</p>
                    <p>* Accompanying fast-track service is recommended so that the pick-up is as scheduled.</p>
                  </div>
                  "
          data-html
          display="flex"
          width="100%"
          alignItems="center"
          cursor="pointer"
        >
          <Input
            name="carPickUp16Seats"
            type="checkbox"
            onChange={this.updateExtraService}
            value={extraServices.carPickUp16Seats}
            marginRight={spacingValues.s}
          />
          <Text bold>Car pick-up (16 seats)</Text>
        </Label>

        <ReactTooltip multiline />
        <Label
          data-tip="
                  <div style='max-width: 250px; text-align: center;'>
                    <p>You will be picked up to inner city by our friendly driver who stands outside the airport with your name on the welcome sign to save your waiting time.</p>
                    <p>Highly recommend if you are visiting Vietnam for the first time and/or your arrival is at night.</p>
                    <p>* Accompanying fast-track service is recommended so that the pick-up is as scheduled.</p>
                  </div>
                  "
          data-html
          display="flex"
          width="100%"
          alignItems="center"
          cursor="pointer"
        >
          <Input
            name="carPickUp24Seats"
            type="checkbox"
            onChange={this.updateExtraService}
            value={extraServices.carPickUp24Seats}
            marginRight={spacingValues.s}
          />
          <Text bold>Car pick-up (24 seats)</Text>
        </Label>
      </Flexbox>
    );
  };

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
                  value={country}
                  placeholder="Select.."
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
                  NUMBER OF APPLICANTS&nbsp;<Text color="visaRed">*</Text>
                </Text>
                <Input
                  name="quantity"
                  backgroundColor="white"
                  padding={`${spacingValues.xs}px ${spacingValues.s}px`}
                  borderRadius={borderRadius}
                  border={`1px solid ${colors.lightGrey}`}
                  width="100%"
                  value={quantity}
                  onChange={this.updateDefaultInput}
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
                  name="arrivalDate"
                  type="date"
                  value={arrivalDate}
                  backgroundColor="white"
                  padding={`${spacingValues.xs}px ${spacingValues.s}px`}
                  borderRadius={borderRadius}
                  border={`1px solid ${colors.lightGrey}`}
                  width="100%"
                  onChange={this.updateDefaultInput}
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
                  name="departureDate"
                  type="date"
                  value={departureDate}
                  backgroundColor="white"
                  padding={`${spacingValues.xs}px ${spacingValues.s}px`}
                  borderRadius={borderRadius}
                  border={`1px solid ${colors.lightGrey}`}
                  width="100%"
                  onChange={this.updateDefaultInput}
                />
              </Flexbox>

              {this.renderExtraServices()}
            </Flexbox>
            <Flexbox
              flex={1}
              column
              width="100%"
              marginHorizontal={spacingValues.xxs}
              marginVertical={spacingValues.xxs}
            >
              <ApplyFormReviewForm />

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
                  Please fill in the required inputs!
                </Text>
              )}
            </Flexbox>
          </Flexbox>
        )}
      />
    );
  }
}

const mapStateToProps = store => {
  return {
    countryId: get(store, 'fees.countryId', null),
    stepOne: get(store, 'form.stepOne', {}),
  };
};
const mapDispatchToProps = {
  updateStepOne,
  updateFees,
  updateFeesSelectedCountry,
};
export default withRedux(configureStore, mapStateToProps, mapDispatchToProps)(
  ApplyFormStepOne,
);
