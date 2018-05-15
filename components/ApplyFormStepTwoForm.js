// @flow
// vendor
import * as React from 'react';
import { Div, Input, Label } from 'glamorous';
import Select from 'react-select';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import withRedux from 'next-redux-wrapper';
// custom
import { Flexbox, Text } from '../components';
import { borderRadius, colors, spacingValues } from '../constants/ui';
import { updateStepTwo } from '../redux/actions';
import { configureStore } from '../redux/store';
import { genderOptions, countryOptions } from '../constants/dropDownOptions';
import { reducerNames } from '../constants/reducerNames';

type Props = {
  index: number,
  initialCountry: string,
  updateStepTwo: Object => void,
  account: Object,
};
type State = {
  name: string,
  country_id: string,
  birthday: string,
  gender: string,
  passport: string,
  passport_expiry: string,
  shouldShowStepTwoForm: boolean,
  isFilledIn: boolean,
  thisIsMe: boolean,
};
class ApplyFormStepTwoForm extends React.Component<Props, State> {
  state = {
    name: '',
    country_id: get(this, 'props.initialCountry', ''),
    birthday: '',
    gender: '',
    passport: '',
    passport_expiry: '',
    shouldShowStepTwoForm: true,
    isFilledIn: false,
    thisIsMe: false,
  };

  updateDefaultInput = (event: Object) => {
    this.setState(
      {
        [event.target.name]: event.target.value,
      },
      () => this.updateStore(),
    );
  };

  updateCountry = (selectedOption: Object) => {
    this.setState(
      {
        country_id: selectedOption ? selectedOption.value : '',
      },
      () => this.updateStore(),
    );
  };

  updateGender = (selectedOption: Object) => {
    this.setState(
      {
        gender: selectedOption ? selectedOption.value : '',
      },
      () => this.updateStore(),
    );
  };

  updateStore = () => {
    const {
      name,
      country_id,
      birthday,
      gender,
      passport,
      passport_expiry,
    } = this.state;
    const { updateStepTwo, index } = this.props;

    const isFilledIn =
      !!name &&
      !!country_id &&
      !!birthday &&
      !!gender &&
      !!passport &&
      !!passport_expiry;

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

  updateThisIsMe = () => {
    this.setState(
      {
        thisIsMe: !this.state.thisIsMe,
      },
      () => this.fillInMeData(),
    );
  };

  fillInMeData = () => {
    const { thisIsMe } = this.state;
    if (thisIsMe) {
      const { account } = this.props;
      this.setState({
        name: account.name || '',
        country_id: account.country_id || '',
        birthday: account.birthday || '',
        passport: account.passport || '',
        passport_expiry: account.passport_expiry || '',
        gender: account.gender || '',
      });
    } else {
      this.setState({
        name: '',
        country_id: '',
        birthday: '',
        passport: '',
        passport_expiry: '',
        gender: '',
      });
    }
  };

  render() {
    const {
      name,
      country_id,
      birthday,
      gender,
      passport,
      passport_expiry,
      shouldShowStepTwoForm,
      thisIsMe,
    } = this.state;
    const { index, account } = this.props;
    const isLoggedIn = !isEmpty(account);

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
        {index === 0 &&
          isLoggedIn && (
            <Label display="flex" alignItems="center" cursor="pointer">
              <Input
                type="checkbox"
                onChange={this.updateThisIsMe}
                value={thisIsMe}
                marginRight={spacingValues.s}
              />
              <Text bold size="l">
                This is me
              </Text>
            </Label>
          )}
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
                name="name"
                backgroundColor="white"
                padding={`${spacingValues.xs}px ${spacingValues.s}px`}
                borderRadius={borderRadius}
                border={`1px solid ${colors.lightGrey}`}
                width="100%"
                value={name}
                onChange={this.updateDefaultInput}
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
                value={country_id}
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
                name="birthday"
                type="date"
                value={birthday}
                backgroundColor="white"
                padding={`${spacingValues.xs}px ${spacingValues.s}px`}
                borderRadius={borderRadius}
                border={`1px solid ${colors.lightGrey}`}
                width="100%"
                onChange={this.updateDefaultInput}
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
                name="passport"
                backgroundColor="white"
                padding={`${spacingValues.xs}px ${spacingValues.s}px`}
                borderRadius={borderRadius}
                border={`1px solid ${colors.lightGrey}`}
                width="100%"
                value={passport}
                onChange={this.updateDefaultInput}
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
                name="passport_expiry"
                type="date"
                value={passport_expiry}
                backgroundColor="white"
                padding={`${spacingValues.xs}px ${spacingValues.s}px`}
                borderRadius={borderRadius}
                border={`1px solid ${colors.lightGrey}`}
                width="100%"
                onChange={this.updateDefaultInput}
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
          </Div>
        )}
      </Flexbox>
    );
  }
}

const mapStateToProps = store => {
  return {
    account: store[reducerNames.account],
  };
};
const mapDispatchToProps = {
  updateStepTwo,
};
export default withRedux(configureStore, mapStateToProps, mapDispatchToProps)(
  ApplyFormStepTwoForm,
);
