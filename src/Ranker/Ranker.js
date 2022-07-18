import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async"

import { Button } from "@mui/material"

import "./Ranker.css"

const META_TITLE = "RANKER | COLORSPACE"
const META_DESCRIPTION = "Choose between two color palettes and help train the dataset of COLORSPACE!"

const Ranker = () => {
    return (
        <div className="container">
            <Helmet>
                <title>{META_TITLE}</title>
                <meta name="og:title" content={META_TITLE} />
                <meta name="og:description" content={META_TITLE} />

                <meta name="description" content={META_DESCRIPTION} />
                <meta name="og:description" content={META_DESCRIPTION} />
                <meta name="twitter:description" content={META_DESCRIPTION} />
            </Helmet>

            <div className="content animated">
                <h1>COMING SOON</h1>
                <p style={{ marginBottom: 40, marginTop: 10 }}>This section of COLORSPACE has not been revealed. Check back soon.</p>

                <div>
                    <Button
                        component={Link}
                        to="/"
                    >Head Home</Button>
                </div>
            </div>
        </div>
    )
}

export default Ranker 