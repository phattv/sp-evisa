// @flow
// vendor
import React from 'react';
import { Form, Dropdown, Input } from 'semantic-ui-react';
import { connect } from 'react-redux';
import dayjs from 'dayjs';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _find from 'lodash/find';
// custom
import { Button, Flexbox, Text } from './ui';
import { updateStepTwo } from '../redux/actions';
import { reducerNames } from '../constants/reducerNames';
import { dateInputDateFormat } from '../constants/ui';
import {
  airportOptions,
  countryOptions,
  genderOptions,
  typeOptions,
} from '../constants/dropDownOptions';
import FormErrorMessage from './FormErrorMessage';
import FormHeading from './FormHeading';
import Divider from './Divider';
import { scrollToFirstErrorMessage } from '../utils/form';

const emptyApplicant = {
  name: '',
  countryId: 0,
  birthday: '',
  gender: '',
  passport: '',
  passportExpiry: '',
};
const defaultDateInputProps = {
  type: 'date',
  pattern: '[0-9]{4}-[0-9]{2}-[0-9]{2}',
  placeholder: dateInputDateFormat,
};
// TODO: toggle class "ui error" for scrollToFirstErrorMessage
const errorInputStyles = {
  backgroundColor: '#fff6f6',
  borderColor: '#e0b4b4',
  color: '#9f3a38',
};

type Props = {
  onSubmit: () => void,
  countryId: number,
  stepOne: Object,
  stepTwo: Object,
  updateStepTwo: Object => void,
  goBack: () => void,
  onRef: any => void,
};
type Applicant = {
  name: string,
  countryId: number,
  birthday: string,
  gender: string,
  passport: string,
  passportExpiry: string,
};
type State = {
  applicants: Array<Applicant>,
  airport: string,
  arrivalDate: string,
  departureDate: string,
  flightNumber: string,
  shouldShowErrorMessage: boolean,
  hasPassportsExpiringSoon: boolean,
};
class ApplyFormStepTwo extends React.Component<Props, State> {
  state = {
    applicants: [emptyApplicant],
    airport: '',
    arrivalDate: '',
    departureDate: '',
    flightNumber: '',
    shouldShowErrorMessage: false,
    hasPassportsExpiringSoon: false,
  };

  getFormInvalidity = () => {
    const sixMonthsFromToday = dayjs(new Date()).add(6, 'months');
    const { applicants, flightNumber } = this.state;
    const isFlightNumberRequired = this.getFlightNumberRequirement();
    let shouldShowErrorMessage = false;

    // Resets this.state.hasPassportsExpiringSoon
    this.setState({ hasPassportsExpiringSoon: false });

    if (
      (isFlightNumberRequired && _isEmpty(flightNumber)) ||
      _isEmpty(applicants)
    ) {
      shouldShowErrorMessage = true;
    } else {
      applicants.forEach(applicant => {
        const isPassportExpiredSoon = dayjs(applicant.passportExpiry).isBefore(
          sixMonthsFromToday,
        );
        applicant.isPassportExpiredSoon = isPassportExpiredSoon;
        if (isPassportExpiredSoon) {
          this.setState({ hasPassportsExpiringSoon: true });
        }

        if (
          _isEmpty(applicant.name) ||
          applicant.countryId <= 0 ||
          _isEmpty(applicant.birthday) ||
          _isEmpty(applicant.gender) ||
          _isEmpty(applicant.passport) ||
          _isEmpty(applicant.passportExpiry) ||
          isPassportExpiredSoon
        ) {
          shouldShowErrorMessage = true;
        }
      });
    }

    return shouldShowErrorMessage;
  };

  onSubmit = () => {
    const shouldShowErrorMessage = this.getFormInvalidity();
    this.setState({
      shouldShowErrorMessage,
    });

    if (!shouldShowErrorMessage) {
      // continue to step 3
      const { onSubmit } = this.props;
      onSubmit && onSubmit();
    } else {
      scrollToFirstErrorMessage();
    }
  };

  goBack = () => {
    const { goBack } = this.props;
    goBack();
  };

  addApplicant = () => {
    this.setState(
      {
        applicants: this.state.applicants.concat(emptyApplicant),
      },
      () => this.updateStepTwoToStore(),
    );
  };

  removeApplicant = (index: number) => {
    this.setState(
      {
        applicants: this.state.applicants.splice(index, 1),
      },
      () => this.updateStepTwoToStore(),
    );
  };

  // Flight info
  updateAirport = (event: Object, selectedOption: Object) => {
    this.setState(
      {
        airport: selectedOption ? selectedOption.value : '',
      },
      () => this.updateStepTwoToStore(),
    );
  };

