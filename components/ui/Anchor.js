// @flow
import styled from "styled-components";
import { colors } from "../../constants/ui";

const Anchor = styled.a`
  text-decoration: none;
  color: ${props => colors[props.color || "darkGrey70"]};
  &:hover {
    color: ${props => colors[props.activeColor || "caroRed"]};
  }
  &.active {
    color: ${props => colors[props.activeColor || "caroRed"]};
  }
`;

export default Anchor;
