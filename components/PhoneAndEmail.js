// @flow
// vendor
import React from 'react';
// custom
import { Anchor, Flexbox, Image, Text } from '../components/ui';
import { companyInfo } from '../constants/companyInfo';

/**
 * PhoneAndEmail shows company's contact information: phone & email
 */
type Props = {};
type State = {};

class PhoneAndEmail extends React.Component<Props, State> {
  render() {
    return (
      <Flexbox alignItems={'center'}>
        <a href={`tel:${companyInfo.phone}`}>
          <Flexbox
            alignItems={'center'}
            paddingHorizontal={1}
            paddingVertical={1}
            clickable
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
        </a>
        <Flexbox borderRight height={7} marginHorizontal={3} />
        <a href={`mailto:${companyInfo.email}`}>
          <Flexbox
            alignItems={'center'}
            paddingHorizontal={1}
            paddingVertical={1}
            clickable
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
        </a>
      </Flexbox>
    );
  }
}

export default PhoneAndEmail;
