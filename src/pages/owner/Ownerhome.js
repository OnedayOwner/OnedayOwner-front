import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { popupState, completedPopupsState } from '../../atoms';
import '../../styles/owner/Ownerhome.css';
import MyButton from '../../components/MyButton';

const Ownerhome = () => {
  const [activeTab, setActiveTab] = useState('ongoing');
  const [popup, setPopup] = useRecoilState(popupState);
  const [completedPopups, setCompletedPopups] = useRecoilState(completedPopupsState);
  const [selectedCompletedPopup, setSelectedCompletedPopup] = useState(null); // 선택된 팝업의 상세 정보를 저장
  const navigate = useNavigate();
  const token = localStorage.getItem('token') || '';

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedCompletedPopup(null); // 탭을 변경할 때 상세보기 초기화
  };

  const handleFeedbackClick = () => navigate(`/owner/feedback/${popup.id}`);
  const handleReservationStatusClick = () => {
    if (popup) {
      navigate(`/owner/reservationstatus/${popup.id}`);
    } else {
      alert("현재 진행 중인 팝업이 없습니다.");
    }
  };
  const handleRegisterClick = () => navigate('/owner/registration');

  useEffect(() => {
    const fetchPopups = async () => {
      try {
        const ongoingResponse = await axios.get(`${process.env.REACT_APP_BACK_URL}/api/owners/popup`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setPopup(ongoingResponse.data); // 진행중인 팝업 상태 설정
      } catch (error) {
        console.error('팝업 정보를 가져오는 중 오류가 발생했습니다:', error.response ? error.response.data : error.message);}
      try {
        const completedResponse = await axios.get(`${process.env.REACT_APP_BACK_URL}/api/owners/popup/history/list`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setCompletedPopups(completedResponse.data); // 완료된 팝업 상태 설정

      } catch (error) {
        console.error('팝업 정보를 가져오는 중 오류가 발생했습니다:', error.response ? error.response.data : error.message);
      }
    };

    fetchPopups();
  }, [token]);

  // 완료된 팝업 상세 정보를 조회하는 함수
  const fetchCompletedPopupDetails = async (popupId) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACK_URL}/api/owners/popup/history/${popupId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setSelectedCompletedPopup(response.data); // 선택된 팝업의 상세 정보 저장
    } catch (error) {
      console.error('팝업 상세 정보를 가져오는 중 오류가 발생했습니다:', error.response ? error.response.data : error.message);
    }
  };

  const handleDeletePopup = async (popupId) => {
    if (window.confirm('이 팝업을 삭제하시겠습니까?')) {
      try {
        await axios.post(`${process.env.REACT_APP_BACK_URL}/api/owners/popup/${popupId}/delete`, null, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        alert('팝업이 삭제되었습니다.');
        // 삭제 후 현재 상태에서 해당 팝업을 제거
        setCompletedPopups(completedPopups.filter(popup => popup.id !== popupId));
      } catch (error) {
        console.error('팝업 삭제 중 오류가 발생했습니다:', error.response ? error.response.data : error.message);
        alert('팝업 삭제 중 오류가 발생했습니다.');
      }
    }
  };

  const handleClosePopup = async (popupId) => {
    if (window.confirm('이 팝업을 종료하시겠습니까?')) {
      try {
        await axios.post(`${process.env.REACT_APP_BACK_URL}/api/owners/popup/${popupId}/close`, null, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        alert('팝업이 종료되었습니다.');

        // 완료된 팝업 리스트에 추가
        setCompletedPopups(prevCompleted => [...prevCompleted, popup]);
        setPopup(null); // 진행중인 팝업 상태를 비움
      } catch (error) {
        console.error('팝업 종료 중 오류가 발생했습니다:', error.response ? error.response.data : error.message);
        alert('팝업 종료 중 오류가 발생했습니다.');
      }
    }
  };

  const handlePopupClick = (popupId) => {
    fetchCompletedPopupDetails(popupId); // 팝업 클릭 시 상세 정보를 가져옴
  };

  return (
    <div className="ownerhome-container">

      <div className="ownerhome-header">
        <h1 className="ownerhome-header__title">오늘만 사장</h1>
        <div className="ownerhome-tabs">
          <button
            className={`ownerhome-tab ${activeTab === "ongoing" ? "active" : ""}`}
            onClick={() => handleTabChange("ongoing")}
          >
            진행중인 팝업
          </button>
          <button
            className={`ownerhome-tab ${activeTab === "completed" ? "active" : ""}`}
            onClick={() => handleTabChange("completed")}
          >
            진행했던 팝업
          </button>
        </div>
      </div>


      {activeTab === "ongoing" && (
        <div className="popup-details">
          {popup ? (
            <div className="popup-info">
              <div className="popup-image">
                <span>팝업 매장 사진</span>
              </div>
              <div className="popup-description">
                <h3>{popup.name}</h3>
                <p>
                  <strong>우편번호:</strong> {popup.address.zipcode}
                </p>
                <p>
                  <strong>도로명 주소:</strong> {popup.address.street}
                </p>
                <p>
                  <strong>상세 주소:</strong> {popup.address.detail}
                </p>
                <p>
                  <strong>설명:</strong> {popup.description}
                </p>
                <p>
                  <strong>팝업 기간:</strong> {popup.startDateTime} ~{" "}
                  {popup.endDateTime}
                </p>
                <p>
                  <strong>영업 시간:</strong> {popup.businessTimes[0]?.openTime}{" "}
                  ~ {popup.businessTimes[0]?.closeTime}
                </p>
              </div>
              <div className="menu-list">
                {popup.menus.map((menu, index) => (
                  <div key={index} className="menu-item">
                    <div className="menu-image">
                      <span>메뉴 사진</span>
                    </div>
                    <div className="menu-description">
                      <p>
                        <strong>메뉴 이름:</strong> {menu.name}
                      </p>
                      <p>
                        <strong>메뉴 설명:</strong> {menu.description}
                      </p>
                      <p>
                        <strong>메뉴 가격:</strong> {menu.price}원
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="action-buttons">
                <button onClick={handleFeedbackClick}>피드백</button>
                <button onClick={handleReservationStatusClick}>
                  예약 현황
                </button>
                <button
                  onClick={() => handleClosePopup(popup.id)}
                  className="close-button"
                >
                  종료
                </button>
                <button
                  onClick={() => handleDeletePopup(popup.id)}
                  className="delete-button"
                >
                  삭제
                </button>
              </div>
            </div>
          ) : (
            <div>
              <p>진행중인 팝업이 없습니다.</p>
              <MyButton text="팝업 등록" type="default" onClick={handleRegisterClick}/>
            </div>
          )}
          
        </div>
      )}
      {activeTab === "completed" && (
        <div className="popup-list">
          {selectedCompletedPopup ? (
            <div className="popup-info">
              <div className="popup-image">
                <span>팝업 매장 사진</span>
              </div>
              <div className="popup-description">
                <h3>{selectedCompletedPopup.name}</h3>
                <p>
                  <strong>도로명 주소:</strong>{" "}
                  {selectedCompletedPopup.address.street}
                </p>
                <p>
                  <strong>우편번호:</strong>{" "}
                  {selectedCompletedPopup.address.zipcode}
                </p>
                <p>
                  <strong>상세 주소:</strong>{" "}
                  {selectedCompletedPopup.address.detail}
                </p>
                <p>
                  <strong>설명:</strong> {selectedCompletedPopup.description}
                </p>
                <p>
                  <strong>기간:</strong> {selectedCompletedPopup.startDateTime}{" "}
                  ~ {selectedCompletedPopup.endDateTime}
                </p>
                <div className="menu-list">
                  {selectedCompletedPopup.menus.map((menu, index) => (
                    <div key={index} className="menu-item">
                      <div className="menu-image">
                        <span>메뉴 사진</span>
                      </div>
                      <div className="menu-description">
                        <p>
                          <strong>메뉴 이름:</strong> {menu.name}
                        </p>
                        <p>
                          <strong>메뉴 설명:</strong> {menu.description}
                        </p>
                        <p>
                          <strong>메뉴 가격:</strong> {menu.price}원
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => handleDeletePopup(selectedCompletedPopup.id)}
                  className="delete-button"
                >
                  삭제
                </button>
              </div>
              <button
                onClick={() => setSelectedCompletedPopup(null)}
                className="back-button"
              >
                목록으로 돌아가기
              </button>
            </div>
          ) : completedPopups.length > 0 ? (
            completedPopups.map((popup) => (
              <div
                key={popup.id}
                className="popup-summary"
                onClick={() => handlePopupClick(popup.id)}
              >
                <div className="popup-image">
                  <span>매장 사진</span>
                </div>
                <div className="popup-name">
                  <h3>{popup.name}</h3>
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
};

export default Ownerhome;