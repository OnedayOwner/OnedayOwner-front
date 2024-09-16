import React from 'react';
import '../../styles/customer/CustomerPopup.css';
import { FaMapMarkerAlt, FaCalendarAlt, FaInfoCircle, FaClock } from 'react-icons/fa';
import MyButton from '../../components/MyButton';

const CustomerPopup = () => {
    return (
        <div className="customer-popup-container">
            <div className="customer-popup-images">
                <img src="https://via.placeholder.com/200" alt="Popup Image 1" className="customer-popup-image" />
                <img src="https://via.placeholder.com/200" alt="Popup Image 2" className="customer-popup-image" />
            </div>

            <h1 className="customer-popup-restaurant-name">스타벅스 강남논현점</h1>

            <div className="customer-popup-info">
                <p className="customer-popup-info-item">
                    <FaInfoCircle className="customer-popup-icon" />
                    <span className="customer-popup-text">신라호텔 주방장의 디저트 팝업입니다.</span>
                </p>
                <p className="customer-popup-info-item">
                    <FaMapMarkerAlt className="customer-popup-icon" />
                    <span className="customer-popup-text">서울시 강남구 강남대로 512</span>
                </p>
                <p className="customer-popup-info-item">
                    <FaCalendarAlt className="customer-popup-icon" />
                    <span className="customer-popup-text">01.01 ~ 01.31</span>
                </p>
                <p className="customer-popup-info-item">
                    <FaClock className="customer-popup-icon" />
                    <span className="customer-popup-text">10:00 AM - 10:00 PM</span>
                </p>
            </div>

            <div className="customer-popup-reservation-button">
                    <MyButton  text="예약하기" type="alt" />
                </div>

            <div className="customer-popup-map">
                <h2>위치</h2>
                <div id="map" className="customer-popup-map-container"></div>
            </div>

            <div className="customer-popup-menu">
                <h2>메뉴</h2>
                <div className="customer-popup-menu-item">
                    <img src="https://via.placeholder.com/100" alt="Menu 1" className="customer-popup-menu-image" />
                    <div className="customer-popup-menu-info">
                        <h3 className="customer-popup-menu-name">메뉴 이름 1</h3>
                        <p className="customer-popup-menu-description">이 메뉴는 특별한 맛을 제공합니다...</p>
                        <p className="customer-popup-menu-price">₩10,000</p>
                    </div>
                </div>
                <div className="customer-popup-menu-item">
                    <img src="https://via.placeholder.com/100" alt="Menu 2" className="customer-popup-menu-image" />
                    <div className="customer-popup-menu-info">
                        <h3 className="customer-popup-menu-name">메뉴 이름 2</h3>
                        <p className="customer-popup-menu-description">이 메뉴는 특별한 맛을 제공합니다...</p>
                        <p className="customer-popup-menu-price">₩15,000</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerPopup;
