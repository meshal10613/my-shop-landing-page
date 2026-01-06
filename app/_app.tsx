import { Provider } from "react-redux";
import { store } from "@/store";
import React from "react";
import { AppProps } from "next/app";

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    );
};

export default MyApp;
