// @flow
// vendor
import React from 'react';
// custom
import { Text } from './ui';

/**
 * Heading component that shows heading, act as <h1> tag,
 * set "secondary" prop to true to set secondary heading, act as <h2> tag
 */
type Props = {
  text: string,
  color?: string,
  textAlign?: string,
  secondary?: boolean,
};
type State = {};
class Heading extends React.Component<Props, State> {
  render() {
    const { text, color, textAlign, secondary } = this.props;

    return (
      <Text
        bold={secondary !== true}
        fontSize={secondary ? 'xl' : 'xxl'}
        paddingBottom={2}
        noDoubleLineHeight
        color={color || 'darkBlue'}
        textAlign={textAlign || 'center'}
      >
        {text}
      </Text>
    );
  }
}

export default Heading;
