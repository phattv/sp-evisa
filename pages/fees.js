// @flow
// vendor
import * as React from 'react';
// custom
import {
  BlockHeader,
  PageHeader,
  Content,
  Flexbox,
  Image,
  Layout,
  Text,
  TouristVisaFees,
  BusinessVisaFees,
} from '../components';
import { colors } from '../constants/ui';

class VisaFees extends React.Component {
  componentDidMount() {
    window.Intercom('update');
  }

  render() {
    return (
      <Layout>
        <Image src="/static/images/fees-background.png" />
        <PageHeader header="VISA FEES" />
        <Content>
          <Flexbox width="100%" responsiveLayout column>
            <Flexbox column>
              <Text bold paddingVertical={10}>
                Applying Vietnam Visa on arrival, two types of fee need to be
                paid by customers
              </Text>
              <Flexbox>
                <Flexbox flex={1} column alignItems="flex-start">
                  <BlockHeader header="Service fee" />
                  <Flexbox alignItems="flex-start">
                    <Image src="/static/images/fees-image.png" />
                    <Text p paddingHorizontal={5}>
                      Service fee is paid online to evisa-vn.com which is the
                      service fee for the process of getting the visa approval
                      letter. You use the letter to get Vietnam visa stamp at
                      the airports.
                    </Text>
                  </Flexbox>
                </Flexbox>
                <Flexbox flex={1} column alignItems="flex-start">
                  <BlockHeader header="Stamping fee" />
                  <Flexbox alignItems="flex-start">
                    <Image src="/static/images/fees-image.png" />
                    <Text p paddingHorizontal={5}>
                      Stamping fee is paid in cash (USD) at the landing visa
                      counter at the arrival airport. This fee is vary depend on
                      types of visa:
                    </Text>
                  </Flexbox>
                </Flexbox>
              </Flexbox>
            </Flexbox>

            <BlockHeader paddingTop="8" header="DETAILED PRICING TABLES" />
            <Flexbox width="100%" justifyContent="flex-start">
              <BlockHeader
                header="For tourist visas to Vietnam:"
                smallPadding
              />
            </Flexbox>
            <TouristVisaFees />

            <Flexbox width="100%" juchrstifyContent="flex-start" paddingTop="8">
              <BlockHeader
                header="For business visas to Vietnam:"
                smallPadding
              />
            </Flexbox>
            <BusinessVisaFees />

            <Flexbox width="100%" justifyContent="flex-start" paddingTop="5">
              <Text bold>
                * Please note that service fee for business visas includes
                Fast-track service
              </Text>
            </Flexbox>
          </Flexbox>
        </Content>

        <style>{`
th, td {
  padding: 10px;
  border: 1px solid ${colors.lightGrey}
}
        `}</style>
      </Layout>
    );
  }
}

export default VisaFees;
