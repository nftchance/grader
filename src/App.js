import { Link } from 'react-router-dom';

import { Helmet } from 'react-helmet-async';

import { Button } from '@mui/material';

import Router from "./Router/Router";
import SEO_CONSTANTS from "./SEO/constants";

import logo from "./images/logo.png";
import './App.css';

function App() {
	return (
		<>
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

			<Router />

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
		</>
	);
}

export default App;
