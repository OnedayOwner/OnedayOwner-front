import React from 'react';
import '../../styles/customer/CustomerPopup.css';
import { FaMapMarkerAlt, FaCalendarAlt, FaInfoCircle, FaClock } from 'react-icons/fa';
import MyButton from '../../components/MyButton';
import axiosInstance from '../login/axios';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const CustomerPopup = () => {
    const { popupId } = useParams();
    const [popupData, setPopupData] = useState(null);

    useEffect(() => {
        axiosInstance.get(`/customers/popup/${popupId}`)
            .then(response => setPopupData(response.data))
            .catch(error => console.error('Error fetching popup data:', error));
    }, [popupId]);

    if (!popupData) {
        return <div>Loading...</div>;
    }

    const { name, address, description, menus, startDateTime, endDateTime, businessTimes } = popupData;

    const formatTime = (time) => {
        return time.substring(0, 5);
    };

    return (
        <div className="customer-popup-container">
            <div className="customer-popup-images">
                <img src={popupData.imageUrl1 || "https://via.placeholder.com/200"} alt="Popup Image 1" className="customer-popup-image" />
                <img src={popupData.imageUrl2 || "https://via.placeholder.com/200"} alt="Popup Image 2" className="customer-popup-image" />
            </div>

            <h1 className="customer-popup-restaurant-name">{name}</h1>

            <div className="customer-popup-info">
                <p className="customer-popup-info-item">
                    <FaInfoCircle className="customer-popup-icon" />
                    <span className="customer-popup-text">{description}</span>
                </p>
                <p className="customer-popup-info-item">
                    <FaMapMarkerAlt className="customer-popup-icon" />
                    <span className="customer-popup-text">{address.street}, {address.detail}</span>
                </p>
                <p className="customer-popup-info-item">
                    <FaCalendarAlt className="customer-popup-icon" />
                    <span className="customer-popup-text">
                        {new Date(startDateTime).toLocaleDateString()} ~ {new Date(endDateTime).toLocaleDateString()}
                    </span>
                </p>
                <p className="customer-popup-info-item">
                    <FaClock className="customer-popup-icon" />
                    <span className="customer-popup-text">
                        {businessTimes.map((time, index) => (
                            <span key={index}>
                                {formatTime(time.openTime)} - {formatTime(time.closeTime)}
                            </span>
                        ))}
                    </span>
                </p>
            </div>

            <div className="customer-popup-reservation-button">
                <MyButton text="예약하기" type="alt" />
            </div>

            <div className="customer-popup-map">
                <h2>위치</h2>
                <div id="map" className="customer-popup-map-container"></div>
            </div>

            <div className="customer-popup-menu">
                <h2>메뉴</h2>
                {menus.map((menu, index) => (
                    <div key={index} className="customer-popup-menu-item">
                        <img src={menu.imageUrl || "https://via.placeholder.com/100"} alt={menu.name} className="customer-popup-menu-image" />
                        <div className="customer-popup-menu-info">
                            <h3 className="customer-popup-menu-name">{menu.name}</h3>
                            <p className="customer-popup-menu-description">{menu.description}</p>
                            <p className="customer-popup-menu-price">₩{menu.price.toLocaleString()}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CustomerPopup;
