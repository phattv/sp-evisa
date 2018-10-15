// @flow
// vendor
import React, { Fragment } from 'react';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import dayjs from 'dayjs';
// custom
import { Image, Flexbox, Text } from './ui';
import Divider from './Divider';
import { displayDateFormat, iconSizes } from '../constants/ui';
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
import { fees } from '../constants/fees';
import { updatePrice } from '../redux/actions';

type Props = {
  stepOne: Object,
  stepTwo: Object,
  fees: Array<Object>,
  updatePrice: number => void,
  price: number,
};
type State = {
  costPerPerson: number,
  paymentMethod: string,
  totalFee: number,
  shouldShowErrorMessage: boolean,
  processingTimeObject: Object,
  shouldShowProcessingFees: boolean,
  fastTrackObject: Object,
  carPickupObject: Object,
  privateVisaLetter: boolean,
  shouldShowExtraServices: boolean,
};
class ApplyFormReviewForm extends React.Component<Props, State> {
  state = {
    costPerPerson: 0,
    paymentMethod: '',
    totalFee: 0,
    shouldShowErrorMessage: false,
    processingTimeObject: {},
    shouldShowProcessingFees: false,
    fastTrackObject: {},
    carPickupObject: {},
    privateVisaLetter: false,
    shouldShowExtraServices: false,
  };

  calculateTotalFee = (nextProps: Object) => {
    const {
      costPerPerson,
      processingTimeObject,
      fastTrackObject,
      carPickupObject,
      privateVisaLetter,

      shouldShowProcessingFees,
      shouldShowExtraServices,
    } = this.state;

    // parse quantity
    const quantity = _get(
      nextProps,
      'stepTwo.quantity',
      _get(this, 'props.stepTwo.quantity'),
    );
    const parsedQuantity = Number.parseInt(quantity, 10);

    // processing fees
    const processingFees = shouldShowProcessingFees
      ? _get(processingTimeObject, 'price', 0)
      : 0;

    // extra services fees
    let extraServiceFees = shouldShowExtraServices
      ? _get(fastTrackObject, 'price', 0) + _get(carPickupObject, 'price', 0)
      : 0;
    if (privateVisaLetter) {
      extraServiceFees += fees.privateVisaLetter;
    }

    /**
     * Total fee formular:
     * - per applicant: cost per person + processing fee (multiply by quantity)
     * - per order: extraServiceFees (once only)
     */
    const totalFee =
      (costPerPerson + processingFees) * parsedQuantity + extraServiceFees;

    this.setState(
      {
        totalFee,
      },
      () => this.props.updatePrice(totalFee),
    );
  };

  componentDidMount() {
    this.syncStateAndCalculateTotalFee(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.fees !== nextProps.fees ||
      this.props.stepOne !== nextProps.stepOne ||
      this.props.stepTwo !== nextProps.stepTwo
    ) {
      this.syncStateAndCalculateTotalFee(nextProps);
    }
  }

  syncStateAndCalculateTotalFee = props => {
    const type = _get(props, 'stepOne.type', '');
    const purpose = _get(props, 'stepOne.purpose', '');
    const fees = _get(props, 'fees', []).find(fees => fees.type === purpose);
    const processingTime = _get(props, 'stepOne.processingTime', '');

    // Processing time
    const processingTimeObject = processingTimeOptions.find(
      option => option.value === processingTime,
    );
    const shouldShowProcessingFees =
      processingTimeObject !== processingTimeOptions[0];

    // Extra services
    const { fastTrack, carPickup, privateVisaLetter } = _get(
      props,
      'stepOne.extraServices',
      {},
    );
    const fastTrackObject = airportFastTrackOptions.find(
      option => option.value === fastTrack,
    );
    const carPickupObject = carPickUpOptions.find(
      option => option.value === carPickup,
    );
    const shouldShowExtraServices =
      (!_isEmpty(fastTrackObject) &&
        fastTrackObject !== airportFastTrackOptions[0]) ||
      (!_isEmpty(carPickupObject) && carPickupObject !== carPickUpOptions[0]) ||
      privateVisaLetter;
    const costPerPerson = fees && fees[type] > 0 ? fees[type] : 0;

    this.setState(
      {
        costPerPerson,
        processingTimeObject,
        shouldShowProcessingFees,
        fastTrackObject,
        carPickupObject,
        privateVisaLetter,
        shouldShowExtraServices,
      },
      () => this.calculateTotalFee(props),
    );
  };

