// @flow
// vendor
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
// styles
import 'semantic-ui-css/components/dropdown.min.css'; // for Dropdown
import 'semantic-ui-css/components/transition.min.css'; // for Dropdown
import 'semantic-ui-css/components/flag.min.css'; // for Dropdown
import 'semantic-ui-css/components/form.min.css';
import 'semantic-ui-css/components/checkbox.min.css';
import 'semantic-ui-css/components/input.min.css';
import 'semantic-ui-css/components/step.min.css';
import 'semantic-ui-css/themes/default/assets/fonts/icons.eot';
import 'semantic-ui-css/themes/default/assets/fonts/icons.woff';
import 'semantic-ui-css/themes/default/assets/fonts/icons.woff2';
import 'semantic-ui-css/components/icon.min.css'; // for DateInput
import 'semantic-ui-css/components/table.min.css'; // for DateInput
import 'semantic-ui-css/components/popup.min.css'; // for DateInput
import 'semantic-ui-calendar-react/dist/css/calendar.min.css'; // for DateInput
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

          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
          <meta name="application-name" content="evisa-vn.com" />
          <meta name="theme-color" content="#2C3F60" />
          <meta
            name="description"
            content="Trusted and instant Vietnam visa services best price guarantee. 24/7 customer support"
          />
          <meta
            name="keywords"
            content="vietnam, visa, best, price, guarantee, trusted, fast, services, service, urgent, 30, minutes, mins, convenient, fees, fee"
          />

          <link
            rel="icon"
            sizes="16x16"
            type="image/png"
            href="../static/favicon/favicon_16x16.png"
          />
          <link
            rel="icon"
            sizes="32x32"
            type="image/png"
            href="../static/favicon/favicon_32x32.png"
          />
          <link
            rel="icon"
            sizes="64x64"
            type="image/png"
            href="../static/favicon/favicon_64x64.png"
          />
          <link
            rel="icon"
            sizes="128x128"
            type="image/png"
            href="../static/favicon/favicon_128x128.png"
          />
          <link rel="shortcut icon" href="../static/favicon/favicon.ico" />

          <link href="../static/styles/sanitize.css" rel="stylesheet" />
          <link href="../static/styles/nprogress.css" rel="stylesheet" />
          <link
            href="https://fonts.googleapis.com/css?family=Rubik:400,500,700"
            rel="stylesheet"
          />
          {/* bundle all css imports on top */}
          <link rel="stylesheet" href="/_next/static/style.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
