import React from "react";
import { AppProps } from "next/app";
import "../app/globals.css";

function NurseRosteringApp({ Component, pageProps }: AppProps) {
  return (
    <main>
      <Component {...pageProps} />
    </main>
  );
}

export default NurseRosteringApp;
