// @flow
// vendor
import React from 'react';
import { Checkbox, Dropdown, Form, Popup } from 'semantic-ui-react';
import _get from 'lodash/get';
import { connect } from 'react-redux';
// custom
import { Anchor, Button, Flexbox, Image, Text } from './ui';
import FormHeading from './FormHeading';
import Divider from './Divider';
import FormErrorMessage from './FormErrorMessage';
import {
  updateFees,
  updateFeesSelectedCountry,
  updateStepOne,
} from '../redux/actions';
import { getFeesByCountryId } from '../utils/apiClient';
import { iconSizes, pageNames } from '../constants/ui';
import {
  airportFastTrackOptions,
  carPickUpOptions,
  countryOptions,
  processingTimeOptions,
  purposeOptions,
  typeOptions,
} from '../constants/dropDownOptions';
import { scrollToFirstErrorMessage } from '../utils/form';

type Props = {
  countryId: number,
  onSubmit: () => void,
  stepOne: Object,
  updateStepOne: Object => void,
  updateFees: (Array<Object>) => void,
  updateFeesSelectedCountry: number => void,
  onRef: any => void,
};
type State = {
  countryId: number | string,
  purpose: string,
  type: string,
  processingTime: string,
  extraServices: Object,
  shouldShowErrorMessage: boolean,
};
class ApplyFormStepOne extends React.Component<Props, State> {
  state = {
    countryId: '',
    purpose: purposeOptions[0].value,
    type: typeOptions[0].value,
    processingTime: processingTimeOptions[0].value,
    extraServices: {
      fastTrack: '',
      carPickup: '',
      privateVisaLetter: false,
    },
    shouldShowErrorMessage: false,
  };

  getFormInvalidity = () => {
    const { countryId, purpose, type, processingTime } = this.state;

    // required fields
    return !countryId || !purpose || !type || !processingTime;
  };

  onSubmit = (event: Object) => {
    const shouldShowErrorMessage = this.getFormInvalidity();
    this.setState({
      shouldShowErrorMessage,
    });

    // save to store
    this.updateStepOneToStore();

    // onSubmit callback
    if (shouldShowErrorMessage === false) {
      const { onSubmit } = this.props;
      onSubmit && onSubmit();
    } else {
      scrollToFirstErrorMessage();
    }
  };

  updateCountryId = (event: Object, selectedOption: Object) => {
    if (selectedOption) {
      this.setState(
        {
          countryId: selectedOption.value,
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
    } else {
      this.setState({
        countryId: '',
      });
    }
  };

  updateFees = data => {
    this.props.updateFees(data);
  };

  updatePurpose = (event: Object, selectedOption: Object) => {
    return this.setState(
      {
        purpose: selectedOption ? selectedOption.value : '',
      },
      () => this.updateStepOneToStore(),
    );
  };

  updateType = (event: Object, selectedOption: Object) =>
    this.setState(
      {
        type: selectedOption ? selectedOption.value : '',
      },
      () => this.updateStepOneToStore(),
    );

  updateProcessingTime = (event: Object, selectedOption: Object) => {
    // Logic note: if choose emergency, fast track is chosen
    this.setState(
      {
        processingTime: selectedOption ? selectedOption.value : '',
        extraServices: {
          ...this.state.extraServices,
          fastTrack:
            selectedOption.value === 'emergency'
              ? airportFastTrackOptions[1].value
              : '',
        },
      },
      () => this.updateStepOneToStore(),
    );
  };

  updateAirportFastTrack = (event: Object, selectedOption: Object) => {
    this.setState(
      {
        extraServices: {
          ...this.state.extraServices,
          fastTrack: selectedOption ? selectedOption.value : '',
        },
      },
      () => this.updateStepOneToStore(),
    );
  };

  updateCarPickup = (event: Object, selectedOption: Object) => {
    this.setState(
      {
        extraServices: {
          ...this.state.extraServices,
          carPickup: selectedOption ? selectedOption.value : '',
        },
      },
      () => this.updateStepOneToStore(),
    );
  };

  togglePrivateVisaLetter = () => {
    this.setState(
      {
        extraServices: {
          ...this.state.extraServices,
          privateVisaLetter: !this.state.extraServices.privateVisaLetter,
        },
      },
      () => this.updateStepOneToStore(),
    );
  };

  updateStepOneToStore = () => {
    this.props.updateStepOne({
      countryId: this.state.countryId,
      purpose: this.state.purpose,
      type: this.state.type,
      processingTime: this.state.processingTime,
      extraServices: this.state.extraServices,
    });
  };

  componentDidMount() {
    this.props.onRef(this);
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
        countryId: _get(nextProps, 'stepOne.countryId', ''),
        purpose: _get(nextProps, 'stepOne.purpose', purposeOptions[0].value),
        type: _get(nextProps, 'stepOne.type', typeOptions[0].value),
        processingTime: _get(
          nextProps,
          'stepOne.processingTime',
          processingTimeOptions[0].value,
        ),
        extraServices: _get(nextProps, 'stepOne.extraServices', {}),
      });
    }

