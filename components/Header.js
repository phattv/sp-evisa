// @flow
// Vendor
import * as React from 'react';
import Media from 'react-media';
import Router from 'next/router';
import NProgress from 'nprogress';
// Custom
import { Anchor, Button, Flexbox, Image, Text } from '../components/ui';
import { contentMaxWidth } from '../constants/ui';
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

type Props = {};
type HeaderState = {
  isMenuShowed?: boolean,
};
class Header extends React.PureComponent<Props, HeaderState> {
  state = {};

  render() {
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
          alignItems={'center'}
        >
          <Flexbox
            width="100%"
            maxWidth={contentMaxWidth}
            aligniItems="baseline"
            justifyContent="flex-end"
          >
            {menus.map((menu, index) => (
              <Anchor
                key={index}
                href={menu.url}
                color="white"
                activeColor="green"
              >
                <Flexbox paddingHorizontal={4} paddingVertical={2}>
                  {menu.text}
                </Flexbox>
              </Anchor>
            ))}
            <Button onClick={() => Router.push('/apply')}>Apply</Button>
          </Flexbox>
        </Flexbox>
      </Flexbox>
    );
  }
}

export default Header;
