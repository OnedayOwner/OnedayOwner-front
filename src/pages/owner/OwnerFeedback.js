import React, { useEffect, useState, useRef } from 'react';
import axiosInstance from "../login/axios";
import { FaInfoCircle } from 'react-icons/fa';
import '../../styles/owner/OwnerFeedback.css';

const OwnerFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [activeTab, setActiveTab] = useState('total');
  const [noPopupMessage, setNoPopupMessage] = useState('');
  const starSpanRef = useRef(null);

  useEffect(() => {
    const fetchPopupAndFeedbacks = async () => {
      try {
        const popupResponse = await axiosInstance.get('/owners/popup');
        const ongoingPopup = popupResponse.data;

        const feedbackResponse = await axiosInstance.get(
          `/owners/feedbacks/list/${ongoingPopup.id}`
        );

        setFeedbacks(feedbackResponse.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setNoPopupMessage('진행중인 팝업이 없습니다.');
        } else {
          alert('데이터를 가져오는 데 실패했습니다.');
        }
      }
    };

    fetchPopupAndFeedbacks();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="owner-feedback-container">
      <div className="owner-feedback-header">
        <h1 className="owner-feedback-header-title">피드백</h1>
        <div className="owner-feedback-tabs">
          <button
            className={`owner-feedback-tab ${
              activeTab === "total" ? "active" : ""
            }`}
            onClick={() => handleTabChange("total")}
          >
            전체 피드백
          </button>
          <button
            className={`owner-feedback-tab ${
              activeTab === "bymenu" ? "active" : ""
            }`}
            onClick={() => handleTabChange("bymenu")}
          >
            메뉴별 피드백
          </button>
        </div>
      </div>
      {activeTab === "total" && (
        <div className="owner-feedback-list">
          <p className="owner-feedback-instruction">
            <FaInfoCircle className="owner-feedback-icon" />
            고객님들이 직접 작성하신 피드백입니다.
          </p>
          {noPopupMessage ? (
            <p className="owner-feedback-no-popups">{noPopupMessage}</p>
          ) : (
            <div className="owner-feedback-items">
              {feedbacks.length === 0 ? (
                <p className="owner-feedback-no-popups">피드백이 없습니다.</p>
              ) : (
                feedbacks.map((feedback) => (
                  <div
                    key={feedback.feedbackId}
                    className="owner-feedback-item"
                  >
                    <div className="owner-feedback-star-rating">
                      ★★★★★
                      <span
                        ref={starSpanRef}
                        style={{ width: `${feedback.score * 20}%` }}
                      >
                        ★★★★★
                      </span>
                    </div>
                    <div className="owner-feedback-item-details">
                      <p className="owner-feedback-item-comment">
                        {feedback.comment}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}

      {activeTab === "bymenu" && (
        <p className="owner-feedback-no-popups">추후 업데이트 예정입니다.</p>
      )}
    </div>
  );
};

export default OwnerFeedback;