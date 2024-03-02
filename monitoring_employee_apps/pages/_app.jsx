import React from "react";
import Head from "next/head";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "../styles/global.css";

const app = ({ Component, pageProps }) => {
	return (
		<div>
			<Head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, maximum-scale=1"
				/>
				<title>Monitoring Employee Attendance Apps</title>
			</Head>
			<ToastContainer autoClose={5000} />
			<Component {...pageProps} />
		</div>
	);
};

export default app;
