// @flow
// vendor
import React from 'react';
// custom
import { Anchor, Flexbox, Text } from '../components/ui';
import { companyInfo } from '../constants/companyInfo';
import { contentMaxWidth, spacingValues, pageNames } from '../constants/ui';
import PhoneAndEmail from './PhoneAndEmail';

const currentYear = new Date().getFullYear();

/**
 * Footer component that acts as the bottom part in the application layout,
 * and shows copyright, contact information, social media platforms and disclaimers.
 */
type Props = {};
class Footer extends React.Component<Props> {
  render() {
    return (
      <Flexbox
        width="100%"
        justifyContent="center"
        backgroundColor="bgGrey2"
        paddingHorizontal={3}
      >
        <Flexbox
          width="100%"
          maxWidth={contentMaxWidth / 2}
          paddingTop={spacingValues.blockPaddingTop}
          paddingBottom={6}
          alignItems="center"
          column
        >
          <Text>Copyright © {currentYear} evisa-vn. All rights reserved.</Text>
          <Text paddingTop={4} semibold>
            CONTACT US
          </Text>
          <PhoneAndEmail />
          {/*<Text paddingTop={2} textAlign="center">*/}
          {/*{companyInfo.address}*/}
          {/*</Text>*/}
          <Flexbox
            paddingTop={10}
            paddingBottom={2}
            justifyContent="space-around"
            width="100%"
          >
            <a href={companyInfo.facebook} target="_blank">
              <Text color="green" clickable>
                Facebook
              </Text>
            </a>
            <Text>/</Text>
            <Anchor href={pageNames.terms}>Terms of Use</Anchor>
            <Text>/</Text>
            <Anchor href={pageNames.privacy}>Privacy Policy</Anchor>
          </Flexbox>
          <span
            style={{
              textAlign: 'center',
              fontSize: 12,
              lineHeight: '16px',
            }}
          >
            Disclaimers: evisa-vn.com is a non-government site (managed by a
            private agency) providing visa approval letter service for travelers
            to Vietnam for a fee and whilst every effort is made to ensure the
            information is correct and up to date, there may be changes which we
            are not aware of.
          </span>
        </Flexbox>
      </Flexbox>
    );
  }
}

export default Footer;
