// @flow
// vendor
import * as React from 'react';
import { Div } from 'glamorous'
// custom
import { Flexbox } from '../components'

type Props = {};
type State = {};

class ApplyFormStepTwo extends React.Component<Props, State> {
  constructor(props: Object) {
    super(props);
  }

  static defaultProps: Props = {};

  state = {};

  render() {
    return (
      <Div>
        Please fill out all required information below to process Vietnam visa
        approval letter right now OR just select applicant's nationality, then
        SKIP THIS STEP. An application form will be sent to your registered
        email for later fulfilling.
      </Div>
    );
  }
}

export default ApplyFormStepTwo;
