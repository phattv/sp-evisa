// @flow
import { AnchorExternal, Flexbox, Text, Image } from "../components/ui";
import { pageNames } from "../constants/ui";

export default class Footer extends React.Component<null> {
  render() {
    return (
      <Flexbox width="100%" border backgroundColor="bgGrey">
        <Flexbox
          flexDirection="column"
          alignItems="flex-start"
          paddingVertical={6}
          paddingHorizontal={15}
          maxWidth={288}
          width="100%"
          responsiveAlignItemsCenter
        >
          <Image
            src="/static/images/logo.png"
            alt="evisa logo"
            paddingVertical={3}
            clickable
          />
        </Flexbox>
      </Flexbox>
    );
  }
}
