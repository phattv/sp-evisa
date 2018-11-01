// @flow
// vendor
import React from 'react';
import { Checkbox, Dropdown, Form, Popup } from 'semantic-ui-react';
import _get from 'lodash/get';
import _find from 'lodash/find';
import { connect } from 'react-redux';
import dayjs from 'dayjs';
// custom
import { Anchor, Button, Flexbox, Image, Text } from './ui';
import FormHeading from './FormHeading';
import Divider from './Divider';
import FormErrorMessage from './FormErrorMessage';
import CurrentTime from './CurrentTime';
import {
  updateFees,
  updateFeesSelectedCountry,
  updateStepOne,
} from '../redux/actions';
import { getFeesByCountryId } from '../utils/apiClient';
import { pageNames, displayShortDateTimeFormat } from '../constants/ui';
import {
  airportFastTrackOptions,
  carPickUpOptions,
  countryOptions,
  processingTimeOptions,
  purposeOptions,
  typeOptions,
} from '../constants/dropDownOptions';
import { scrollToFirstErrorMessage } from '../utils/form';

const usCountryId = _get(_find(countryOptions, { iso: 'US' }), 'value', 226);

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
  eta: string,
  extraServices: Object,
  shouldShowErrorMessage: boolean,
};
class ApplyFormStepOne extends React.Component<Props, State> {
  state = {
    countryId: '',
    purpose: purposeOptions[0].value,
    type: typeOptions[0].value,
    processingTime: processingTimeOptions[0].value,
    eta: '2 days',
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
      // Reset type option if invalid
      const { type } = this.state;
      if (
        type === typeOptions[typeOptions.length - 1].value ||
        type === typeOptions[typeOptions.length - 2].value
      ) {
        this.setState(
          {
            type: typeOptions[0].value,
          },
          () => this.updateStepOneToStore(),
        );
      }

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
            selectedOption.value === processingTimeOptions[2].value
              ? airportFastTrackOptions[1].value
              : '',
        },
      },
      () => this.updateStepOneToStore(),
    );

    // Calculate ETA
    if (selectedOption) {
      this.updateEta(selectedOption);
    }
  };

  updateEta = processingTime => {
    /**
     * Returns a number representing the Dayjs's day of the week:
     * Monday = 1
     * Tuesday = 2
     * Wednesday = 3
     * Thursday = 4
     * Friday = 5
     * Saturday = 6
     * Sunday = 0
     */
    const now = new Date();
    const dayInWeek = dayjs(now).day();
    let eta;
    const nextMonday = dayjs(now)
      .add(1, 'week')
      .startOf('week')
      .add(1, 'day')
      .set('hour', 12)
      .set('minute', 0);

    switch (processingTime) {
      case processingTimeOptions[0].value: {
        /**
         * Normal (Guaranteed 1-2 working days)
         * - thu, fri, sat, sun -> next monday - 12:00
         * - else: 2 days from today - 12:00
         */
        if ([4, 5, 6, 0].includes(dayInWeek)) {
          eta = nextMonday;
        } else {
          eta = dayjs(now)
            .add(2, 'day')
            .set('hour', 12)
            .set('minute', 0);
        }

        break;
      }
      case processingTimeOptions[1].value: {
        /**
         * Urgent (Guaranteed 4-8 working hours)
         * - sat, sun -> next monday - 12:00
         * - else:
         *   + before 08:00 -> today - 12:00
         *   + before 14:00 -> today - 18:00
         *   + else, tomorrow - 12:00
         */
        if ([6, 0].includes(dayInWeek)) {
          eta = nextMonday;
        } else {
          if (dayjs(now).hour() <= 8) {
            eta = dayjs(now)
              .set('hour', 12)
              .set('minute', 0);
          } else if (dayjs(now).hour() <= 14) {
            eta = dayjs(now)
              .set('hour', 18)
              .set('minute', 0);
          } else {
            eta = dayjs(now)
              .add(1, 'day')
              .set('hour', 12)
              .set('minute', 0);
          }
        }

        break;
      }
      case processingTimeOptions[2].value: {
        /**
         * Emergency (Guaranteed 1 working hour)
         * - sat, sun -> next monday - 12:00
         * - else:
         *   + before 10:00 -> today - 12:00
         *   + before 13:00 -> today - 15:00
         *   + before 15:00 -> today - 17:00
         */
        if ([6, 0].includes(dayInWeek)) {
          eta = nextMonday;
        } else {
          if (dayjs(now).hour() <= 10) {
            eta = dayjs(now)
              .set('hour', 12)
              .set('minute', 0);
          } else if (dayjs(now).hour() <= 13) {
            eta = dayjs(now)
              .set('hour', 15)
              .set('minute', 0);
          } else if (dayjs(now).hour() <= 15) {
            eta = dayjs(now)
              .set('hour', 17)
              .set('minute', 0);
          } else {
            eta = dayjs(now)
              .add(1, 'day')
              .set('hour', 12)
              .set('minute', 0);
          }
        }

        break;
      }
    }

    this.setState({ eta: eta.format(displayShortDateTimeFormat) });
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
      this.setState(
        {
          countryId: _get(nextProps, 'stepOne.countryId', ''),
          purpose: _get(nextProps, 'stepOne.purpose', purposeOptions[0].value),
          type: _get(nextProps, 'stepOne.type', typeOptions[0].value),
          processingTime: _get(
            nextProps,
            'stepOne.processingTime',
            processingTimeOptions[0].value,
          ),
          extraServices: _get(nextProps, 'stepOne.extraServices', {}),
        },
        () => this.updateEta(this.state.processingTime),
      );
    }

    if (isForced || this.props.countryId !== nextProps.countryId) {
      this.setState({
        countryId: nextProps.countryId,
      });
    }
  };

  openChat = () => {
    if (window && window.$crisp) {
      $crisp.push(['do', 'chat:open']);
    }
  };

  render() {
    const {
      countryId,
      type,
      processingTime,
      eta,
      purpose,
      extraServices,
      shouldShowErrorMessage,
    } = this.state;

    // Only support 6 months & 1 year visa for United States applicants
    const typeOptionsByPurpose =
      countryId === usCountryId ? typeOptions : typeOptions.slice(0, 4);

    let fastTrackOptions =
      processingTime === processingTimeOptions[2].value
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
            <LabelRequired label="Country of Issue" />
            <CustomPopup content="Country of Immigration Department or Embassy Office where you get your passport from" />
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
          <Flexbox
            width="100%"
            alignItems="center"
            justifyContent="space-between"
          >
            <LabelRequired label="Processing Time" />
            <CustomPopup content="Approval Letter will be sent to your email (step 3) estimated by the chosen Processing Time & Government Working Hours" />
          </Flexbox>
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
        <Flexbox justifyContent="space-between" alignItems="center">
          <Text fontSize="s">Vietnam current time:</Text>
          <CurrentTime />
        </Flexbox>
        <Flexbox justifyContent="space-between" alignItems="center">
          <Text fontSize="s">How long will it take?</Text>
          <Text fontSize="s" bold>
            {eta}
          </Text>
        </Flexbox>
        <Flexbox justifyContent="flex-end" alignItems="center">
          <Text color="green" onClick={this.openChat} clickable>
            Need Assistance? Chat with us
          </Text>
        </Flexbox>
        <Flexbox justifyContent="flex-end" alignItems="center">
          <Anchor href={pageNames.contact}>Working Hours</Anchor>
        </Flexbox>

        {/* TODO: collapse by default on mobile */}
        <Flexbox paddingBottom={6} column paddingTop={8}>
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
            <CustomPopup content="Our staff will greet you at the Visa Landing Counter and assist you to get visa stamp and sticker without queuing" />
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
            <CustomPopup content="You will be picked up to inner city by our friendly driver who stands outside the airport with your name on the welcome sign to save your waiting time" />
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
            <CustomPopup content="Because of Vietnam Immigration Office policy, all names for people getting visas on the same day will be on the same letter. We offer a private letter service so your name and the names of all members in your group will in a private letter" />
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

const LabelRequired = ({ label }) => (
  <strong>
    <label>
      {label} <span style={{ color: '#db2828' }}>*</span>
    </label>
  </strong>
);
const CustomPopup = ({ content }) => (
  <Popup
    trigger={
      <Image
        src="../static/icons/info-ico.svg"
        alt="info"
        width={18}
        fixedWidth
      />
    }
    content={content}
  />
);

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
