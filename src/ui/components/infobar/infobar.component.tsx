import { FC, ReactNode, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode, faEnvelope, faHouse, faLocationDot, faTrophy, faUser } from "@fortawesome/free-solid-svg-icons";
import { faDiscord, faGithub, faInstagram } from "@fortawesome/free-brands-svg-icons";
import "@/ui/components/infobar/infobar.component.css";

const InfobarComp: FC = (): ReactNode => {
    useEffect(() => {
        console.log("Loaded: InfobarComp");
    }, []);

    useEffect(() => {
        console.log("Rendered: InfobarComp");
    });

    return (
        <footer id='infobar'>
            <div className="infobar-info">
                <h3>Qualif SWERC 2025/2026 | CIA - Polytech Paris-Saclay</h3>
                <p>Glhf !</p>
                <p>Always 42</p>
            </div>
            <div className="infobar-links">
                <div>
                    <h3>Quick Links</h3>
                    <ul>
                        <li>
                            <Link to="/">
                                <FontAwesomeIcon icon={faHouse} />
                                <p>Home</p>
                            </Link>
                        </li>
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
                </div>
                <div>
                    <h3>Community</h3>
                    <ul className="reverse">
                        <li>
                            <a href="https://discord.com/invite/S8gRM95wqw" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faDiscord} size="2x" />
                            </a>
                        </li>
                        <li>
                            <a href="https://github.com/CIA-PoPS" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faGithub} size="2x" />
                            </a>
                        </li>
                        <li>
                            <a href="https://www.instagram.com/cia_polytech_paris_saclay/" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faInstagram} size="2x" />
                            </a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3>Help</h3>
                    <ul>
                        <li>
                            <div className='footer-line'>
                                <FontAwesomeIcon icon={faLocationDot} />
                                <p> Adresse : </p>
                                <a href='https://maps.app.goo.gl/Y4Ds6c3uUZM1t8gLA' target='_blank' rel='noopener noreferrer'>Bâtiment 620, Maison de l'Ingénieur, Rue Louis de Broglie, 91400 Orsay, France</a>
                            </div>
                        </li>
                        <li>
                            <div className='footer-line'>
                                <FontAwesomeIcon icon={faEnvelope} />
                                <p> Email : </p>
                                <a href='mailto:contact@bde-pps.fr' target='_blank' rel='noopener noreferrer'>contact@bde-pps.fr</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="infobar-legal">
                <ul>
                    <li><Link to="/terms"></Link></li>
                    <li><Link to="/policy"></Link></li>
                    <li><Link to="/cookies"></Link></li>
                </ul>
                <p>{document.querySelector<HTMLMetaElement>('meta[name="copyright"]')?.content}</p>
            </div>
        </footer>
    );
}

export default InfobarComp;
