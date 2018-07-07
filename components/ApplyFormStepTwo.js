// @flow
// vendor
import React from 'react';
import { Form, Dropdown, Input } from 'semantic-ui-react';
import { DateInput } from 'semantic-ui-calendar-react';
import { connect } from 'react-redux';
import dayjs from 'dayjs';
import _get from 'lodash/get';
// custom
import { Button, Flexbox, Text } from './ui';
import { resetStepTwo, updateStepTwo } from '../redux/actions';
import { reducerNames } from '../constants/reducerNames';
import {
  airportOptions,
  countryOptionsSemantic,
  genderOptions,
} from '../constants/dropDownOptions';
import FormErrorMessage from './FormErrorMessage';
import FormHeading from './FormHeading';

const emptyApplicant = {
  name: '',
  countryId: 0,
  birthday: '',
  gender: '',
  passport: '',
  passportExpiry: '',
};

type Props = {
  onSubmit: () => void,
  countryId: number,
  stepTwo: Object,
  updateStepTwo: Object => void,
  resetStepTwo: () => void,
  goBack: () => void,
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
};
class ApplyFormStepTwo extends React.Component<Props, State> {
  state = {
    applicants: [emptyApplicant],
    airport: '',
    arrivalDate: '',
    departureDate: '',
    flightNumber: '',
    shouldShowErrorMessage: false,
  };

  onSubmit = () => {
    const { stepTwo } = this.props;
    const indexes = Object.keys(stepTwo);
    if (indexes.length > 0) {
      let isFillInValues = [];
      indexes.forEach(index => {
        isFillInValues.push(stepTwo[index].isFilledIn);
      });

      // show error
      if (isFillInValues.includes(false)) {
        this.setState({
          shouldShowErrorMessage: true,
        });
      } else {
        // continue to step 3
        const { onSubmit } = this.props;
        onSubmit && onSubmit();
      }
    }
  };

  // TODO: remove resetStepTwo
  goBack = () => {
    const { resetStepTwo, goBack } = this.props;
    // resetStepTwo();
    goBack();
  };

  addApplicant = () => {
    this.setState({
      applicants: this.state.applicants.concat(emptyApplicant),
    });
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

  updateFlightDate = (event: Object, selectedDate: Object) => {
    this.setState(
      {
        [selectedDate.name]: selectedDate ? selectedDate.value : '',
      },
      () => this.updateStepTwoToStore(),
    );
  };

  updateFlightNumber = (event: Object) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  // Applicant info
  updateTextInput = (event, index) => {
    let { applicants } = this.state;
    applicants[index][event.target.name] = event.target.value;
    this.updateApplicantsToStateAndStore(applicants);
  };

  updateDatePicker = (event: Object, selectedDate: Object, index) => {
    let { applicants } = this.state;
    applicants[index][selectedDate.name] = selectedDate
      ? selectedDate.value
      : '';
    this.updateApplicantsToStateAndStore(applicants);
  };

  updateCountry = (event: Object, selectedOption: Object, index: number) => {
    let { applicants } = this.state;
    applicants[index].countryId = selectedOption ? selectedOption.value : 0;
    this.updateApplicantsToStateAndStore(applicants);
  };

  updateGender = (event: Object, selectedOption: Object, index: number) => {
    let { applicants } = this.state;
    applicants[index].gender = selectedOption ? selectedOption.value : '';
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
      ...this.state,
      quantity: this.state.applicants.length,
    });
  };

  // Life cycle functions
  componentWillReceiveProps(nextProps) {
    if (this.props.stepTwo !== nextProps.stepTwo) {
      this.syncPropsToState(nextProps);
    }
  }

  componentDidMount() {
    this.syncPropsToState(this.props);
  }

  syncPropsToState = (nextProps: Props) => {
    const { countryId } = this.props;
    let applicants = _get(nextProps, 'stepTwo.applicants', []);
    if (countryId) {
      applicants.forEach(applicant => (applicant.countryId = countryId));
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
    } = this.state;

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
          <DateInput
            name="arrivalDate"
            placeholder="Select..."
            value={arrivalDate}
            onChange={this.updateFlightDate}
          />
        </Form.Field>
        <Form.Field>
          <label>Departure Date</label>
          <DateInput
            name="departureDate"
            placeholder="Select..."
            value={departureDate}
            onChange={this.updateFlightDate}
          />
        </Form.Field>
        <Form.Field>
          <label>Flight Number</label>
          <Input
            name="flightNumber"
            placeholder="Enter..."
            value={flightNumber}
            onChange={event => this.updateFlightNumber(event)}
          />
        </Form.Field>
        <Flexbox paddingBottom={4}>
          <Text fontStyle="italic" fontSize="s" noDoubleLineHeight>
            Note: If you have different flight information for different
            applicants, please submit another application
          </Text>
        </Flexbox>

        {applicants.map((applicant, index) => (
          <Flexbox column paddingBottom={6} key={index}>
            <FormHeading text={`Applicant ${index + 1}`} />
            <Form.Field required>
              <label>Full name</label>
              <Input
                name="name"
                placeholder="Enter..."
                value={applicant.name}
                onChange={event => this.updateTextInput(event, index)}
              />
            </Form.Field>
            <Form.Field required>
              <label>Nationality</label>
              <Dropdown
                value={applicant.countryId}
                placeholder="Select..."
                search
                selection
                options={countryOptionsSemantic}
                onChange={(event, option) =>
                  this.updateCountry(event, option, index)
                }
              />
            </Form.Field>
            <Flexbox>
              <Flexbox flex={1}>
                <Form.Field required>
                  <label>Date of Birth</label>
                  <DateInput
                    name="birthday"
                    placeholder="Select..."
                    value={applicant.birthday}
                    onChange={(event, option) =>
                      this.updateDatePicker(event, option, index)
                    }
                  />
                </Form.Field>
              </Flexbox>
              <Flexbox flex={1}>
                <Form.Field required>
                  <label>Gender</label>
                  <Dropdown
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
            </Flexbox>

            <Flexbox>
              <Form.Field required>
                <label>Passport No.</label>
                <Input
                  name="passport"
                  placeholder="Enter..."
                  value={applicant.passport}
                  onChange={event => this.updateTextInput(event, index)}
                />
              </Form.Field>
              <Flexbox flex={1}>
                <Form.Field required>
                  <label>Expiry Date</label>
                  <DateInput
                    name="passportExpiry"
                    placeholder="Select..."
                    value={applicant.passportExpiry}
                    onChange={(event, option) =>
                      this.updateDatePicker(event, option, index)
                    }
                  />
                </Form.Field>
              </Flexbox>
            </Flexbox>
          </Flexbox>
        ))}

        <Text color="green" clickable onClick={this.addApplicant}>
          Add Applicant
        </Text>

        <Flexbox paddingTop={6} column>
          {shouldShowErrorMessage && <FormErrorMessage />}

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
    stepTwo: _get(store, `${reducerNames.form}.stepTwo`, {}),
  };
};
const mapDispatchToProps = {
  updateStepTwo,
  resetStepTwo,
};
export default connect(mapStateToProps, mapDispatchToProps)(ApplyFormStepTwo);
