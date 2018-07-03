// @flow
// vendor
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import { Dropdown } from 'semantic-ui-react';
// custom
import { Flexbox, Image, Text } from '../components/ui';
import ContentMaxWidth from '../components/ContentMaxWidth';
import Heading from '../components/Heading';
import FeesCard from '../components/FeesCard';
import ServicesCard from '../components/ServicesCard';
import PaymentMethodImages from '../components/PaymentMethodImages';

import { logPageView } from '../utils/analytics';
import { reducerNames } from '../constants/reducerNames';
import { spacingValues, iconSizes } from '../constants/ui';
import { updateFees, updateFeesSelectedCountry } from '../redux/actions';
import { getFeesByCountryId } from '../utils/apiClient';
import { countryOptionsSemantic } from '../constants/dropDownOptions';

const fieldsToBind = [
  'one_month_single',
  'one_month_multiple',
  'three_month_single',
  'three_month_multiple',
  'six_month_multiple',
  'one_year_multiple',
];
const tableWidth = 76;

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
    this.syncPropsToState(this.props, true);
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

  render() {
    const { countryId, touristFees, businessFees } = this.state;

    return (
      <Fragment>
        <FeesCard />
        <ContentMaxWidth>
          <Flexbox
            column
            paddingTop={spacingValues.blockPaddingTop}
            alignItems="center"
          >
            <Image
              width={iconSizes.large}
              src="../static/icons/world.svg"
              alt="world icon"
            />
            <Flexbox paddingTop={3}>
              <Heading
                text="Select your country to see the price in details"
                secondary
              />
            </Flexbox>

            <Flexbox paddingTop={6} width={tableWidth}>
              {/* TODO: coutnry flag */}
              <Dropdown
                value={countryId}
                placeholder="Select Country"
                fluid
                search
                selection
                options={countryOptionsSemantic}
                onChange={this.updateCountryId}
              />
            </Flexbox>

            <Flexbox responsiveLayout paddingTop={6} paddingBottom={20}>
              {!_isEmpty(touristFees) && this.renderTouristFees()}
              {!_isEmpty(businessFees) && this.renderBusinessFees()}
            </Flexbox>
          </Flexbox>
        </ContentMaxWidth>

        <ServicesCard />

        <PaymentMethodImages />
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
        marginVertical={2}
      >
        <Flexbox
          width={tableWidth}
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
        {fieldsToBind.map((field, index) => (
          <Flexbox
            paddingVertical={1}
            paddingHorizontal={5}
            key={index}
            justifyContent="space-between"
            width="100%"
            backgroundColor={index % 2 === 0 ? 'bgGrey2' : 'white'}
          >
            <Text>{field.replace(/_/g, ' ')}</Text>
            <Text>{`${fees[field]} USD` || 'N/A'}</Text>
          </Flexbox>
        ))}
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
export default connect(mapStateToProps, mapDispatchToProps)(Fees);
