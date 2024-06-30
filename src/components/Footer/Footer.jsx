import "./Footer.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm } from '@fortawesome/free-solid-svg-icons';

export const Footer = () => {
    return (
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3">
            <div className="col-md-4 d-flex align-items-center">
                <span className="mb-3 mb-md-0 color-white">
                    <FontAwesomeIcon icon={faFilm} bounce /> 2024 Cinefigram
                </span>
            </div>

            <ul className="nav col-md-4 justify-content-end list-unstyled d-flex margin-logos">
                <li className="ms-3">
                    <a className="text-body-secondary" href="https://github.com/katerinareyes">
                        <img className="rounded-logo" src='https://avatars.githubusercontent.com/u/84293701?v=4' alt="kate-logo" width="24" height="24" />
                    </a>
                </li>
                <li className="ms-3">
                    <a className="text-body-secondary" href="https://github.com/melpony23">
                        <img className="rounded-logo" src='https://avatars.githubusercontent.com/u/67890035?v=4' alt="melpony-logo" width="24" height="24" />
                    </a>
                </li>
                <li className="ms-3">
                    <a className="text-body-secondary" href="https://github.com/Vguinez">
                        <img className="rounded-logo" src='https://avatars.githubusercontent.com/u/127246624?v=4' alt="vice-logo" width="24" height="24" />
                    </a>
                </li>
            </ul>
        </footer>
    );
};

export default Footer;
