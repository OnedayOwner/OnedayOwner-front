import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaCalendarAlt, FaInfoCircle, FaUserFriends } from 'react-icons/fa';
import MyButton from '../../components/MyButton';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../login/axios';
import '../../styles/customer/CustomerReservationDetail.css';

const CustomerReservationDetail = () => {
    const { reservationId } = useParams();
    const navigate = useNavigate();
    const [reservationData, setReservationData] = useState(null);
    const [coordinates, setCoordinates] = useState({ lat: 37.5665, lng: 126.9780 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReservationData = async () => {
            try {
                const response = await axiosInstance.get(`/customers/reservation/${reservationId}`);
                setReservationData(response.data);

                const geocoder = new window.kakao.maps.services.Geocoder();
                geocoder.addressSearch(response.data.popupSummaryForReservation.address.street, (result, status) => {
                    if (status === window.kakao.maps.services.Status.OK) {
                        const lat = parseFloat(result[0].y);
                        const lng = parseFloat(result[0].x);
                        setCoordinates({ lat, lng });
                    } else {
                        console.error('Geocode was not successful for the following reason:', status);
                    }
                });
            } catch (error) {
                console.error('Error fetching reservation data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchReservationData();
    }, [reservationId]);

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
            </div>
        );
    }

    if (!reservationData) {
        return <p>예약 데이터를 불러오지 못했습니다.</p>;
    }

    const { popupSummaryForReservation, reservationMenuDetails, reservationDateTime, numberOfPeople, totalPrice } = reservationData;
    const { name, address, description } = popupSummaryForReservation;

    const handlePopupClick = (popupId) => {
        navigate(`/customer/popup/${popupId}`);
    };

    const handleFeedbackClick = (popupId) => {
        navigate(`/customer/feedback/${popupId}`);
    };

    return (
        <div className="customer-reservation-detail-container">
            <h1 className="customer-reservation-detail-restaurant-name">{name}</h1>

            <div className="customer-reservation-detail-info">
                <p className="customer-reservation-detail-info-item">
                    <FaInfoCircle className="customer-reservation-detail-icon" />
                    <span className="customer-reservation-detail-text">{description}</span>
                </p>
                <p className="customer-reservation-detail-info-item">
                    <FaMapMarkerAlt className="customer-reservation-detail-icon" />
                    <span className="customer-reservation-detail-text">{address.street}, {address.detail}</span>
                </p>
                <p className="customer-reservation-detail-info-item">
                    <FaCalendarAlt className="customer-reservation-detail-icon" />
                    <span className="customer-reservation-detail-text">
                        {new Date(reservationDateTime).toLocaleDateString()} {new Date(reservationDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                </p>
                <p className="customer-reservation-detail-info-item">
                    <FaUserFriends className="customer-reservation-detail-icon" />
                    <span className="customer-reservation-detail-text">예약 인원: {numberOfPeople}명</span>
                </p>
            </div>

            <div className="customer-reservation-detail-reservation-button">
                <MyButton text="피드백 작성하기" type="default" onClick={() => handleFeedbackClick(popupSummaryForReservation.id)} />
            </div>
            <div className="customer-reservation-detail-reservation-button">
                <MyButton text="팝업 페이지로 이동하기" type="alt" onClick={() => handlePopupClick(popupSummaryForReservation.id)} />
            </div>

            <div className="customer-reservation-detail-map">
                <h2>위치</h2>
                <div className="customer-reservation-detail-map-container">
                    <Map center={coordinates} style={{ width: "100%", height: "100%" }}>
                        <MapMarker position={coordinates} />
                    </Map>
                </div>
            </div>

            <div className="customer-reservation-detail-menu">
                <h2>예약 메뉴</h2>
                {reservationMenuDetails.map((menu, index) => (
                    <div key={index} className="customer-reservation-detail-menu-item">
                        <img src={menu.imageUrl || "https://via.placeholder.com/100"} alt={menu.name} className="customer-reservation-detail-menu-image" />
                        <div className="customer-reservation-detail-menu-info">
                            <h3 className="customer-reservation-detail-menu-name">{menu.name}</h3>
                            <p className="customer-reservation-detail-menu-price">₩{menu.price.toLocaleString()}</p>
                            <p className="customer-reservation-detail-menu-quantity">수량: {menu.quantity}</p>
                        </div>
                    </div>
                ))}
                <div className="customer-reservation-detail-divider"></div>
                <div className="customer-reservation-detail-total">
                    <p className="customer-reservation-detail-price">총 금액: ₩{totalPrice.toLocaleString()}</p>
                </div>
            </div>
        </div>
    );
};

export default CustomerReservationDetail;