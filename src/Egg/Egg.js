import { Helmet } from "react-helmet-async"
import Page from "../Page/Page"

import SEO_CONSTANTS from "../SEO/constants"

import "./Egg.css"

const Egg = () => {
    return (
        <Page>
            <div className="container">
                <Helmet>
                    <title>{SEO_CONSTANTS.egg.title}</title>
                    <meta name="og:title" content={SEO_CONSTANTS.egg.title} />
                    <meta name="og:description" content={SEO_CONSTANTS.egg.title} />

                    <meta name="description" content={SEO_CONSTANTS.egg.description} />
                    <meta name="og:description" content={SEO_CONSTANTS.egg.description} />
                    <meta name="twitter:description" content={SEO_CONSTANTS.egg.description} />
                </Helmet>

                <div className="content animated">
                    <h1>"His (Dr.Parry) conclusion is that the complexity of the problem of color harmony is such that any attempt to explain it by a single principle, seems foredoomed to failure."</h1>

                    <h2><em>- Milton Bond (1942)</em></h2>
                </div>
            </div>
        </Page>
    )
}

export default Egg