// @flow
// vendor
import React from 'react';
// custom
import { Flexbox, Text } from './ui';
import { htmlIds } from '../constants/ui';

/**
 * FormErrorMessage show error message for apply form
 */
type Props = {
  message?: string,
};
type State = {};
class FormErrorMessage extends React.Component<Props, State> {
  static defaultProps: Props = {
    message: 'Please fill in the required inputs!',
  };

  state = {};

  render() {
    const { message } = this.props;

    return (
      <Flexbox
        id={htmlIds.formErrorMessage}
        width="100%"
        backgroundColor="bgRed"
        paddingVertical={2}
        justifyContent="center"
        marginBottom={4}
      >
        <Text color="red" fontSize="s">
          {message}
        </Text>
      </Flexbox>
    );
  }
}

export default FormErrorMessage;
