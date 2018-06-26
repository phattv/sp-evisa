// @flow
// vendor
import { Component } from 'react';
import { logPageView } from '../utils/analytics';
// custom

type Props = {};
type State = {};

class About extends Component<Props, State> {
  static defaultProps: Props = {};

  state = {};

  componentDidMount() {
    logPageView();
  }

  render() {
    return <div>About</div>;
  }
}

export default About;
