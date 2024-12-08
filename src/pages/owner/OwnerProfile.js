import React, { useEffect, useState } from 'react';
import '../../styles/owner/OwnerProfile.css';
import axiosInstance from '../login/axios';
import profileImage from '../../assets/images/profile.png';
import { FaUser, FaPhone, FaBirthdayCake, FaEnvelope, FaBriefcase, FaVenusMars } from 'react-icons/fa';

const OwnerProfile = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axiosInstance.get('/users');
        setUserInfo(response.data);
      } catch (error) {
        console.error('사용자 정보를 가져오는 중 오류가 발생했습니다:', error);
      }
    };

    fetchUserInfo();
  }, []);

  const roleLabel = (role) => {
    if (role === 'CUSTOMER') return '고객';
    if (role === 'OWNER') return '사장님';
    return '알 수 없음';
  };

  return (
    <div className="customer-profile-container">
      <div className="customer-profile-header">
        <h1 className="customer-profile-header__title">내 정보</h1>
      </div>
      {userInfo ? (
        <div className="customer-profile-content">
          <div className="customer-profile-image">
            <img src={profileImage} alt="Profile" className="profile-image" />
          </div>
          <hr className="profile-divider" />
          <div className="customer-profile-details">
            <div className="detail-item">
              <FaUser className="icon" />
              <div>
                <strong>이름</strong>
                <div className="detail-value">{userInfo.name}</div>
              </div>
            </div>
            <div className="detail-item">
              <FaPhone className="icon" />
              <div>
                <strong>전화번호</strong>
                <div className="detail-value">{userInfo.phoneNumber}</div>
              </div>
            </div>
            <div className="detail-item">
              <FaBirthdayCake className="icon" />
              <div>
                <strong>생년월일</strong>
                <div className="detail-value">{userInfo.birth}</div>
              </div>
            </div>
            <div className="detail-item">
              <FaEnvelope className="icon" />
              <div>
                <strong>이메일</strong>
                <div className="detail-value">{userInfo.email}</div>
              </div>
            </div>
            <div className="detail-item">
              <FaBriefcase className="icon" />
              <div>
                <strong>역할</strong>
                <div className="detail-value">{roleLabel(userInfo.role)}</div>
              </div>
            </div>
            <div className="detail-item">
              <FaVenusMars className="icon" />
              <div>
                <strong>성별</strong>
                <div className="detail-value">{userInfo.gender === 'MALE' ? '남성' : '여성'}</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>사용자 정보를 불러오는 중...</p>
      )}
    </div>
  );
};

export default OwnerProfile;