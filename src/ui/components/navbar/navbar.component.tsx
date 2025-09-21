import { FC, ReactNode, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode, faTrophy, faUser } from "@fortawesome/free-solid-svg-icons";
import "@/ui/components/navbar/navbar.component.css";

const NavbarComp: FC = (): ReactNode => {
    const year = new Date().getFullYear();

    useEffect(() => {
        console.log("Loaded: NavbarComp");
    }, []);

    useEffect(() => {
        console.log("Rendered: NavbarComp");
    });

    return (
        <header id='navbar'>
            <Link to='/' className='navbar-logo-link'>
                <img src='https://data.bde-pps.fr/cia/images/logo/cia.svg' />
                <div className='navbar-zero'>
                    <h1>Qualif SWERC</h1>
                    <small>{year}</small>
                </div>
            </Link>
            <nav className='navbar-links'>
                <ul>
                    <li>
                        <Link to='/code'>
                            <FontAwesomeIcon icon={faCode} />
                            <p className='navbar-second'> Code</p>
                        </Link>
                    </li>
                    <li>
                        <Link to='/scoreboard'>
                            <FontAwesomeIcon icon={faTrophy} />
                            <p className='navbar-second'> Scoreboard</p>
                        </Link>
                    </li>
                    <li>
                        <Link to='/user'>
                            <FontAwesomeIcon icon={faUser} />
                            <p className='navbar-second'> User</p>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default NavbarComp;
