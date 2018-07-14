// @flow
// vendor
import React from 'react';
import Router from 'next/router';
// custom
import { Flexbox, Image } from './ui';
import ContentMaxWidth from './ContentMaxWidth';
import Heading from './Heading';
import { pageNames, spacingValues } from '../constants/ui';

const services = [
  {
    image: 'fast-track.jpg',
    text: 'Airport fast track',
  },
  {
    image: 'pick-up.jpg',
    text: 'Pick up at airport',
  },
  {
    image: 'private-letter.jpg',
    text: 'Private letter',
  },
];

/**
 * ServicesCard show services as Card layout with a background image
 */
type Props = {};
type State = {};
class ServicesCard extends React.Component<Props, State> {
  navigateToServices = () => Router.push(pageNames.services);

  render() {
    return (
      <ContentMaxWidth>
        <Flexbox
          column
          width="100%"
          alignItems="center"
          paddingTop={spacingValues.blockPaddingTop}
        >
          <Heading text="Other services" />
          <Flexbox
            width="100%"
            justifyContent="center"
            alignItems="center"
            paddingTop={6}
            responsiveLayout
          >
            {services.map((service, index) => (
              <Flexbox
                key={index}
                flex={1}
                clickable
                column
                onClick={this.navigateToServices}
                maxWidth={60}
                marginHorizontal={2}
                marginVertical={2}
              >
                <Image
                  src={`../static/images/${service.image}`}
                  alt={service.image}
                  width="100%"
                />
                <Flexbox
                  backgroundColor="white"
                  paddingVertical={3}
                  justifyContent="center"
                >
                  {service.text}
                </Flexbox>
              </Flexbox>
            ))}
          </Flexbox>
        </Flexbox>
      </ContentMaxWidth>
    );
  }
}

export default ServicesCard;
