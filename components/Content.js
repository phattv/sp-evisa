// @flow
// Vendor
import * as React from "react";
// import { Element as ReactScrollElement } from 'react-scroll'
// Custom
import { Flexbox } from "../components/ui";

type Props = {
  id?: string,
  backgroundColor?: string,
  isSqueeze?: boolean,
  children?: string | React.Node
};

export default class Content extends React.Component<Props> {
  render() {
    const { id, backgroundColor, isSqueeze, children, ...rest } = this.props;

    return (
      <Flexbox width="100%" backgroundColor={backgroundColor || null} {...rest}>
        {/*<ReactScrollElement id={id || null}>*/}
        <Flexbox
          maxWidth={288}
          paddingVertical={isSqueeze ? 12 : 18}
          responsivePaddingHorizontal
          width="100%"
        >
          {children}
        </Flexbox>
        {/*</ReactScrollElement>*/}
      </Flexbox>
    );
  }
}