  // TODO: check UI when data is empty
  render() {
    const {
      stepTwo: { airport, flightNumber, arrivalDate, departureDate },
    } = this.props;

    const parsedArrivalDate = dayjs(arrivalDate).isValid()
      ? dayjs(arrivalDate).format(displayDateFormat)
      : '';
    const parsedDepartureDate = dayjs(departureDate).isValid()
      ? dayjs(departureDate).format(displayDateFormat)
      : '';

    return (
      <Flexbox
        backgroundColor="bgGrey2"
        column
        alignSelf="flex-start"
        width="100%"
        alignItems="center"
        paddingVertical={6}
        paddingHorizontal={6}
        boxShadow
      >
        <Text fontSize="m" semibold color="darkBlue">
          Review Your Order
        </Text>
        <Divider />

        {airport && this.renderAirport({ airport })}

        {arrivalDate &&
          departureDate &&
          this.renderFlightDates({ parsedArrivalDate, parsedDepartureDate })}

        {flightNumber && this.renderFlightNumber({ flightNumber })}

        {this.renderTotalFee()}
      </Flexbox>
    );
  }

  renderAirport = ({ airport }) => {
    const selectedOption = (airportOptions || []).find(
      option => option.value === airport,
    );
    if (selectedOption) {
      return (
        <Flexbox column alignItems="center" paddingTop={4}>
          <Text fontSize="s" noDoubleLineHeight>
            Arrival Airport
          </Text>
          <Text color="2c3f60" textAlign="center">
            {selectedOption.text}
          </Text>
        </Flexbox>
      );
    } else {
      return null;
    }
  };

  renderFlightDates = ({ parsedArrivalDate, parsedDepartureDate }) => (
    <Flexbox justifyContent="space-between" paddingTop={4} width="100%">
      <Flexbox column alignItems="center" flex={1}>
        <Text fontSize="s" noDoubleLineHeight>
          Arrival Date
        </Text>
        <Text color="2c3f60" textAlign="center">
          {parsedArrivalDate}
        </Text>
      </Flexbox>
      <Flexbox border borderRight={1} />
      <Flexbox column alignItems="center" flex={1}>
        <Text fontSize="s" noDoubleLineHeight>
          Departure Date
        </Text>
        <Text color="2c3f60" textAlign="center">
          {parsedDepartureDate}
        </Text>
      </Flexbox>
    </Flexbox>
  );

  renderFlightNumber = ({ flightNumber }) => {
    return (
      <Flexbox column alignItems="center" paddingTop={4}>
        <Text fontSize="s" noDoubleLineHeight>
          Flight Number
        </Text>
        <Text color="2c3f60" textAlign="center">
          {flightNumber}
        </Text>
      </Flexbox>
    );
  };

  renderTotalFee = () => {
    const {
      totalFee,
      costPerPerson,
      processingTimeObject,
      shouldShowProcessingFees,
      fastTrackObject,
      carPickupObject,
      privateVisaLetter,
      shouldShowExtraServices,
    } = this.state;
    const {
      stepOne: { type, purpose, countryId },
      stepTwo: { quantity },
    } = this.props;

    const parsedQuantity = parseInt(quantity, 10);
    const applicants = [];
    for (let index = 0; index < parsedQuantity; index++) {
      applicants.push(index);
    }
    const countryObject = countryOptions.find(
      option => option.value === countryId,
    );
    const countryString = _get(countryObject, 'text', '');

    return (
      <Flexbox paddingTop={4} column width="100%">
        {this.renderBasicOrderInfo({
          quantity,
          countryString,
          purpose,
          costPerPerson,
          type,
        })}
        {shouldShowProcessingFees &&
          this.renderProcessingFees({ quantity, processingTimeObject })}
        {shouldShowExtraServices &&
          this.renderExtraServices({
            fastTrackObject,
            carPickupObject,
            privateVisaLetter,
          })}
        <Flexbox
          backgroundColor="darkBlue"
          paddingHorizontal={3}
          paddingVertical={2}
          marginTop={4}
          justifyContent="space-between"
        >
          <Text color="white">Total Fee*</Text>
          <Text bold color="white">
            ${totalFee}
          </Text>
        </Flexbox>

        <Flexbox paddingTop={2}>
          <Text textAlign="center" fontSize="s" noDoubleLineHeight>
            *This cost doesn't include stamping fee, you have to pay in cash at
            the airport
          </Text>
        </Flexbox>
      </Flexbox>
    );
  };

