// @flow
// Vendor
import * as React from 'react';
import Media from 'react-media';
import Router from 'next/router';
import NProgress from 'nprogress';
// Custom
import { Anchor, Button, Flexbox, Image, Text } from '../components/ui';
import {
  colors,
  screenSizes,
  contentMaxWidth,
  pageNames,
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
    text: 'How to Apply',
    url: pageNames.how,
  },
  {
    text: 'Fees',
    url: pageNames.fees,
  },
  {
    text: 'Services',
    url: pageNames.services,
  },
  {
    text: 'Contact Us',
    url: pageNames.contact,
  },
];

const mobileAnchorStyles = {
  display: 'flex',
  width: '100%',
  justifyContent: 'center',
  paddingTop: 15,
  paddingBottom: 15,
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
        <Button onClick={() => Router.push(pageNames.apply)}>Apply</Button>
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
          <Image src="../static/icons/phone-ico.svg" width={5} alt={'phone'} />
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
          <Image src="../static/icons/email-ico.svg" width={5} alt={'mail'} />
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
