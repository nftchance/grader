import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@mui/material';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import logo from "@images/logo.png";

const Navbar = () => {
    const [navbarOpen, setNavbarOpen] = useState(false);

    const handleNavbarOpenChange = () => {
        setNavbarOpen(!navbarOpen);
    }

    return (
        <div className="container">
            <div className="navbar">
                <Link to="/" className="brand"><img src={logo} alt="navbar logo" /></Link>

                <div className="sidebar-toggle">
                    <Button sx={{ marginLeft: "auto" }} onClick={handleNavbarOpenChange}>
                        <FontAwesomeIcon icon={['fal', 'bars']} />
                    </Button>
                </div>

                <div className={navbarOpen ? 'sidebar open' : 'sidebar'}>
                    <Button
                        component={Link}
                        to="faq/"
                    >FAQ</Button>
                    <Button
                        component={Link}
                        to="ranker/"
                    >Ranker</Button>
                </div>

                {/* <div className={`theme-controls ${theme}`} /> */}
            </div>
        </div>
    )
}

export default Navbar;