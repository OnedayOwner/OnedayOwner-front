import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Header.css";

const Header = ({ headText }) => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    return (
        <header className="header-container">
            <div className="header-back">
                <FontAwesomeIcon
                    icon={faAngleLeft}
                    className="header-back-icon"
                    onClick={goBack}
                />
            </div>

            <h1 className="header-title">{headText}</h1>
        </header>
    );
};

export default Header;
