// @flow
// vendor
import * as React from 'react';
import { connect } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import { bindActionCreators } from 'redux';
// custom
import { initialStore } from '../store';
import { finishStepThree } from '../actions';

type Props = {};
type State = {};

class ApplyFormStepThree extends React.Component<Props, State> {
  constructor(props: Object) {
    super(props);
  }

  static defaultProps: Props = {};

  state = {};

  render() {
    console.log('xxx stepThree', this.props);
    return (
      <div>
        Please review your application details below before starting visa
        processing with Vietnam Immigration Department.
      </div>
    );
  }
}

const ApplyFormStepThreeWithRedux = connect(null, null)(ApplyFormStepThree);

const mapStateToProps = store => {
  return {
    stepThree: store.stepThree,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    finishStepThree: bindActionCreators(finishStepThree, dispatch),
  };
};
export default withRedux(initialStore, mapStateToProps, mapDispatchToProps)(
  ApplyFormStepThreeWithRedux,
);
