import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import 'react-datepicker/dist/react-datepicker.css';
import './../../styles/owner/OwnerReservationStatus.css';

const OwnerReservationStatus = ({ startDate, endDate }) => {
  const { popupId } = useParams(); // 경로에서 popupId 가져오기
  const [selectedDate, setSelectedDate] = useState(new Date()); // 기본 날짜를 오늘로 설정
  const [menuCounts, setMenuCounts] = useState([]); // 메뉴 수량 상태
  const [reservationSummary, setReservationSummary] = useState(null); // 예약 요약 정보 상태

  // 날짜별 메뉴 수량 조회 함수
  const fetchMenuCounts = async (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACK_URL}/api/owners/popup/${popupId}/reservation/day`, null, {
        params: { year, month, day },
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setMenuCounts(response.data);
    } catch (error) {
      console.error('날짜별 메뉴 수량을 가져오는 중 오류가 발생했습니다:', error);
      alert('메뉴 수량을 가져오는 중 오류가 발생했습니다.');
    }
  };

  // 월별 예약 정보 조회 함수
  const fetchMonthlyReservationInfo = async (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACK_URL}/api/owners/popup/${popupId}/reservation/month`, null, {
        params: { year, month },
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      // 선택한 날짜의 예약 요약 정보 필터링
      const dailySummary = response.data.find(
        (info) => new Date(info.date).getDate() === date.getDate()
      );
      setReservationSummary(dailySummary || null);
    } catch (error) {
      console.error('월별 예약 정보를 가져오는 중 오류가 발생했습니다:', error);
      alert('예약 정보를 가져오는 중 오류가 발생했습니다.');
    }
  };

  // 컴포넌트가 처음 렌더링될 때, 지정된 기간을 사용하여 예약 현황을 설정
  useEffect(() => {
    if (startDate && endDate) {
      const initialDate = new Date(startDate);
      setSelectedDate(initialDate);
      fetchMenuCounts(initialDate);
      fetchMonthlyReservationInfo(initialDate);
    }
  }, [startDate, endDate]);

  // 날짜 선택 시 호출되는 함수
  const handleDateChange = (date) => {
    setSelectedDate(date);
    fetchMenuCounts(date);
    fetchMonthlyReservationInfo(date);
  };

  return (
    <div className="owner-reservation-status">
      <h2>예약 현황 조회</h2>

      {/* 달력이 화면에 바로 표시되도록 설정 */}
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="yyyy-MM-dd"
        placeholderText="날짜를 선택하세요"
        minDate={new Date(startDate)}
        maxDate={new Date(endDate)}
        inline
      />

      {/* 예약 요약 정보 */}
      <div className="reservation-summary">
        {reservationSummary ? (
          <div>
            <p><strong>총 예약 수:</strong> {reservationSummary.totalReservation} <strong>예약 인원:</strong> {reservationSummary.totalPeople}</p>
          </div>
        ) : (
          <p>해당 날짜에 예약 요약 정보가 없습니다.</p>
        )}
      </div>

      {/* 시간별 메뉴 수량 */}
      <div className="menu-counts">
        {menuCounts.length > 0 ? (
          menuCounts.map((menu, index) => (
            <div key={index} className="menu-item">
              <FontAwesomeIcon icon={faUtensils} size="2x" />
              <p><strong>시간:</strong> {new Date(menu.reservationTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
              <p><strong>메뉴 이름:</strong> {menu.menuName}</p>
              <p><strong>수량:</strong> {menu.quantity}</p>
            </div>
          ))
        ) : (
          <p>해당 날짜에 예약된 메뉴가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default OwnerReservationStatus;
