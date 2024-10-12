import { FaPencilAlt, FaStar } from "react-icons/fa";
import MyButton from "../../components/MyButton";
import { useParams } from "react-router-dom";
import '../../styles/customer/CustomerFeedback.css';
import StarRating from "../../components/StarRating";

const CustomerFeedback = () => {
  const { reservationId } = useParams();

  const handleRatingChange = (newRating) => {
    console.log("선택된 별점:", newRating);
    // 필요한 로직 추가 가능 (ex. 서버에 전달 등)
  };

  return (
    <div className="customer-reservation-detail-container">
      <h1 className="customer-reservation-detail-restaurant-name">
        팝업 식당 이름
      </h1>

      <div className="customer-reservation-detail-info">
        <p className="customer-reservation-detail-info-item">
          <FaStar className="customer-reservation-detail-icon" />
          <span className="customer-reservation-detail-text">
            별점을 선택해주세요
          </span>
        </p>
        {/* 분리한 StarRating 컴포넌트 사용 */}
        <StarRating onRatingChange={handleRatingChange} />

        <p className="customer-reservation-detail-info-item">
          <FaPencilAlt className="customer-reservation-detail-icon" />
          <span className="customer-reservation-detail-text">
            전반적인 피드백을 작성해주세요
          </span>
        </p>
      </div>

      <div className="customer-reservation-detail-menu">
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
          <div key={index} className="customer-reservation-detail-menu-item">
            <img
              src={menu.imageUrl}
              alt={menu.name}
              className="customer-reservation-detail-menu-image"
            />
            <div className="customer-reservation-detail-menu-info">
              <h3 className="customer-reservation-detail-menu-name">
                {menu.name}
              </h3>
              <p className="customer-reservation-detail-menu-description">
                {menu.description}
              </p>
              <p className="customer-reservation-detail-menu-price">
                ₩{menu.price.toLocaleString()}
              </p>
            </div>
            <div className="customer-reservation-detail-people-selector">
              <p className="customer-reservation-detail-menu-quantity">
                수량 : {menu.quantity}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="customer-reservation-detail-reservation-button">
        <MyButton
          text="피드백 등록하기"
          type="default"
          onClick={() => alert("피드백 등록하기")}
        />
      </div>
    </div>
  );
};

export default CustomerFeedback;