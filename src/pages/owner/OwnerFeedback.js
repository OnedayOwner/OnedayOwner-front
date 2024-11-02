import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; 
import '../../styles/owner/OwnerFeedback.css';

const OwnerFeedback = () => {
  const { popupId } = useParams();
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbackList = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `${process.env.REACT_APP_BACK_URL}/api/owners/feedbacks/list/${popupId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
        console.log('피드백 응답 데이터:', response.data); // 응답 데이터 확인
        setFeedbacks(response.data); // 피드백 상태 설정
      } catch (error) {
        alert('피드백을 가져오는 데 실패했습니다.'); // 사용자에게 피드백
      }
    };

    fetchFeedbackList();
  }, [popupId]);

  return (
    <div className="feedback-container">
      <h2>고객님들이 남긴 피드백이에요!</h2>
      <div className="feedback-list">
        {feedbacks.length === 0 ? (
          <p>피드백이 없습니다.</p>
        ) : (
          feedbacks.map((feedback) => (
            <div key={feedback.feedbackId} className="feedback-item">
              <span className="feedback-rating">별점: {feedback.score}</span>
              <span className="feedback-comment">{feedback.comment}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OwnerFeedback;
