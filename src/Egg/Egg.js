import { Helmet } from "react-helmet-async"
import "./Egg.css"

const META_TITLE = "EGG | COLORSPACE"
const META_DESCRIPTION = "His conclusion is that the complexity of the problem of color harmony is such that any attempt to explain it by a single principle, seems foredoomed to failure."

const Egg = () => {
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
                <h1>"His (Dr.Parry) conclusion is that the complexity of the problem of color harmony is such that any attempt to explain it by a single principle, seems foredoomed to failure."</h1>

                <h2><em>- Milton Bond (1942)</em></h2>
            </div>
        </div>
    )
}

export default Egg