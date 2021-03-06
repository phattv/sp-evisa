// @flow
// vendor
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
// styles
// TODO: css import not working
// import 'semantic-ui-css/components/dropdown.min.css'; // for Dropdown
// import 'semantic-ui-css/components/transition.min.css'; // for Dropdown
// import 'semantic-ui-css/components/flag.min.css'; // for Dropdown
// import 'semantic-ui-css/components/form.min.css';
// import 'semantic-ui-css/components/checkbox.min.css';
// import 'semantic-ui-css/components/input.min.css';
// import 'semantic-ui-css/components/step.min.css';
// import 'semantic-ui-css/themes/default/assets/fonts/icons.eot';
// import 'semantic-ui-css/themes/default/assets/fonts/icons.woff';
// import 'semantic-ui-css/themes/default/assets/fonts/icons.woff2';
// import 'react-id-swiper/src/styles/css/swiper.css'
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
          <title>evisa-vn - Easiest way to get your Vietnam Visa.</title>
          {this.props.styleTags}

          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
          <meta name="application-name" content="evisa-vn" />
          <meta name="theme-color" content="#2C3F60" />
          <meta
            name="description"
            content="Easiest way to get Vietnam Visa, 24/7 Customer Service - Confidentiality - Reliability"
          />
          <meta
            name="keywords"
            content="vietnam, visa, evisa, easy, easiest, best, price, budget, guarantee, trusted, fast, services, service, urgent, 5, minutes, mins, fees, fee, confidentiality, reliability"
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
          <link href="../static/styles/swiper.css" rel="stylesheet" />

          {/* TODO: bundle all css imports on top work only on "next dev", doesn't work on "next export" */}
          {/*<link rel="stylesheet" href="/_next/static/style.css" />*/}

          <link
            href="../static/styles/semantic-ui-css/components/dropdown.min.css"
            rel="stylesheet"
          />
          <link
            href="../static/styles/semantic-ui-css/components/transition.min.css"
            rel="stylesheet"
          />
          <link
            href="../static/styles/semantic-ui-css/components/flag.min.css"
            rel="stylesheet"
          />
          <link
            href="../static/styles/semantic-ui-css/components/form.min.css"
            rel="stylesheet"
          />
          <link
            href="../static/styles/semantic-ui-css/components/checkbox.min.css"
            rel="stylesheet"
          />
          <link
            href="../static/styles/semantic-ui-css/components/input.min.css"
            rel="stylesheet"
          />
          <link
            href="../static/styles/semantic-ui-css/components/step.min.css"
            rel="stylesheet"
          />
          <link
            href="../static/styles/semantic-ui-css/themes/default/assets/fonts/icons.eot"
            rel="stylesheet"
          />
          <link
            href="../static/styles/semantic-ui-css/themes/default/assets/fonts/icons.woff"
            rel="stylesheet"
          />
          <link
            href="../static/styles/semantic-ui-css/themes/default/assets/fonts/icons.woff2"
            rel="stylesheet"
          />
          <link
            href="../static/styles/semantic-ui-css/components/icon.min.css"
            rel="stylesheet"
          />
          <link
            href="../static/styles/semantic-ui-css/components/table.min.css"
            rel="stylesheet"
          />
          <link
            href="../static/styles/semantic-ui-css/components/popup.min.css"
            rel="stylesheet"
          />
          <link href="../static/styles/calendar.min.css" rel="stylesheet" />

          <link href="../static/styles/global.css" rel="stylesheet" />
          <link
            href="https://fonts.googleapis.com/css?family=Rubik:400,500,700"
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
