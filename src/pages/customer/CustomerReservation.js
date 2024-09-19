import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../login/axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../styles/customer/CustomerReservation.css';
import MyButton from '../../components/MyButton';
import { FaUserFriends, FaCalendarAlt } from 'react-icons/fa';

const CustomerReservation = () => {
    const { popupId } = useParams();
    const navigate = useNavigate();
    const [popupData, setPopupData] = useState(null);
    const [selectedPeople, setSelectedPeople] = useState(1);
    const [selectedDate, setSelectedDate] = useState(new Date(new Date().setDate(new Date().getDate() + 1))); // 다음 날이 기본 선택
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

    useEffect(() => {
        axiosInstance.get(`/customers/info/${popupId}`)
            .then(response => setPopupData(response.data))
            .catch(error => console.error('Error fetching data:', error));
    }, [popupId]);

    const incrementPeople = () => {
        if (selectedPeople < 20) {
            setSelectedPeople(prev => prev + 1);
        }
    };

    const decrementPeople = () => {
        if (selectedPeople > 1) {
            setSelectedPeople(prev => prev - 1);
        }
    };

    const selectTimeSlot = (timeSlot) => {
        setSelectedTimeSlot(timeSlot);
    };

    const handleNextStep = () => {
        if (selectedPeople > selectedTimeSlot.maxPeople) {
            alert('선택한 인원이 최대 인원보다 많습니다.');
            return;
        }

        navigate(`/customer/reservation/menu/${popupId}`, {
            state: {
                selectedDate,
                selectedTimeSlot,
                selectedPeople
            }
        });
    };

    return (
        <div className="customer-reservation-container">
            <div className='customer-reservation-popup-title'>
                <h1 className="customer-reservation-popup-name">{popupData?.popupName}</h1>
            </div>

            <div className="customer-reservation-divider"></div>

            <div className="customer-reservation-section-people">
                <div className="customer-reservation-label-container">
                    <FaUserFriends size={22} className="customer-reservation-icon" />
                    <div className="customer-reservation-label">인원을 선택해주세요</div>
                </div>
                <div className="customer-reservation-people-selector">
                    <button className="customer-reservation-quantity-button" onClick={decrementPeople}>-</button>
                    <div className="customer-reservation-quantity-number">{selectedPeople}</div>
                    <button className="customer-reservation-quantity-button" onClick={incrementPeople}>+</button>
                </div>
            </div>

            <div className="customer-reservation-divider"></div>

            <div className="customer-reservation-section">
                <div className="customer-reservation-label-container">
                    <FaCalendarAlt size={22} className="customer-reservation-icon" />
                    <div className="customer-reservation-label">날짜 및 시간을 선택해주세요</div>
                </div>
            </div>

            <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                inline
                minDate={new Date()}
                dateFormat="yyyy.MM.dd"
                filterDate={(date) => 
                    popupData?.reservationTimes.some(time => 
                        new Date(time.reservationDate).toDateString() === date.toDateString()
                    )
                }
                renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
                    <div className="custom-datepicker-header">
                        <button onClick={decreaseMonth}>{'<'}</button>
                        <span>{`${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}`}</span>
                        <button onClick={increaseMonth}>{'>'}</button>
                    </div>
                )}
            />

            <div className="customer-reservation-timeslots">
                {popupData?.reservationTimes
                    .filter(time => new Date(time.reservationDate).toDateString() === selectedDate.toDateString())
                    .map(time => (
                        <div 
                            key={time.id} 
                            className={`customer-reservation-timeslot ${selectedTimeSlot?.id === time.id ? 'selected' : ''}`} 
                            onClick={() => selectTimeSlot(time)}
                        >
                            {`${time.startTime.substring(0, 5)}`}
                        </div>
                    ))}
            </div>

            <div className="customer-reservation-next-button">
                <MyButton 
                    text="다음" 
                    type="default" 
                    onClick={handleNextStep}
                    disabled={!selectedTimeSlot} 
                />
            </div>
        </div>
    );
};

export default CustomerReservation;
