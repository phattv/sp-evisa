// @flow
// vendor
import * as React from "react";
import Head from "next/head";

// custom
import { Flexbox } from "../components/ui";
import { Header, Footer } from "../components";

type Props = {
  children: string | React.Node,
  title?: string,
  backgroundColor?: string
};

export default class Layout extends React.Component<Props> {
  render() {
    const { title, backgroundColor, children, ...rest } = this.props;

    return (
      <Flexbox {...rest}>
        <Head>
          <title>{title || "Vietam evisa"}</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
          <link href="../static/fonts/fonts.css" rel="stylesheet" />
          <link href="../static/styles/sanitize.css" rel="stylesheet" />
          <link href="../static/styles/react-select.css" rel="stylesheet" />
          <link href="../static/styles/font-awesome.min.css" rel="stylesheet" />
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
