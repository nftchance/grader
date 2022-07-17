import Tool from "../Tool/Tool"

import logo from "../images/logo.png"

import './Home.css';

function Home() {
    return (
        <div className="container">
            <div className="navbar">
                <a href="/"><img src={logo} alt="navbar logo" /></a>

                {/* <div className={`theme-controls ${theme}`} /> */}
            </div>

            <h1>BUILD THE PERFECT GRADIENT. WITH EASE.</h1>
            <p className="lead">Finding an objectively good gradient is an actual science. Tired of having grey-filled gradients that look like they were chosen by a color-blind person? Scroll down and make that perfect gradient.</p>

            <Tool />

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
    );
}

export default Home;
