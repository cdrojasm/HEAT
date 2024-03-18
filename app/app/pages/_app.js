import Head from 'next/head'
import store from '../redux/store';
import { Provider } from 'react-redux';
import { StrictMode } from 'react';
import '../public/css/main.css'
import "@fontsource/roboto"; // Defaults to weight 400
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function MyApp({ Component, pageProps }) {
	const staticPrefix = process.env.staticPrefix;
	return (
		<StrictMode>
			<Head>
				<title>HEAT</title>
				<link rel="icon" href={staticPrefix + "/favicon.ico"} />
			</Head>
			<Provider store={store}>
				<Component {...pageProps} />
			</Provider>
		</StrictMode>
	)
}

export default MyApp