import { FaPencilAlt, FaStar, FaCoins } from "react-icons/fa";
import MyButton from "../../components/MyButton";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../login/axios";
import "../../styles/customer/CustomerFeedback.css";
import StarRating from "../../components/StarRating";
import { useState, useEffect } from "react";

const CustomerFeedback = () => {
  const { reservationId } = useParams();
  const navigate = useNavigate();
  
  const [reservationData, setReservationData] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [menuFeedbackVisible, setMenuFeedbackVisible] = useState({});
  const [menuRatings, setMenuRatings] = useState({});
  const [overallRating, setOverallRating] = useState(0);
  const [menuComments, setMenuComments] = useState({});
  const [menuDesiredPrices, setMenuDesiredPrices] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservationData = async () => {
      try {
        const response = await axiosInstance.get(`/customers/reservation/${reservationId}`);
        setReservationData(response.data);
      } catch (error) {
        console.error("Error fetching reservation data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservationData();
  }, [reservationId]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!reservationData) {
    return <p>예약 데이터를 불러오지 못했습니다.</p>;
  }

  const { popupSummaryForReservation, reservationMenuDetails } = reservationData;

  const handleMenuRatingChange = (index, newRating) => {
    setMenuRatings((prevRatings) => ({
      ...prevRatings,
      [index]: newRating / 2,
    }));
  };

  const handleOverallRatingChange = (newRating) => {
    setOverallRating(newRating / 2);
  };

  const handleMenuCommentChange = (index, comment) => {
    setMenuComments((prevComments) => ({
      ...prevComments,
      [index]: comment,
    }));
  };

  const handleDesiredPriceChange = (index, price) => {
    setMenuDesiredPrices((prevPrices) => ({
      ...prevPrices,
      [index]: price,
    }));
  };

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const toggleMenuFeedback = (index) => {
    setMenuFeedbackVisible((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const isSubmitButtonDisabled = feedback.trim() === "";

  const handleSubmitFeedback = async () => {
    const feedbackData = {
      score: overallRating,
      comment: feedback,
      menuFeedBackForms: reservationMenuDetails
        .map((menu, index) => ({
          reservationMenuId: menu.id,
          score: menuRatings[index] || 0,
          desiredPrice: menuDesiredPrices[index] || 0, 
          comment: menuComments[index] || "", 
        }))
        .filter((menuFeedback) => menuFeedback.comment || menuFeedback.score > 0 || menuFeedback.desiredPrice > 0), 
    };
  
    try {
      const response = await axiosInstance.post(
        `/customers/feedbacks/${reservationId}`,
        feedbackData
      );
      const feedbackId = response.data.feedbackId;
      navigate(`/customer/myfeedback/${feedbackId}`);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "피드백 제출 중 오류가 발생했습니다.";
      console.error("Error submitting feedback:", errorMessage);
      alert(errorMessage);
    }
  };

  return (
    <div className="customer-feedback-container">
      <h1 className="customer-feedback-restaurant-name">
        {popupSummaryForReservation.name}
      </h1>

      <div className="customer-feedback-info">
        <p className="customer-feedback-info-item">
          <FaStar className="customer-feedback-icon" />
          <span className="customer-feedback-text">별점을 선택해주세요</span>
        </p>
        <StarRating 
          value={overallRating * 2}
          onRatingChange={handleOverallRatingChange} 
        />

        <p className="customer-feedback-info-item">
          <FaPencilAlt className="customer-feedback-icon" />
          <span className="customer-feedback-text">전반적인 피드백을 작성해주세요</span>
        </p>
        <textarea
          className="customer-feedback-textarea"
          placeholder="창업 희망자에게 전달할 피드백을 작성해주세요. 욕설, 비방, 명예훼손성 표현은 지양해주세요.(최대 1000자)"
          maxLength={1000}
          value={feedback}
          onChange={handleFeedbackChange}
        />
      </div>

      <div className="customer-feedback-menu">
        <h2>예약 메뉴</h2>
        {reservationMenuDetails.map((menu, index) => (
          <div key={index} className="customer-feedback-menu-item">
            <div className="customer-feedback-menu-content">
              <img
                src={menu.imageUrl || "https://via.placeholder.com/100"}
                alt={menu.name}
                className="customer-feedback-menu-image"
              />
              <div className="customer-feedback-menu-info">
                <h3 className="customer-feedback-menu-name">{menu.name}</h3>
                <p className="customer-feedback-menu-description">
                  ₩{menu.price.toLocaleString()}
                </p>
                <p className="customer-feedback-menu-quantity">수량 : {menu.quantity}</p>
                <div className="customer-feedback-menu-toggle-button">
                  <MyButton
                    text={
                      menuFeedbackVisible[index]
                        ? "▲메뉴 피드백 닫기"
                        : "▼메뉴 피드백 작성"
                    }
                    type="alt"
                    onClick={() => toggleMenuFeedback(index)}
                  />
                </div>
              </div>
            </div>
            {menuFeedbackVisible[index] && (
              <div className="customer-feedback-menu-form">
                <p className="customer-feedback-info-item">
                  <FaStar className="customer-feedback-icon" />
                  <span className="customer-feedback-text">별점을 선택해주세요</span>
                </p>
                <StarRating
                  value={(menuRatings[index] || 0) * 2} 
                  onRatingChange={(newRating) =>
                    handleMenuRatingChange(index, newRating)
                  }
                />
                <p className="customer-feedback-info-item">
                  <FaPencilAlt className="customer-feedback-icon" />
                  <span className="customer-feedback-text">메뉴 피드백을 작성해주세요</span>
                </p>
                <textarea
                  className="customer-feedback-menu-form-textarea"
                  placeholder="창업 희망자에게 전달할 피드백을 작성해주세요. 욕설, 비방, 명예훼손성 표현은 지양해주세요.(최대 500자)"
                  maxLength={500}
                  value={menuComments[index] || ""}
                  onChange={(e) =>
                    handleMenuCommentChange(index, e.target.value)
                  }
                />
                <p className="customer-feedback-info-item">
                  <FaCoins className="customer-feedback-icon" />
                  <span className="customer-feedback-text">메뉴의 적정가를 적어주세요</span>
                </p>
                <input
                  type="number"
                  className="customer-feedback-menu-form-price-input"
                  placeholder="메뉴의 적정 가격을 입력해주세요.(숫자만 입력)"
                  min={0}
                  value={menuDesiredPrices[index] || ""}
                  onChange={(e) =>
                    handleDesiredPriceChange(index, e.target.value)
                  }
                />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="customer-feedback-submit-button">
        <MyButton
          text="피드백 등록하기"
          type="default"
          onClick={handleSubmitFeedback}
          disabled={isSubmitButtonDisabled}
        />
      </div>
    </div>
  );
};

export default CustomerFeedback;