import logo from "../images/logo.png"
import hero from "../images/demo/colorspace.png";

import "./OpenGraph.css";

const OpenGraph = () => {
    try {
        const queryParams = new URLSearchParams(
            decodeURIComponent(window.location.search))

        let colors = null;
        let gradient = null;
        let templateColumns = null

        // Determine which color mode to use
        if (queryParams.has('cs')) {
            colors = queryParams.getAll('cs')

            // Determine how many columns are needed
            templateColumns = colors
                .map(() => "1fr")
                .join(" ")
        } else if (queryParams.has('g'))
            gradient = queryParams.get('g')

        // Catch the score 
        const score = queryParams.get('s');

        return (
            <div className="container">
                <img src={logo} alt="logo" />
                <h2>SCORED: {score} / 100</h2>

                <div
                    className="step gradient"
                    style={{
                        gridTemplateColumns: templateColumns,
                        background: gradient
                    }}
                >
                    {colors
                        ? colors.map(color => <div key={color} style={{
                            background: color
                        }} />)
                        : null
                    }
                </div>
            </div>
        )
    } catch {
        // Return default OpenGraph image when dynamic is missing or fails
        return <img src={hero} alt="hero" /> 
    }
}

export default OpenGraph;