  renderType = (type: string) => {
    const selectedOption = (typeOptions || []).find(
      option => option.value === type,
    );
    if (selectedOption) {
      return selectedOption.text;
    }
  };

  renderPurpose = (type: string) => {
    const selectedOption = (purposeOptions || []).find(
      option => option.value === type,
    );
    if (selectedOption) {
      return selectedOption.text;
    }
  };

  renderBasicOrderInfo = ({
    quantity,
    countryString,
    purpose,
    costPerPerson,
    type,
  }) => (
    <Fragment>
      <Flexbox alignItems="center">
        <Image
          src="../static/icons/applicants-ico.svg"
          alt="applicants ico"
          width={iconSizes.small}
        />
        <Text paddingLeft={3} color="darkBlue">
          {quantity} Applicant{quantity > 1 && 's'}
          {countryString && ` / ${countryString}`}
        </Text>
      </Flexbox>

      <Flexbox alignItems="center" paddingTop={2}>
        <Image
          src="../static/icons/doc-ico.svg"
          alt="doc ico"
          width={iconSizes.small}
        />
        <Text paddingLeft={3} color="darkBlue">
          {this.renderPurpose(purpose)} / {this.renderType(type)}
        </Text>
      </Flexbox>

      {this.renderSpaceBetweenBlock({
        leftContent: `${quantity} x $${costPerPerson}`,
        rightContent: `$${quantity * costPerPerson}`,
      })}
    </Fragment>
  );

  renderProcessingFees = ({ quantity, processingTimeObject }) => {
    const processingTimePrice = _get(processingTimeObject, 'price', 0);
    return (
      <Fragment>
        <Flexbox alignItems="center" paddingTop={4}>
          <Image
            src="../static/icons/time-ico.svg"
            alt="time ico"
            width={iconSizes.small}
          />
          <Flexbox column paddingLeft={3}>
            <Text fontSize="s">Processing Time</Text>
            <Text color="darkBlue">
              {_get(processingTimeObject, 'text', '')}
            </Text>
          </Flexbox>
        </Flexbox>
        {this.renderSpaceBetweenBlock({
          leftContent: `${quantity} x $${processingTimePrice}`,
          rightContent: `$${quantity * processingTimePrice}`,
        })}
      </Fragment>
    );
  };

  renderExtraServices = ({
    fastTrackObject,
    carPickupObject,
    privateVisaLetter,
  }) => (
    <Fragment>
      <Flexbox alignItems="center" paddingTop={4}>
        <Image
          src="../static/icons/others-ico.svg"
          alt="others ico"
          width={iconSizes.small}
        />
        <Text paddingLeft={3} fontSize="s">
          Other Services
        </Text>
      </Flexbox>

      {!_isEmpty(fastTrackObject) &&
        fastTrackObject !== airportFastTrackOptions[0] &&
        this.renderSpaceBetweenBlock({
          leftContent: fastTrackObject.text,
          rightContent: `$${fastTrackObject.price}`,
        })}

      {!_isEmpty(carPickupObject) &&
        carPickupObject !== carPickUpOptions[0] &&
        this.renderSpaceBetweenBlock({
          leftContent: carPickupObject.text,
          rightContent: `$${carPickupObject.price}`,
          noMarginTop: true,
        })}

      {privateVisaLetter &&
        this.renderSpaceBetweenBlock({
          leftContent: 'Private visa letter',
          rightContent: `$${fees.privateVisaLetter}`,
          noMarginTop: true,
        })}
    </Fragment>
  );

  renderSpaceBetweenBlock = ({
    leftContent,
    rightContent,
    noMarginTop,
  }: {
    leftContent: string,
    rightContent: string,
    noMarginTop?: boolean,
  }) => (
    <Flexbox
      backgroundColor="white"
      paddingHorizontal={3}
      paddingVertical={2}
      marginTop={noMarginTop ? 0 : 2}
      justifyContent="space-between"
      alignItems="center"
    >
      <Text color="darkBlue">{leftContent}</Text>
      <Text bold color="green" paddingLeft={2}>
        {rightContent}
      </Text>
    </Flexbox>
  );
}

const mapStateToProps = store => {
  return {
    stepOne: store[reducerNames.form].stepOne,
    stepTwo: store[reducerNames.form].stepTwo,
    fees: store[reducerNames.fees].fees,
    price: store[reducerNames.form].price,
  };
};
const mapDispatchToProps = {
  updatePrice,
};
export default connect(mapStateToProps, mapDispatchToProps)(
  ApplyFormReviewForm,
);
