// @flow
// vendor
import * as React from 'react';
import { Div, Input } from 'glamorous';
import Select from 'react-select';
import get from 'lodash/get';
import { connect } from 'react-redux';
import withRedux from 'next-redux-wrapper';
// custom
import { Flexbox, Text } from '../components';
import countryOptions from '../static/countries.json';
import { borderRadius, colors, spacingValues } from '../constants/ui';
import { updateStepTwo } from '../actions';
import { initialStore } from '../store';

const genderOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
];

type Props = {
  index: number,
  initialCountry: string,
  updateStepTwo: Object => void,
};
type State = {
  name: string,
  country: string,
  birthday: string,
  gender: string,
  passport: string,
  passportExpiryDate: string,
  shouldShowStepTwoForm: boolean,
  isFilledIn: boolean,
};
class ApplyFormStepTwoForm extends React.Component<Props, State> {
  state = {
    name: '',
    country: get(this, 'props.initialCountry', ''),
    birthday: '',
    gender: '',
    passport: '',
    passportExpiryDate: '',
    shouldShowStepTwoForm: true,
    isFilledIn: false,
  };

  updateName = (event: Object) => {
    this.setState(
      {
        name: event.target.value,
      },
      () => this.updateStore(),
    );
  };

  updateCountry = (selectedOption: Object) => {
    this.setState(
      {
        country: selectedOption.value,
      },
      () => this.updateStore(),
    );
  };

  updateBirthday = (event: Object) => {
    this.setState(
      {
        birthday: event.target.value,
      },
      () => this.updateStore(),
    );
  };

  updatePassport = (event: Object) => {
    this.setState(
      {
        passport: event.target.value,
      },
      () => this.updateStore(),
    );
  };

  updateGender = (selectedOption: Object) => {
    this.setState(
      {
        gender: selectedOption.value,
      },
      () => this.updateStore(),
    );
  };

  updatePassportExpiryDate = (event: Object) => {
    this.setState(
      {
        passportExpiryDate: event.target.value,
      },
      () => this.updateStore(),
    );
  };

  updateStore = () => {
    const {
      name,
      country,
      birthday,
      gender,
      passport,
      passportExpiryDate,
    } = this.state;
    const { updateStepTwo, index } = this.props;

    const isFilledIn =
      !!name &&
      !!country &&
      !!birthday &&
      !!gender &&
      !!passport &&
      !!passportExpiryDate;

    this.setState(
      {
        isFilledIn,
      },
      () => updateStepTwo({ [index]: this.state }),
    );
  };

  toggleBlock = () => {
    this.setState({
      shouldShowStepTwoForm: !this.state.shouldShowStepTwoForm,
    });
  };

  componentDidMount() {
    const { updateStepTwo, index } = this.props;
    updateStepTwo({ [index]: this.state });
  }

  render() {
    const {
      name,
      country,
      birthday,
      gender,
      passport,
      passportExpiryDate,
      shouldShowStepTwoForm,
    } = this.state;
    const { index } = this.props;

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
        <Flexbox
          alignItems="flex-start"
          justifyContent="space-between"
          width="100%"
          clickable
          onClick={this.toggleBlock}
        >
          <Text size="l" bold>
            APPLICANT {index + 1} INFO
          </Text>
          <i
            className={`fa fa-fw fa-2x fa-angle-double-${
              shouldShowStepTwoForm ? 'up' : 'down'
            }`}
          />
        </Flexbox>
        {shouldShowStepTwoForm && (
          <Div display={shouldShowStepTwoForm ? 'block' : 'none'} width="100%">
            <Flexbox
              alignItems="flex-start"
              paddingBottom={3}
              column
              width="100%"
            >
              <Text bold>FULL NAME</Text>
              <Input
                autoFocus={index === 0}
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
            <Flexbox
              alignItems="flex-start"
              paddingBottom={3}
              column
              width="100%"
            >
              <Text bold>COUNTRY</Text>
              <Select
                value={country}
                placeholder="Select..."
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
            <Flexbox
              alignItems="flex-start"
              paddingBottom={3}
              column
              width="100%"
            >
              <Text bold>PASSPORT NUMBER</Text>
              <Input
                backgroundColor="white"
                padding={`${spacingValues.xs}px ${spacingValues.s}px`}
                borderRadius={borderRadius}
                border={`1px solid ${colors.lightGrey}`}
                width="100%"
                value={passport}
                onChange={this.updatePassport}
              />
            </Flexbox>
            <Flexbox
              alignItems="flex-start"
              paddingBottom={3}
              column
              width="100%"
            >
              <Text bold>GENDER</Text>
              <Select
                clearable={false}
                value={gender}
                placeholder="Select..."
                onChange={this.updateGender}
                options={genderOptions}
              />
            </Flexbox>
            <Flexbox
              alignItems="flex-start"
              paddingBottom={3}
              column
              width="100%"
            >
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
          </Div>
        )}
      </Flexbox>
    );
  }
}

const ApplyFormStepTwoWithRedux = connect(null, null)(ApplyFormStepTwoForm);

const mapStateToProps = store => {
  return {};
};
const mapDispatchToProps = {
  updateStepTwo,
};
export default withRedux(initialStore, mapStateToProps, mapDispatchToProps)(
  ApplyFormStepTwoWithRedux,
);
