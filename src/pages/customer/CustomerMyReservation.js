import React, { useState } from 'react';
import '../../styles/customer/CustomerMyReservation.css';

const CustomerMyReservation = () => {
    // 더미 데이터 설정
    const dummyUpcomingReservations = [
        {
            id: 1,
            imageUrl: 'https://via.placeholder.com/100',
            name: '스타벅스 강남점',
            address: '서울특별시 강남구 테헤란로 123',
            date: '2024-09-25',
            time: '14:00',
            people: 2,
        },
        {
            id: 2,
            imageUrl: 'https://via.placeholder.com/100',
            name: '투썸플레이스 서초점',
            address: '서울특별시 서초구 서초대로 45',
            date: '2024-09-30',
            time: '10:00',
            people: 3,
        },
    ];

    const dummyCompletedReservations = [
        {
            id: 3,
            imageUrl: 'https://via.placeholder.com/100',
            name: '엔제리너스 종로점',
            address: '서울특별시 종로구 종로 99',
            date: '2024-09-20',
            time: '12:00',
            people: 1,
        },
        {
            id: 4,
            imageUrl: 'https://via.placeholder.com/100',
            name: '이디야커피 홍대점',
            address: '서울특별시 마포구 홍익로 20',
            date: '2024-09-18',
            time: '16:00',
            people: 4,
        },
    ];

    const [upcomingReservations, setUpcomingReservations] = useState(dummyUpcomingReservations);
    const [completedReservations, setCompletedReservations] = useState(dummyCompletedReservations);
    const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming' or 'completed'

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

            {/* 방문 예정 예약 내역 */}
            {activeTab === 'upcoming' && (
                <div className="customer-myreservation-list">
                    {upcomingReservations.length === 0 ? (
                        <p className="customer-myreservation-empty">방문 예정인 팝업이 없습니다.</p>
                    ) : (
                        upcomingReservations.map((reservation) => (
                            <div key={reservation.id} className="reservation-item">
                                <img
                                    src={reservation.imageUrl}
                                    alt="restaurant"
                                    className="reservation-item__image"
                                />
                                <div className="reservation-item__details">
                                    <h2 className="reservation-item__name">{reservation.name}</h2>
                                    <p className="reservation-item__address">{reservation.address}</p>
                                    <p className="reservation-item__datetime">
                                        {reservation.date} {reservation.time}
                                    </p>
                                    <p className="reservation-item__people">
                                        예약 인원: {reservation.people}명
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            {/* 방문 완료 예약 내역 */}
            {activeTab === 'completed' && (
                <div className="customer-myreservation-list">
                    {completedReservations.length === 0 ? (
                        <p className="customer-myreservation-empty">방문 완료한 팝업이 없습니다.</p>
                    ) : (
                        completedReservations.map((reservation) => (
                            <div key={reservation.id} className="reservation-item">
                                <img
                                    src={reservation.imageUrl}
                                    alt="restaurant"
                                    className="reservation-item__image"
                                />
                                <div className="reservation-item__details">
                                    <h2 className="reservation-item__name">{reservation.name}</h2>
                                    <p className="reservation-item__address">{reservation.address}</p>
                                    <p className="reservation-item__datetime">
                                        {reservation.date} {reservation.time}
                                    </p>
                                    <p className="reservation-item__people">
                                        예약 인원: {reservation.people}명
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default CustomerMyReservation;
