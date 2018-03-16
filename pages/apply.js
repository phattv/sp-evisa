// @flow
// vendor
import * as React from 'react';
import Select from 'react-select';
import { Form, Field } from 'react-final-form';
import { Div, Input, Button } from 'glamorous';
// custom
import { Layout, Content, Text, Flexbox } from '../components';
import { colors, borderRadius, spacingValues } from '../constants/ui';

const typeOptions = [
  { value: '1 month single', label: '1 month single' },
  { value: '1 month multiple', label: '1 month multiple' },
  { value: '3 months single', label: '3 months single' },
  { value: '3 months multiple', label: '3 months multiple' },
  { value: '6 months multiple', label: '6 months multiple' },
  { value: '1 year multiple', label: '1 year multiple' },
];
const purposeOptions = [
  { value: 'tourist', label: 'Tourist' },
  { value: 'business', label: 'Business' },
];
const processingTimeOptions = [
  { value: 'normal', label: 'Normal' },
  {
    value: 'urgent',
    label: 'Urgent (guaranteed 4-8 working hours)',
  },
  {
    value: 'emergency',
    label: 'Emergency (guaranteed 1 working hour)',
  },
  { value: 'overtime', label: 'Overtime' },
  { value: 'holiday', label: 'Holiday' },
];
const airportOptions = [
  {
    value: 'SGN',
    label: 'Tan Son Nhat International Airport (Ho Chi Minh City)',
  },
  { value: 'HAN', label: 'Noi Bai International Airport (Ha Noi)' },
  { value: 'DAD', label: 'Da Nang International Airport' },
  { value: 'CRX', label: 'Cam Ranh International Airport (Khanh Hoa)' },
];

type Props = {};
type State = {
  quantity: number | string,
  type: string,
  purpose: string,
  processingTime: string,
  airport: string,
  arrivalDate: string,
};
class ApplyVisaOnline extends React.Component<Props, State> {
  state = {
    quantity: 0,
    type: typeOptions[0].value,
    purpose: purposeOptions[0].value,
    processingTime: processingTimeOptions[0].value,
    airport: airportOptions[0].value,
    arrivalDate: '',
  };

  onSubmit = (values: Object) => {
    window.alert(JSON.stringify(values, null, 2));
  };

  updateQuantity = (event: Object) =>
    this.setState({
      quantity: event.target.value,
    });

  updateType = (selectedOption: Object) =>
    this.setState({
      type: selectedOption ? (selectedOption ? selectedOption.value : '') : '',
    });

  updateProcessingTime = (selectedOption: Object) =>
    this.setState({
      processingTime: selectedOption ? selectedOption.value : '',
    });

  updatePurpose = (selectedOption: Object) =>
    this.setState({
      purpose: selectedOption ? selectedOption.value : '',
    });

  updateAirport = (selectedOption: Object) =>
    this.setState({
      airport: selectedOption ? selectedOption.value : '',
    });

  updateArrivalDate = (event: Object) => {
    this.setState({
      arrivalDate: event.target.value
    })
  }

