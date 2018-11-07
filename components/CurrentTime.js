import React from 'react';
import dayjs from 'dayjs';
import { Text } from './ui';
import { displayShortDateTimeFormat } from '../constants/ui';

export default class CurrentTime extends React.Component {
  state = {
    time: dayjs(
      Date.now() + new Date().getTimezoneOffset() * 60000 - -420 * 60000, // see tick()
    ).format(displayShortDateTimeFormat),
  };

  componentDidMount() {
    this.intervalID = setInterval(() => this.tick(), 60000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  tick() {
    const browserTime = Date.now();
    const browserOffset = new Date().getTimezoneOffset() * 60000;
    const vietnamOffset = -420 * 60000;
    const currentVietnamTime = browserTime + browserOffset - vietnamOffset; // utc = browserTime + browserOffset

    this.setState({
      time: dayjs(currentVietnamTime).format(displayShortDateTimeFormat),
    });
  }

  render() {
    return <Text fontSize="s">{this.state.time}</Text>;
  }
}
