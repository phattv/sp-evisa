// @flow
// vendor
import React from 'react';
import { Form, Dropdown, Input } from 'semantic-ui-react';
import { connect } from 'react-redux';
// custom
import { Button, Flexbox, Text } from './ui';
// import ApplyFormStepTwoForm from './ApplyFormStepTwoForm';
import { resetStepTwo, updateStepTwo } from '../redux/actions';
import { reducerNames } from '../constants/reducerNames';
import { airportOptions } from '../constants/dropDownOptions';
import Divider from './Divider';

type Props = {
  onSubmit: () => void,
  stepOne: Object,
  stepTwo: Object,
  updateStepTwo: Object => void,
  resetStepTwo: () => void,
  goBack: () => void,
};
type State = {
  quantity: number | string,
  airport: string,
  arrivalDate: string | Date,
  departureDate: string | Date,
  shouldShowErrorMessage: boolean,
};
class ApplyFormStepTwo extends React.Component<Props, State> {
  state = {
    quantity: 1,
    airport: airportOptions[0].value,
    arrivalDate: '',
    departureDate: '',
    shouldShowErrorMessage: false,
  };

  onSubmit = () => {
    const { stepTwo } = this.props;
    const indexes = Object.keys(stepTwo);
    if (indexes.length > 0) {
      let isFillInValues = [];
      indexes.forEach(index => {
        isFillInValues.push(stepTwo[index].isFilledIn);
      });

      // show error
      if (isFillInValues.includes(false)) {
        this.setState({
          shouldShowErrorMessage: true,
        });
      } else {
        // continue to step 3
        const { onSubmit } = this.props;
        onSubmit && onSubmit();
      }
    }
  };

  goBack = () => {
    const { resetStepTwo, goBack } = this.props;
    // resetStepTwo();
    goBack();
  };

  updateQuantity = (event: Object) => {
    this.setState(
      {
        quantity: event.target.value,
      },
      () => this.updateStepTwoToStore(),
    );
  };

  updateAirport = (event: Object, selectedOption: Object) => {
    this.setState(
      {
        airport: selectedOption ? selectedOption.value : '',
      },
      () => this.updateStepTwoToStore(),
    );
  };

  updateStepTwoToStore = () => {
    this.props.updateStepTwo(this.state);
  };

  render() {
    const { stepOne: { country } } = this.props;
    const {
      quantity,
      airport,
      arrivalDate,
      departureDate,
      shouldShowErrorMessage,
    } = this.state;

    const applicants = [];
    for (let index = 0; index < quantity; index++) {
      applicants.push(index);
    }

    return (
      <Form
        onSubmit={this.onSubmit}
        style={{
          width: '100%',
        }}
      >
        <Flexbox paddingBottom={3} column>
          <Text fontSize="m">Applicants</Text>
          <Divider />
        </Flexbox>

        <Form.Field required>
          <label>Number of Applicants</label>
          <Input
            value={quantity}
            type="number"
            min={1}
            onChange={this.updateQuantity}
            placeholder="Enter..."
          />
        </Form.Field>
        <Form.Field required>
          <label>Airport</label>
          <Dropdown
            value={airport}
            placeholder="Select..."
            fluid
            search
            selection
            options={airportOptions}
            onChange={this.updateAirport}
          />
        </Form.Field>
      </Form>
    );
  }
}

const mapStateToProps = store => {
  return {
    stepOne: store[reducerNames.form].stepOne,
    stepTwo: store[reducerNames.form].stepTwo,
  };
};
const mapDispatchToProps = {
  updateStepTwo,
  resetStepTwo,
};
export default connect(mapStateToProps, mapDispatchToProps)(ApplyFormStepTwo);
