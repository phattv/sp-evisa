// @flow
import React from 'react';
import { Anchor, Flexbox, Text } from '../components/ui';
import { companyInfo } from '../constants/companyInfo';
import { contentMaxWidth } from '../constants/ui';

const currentYear = new Date().getFullYear();

type Props = {};
export default class Footer extends React.Component<Props> {
  render() {
    return (
      <Flexbox
        width="100%"
        column
        alignItems="center"
        backgroundColor="bgGrey2"
      >
        <Flexbox
          width="100%"
          maxWidth={contentMaxWidth / 2}
          paddingTop={20}
          paddingBottom={6}
          justifyContent={'center'}
        >
          <Text>Copyright © {currentYear} evisa-vn</Text>
        </Flexbox>
      </Flexbox>
    );
  }
}
