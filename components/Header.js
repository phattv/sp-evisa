// @flow
// Vendor
import * as React from 'react';
import Media from 'react-media';
import Router from 'next/router';
import NProgress from 'nprogress';
// Custom
import { Anchor, Button, Flexbox, Image, Text } from '../components/ui';
import { colors, screenSizes, contentMaxWidth } from '../constants/ui';
import { companyInfo } from '../constants/companyInfo';

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

const menus = [
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
    text: 'Contact Us',
    url: '/contact',
  },
];

const mobileAnchorStyles = {
  display: 'flex',
  width: '100%',
  justifyContent: 'center',
  paddingTop: 15,
  paddingBottom: 15,
};

type Props = {};
type State = {
  shouldShowMobileMenus?: boolean,
};
class Header extends React.PureComponent<Props, State> {
  state = {
    shouldShowMobileMenus: false,
  };

  toggleMobileMenus = () => {
    this.setState({
      shouldShowMobileMenus: !this.state.shouldShowMobileMenus,
    });
  };

  renderDesktopPhoneAndEmail = () => (
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
          <Image src={'../static/icons/email-ico.svg'} width={5} alt={'mail'} />
          <Text fonsize={'l'} color="darkBlue" paddingLeft={2}>
            {companyInfo.email}
          </Text>
        </Flexbox>
      </Anchor>
    </Flexbox>
  );

  renderDesktopHorizontalMenus = () => (
    <Flexbox
      flex={1}
      height={16}
      backgroundColor="darkBlue"
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Flexbox
        width="100%"
        maxWidth={contentMaxWidth}
        aligniItems="baseline"
        justifyContent="flex-end"
        paddingVertical={2}
        paddingHorizontal={3}
      >
        {menus.map((menu, index) => (
          <Anchor key={index} href={menu.url} color="white" activeColor="green">
            <Flexbox paddingHorizontal={4} paddingVertical={2}>
              {menu.text}
            </Flexbox>
          </Anchor>
        ))}
        <Button onClick={() => Router.push('/apply')}>Apply</Button>
      </Flexbox>
    </Flexbox>
  );

  renderMobileMenuIcon = () => (
    <Flexbox
      paddingVertical={2}
      paddingHorizontal={3}
      onClick={this.toggleMobileMenus}
    >
      <Image src="../static/icons/hamburger-ico.svg" alt={'menu'} width={5} />
    </Flexbox>
  );

  renderMobileMenus = () => (
    <Flexbox
      column
      alignItems={'center'}
      position={'fixed'}
      top={12}
      left={0}
      width={'100%'}
    >
      <Anchor
        href={`tel:${companyInfo.phone}`}
        style={{
          ...mobileAnchorStyles,
          backgroundColor: colors.darkBlue,
        }}
      >
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
          <Text fonsize={'l'} color={'white'} paddingLeft={2}>
            {companyInfo.phoneString}
          </Text>
        </Flexbox>
      </Anchor>

      <Anchor
        href={`mailto:${companyInfo.email}`}
        style={{
          ...mobileAnchorStyles,
          backgroundColor: colors.mediumBlue,
        }}
      >
        <Flexbox
          alignItems={'center'}
          paddingHorizontal={1}
          paddingVertical={1}
        >
          <Image src={'../static/icons/email-ico.svg'} width={5} alt={'mail'} />
          <Text fonsize={'l'} color="white" paddingLeft={2}>
            {companyInfo.email}
          </Text>
        </Flexbox>
      </Anchor>

      {menus.map((menu, index) => (
        <Anchor
          key={index}
          href={menu.url}
          color="mediumBlue"
          activeColor="green"
          style={mobileAnchorStyles}
        >
          {menu.text}
        </Anchor>
      ))}

      <Anchor
        href={'/apply'}
        color={'white'}
        activeColor={'green'}
        style={{
          ...mobileAnchorStyles,
          fontWeight: 'bold',
          backgroundColor: colors.red,
        }}
      >
        APPLY
      </Anchor>
    </Flexbox>
  );

  render() {
    const { shouldShowMobileMenus } = this.state;

    return (
      // Paypal z-index: 100
      <Flexbox style={{ zIndex: 101 }} column>
        <Flexbox flex={1} height={12} justifyContent={'center'}>
          <Flexbox
            width="100%"
            maxWidth={contentMaxWidth}
            alignItems="center"
            justifyContent="space-between"
            paddingVertical={2}
            paddingHorizontal={3}
          >
            <Anchor href="/" changeBackground>
              <Image
                src="../static/logo/logo-horizontal.svg"
                alt={'logo-horizontal'}
                width={32}
              />
            </Anchor>

            <Media query={`(min-width: ${screenSizes.tablet + 1}px)`}>
              {this.renderDesktopPhoneAndEmail()}
            </Media>
            <Media query={`(max-width: ${screenSizes.tablet}px)`}>
              {this.renderMobileMenuIcon()}
            </Media>
          </Flexbox>
        </Flexbox>

        {shouldShowMobileMenus && this.renderMobileMenus()}

        <Media query={`(min-width: ${screenSizes.tablet + 1}px)`}>
          {this.renderDesktopHorizontalMenus()}
        </Media>
      </Flexbox>
    );
  }
}

export default Header;
