// @flow
// vendor
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _find from 'lodash/find';
import { Dropdown } from 'semantic-ui-react';
import Router, { withRouter } from 'next/router';
// custom
import { Button, Flexbox, Image, Text } from '../components/ui';
import ContentMaxWidth from '../components/ContentMaxWidth';
import Heading from '../components/Heading';
import Card from '../components/Card';
import PaymentMethodImages from '../components/PaymentMethodImages';
import { logPageView } from '../utils/analytics';
import { reducerNames } from '../constants/reducerNames';
import {
  iconSizes,
  pageNames,
  spacingValues,
  tableWidth,
} from '../constants/ui';
import { updateFees, updateFeesSelectedCountry } from '../redux/actions';
import { getFeesByCountryId } from '../utils/apiClient';
import { countryOptions, typeOptions } from '../constants/dropDownOptions';
import { fees } from '../constants/fees';

/**
 * Fees show all the fees a person must pay to apply visa
 */
type Props = {
  countryId: number,
  fees: Array<Object>,
  updateFees: (Array<Object>) => void,
  updateFeesSelectedCountry: number => void,
};
type State = {
  countryId: number,
  touristFees: Object,
  businessFees: Object,
};
class Fees extends React.Component<Props, State> {
  state = {
    countryId: 0,
    touristFees: {},
    businessFees: {},
  };

