import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { popupState, completedPopupsState } from './../../atoms';
import './Ownerhome.css'; // 스타일링을 위한 CSS 파일을 추가합니다.

const Ownerhome = () => {
  const [activeTab, setActiveTab] = useState('ongoing');
  const [popup, setPopup] = useRecoilState(popupState);
  const [completedPopups, setCompletedPopups] = useRecoilState(completedPopupsState);
  const navigate = useNavigate();
  const token = localStorage.getItem('token') || '';

  const handleTabChange = (tab) => setActiveTab(tab);

  const handleFeedbackClick = () => navigate('/feedback');
  const handleReservationStatusClick = () => navigate('/reservationStatus');
  const handleRegisterClick = () => navigate('/registration');
  const handleEditClick = () => navigate('/registration', { state: { popup } });

  useEffect(() => {
    const fetchPopups = async () => {
      try {
        const ongoingResponse = await axios.get('http://ec2-3-39-193-47.ap-northeast-2.compute.amazonaws.com:8080/api/owners/popup', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setPopup(ongoingResponse.data);

        const completedResponse = await axios.get('http://ec2-3-39-193-47.ap-northeast-2.compute.amazonaws.com:8080/api/owners/popup/history/list', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setCompletedPopups(completedResponse.data);
      } catch (error) {
        console.error('팝업 정보를 가져오는 중 오류가 발생했습니다:', error.response ? error.response.data : error.message);
      }
    };

    fetchPopups();
  }, [token]);

  const handleDeletePopup = async (popupId) => {
    if (window.confirm('이 팝업을 삭제하시겠습니까?')) {
      try {
        await axios.delete(`http://ec2-3-39-193-47.ap-northeast-2.compute.amazonaws.com:8080/api/owners/popup/${popupId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        alert('팝업이 삭제되었습니다.');
        setPopup(null);
        setCompletedPopups(completedPopups.filter(popup => popup.id !== popupId));
      } catch (error) {
        console.error('팝업 삭제 중 오류가 발생했습니다:', error.response ? error.response.data : error.message);
        alert('팝업 삭제 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <div className="ownerhome-container">
      <h1>오늘만 사장</h1>
      <div className="tab-buttons">
        <button
          onClick={() => handleTabChange('ongoing')}
          className={`tab-button ${activeTab === 'ongoing' ? 'active' : ''}`}
        >
          진행중인 팝업
        </button>
        <button
          onClick={() => handleTabChange('completed')}
          className={`tab-button ${activeTab === 'completed' ? 'active' : ''}`}
        >
          진행했던 팝업
        </button>
      </div>
      {activeTab === 'ongoing' && (
        <div className="popup-details">
          <h2>등록한 팝업</h2>
          {popup ? (
            <div className="popup-info">
              <div className="popup-image">
                <span>팝업 매장 사진</span>
              </div>
              <div className="popup-description">
                <h3>{popup.name}</h3>
                <p><strong>우편번호:</strong> {popup.address.zipcode}</p>
                <p><strong>도로명 주소:</strong> {popup.address.street}</p>
                <p><strong>상세 주소:</strong> {popup.address.detail}</p>
                <p><strong>설명:</strong> {popup.description}</p>
                <p><strong>기간:</strong> {popup.startDateTime} ~ {popup.endDateTime}</p>
              </div>
              <div className="menu-list">
                {popup.menus.map((menu, index) => (
                  <div key={index} className="menu-item">
                    <div className="menu-image">
                      <span>메뉴 사진</span>
                    </div>
                    <div className="menu-description">
                      <p><strong>메뉴 이름:</strong> {menu.name}</p>
                      <p><strong>메뉴 설명:</strong> {menu.description}</p>
                      <p><strong>메뉴 가격:</strong> {menu.price}원</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="action-buttons">
                <button onClick={handleFeedbackClick}>피드백</button>
                <button onClick={handleReservationStatusClick}>예약 현황</button>
                <button onClick={() => handleDeletePopup(popup.id)} className="delete-button">삭제</button>
              </div>
            </div>
          ) : (
            <p>진행중인 팝업이 없습니다.</p>
          )}
          <button onClick={handleRegisterClick} className="register-button">팝업 등록</button>
        </div>
      )}
      {activeTab === 'completed' && (
        <div className="popup-list">
          {completedPopups.length > 0 ? (
            completedPopups.map(popup => (
              <div key={popup.id} className="popup-item">
                <div className="popup-image">
                  <span>사진</span>
                </div>
                <div className="popup-description">
                  <h3>{popup.name}</h3>
                  <p><strong>도로명 주소:</strong> {popup.address.street}</p>
                  <p><strong>우편번호:</strong> {popup.address.zipcode}</p>
                  <p><strong>상세 주소:</strong> {popup.address.detail}</p>
                  <p><strong>설명:</strong> {popup.description}</p>
                  <p><strong>기간:</strong> {popup.startDateTime} ~ {popup.endDateTime}</p>
                  <button className="detail-button">상세보기</button>
                  <button onClick={() => handleDeletePopup(popup.id)} className="delete-button">삭제</button>
                </div>
              </div>
            ))
          ) : (
            <p>진행했던 팝업이 없습니다.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Ownerhome;
