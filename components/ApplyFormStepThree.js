// @flow
// vendor
import * as React from 'react';
import withRedux from 'next-redux-wrapper';
import { Form } from 'react-final-form';
import { Div, Input, Label } from 'glamorous';
import isEmpty from 'lodash/isEmpty';
// custom
import { configureStore } from '../redux/store';
import { updateStepThree } from '../redux/actions';
import { Button, Flexbox, Text } from '../components';
import { borderRadius, colors, spacingValues } from '../constants/ui';
import ApplyFormReviewForm from './ApplyFormReviewForm';
import { reducerNames } from '../constants/reducerNames';
import { countryOptions } from '../constants/dropDownOptions';
import { account } from '../redux/reducers/account';

type Props = {
  stepTwo: Object,
  stepThree: Object,
  updateStepThree: Object => void,
  onSubmit: () => void,
  goBack: Object => void,
  account: Object,
  guest: Object,
};
type State = {
  hasFlightInfo: boolean,
  flightNumber: string,
  shouldShowErrorMessage: boolean,
  shouldShowSuccessMessage: boolean,
  isTermsAgreed: boolean,
};

class ApplyFormStepThree extends React.Component<Props, State> {
  static defaultProps: Props = {};

  state = {
    hasFlightInfo: false,
    flightNumber: '',
    shouldShowErrorMessage: false,
    shouldShowSuccessMessage: false,
    isTermsAgreed: false,
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
    this.props.updateStepThree(this.state);
  };

  updateIsTermsAgreed = (isTermsAgreed: boolean) => {
    this.setState({
      isTermsAgreed,
    });
  };

  onSubmit = () => {
    const { isTermsAgreed } = this.state;
    const { account, guest } = this.props;
    const contact = isEmpty(account) ? guest : account;
    const isContactEmpty =
      isEmpty(contact) ||
      isEmpty(contact.name) ||
      isEmpty(contact.email) ||
      isEmpty(contact.phone);

    const shouldShowErrorMessage = !isTermsAgreed || isContactEmpty;

    this.setState({
      shouldShowSuccessMessage: !shouldShowErrorMessage,
      shouldShowErrorMessage,
    });

    if (!shouldShowErrorMessage) {
      const { onSubmit } = this.props;
      onSubmit && onSubmit();
    }
  };

  renderApplicants = () => {
    const { stepTwo } = this.props;

    return Object.keys(stepTwo).map(index => {
      const countryObject = countryOptions.find(
        option => option.value === stepTwo[index].country_id,
      );

      return (
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
            <Text bold>Country:</Text> <Text>{countryObject.label}</Text>
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
            <Text>{stepTwo[index].passport_expiry}</Text>
          </Div>
          <Div>
            <Text bold>Gender:</Text> <Text>{stepTwo[index].gender}</Text>
          </Div>
        </Flexbox>
      );
    });
  };

  render() {
    const {
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
                marginHorizontal={spacingValues.xxs}
                marginVertical={spacingValues.xxs}
              >
                <ApplyFormReviewForm
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
                    Please fill in the Contact information inputs & accept Terms of Use & pay
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

const mapStateToProps = store => {
  return {
    stepTwo: store[reducerNames.form].stepTwo,
    stepThree: store[reducerNames.form].stepThree,
    account: store[reducerNames.account],
    guest: store[reducerNames.guest],
  };
};
const mapDispatchToProps = {
  updateStepThree,
};
export default withRedux(configureStore, mapStateToProps, mapDispatchToProps)(
  ApplyFormStepThree,
);
