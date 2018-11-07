// @flow
// vendor
import React, { Fragment } from 'react';
import { logPageView } from '../utils/analytics';
import Router from 'next/router';
import { Dropdown, Form } from 'semantic-ui-react';
import _get from 'lodash/get';
import _find from 'lodash/find';
import { connect } from 'react-redux';
import Swiper from 'react-id-swiper';
// custom
import { Button, Flexbox, Image, Text } from '../components/ui';
import ContentMaxWidth from '../components/ContentMaxWidth';
import Card from '../components/Card';
import Divider from '../components/Divider';
import Heading from '../components/Heading';
import ServicesCard from '../components/ServicesCard';
import PaymentMethodImages from '../components/PaymentMethodImages';
import {
  borderRadius,
  iconSizes,
  paddingAll,
  pageNames,
  spacingValues,
} from '../constants/ui';
import {
  airportFastTrackOptions,
  countryOptions,
  processingTimeOptions,
  purposeOptions,
  typeOptions,
} from '../constants/dropDownOptions';
import {
  updateFees,
  updateFeesSelectedCountry,
  updateStepOne,
} from '../redux/actions';
import { getFeesByCountryId } from '../utils/apiClient';
import { fees } from '../constants/fees';
import { reducerNames } from '../constants/reducerNames';

const reasons = [
  {
    icon: 'lady.svg',
    text: '24/7 Customer Service',
    description: 'We reply to all enquiries and messages within 5 minutes.',
  },
  {
    icon: 'development.svg',
    text: 'Confidentiality',
    description:
      'All information provided to us will be kept confidential and secured.',
  },
  {
    icon: 'stopwatch.svg',
    text: 'Speed',
    description: 'All applications will be processed in 1 working day or less.',
  },
];

const steps = [
  {
    text: '5 minutes to finish your application',
    description:
      'Fill in our secured online application. You are required to enter the precise information which appears on your passport.',
  },
  {
    text: 'Secured online payment',
    description:
      'You can securely make payment through PayPal. We accept Visa, MasterCard, American Express and Discover cards',
  },
  {
    text: 'Approval Result within 24 hours',
    description:
      'Check your email for your approval letter. Please follow the instructions to prepare all your supporting documents.',
  },
];

const usCountryId = _get(_find(countryOptions, { iso: 'US' }), 'value', 226);

type Props = {
  countryId: number,
  stepOne: Object,
  updateStepOne: Object => void,
  updateFees: (Array<Object>) => void,
  updateFeesSelectedCountry: number => void,
  fees: Array<Object>,
};
type State = {
  countryId: number | string,
  purpose: string,
  type: string,
  processingTime: string,
  extraServices: Object,
  totalFee: number,
  activeStepIndex: number,
};
class Home extends React.Component<Props, State> {
  swiper = null;

  state = {
    countryId: '',
    purpose: purposeOptions[0].value,
    type: typeOptions[0].value,
    processingTime: processingTimeOptions[0].value,
    extraServices: {
      fastTrack: '',
      carPickup: '',
      privateVisaLetter: false,
    },
    totalFee: 0,
    activeStepIndex: 1,
  };

  navigateToApply = () => {
    Router.push(pageNames.apply);
  };

  updateCountryId = (event: Object, selectedOption: Object) => {
    if (selectedOption) {
      this.setState(
        {
          countryId: selectedOption.value,
        },
        () => {
          this.updateStepOneToStore();
          this.props.updateFeesSelectedCountry(selectedOption.value);
          getFeesByCountryId(
            { countryId: selectedOption.value },
            this.updateFees,
          );
        },
      );
    } else {
      this.setState({
        countryId: 0,
      });
    }
  };

  updateFees = data => {
    this.props.updateFees(data);
  };

  updatePurpose = (event: Object, selectedOption: Object) => {
    return this.setState(
      {
        purpose: selectedOption ? selectedOption.value : '',
      },
      () => this.updateStepOneToStore(),
    );
  };

  updateType = (event: Object, selectedOption: Object) =>
    this.setState(
      {
        type: selectedOption ? selectedOption.value : '',
      },
      () => this.updateStepOneToStore(),
    );

  updateProcessingTime = (event: Object, selectedOption: Object) => {
    // Logic note: if choose emergency, fast track is chosen
    this.setState(
      {
        processingTime: selectedOption ? selectedOption.value : '',
        extraServices: {
          ...this.state.extraServices,
          fastTrack:
            selectedOption.value === processingTimeOptions[2].value
              ? airportFastTrackOptions[1].value
              : '',
        },
      },
      () => this.updateStepOneToStore(),
    );
  };

  updateStepOneToStore = () => {
    this.props.updateStepOne({
      countryId: this.state.countryId,
      purpose: this.state.purpose,
      type: this.state.type,
      processingTime: this.state.processingTime,
      extraServices: this.state.extraServices,
    });
  };

