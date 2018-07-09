// @flow
// vendor
import React from 'react';
// custom
import { Text } from '../components/ui';
import { logPageView } from '../utils/analytics';

type Props = {};
type State = {};

class Terms extends React.Component<Props, State> {
  static defaultProps = {};

  state = {};

  componentDidMount() {
    logPageView();
  }

  render() {
    return <Text>Terms</Text>;
  }
}

export default Terms;
