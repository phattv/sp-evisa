// @flow
// vendor
import { Component } from 'react';
import { logPageView } from '../utils/analytics';
// custom

type Props = {};
type State = {};

class Home extends Component<Props, State> {
  static defaultProps: Props = {};

  state = {};

  componentDidMount() {
    logPageView();
  }

  render() {
    return <div>Home page</div>;
  }
}

export default Home;
