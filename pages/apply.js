// @flow
// vendor
import React, { Fragment } from 'react';
import { logPageView } from '../utils/analytics';
import { Step } from 'semantic-ui-react';
import { connect } from 'react-redux';
// custom
import { Flexbox, Text } from '../components/ui';
import ContentMaxWidth from '../components/ContentMaxWidth';
import Heading from '../components/Heading';
import ApplyFormStepOne from '../components/ApplyFormStepOne';
import ApplyFormStepTwo from '../components/ApplyFormStepTwo';
import ApplyFormStepThree from '../components/ApplyFormStepThree';
import ApplyFormReviewForm from '../components/ApplyFormReviewForm';
import { spacingValues, formMaxWidth } from '../constants/ui';

const formPaddingHorizontal = 3;

/**
 * Apply show the form to apply for visa
 */
type Props = {};
type State = {
  steps: Array<Object>,
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

  componentDidMount() {
    logPageView();
  }

  render() {
    const { steps } = this.state;

    return (
      <Fragment>
        <ContentMaxWidth>
          <Flexbox
            paddingVertical={spacingValues.blockPaddingTop}
            column
            alignItems="center"
            maxWidth={formMaxWidth - formPaddingHorizontal * 4}
          >
            <Flexbox column width="100%">
              <Heading secondary text="Get your Visa in 3 steps" />

              <Step.Group size="large" ordered items={steps} />
            </Flexbox>

            <Flexbox
              justifyContent="space-between"
              paddingTop={6}
              responsiveLayout
            >
              <Flexbox
                maxWidth="50%"
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
                maxWidth="50%"
                flex={1}
                paddingVertical={5}
                paddingHorizontal={formPaddingHorizontal}
              >
                <ApplyFormReviewForm />
              </Flexbox>
            </Flexbox>
          </Flexbox>
        </ContentMaxWidth>
      </Fragment>
    );
  }
}

export default Apply;
