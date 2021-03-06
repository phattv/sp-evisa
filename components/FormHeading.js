// @flow
// vendor
import React from 'react';
// custom
import { Flexbox, Text } from './ui';
import Divider from './Divider';

/**
 * FormHeading shows Form heading with a divider below
 */
type Props = {
  text: string,
  hasPaddingTop?: boolean,
};
type State = {};
class FormHeading extends React.Component<Props, State> {
  render() {
    const { text, hasPaddingTop } = this.props;
    let paddingTop = hasPaddingTop
      ? {
          paddingTop: 6,
        }
      : null;

    return (
      <Flexbox paddingBottom={6} column {...paddingTop}>
        <Text fontSize="m">{text}</Text>
        <Divider />
      </Flexbox>
    );
  }
}

export default FormHeading;
