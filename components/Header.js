// @flow
// Vendor
import * as React from 'react';
import Media from 'react-media';
import Router from 'next/router';
import NProgress from 'nprogress';
// Custom
import { Anchor, Flexbox, Image, Text } from '../components/ui';
import {
  colors,
  screenSizes,
  contentMaxWidth,
  pageNames,
  borderRadius,
} from '../constants/ui';
import { companyInfo } from '../constants/companyInfo';
import PhoneAndEmail from './PhoneAndEmail';

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

const menus = [
  {
    text: 'About',
    url: pageNames.home,
  },
  {
    text: 'Fees',
    url: pageNames.fees,
  },
  {
    text: 'FAQ',
    url: pageNames.faq,
  },
  {
    text: 'Services',
    url: pageNames.services,
  },
  {
    text: 'Contact',
    url: pageNames.contact,
  },
  // {
  //   text: 'Reviews',
  //   url: pageNames.reviews,
  // },
];

const mobileAnchorStyles = {
  display: 'flex',
  width: '100%',
  justifyContent: 'center',
  paddingTop: 15,
  paddingBottom: 15,
  backgroundColor: 'white',
};

/**
 * Header component that acts as the fixed top part in the application layout,
 * and shows logo, contact information and navigation.
 */
type Props = {};
type State = {
  shouldShowMobileMenus?: boolean,
};
class Header extends React.PureComponent<Props, State> {
  state = {
    shouldShowMobileMenus: false,
  };

  navigateToApply = () => Router.push(pageNames.apply);

  toggleMobileMenus = () => {
    this.setState({
      shouldShowMobileMenus: !this.state.shouldShowMobileMenus,
    });
  };

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
        aligniItems="center"
        justifyContent="flex-end"
        paddingVertical={2}
        paddingHorizontal={3}
      >
        {menus.map((menu, index) => (
          <Anchor key={index} href={menu.url} color="white" activeColor="green">
            <Flexbox paddingHorizontal={6} paddingVertical={2}>
              {menu.text}
            </Flexbox>
          </Anchor>
        ))}
        <Anchor href={pageNames.apply} color="white" activeColor="green">
          <Flexbox
            paddingHorizontal={6}
            paddingVertical={2}
            backgroundColor="darkRed"
            borderRadius={borderRadius}
          >
            <Text color="white">Apply</Text>
          </Flexbox>
        </Anchor>
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
      <a
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
          <Image src="../static/icons/phone-ico.svg" width={5} alt={'phone'} />
          <Text fonsize={'l'} color={'white'} paddingLeft={2}>
            {companyInfo.phoneString}
          </Text>
        </Flexbox>
      </a>

      <a
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
          <Image src="../static/icons/email-ico.svg" width={5} alt={'mail'} />
          <Text fonsize={'l'} color="white" paddingLeft={2}>
            {companyInfo.email}
          </Text>
        </Flexbox>
      </a>

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
        href={pageNames.apply}
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
      <Flexbox style={{ zIndex: 101 }} column backgroundColor="white">
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

            <Media
              query={`(min-width: ${screenSizes.tablet + 1}px)`}
              defaultMatches={true}
            >
              <PhoneAndEmail />
            </Media>
            <Media
              query={`(max-width: ${screenSizes.tablet}px)`}
              defaultMatches={false}
            >
              {this.renderMobileMenuIcon()}
            </Media>
          </Flexbox>
        </Flexbox>

        {shouldShowMobileMenus && this.renderMobileMenus()}

        <Media
          query={`(min-width: ${screenSizes.tablet + 1}px)`}
          defaultMatches={true}
        >
          {this.renderDesktopHorizontalMenus()}
        </Media>
      </Flexbox>
    );
  }
}

export default Header;
