import React from 'react';
import dayjs from 'dayjs';
import { Text } from './ui';
import { displayShortDateTimeFormat } from '../constants/ui';

export default class CurrentTime extends React.Component {
  state = {
    time: dayjs(new Date()).format(displayShortDateTimeFormat),
  };

  componentDidMount() {
    this.intervalID = setInterval(() => this.tick(), 60000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  tick() {
    this.setState({
      time: dayjs(new Date()).format(displayShortDateTimeFormat),
    });
  }

  render() {
    return <Text fontSize="s">{this.state.time}</Text>;
  }
}
