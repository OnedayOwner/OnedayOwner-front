import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaInfoCircle } from 'react-icons/fa';
import '../../styles/customer/CustomerMyFeedback.css';

const CustomerMyFeedback = () => {
    const navigate = useNavigate(); 
    const [activeTab, setActiveTab] = useState('active'); 
    const starSpanRef = useRef(null);

    const dummyCompletedReservations = [
        {
            id: 1,
            popupName: '일식 팝업 레스토랑',
            address: { street: '서울시 강남구', detail: '테헤란로 123' },
            reservationDateTime: new Date().toISOString(),
            numberOfPeople: 2,
            menuImageUrl: 'https://via.placeholder.com/100',
        },
        {
            id: 2,
            popupName: '이탈리안 팝업 레스토랑',
            address: { street: '서울시 강남구', detail: '역삼로 456' },
            reservationDateTime: new Date().toISOString(),
            numberOfPeople: 4,
            menuImageUrl: 'https://via.placeholder.com/100',
        },
    ];

    const dummyFeedbacks = [
        {
            id: 3,
            popupName: '한식 팝업 레스토랑',
            score: 4.5,
            reservationDateTime: new Date().toISOString(),
            comment: "피드백 내용~~~~~피드백 내용~~~~~피드백 내용~~~~~피드백 내용~~~~~피드백 내용~~~~~피드백 내용~~~~~피드백 내용~~~~~피드백 내용~~~~~피드백 내용~~~~~피드백 내용~~~~~"
        },{
            id: 4,
            popupName: '중식 팝업 레스토랑',
            score: 5,
            reservationDateTime: new Date().toISOString(),
            comment: "피드백 내용~~~~~피드백 내용~~~~~피드백 내용~~~~~피드백 내용~~~~~피드백 내용~~~~~피드백 내용~~~~~피드백 내용~~~~~피드백 내용~~~~~피드백 내용~~~~~피드백 내용~~~~~"
        },
    ];

    const handleReservationClick = (reservationId) => {
        navigate(`/customer/feedback/${reservationId}`); 
    };

    const handleFeedbackClick = (feedbackId) => {
        navigate(`/customer/myfeedback/${feedbackId}`); 
    };

    const renderReservationItem = (reservation) => (
        <div 
            key={reservation.id} 
            className="customer-myfeedback-reservation-item"
            onClick={() => handleReservationClick(reservation.id)}
        >
            <img
                src={reservation.menuImageUrl || 'https://via.placeholder.com/100'}
                alt="restaurant"
                className="customer-myfeedback-reservation-item__image"
            />
            <div className="customer-myfeedback-reservation-item__details">
                <h2 className="customer-myfeedback-reservation-item__name">{reservation.popupName}</h2>
                <p className="customer-myfeedback-reservation-item__address">
                    {reservation.address.street}, {reservation.address.detail}
                </p>
                <p className="customer-myfeedback-reservation-item__datetime">
                    {new Date(reservation.reservationDateTime).toLocaleDateString()}{' '}
                    {new Date(reservation.reservationDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
                <p className="customer-myfeedback-reservation-item__people">
                    예약 인원: {reservation.numberOfPeople}명
                </p>
            </div>
        </div>
    );

    const renderFeedbackItem = (feedback) => (
        <div 
            key={feedback.id} 
            className="customer-myfeedback-completed-item"
            onClick={() => handleFeedbackClick(feedback.id)}
        >
            <div className="customer-myfeedback-completed-item__header">
                <h2 className="customer-myfeedback-completed-item__name">{feedback.popupName}</h2>
                <div className="customer-myfeedback-completed-item__score">
                    <div className="customer-myfeedback-star-rating">
                        ★★★★★
                        <span ref={starSpanRef} style={{ width: `${feedback.score * 20}%` }}>★★★★★</span>
                    </div>
                </div>
            </div>
            <div className="customer-myfeedback-completed-item__details">
                <p className="customer-myfeedback-completed-item__datetime">
                    {new Date(feedback.reservationDateTime).toLocaleDateString()}{' '}
                    {new Date(feedback.reservationDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
                <p className="customer-myfeedback-completed-item__comment">
                    {feedback.comment}
                </p>
            </div>
        </div>
    );

    return (
      <div className="customer-myfeedback-container">
        <div className="customer-myfeedback-header">
          <h1 className="customer-myfeedback-header__title">피드백</h1>
          <div className="customer-myfeedback-tabs">
            <button
              className={`customer-myfeedback-tab ${
                activeTab === "active" ? "active" : ""
              }`}
              onClick={() => setActiveTab("active")}
            >
              작성 가능 피드백
            </button>
            <button
              className={`customer-myfeedback-tab ${
                activeTab === "completed" ? "active" : ""
              }`}
              onClick={() => setActiveTab("completed")}
            >
              내 피드백
            </button>
          </div>
        </div>

        {activeTab === "active" ? (
          <div className="customer-myfeedback-list">
            {dummyCompletedReservations.length === 0 ? (
              <p className="customer-myfeedback-empty">
                피드백 작성 가능한 예약이 없습니다.
              </p>
            ) : (
              <>
                <p className="customer-myfeedback-instruction">
                  <FaInfoCircle className="customer-myfeedback-icon" />
                   여러분의 이용 경험을 피드백으로 작성해주세요!
                </p>
                {dummyCompletedReservations.map(renderReservationItem)}
              </>
            )}
          </div>
        ) : (
          <div className="customer-myfeedback-list">
            {dummyFeedbacks.length === 0 ? (
              <p className="customer-myfeedback-empty">
                작성한 피드백이 없습니다.
              </p>
            ) : (
                dummyFeedbacks.map(renderFeedbackItem) 
            )}
          </div>
        )}
      </div>
    );
};

export default CustomerMyFeedback;