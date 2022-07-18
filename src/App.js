import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Helmet } from 'react-helmet-async';

import { Button } from '@mui/material';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fal } from '@fortawesome/pro-light-svg-icons'

import Router from "./Router/Router";
import SEO_CONSTANTS from "./SEO/constants";

import logo from "./images/logo.png";

import './App.css';

library.add(fab, fal)

function App() {
	const [navbarOpen, setNavbarOpen] = useState(false);

	const handleNavbarOpenChange = () => {
		setNavbarOpen(!navbarOpen);
	}

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

					<div className="sidebar-toggle">
						<Button sx={{ marginLeft: "auto" }} onClick={handleNavbarOpenChange}>
							<FontAwesomeIcon icon={['fal', 'bars']} />
						</Button>
					</div>

					<div className={navbarOpen ? 'sidebar open' : 'sidebar'}>
						<Button
							component={Link}
							to="faq/"
						>FAQ</Button>
						<Button
							component={Link}
							to="ranker/"
						>Ranker</Button>
					</div>

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
