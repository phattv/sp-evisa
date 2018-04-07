// @flow
// vendor
import * as React from "react";
import Select from "react-select";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import { connect } from "react-redux";
import withRedux from "next-redux-wrapper";
// custom
import {
  BlockHeader,
  PageHeader,
  Content,
  Flexbox,
  Image,
  Layout,
  Text
} from "../components";
import countryOptions from "../static/countries.json";
import { updateFees } from "../actions";
import { initialStore } from "../store";
import { colors } from "../constants/ui";
import { getFeesByCountryId } from "../utils/apiClient";

type Props = {
  fees: Array<Object>,
  updateFees: (Array<Object>) => void
};
type State = {
  countryId: number,
  touristFees: Object,
  businessFees: Object
};
class VisaFees extends React.Component<Props, State> {
  state = {
    countryId: 0,
    touristFees: {},
    businessFees: {}
  };

  componentDidMount() {
    window.Intercom("update");
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.fees !== nextProps.fees) {
      get(nextProps, "fees", []).forEach(fees => {
        if (fees.type === "tourist") {
          this.updateTouristFees(fees);
        } else if (fees.type === "business") {
          this.updateBusinessFees(fees);
        }
      });
    }
  }

  updateCountryId = (country: Object) => {
    this.setState(
      {
        countryId: country.value,
        touristFees: {},
        businessFees: {}
      },
      () => getFeesByCountryId({ countryId: country.value }, this.updateFees)
    );
  };

  updateFees = data => {
    this.props.updateFees(data);
  };

  updateTouristFees = (touristFees: Object) => {
    this.setState({
      touristFees
    });
  };

  updateBusinessFees = (businessFees: Object) => {
    this.setState({
      businessFees
    });
  };

  render() {
    const { countryId, touristFees, businessFees } = this.state;

    return (
      <Layout>
        <Image src="/static/images/fees-background.png" />
        <PageHeader header="VISA FEES" />
        <Content>
          <Flexbox width="100%" responsiveLayout column>
            <Flexbox column>
              <Text bold paddingBottom={10}>
                Applying Vietnam Visa on arrival, two types of fee need to be
                paid by customers
              </Text>
              <Flexbox column>
                <Flexbox flex={1} column alignItems="flex-start" width="100%">
                  <BlockHeader header="Service fee" smallPadding />
                  <Flexbox alignItems="flex-start">
                    <Text p>
                      Service fee is paid online to evisa-vn.com which is the
                      service fee for the process of getting the visa approval
                      letter. You use the letter to get Vietnam visa stamp at
                      the airports.
                    </Text>
                  </Flexbox>
                </Flexbox>
                <Flexbox flex={1} column alignItems="flex-start" width="100%">
                  <BlockHeader header="Stamping fee" smallPadding />
                  <Flexbox alignItems="flex-start">
                    <Text p>
                      Stamping fee is paid in cash (USD) at the landing visa
                      counter at the arrival airport. This fee is vary depend on
                      types of visa:
                    </Text>
                  </Flexbox>
                </Flexbox>

                <Flexbox width="100%" column paddingTop={5}>
                  <Text p size="l">
                    Please select your coutry to see the price in detail
                  </Text>
                  <Flexbox width="100%" maxWidth={100}>
                    <Select
                      value={countryId}
                      placeholder="Select country"
                      onChange={this.updateCountryId}
                      options={countryOptions}
                    />
                  </Flexbox>

                  <Flexbox responsiveLayout>
                    {!isEmpty(touristFees) && (
                      <Flexbox column paddingVertical={5} paddingHorizontal={5}>
                        <BlockHeader header="TOURIST FEES" smallPadding />
                        <table>
                          <thead
                            style={{
                              backgroundColor: colors.visaRed,
                              color: colors.white,
                              fontWeight: "bold"
                            }}
                          >
                            <tr>
                              <th>VISA TYPE</th>
                              <th>SERVICE FEE</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1 month single</td>
                              <td>
                                {touristFees.one_month_single
                                  ? `${touristFees.one_month_single} USD/pax`
                                  : "N/A"}
                              </td>
                            </tr>
                            <tr>
                              <td>1 month multiple</td>
                              <td>
                                {touristFees.one_month_multiple
                                  ? `${touristFees.one_month_multiple} USD/pax`
                                  : "N/A"}
                              </td>
                            </tr>
                            <tr>
                              <td>3 months single</td>
                              <td>
                                {touristFees.three_month_single
                                  ? `${touristFees.three_month_single} USD/pax`
                                  : "N/A"}
                              </td>
                            </tr>
                            <tr>
                              <td>3 months multiple</td>
                              <td>
                                {touristFees.three_month_multiple
                                  ? `${
                                      touristFees.three_month_multiple
                                    } USD/pax`
                                  : "N/A"}
                              </td>
                            </tr>
                            <tr>
                              <td>6 months single</td>
                              <td>
                                {touristFees.six_month_multiple
                                  ? `${touristFees.six_month_multiple} USD/pax`
                                  : "N/A"}
                              </td>
                            </tr>
                            <tr>
                              <td>1 year single</td>
                              <td>
                                {touristFees.one_year_multiple
                                  ? `${touristFees.one_year_multiple} USD/pax`
                                  : "N/A"}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </Flexbox>
                    )}

                    {!isEmpty(businessFees) && (
                      <Flexbox column paddingVertical={5} paddingHorizontal={5}>
                        <BlockHeader header="BUSINESS FEES" smallPadding />
                        <table>
                          <thead
                            style={{
                              backgroundColor: colors.visaRed,
                              color: colors.white,
                              fontWeight: "bold"
                            }}
                          >
                            <tr>
                              <th>VISA TYPE</th>
                              <th>SERVICE FEE</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1 month single</td>
                              <td>
                                {businessFees.one_month_single
                                  ? `${businessFees.one_month_single} USD/pax`
                                  : "N/A"}
                              </td>
                            </tr>
                            <tr>
                              <td>1 month multiple</td>
                              <td>
                                {businessFees.one_month_multiple
                                  ? `${businessFees.one_month_multiple} USD/pax`
                                  : "N/A"}
                              </td>
                            </tr>
                            <tr>
                              <td>3 months single</td>
                              <td>
                                {businessFees.three_month_single
                                  ? `${businessFees.three_month_single} USD/pax`
                                  : "N/A"}
                              </td>
                            </tr>
                            <tr>
                              <td>3 months multiple</td>
                              <td>
                                {businessFees.three_month_multiple
                                  ? `${
                                      businessFees.three_month_multiple
                                    } USD/pax`
                                  : "N/A"}
                              </td>
                            </tr>
                            <tr>
                              <td>6 months single</td>
                              <td>
                                {businessFees.six_month_multiple
                                  ? `${businessFees.six_month_multiple} USD/pax`
                                  : "N/A"}
                              </td>
                            </tr>
                            <tr>
                              <td>1 year single</td>
                              <td>
                                {businessFees.one_year_multiple
                                  ? `${businessFees.one_year_multiple} USD/pax`
                                  : "N/A"}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </Flexbox>
                    )}
                  </Flexbox>

                  {!isEmpty(touristFees) &&
                    !isEmpty(businessFees) && (
                      <Text fontStyle="italic">
                        Note: Stamping is excluded from the fee tables above
                      </Text>
                    )}
                </Flexbox>
              </Flexbox>
            </Flexbox>
          </Flexbox>
        </Content>
      </Layout>
    );
  }
}

const VisaFeesWithRedux = connect(null, null)(VisaFees);

const mapStateToProps = store => {
  return {
    fees: store.fees
  };
};
const mapDispatchToProps = {
  updateFees
};
export default withRedux(initialStore, mapStateToProps, mapDispatchToProps)(
  VisaFeesWithRedux
);
