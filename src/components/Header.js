import { faAngleLeft, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Header.css";
import MyButton from "./MyButton";

const Header = ({ headText }) => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const goBack = () => {
        navigate(-1);
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
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

            <h1 className="header-title">오늘만 사장</h1>

            <div className="header-menu" onClick={toggleSidebar}>
                <FontAwesomeIcon
                    icon={faBars}
                    className="header-menu-icon"
                />
            </div>

            <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
                <div className="sidebar-close-button">
                  <MyButton onClick={toggleSidebar} text="닫기" type="alt" />
                </div>
                <ul>
                    <li>메뉴 1</li>
                    <li>메뉴 2</li>
                    <li>메뉴 3</li>
                </ul>
            </div>

            {sidebarOpen && <div className="sidebar-overlay" onClick={toggleSidebar} />}
        </header>
    );
};

export default Header;
