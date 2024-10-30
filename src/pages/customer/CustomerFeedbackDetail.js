import { FaStar, FaPencilAlt, FaCoins, FaCalendarAlt, FaUserFriends } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../../styles/customer/CustomerFeedbackDetail.css";

const CustomerFeedbackDetail = () => {
  const { feedbackId } = useParams();
  const navigate = useNavigate();

  const [feedbackData, setFeedbackData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dummyFeedbackData = {
      popupName: "버거킹 종로점",
      overallScore: 4.5,
      overallComment: "맛있었지만 가격이 조금 비쌌어요. 음식의 플레이팅이 이쁘고 사진 찍기에 좋았어요. 음식 나오는 시간이 빨라서 좋았어요. 다음에 또 방문할 의사가 있습니다.",
      menuFeedbacks: [
        {
          menuId: 1,
          menuName: "불고기 버거",
          menuScore: 4,
          menuComment: "맛있었지만 가격이 조금 비쌌어요. 음식의 플레이팅이 이쁘고 사진 찍기에 좋았어요. 음식 나오는 시간이 빨라서 좋았어요. 다음에 또 방문할 의사가 있습니다.",
          desiredPrice: 5000,
          imageUrl: "https://via.placeholder.com/100"
        },
        {
          menuId: 2,
          menuName: "콜라",
          menuScore: 5,
          menuComment: "맛있었지만 가격이 조금 비쌌어요. 음식의 플레이팅이 이쁘고 사진 찍기에 좋았어요. 음식 나오는 시간이 빨라서 좋았어요. 다음에 또 방문할 의사가 있습니다.",
          desiredPrice: 2000,
          imageUrl: "https://via.placeholder.com/100"
        },
      ],
    };

    setFeedbackData(dummyFeedbackData);
    setLoading(false);
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

  const { popupName, overallScore, overallComment, menuFeedbacks } = feedbackData;

  return (
    <div className="customer-feedback-detail-container">
      <h1 className="customer-feedback-detail-restaurant-name">{popupName}</h1>
      <div className="customer-feedback-detail-overall">
        <p className="customer-feedback-detail-info-item">
          <FaCalendarAlt className="customer-feedback-detail-icon" />
          <span className="customer-feedback-detail-text">
            2024.10.20 오전 11:00
          </span>
        </p>
        <p className="customer-feedback-detail-info-item">
          <FaUserFriends className="customer-feedback-detail-icon" />
          <span className="customer-feedback-detail-text">예약 인원: 3명</span>
        </p>
        <p className="customer-feedback-detail-info-item">
          <FaStar className="customer-feedback-detail-icon" />
          <span className="customer-feedback-detail-text">별점</span>
        </p>
        <div className="customer-feedback-detail-overall-star-rating">
          ★★★★★
          <span style={{ width: `${overallScore * 20}%` }}>★★★★★</span>
        </div>
        <p className="customer-feedback-detail-info-item">
          <FaPencilAlt className="customer-feedback-detail-icon" />
          <span className="customer-feedback-detail-text">피드백</span>
        </p>
        <p className="customer-feedback-detail-comment">{overallComment}</p>
      </div>

      <div className="customer-feedback-detail-menu">
        <h2 className="customer-feedback-detail-menu-title">메뉴 피드백</h2>
        {menuFeedbacks.map((menu) => (
          <div key={menu.menuId} className="customer-feedback-detail-menu-item">
            <div className="customer-feedback-detail-menu-top">
              <img
                src={menu.imageUrl}
                alt={menu.menuName}
                className="customer-feedback-detail-menu-image"
              />
              <div className="customer-feedback-detail-menu-info">
                <h3 className="customer-feedback-detail-menu-name">
                  {menu.menuName}
                </h3>
                <div className="customer-feedback-detail-menu-score">
                  <div className="customer-feedback-detail-star-rating">
                    ★★★★★
                    <span style={{ width: `${menu.menuScore * 20}%` }}>
                      ★★★★★
                    </span>
                  </div>
                </div>
                <p className="customer-feedback-detail-menu-desired-price">
                  <FaCoins className="customer-feedback-detail-icon" />
                  가격: ₩10,000
                </p>
                <p className="customer-feedback-detail-menu-desired-price">
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
              {menu.menuComment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerFeedbackDetail;