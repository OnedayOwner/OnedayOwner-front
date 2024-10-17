import { FaPencilAlt, FaStar, FaCoins } from "react-icons/fa";
import MyButton from "../../components/MyButton";
import { useParams } from "react-router-dom";
import "../../styles/customer/CustomerFeedback.css";
import StarRating from "../../components/StarRating";
import { useState } from "react";

const CustomerFeedback = () => {
  const { reservationId } = useParams();
  const [feedback, setFeedback] = useState("");
  const [menuFeedbackVisible, setMenuFeedbackVisible] = useState({});
  const [menuRatings, setMenuRatings] = useState({}); // 메뉴별 별점 상태 관리

  const handleRatingChange = (index, newRating) => {
    setMenuRatings((prevRatings) => ({
      ...prevRatings,
      [index]: newRating, // 메뉴별로 별점 설정
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

  return (
    <div className="customer-feedback-container">
      <h1 className="customer-feedback-restaurant-name">팝업 식당 이름</h1>

      <div className="customer-feedback-info">
        <p className="customer-feedback-info-item">
          <FaStar className="customer-feedback-icon" />
          <span className="customer-feedback-text">별점을 선택해주세요</span>
        </p>
        <StarRating 
          value={menuRatings["global"] || 0} // 전체에 대한 별점 
          onRatingChange={(newRating) => handleRatingChange("global", newRating)} 
        />

        <p className="customer-feedback-info-item">
          <FaPencilAlt className="customer-feedback-icon" />
          <span className="customer-feedback-text">
            전반적인 피드백을 작성해주세요
          </span>
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
        {[
          {
            name: "더미 메뉴 1",
            description: "더미 설명 1",
            price: 10000,
            imageUrl: "https://via.placeholder.com/100",
            quantity: 1,
          },
          {
            name: "더미 메뉴 2",
            description: "더미 설명 2",
            price: 15000,
            imageUrl: "https://via.placeholder.com/100",
            quantity: 2,
          },
        ].map((menu, index) => (
          <div key={index} className="customer-feedback-menu-item">
            <div className="customer-feedback-menu-content">
              <img
                src={menu.imageUrl}
                alt={menu.name}
                className="customer-feedback-menu-image"
              />
              <div className="customer-feedback-menu-info">
                <h3 className="customer-feedback-menu-name">{menu.name}</h3>
                <p className="customer-feedback-menu-description">
                  ₩{menu.price.toLocaleString()}
                </p>
                <p className="customer-feedback-menu-quantity">
                  수량 : {menu.quantity}
                </p>
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
                  <span className="customer-feedback-text">
                    별점을 선택해주세요
                  </span>
                </p>
                <StarRating
                  value={menuRatings[index] || 0} 
                  onRatingChange={(newRating) =>
                    handleRatingChange(index, newRating)
                  }
                />

                <p className="customer-feedback-info-item">
                  <FaPencilAlt className="customer-feedback-icon" />
                  <span className="customer-feedback-text">
                    메뉴 피드백을 작성해주세요
                  </span>
                </p>
                <textarea
                  className="customer-feedback-menu-form-textarea"
                  placeholder="창업 희망자에게 전달할 피드백을 작성해주세요. 욕설, 비방, 명예훼손성 표현은 지양해주세요.(최대 500자)"
                  maxLength={500}
                />
                <p className="customer-feedback-info-item">
                  <FaCoins className="customer-feedback-icon" />
                  <span className="customer-feedback-text">
                    메뉴의 적정가를 적어주세요
                  </span>
                </p>
                <input
                  type="number"
                  className="customer-feedback-menu-form-price-input"
                  placeholder="메뉴의 적정 가격을 입력해주세요.(숫자만 입력)"
                  min={0}
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
          onClick={() => alert("피드백 등록")}
        />
      </div>
    </div>
  );
};

export default CustomerFeedback;