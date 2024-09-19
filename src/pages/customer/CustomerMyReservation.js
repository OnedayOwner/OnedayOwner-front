import React, { useState, useEffect } from 'react';
import instance from '../login/axios'; 
import '../../styles/customer/CustomerMyReservation.css';

const CustomerMyReservation = () => {
    const [upcomingReservations, setUpcomingReservations] = useState([]);
    const [completedReservations, setCompletedReservations] = useState([]);
    const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming' or 'completed'
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState(null); 

    const fetchUpcomingReservations = async () => {
        try {
            setLoading(true);
            const response = await instance.get('/customers/reservations/upcoming'); 
            setUpcomingReservations(response.data);
        } catch (err) {
            console.error('Error fetching upcoming reservations:', err);
            setError('방문 예정 예약을 불러오는 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    const fetchCompletedReservations = async () => {
        try {
            setLoading(true);
            const response = await instance.get('/customers/reservations/completed'); 
            setCompletedReservations(response.data);
        } catch (err) {
            console.error('Error fetching completed reservations:', err);
            setError('방문 완료 예약을 불러오는 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (activeTab === 'upcoming') {
            fetchUpcomingReservations();
        } else {
            fetchCompletedReservations();
        }
    }, [activeTab]);

    const renderReservationItem = (reservation) => (
        <div key={reservation.id} className="reservation-item">
            <img
                src={reservation.menuImageUrl || 'https://via.placeholder.com/100'}
                alt="restaurant"
                className="reservation-item__image"
            />
            <div className="reservation-item__details">
                <h2 className="reservation-item__name">{reservation.popupName}</h2>
                <p className="reservation-item__address">
                    {reservation.address.street}, {reservation.address.detail}
                </p>
                <p className="reservation-item__datetime">
                    {new Date(reservation.reservationDateTime).toLocaleDateString()}{' '}
                    {new Date(reservation.reservationDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
                <p className="reservation-item__people">
                    예약 인원: {reservation.numberOfPeople}명
                </p>
            </div>
        </div>
    );

    return (
        <div className="customer-myreservation-container">
            <div className="customer-myreservation-header">
                <h1 className="customer-myreservation-header__title">내 예약</h1>
                <div className="customer-myreservation-tabs">
                    <button
                        className={`customer-myreservation-tab ${activeTab === 'upcoming' ? 'active' : ''}`}
                        onClick={() => setActiveTab('upcoming')}
                    >
                        방문 예정
                    </button>
                    <button
                        className={`customer-myreservation-tab ${activeTab === 'completed' ? 'active' : ''}`}
                        onClick={() => setActiveTab('completed')}
                    >
                        방문 완료
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="loading-spinner"></div>
            ) : error ? (
                <p className="customer-myreservation-error">{error}</p>
            ) : activeTab === 'upcoming' ? (
                <div className="customer-myreservation-list">
                    {upcomingReservations.length === 0 ? (
                        <p className="customer-myreservation-empty">방문 예정인 팝업이 없습니다.</p>
                    ) : (
                        upcomingReservations.map(renderReservationItem)
                    )}
                </div>
            ) : (
                <div className="customer-myreservation-list">
                    {completedReservations.length === 0 ? (
                        <p className="customer-myreservation-empty">방문 완료한 팝업이 없습니다.</p>
                    ) : (
                        completedReservations.map(renderReservationItem)
                    )}
                </div>
            )}
        </div>
    );
};

export default CustomerMyReservation;
