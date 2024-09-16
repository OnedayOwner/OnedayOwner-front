import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/customer/Customerhome.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { FaPizzaSlice } from 'react-icons/fa';
import { GiNoodles, GiChopsticks, GiSushis } from 'react-icons/gi';
import { BsThreeDots } from 'react-icons/bs';
import axiosInstance from '../login/axios';

const Customerhome = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [activePopups, setActivePopups] = useState([]);
    const [futurePopups, setFuturePopups] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axiosInstance.get('/customers/popups/active')
        .then(response => setActivePopups(response.data))
        .catch(error => console.error('Error fetching active popups:', error));

        axiosInstance.get('/customers/popups/future')
        .then(response => setFuturePopups(response.data))
        .catch(error => console.error('Error fetching future popups:', error));
    }, []);

    const handleSlideChange = (swiper) => {
        setCurrentPage(swiper.activeIndex + 1); 
    };

    const getShortenedAddress = (street) => {
        const words = street.split(' ');
        return words.slice(0, 2).join(' ');
    };

    const formatDate = (dateString) => {
        const options = { month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString('ko-KR', options).replace(/\. /g, '.');
    };

    const handlePopupClick = (popupId) => {
        navigate(`/customer/popup/${popupId}`);
    };

    return (
    <div className="customer-home-container">
      <div className="customer-home-header">
        <h1 className="customer-home-header__title">오늘만 사장</h1> 
      </div>
      
      <div className="customer-home-banner">
        <div className="customer-home-banner-slide">
          <Swiper
            spaceBetween={10}
            slidesPerView={1}
            pagination={{ clickable: true }}
            onSlideChange={handleSlideChange}
            className="customer-home-inner-swiper"
          >
            <SwiperSlide>
              <div className="customer-home-slide-content">
                <h2>창업을 시도하기 두려우셨나요?</h2>
                <p>실제 매장 경험을 통해 창업 경험을 쌓아보세요</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="customer-home-slide-content">
                <h2>예약을 통해 매장을 이용하고</h2>
                <p>여러분의 이용 경험을 피드백해주세요.</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="customer-home-slide-content">
                <h2>세 번째 배너</h2>
                <p>이곳에 세 번째 배너의 정보를 넣으세요.</p>
              </div>
            </SwiperSlide>
          </Swiper>
          <div className="customer-home-page-indicator">
            {currentPage} / 3
          </div>
        </div>
      </div>

      <div className="customer-home-category-buttons">
        <button className="customer-home-category-button">
          <GiChopsticks /> 한식
        </button>
        <button className="customer-home-category-button">
          <GiNoodles /> 중식
        </button>
        <button className="customer-home-category-button">
          <GiSushis /> 일식
        </button>
        <button className="customer-home-category-button">
          <FaPizzaSlice /> 양식
        </button>
        <button className="customer-home-category-button">
          <BsThreeDots /> 기타
        </button>
      </div>

      <div className="customer-home-ongoing-popup-section">
        <h2 className="customer-home-ongoing-popup-title">진행중인 팝업</h2>
        {activePopups.length > 0 ? (
          <Swiper
            spaceBetween={10}
            slidesPerView={2.5}
            className="customer-home-popup-swiper"
          >
            {activePopups.map(popup => (
              <SwiperSlide key={popup.id}>
                <div 
                  className="customer-home-popup-slide" 
                  onClick={() => handlePopupClick(popup.id)}
                >
                  <img src={popup.menuImageUrl || "https://via.placeholder.com/150"} alt={popup.name} className="customer-home-popup-image" />
                  <div className="customer-home-popup-info">
                    <h3 className="customer-home-popup-name">{popup.name}</h3>
                    <p className="customer-home-popup-duration">
                      {formatDate(popup.startDateTime)} ~ {formatDate(popup.endDateTime)}
                    </p>
                    <p className="customer-home-popup-location">
                      {getShortenedAddress(popup.address.street)}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
            <div className="customer-home-no-popups">
            <p>진행중인 팝업이 없습니다.</p>
          </div>
        )}
      </div>

      <div className="customer-home-ongoing-popup-section">
        <h2 className="customer-home-ongoing-popup-title">진행 예정 팝업</h2>
        {futurePopups.length > 0 ? (
          <Swiper
            spaceBetween={10}
            slidesPerView={2.5}
            className="customer-home-popup-swiper"
          >
            {futurePopups.map(popup => (
              <SwiperSlide key={popup.id}>
                <div 
                  className="customer-home-popup-slide" 
                  onClick={() => handlePopupClick(popup.id)}
                >
                  <img src={popup.menuImageUrl || "https://via.placeholder.com/150"} alt={popup.name} className="customer-home-popup-image" />
                  <div className="customer-home-popup-info">
                    <h3 className="customer-home-popup-name">{popup.name}</h3>
                    <p className="customer-home-popup-duration">
                      {formatDate(popup.startDateTime)} ~ {formatDate(popup.endDateTime)}
                    </p>
                    <p className="customer-home-popup-location">
                      {getShortenedAddress(popup.address.street)}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
            <div className="customer-home-no-popups">
            <p>진행 예정인 팝업이 없습니다.</p>
          </div>
        )}
      </div>
    </div>
    )
}

export default Customerhome;
