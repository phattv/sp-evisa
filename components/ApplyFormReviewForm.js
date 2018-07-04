// @flow
// vendor
import React, { Fragment } from 'react';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
// custom
import { Image, Flexbox, Text } from './ui';
import Divider from './Divider';
import { boxShadow, iconSizes } from '../constants/ui';
import { reducerNames } from '../constants/reducerNames';
import { updateGuest, updatePrice } from '../redux/actions';
import {
  typeOptions,
  airportOptions,
  purposeOptions,
  processingTimeOptions,
  countryOptionsSemantic,
  airportFastTrackOptions,
  carPickUpOptions,
} from '../constants/dropDownOptions';
import { guestInitialState } from '../redux/reducers/guest';

type Props = {
  stepOne: Object,
  fees: Array<Object>,
  account: Object,
  updateGuest: Object => void,
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

  guest: Object,
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

    guest: {
      name: '',
      email: '',
      phone: '',
    },
  };

  updateGuestTextField = (event: Object) => {
    this.setState(
      {
        guest: {
          ...this.state.guest,
          [event.target.name]: event.target.value,
        },
      },
      () => this.props.updateGuest(this.state.guest),
    );
  };

  calculateTotalFee = (nextProps: Object) => {
    const quantity = _get(
      nextProps,
      'stepOne.quantity',
      _get(this, 'props.stepOne.quantity'),
    );
    const parsedQuantity = Number.parseInt(quantity, 10);
    const {
      processingTimeObject,
      shouldShowProcessingFees,
      shouldShowExtraServices,
      fastTrackObject,
      carPickupObject,
      privateVisaLetter,
    } = this.state;
    const processingFees = shouldShowProcessingFees
      ? parsedQuantity * _get(processingTimeObject, 'price', 0)
      : 0;
    const extraFees = shouldShowExtraServices
      ? _get(fastTrackObject, 'price', 0) + _get(carPickupObject, 'price', 0)
      : 0;
    const privateVisaLetterCost = privateVisaLetter === true ? 8 : 0;

    const totalFee =
      parsedQuantity * this.state.costPerPerson +
      processingFees +
      extraFees +
      privateVisaLetterCost;

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
      this.props.stepOne !== nextProps.stepOne
    ) {
      this.syncStateAndCalculateTotalFee(nextProps);
    }
  }

  syncStateAndCalculateTotalFee = props => {
    const type = _get(props, 'stepOne.type', '');
    const purpose = _get(props, 'stepOne.purpose', '');
    const fees = _get(props, 'fees', []).find(fees => fees.type === purpose);
    const processingTime = _get(props, 'stepOne.processingTime', '');
    const guest = _get(props, 'guest', guestInitialState);

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
        guest,
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

  render() {
    const {
      stepOne: { airport, arrivalDate, departureDate },
      account,
    } = this.props;
    const { guest: { name, email, phone } } = this.state;
    const isLoggedIn = account && Object.keys(account).length > 0;

    return (
      <Flexbox
        backgroundColor="bgGrey2"
        column
        alignSelf="flex-start"
        width="100%"
        alignItems="center"
        paddingVertical={6}
        paddingHorizontal={6}
        style={{
          boxShadow,
        }}
      >
        <Text fontSize="m" semibold color="darkBlue">
          Review Your Order
        </Text>
        <Divider />

        {airport && this.renderAirport({ airport })}

        {arrivalDate &&
          departureDate &&
          this.renderFlightDates({ arrivalDate, departureDate })}

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
          <Text fontSize="xs" noDoubleLineHeight>
            Arrival Airport
          </Text>
          <Text fontSize="s" color="2c3f60" textAlign="center">
            {selectedOption.text}
          </Text>
        </Flexbox>
      );
    } else {
      return null;
    }
  };

  renderFlightDates = ({ arrivalDate, departureDate }) => (
    <Flexbox justifyContent="space-between" paddingTop={4} width="100%">
      <Flexbox column alignItems="center" flex={1}>
        <Text fontSize="xs" noDoubleLineHeight>
          Arrival Date
        </Text>
        <Text fontSize="s" color="2c3f60" textAlign="center">
          {arrivalDate}
        </Text>
      </Flexbox>
      <Flexbox border borderRight={1} />
      <Flexbox column alignItems="center" flex={1}>
        <Text fontSize="xs" noDoubleLineHeight>
          Departure Date
        </Text>
        <Text fontSize="s" color="2c3f60" textAlign="center">
          {departureDate}
        </Text>
      </Flexbox>
    </Flexbox>
  );

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
    const { stepOne: { quantity, type, purpose, countryId } } = this.props;

    const parsedQuantity = parseInt(quantity, 10);
    const applicants = [];
    for (let index = 0; index < parsedQuantity; index++) {
      applicants.push(index);
    }
    const countryObject = countryOptionsSemantic.find(
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
          this.renderProcessingFees({ processingTimeObject })}

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
          <Text color="white">Total Fee</Text>
          <Text bold color="white">
            ${totalFee}
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

  renderProcessingFees = ({ processingTimeObject }) => (
    <Fragment>
      <Flexbox alignItems="center" paddingTop={4}>
        <Image
          src="../static/icons/time-ico.svg"
          alt="time ico"
          width={iconSizes.small}
        />
        <Text paddingLeft={3} fontSize="s">
          Processing Time
        </Text>
      </Flexbox>
      {this.renderSpaceBetweenBlock({
        leftContent: _get(processingTimeObject, 'text', ''),
        rightContent: `$${_get(processingTimeObject, 'price', 0)}`,
      })}
    </Fragment>
  );

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
          noMarginTop: true,
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
          rightContent: '$8',
          noMarginTop: true,
        })}
    </Fragment>
  );

  // TODO: noMarginTop: Property not found in objcet literal
  renderSpaceBetweenBlock = ({ leftContent, rightContent, noMarginTop }) => (
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
    account: store[reducerNames.account],
    guest: store[reducerNames.guest],
    stepOne: store[reducerNames.form].stepOne,
    fees: store[reducerNames.fees].fees,
    price: store[reducerNames.form].price,
  };
};
const mapDispatchToProps = {
  updateGuest,
  updatePrice,
};
export default connect(mapStateToProps, mapDispatchToProps)(
  ApplyFormReviewForm,
);
