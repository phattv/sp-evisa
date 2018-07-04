// @flow
// vendor
import React, { Fragment } from 'react';
import { logPageView } from '../utils/analytics';
import { Form, Step } from 'semantic-ui-react';
import { connect } from 'react-redux';
// custom
import { Anchor, Button, Flexbox, Image, Text } from '../components/ui';
import ContentMaxWidth from '../components/ContentMaxWidth';
import Heading from '../components/Heading';
// import ApplyFormStepOne from '../components/ApplyFormStepOne';
// import ApplyFormStepTwo from '../components/ApplyFormStepTwo';
// import ApplyFormStepThree from '../components/ApplyFormStepThree';
import ApplyFormReviewForm from '../components/ApplyFormReviewForm';
import { spacingValues, formMaxWidth } from '../constants/ui';

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
        href: '/apply#step1',
        active: true,
        completed: false,
        title: 'Visa Options',
      },
      {
        key: 'billing',
        href: '/apply#step2',
        active: false,
        completed: false,
        title: 'Applicant Details',
      },
      {
        key: 'confirm',
        href: '/apply#step3',
        active: false,
        completed: false,
        title: 'Review & Finalize',
      },
    ],
  };

  render() {
    const { steps } = this.state;

    return (
      <Fragment>
        <ContentMaxWidth>
          <Flexbox
            paddingVertical={spacingValues.blockPaddingTop}
            column
            width="100%"
            maxWidth={formMaxWidth}
          >
            <Heading secondary text="Get your Visa in 3 steps" />

            <Step.Group size="large" link ordered items={steps} />

            <Flexbox justifyContent="space-between" paddingTop={6}>
              <Flexbox flex={1}>
                <Text>Step 1 or 2 or 3</Text>
              </Flexbox>
              <Flexbox flex={1}>
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