  updateFlightDate = (event: Object) => {
    this.setState(
      {
        [event.target.name]: event.target.value || '',
      },
      () => this.updateStepTwoToStore(),
    );
  };

  updateFlightNumber = (event: Object) => {
    this.setState(
      {
        [event.target.name]: event.target.value,
      },
      () => this.updateStepTwoToStore(),
    );
  };

  // Applicant info
  updateTextInput = (event, index) => {
    let { applicants } = this.state;
    applicants[index][event.target.name] = event.target.value;
    this.updateApplicantsToStateAndStore(applicants);
  };

  updateApplicantDate = (event: Object, index: number) => {
    let { applicants } = this.state;
    applicants[index][event.target.name] = event.target.value || '';
    this.updateApplicantsToStateAndStore(applicants);
  };

  updateCountry = (event: Object, selectedOption: Object, index: number) => {
    let { applicants } = this.state;
    applicants[index]['countryId'] = selectedOption ? selectedOption.value : 0;
    this.updateApplicantsToStateAndStore(applicants);
  };

  updateGender = (event: Object, selectedOption: Object, index: number) => {
    let { applicants } = this.state;
    applicants[index]['gender'] = selectedOption ? selectedOption.value : '';
    this.updateApplicantsToStateAndStore(applicants);
  };

  updateApplicantsToStateAndStore = applicants => {
    this.setState(
      {
        applicants,
      },
      () => this.updateStepTwoToStore(),
    );
  };

  updateStepTwoToStore = () => {
    this.props.updateStepTwo({
      applicants: this.state.applicants,
      airport: this.state.airport,
      arrivalDate: this.state.arrivalDate,
      departureDate: this.state.departureDate,
      flightNumber: this.state.flightNumber,
      quantity: this.state.applicants.length,
    });
  };

  getFlightNumberRequirement = () => {
    return _get(this, 'props.stepOne.extraServices.fastTrack', '') !== '';
  };

  // Life cycle functions
  componentWillReceiveProps(nextProps) {
    if (this.props.stepTwo !== nextProps.stepTwo) {
      this.syncPropsToState(nextProps);
    }
  }

  componentDidMount() {
    this.props.onRef(this);
    this.syncPropsToState(this.props);
  }

  syncPropsToState = (nextProps: Props) => {
    const { countryId } = this.props;
    let applicants = _get(nextProps, 'stepTwo.applicants', []);
    if (countryId) {
      applicants.forEach(applicant => {
        if (applicant.countryId <= 0) {
          applicant.countryId = countryId;
        }
      });
    }

    this.setState({
      applicants,
      airport: _get(nextProps, 'stepTwo.airport', ''),
      arrivalDate: _get(nextProps, 'stepTwo.arrivalDate', ''),
      departureDate: _get(nextProps, 'stepTwo.departureDate', ''),
      flightNumber: _get(nextProps, 'stepTwo.flightNumber', ''),
    });
  };

