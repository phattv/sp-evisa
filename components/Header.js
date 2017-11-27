// @flow
// Vendor
import * as React from "react";
// import { scrollSpy } from 'react-scroll';

// Custom
import { Anchor, Flexbox, Image, Text, Button } from "../components/ui";
import { colors, pageNames, screenSizes } from "../constants/ui";

export default class Header extends React.PureComponent<null> {
  constructor(props: Object) {
    super(props);
  }

  render() {
    return (
      <Flexbox>
        <Flexbox
          width="100%"
          border
          position="fixed"
          top={0}
          left={0}
          backgroundColor="white"
          height={18}
        >
          <Flexbox
            maxWidth={288}
            width="100%"
            justifyContent="space-between"
            paddingVertical={3}
            paddingHorizontal={6}
          >
            <Image
              src="/static/images/logo.png"
              alt="evisa logo"
              paddingVertical={3}
              clickable
            />
          </Flexbox>
        </Flexbox>
      </Flexbox>
    );
  }
}
