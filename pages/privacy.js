// @flow
// vendor
import React from 'react';
// custom
import { Text } from '../components/ui';
import { logPageView } from '../utils/analytics';

type Props = {};
type State = {};

class Privacy extends React.Component<Props, State> {
  static defaultProps = {};

  state = {};

  componentDidMount() {
    logPageView();
  }

  render() {
    return <Text>Privacy</Text>;
  }
}

export default Privacy;
