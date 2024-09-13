import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faCalendarCheck, faCommentDots, faUser } from "@fortawesome/free-solid-svg-icons";
import { useLocation, Link } from "react-router-dom";
import "../styles/Footer.css";

const FooterOwner = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <footer className="footer-container">
            <Link to="/owner/home" className={`footer-item ${isActive("/owner/home") ? "active" : ""}`}>
                <FontAwesomeIcon icon={faHome} className="footer-icon" />
                <span className="footer-text">홈</span>
            </Link>
            <Link to="/owner/reservationstatus" className={`footer-item ${isActive("/owner/reservationstatus") ? "active" : ""}`}>
                <FontAwesomeIcon icon={faCalendarCheck} className="footer-icon" />
                <span className="footer-text">예약 현황</span>
            </Link>
            <Link to="/owner/feedback" className={`footer-item ${isActive("/owner/feedback") ? "active" : ""}`}>
                <FontAwesomeIcon icon={faCommentDots} className="footer-icon" />
                <span className="footer-text">피드백</span>
            </Link>
            <Link to="/owner/profile" className={`footer-item ${isActive("/owner/profile") ? "active" : ""}`}>
                <FontAwesomeIcon icon={faUser} className="footer-icon" />
                <span className="footer-text">내 정보</span>
            </Link>
        </footer>
    );
};

export default FooterOwner;
