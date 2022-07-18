import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter as Router } from 'react-router-dom';

import { ThemeProvider, createTheme } from '@mui/material/styles';

import App from './App';
import { HelmetProvider } from 'react-helmet-async';

const root = ReactDOM.createRoot(document.getElementById('root'));

const theme = createTheme({
	palette: {
		primary: { main: "#fff" },
		secondary: { main: "#fff" }
	},
	shape: { borderRadius: 0 }
});

root.render(
	<React.StrictMode>
		<Router>
			<HelmetProvider>
				<ThemeProvider theme={theme}>
					<App />
				</ThemeProvider >
			</HelmetProvider>
		</Router>
	</React.StrictMode >
);