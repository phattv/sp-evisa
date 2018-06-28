// @flow
// vendor
import React from 'react';
import { Provider } from 'react-redux';
import App, { Container } from 'next/app';
import withRedux from 'next-redux-wrapper';
// custom
import Layout from '../components/Layout';
import { initGA } from '../utils/analytics';
import { configureStore } from '../redux/store';

class MyApp extends App {
  componentDidCatch(error, errorInfo) {
    console.log('CUSTOM ERROR HANDLING', error);
    // This is needed to render errors correctly in development / production
    super.componentDidCatch(error, errorInfo);
  }

  componentDidMount() {
    /**
     * Load third-party services on production mode only
     * - Google Analytics
     * - Crisp (chat)
     * - Rollbar (error tracking)
     */
    if (process.env.NODE_ENV === 'production') {
      if (!window.GA_INITIALIZED) {
        initGA();
        window.GA_INITIALIZED = true;
      }
      require('../static/crisp');
      require('../static/rollbar');
    }
  }

  render() {
    const { Component, pageProps, store } = this.props;

    return (
      <Container>
        <Provider store={store}>
          <Layout>
            <style jsx global>{`
              body {
                font-family: 'Rubik', -apple-system, system-ui,
                  BlinkMacSystemFont, 'SegoeUI', 'Roboto', 'Helvetica Neue',
                  'Arial', 'sans-serif';
                font-size: 16px;
              }
            `}</style>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </Container>
    );
  }
}

export default withRedux(configureStore)(MyApp);
