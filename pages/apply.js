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
const processingTimeOptions = [
  { value: 'normal', label: 'normal' },
  {
    value: 'urgent (guaranteed 4-8 working hours)',
    label: 'urgent (guaranteed 4-8 working hours)',
  },
  {
    value: 'emergency (guaranteed 1 working hour',
    label: 'emergency (guaranteed 1 working hour',
  },
  { value: 'overtime', label: 'overtime' },
  { value: 'holiday', label: 'holiday' },
];
const purposeOptions = [
  { value: 'tourist', label: 'tourist' },
  { value: 'business', label: 'business' },
];

type Props = {};
type State = {
  quantity: number | string,
  type: string,
  processingTime: string,
  purpose: string,
};
class ApplyVisaOnline extends React.Component<Props, State> {
  state = {
    quantity: 0,
    type: '',
    processingTime: '',
    purpose: '',
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
      type: selectedOption.value,
    });

  updateProcessingTime = (selectedOption: Object) =>
    this.setState({
      processingTime: selectedOption.value,
    });

  updatePurpose = (selectedOption: Object) =>
    this.setState({
      purpose: selectedOption.value,
    });

  render() {
    const { quantity, type, processingTime, purpose } = this.state;

    return (
      <Layout>
        <Content>
          <Div
            display="flex"
            flex={1}
            border={`1px solid ${colors.visaBlue}`}
            backgroundColor={colors.lightGrey}
            borderRadius={borderRadius}
            padding={spacingValues.xl}
          >
            <Form
              onSubmit={this.onSubmit}
              render={({ handleSubmit, pristine, invalid }) => (
                <Div>
                  <Flexbox>
                    <Text color="visaRed" size="xl" bold textAlign="center">
                      VIETNAM VISA FORM
                    </Text>
                  </Flexbox>
                  <Flexbox alignItems="flex-start" paddingTop={5} column>
                    <Text bold>NUMBER OF VISA</Text>
                    <Input
                      value={quantity}
                      onChange={this.updateQuantity}
                      marginTop={2}
                      type="number"
                      placeholder="1"
                    />
                  </Flexbox>
                  <Flexbox alignItems="flex-start" paddingTop={5} column>
                    <Text bold>TYPE OF VISA</Text>
                    <Select
                      value={type}
                      placeholder="1 month single"
                      onChange={this.updateType}
                      options={typeOptions}
                    />
                  </Flexbox>
                  <Flexbox alignItems="flex-start" paddingTop={5} column>
                    <Text bold>PROCESSING TIME</Text>
                    <Select
                      value={processingTime}
                      placeholder="Normal (Guaranteed 1 working)"
                      onChange={this.updateProcessingTime}
                      options={processingTimeOptions}
                    />
                  </Flexbox>
                  <Flexbox alignItems="flex-start" paddingTop={5} column>
                    <Text bold>PURPOSE OF VISA</Text>
                    <Select
                      value={purpose}
                      placeholder="Tourism"
                      onChange={this.updatePurpose}
                      options={purposeOptions}
                    />
                  </Flexbox>

                  <Button solid marginTop={5}>
                    APPLY NOW
                  </Button>
                </Div>
              )}
            />
          </Div>
        </Content>
      </Layout>
    );
  }
}

export default ApplyVisaOnline;
