import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { Helmet, HelmetProvider } from 'react-helmet-async';

import loadable from "@loadable/component";

import './App.css';

const LoadableOpenGraph = loadable(() => import("./OpenGraph/OpenGraph"), { fallback: "Loading..." })
const LoadableHome = loadable(() => import("./Home/Home"), { fallback: "Loading..." })
const LoadableEgg = loadable(() => import("./Egg/Egg"), { fallback: "Loading..." })

const theme = createTheme({
	palette: {
		primary: { main: "#fff" },
		secondary: { main: "#fff" }
	},
	shape: { borderRadius: 0 }
});

const META_TITLE = "COLORSPACE"
const META_DESCRIPTION = "Explore color palletes in a 2022-focused 3D visualization."

function App() {
	return (
		<HelmetProvider>
			<ThemeProvider theme={theme}>
				<Helmet>
					<title>{META_TITLE}</title>
					<meta name="og:title" content={META_TITLE} />
					<meta name="og:description" content={META_TITLE} />

					<meta name="description" content={META_DESCRIPTION} />
					<meta name="og:description" content={META_DESCRIPTION} />
					<meta name="twitter:description" content={META_DESCRIPTION} />

					<meta property="og:url" content={`${window.location.href}`} />
				</Helmet>

				<Router>
					<Routes>
						<Route exact path="/" element={<LoadableHome />} />
						<Route path="opengraph/" element={<LoadableOpenGraph />} />
						<Route path="egg/" element={<LoadableEgg />} />
					</Routes>
				</Router>
			</ThemeProvider >
		</HelmetProvider>
	);
}

export default App;
