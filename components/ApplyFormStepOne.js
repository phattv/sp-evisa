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
    this.setState(
      {
        processingTime: selectedOption ? selectedOption.value : '',
      },
      () => {
        this.updateStepOneToStore();
        // Calculate ETA
        if (selectedOption) {
          this.updateEta(selectedOption.value);
        }
      },
    );
  };

  updateEta = processingTime => {
    let eta;
    const browserTime = Date.now();
    const browserOffset = new Date().getTimezoneOffset() * 60000;
    const vietnamOffset = -420 * 60000;
    const currentVietnamTime = browserTime + browserOffset - vietnamOffset; // utc = browserTime + browserOffset

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
    const dayInWeek = dayjs(currentVietnamTime).day();

    // Vietnam current time
    const nextWedAtTwelve = dayjs(currentVietnamTime)
      .add(1, 'week')
      .startOf('week')
      .add(3, 'day')
      .set('hour', 12)
      .set('minute', 0);

    switch (processingTime) {
      case processingTimeOptions[0].value: {
        const isBeforeSevenFourty =
          dayjs(currentVietnamTime).hour() <= 7 &&
          dayjs(currentVietnamTime).minute() <= 40;
        /**
         * Normal (1-2 working days):
         * - Application submit timeline: before or afer 07:40
         * - Approval return timeline: 12:00 or 22:00
         * CASE sat, sun                    ->  next wed - 12:00
         * CASE mon/tue/wed - before 07:40  ->  wed/thu/fri - 12:00 (respectively)
         * CASE mon/tue/wed - after 07:40   ->  wed/thu/fri - 22:00 (respectively)
         * CASE thu - before 07:40          ->  next mon - 12:00
         * CASE thu - after 04:40           ->  next mon - 22:00
         * CASE fri - before 07:40          ->  next tue - 12:00
         * CASE fri - after 04:40           ->  next tue 22:00
         */
        if ([1, 2, 3].includes(dayInWeek)) {
          // mon/tue/wed
          eta = isBeforeSevenFourty
            ? dayjs(currentVietnamTime)
                .add(2, 'day')
                .set('hour', 12)
                .set('minute', 0)
            : dayjs(currentVietnamTime)
                .add(2, 'day')
                .set('hour', 22)
                .set('minute', 0);
        } else if ([4, 5].includes(dayInWeek)) {
          // thu/fri
          eta = isBeforeSevenFourty
            ? dayjs(currentVietnamTime)
                .add(1, 'week')
                .startOf('week')
                .add(dayInWeek - 3, 'day')
                .set('hour', 12)
                .set('minute', 0)
            : dayjs(currentVietnamTime)
                .add(1, 'week')
                .startOf('week')
                .add(dayInWeek - 3, 'day')
                .set('hour', 22)
                .set('minute', 0);
        } else {
          // sat/sun
          eta = nextWedAtTwelve;
        }

        break;
      }
      // TODO 2 more cases
      default: {
        eta = nextWedAtTwelve;
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
            options={airportFastTrackOptions}
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
