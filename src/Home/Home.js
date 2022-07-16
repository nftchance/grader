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

            <div className="grey">
                <div className="step">
                    <h2>YOUR GRADIENTS DON'T HAVE TO SUCK SO BAD.</h2>
                    <p className="lead">Combining the power of visual fidelity and actual proven fact, the ability to create a gradient that stands the ability to backstop a brand is suddenly a possibility. Instead of being a <strong><em>Gradient God</em></strong>, just hop over here and do a little gradient-generating cheating.</p>

                    <p className="lead">You can still tell your boss and friends you came up with it. Who cares? Not me! Let's get you that raise you deserve.</p>
                </div>
                <div className="goo">
                    <div className="step"></div>
                </div>
            </div>

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
