import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faSearch, faCalendarCheck, faUser } from "@fortawesome/free-solid-svg-icons";
import { useLocation, Link } from "react-router-dom";
import "../styles/Footer.css";

const FooterCustomer = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <footer className="footer-container">
            <Link to="/customer/home" className={`footer-item ${isActive("/customer/home") ? "active" : ""}`}>
                <FontAwesomeIcon icon={faHome} className="footer-icon" />
                <span className="footer-text">홈</span>
            </Link>
            <Link to="/customer/search" className={`footer-item ${isActive("/customer/search") ? "active" : ""}`}>
                <FontAwesomeIcon icon={faSearch} className="footer-icon" />
                <span className="footer-text">검색</span>
            </Link>
            <Link to="/customer/myreservation" className={`footer-item ${isActive("/customer/myreservation") ? "active" : ""}`}>
                <FontAwesomeIcon icon={faCalendarCheck} className="footer-icon" />
                <span className="footer-text">내 예약</span>
            </Link>
            <Link to="/customer/profile" className={`footer-item ${isActive("/customer/profile") ? "active" : ""}`}>
                <FontAwesomeIcon icon={faUser} className="footer-icon" />
                <span className="footer-text">내 정보</span>
            </Link>
        </footer>
    );
};

export default FooterCustomer;
