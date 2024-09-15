import React, { useState } from 'react';
import '../../styles/customer/Customerhome.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { FaPizzaSlice } from 'react-icons/fa';
import { GiNoodles, GiChopsticks, GiSushis } from 'react-icons/gi';
import { BsThreeDots } from 'react-icons/bs';

const Customerhome = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const handleSlideChange = (swiper) => {
        setCurrentPage(swiper.activeIndex + 1); 
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
                <h2>두 번째 배너</h2>
                <p>이곳에 두 번째 배너의 정보를 넣으세요.</p>
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
        <Swiper
          spaceBetween={10}
          slidesPerView={2.5}
          className="customer-home-popup-swiper"
        >
          <SwiperSlide>
            <div className="customer-home-popup-slide">
              <img src="https://via.placeholder.com/150" alt="Popup 1" className="customer-home-popup-image" />
              <div className="customer-home-popup-info">
                <h3 className="customer-home-popup-name">홍콩반점</h3>
                <p className="customer-home-popup-duration">01.20 ~ 01.31</p>
                <p className="customer-home-popup-location">서울시 강남구</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="customer-home-popup-slide">
              <img src="https://via.placeholder.com/150" alt="Popup 2" className="customer-home-popup-image" />
              <div className="customer-home-popup-info">
                <h3 className="customer-home-popup-name">스타벅스</h3>
                <p className="customer-home-popup-duration">02.05 ~ 02.28</p>
                <p className="customer-home-popup-location">서울시 종로구</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="customer-home-popup-slide">
              <img src="https://via.placeholder.com/150" alt="Popup 2" className="customer-home-popup-image" />
              <div className="customer-home-popup-info">
                <h3 className="customer-home-popup-name">파리바게트</h3>
                <p className="customer-home-popup-duration">02.10 ~ 02.28</p>
                <p className="customer-home-popup-location">서울시 종로구</p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <div className="customer-home-ongoing-popup-section">
        <h2 className="customer-home-ongoing-popup-title">진행 예정 팝업</h2>
        <Swiper
          spaceBetween={10}
          slidesPerView={2.5}
          className="customer-home-popup-swiper"
        >
          <SwiperSlide>
            <div className="customer-home-popup-slide">
              <img src="https://via.placeholder.com/150" alt="Popup 1" className="customer-home-popup-image" />
              <div className="customer-home-popup-info">
                <h3 className="customer-home-popup-name">홍콩반점</h3>
                <p className="customer-home-popup-duration">01.20 ~ 01.31</p>
                <p className="customer-home-popup-location">서울시 강남구</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="customer-home-popup-slide">
              <img src="https://via.placeholder.com/150" alt="Popup 2" className="customer-home-popup-image" />
              <div className="customer-home-popup-info">
                <h3 className="customer-home-popup-name">스타벅스</h3>
                <p className="customer-home-popup-duration">02.05 ~ 02.28</p>
                <p className="customer-home-popup-location">서울시 종로구</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="customer-home-popup-slide">
              <img src="https://via.placeholder.com/150" alt="Popup 2" className="customer-home-popup-image" />
              <div className="customer-home-popup-info">
                <h3 className="customer-home-popup-name">파리바게트</h3>
                <p className="customer-home-popup-duration">02.10 ~ 02.28</p>
                <p className="customer-home-popup-location">서울시 종로구</p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
    )
}
export default Customerhome;
