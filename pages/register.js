// @flow
// vendor
import React from 'react';
import { Input } from 'glamorous';
import Router from 'next/router';
import Select from 'react-select';
import withRedux from 'next-redux-wrapper'
// custom
import {
  Anchor,
  BlockHeader,
  Button,
  Content,
  Flexbox,
  Layout,
  Text,
} from '../components';
import { borderRadius, colors, spacingValues } from '../constants/ui';
import { register } from '../utils/apiClient';
import countryOptions from '../static/countries.json';
import { configureStore } from '../redux/store'

const genderOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
];

type Props = {};
type State = {
  email: string,
  password: string,
  name: string,
  gender: string,
  phone: string,
  country_id: string | number,
  passport: string,
  passport_expiry: string,
  birthday: string,
  errorMessage: string,
};
class Register extends React.Component<Props, State> {
  state = {
    email: '',
    password: '',
    name: '',
    gender: '',
    phone: '',
    country_id: '',
    passport: '',
    passport_expiry: '',
    birthday: '',
    errorMessage: '',
  };

  componentDidMount() {
    window.Intercom('update');
  }

  updateTextField = (event: Object) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  updateGender = (selectedOption: Object) => {
    this.setState({
      gender: selectedOption.value,
    });
  };

  updateCountry = (selectedOption: Object) => {
    this.setState({
      country_id: selectedOption.value,
    });
  };

  register = () => {
    const { email, password, name, phone } = this.state;
    if (!email || !password || !name || !phone) {
      return this.setState({
        errorMessage: 'Please fill in the required fields',
      });
    }

    const params = {
      email: this.state.email,
      password: this.state.password,
      name: this.state.name,
      gender: this.state.gender,
      phone: this.state.phone,
      country_id: this.state.country_id,
      passport: this.state.passport,
      passport_expiry: this.state.passport_expiry,
      birthday: this.state.birthday,
    };
    register(params, response => {
      if (response.error) {
        return this.setState({
          errorMessage: response.message,
        });
      } else {
        this.setState({
          errorMessage: '',
        });
        Router.push('/').then(() => window.scrollTo(0, 0));
      }
    });
  };

  render() {
    const {
      email,
      password,
      name,
      gender,
      phone,
      country_id,
      passport,
      passport_expiry,
      birthday,
      errorMessage,
    } = this.state;
    return (
      <Layout>
        <Content>
          <Flexbox width="100%">
            <Flexbox
              flex={1}
              width="100%"
              maxWidth={100}
              column
              border
              borderRadius
              paddingVertical={5}
              paddingHorizontal={5}
            >
              <BlockHeader header="Register" />

              <Flexbox
                alignItems="flex-start"
                paddingBottom={3}
                column
                width="100%"
              >
                <Text bold>
                  Email&nbsp;<Text color="visaRed">*</Text>
                </Text>
                <Input
                  type="email"
                  name="email"
                  backgroundColor="white"
                  padding={`${spacingValues.xs}px ${spacingValues.s}px`}
                  borderRadius={borderRadius}
                  border={`1px solid ${colors.lightGrey}`}
                  width="100%"
                  value={email}
                  onChange={this.updateTextField}
                  marginTop={2}
                />
              </Flexbox>

              <Flexbox
                alignItems="flex-start"
                paddingBottom={3}
                column
                width="100%"
              >
                <Text bold>
                  Password&nbsp;<Text color="visaRed">*</Text>
                </Text>
                <Input
                  type="password"
                  name="password"
                  backgroundColor="white"
                  padding={`${spacingValues.xs}px ${spacingValues.s}px`}
                  borderRadius={borderRadius}
                  border={`1px solid ${colors.lightGrey}`}
                  width="100%"
                  value={password}
                  onChange={this.updateTextField}
                  marginTop={2}
                />
              </Flexbox>

              <Flexbox
                alignItems="flex-start"
                paddingBottom={3}
                column
                width="100%"
              >
                <Text bold>
                  Name&nbsp;<Text color="visaRed">*</Text>
                </Text>
                <Input
                  name="name"
                  backgroundColor="white"
                  padding={`${spacingValues.xs}px ${spacingValues.s}px`}
                  borderRadius={borderRadius}
                  border={`1px solid ${colors.lightGrey}`}
                  width="100%"
                  value={name}
                  onChange={this.updateTextField}
                  marginTop={2}
                />
              </Flexbox>

              <Flexbox
                alignItems="flex-start"
                paddingBottom={3}
                column
                width="100%"
              >
                <Text bold>
                  Phone&nbsp;<Text color="visaRed">*</Text>
                </Text>
                <Input
                  name="phone"
                  backgroundColor="white"
                  padding={`${spacingValues.xs}px ${spacingValues.s}px`}
                  borderRadius={borderRadius}
                  border={`1px solid ${colors.lightGrey}`}
                  width="100%"
                  value={phone}
                  onChange={this.updateTextField}
                  marginTop={2}
                />
              </Flexbox>

              <Flexbox
                alignItems="flex-start"
                paddingBottom={3}
                column
                width="100%"
              >
                <Text bold>Passport Number</Text>
                <Input
                  name="passport"
                  backgroundColor="white"
                  padding={`${spacingValues.xs}px ${spacingValues.s}px`}
                  borderRadius={borderRadius}
                  border={`1px solid ${colors.lightGrey}`}
                  width="100%"
                  value={passport}
                  onChange={this.updateTextField}
                  marginTop={2}
                />
              </Flexbox>

              <Flexbox
                alignItems="flex-start"
                paddingBottom={3}
                column
                width="100%"
              >
                <Text bold>Passport Expiry</Text>
                <Input
                  type="date"
                  name="passport_expiry"
                  backgroundColor="white"
                  padding={`${spacingValues.xs}px ${spacingValues.s}px`}
                  borderRadius={borderRadius}
                  border={`1px solid ${colors.lightGrey}`}
                  width="100%"
                  value={passport_expiry}
                  onChange={this.updateTextField}
                  marginTop={2}
                />
              </Flexbox>

              <Flexbox
                alignItems="flex-start"
                paddingBottom={3}
                column
                width="100%"
              >
                <Text bold>Country</Text>
                <Select
                  clearable={false}
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
                <Text bold>Gender</Text>
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
                <Text bold>Birthday</Text>
                <Input
                  type="date"
                  name="birthday"
                  backgroundColor="white"
                  padding={`${spacingValues.xs}px ${spacingValues.s}px`}
                  borderRadius={borderRadius}
                  border={`1px solid ${colors.lightGrey}`}
                  width="100%"
                  value={birthday}
                  onChange={this.updateTextField}
                  marginTop={2}
                />
              </Flexbox>

              <Flexbox
                justifyContent="flex-end"
                paddingBottom={10}
                width="100%"
              >
                <Anchor href="/login">Login</Anchor>
                &nbsp;&nbsp;|&nbsp;&nbsp;
                <Anchor href="/forgot">Forgot password</Anchor>
              </Flexbox>

              {errorMessage && (
                <Text color="visaRed" p>
                  {errorMessage}
                </Text>
              )}

              <Button solid onClick={this.register}>
                Register
              </Button>
            </Flexbox>
          </Flexbox>
        </Content>
      </Layout>
    );
  }
}

export default withRedux(configureStore, null, null)(Register)
