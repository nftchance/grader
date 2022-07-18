import { Suspense } from 'react';
import { Link, Route, Routes } from 'react-router-dom';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Button } from '@mui/material';

import { Helmet, HelmetProvider } from 'react-helmet-async';

import loadable from "@loadable/component";

import logo from "./images/logo.png";

import Loading from "./Loading/Loading";

import SEO_CONSTANTS from "./SEO/constants";

import './App.css';

const LoadableTool = loadable(() => import("./Tool/Tool"), { fallback: <Loading /> })
const LoadableFAQ = loadable(() => import("./FAQ/FAQ"), { fallback: <Loading /> })
const LoadableOpenGraph = loadable(() => import("./OpenGraph/OpenGraph"), { fallback: <Loading /> })
const LoadableEgg = loadable(() => import("./Egg/Egg"), { fallback: <Loading /> })
const LoadableRanker = loadable(() => import("./Ranker/Ranker"), { fallback: <Loading /> })

const theme = createTheme({
	palette: {
		primary: { main: "#fff" },
		secondary: { main: "#fff" }
	},
	shape: { borderRadius: 0 }
});

function App() {
	return (
		<HelmetProvider>
			<ThemeProvider theme={theme}>
				<Helmet>
					<title>{SEO_CONSTANTS.home.title}</title>
					<meta name="og:title" content={SEO_CONSTANTS.home.title} />
					<meta name="og:description" content={SEO_CONSTANTS.home.title} />

					<meta name="description" content={SEO_CONSTANTS.home.description} />
					<meta name="og:description" content={SEO_CONSTANTS.home.description} />
					<meta name="twitter:description" content={SEO_CONSTANTS.home.description} />

					<meta property="og:url" content={`${window.location.href}`} />
				</Helmet>

				<div className="container">
					<div className="navbar">
						<Link to="/" className="brand"><img src={logo} alt="navbar logo" /></Link>

						<Button
							component={Link}
							to="faq/"
						>FAQ</Button>
						<Button
							component={Link}
							to="ranker/"
						>Ranker</Button>
						{/* <div className={`theme-controls ${theme}`} /> */}
					</div>
				</div>

				<Routes>
					<Route exact path="/" element={<LoadableTool />} />
					<Route path="faq/" element={<LoadableFAQ />} />
					<Route path="ranker/" element={<LoadableRanker />} />
					<Route path="opengraph/" element={<LoadableOpenGraph />} />
					<Route path="egg/" element={<LoadableEgg />} />
				</Routes>

				<div className="container">
					<div className="footer">
						<a href="/">
							<img src={logo} alt="footer logo" />
						</a>

						<p>
							A solution by <a
								href="https://twitter.com/nftchance/"
								target="_blank"
								rel="noreferrer">CHANCE</a>.
						</p>
					</div>
				</div>
			</ThemeProvider >
		</HelmetProvider>
	);
}

export default App;