  render() {
    const {
      applicants,
      airport,
      arrivalDate,
      departureDate,
      flightNumber,
      shouldShowErrorMessage,
      hasPassportsExpiringSoon,
    } = this.state;

    const today = dayjs(new Date()).format(dateInputDateFormat);
    const isFlightNumberRequired = this.getFlightNumberRequirement();

    // Calculate max departure date
    let maxDepartureDate;
    const visaTypeOption = _find(typeOptions, {
      value: _get(this, 'props.stepOne.type', ''),
    });
    if (visaTypeOption) {
      maxDepartureDate = dayjs(today)
        .add(visaTypeOption.lengthinmonth, 'months')
        .format(dateInputDateFormat);
    }

    return (
      <Form onSubmit={this.onSubmit} style={{ width: '100%' }}>
        <FormHeading text="Flight Info" />
        <Form.Field>
          <label>Airport</label>
          <Dropdown
            value={airport}
            placeholder="Select..."
            search
            selection
            options={airportOptions}
            onChange={this.updateAirport}
          />
        </Form.Field>
        <Form.Field>
          <label>Arrival Date</label>
          <input
            {...defaultDateInputProps}
            name="arrivalDate"
            value={arrivalDate}
            min={today}
            onChange={this.updateFlightDate}
          />
        </Form.Field>
        <Form.Field>
          <label>Departure Date</label>
          <input
            {...defaultDateInputProps}
            name="departureDate"
            value={departureDate}
            min={arrivalDate}
            max={maxDepartureDate}
            onChange={this.updateFlightDate}
          />
        </Form.Field>
        <Form.Field required={isFlightNumberRequired}>
          <label>Flight Number</label>
          <Input
            error={
              shouldShowErrorMessage && isFlightNumberRequired && !flightNumber
            }
            name="flightNumber"
            placeholder="Enter..."
            value={flightNumber}
            onChange={event => this.updateFlightNumber(event)}
          />
        </Form.Field>
        <Flexbox paddingBottom={4}>
          <Text fontStyle="italic" fontSize="s" noDoubleLineHeight>
            Note: If you have different flight information for different
            applicants, please submit another application.
          </Text>
        </Flexbox>

        {applicants.map((applicant, index) => {
          return (
            <Flexbox column paddingBottom={6} key={index}>
              <Flexbox
                paddingTop={6}
                justifyContent="space-between"
                alignItems="center"
              >
                <Text fontSize="m">Applicant {index + 1}</Text>
                {index > 0 && (
                  <Text
                    color="red"
                    clickable
                    onClick={() => this.removeApplicant(index)}
                  >
                    Remove
                  </Text>
                )}
              </Flexbox>
              <Divider />
              <Flexbox paddingTop={6} />

              <Form.Field required>
                <label>Full name</label>
                <Input
                  error={shouldShowErrorMessage && !applicant.name}
                  name="name"
                  placeholder="Enter..."
                  value={applicant.name}
                  onChange={event => this.updateTextInput(event, index)}
                />
              </Form.Field>

              <Form.Field required>
                <label>Nationality</label>
                <Dropdown
                  error={shouldShowErrorMessage && applicant.countryId <= 0}
                  value={applicant.countryId}
                  placeholder="Select..."
                  search
                  selection
                  options={countryOptions}
                  onChange={(event, option) =>
                    this.updateCountry(event, option, index)
                  }
                />
              </Form.Field>

              <Flexbox style={{ marginBottom: '1em' }}>
                <Flexbox flex={1} marginRight={2}>
                  <Form.Field required style={{ width: '100%' }}>
                    <label>Gender</label>
                    <Dropdown
                      error={shouldShowErrorMessage && !applicant.gender}
                      value={applicant.gender}
                      placeholder="Select..."
                      search
                      selection
                      options={genderOptions}
                      onChange={(event, option) =>
                        this.updateGender(event, option, index)
                      }
                    />
                  </Form.Field>
                </Flexbox>
                <Flexbox flex={1} marginLeft={2}>
                  <Form.Field required>
                    <label>Date of Birth</label>
                    <input
                      {...defaultDateInputProps}
                      name="birthday"
                      value={applicant.birthday}
                      max={today}
                      style={
                        shouldShowErrorMessage && !applicant.birthday
                          ? errorInputStyles
                          : {}
                      }
                      onChange={event => this.updateApplicantDate(event, index)}
                    />
                  </Form.Field>
                </Flexbox>
              </Flexbox>

              <Flexbox>
                <Flexbox flex={1} marginRight={2}>
                  <Form.Field required>
                    <label>Passport No.</label>
                    <Input
                      error={shouldShowErrorMessage && !applicant.passport}
                      name="passport"
                      placeholder="Enter..."
                      value={applicant.passport}
                      onChange={event => this.updateTextInput(event, index)}
                    />
                  </Form.Field>
                </Flexbox>
                <Flexbox flex={1} marginLeft={2}>
                  <Form.Field required>
                    <label>Expiry Date</label>
                    <input
                      {...defaultDateInputProps}
                      name="passportExpiry"
                      value={applicant.passportExpiry}
                      min={today}
                      style={
                        shouldShowErrorMessage &&
                        (!applicant.passportExpiry ||
                          applicant.isPassportExpiredSoon)
                          ? errorInputStyles
                          : {}
                      }
                      onChange={event => this.updateApplicantDate(event, index)}
                    />
                  </Form.Field>
                </Flexbox>
              </Flexbox>
            </Flexbox>
          );
        })}

        <Text color="green" clickable onClick={this.addApplicant}>
          + Add Applicant
        </Text>

        <Flexbox paddingTop={6} column>
          {shouldShowErrorMessage && (
            <FormErrorMessage
              message={
                hasPassportsExpiringSoon
                  ? 'Passports should have at least six months of validity!'
                  : 'Please fill in the required inputs!'
              }
            />
          )}

          <Flexbox justifyContent="space-between" width="100%">
            <Button onClick={this.goBack} backgroundColor="mediumBlue">
              Back
            </Button>
            <Button type="submit">Next</Button>
          </Flexbox>
        </Flexbox>
      </Form>
    );
  }
}

const mapStateToProps = store => {
  return {
    countryId: _get(store, `${reducerNames.form}.stepOne.countryId`, 0),
    stepOne: _get(store, 'form.stepOne', {}),
    stepTwo: _get(store, `${reducerNames.form}.stepTwo`, {}),
  };
};
const mapDispatchToProps = {
  updateStepTwo,
};
export default connect(mapStateToProps, mapDispatchToProps)(ApplyFormStepTwo);