    if (isForced || this.props.countryId !== nextProps.countryId) {
      this.setState({
        countryId: nextProps.countryId,
      });
    }
  };

  render() {
    const {
      countryId,
      type,
      processingTime,
      purpose,
      extraServices,
      shouldShowErrorMessage,
    } = this.state;

    let typeOptionsByPurpose = [];
    if (purpose === purposeOptions[0].value) {
      typeOptionsByPurpose = typeOptions.slice(0, 4);
    } else {
      typeOptionsByPurpose = typeOptions;
    }

    let fastTrackOptions =
      processingTime === 'emergency'
        ? airportFastTrackOptions.slice(1)
        : airportFastTrackOptions;

    return (
      <Form onSubmit={this.onSubmit} style={{ width: '100%' }}>
        <FormHeading text="Visa Requirements" />
        <Form.Field required>
          <Flexbox
            width="100%"
            alignItems="center"
            justifyContent="space-between"
          >
            <label>Country of Issue</label>
            <Popup
              trigger={
                <Image
                  src="../static/icons/info-ico.svg"
                  alt="info"
                  width={18}
                  fixedWidth
                />
              }
              content="Country of Immigration Department or Embassy Office where you get your passport from"
            />
          </Flexbox>
          <Dropdown
            error={shouldShowErrorMessage && !countryId}
            value={countryId}
            placeholder="Select..."
            fluid
            search
            selection
            options={countryOptions}
            onChange={this.updateCountryId}
          />
        </Form.Field>
        <Form.Field required>
          <label>Purpose of Visa</label>
          <Dropdown
            error={shouldShowErrorMessage && !purpose}
            value={purpose}
            placeholder="Select..."
            fluid
            search
            selection
            options={purposeOptions}
            onChange={this.updatePurpose}
          />
        </Form.Field>
        <Form.Field required>
          <label>Type of Visa</label>
          <Dropdown
            error={shouldShowErrorMessage && !type}
            value={type}
            placeholder="Select..."
            fluid
            search
            selection
            options={typeOptionsByPurpose}
            onChange={this.updateType}
          />
        </Form.Field>
        <Form.Field required>
          <label>Processing Time</label>
          <Dropdown
            error={shouldShowErrorMessage && !processingTime}
            value={processingTime}
            placeholder="Select..."
            fluid
            search
            selection
            options={processingTimeOptions}
            onChange={this.updateProcessingTime}
          />
        </Form.Field>

        {/* TODO: collapse by default on mobile */}
        <Flexbox paddingBottom={6} column paddingTop={6}>
          <Flexbox justifyContent="space-between" alignItems="center">
            <Text fontSize="m">Other Services (Optional)</Text>
            <Anchor href={pageNames.services}>See all</Anchor>
          </Flexbox>
          <Divider />
        </Flexbox>
        <Form.Field>
          <Flexbox
            width="100%"
            alignItems="center"
            justifyContent="space-between"
          >
            <label>Airport Fast Track</label>
            <Popup
              trigger={
                <Image
                  src="../static/icons/info-ico.svg"
                  alt="info"
                  width={18}
                  fixedWidth
                />
              }
              content="Our staff will greet you at the Visa Landing Counter and assist you to get visa stamp and sticker without queuing"
            />
          </Flexbox>
          <Dropdown
            value={extraServices.fastTrack}
            placeholder="Select..."
            fluid
            search
            selection
            options={fastTrackOptions}
            onChange={this.updateAirportFastTrack}
          />
        </Form.Field>
        <Form.Field>
          <Flexbox
            width="100%"
            alignItems="center"
            justifyContent="space-between"
          >
            <label>Car Pick Up</label>
            <Popup
              trigger={
                <Image
                  src="../static/icons/info-ico.svg"
                  alt="info"
                  width={18}
                  fixedWidth
                />
              }
              content="You will be picked up to inner city by our friendly driver who stands outside the airport with your name on the welcome sign to save your waiting time"
            />
          </Flexbox>
          <Dropdown
            value={extraServices.carPickup}
            placeholder="Select..."
            fluid
            search
            selection
            options={carPickUpOptions}
            onChange={this.updateCarPickup}
          />
        </Form.Field>
        <Form.Field>
          <Flexbox
            width="100%"
            alignItems="center"
            justifyContent="space-between"
          >
            <Checkbox
              checked={extraServices.privateVisaLetter}
              onChange={this.togglePrivateVisaLetter}
              label="Private Visa Letter"
            />
            <Popup
              trigger={
                <Image
                  src="../static/icons/info-ico.svg"
                  alt="info"
                  width={18}
                  fixedWidth
                />
              }
              content="Confidentiality is crucial. Because of Vietnam Immigration Office policy, all names for people getting visas on the same day will be on the same letter. We offer a private letter service so your name and the names of all members in your group will in a a private letter"
            />
          </Flexbox>
        </Form.Field>

        <Flexbox paddingTop={6} column>
          {shouldShowErrorMessage && <FormErrorMessage />}

          <Button type="submit" width="100%">
            Next
          </Button>
        </Flexbox>
      </Form>
    );
  }
}

const mapStateToProps = store => {
  return {
    countryId: _get(store, 'fees.countryId', null),
    stepOne: _get(store, 'form.stepOne', {}),
  };
};
const mapDispatchToProps = {
  updateStepOne,
  updateFees,
  updateFeesSelectedCountry,
};
export default connect(mapStateToProps, mapDispatchToProps)(ApplyFormStepOne);