  componentDidMount() {
    logPageView();

    const { countryId } = this.props;
    const countryIdParam = parseInt(_get(this, 'props.router.query.id', 0), 10);

    /**
     * Read "id" URL params from URL:
     * - if > 0 then update countryId prop and save to store
     * - if = 0 means there's no params:
     *   + if countryId prop exists, set to URL param
     */
    if (countryIdParam > 0 && countryIdParam !== countryId) {
      this.props.updateFeesSelectedCountry(countryIdParam);
      getFeesByCountryId({ countryId: countryIdParam }, this.updateFees);
    } else {
      if (countryId > 0) {
        this.updateUrlQueryParams(countryId);
      }
      this.syncPropsToState(this.props, true);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.syncPropsToState(nextProps);
  }

  syncPropsToState = (nextProps: Props, isForced?: boolean) => {
    if (isForced || this.props.fees !== nextProps.fees) {
      _get(nextProps, 'fees', []).forEach(fees => {
        if (fees.type === 'tourist') {
          this.setState({
            touristFees: fees,
          });
        } else if (fees.type === 'business') {
          this.setState({
            businessFees: fees,
          });
        }
      });
    }

    if (isForced || this.props.countryId !== nextProps.countryId) {
      this.setState({
        countryId: nextProps.countryId,
      });
    }
  };

  updateCountryId = (event: Object, country: Object) => {
    this.updateUrlQueryParams(country.value);

    this.setState(
      {
        countryId: country.value,
        touristFees: {},
        businessFees: {},
      },
      () => {
        this.props.updateFeesSelectedCountry(country.value);
        getFeesByCountryId({ countryId: country.value }, this.updateFees);
      },
    );
  };

  updateFees = data => {
    this.props.updateFees(data);
  };

  updateUrlQueryParams = countryId => {
    const href = pageNames.fees + '?id=' + countryId;
    Router.push(href, href, { shallow: true });
  };

  navigateToApply = () => Router.push(pageNames.apply);

  render() {
    const { countryId, touristFees, businessFees } = this.state;

    return (
      <Fragment>
        <ContentMaxWidth backgroundImage="url('../static/images/bg-airport.jpg')">
          <Flexbox column paddingHorizontal={16} paddingVertical={16}>
            <Heading color="white" text="Fees" />
            <Flexbox width="100%" alignItems="center" responsiveLayout>
              <Flexbox flex={1}>
                <Card>
                  <Text>
                    <Text semibold color="green">
                      Service fee
                    </Text>{' '}
                    is paid online to evisa-vn.com which is the service fee for
                    the process of getting the visa approval letter. You use the
                    letter to get Vietnam visa stamp at the airports.
                  </Text>
                </Card>
              </Flexbox>
              <Flexbox>
                <Flexbox
                  alignItems="center"
                  justifyContent="center"
                  width={10}
                  height={10}
                  borderRadius={25}
                  backgroundColor="green"
                >
                  <Text fontSize="xl" bold color="white">
                    +
                  </Text>
                </Flexbox>
              </Flexbox>
              <Flexbox flex={1}>
                <Card>
                  <Text>
                    <Text semibold color="green">
                      Stamping fee
                    </Text>{' '}
                    is paid in cash (USD) at the landing visa counter at the
                    arrival airport. It costs{' '}
                    <Text semibold>
                      {fees.stampingFeeSingleEntry} USD for a single entry visa
                    </Text>{' '}
                    and{' '}
                    <Text semibold>
                      {fees.stampingFeeMultipleEntries} USD for a multiple entry
                      visa
                    </Text>.
                  </Text>
                </Card>
              </Flexbox>
            </Flexbox>
          </Flexbox>
        </ContentMaxWidth>

        <ContentMaxWidth>
          <Flexbox column maxWidth={tableWidth * 2 + 4}>
            <Flexbox
              column
              paddingTop={spacingValues.blockPaddingTop}
              paddingBottom={2}
              alignItems="center"
            >
              <Image
                width={iconSizes.large}
                src="../static/icons/world.svg"
                alt="world icon"
              />
              <Flexbox paddingTop={3}>
                <Heading
                  text="Select your country to see Service Fees in details"
                  secondary
                />
              </Flexbox>

              <Flexbox paddingTop={6} width={tableWidth}>
                <Dropdown
                  value={countryId}
                  placeholder="Select Country"
                  fluid
                  search
                  selection
                  options={countryOptions}
                  onChange={this.updateCountryId}
                />
              </Flexbox>

              <Flexbox responsiveLayout paddingTop={6}>
                {!_isEmpty(touristFees) && this.renderTouristFees()}
                {!_isEmpty(businessFees) && this.renderBusinessFees()}
              </Flexbox>
            </Flexbox>

            <Button onClick={this.navigateToApply}>Apply Now!</Button>
          </Flexbox>
        </ContentMaxWidth>

        <PaymentMethodImages />

        <Flexbox paddingBottom={30} />
      </Fragment>
    );
  }

  renderTouristFees = () => {
    return this.renderFees(this.state.touristFees, 'Tourist Fees');
  };

  renderBusinessFees = () => {
    return this.renderFees(this.state.businessFees, 'Business Fees');
  };

  renderFees = (fees, title) => {
    return (
      <Flexbox
        column
        backgroundColor="white"
        borderTop
        borderWidth={3}
        borderColor="green"
        marginHorizontal={2}
        marginVertical={4}
        minWidth={tableWidth}
        width="100%"
      >
        <Flexbox
          paddingVertical={6}
          column
          alignItems="center"
          justifyContent="center"
        >
          <Text fontSize="l" color="darkBlue" bold noDoubleLineHeight>
            {title}
          </Text>
          <Text color="lightBlue">(Price per pax)</Text>
        </Flexbox>
        {typeOptions.map((type, index) => {
          return (
            <Flexbox
              paddingVertical={1}
              paddingHorizontal={5}
              key={index}
              justifyContent="space-between"
              width="100%"
              backgroundColor={index % 2 === 0 ? 'bgGrey2' : 'white'}
            >
              <Text>{type.text}</Text>
              <Text>
                {fees[type.value] > 0 ? `${fees[type.value]} USD` : 'N/A'}
              </Text>
            </Flexbox>
          );
        })}
      </Flexbox>
    );
  };
}

const mapStateToProps = store => {
  return {
    countryId: store[reducerNames.fees].countryId,
    fees: store[reducerNames.fees].fees,
  };
};
const mapDispatchToProps = {
  updateFees,
  updateFeesSelectedCountry,
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Fees));
