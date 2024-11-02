import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faCommentDots, faUser } from "@fortawesome/free-solid-svg-icons";
import { useLocation, Link, useParams } from "react-router-dom";
import "../styles/Footer.css";

const FooterOwner = () => {
    const location = useLocation();
    const { popupId } = useParams(); // URL에서 popupId 가져오기

    const isActive = (path) => location.pathname === path;

    return (
        <footer className="footer-container">
            <Link to="/owner/home" className={`footer-item ${isActive("/owner/home") ? "active" : ""}`}>
                <FontAwesomeIcon icon={faHome} className="footer-icon" />
                <span className="footer-text">홈</span>
            </Link>

            <Link 
                to={`/owner/feedback/${popupId}`} // 현재 팝업 ID를 사용하여 피드백 링크 수정
                className={`footer-item ${isActive(`/owner/feedback/${popupId}`) ? "active" : ""}`}
            >
                <FontAwesomeIcon icon={faCommentDots} className="footer-icon" />
                <span className="footer-text">피드백</span>
            </Link>
            
            <Link 
                to={`/owner/profile/${popupId}`} // 프로필 링크도 popupId를 사용하도록 수정
                className={`footer-item ${isActive(`/owner/profile/${popupId}`) ? "active" : ""}`}
            >
                <FontAwesomeIcon icon={faUser} className="footer-icon" />
                <span className="footer-text">내 정보</span>
            </Link>
        </footer>
    );
};

export default FooterOwner;
