import { Link } from 'react-router-dom';

import logo from "@images/logo.png";

const Footer = () => {
    return (
        <div className="container">
            <div className="footer">
                <Link to="/">
                    <img src={logo} alt="footer logo" />
                </Link>

                <p>
                    A solution by <a
                        href="https://twitter.com/nftchance/"
                        target="_blank"
                        rel="noreferrer">CHANCE</a>.
                </p>
            </div>
        </div>
    )
}

export default Footer;