// @flow
import * as React from "react";
import reactScroll, { Link as ReactScrollLink } from "react-scroll";

import { Text, Anchor } from "../components/ui";

type CustomReactScrollLinkProps = {
  id: string,
  url: string,
  children?: React.Node,
  paddingVertical?: number,
  onClick?: () => any
};
class CustomReactScrollLink extends React.PureComponent<
  CustomReactScrollLinkProps
> {
  privateOnClick = () => {
    const { id, onClick } = this.props;
    if (id) {
      reactScroll.scroller.scrollTo(id, {
        smooth: true,
        duration: 500,
        offset: -18 * 5 // Header height
      });
    }
    if (onClick) {
      onClick();
    }
  };

  render() {
    const { id, url, children, paddingVertical } = this.props;
    const mobileStyle = paddingVertical
      ? {
          width: "100%",
          borderBottom: true,
          paddingVertical: paddingVertical
        }
      : {};

    return (
      <Text
        color="darkGrey70"
        hoverColor="visaRed"
        paddingVertical={3}
        paddingHorizontal={3}
        clickable
        textAlign="center"
        onClick={this.privateOnClick}
        {...mobileStyle}
      >
        {id ? (
          <ReactScrollLink
            to={id}
            smooth={true}
            duration={500}
            spy={true}
            activeClass="active"
            offset={-18 * 5} // Header height
            onClick={this.privateOnClick}
          >
            {children}
          </ReactScrollLink>
        ) : (
          <Anchor href={url}>{children}</Anchor>
        )}
      </Text>
    );
  }
}

export default CustomReactScrollLink;
