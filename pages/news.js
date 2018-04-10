// @flow
// vendor
import React from 'react';
import withRedux from 'next-redux-wrapper'
// custom
import {
  BlockHeader,
  PageHeader,
  Content,
  Flexbox,
  Image,
  Layout,
  Text,
} from '../components';
import { colors } from '../constants/ui';
import { configureStore } from '../redux/store'

class News extends React.Component {
  componentDidMount() {
    window.Intercom("update");
  }

  render() {
    return (
      <Layout>
        <Image src="/static/images/news-background.png" />
        <PageHeader header="NEWS" />
        <Content>
          <Flexbox
            width="100%"
            flex={1}
            justifyContent="flex-start"
            responsiveLayout
          >
            <Flexbox
              flex={2}
              column
              alignItems="flex-start"
              paddingHorizontal={1}
            >
              <BlockHeader header="Vietnam Visa News" />
              <Text p bold color="visablue">
                New regulation about Vietnam Visa stamping Fee
              </Text>
              <Text p>
                According to the new officially announcement proclaimed about
                the Vietnamese Visa stamping fee for foreign customers, the fee
                is delightedly slashed by 40% from November 23rd, 2015. This
                amendment might ascend a massive motivation in foreign arrivals
                at the year-end period.
              </Text>
              <Text p>
                Vietnam will cut the standard visa fee for visitors from US$45
                to $25 on November 23. Similarly, with multiple entry visa in
                three months validity, its stamping fee will sharply fall from
                current $95 down to $50. The stamping fee for 6 months multiple
                entries Visa will be 95USD.
              </Text>

              <Text p>
                With the new regulations above and the convenience of Visa on
                arrival service, we expect that the number of foreign visitors
                will be increased.
              </Text>
              <Text p>
                If you are wondering about Vietnamese Visa on arrival, coming to
                our service will be a good idea. Please click on the link to get
                more information about our service
                https://www.vietnam-evisa.org/.
              </Text>
              <Text p>Have a nice day!</Text>
              <Text p bold color="visaBlue">
                Vietnam E Visa Team
              </Text>
              <Flexbox marginTop={10} column alignItems="flex-start">
                <Text p bold color="visaBlue" size="l">
                  RELATED INFORMATION
                </Text>
                <ul>
                  <li>
                    <Text p bold>
                      Small change for applying visa of US citizen (from Dec
                      15th 2016)
                    </Text>
                  </li>
                  <li>
                    <Text p bold>
                      Vietnam visa on arrival the best choice for Businessmen
                    </Text>
                  </li>
                  <li>
                    <Text p bold>
                      Get Vietnam visa on arrival or Vietnam Embassy? Why?
                    </Text>
                  </li>
                  <li>
                    <Text p bold>
                      Advantages and disadvantages for getting visa on arrival
                    </Text>
                  </li>
                  <li>
                    <Text p bold>
                      Vietnam visa on arrival, the best deal for travel agent
                    </Text>
                  </li>
                  <li>
                    <Text p bold>
                      Vietnam visa on arrival, the best choice for travel agent{' '}
                    </Text>
                  </li>
                </ul>
              </Flexbox>
            </Flexbox>
            <Flexbox flex={1} column paddingHorizontal={1}>
              <Text p bold color="visaRed" size="l" column>
                SUPPORT ONLINE
              </Text>
              <Flexbox
                column
                border
                borderColor="visaBlue"
                borderRadius
                alignItems="flex-start"
                paddingHorizontal={2}
                paddingVertical={2}
              >
                <Text p bold>
                  Our pleasure to support you 24/7
                </Text>
                <Text p>
                  <Text bold color="visaBlue">
                    Call for Free:
                  </Text>{' '}
                  +1 (559) 922-2468 (ext. 1)
                </Text>
                <Text p>
                  <Text bold color="visaBlue">
                    Phone:
                  </Text>{' '}
                  +84.473.005.333 (ext. 221 or 224) Mobile: (+84) 946 583 583
                </Text>
                <Text p>
                  <Text bold color="visaBlue">
                    Email:
                  </Text>{' '}
                  sales@vietnamvisafast-cheap.com
                </Text>
                <Text p>
                  <Text bold color="visaBlue">
                    Web:
                  </Text>{' '}
                  Vietnamvisafast-cheap.com
                </Text>
              </Flexbox>

              <Text p bold color="visaBlue" size="l" column marginTop={10}>
                EXTRA SERVICES
              </Text>
              <Flexbox
                column
                border
                borderColor="visaBlue"
                borderRadius
                alignItems="flex-start"
                paddingHorizontal={2}
                paddingVertical={2}
                width="100%"
              >
                <Text p bold>
                  <i
                    className="fa fa-fw fa fa-check"
                    aria-hidden="true"
                    style={{
                      color: colors.visaBlue,
                    }}
                  />
                  Air port fast-track Service
                </Text>
                <Text p bold>
                  <i
                    className="fa fa-fw fa fa-check"
                    aria-hidden="true"
                    style={{
                      color: colors.visaBlue,
                    }}
                  />
                  Car pick-up service
                </Text>
                <Text p bold>
                  <i
                    className="fa fa-fw fa fa-check"
                    aria-hidden="true"
                    style={{
                      color: colors.visaBlue,
                    }}
                  />
                  Vietnam visa extension and renewal service
                </Text>
                <Text p bold>
                  <i
                    className="fa fa-fw fa fa-check"
                    aria-hidden="true"
                    style={{
                      color: colors.visaBlue,
                    }}
                  />
                  Hotel booking service
                </Text>
                <Text p bold>
                  <i
                    className="fa fa-fw fa fa-check"
                    aria-hidden="true"
                    style={{
                      color: colors.visaBlue,
                    }}
                  />
                  Vietnam domestic flights
                </Text>
                <Text p bold>
                  <i
                    className="fa fa-fw fa fa-check"
                    aria-hidden="true"
                    style={{
                      color: colors.visaBlue,
                    }}
                  />
                  Tour and travel booking
                </Text>
              </Flexbox>
            </Flexbox>
          </Flexbox>
        </Content>
      </Layout>
    );
  }
}

export default withRedux(configureStore, null, null)(News)
