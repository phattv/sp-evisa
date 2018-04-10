// @flow
// Vendor
import * as React from 'react';
import Media from 'react-media';
import Router from 'next/router';
import { Button as GlamorousButton } from 'glamorous';
import { connect } from 'react-redux';
// Custom
import { Anchor, Flexbox, Image, Text } from '../components/ui';
import { colors, screenSizes } from '../constants/ui';
import { companyInfo } from '../constants/companyInfo';
import { reducerNames } from '../constants/reducerNames';
import { logout } from '../redux/actions';

const headerHeight = 25;
const blockId = 'header';
const styleHtml = `<style>#${blockId} a.active {color: ${
  colors.visaRed
}}</style>`;
const logoutUrl = '/logout';

type Props = {
  account: Object,
  logout: () => void,
};
type HeaderState = {
  isMenuShowed?: boolean,
  menus: Array<Object>,
};
class Header extends React.PureComponent<Props, HeaderState> {
  state = {
    isMenuShowed: false,
    menus: [],
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
    if (url === logoutUrl) {
      this.props.logout();
    } else {
      Router.push(url).then(() => window.scrollTo(0, 0));
    }
  };

  componentWillReceiveProps(nextProps: Props) {
    this.setMenus(nextProps);
  }

  componentDidMount() {
    this.setMenus(this.props);
  }

  setMenus = (props: Props) => {
    const { account } = props;
    const isLoggedIn = account && Object.keys(account).length > 0;
    this.setState({
      menus: [
        {
          text: 'HOME',
          url: '/',
        },
        {
          text: isLoggedIn ? 'LOGOUT' : 'LOGIN',
          url: isLoggedIn ? logoutUrl : '/login',
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
      ],
    });
  };

  render() {
    const { isMenuShowed, menus } = this.state;
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
                    paddingVertical={1}
                    borderRadius
                  >
                    <i
                      className="fa fa-fw fa-phone"
                      style={{
                        color: colors.visaRed,
                      }}
                    />
                    <Text color="visaRed" bold size="s">
                      HOTLINE
                    </Text>
                  </Flexbox>
                </Anchor>
              </Flexbox>
              <Flexbox
                border
                borderColor="visaBlue"
                paddingHorizontal={2}
                paddingVertical={1}
                borderRadius
                marginLeft={2}
              >
                <Anchor href={`mailto:${companyInfo.email}`}>
                  <Flexbox>
                    <i
                      className="fa fa-fw fa-envelope"
                      style={{
                        color: colors.visaBlue,
                      }}
                    />
                    <Text color="visaBlue" bold size="s">
                      EMAIL
                    </Text>
                  </Flexbox>
                </Anchor>
              </Flexbox>
              <Media query={`(max-width: ${screenSizes.tablet}px)`}>
                <GlamorousButton
                  outline="none"
                  border="none"
                  onClick={this.updateIsMenuShowed}
                  onBlur={this.hideMenu}
                >
                  <Flexbox paddingLeft={4}>
                    <Image src="/static/images/line-hamburger.svg" alt="Menu" />
                  </Flexbox>
                </GlamorousButton>
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
                    <Text
                      size="m"
                      color="white"
                      textAlign="center"
                      onClick={() => this.navigateToUrl(menu.url)}
                      clickable
                    >
                      {menu.text}
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

const mapStateToProps = store => {
  return { account: store[reducerNames.account] };
};
const mapDispatchToProps = {
  logout,
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
