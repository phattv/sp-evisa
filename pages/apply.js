// @flow
// vendor
import * as React from 'react';
import Select from 'react-select';
import { Form, Field } from 'react-final-form';
import map from 'lodash/map';
// custom
import {
  Layout,
  Content,
  Text,
  Flexbox,
  Button,
  Image,
  Input,
} from '../components';

const purposesOfVisit = {
  tourist: 'tourist',
  business: 'business',
  student: 'student',
  transit: 'transit',
};
const visaTypes = {
  [purposesOfVisit.tourist]: {
    oneMonthSingle: '1 month single entry',
    oneMonthMultiple: '1 month multiple entry',
  },
  [purposesOfVisit.business]: {
    threeMonthSingle: '3 month single entry',
    threeMonthMultiple: '3 month multiple entry',
  },
  [purposesOfVisit.student]: {
    student: 'Student visa'
  },
  [purposesOfVisit.transit]: {
    fiveDays: '5 days single entry'
  }
}

type Props = {};
type State = {};

class ApplyVisaOnline extends React.Component<Props, State> {
  constructor(props: Object) {
    super(props);
  }

  static defaultProps: Props = {};

  state = {
    quantity: 0,
    type: '',
  };

  onSubmit = values => {
    window.alert(JSON.stringify(values, 0, 2));
  };

  updateTypesOfVisa = event => {
    this.setState({
      visaTypes: visaTypes[event.target.value]
    })
  };

  render() {
    const { visaTypes } = this.state

    const { quantity, type, processingTime, purpose } = this.state;

    return (
      <Layout>
        <Content>
          {/*<Form*/}
            {/*onSubmit={this.onSubmit}*/}
            {/*initialValues={{*/}
              {/*employed: true,*/}
              {/*purposeOfVisit: purposesOfVisit.tourist,*/}
            {/*}}*/}
            {/*render={({ handleSubmit, reset, submitting, pristine, values }) => (*/}
              {/*<form onSubmit={handleSubmit}>*/}
                {/*<div>*/}
                  {/*<Text bold>NUMBER OF APPLICANTS</Text>*/}
                  {/*<Field*/}
                    {/*name="noOfApplicants"*/}
                    {/*component="input"*/}
                    {/*type="number"*/}
                    {/*placeholder="1"*/}
                  {/*/>*/}
                {/*</div>*/}
                {/*<div>*/}
                  {/*<Text bold>PURPOSE OF VISIT</Text>*/}
                  {/*<Field*/}
                    {/*name="purposeOfVisit"*/}
                    {/*component="select"*/}
                    {/*onChange={this.updateTypesOfVisa}*/}
                  {/*>*/}
                    {/*{map(purposesOfVisit, (purpose, index) => (*/}
                      {/*<option key={index} value={purpose}>*/}
                        {/*{purpose}*/}
                      {/*</option>*/}
                    {/*))}*/}
                  {/*</Field>*/}
                {/*</div>*/}
                {/*<div>*/}
                  {/*<Text bold>TYPE OF VISA</Text>*/}
                  {/*<Field name="purposeOfVisit" component="select">*/}
                    {/*{map(visaTypes, (type, index) =>*/}
                      {/*<option key={index} value={type}>*/}
                        {/*{type}*/}
                      {/*</option>*/}
                    {/*)}*/}
                  {/*</Field>*/}
                {/*</div>*/}

                {/**/}

                {/*<div className="buttons">*/}
                  {/*<button type="submit" disabled={submitting || pristine}>*/}
                    {/*Submit*/}
                  {/*</button>*/}
                  {/*<button*/}
                    {/*type="button"*/}
                    {/*onClick={reset}*/}
                    {/*disabled={submitting || pristine}*/}
                  {/*>*/}
                    {/*Reset*/}
                  {/*</button>*/}
                {/*</div>*/}
                {/*<pre>{JSON.stringify(values, 0, 2)}</pre>*/}
              {/*</form>*/}
            {/*)}*/}
          {/*/>*/}
          <Flexbox
            flex={1}
            border
            borderColor="visaBlue"
            backgroundColor="lightGrey"
            borderRadius
          >
            <Form paddingVertical={6} paddingHorizontal={6}>
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
                  placeholder="1 applicant"
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
                  value={type}
                  placeholder="Normal (Guaranteed 1 working)"
                  onChange={this.updateProcessingTime}
                  options={processingTimeOptions}
                />
              </Flexbox>
              <Flexbox alignItems="flex-start" paddingTop={5} column>
                <Text bold>PURPOSE OF VISA</Text>
                <Select
                  value={type}
                  placeholder="Tourism"
                  onChange={this.updatePurpose}
                  options={purposeOptions}
                />
              </Flexbox>

              <Flexbox paddingTop={4} justifyContent="space-between">
                <Text bold>Service Fee: </Text>
                <Text bold>{`${quantity} x $18 = $${serviceFee}`}</Text>
              </Flexbox>
              <Flexbox paddingTop={4} justifyContent="space-between">
                <Text bold>Processing Fee: </Text>
                <Text bold>{`${quantity} x $0 = $${processingFee}`}</Text>
              </Flexbox>

              <Flexbox paddingTop={4} justifyContent="space-between">
                <Text bold>TOTAL SERVICE FEE:</Text>
                <Text bold>${serviceFee + processingFee}</Text>
              </Flexbox>

              <Button solid marginTop={5}>
                APPLY NOW
              </Button>
            </Form>
          </Flexbox>
        </Content>
      </Layout>
    );
  }
}

export default ApplyVisaOnline;
