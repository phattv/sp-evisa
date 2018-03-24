// @flow
// vendor
import * as React from 'react';
import { Div, Input } from 'glamorous';
import { connect } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import { Form } from 'react-final-form';
import Select from 'react-select';
import get from 'lodash/get';
// custom
import { Button, Flexbox, Text } from '../components';
import { finishStepTwo } from '../actions';
import { initialStore } from '../store';
import { borderRadius, colors, spacingValues } from '../constants/ui';
import countryOptions from '../static/countries.json';

const genderOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
];

type Props = {
  onSubmit: () => void,
  stepOne: Object,
  stepTwo: Object,
  finishStepTwo: Object => void,
};
type State = {
  name: string,
  country: string,
  birthday: string,
  gender: string,
  passport: string,
  passportExpiryDate: string,
};
class ApplyFormStepTwo extends React.Component<Props, State> {
  state = {
    name: '',
    country: get(this, 'props.stepOne.country', ''),
    birthday: '',
    gender: '',
    passport: '',
    passportExpiryDate: '',
  };

  onSubmit = () => {
    const { onSubmit } = this.props;
    onSubmit && onSubmit();
  };

  updateName = (event: Object) => {
    this.setState({
      name: event.target.value,
    });
  };

  updateCountry = (selectedOption: Object) => {
    this.setState({
      country: selectedOption.value,
    });
  };

  updateBirthday = (event: Object) => {
    this.setState({
      birthday: event.target.value,
    });
  };

  updatePassport = (event: Object) => {
    this.setState({
      passport: event.target.value,
    });
  };

  updateGender = (selectedOption: Object) => {
    this.setState({
      gender: selectedOption.value,
    });
  };

  updatePassportExpiryDate = (event: Object) => {
    this.setState({
      passportExpiryDate: event.target.value,
    });
  };

  renderForm = (index: number) => {
    const {
      name,
      country,
      birthday,
      gender,
      passport,
      passportExpiryDate,
    } = this.state;

    return (
      <Flexbox
        marginBottom={5}
        flex={1}
        width="100%"
        column
        alignItems="flex-start"
        key={index}
        borderTop
        borderColor="darkGrey"
      >
        <Text size="l" bold>
          APPLICANT {index + 1} INFO
        </Text>
        <Flexbox alignItems="flex-start" paddingBottom={3} column width="100%">
          <Text bold>FULL NAME</Text>
          <Input
            backgroundColor="white"
            padding={`${spacingValues.xs}px ${spacingValues.s}px`}
            borderRadius={borderRadius}
            border={`1px solid ${colors.lightGrey}`}
            width="100%"
            value={name}
            onChange={this.updateName}
            marginTop={2}
          />
        </Flexbox>
        <Flexbox alignItems="flex-start" paddingBottom={3} column width="100%">
          <Text bold>COUNTRY</Text>
          <Select
            value={country}
            placeholder="Select..."
            onChange={this.updateCountry}
            options={countryOptions}
          />
        </Flexbox>
        <Flexbox alignItems="flex-start" paddingBottom={3} column width="100%">
          <Text bold>DATE OF BIRTH</Text>
          <Input
            type="date"
            value={birthday}
            backgroundColor="white"
            padding={`${spacingValues.xs}px ${spacingValues.s}px`}
            borderRadius={borderRadius}
            border={`1px solid ${colors.lightGrey}`}
            width="100%"
            onChange={this.updateBirthday}
          />
        </Flexbox>
        <Flexbox alignItems="flex-start" paddingBottom={3} column width="100%">
          <Text bold>PASSPORT NUMBER</Text>
          <Input
            type="date"
            value={passport}
            backgroundColor="white"
            padding={`${spacingValues.xs}px ${spacingValues.s}px`}
            borderRadius={borderRadius}
            border={`1px solid ${colors.lightGrey}`}
            width="100%"
            onChange={this.updatePassport}
          />
        </Flexbox>
        <Flexbox alignItems="flex-start" paddingBottom={3} column width="100%">
          <Text bold>GENDER</Text>
          <Select
            value={gender}
            placeholder="Select..."
            onChange={this.updateGender}
            options={genderOptions}
          />
        </Flexbox>
        <Flexbox alignItems="flex-start" paddingBottom={3} column width="100%">
          <Text bold>PASSPORT EXPIRY DATE</Text>
          <Input
            type="date"
            value={passportExpiryDate}
            backgroundColor="white"
            padding={`${spacingValues.xs}px ${spacingValues.s}px`}
            borderRadius={borderRadius}
            border={`1px solid ${colors.lightGrey}`}
            width="100%"
            onChange={this.updatePassportExpiryDate}
          />
        </Flexbox>
      </Flexbox>
    );
  };

  render() {
    const { stepOne: { quantity } } = this.props;

    const applicants = [];
    for (let index = 0; index < quantity; index++) {
      applicants.push(index);
    }

    return (
      <Div>
        <Flexbox paddingBottom={5}>
          <Text>
            Please fill out all required information below to process Vietnam
            visa approval letter right now OR just select applicant's
            nationality, then &nbsp;<Text
              color="visaRed"
              onClick={this.onSubmit}
            >
              SKIP THIS STEP
            </Text>. An application form will be sent to your registered email
            for later fulfilling.
          </Text>
        </Flexbox>
        <Form
          onSubmit={this.onSubmit}
          render={({ handleSubmit, pristine, invalid }) => (
            <Flexbox alignItems="flex-start" flex={1} responsiveLayout>
              <Flexbox
                flex={1}
                column
                width="100%"
                marginLeft={spacingValues.xxs}
                marginRight={spacingValues.xxs}
              >
                {applicants.map(index => this.renderForm(index))}
              </Flexbox>
              <Flexbox
                flex={1}
                column
                width="100%"
                marginLeft={spacingValues.xxs}
                marginRight={spacingValues.xxs}
              >
                <Button
                  solid
                  marginTop={5}
                  marginBottom={5}
                  onClick={this.onSubmit}
                >
                  NEXT&nbsp;&nbsp;
                  <i className="fa fa-arrow-right" />
                </Button>
              </Flexbox>
            </Flexbox>
          )}
        />
      </Div>
    );
  }
}

const ApplyFormStepTwoWithRedux = connect(null, null)(ApplyFormStepTwo);

const mapStateToProps = store => {
  return {
    stepOne: store.stepOne,
    stepTwo: store.stepTwo,
  };
};
const mapDispatchToProps = {
  finishStepTwo: finishStepTwo,
};
export default withRedux(initialStore, mapStateToProps, mapDispatchToProps)(
  ApplyFormStepTwoWithRedux,
);
