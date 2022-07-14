import "./OpenGraph.css";

const OpenGraph = () => {
    const colors = [
        "#00ff00",
        "#ff0000",
        "#ffff00",
        "#ffffff",
    ]

    const templateColumns = colors
        .map(() => "1fr")
        .join(" ")

    const usingBlocks = false;
    
    let gradient = null;
    if(!usingBlocks)
        gradient = `
            linear-gradient(
                90deg,
                hsl(0,0%,100%),
                hsl(0,0%,80%),
                hsl(0,0%,60%),
                hsl(0,0%,40%),
                hsl(0,0%,20%),
                hsl(0,0%,0%)
            )
        `

    return (
        <div className="container">
            <div 
                className="step gradient"
                style={{
                    gridTemplateColumns: templateColumns,
                    background: gradient
                }}
            >
                {
                    usingBlocks 
                    ? colors.map(color => <div style={{ 
                        background: color
                    }}/>) 
                    : null 
                }
            </div>
        </div>
    )
}

export default OpenGraph;