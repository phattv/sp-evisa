// @flow
// Vendor
import * as React from 'react';
import Media from 'react-media';
import Router from 'next/router';
// Custom
import { Anchor, Flexbox, Image, Text } from '../components/ui';
import { colors, screenSizes } from '../constants/ui';
import { companyInfo } from '../constants/companyInfo';

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
    text: 'APPLY',
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
  // {
  //   text: 'INFORMATION',
  //   url: '/news',
  // },
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

  navigateToUrl = (url: string) => {
    Router.push(url).then(() => window.scrollTo(0, 0));
  };

  render() {
    const { isMenuShowed } = this.state;
    return (
      // Paypal z-index: 100
      <Flexbox id={blockId} style={{ zIndex: 101 }}>
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
                <Image
                  src="/static/images/logo.png"
                  alt="evisa logo"
                  maxWidth={30}
                  clickable
                />
              </Anchor>
            </Flexbox>
            <Flexbox>
              <Flexbox>
                <Anchor href={`tel:${companyInfo.phone}`}>
                  <Flexbox
                    border
                    borderColor="visaRed"
                    paddingHorizontal={2}
                    paddingVertical={2}
                    borderRadius
                  >
                    <i
                      className="fa fa-fw fa-phone"
                      style={{
                        color: colors.visaRed,
                        marginRight: 5,
                      }}
                    />
                    <Text color="visaRed" bold>
                      HOTLINE
                    </Text>
                  </Flexbox>
                </Anchor>
              </Flexbox>
              <Flexbox
                border
                borderColor="visaBlue"
                paddingHorizontal={2}
                paddingVertical={2}
                borderRadius
                marginLeft={2}
              >
                <Anchor href={`mailto:${companyInfo.email}`}>
                  <Flexbox>
                    <i
                      className="fa fa-fw fa-envelope"
                      style={{
                        color: colors.visaBlue,
                        marginRight: 5,
                      }}
                    />
                    <Text color="visaBlue" bold>
                      EMAIL
                    </Text>
                  </Flexbox>
                </Anchor>
              </Flexbox>
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
                    <Text size="m" textAlign="center">
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
              backgroundColor="white"
            >
              {menus.map((menu, index) => (
                <Text
                  key={index}
                  paddingVertical={3}
                  paddingHorizontal={3}
                  clickable
                  textAlign="center"
                  width="100%"
                  borderBottom
                  bold
                  color="visaBlue"
                  onClick={() => this.navigateToUrl(menu.url)}
                >
                  {menu.text}
                </Text>
              ))}
            </Flexbox>
          ) : null}
        </Flexbox>
      </Flexbox>
    );
  }
}
