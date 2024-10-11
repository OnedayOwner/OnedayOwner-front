import { FaMapMarkerAlt, FaCalendarAlt, FaInfoCircle, FaUserFriends } from 'react-icons/fa';
import MyButton from '../../components/MyButton';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import '../../styles/customer/CustomerReservationDetail.css';

const CustomerReservationDetail = () => {
    return (
      <div className="customer-reservation-detail-container">
        <h1 className="customer-reservation-detail-restaurant-name">
          더미 식당 이름
        </h1>

        <div className="customer-reservation-detail-info">
          <p className="customer-reservation-detail-info-item">
            <FaInfoCircle className="customer-reservation-detail-icon" />
            <span className="customer-reservation-detail-text">
              더미 설명입니다. 여기에 식당 설명이 들어갑니다.
            </span>
          </p>
          <p className="customer-reservation-detail-info-item">
            <FaMapMarkerAlt className="customer-reservation-detail-icon" />
            <span className="customer-reservation-detail-text">
              더미 식당 주소
            </span>
          </p>
          <p className="customer-reservation-detail-info-item">
            <FaCalendarAlt className="customer-reservation-detail-icon" />
            <span className="customer-reservation-detail-text">
              예약 날짜 및 시간
            </span>
          </p>
          <p className="customer-reservation-detail-info-item">
            <FaUserFriends className="customer-reservation-detail-icon" />
            <span className="customer-reservation-detail-text">
              예약 인원: 3명
            </span>
          </p>
        </div>

        <div className="customer-reservation-detail-reservation-button">
          <MyButton
            text="피드백 작성하기"
            type="default"
            onClick={() => alert("피드백 작성")}
          />
        </div>
        <div className="customer-reservation-detail-reservation-button">
          <MyButton
            text="팝업 페이지로 이동하기"
            type="alt"
            onClick={() => alert("팝업 페이지 이동")}
          />
        </div>

        <div className="customer-reservation-detail-map">
          <h2>위치</h2>
          <div className="customer-reservation-detail-map-container">
            <Map
              center={{ lat: 37.5665, lng: 126.978 }}
              style={{ width: "100%", height: "100%" }}
            >
              <MapMarker position={{ lat: 37.5665, lng: 126.978 }}></MapMarker>
            </Map>
          </div>
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
          <div className="customer-reservation-detail-divider"></div>
          <div className="customer-reservation-detail-total">
            <p className="customer-reservation-detail-price">총 금액: ₩40000</p>
          </div>
        </div>
      </div>
    );
}

export default CustomerReservationDetail;