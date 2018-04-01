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
    window.Intercom("update");
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
                Before applying for Vietnam visa on arrival, you should notice
                that when using this kind of visa, you need to pay two kinds of
                fee.
              </Text>
              <Flexbox>
                <Flexbox flex={1} column alignItems="flex-start">
                  <BlockHeader header="Service fee" />
                  <Flexbox alignItems="flex-start">
                    <Image src="/static/images/fees-image.png" />
                    <Text p paddingHorizontal={5}>
                      Service fee is paid online to Vietnam-visa.com in order to
                      get the visa approval letter approved so that you can fly
                      to Vietnam. This fee would vary depending upon your visa
                      type, number of applicants and processing time.
                    </Text>
                  </Flexbox>
                </Flexbox>
                <Flexbox flex={1} column alignItems="flex-start">
                  <BlockHeader header="Stamping fee" />
                  <Flexbox alignItems="flex-start">
                    <Image src="/static/images/fees-image.png" />
                    <Text p paddingHorizontal={5}>
                      Stamping fee is paid in USD in cash for each person at the
                      landing visa office upon arrival at Vietnam airport. It is
                      &nbsp;
                      <Text color="visaRed" bold>
                        25 USD
                      </Text>{' '}
                      for a single entry visa, &nbsp;<Text color="visaRed" bold>
                        50 USD
                      </Text>{' '}
                      for a multiple entry visa valid for up to 3 months, &nbsp;<Text
                        color="visaRed"
                        bold
                      >
                        95 USD
                      </Text>{' '}
                      for 6 months multiple entry visa, or &nbsp;<Text
                        color="visaRed"
                        bold
                      >
                        1325 USD
                      </Text>{' '}
                      for 1 year multiple entry visa.
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
