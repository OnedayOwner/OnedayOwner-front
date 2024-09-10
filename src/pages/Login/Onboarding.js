import React from 'react';
import { useNavigate } from 'react-router-dom';
import onboarding from '../../assets/images/onboarding.png';
import './Onboarding.css';
import MyButton from '../../components/MyButton';

const Onboarding = () => {
  const navigate = useNavigate();

  const gotoLogin = () => {
    navigate('/login');
  };

  const goToSignup = () => {
    navigate('/signup');
  };

  return (
    <div className="onboarding-container">
      <div className="onboarding-header">
        <h1 className="onboarding-header__title">오늘만 사장</h1> 
        <p className="onboarding-header__subtitle">창업을 시도하기 두려우셨나요?<br/>실제 매장 경험을 통해 창업 경험을 쌓아보세요</p>
      </div>
      <div className="onboarding-image-container">
        <img className="onboarding-image" src={onboarding} alt="온보딩 이미지" />
      </div>
      <div className="onboarding-buttons">
        <MyButton onClick={gotoLogin} text="로그인" type="default" />
        <MyButton onClick={goToSignup} text="회원가입" type="alt" />
      </div>
    </div>
  );
};

export default Onboarding;
