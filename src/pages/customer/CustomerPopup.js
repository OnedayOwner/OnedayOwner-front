import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { FaMapMarkerAlt, FaCalendarAlt, FaInfoCircle, FaClock } from 'react-icons/fa';
import MyButton from '../../components/MyButton';
import axiosInstance from '../login/axios';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import '../../styles/customer/CustomerPopup.css';

const CustomerPopup = () => {
    const { popupId } = useParams();
    const [popupData, setPopupData] = useState(null);
    const [coordinates, setCoordinates] = useState({ lat: 37.5665, lng: 126.9780 });
    const navigate = useNavigate();

    useEffect(() => {
        axiosInstance.get(`/customers/popup/${popupId}`)
            .then(response => {
                setPopupData(response.data);
                const geocoder = new window.kakao.maps.services.Geocoder();
                geocoder.addressSearch(response.data.address.street, (result, status) => {
                    if (status === window.kakao.maps.services.Status.OK) {
                        const lat = parseFloat(result[0].y);
                        const lng = parseFloat(result[0].x);
                        setCoordinates({ lat, lng });
                    } else {
                        console.error('Geocode was not successful for the following reason:', status);
                    }
                });
            })
            .catch(error => console.error('Error fetching popup data:', error));
    }, [popupId]);

    if (!popupData) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
            </div>
        );
    }

    const { name, address, description, menus, startDateTime, endDateTime, businessTimes } = popupData;

    const formatTime = (time) => time.substring(0, 5);

    const handleReservationClick = (popupId) => {
        navigate(`/customer/reservation/${popupId}`);
    };

    return (
        <div className="customer-popup-container">
            <div className="customer-popup-images">
                <img src={menus[0]?.imageUrl || "https://via.placeholder.com/200"} alt="Popup Image 1" className="customer-popup-image" />
                <img src={menus[1]?.imageUrl || "https://via.placeholder.com/200"} alt="Popup Image 2" className="customer-popup-image" />
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
                <MyButton text="예약하기" type="default" onClick={() => handleReservationClick(popupId)}/>
            </div>

            <div className="customer-popup-map">
                <h2>위치</h2>
                <div className="customer-popup-map-container">
                    <Map
                        center={coordinates}
                        style={{ width: '100%', height: '100%' }}
                    >
                        <MapMarker position={coordinates}>
                        </MapMarker>
                    </Map>
                </div>
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
