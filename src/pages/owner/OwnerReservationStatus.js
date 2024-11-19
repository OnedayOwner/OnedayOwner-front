import React, { useState, useEffect } from 'react';
import axiosInstance from "../login/axios";
import DatePicker from 'react-datepicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import { FaInfoCircle } from 'react-icons/fa';
import 'react-datepicker/dist/react-datepicker.css';
import './../../styles/owner/OwnerReservationStatus.css';

const OwnerReservationStatus = ({ startDate, endDate }) => {
  const [popupId, setPopupId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [menuCounts, setMenuCounts] = useState([]);
  const [reservationSummary, setReservationSummary] = useState(null);
  const [noPopupMessage, setNoPopupMessage] = useState('');

  const fetchPopupId = async () => {
    try {
      const popupResponse = await axiosInstance.get('/owners/popup');
      setPopupId(popupResponse.data.id);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setNoPopupMessage('진행중인 팝업이 없습니다.');
      } else {
        console.error('팝업 정보를 가져오는 데 실패했습니다:', error);
        alert('팝업 정보를 가져오는 데 실패했습니다.');
      }
    }
  };

  const fetchMenuCounts = async (popupId, date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    try {
      const response = await axiosInstance.post(
        `/owners/popup/${popupId}/reservation/day`,
        null,
        {
          params: { year, month, day },
        }
      );
      setMenuCounts(response.data);
    } catch (error) {
      console.error('날짜별 메뉴 수량을 가져오는 중 오류가 발생했습니다:', error);
      alert('메뉴 수량을 가져오는 중 오류가 발생했습니다.');
    }
  };

  const fetchMonthlyReservationInfo = async (popupId, date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    try {
      const response = await axiosInstance.post(
        `/owners/popup/${popupId}/reservation/month`,
        null,
        {
          params: { year, month },
        }
      );
      const dailySummary = response.data.find(
        (info) => new Date(info.date).getDate() === date.getDate()
      );
      setReservationSummary(dailySummary || null);
    } catch (error) {
      console.error('월별 예약 정보를 가져오는 중 오류가 발생했습니다:', error);
      alert('예약 정보를 가져오는 중 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    if (!popupId) {
      fetchPopupId();
    }
  }, [popupId]);

  useEffect(() => {
    if (popupId && startDate && endDate) {
      const initialDate = new Date(startDate);
      setSelectedDate(initialDate);
      fetchMenuCounts(popupId, initialDate);
      fetchMonthlyReservationInfo(popupId, initialDate);
    }
  }, [popupId, startDate, endDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (popupId) {
      fetchMenuCounts(popupId, date);
      fetchMonthlyReservationInfo(popupId, date);
    }
  };

  return (
    <div className="owner-reservation-container">
      <div className="owner-reservation-header">
        <h1 className="owner-reservation-header-title">예약 현황</h1>
      </div>
      {noPopupMessage ? (
        <p className="owner-reservation-no-popup">{noPopupMessage}</p>
      ) : (
        <div className="owner-reservation-content">
          <p className="owner-reservation-instruction">
            <FaInfoCircle className="owner-reservation-icon" />
            날짜별 시간별 예약 메뉴 정보를 제공합니다.
          </p>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
            placeholderText="날짜를 선택하세요"
            minDate={new Date(startDate)}
            maxDate={new Date(endDate)}
            inline
          />

          <div className="owner-reservation-summary">
            {reservationSummary ? (
              <div>
                <p>
                  <strong>총 예약 수:</strong>{" "}
                  {reservationSummary.totalReservation}
                  {", "}
                  <strong>예약 인원:</strong> {reservationSummary.totalPeople}
                </p>
              </div>
            ) : (
              <p>해당 날짜에 예약 요약 정보가 없습니다.</p>
            )}
          </div>

          <div className="owner-reservation-menu-counts">
            {menuCounts.length > 0 ? (
              menuCounts.map((menu, index) => (
                <div key={index} className="owner-reservation-menu-item">
                  <div className="owner-reservation-menu-detail">
                    <p>
                      <strong>시간:</strong>{" "}
                      {new Date(menu.reservationTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    <p>
                      <strong>메뉴 이름:</strong> {menu.menuName}
                    </p>
                    <p>
                      <strong>수량:</strong> {menu.quantity}
                    </p>
                  </div>
                  <FontAwesomeIcon icon={faUtensils} size="2x" />
                </div>
              ))
            ) : (
              <p className="owner-reservation-no-popup">
                해당 날짜에 예약된 메뉴가 없습니다.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnerReservationStatus;