// @flow
// vendor
import * as React from 'react';
import { connect } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import { Form } from 'react-final-form';
import { Div, Input, Label } from 'glamorous';
// custom
import { initialStore } from '../store';
import { finishStepThree } from '../actions';
import { Flexbox, Text, Button } from '../components';
import { borderRadius, colors, spacingValues } from '../constants/ui';

type Props = {
  stepOne: Object,
  stepTwo: Object,
  stepThree: Object,
  finishStepThree: Object => void,
};
type State = {
  name: string,
  phone: string,
  email: string,
  hasFlightInfo: boolean,
  flightNumber: string,
  shouldShowSuccessMessage: boolean,
};

class ApplyFormStepThree extends React.Component<Props, State> {
  static defaultProps: Props = {};

  state = {
    name: '',
    phone: '',
    email: '',
    hasFlightInfo: false,
    flightNumber: '',
    shouldShowSuccessMessage: false,
  };

  updateName = (event: Object) => {
    this.setState(
      {
        name: event.target.value,
      },
      () => this.updateStore(),
    );
  };

  updateEmail = (event: Object) => {
    this.setState(
      {
        email: event.target.value,
      },
      () => this.updateStore(),
    );
  };

  updatePhone = (event: Object) => {
    this.setState(
      {
        phone: event.target.value,
      },
      () => this.updateStore(),
    );
  };

  toggleHasFlightInfo = () => {
    this.setState({
      hasFlightInfo: !this.state.hasFlightInfo,
    });
  };

  updateFlightNumber = (event: Object) => {
    this.setState(
      {
        flightNumber: event.target.value,
      },
      () => this.updateStore(),
    );
  };

  updateStore = () => {
    this.props.finishStepThree(this.state);
  };

  onSubmit = () => {
    this.setState({
      shouldShowSuccessMessage: true,
    });
  };

  render() {
    const {
      name,
      phone,
      email,
      hasFlightInfo,
      flightNumber,
      shouldShowSuccessMessage,
    } = this.state;

    return (
      <Div>
        <Flexbox
          marginLeft={spacingValues.xxs}
          marginRight={spacingValues.xxs}
          paddingBottom={5}
        >
          <Text>
            Please review your application details below before starting visa
            processing with Vietnam Immigration Department.
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
                <Flexbox
                  alignItems="flex-start"
                  justifyContent="space-between"
                  width="100%"
                >
                  <Text size="l" bold>
                    CONTACT INFORMATION
                  </Text>
                </Flexbox>
                <Flexbox
                  alignItems="flex-start"
                  paddingBottom={3}
                  column
                  width="100%"
                >
                  <Text bold>FULL NAME</Text>
                  <Input
                    autoFocus
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
                  <Text bold>EMAIL</Text>
                  <Input
                    type="email"
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
                  <Text bold>PHONE NUMBER</Text>
                  <Input
                    backgroundColor="white"
                    padding={`${spacingValues.xs}px ${spacingValues.s}px`}
                    borderRadius={borderRadius}
                    border={`1px solid ${colors.lightGrey}`}
                    width="100%"
                    value={phone}
                    onChange={this.updatePhone}
                    marginTop={2}
                  />
                </Flexbox>

                {/* Flight info */}
                <Flexbox
                  alignItems="flex-start"
                  justifyContent="space-between"
                  width="100%"
                  marginTop={5}
                >
                  <Text size="l" bold>
                    FLIGHT INFORMATION
                  </Text>
                </Flexbox>
                <Flexbox>
                  <Text>
                    It is recommended that you provide us with your flight
                    details for better support. (In case you apply for express
                    visa service or extra service at Vietnam airport, this
                    information is required)
                  </Text>
                </Flexbox>
                <Flexbox
                  alignItems="flex-start"
                  justifyContent="space-between"
                  width="100%"
                >
                  <Label display="flex" alignItems="center" cursor="pointer">
                    <Input
                      type="checkbox"
                      onChange={this.toggleHasFlightInfo}
                      value={hasFlightInfo}
                      marginRight={spacingValues.s}
                    />
                    <Text>I have booked</Text>
                  </Label>
                </Flexbox>

                <Div
                  display={hasFlightInfo ? 'flex' : 'none'}
                  flexDirection="column"
                  width="100%"
                >
                  <Text bold>FLIGHT NUMBER</Text>
                  <Input
                    backgroundColor="white"
                    padding={`${spacingValues.xs}px ${spacingValues.s}px`}
                    borderRadius={borderRadius}
                    border={`1px solid ${colors.lightGrey}`}
                    width="100%"
                    value={flightNumber}
                    onChange={this.updateFlightNumber}
                    marginTop={2}
                  />
                </Div>
              </Flexbox>

              {/* Review form */}
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
                  PROCESS MY VISA NOW
                </Button>
                {shouldShowSuccessMessage && (
                  <Text color="visaBlue">
                    Thank you for choosing us, we will contact you shortly!
                  </Text>
                )}
              </Flexbox>
            </Flexbox>
          )}
        />
      </Div>
    );
  }
}

const ApplyFormStepThreeWithRedux = connect(null, null)(ApplyFormStepThree);

const mapStateToProps = store => {
  return {
    stepOne: store.stepOne,
    stepTwo: store.stepTwo,
    stepThree: store.stepThree,
  };
};
const mapDispatchToProps = {
  finishStepThree: finishStepThree,
};
export default withRedux(initialStore, mapStateToProps, mapDispatchToProps)(
  ApplyFormStepThreeWithRedux,
);
