// @flow
import styled from "styled-components";
import { colors } from "../../constants/ui";

const Anchor = styled.a`
  text-decoration: none;
  color: ${props => colors[props.color || "darkGrey"]};
  &:hover {
    color: ${props => colors[props.activeColor || "visaRed"]};
  }
  &.active {
    color: ${props => colors[props.activeColor || "visaRed"]};
  }
`;

export default Anchor;
