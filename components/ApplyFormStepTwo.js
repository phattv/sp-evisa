// @flow
// vendor
import * as React from 'react';
import { Div } from 'glamorous';
import { connect } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import { Form } from 'react-final-form';
// custom
import { Button, Flexbox, Text } from '../components';
import { initialStore } from '../store';
import { spacingValues } from '../constants/ui';
import ApplyFormStepTwoForm from './ApplyFormStepTwoForm';

type Props = {
  onSubmit: () => void,
  stepOne: Object,
  finishStepTwo: Object => void,
};
type State = {};
class ApplyFormStepTwo extends React.Component<Props, State> {
  state = {};

  onSubmit = () => {
    const { onSubmit } = this.props;
    onSubmit && onSubmit();
  };

  render() {
    const { stepOne: { quantity, country } } = this.props;

    const applicants = [];
    for (let index = 0; index < quantity; index++) {
      applicants.push(index);
    }

    return (
      <Div>
        <Flexbox
          marginLeft={spacingValues.xxs}
          marginRight={spacingValues.xxs}
          paddingBottom={5}
        >
          <Text>
            Please fill out all required information below to process Vietnam
            visa approval letter right now OR just select applicant's
            nationality, then &nbsp;<Text
              color="visaRed"
              onClick={this.onSubmit}
              clickable
            >
              SKIP THIS STEP
            </Text>. An application form will be sent to your registered email
            for later fulfilling.
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
                {applicants.map(index => (
                  <ApplyFormStepTwoForm
                    key={index}
                    index={index}
                    initialCountry={country}
                  />
                ))}
              </Flexbox>
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
                  NEXT&nbsp;&nbsp;
                  <i className="fa fa-arrow-right" />
                </Button>
              </Flexbox>
            </Flexbox>
          )}
        />
      </Div>
    );
  }
}

const ApplyFormStepTwoWithRedux = connect(null, null)(ApplyFormStepTwo);

const mapStateToProps = store => {
  return {
    stepOne: store.stepOne,
  };
};
const mapDispatchToProps = null;
export default withRedux(initialStore, mapStateToProps, mapDispatchToProps)(
  ApplyFormStepTwoWithRedux,
);
