import { FaStar, FaPencilAlt, FaCoins, FaCalendarAlt, FaUserFriends } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosInstance from '../login/axios';
import "../../styles/customer/CustomerFeedbackDetail.css";

const CustomerFeedbackDetail = () => {
  const { feedbackId } = useParams();

  const [feedbackData, setFeedbackData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedbackData = async () => {
      try {
        const response = await axiosInstance.get(`/customers/feedbacks/${feedbackId}`);
        setFeedbackData(response.data);
      } catch (error) {
        console.error("Error fetching feedback data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbackData();
  }, [feedbackId]);

  if (loading) {
    return (
      <div className="customer-feedback-detail-loading-container">
        <div className="customer-feedback-detail-loading-spinner"></div>
      </div>
    );
  }

  if (!feedbackData) {
    return <p>피드백 데이터를 불러오지 못했습니다.</p>;
  }

  const { popupName, score, comment, visitedTime, numberOfPeople, menuFeedbackSummaries = [] } = feedbackData;

  return (
    <div className="customer-feedback-detail-container">
      <h1 className="customer-feedback-detail-restaurant-name">{popupName}</h1>
      <div className="customer-feedback-detail-overall">
        <p className="customer-feedback-detail-info-item">
          <FaCalendarAlt className="customer-feedback-detail-icon" />
          <span className="customer-feedback-detail-text">
            {new Date(visitedTime).toLocaleDateString()} {new Date(visitedTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
        </p>
        <p className="customer-feedback-detail-info-item">
          <FaUserFriends className="customer-feedback-detail-icon" />
          <span className="customer-feedback-detail-text">예약 인원: {numberOfPeople}명</span>
        </p>
        <p className="customer-feedback-detail-info-item">
          <FaStar className="customer-feedback-detail-icon" />
          <span className="customer-feedback-detail-text">별점</span>
        </p>
        <div className="customer-feedback-detail-overall-star-rating">
          ★★★★★
          <span style={{ width: `${score * 20}%` }}>★★★★★</span>
        </div>
        <p className="customer-feedback-detail-info-item">
          <FaPencilAlt className="customer-feedback-detail-icon" />
          <span className="customer-feedback-detail-text">피드백</span>
        </p>
        <p className="customer-feedback-detail-comment">{comment}</p>
      </div>

      <div className="customer-feedback-detail-menu">
        <h2 className="customer-feedback-detail-menu-title">메뉴 피드백</h2>
        {menuFeedbackSummaries.length > 0 ? (
          menuFeedbackSummaries.map((menu) => (
            <div key={menu.menuFeedbackId} className="customer-feedback-detail-menu-item">
              <div className="customer-feedback-detail-menu-top">
                <img
                  src={menu.imageUrl}
                  alt={menu.name}
                  className="customer-feedback-detail-menu-image"
                />
                <div className="customer-feedback-detail-menu-info">
                  <h3 className="customer-feedback-detail-menu-name">
                    {menu.name}
                  </h3>
                  <div className="customer-feedback-detail-menu-score">
                    <div className="customer-feedback-detail-star-rating">
                      ★★★★★
                      <span style={{ width: `${menu.score * 20}%` }}>★★★★★</span>
                    </div>
                  </div>
                  <p className="customer-feedback-detail-menu-price">
                    <FaCoins className="customer-feedback-detail-icon" />
                    가격: ₩{menu.price.toLocaleString()}
                  </p>
                  <p className="customer-feedback-detail-menu-price">
                    <FaCoins className="customer-feedback-detail-icon" />
                    희망 적정가: ₩{menu.desiredPrice.toLocaleString()}
                  </p>
                </div>
              </div>
              <p className="customer-feedback-detail-menu-feedback">
                <FaPencilAlt className="customer-feedback-detail-icon" />
                피드백
              </p>
              <p className="customer-feedback-detail-menu-comment">
                {menu.comment}
              </p>
            </div>
          ))
        ) : (
          <p>메뉴 피드백이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default CustomerFeedbackDetail;