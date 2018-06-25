// @flow
// vendor
import * as React from 'react';
import Head from 'next/head';

// custom
import { Flexbox } from '../components/ui';
import { Header, Footer } from '../components';
import { initGA, logPageView } from '../utils/analytics';
import { colors } from '../constants/ui';

const defaultTitle = 'Trusted & Instant Vietnam Visa Service'
type Props = {
  children: string | React.Node,
  title?: string,
  backgroundColor?: string,
};

export default class Layout extends React.Component<Props> {
  componentDidMount() {
    if (process.env.NODE_ENV === 'production') {
      // Init Google Analytics
      if (!window.GA_INITIALIZED) {
        initGA();
        window.GA_INITIALIZED = true;
      }
      logPageView();

      // Init Crisp
      import('../static/crisp')

      // Enable Rollbar
      import('../static/rollbar')
    }
  }

  render() {
    const { title, backgroundColor, children, ...rest } = this.props;

    return (
      <Flexbox {...rest}>
        <Head>
          <title>{title ? `${defaultTitle} - ${title}` : defaultTitle}</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
          <meta name="application-name" content="evisa-vn.com" />
          <meta name="theme-color" content="#0061B1" />
          <meta name="description" content="Trusted and instant Vietnam visa services best price guarantee. 24/7 customer support" />
          <meta name="keywords" content="vietnam, visa, best, price, guarantee, trusted, fast, services, service, urgent, 30, minutes, mins, convenient, fees, fee"/>

          <link href="../static/styles/sanitize.css" rel="stylesheet" />
          <link href="../static/styles/react-select.css" rel="stylesheet" />
          <link href="../static/styles/font-awesome.min.css" rel="stylesheet" />
          <link href="../static/fonts/fonts.css" rel="stylesheet" />

          <style>
            {`th, td { padding: 10px; border: 1px solid ${
              colors.lightGrey
            }; text-align: center; }`}
          </style>
        </Head>

        <Flexbox column flex={1} minHeight="100vh">
          <Header />

          <Flexbox
            paddingTop={18}
            flex={1}
            width="100%"
            column
            backgroundColor={backgroundColor || null}
            borderRight
            borderLeft
            {...rest}
          >
            {children}
          </Flexbox>

          <Footer />
        </Flexbox>
      </Flexbox>
    );
  }
}
