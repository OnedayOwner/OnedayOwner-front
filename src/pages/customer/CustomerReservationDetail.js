import { FaMapMarkerAlt, FaCalendarAlt, FaInfoCircle, FaUserFriends } from 'react-icons/fa';
import MyButton from '../../components/MyButton';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

const CustomerReservationDetail = () => {
    return (
      <div className="customer-popup-container">
        <h1 className="customer-popup-restaurant-name">더미 식당 이름</h1>

        <div className="customer-popup-info">
          <p className="customer-popup-info-item">
            <FaInfoCircle className="customer-popup-icon" />
            <span className="customer-popup-text">
              더미 설명입니다. 여기에 식당 설명이 들어갑니다.
            </span>
          </p>
          <p className="customer-popup-info-item">
            <FaMapMarkerAlt className="customer-popup-icon" />
            <span className="customer-popup-text">더미 식당 주소</span>
          </p>
          <p className="customer-popup-info-item">
            <FaCalendarAlt className="customer-popup-icon" />
            <span className="customer-popup-text">예약 날짜 및 시간</span>
          </p>
          <p className="customer-popup-info-item">
            <FaUserFriends className="customer-popup-icon" />
            <span className="customer-popup-text">예약 인원</span>
          </p>
        </div>

        <div className="customer-popup-reservation-button">
          <MyButton
            text="피드백 작성하기"
            type="default"
            onClick={() => alert("피드백 작성")}
          />
        </div>

        <div className="customer-popup-map">
          <h2>위치</h2>
          <div className="customer-popup-map-container">
            <Map
              center={{ lat: 37.5665, lng: 126.978 }}
              style={{ width: "100%", height: "100%" }}
            >
              <MapMarker position={{ lat: 37.5665, lng: 126.978 }}></MapMarker>
            </Map>
          </div>
        </div>

        <div className="customer-popup-menu">
          <h2>메뉴</h2>
          {[
            {
              name: "더미 메뉴 1",
              description: "더미 설명 1",
              price: 10000,
              imageUrl: "https://via.placeholder.com/100",
              quantity: 1
            },
            {
              name: "더미 메뉴 2",
              description: "더미 설명 2",
              price: 15000,
              imageUrl: "https://via.placeholder.com/100",
              quantity: 2
            },
          ].map((menu, index) => (
            <div key={index} className="customer-popup-menu-item">
              <img
                src={menu.imageUrl}
                alt={menu.name}
                className="customer-popup-menu-image"
              />
              <div className="customer-popup-menu-info">
                <h3 className="customer-popup-menu-name">{menu.name}</h3>
                <p className="customer-popup-menu-description">
                  {menu.description}
                </p>
                <p className="customer-popup-menu-price">
                  ₩{menu.price.toLocaleString()}
                </p>
              </div>
              <div className="customer-reservation-people-selector">
                <p className="customer-popup-menu-description">
                  수량 : {menu.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
}

export default CustomerReservationDetail;