  componentDidMount() {
    this.syncPropsToState(this.props, true);
    logPageView();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.stepOne !== nextProps.stepOne) {
      this.syncPropsToState(nextProps);
    }
  }

  syncPropsToState = (nextProps: Props, isForced?: boolean) => {
    if (isForced || this.props.stepOne !== nextProps.stepOne) {
      this.setState({
        countryId: _get(nextProps, 'stepOne.countryId', ''),
        type: _get(nextProps, 'stepOne.type', typeOptions[0].value),
        purpose: _get(nextProps, 'stepOne.purpose', purposeOptions[0].value),
        processingTime: _get(
          nextProps,
          'stepOne.processingTime',
          processingTimeOptions[0].value,
        ),
        extraServices: _get(nextProps, 'stepOne.extraServices', {}),
      });
    }

    if (isForced || this.props.countryId !== nextProps.countryId) {
      this.setState({
        countryId: nextProps.countryId,
      });
    }

    this.calculateTotalFee();
  };

  calculateTotalFee = () => {
    const { purpose, type, processingTime, extraServices } = this.state;

    const fees = _get(this, 'props.fees', []).find(
      fees => fees.type === purpose,
    );
    const processingTimeObject = processingTimeOptions.find(
      option => option.value === processingTime,
    );
    const fastTrackObject = airportFastTrackOptions.find(
      option => option.value === extraServices.fastTrack,
    );

    const costPerPerson = fees && fees[type] > 0 ? fees[type] : 0;
    const processingFees = _get(processingTimeObject, 'price', 0);
    const extraFees = _get(fastTrackObject, 'price', 0);

    const totalFee = costPerPerson + processingFees + extraFees;

    this.setState({
      totalFee,
    });
  };

  render() {
    const {
      countryId,
      type,
      processingTime,
      purpose,
      totalFee,
      activeStepIndex,
    } = this.state;
    const swiperParams = {
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      spaceBetween: 30,
      loop: true,
      grabCursor: true,
      on: {
        slideChange: () => {
          if (this.swiper) {
            let { activeIndex } = this.swiper;
            if (activeIndex > steps.length) {
              activeIndex = activeIndex - steps.length;
            }
            this.setState({
              activeStepIndex: activeIndex,
            });
          }
        },
      },
    };

    // Only support 6 months & 1 year visa for United States applicants
    const typeOptionsByPurpose =
      countryId === usCountryId ? typeOptions : typeOptions.slice(0, 4);

    return (
      <Fragment>
        <ContentMaxWidth backgroundImage="url('../static/images/bg-banner.jpg')">
          <Flexbox paddingVertical={10} responsiveLayout alignItems="center">
            <Flexbox column {...paddingAll} maxWidth={150}>
              <Heading
                color="white"
                text="Easiest way to get Vietnam Visa."
                textAlign="left"
              />
              <Text color="white" paddingBottom={7}>
                Visa application can be intimidating to everyone and bothersome
                to even the most seasoned travelers. If you are traveling to
                Vietnam, let evisa-vn take care of all the hassles. Get your
                visa in just 3 simple steps with evisa-vn, so you would have
                more time planning your trips.
              </Text>
            </Flexbox>
            <Flexbox
              column
              backgroundColor="bgGrey2"
              borderRadius={borderRadius}
              overflow="hidden"
              width="100%"
              maxWidth={100}
              boxShadow
            >
              <Form
                onSubmit={this.navigateToApply}
                style={{
                  width: '100%',
                }}
              >
                <Flexbox {...paddingAll} column>
                  <Text fontSize="m" textAlign="center">
                    How much does it cost?
                  </Text>
                  <Form.Field required>
                    <label>Country</label>
                    <Dropdown
                      value={countryId}
                      placeholder="Select..."
                      fluid
                      search
                      selection
                      options={countryOptions}
                      onChange={this.updateCountryId}
                    />
                  </Form.Field>
                  <Form.Field required>
                    <label>Purpose of Visa</label>
                    <Dropdown
                      value={purpose}
                      placeholder="Select..."
                      fluid
                      search
                      selection
                      options={purposeOptions}
                      onChange={this.updatePurpose}
                    />
                  </Form.Field>
                  <Form.Field required>
                    <label>Type of Visa</label>
                    <Dropdown
                      value={type}
                      placeholder="Select..."
                      fluid
                      search
                      selection
                      options={typeOptionsByPurpose}
                      onChange={this.updateType}
                    />
                  </Form.Field>
                  <Form.Field required>
                    <label>Processing Time</label>
                    <Dropdown
                      value={processingTime}
                      placeholder="Select..."
                      fluid
                      search
                      selection
                      options={processingTimeOptions}
                      onChange={this.updateProcessingTime}
                    />
                  </Form.Field>

                  <Flexbox
                    backgroundColor="darkBlue"
                    paddingHorizontal={3}
                    paddingVertical={2}
                    justifyContent="space-between"
                  >
                    <Text color="white">Total Fee</Text>
                    <Text bold color="white">
                      ${totalFee} / Person
                    </Text>
                  </Flexbox>
                </Flexbox>

                <Button type="submit" width="100%" borderRadius={0}>
                  Apply Now!
                </Button>
              </Form>
            </Flexbox>
          </Flexbox>
        </ContentMaxWidth>

        <ContentMaxWidth>
          <Flexbox
            paddingVertical={spacingValues.blockPaddingTop}
            column
            width="100%"
          >
            <Heading text="Why evisa-vn?" />
            <Flexbox responsiveLayout>
              {reasons.map((reason, index) => (
                <Card key={index} flex={1}>
                  <Flexbox key={index} flex={1} column>
                    <Flexbox>
                      <Image
                        src={`../static/icons/${reason.icon}`}
                        alt={reason.text}
                        width={iconSizes.default}
                      />
                    </Flexbox>
                    <Text fontSize="m" semibold>
                      {reason.text}
                    </Text>
                    <Divider small />
                    <Text paddingTop={6}>{reason.description}</Text>
                  </Flexbox>
                </Card>
              ))}
            </Flexbox>
          </Flexbox>
        </ContentMaxWidth>

        <ContentMaxWidth>
          <Flexbox
            column
            alignItems="center"
            maxWidth={160}
            paddingBottom={spacingValues.blockPaddingTop}
          >
            <Heading text="Money-back Guarantee" color="green" />
            <Heading
              text="All service fee will be reimbursed in case your application is rejected."
              secondary
            />
          </Flexbox>
        </ContentMaxWidth>

        <ContentMaxWidth backgroundColor="darkBlue">
          <Flexbox
            paddingVertical={spacingValues.blockPaddingTop}
            column
            width="100%"
          >
            <Flexbox paddingBottom={3} column>
              <Heading text="How to Apply?" color="white" />
            </Flexbox>
            <Flexbox responsiveLayout paddingVertical={10} width="100%">
              <Flexbox flex={1} alignItems="center" justifyContent="center">
                <Flexbox maxWidth={100} maxHeight={100}>
                  <Swiper
                    {...swiperParams}
                    ref={node => {
                      if (node) {
                        this.swiper = node.swiper;
                      }
                    }}
                  >
                    <Image src={`../static/images/s-1.png`} alt="step 1" />
                    <Image src={`../static/images/s-2.png`} alt="step 2" />
                    <Image src={`../static/images/s-3.png`} alt="step 3" />
                  </Swiper>
                </Flexbox>
              </Flexbox>
              <Flexbox flex={1} column>
                {steps.map((step, index) => {
                  const active = activeStepIndex === index + 1;
                  return (
                    <Flexbox
                      key={index}
                      alignItems="center"
                      paddingVertical={5}
                    >
                      <Flexbox
                        alignSelf="stretch"
                        alignItems="center"
                        hoverBackgroundColor="transparent"
                      >
                        <Flexbox
                          alignItems="center"
                          justifyContent="center"
                          width={10}
                          height={10}
                          borderRadius={25}
                          backgroundColor={active ? 'green' : 'bgGrey'}
                        >
                          <Text
                            color={active ? 'white' : 'mediumBlue'}
                            bold
                            fontSize="l"
                          >
                            {index + 1}
                          </Text>
                        </Flexbox>
                      </Flexbox>
                      <Flexbox column paddingLeft={5}>
                        <Flexbox alignItems="center">
                          <Text color="green" fontSize="m">
                            {step.text}
                          </Text>
                        </Flexbox>
                        <Text color="white">{step.description}</Text>
                      </Flexbox>
                    </Flexbox>
                  );
                })}
              </Flexbox>
            </Flexbox>

            <Flexbox justifyContent="center" width="100%">
              <Button width="50%" onClick={this.navigateToApply}>
                Apply Now!
              </Button>
            </Flexbox>
          </Flexbox>
        </ContentMaxWidth>

        <ServicesCard />

        <PaymentMethodImages />

        <Flexbox paddingBottom={30} />
      </Fragment>
    );
  }
}

const mapStateToProps = store => {
  return {
    countryId: _get(store, 'fees.countryId', null),
    stepOne: _get(store, 'form.stepOne', {}),
    fees: store[reducerNames.fees].fees,
  };
};
const mapDispatchToProps = {
  updateStepOne,
  updateFees,
  updateFeesSelectedCountry,
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
