// @flow
// Vendor
import * as React from 'react';
import Media from 'react-media';

// Custom
import { Anchor, Flexbox, Image, Text } from '../components/ui';
import { colors, screenSizes } from '../constants/ui';

const headerHeight = 25;
const blockId = 'header';
const styleHtml = `<style>#${blockId} a.active {color: ${
  colors.visaRed
}}</style>`;
const menus = [
  {
    text: 'HOME',
    url: '/',
  },
  {
    text: 'APPLY VISA ONLINE',
    url: '/apply',
  },
  {
    text: 'VISA FEES',
    url: '/fees',
  },
  {
    text: 'HOW TO APPLY VISA',
    url: '/how',
  },
  {
    text: 'EXTRA SERVICES',
    url: '/services',
  },
  {
    text: 'INFORMATION',
    url: '/news',
  },
  {
    text: 'FEEDBACK',
    url: '/feedback',
  },
];

type HeaderState = {
  isMenuShowed?: boolean,
};
export default class Header extends React.PureComponent<null, HeaderState> {
  state = {
    isMenuShowed: false,
  };

  updateIsMenuShowed = () => {
    this.setState({
      isMenuShowed: !this.state.isMenuShowed,
    });
  };

  hideMenu = () => {
    this.setState({
      isMenuShowed: false,
    });
  };

  render() {
    const { isMenuShowed } = this.state;
    return (
      <Flexbox id={blockId} style={{ zIndex: 2 }}>
        <Text
          dangerouslySetInnerHTML={{
            __html: styleHtml,
          }}
        />
        <Flexbox
          width="100%"
          border
          position="fixed"
          top={0}
          left={0}
          backgroundColor="white"
          height={headerHeight}
          column
        >
          <Flexbox
            maxWidth={288}
            width="100%"
            justifyContent="space-between"
            alignItems="center"
            paddingVertical={2}
            paddingHorizontal={6}
          >
            <Flexbox>
              <Anchor href="/" as="/">
                <Text size="xl">evisa-vn.com</Text>
                {/*<Image*/}
                {/*src="/static/images/logo.png"*/}
                {/*alt="evisa logo"*/}
                {/*maxHeight={10}*/}
                {/*maxWidth={80}*/}
                {/*clickable*/}
                {/*/>*/}
              </Anchor>
            </Flexbox>
            <Flexbox>
              <Image
                src="/static/images/hotline.png"
                alt="hotline"
                maxHeight={10}
                width="auto"
              />
              <Image
                paddingLeft={4}
                src="/static/images/email.png"
                alt="email"
                maxHeight={10}
                width="auto"
              />
              <Media query={`(max-width: ${screenSizes.tablet}px)`}>
                <Flexbox onClick={this.updateIsMenuShowed} paddingLeft={4}>
                  <Image src="/static/images/line-hamburger.svg" alt="Menu" />
                </Flexbox>
              </Media>
            </Flexbox>
          </Flexbox>
          <Flexbox backgroundColor="visaBlue" width="100%">
            <Media query={`(min-width: ${screenSizes.tablet + 1}px)`}>
              <Flexbox>
                {menus.map((menu, index) => (
                  <Flexbox
                    paddingVertical={3}
                    paddingHorizontal={3}
                    key={index}
                  >
                    <Text size="m">
                      <Anchor href={menu.url} color="white">
                        {menu.text}
                      </Anchor>
                    </Text>
                  </Flexbox>
                ))}
              </Flexbox>
            </Media>
          </Flexbox>

          {isMenuShowed ? (
            <Flexbox
              column
              position="fixed"
              width="100%"
              top={headerHeight}
              left={0}
              backgroundColor="visaBlue"
            >
              {menus.map((menu, index) => (
                <CustomReactScrollLink
                  id={menu.to}
                  key={index}
                  paddingVertical={3}
                  onClick={this.hideMenu}
                >
                  <Text color="white">{menu.text}</Text>
                </CustomReactScrollLink>
              ))}
            </Flexbox>
          ) : null}
        </Flexbox>
      </Flexbox>
    );
  }
}
