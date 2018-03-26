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
import { Button, Flexbox, Text } from '../components';
import { borderRadius, colors, spacingValues } from '../constants/ui';
import ApplyFormReviewForm from './ApplyFormReviewForm';

type Props = {
  stepTwo: Object,
  stepThree: Object,
  finishStepThree: Object => void,
  onSubmit: () => void,
  goBack: Object => void,
};
type State = {
  name: string,
  phone: string,
  email: string,
  hasFlightInfo: boolean,
  flightNumber: string,
  shouldShowErrorMessage: boolean,
  shouldShowSuccessMessage: boolean,
  paymentMethod: string,
  isTermsAgreed: boolean,
};

class ApplyFormStepThree extends React.Component<Props, State> {
  static defaultProps: Props = {};

  state = {
    name: '',
    phone: '',
    email: '',
    hasFlightInfo: false,
    flightNumber: '',
    shouldShowErrorMessage: false,
    shouldShowSuccessMessage: false,
    paymentMethod: '',
    isTermsAgreed: false,
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

  updatePaymentMethod = (paymentMethod: string) => {
    this.setState({
      paymentMethod,
    });
  };

  updateIsTermsAgreed = (isTermsAgreed: boolean) => {
    this.setState({
      isTermsAgreed,
    });
  };

  onSubmit = () => {
    const { name, phone, email, paymentMethod, isTermsAgreed } = this.state;
    const shouldShowSuccessMessage =
      !!name && !!phone && !!email && !!paymentMethod && isTermsAgreed;
    this.setState({
      shouldShowSuccessMessage,
      shouldShowErrorMessage: !shouldShowSuccessMessage,
    });

    if (shouldShowSuccessMessage) {
      const { onSubmit } = this.props;
      onSubmit && onSubmit();
    }
  };

  renderApplicants = () => {
    const { stepTwo } = this.props;
    return Object.keys(stepTwo).map(index => (
      <Flexbox
        key={index}
        column
        alignItems="flex-start"
        border
        borderRadius
        borderColor="visaBlue"
        width="100%"
        paddingVertical={2}
        paddingHorizontal={2}
        marginVertical={1}
        marginHorizontal={1}
      >
        <Div>
          <Text bold>Full name:</Text> <Text>{stepTwo[index].name}</Text>
        </Div>
        <Div>
          <Text bold>Country:</Text> <Text>{stepTwo[index].country}</Text>
        </Div>
        <Div>
          <Text bold>Date of birth:</Text>{' '}
          <Text>{stepTwo[index].birthday}</Text>
        </Div>
        <Div>
          <Text bold>Passport number:</Text>{' '}
          <Text>{stepTwo[index].passport}</Text>
        </Div>
        <Div>
          <Text bold>Passport expiry date:</Text>{' '}
          <Text>{stepTwo[index].passportExpiryDate}</Text>
        </Div>
        <Div>
          <Text bold>Gender:</Text> <Text>{stepTwo[index].gender}</Text>
        </Div>
      </Flexbox>
    ));
  };

  render() {
    const {
      name,
      phone,
      email,
      hasFlightInfo,
      flightNumber,
      shouldShowSuccessMessage,
      shouldShowErrorMessage,
    } = this.state;
    const { goBack } = this.props;

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
                  <Text bold>
                    FULL NAME&nbsp;<Text color="visaRed">*</Text>
                  </Text>
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
                  <Text bold>
                    EMAIL&nbsp;<Text color="visaRed">*</Text>
                  </Text>
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
                  <Text bold>
                    PHONE NUMBER&nbsp;<Text color="visaRed">*</Text>
                  </Text>
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

                {/* Applicants information */}
                <Flexbox
                  alignItems="flex-start"
                  justifyContent="space-between"
                  width="100%"
                  marginTop={5}
                >
                  <Text size="l" bold>
                    APPLICANT(S) INFORMATION
                  </Text>
                </Flexbox>
                {this.renderApplicants()}
              </Flexbox>

              {/* Review form */}
              <Flexbox
                flex={1}
                column
                width="100%"
                marginLeft={spacingValues.xxs}
                marginRight={spacingValues.xxs}
              >
                <ApplyFormReviewForm
                  updatePaymentMethod={this.updatePaymentMethod}
                  updateIsTermsAgreed={this.updateIsTermsAgreed}
                />

                <Flexbox
                  width="100%"
                  justifyContent="space-around"
                  marginTop={5}
                  marginBottom={5}
                >
                  <Button solid onClick={goBack}>
                    <i className="fa fa-arrow-left" />
                    &nbsp;&nbsp;BACK
                  </Button>

                  <Button solid onClick={this.onSubmit}>
                    FINISH&nbsp;&nbsp;
                    <i className="fa fa-check" />
                  </Button>
                </Flexbox>

                {shouldShowSuccessMessage && (
                  <Text color="visaBlue" textAlign="center">
                    Thank you for choosing us, we will contact you shortly!
                  </Text>
                )}

                {shouldShowErrorMessage && (
                  <Text color="visaRed" textAlign="center">
                    Please fill in the required inputs & accept Terms of Use
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
    stepTwo: store.stepTwo,
    stepThree: store.stepThree,
  };
};
const mapDispatchToProps = {
  finishStepThree,
};
export default withRedux(initialStore, mapStateToProps, mapDispatchToProps)(
  ApplyFormStepThreeWithRedux,
);
