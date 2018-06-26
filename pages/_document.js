// @flow
// vendor
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
// custom

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />),
    );
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }

  render() {
    return (
      <html>
        <Head>
          {/* TODO: dynamic title */}
          <title>evisa-vn - Trusted & Instant Vietnam Visa Service</title>
          {this.props.styleTags}

          <meta charSet="utf-8" />
          <meta name="application-name" content="evisa-vn.com" />
          <meta name="theme-color" content="#0061B1" />
          <meta
            name="description"
            content="Trusted and instant Vietnam visa services best price guarantee. 24/7 customer support"
          />
          <meta
            name="keywords"
            content="vietnam, visa, best, price, guarantee, trusted, fast, services, service, urgent, 30, minutes, mins, convenient, fees, fee"
          />

          <link href="../static/styles/sanitize.css" rel="stylesheet" />
          <link href="../static/styles/nprogress.css" rel="stylesheet" />
          <link
            href="https://fonts.googleapis.com/css?family=Rubik:400,700"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