  render() {
    const {
      quantity,
      type,
      processingTime,
      purpose,
      airport,
      arrivalDate,
    } = this.state;

    return (
      <Layout>
        <Content>
          <Div
            display="flex"
            flex={1}
            border={`3px solid ${colors.visaBlue}`}
            backgroundColor={colors.lightGrey}
            borderRadius={borderRadius}
            padding={spacingValues.xl}
          >
            <Form
              onSubmit={this.onSubmit}
              render={({ handleSubmit, pristine, invalid }) => (
                <Flexbox alignItems="flex-start" flex={1}>
                  <Flexbox
                    flex={1}
                    column
                    alignItems="flex-start"
                    marginRight={spacingValues.xs}
                  >
                    <Flexbox
                      alignItems="flex-start"
                      paddingBottom={5}
                      column
                      width="100%"
                    >
                      <Text bold>NUMBER OF APPLICANT</Text>
                      <Input
                        backgroundColor="white"
                        padding={`${spacingValues.xs}px ${spacingValues.s}px`}
                        borderRadius={borderRadius}
                        border={`1px solid ${colors.lightGrey}`}
                        width="100%"
                        value={quantity}
                        onChange={this.updateQuantity}
                        marginTop={2}
                        type="number"
                        placeholder="1"
                        min={0}
                      />
                    </Flexbox>
                    <Flexbox
                      alignItems="flex-start"
                      paddingBottom={5}
                      column
                      width="100%"
                    >
                      <Text bold>TYPE OF VISA</Text>
                      <Select
                        value={type}
                        placeholder="Select..."
                        onChange={this.updateType}
                        options={typeOptions}
                      />
                    </Flexbox>
                    <Flexbox
                      alignItems="flex-start"
                      paddingBottom={5}
                      column
                      width="100%"
                    >
                      <Text bold>PROCESSING TIME</Text>
                      <Select
                        value={processingTime}
                        placeholder="Normal"
                        onChange={this.updateProcessingTime}
                        options={processingTimeOptions}
                      />
                    </Flexbox>
                    <Flexbox
                      alignItems="flex-start"
                      paddingBottom={5}
                      column
                      width="100%"
                    >
                      <Text bold>PURPOSE OF VISA</Text>
                      <Select
                        value={purpose}
                        placeholder="Select..."
                        onChange={this.updatePurpose}
                        options={purposeOptions}
                      />
                    </Flexbox>
                    <Flexbox
                      alignItems="flex-start"
                      paddingBottom={5}
                      column
                      width="100%"
                    >
                      <Text bold>ARRIVAL AIRPORT</Text>
                      <Select
                        value={airport}
                        placeholder="Select..."
                        onChange={this.updateAirport}
                        options={airportOptions}
                      />
                    </Flexbox>
                    <Flexbox
                      alignItems="flex-start"
                      paddingBottom={5}
                      column
                      width="100%"
                    >
                      <Text bold>ARRIVAL DATE</Text>
                      <Input
                        type="date"
                        value={arrivalDate}
                        backgroundColor="white"
                        padding={`${spacingValues.xs}px ${spacingValues.s}px`}
                        borderRadius={borderRadius}
                        border={`1px solid ${colors.lightGrey}`}
                        width="100%"
                        onChange={this.updateArrivalDate}
                      />
                    </Flexbox>

                    <Button solid marginTop={5}>
                      APPLY NOW
                    </Button>
                  </Flexbox>
                  <Flexbox
                    flex={1}
                    column
                    width="100%"
                    marginLeft={spacingValues.xs}
                  >
                    <Text size="l" bold>
                      REVIEW YOUR ORDER
                    </Text>
                    <Div
                      width="100%"
                      marginTop={spacingValues.m}
                      border={`3px solid ${colors.visaBlue}`}
                      borderRadius={borderRadius}
                      padding={spacingValues.xxl}
                    >
                      <Flexbox paddingBottom={spacingValues.xxs}>
                        <Text color="visaRed" size="l" bold>
                          Your Info
                        </Text>
                      </Flexbox>
                      <Flexbox display="flex" justifyContent="space-between">
                        <Text bold>Number of applicants:</Text>
                        <Text>{quantity}</Text>
                      </Flexbox>
                      <Flexbox display="flex" justifyContent="space-between">
                        <Text bold>Type of visa:</Text>
                        <Text>{type}</Text>
                      </Flexbox>
                      <Flexbox display="flex" justifyContent="space-between">
                        <Text bold>Purpose of visit:</Text>
                        <Text>{purpose}</Text>
                      </Flexbox>
                      <Flexbox display="flex" justifyContent="space-between">
                        <Text bold>Arrival airport:</Text>
                        <Text>{airport}</Text>
                      </Flexbox>
                      <Flexbox display="flex" justifyContent="space-between">
                        <Text bold>Arrival date:</Text>
                        <Text>{arrivalDate}</Text>
                      </Flexbox>
                    </Div>
                  </Flexbox>
                </Flexbox>
              )}
            />
          </Div>
        </Content>
      </Layout>
    );
  }
}

export default ApplyVisaOnline;
