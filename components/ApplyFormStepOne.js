// @flow
// vendor
import React from 'react';
import { Checkbox, Dropdown, Form } from 'semantic-ui-react';
import _get from 'lodash/get';
import { connect } from 'react-redux';
// custom
import { Button, Flexbox, Text } from './ui';
import FormHeading from './FormHeading';
import FormErrorMessage from './FormErrorMessage';
import {
  updateFees,
  updateFeesSelectedCountry,
  updateStepOne,
} from '../redux/actions';
import { getFeesByCountryId } from '../utils/apiClient';
import {
  airportFastTrackOptions,
  carPickUpOptions,
  countryOptions,
  processingTimeOptions,
  purposeOptions,
  typeOptions,
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

  onSubmit = (event: Object) => {
    const { countryId, purpose, type, processingTime } = this.state;

    // required fields
    const shouldShowErrorMessage = !countryId || !purpose;
    !type ||
      !processingTime ||
      this.setState({
        shouldShowErrorMessage,
      });

    // save to store
    this.updateStepOneToStore();

    // onSubmit callback
    if (shouldShowErrorMessage === false) {
      const { onSubmit } = this.props;
      onSubmit && onSubmit();
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

    return (
      <Form
        onSubmit={this.onSubmit}
        style={{
          width: '100%',
        }}
      >
        <FormHeading text="Visa Requirements" />
        <Form.Field required>
          <label>Country</label>
          <Dropdown
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
        <FormHeading text="Other Services (Optional)" hasPaddingTop />
        <Form.Field>
          <label>Airport Fast Track</label>
          <Dropdown
            value={extraServices.fastTrack}
            placeholder="Select..."
            fluid
            search
            selection
            options={airportFastTrackOptions}
            onChange={this.updateAirportFastTrack}
          />
        </Form.Field>
        <Form.Field>
          <label>Car Pick Up</label>
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
          <Checkbox
            checked={extraServices.privateVisaLetter}
            onChange={this.togglePrivateVisaLetter}
            label="Private Visa Letter"
          />
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
