import logo from "../images/logo.png"

import "./OpenGraph.css";

const OpenGraph = () => {
    const queryParams = new URLSearchParams(
        decodeURIComponent(window.location.search))

    let colors = null;
    let gradient = null;

    // Determine which color mode to use
    if(queryParams.has('cs'))
        colors = queryParams.getAll('cs')
    else if(queryParams.has('g'))
        gradient = queryParams.get('g')

    const data = Array.from(queryParams.entries())
    console.log('data', data)

    // TODO: Gradient support needs to be implemented into the url generation
    // Notes: this will be the most used state (unless they've chosen to show blocks to themselves in which case the share will be in that state)
    // let gradient = null;
    // if(!usingBlocks)
    //     gradient = `
    //         linear-gradient(
    //             90deg,
    //             hsl(0,0%,100%),
    //             hsl(0,0%,80%),
    //             hsl(0,0%,60%),
    //             hsl(0,0%,40%),
    //             hsl(0,0%,20%),
    //             hsl(0,0%,0%)
    //         )
    //     `

    const score = 100;

    const templateColumns = colors
        .map(() => "1fr")
        .join(" ")

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
                {
                    colors 
                    ? colors.map(color => <div key={color} style={{ 
                        background: color
                    }}/>) 
                    : null 
                }
            </div>
        </div>
    )
}

export default OpenGraph;