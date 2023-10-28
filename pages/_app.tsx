import { FC } from "react";
import type { AppProps } from "next/app";
import { Provider } from "next-auth/client";
import { Session } from "next-auth";

import "../styles/globals.css";

const MyApp = ({
  Component,
  pageProps,
}: AppProps<{
  session: Session;
}>) => {
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;
