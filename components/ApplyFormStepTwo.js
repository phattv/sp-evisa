// @flow
// vendor
import * as React from 'react';
import { Div } from 'glamorous';
import { connect } from 'react-redux';
import withRedux from 'next-redux-wrapper';
// custom
import { Button } from '../components';
import { finishStepTwo } from '../actions';
import { initialStore } from '../store';

type Props = {
  onSubmit: () => void,
  stepOne: Object,
  stepTwo: Object,
  finishStepTwo: Object => void,
};
type State = {};
class ApplyFormStepTwo extends React.Component<Props, State> {
  constructor(props: Object) {
    super(props);
  }

  static defaultProps: Props = {};

  state = {};

  onSubmit = () => {
    const { onSubmit } = this.props;
    onSubmit && onSubmit();
  };

  render() {
    console.log('xxx stepTwo', this.props);
    return (
      <Div>
        Please fill out all required information below to process Vietnam visa
        approval letter right now OR just select applicant's nationality, then
        SKIP THIS STEP. An application form will be sent to your registered
        email for later fulfilling.
        <Button solid marginTop={5} marginBottom={5} onClick={this.onSubmit}>
          NEXT&nbsp;&nbsp;
          <i className="fa fa-arrow-right" />
        </Button>
      </Div>
    );
  }
}

const ApplyFormStepTwoWithRedux = connect(null, null)(ApplyFormStepTwo);

const mapStateToProps = store => {
  return {
    stepOne: store.stepOne,
    stepTwo: store.stepTwo,
  };
};
const mapDispatchToProps = {
  finishStepTwo: finishStepTwo,
};
export default withRedux(initialStore, mapStateToProps, mapDispatchToProps)(
  ApplyFormStepTwoWithRedux,
);
