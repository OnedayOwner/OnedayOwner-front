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
        <div className="banner-slide">
          <Swiper
            spaceBetween={10}
            slidesPerView={1}
            pagination={{ clickable: true }}
            onSlideChange={handleSlideChange}
            className="inner-swiper"
          >
            <SwiperSlide>
              <div className="slide-content">
                <h2>창업을 시도하기 두려우셨나요?</h2>
                <p>실제 매장 경험을 통해 창업 경험을 쌓아보세요</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="slide-content">
                <h2>두 번째 배너</h2>
                <p>이곳에 두 번째 배너의 정보를 넣으세요.</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="slide-content">
                <h2>세 번째 배너</h2>
                <p>이곳에 세 번째 배너의 정보를 넣으세요.</p>
              </div>
            </SwiperSlide>
          </Swiper>
          <div className="page-indicator">
            {currentPage} / 3
          </div>
        </div>
      </div>
      <div className="category-buttons">
        <button className="category-button">
          <GiChopsticks /> 한식
        </button>
        <button className="category-button">
          <GiNoodles /> 중식
        </button>
        <button className="category-button">
          <GiSushis /> 일식
        </button>
        <button className="category-button">
          <FaPizzaSlice /> 양식
        </button>
        <button className="category-button">
          <BsThreeDots /> 기타
        </button>
      </div>
    </div>
    )
}
export default Customerhome;
