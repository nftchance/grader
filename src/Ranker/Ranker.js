import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async"

import { Button } from "@mui/material"

import SEO_CONSTANTS from "../SEO/constants";

import "./Ranker.css"

const Ranker = () => {
    return (
        <div className="container">
            <Helmet>
                <title>{SEO_CONSTANTS.ranker.title}</title>
                <meta name="og:title" content={SEO_CONSTANTS.ranker.title} />
                <meta name="og:description" content={SEO_CONSTANTS.ranker.title} />

                <meta name="description" content={SEO_CONSTANTS.ranker.description} />
                <meta name="og:description" content={SEO_CONSTANTS.ranker.description} />
                <meta name="twitter:description" content={SEO_CONSTANTS.ranker.description} />
            </Helmet>

            <div className="header">
                <h1>RANKER COMING SOON</h1>
                <p className="lead">This section of COLORSPACE has not been revealed. Check back soon.</p>
            </div>

            <div>
                <Button
                    component={Link}
                    to="/"
                >Head Home</Button>
            </div>
        </div>
    )
}

export default Ranker 