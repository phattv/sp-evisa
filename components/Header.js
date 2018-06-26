// @flow
// Vendor
import * as React from 'react';
import Media from 'react-media';
import Router from 'next/router';
import { connect } from 'react-redux';
// Custom
import { Anchor, Flexbox, Image, Text } from '../components/ui';
import { colors, screenSizes, contentMaxWidth } from '../constants/ui';
import { companyInfo } from '../constants/companyInfo';
import { reducerNames } from '../constants/reducerNames';
import { logout } from '../redux/actions';

const blockId = 'header';
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
      <Flexbox style={{ zIndex: 101 }} column>
        <Flexbox flex={1} height={12} justifyContent={'center'}>
          <Flexbox
            width="100%"
            maxWidth={contentMaxWidth}
            alignItems="center"
            justifyContent="space-between"
          >
            <Flexbox>
              logo
            </Flexbox>
            <Flexbox>
              phone number
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
// export default connect(mapStateToProps, mapDispatchToProps)(Header);
export default Header;
