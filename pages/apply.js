// @flow
// vendor
import React, { Fragment } from 'react';
import { logPageView } from '../utils/analytics';
import { Step } from 'semantic-ui-react';
import { connect } from 'react-redux';
// custom
import { Anchor, Button, Flexbox, Text } from '../components/ui';
import ContentMaxWidth from '../components/ContentMaxWidth';
import Heading from '../components/Heading';
import Card from '../components/Card';
import ApplyFormStepOne from '../components/ApplyFormStepOne';
import ApplyFormStepTwo from '../components/ApplyFormStepTwo';
import ApplyFormStepThree from '../components/ApplyFormStepThree';
import ApplyFormReviewForm from '../components/ApplyFormReviewForm';
import { formMaxWidth, pageNames, spacingValues } from '../constants/ui';

const formPaddingHorizontal = 3;

/**
 * Apply show the form to apply for visa
 */
type Props = {};
type State = {
  steps: Array<Object>,
  isAgreeClicked: boolean,
};
class Apply extends React.Component<Props, State> {
  static defaultProps: Props = {};

  state = {
    steps: [
      {
        key: 'options',
        active: true,
        completed: false,
        title: 'Visa Options',
        onClick: () => this.showStepOne(),
      },
      {
        key: 'billing',
        active: false,
        completed: false,
        title: 'Applicant Details',
        onClick: () => this.showStepTwo(),
      },
      {
        key: 'confirm',
        active: false,
        completed: false,
        title: 'Review & Finalize',
        onClick: () => this.showStepThree(),
      },
    ],
    isAgreeClicked: false,
  };

  showStepOne = () => {
    let { steps } = this.state;
    steps[0].active = true;
    steps[0].completed = false;
    steps[1].active = false;
    steps[1].completed = false;
    steps[2].active = false;
    steps[2].completed = false;

    this.setState({
      steps,
    });
  };

  showStepTwo = () => {
    let { steps } = this.state;
    steps[0].active = false;
    steps[0].completed = true;
    steps[1].active = true;
    steps[1].completed = false;
    steps[2].active = false;
    steps[2].completed = false;

    this.setState({
      steps,
    });
  };

  showStepThree = () => {
    let { steps } = this.state;
    steps[0].active = false;
    steps[0].completed = true;
    steps[1].active = false;
    steps[1].completed = true;
    steps[2].active = true;
    steps[2].completed = false;

    this.setState({
      steps,
    });
  };

  hideAgreeStatement = () => {
    this.setState({
      isAgreeClicked: true,
    });
  };

  componentDidMount() {
    logPageView();
  }

  render() {
    const { steps, isAgreeClicked } = this.state;

    return (
      <Fragment>
        {isAgreeClicked ? (
          <ContentMaxWidth>
            <Flexbox
              paddingVertical={spacingValues.blockPaddingTop}
              column
              alignItems="center"
              maxWidth={formMaxWidth - formPaddingHorizontal * 4}
            >
              <Flexbox column width="100%">
                <Heading secondary text="Get your Visa in 3 steps" />

                <Step.Group ordered items={steps} />
              </Flexbox>

              <Flexbox
                justifyContent="space-between"
                paddingTop={6}
                responsiveLayout
                width="100%"
              >
                <Flexbox
                  flex={1}
                  paddingVertical={5}
                  paddingHorizontal={formPaddingHorizontal}
                >
                  {steps[0].active && (
                    <ApplyFormStepOne onSubmit={this.showStepTwo} />
                  )}
                  {steps[1].active && (
                    <ApplyFormStepTwo
                      goBack={this.showStepOne}
                      onSubmit={this.showStepThree}
                    />
                  )}
                  {steps[2].active && (
                    <ApplyFormStepThree goBack={this.showStepTwo} />
                  )}
                </Flexbox>
                <Flexbox
                  flex={1}
                  paddingVertical={5}
                  paddingHorizontal={formPaddingHorizontal}
                >
                  <ApplyFormReviewForm />
                </Flexbox>
              </Flexbox>
            </Flexbox>
          </ContentMaxWidth>
        ) : (
          <Flexbox maxWidth={formMaxWidth} alignItem="center">
            <Card>
              <Text color="green" fontSize="l" p textAlign="center">
                All information provided to evisa-vn.com
                <br />
                will be kept confidential.
              </Text>
              <Text p textAlign="center">
                This application will take approximately 5 minutes.
                <br />
                By using our service, you agree to our{' '}
                <Anchor href={pageNames.terms}>Terms of Use</Anchor>.
              </Text>
              <Button onClick={this.hideAgreeStatement}>I Agree</Button>
            </Card>
          </Flexbox>
        )}
      </Fragment>
    );
  }
}

export default Apply;
