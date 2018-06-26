// @flow
// vendor
import React from 'react';
import App, { Container } from 'next/app';
// custom
import Layout from '../components/Layout'

export default class MyApp extends App {
  componentDidCatch (error, errorInfo) {
    console.log('CUSTOM ERROR HANDLING', error)
    // This is needed to render errors correctly in development / production
    super.componentDidCatch(error, errorInfo)
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Layout>
          <style jsx global>{`
body {
  font-family: 'Rubik', -apple-system, system-ui, BlinkMacSystemFont, 'SegoeUI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif';
  font-size: 16px;
}
`}</style>
          <Component {...pageProps} />
        </Layout>
      </Container>
    );
  }
}
