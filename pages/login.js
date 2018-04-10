// @flow
// vendor
import React from 'react';
import { Input } from 'glamorous';
import Router from 'next/router';
import withRedux from 'next-redux-wrapper';
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
import { login } from '../utils/apiClient';
import { configureStore } from '../redux/store';
import { updateAccount } from '../redux/actions';
import { reducerNames } from '../constants/reducerNames';

type Props = {
  account: Object,
  updateAccount: Object => void,
};
type State = {
  email: string,
  password: string,
  errorMessage: string,
};
class Login extends React.Component<Props, State> {
  state = {
    email: '',
    password: '',
    errorMessage: '',
  };

  componentDidMount() {
    if (this.props.account) {
      Router.push('/').then(() => window.scrollTo(0, 0));
    } else {
      window.Intercom('update');
    }
  }

  updateEmail = (event: Object) => {
    this.setState({
      email: event.target.value,
    });
  };

  updatePassword = (event: Object) => {
    this.setState({
      password: event.target.value,
    });
  };

  login = () => {
    this.setState({
      errorMessage: '',
    });

    const { email, password } = this.state;
    login(
      {
        email,
        password,
      },
      response => {
        if (response.error) {
          return this.setState({
            errorMessage: response.message,
          });
        } else {
          this.setState({
            errorMessage: '',
          });
          this.props.updateAccount(response);
          Router.push('/').then(() => window.scrollTo(0, 0));
        }
      },
    );
  };

  render() {
    const { email, password, errorMessage } = this.state;
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
              <BlockHeader header="Login" />

              <Flexbox
                alignItems="flex-start"
                paddingBottom={3}
                column
                width="100%"
              >
                <Text bold>Email</Text>
                <Input
                  type="email"
                  name="username"
                  backgroundColor="white"
                  padding={`${spacingValues.xs}px ${spacingValues.s}px`}
                  borderRadius={borderRadius}
                  border={`1px solid ${colors.lightGrey}`}
                  width="100%"
                  value={email}
                  onChange={this.updateEmail}
                  marginTop={2}
                />
              </Flexbox>

              <Flexbox
                alignItems="flex-start"
                paddingBottom={3}
                column
                width="100%"
              >
                <Text bold>Password</Text>
                <Input
                  type="password"
                  name="password"
                  backgroundColor="white"
                  padding={`${spacingValues.xs}px ${spacingValues.s}px`}
                  borderRadius={borderRadius}
                  border={`1px solid ${colors.lightGrey}`}
                  width="100%"
                  value={password}
                  onChange={this.updatePassword}
                  marginTop={2}
                />
              </Flexbox>

              <Flexbox
                justifyContent="flex-end"
                paddingBottom={10}
                width="100%"
              >
                <Anchor href="/register">Register</Anchor>
                &nbsp;&nbsp;|&nbsp;&nbsp;
                <Anchor href="/forgot">Forgot password</Anchor>
              </Flexbox>

              {errorMessage && (
                <Text color="visaRed" p>
                  {errorMessage}
                </Text>
              )}

              <Button solid onClick={this.login}>
                LOGIN
              </Button>
            </Flexbox>
          </Flexbox>
        </Content>
      </Layout>
    );
  }
}

const mapStateToProps = store => {
  return {
    account: store[reducerNames.account],
  };
};
const mapDispatchToProps = {
  updateAccount,
};
export default withRedux(configureStore, mapStateToProps, mapDispatchToProps)(
  Login,
);
