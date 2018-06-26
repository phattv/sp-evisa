// @flow
// Vendor
import * as React from 'react';
import Media from 'react-media';
import Router from 'next/router';
import { connect } from 'react-redux';
import NProgress from 'nprogress';
// Custom
import { Anchor, Flexbox, Image, Text } from '../components/ui';
import { colors, screenSizes, contentMaxWidth } from '../constants/ui';
import { companyInfo } from '../constants/companyInfo';
import { reducerNames } from '../constants/reducerNames';
import { logout } from '../redux/actions';

const blockId = 'header';
const logoutUrl = '/logout';

Router.onRouteChangeStart = url => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

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
    this.hideMenu();
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
    this.setState({
      menus: [
        {
          text: 'About',
          url: '/',
        },
        {
          text: 'Fees',
          url: '/fees',
        },
        {
          text: 'How to Apply',
          url: '/how',
        },
        {
          text: 'Other services',
          url: '/services',
        },
        {
          text: 'Apply',
          url: '/apply',
        },
      ],
    });
  };

  render() {
    const { isMenuShowed, menus } = this.state;

    return (
      // Paypal z-index: 100
      <Flexbox style={{ zIndex: 101 }} column>
        <Flexbox flex={1} height={12} justifyContent={'center'}>
          <Flexbox
            width="100%"
            maxWidth={contentMaxWidth}
            alignItems="center"
            justifyContent="space-between"
          >
            <Anchor href="/" changeBackground>
              <Image
                src="../static/logo/logo-horizontal.svg"
                alt={'logo-horizontal'}
                width={32}
              />
            </Anchor>
            <Flexbox alignItems={'center'}>
              <Anchor href={`tel:${companyInfo.phone}`} changeBackground>
                <Flexbox
                  alignItems={'center'}
                  paddingHorizontal={1}
                  paddingVertical={1}
                >
                  <Image
                    src={'../static/icons/phone-ico.svg'}
                    width={5}
                    alt={'phone'}
                  />
                  <Text fonsize={'l'} color="darkBlue" paddingLeft={2}>
                    {companyInfo.phoneString}
                  </Text>
                </Flexbox>
              </Anchor>
              <Flexbox borderRight height={7} marginHorizontal={3} />
              <Anchor href={`mailto:${companyInfo.email}`} changeBackground>
                <Flexbox
                  alignItems={'center'}
                  paddingHorizontal={1}
                  paddingVertical={1}
                >
                  <Image
                    src={'../static/icons/email-ico.svg'}
                    width={5}
                    alt={'mail'}
                  />
                  <Text fonsize={'l'} color="darkBlue" paddingLeft={2}>
                    {companyInfo.email}
                  </Text>
                </Flexbox>
              </Anchor>
            </Flexbox>
          </Flexbox>
        </Flexbox>
        <Flexbox
          flex={1}
          height={16}
          backgroundColor="darkBlue"
          justifyContent={'center'}
        >
          <Flexbox
            width="100%"
            maxWidth={contentMaxWidth}
            aligniItems="center"
            justifyContent="flex-end"
          >
            <Anchor href="/about" color="white" activeColor="green">
              About
            </Anchor>
            <Anchor href="/about">red</Anchor>
          </Flexbox>
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
