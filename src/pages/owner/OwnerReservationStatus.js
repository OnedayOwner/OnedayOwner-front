import React, { useState } from 'react';
import DatePicker from 'react-datepicker'; // DatePicker import
import 'react-datepicker/dist/react-datepicker.css'; // CSS import
import '../../styles/owner/OwnerReservationStatus.css';

const dummyData = {
    '2024-10-01': [
        { time: '10:00 AM', menuCount: 3, reservationCount: 2, guestCount: 2 },
        { time: '12:00 PM', menuCount: 5, reservationCount: 1, guestCount: 1 },
    ],
    '2024-10-02': [
        { time: '01:00 PM', menuCount: 2, reservationCount: 2, guestCount: 4 },
    ],
    '2024-10-03': [
        { time: '03:00 PM', menuCount: 1, reservationCount: 1, guestCount: 1 },
        { time: '05:00 PM', menuCount: 4, reservationCount: 3, guestCount: 6 },
    ],
};

const OwnerReservationStatus = () => {
    const [date, setDate] = useState(new Date());
    const [reservationData, setReservationData] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleDateChange = (selectedDate) => {
        setDate(selectedDate);
        setLoading(true);

        const year = selectedDate.getFullYear();
        const month = String(selectedDate.getMonth() + 1).padStart(2, '0'); // month is 0-indexed
        const day = String(selectedDate.getDate()).padStart(2, '0');
        const selectedDateString = `${year}-${month}-${day}`;

        // 더미 데이터에서 해당 날짜의 예약 정보를 가져옴
        setReservationData(dummyData[selectedDateString] || []);
        setLoading(false);
    };

    return (
        <div className="calendar-container">
            <DatePicker
                selected={date}
                onChange={handleDateChange}
                dateFormat="yyyy-MM-dd"
                inline // 달력 UI를 표시할 경우
                className="calendar" // 여기에 className 추가
            />
            {loading && <p>Loading...</p>}
            {reservationData.length > 0 && (
                <div className="reservation-info">
                    <h2>예약 정보</h2>
                    <ul>
                        {reservationData.map((item, index) => (
                            <li key={index}>
                                시간: {item.time}, 메뉴 수량: {item.menuCount}, 예약 수: {item.reservationCount}, 예약 인원: {item.guestCount}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {reservationData.length === 0 && !loading && (
                <p>선택한 날짜에 예약 정보가 없습니다.</p>
            )}
        </div>
    );
}

export default OwnerReservationStatus;
