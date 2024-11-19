import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { popupState, completedPopupsState } from '../../atoms';
import axiosInstance from '../login/axios';
import { FaMapMarkerAlt, FaCalendarAlt, FaInfoCircle, FaClock } from 'react-icons/fa';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import '../../styles/owner/Ownerhome.css';
import MyButton from '../../components/MyButton';

const Ownerhome = () => {
  const [activeTab, setActiveTab] = useState('ongoing');
  const [popup, setPopup] = useRecoilState(popupState);
  const [completedPopups, setCompletedPopups] = useRecoilState(completedPopupsState);
  const [selectedCompletedPopup, setSelectedCompletedPopup] = useState(null);
  const [coordinates, setCoordinates] = useState({ lat: 37.5665, lng: 126.9780 });
  const navigate = useNavigate();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedCompletedPopup(null);
  };

  const handleRegisterClick = () => navigate('/owner/registration');

  const fetchCompletedPopupDetails = async (popupId) => {
    try {
      const response = await axiosInstance.get(`/owners/popup/history/${popupId}`);
      setSelectedCompletedPopup(response.data);
    } catch (error) {
      console.error('팝업 상세 정보를 가져오는 중 오류가 발생했습니다:', error.response ? error.response.data : error.message);
    }
  };

  const handleClosePopup = async (popupId) => {
    if (window.confirm('이 팝업을 종료하시겠습니까?')) {
      try {
        await axiosInstance.post(`/owners/popup/${popupId}/close`);
        alert('팝업이 종료되었습니다.');
        setCompletedPopups((prev) => [...prev, popup]);
        setPopup(null);
      } catch (error) {
        console.error('팝업 종료 중 오류가 발생했습니다:', error.response ? error.response.data : error.message);
        alert('팝업 종료 중 오류가 발생했습니다.');
      }
    }
  };

  const handleDeletePopup = async (popupId) => {
    if (window.confirm('이 팝업을 삭제하시겠습니까?')) {
      try {
        await axiosInstance.post(`/owners/popup/${popupId}/delete`);
        alert('팝업이 삭제되었습니다.');
        setCompletedPopups((prev) => prev.filter((popup) => popup.id !== popupId));
      } catch (error) {
        console.error('팝업 삭제 중 오류가 발생했습니다:', error.response ? error.response.data : error.message);
        alert('팝업 삭제 중 오류가 발생했습니다.');
      }
    }
  };

  useEffect(() => {
    const fetchPopups = async () => {
      try {
        const ongoingResponse = await axiosInstance.get(`/owners/popup`);
        setPopup(ongoingResponse.data);

        const geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.addressSearch(ongoingResponse.data.address.street, (result, status) => {
          if (status === window.kakao.maps.services.Status.OK) {
            setCoordinates({ lat: parseFloat(result[0].y), lng: parseFloat(result[0].x) });
          }
        });
      } catch (error) {
        console.error('팝업 정보를 가져오는 중 오류가 발생했습니다:', error.response ? error.response.data : error.message);
      }

      try {
        const completedResponse = await axiosInstance.get(`/owners/popup/history/list`);
        setCompletedPopups(completedResponse.data);
      } catch (error) {
        console.error('팝업 정보를 가져오는 중 오류가 발생했습니다:', error.response ? error.response.data : error.message);
      }
    };

    fetchPopups();
  }, []);

  const handlePopupClick = (popupId) => {
    fetchCompletedPopupDetails(popupId);
  };

  const renderPopupDetails = (popupData) => {
    const formatTime = (time) => time.substring(0, 5);
    return (
      <div className="ownerhome-popup-container">
        <img src="https://via.placeholder.com/100" className="ownerhome-popup-image" />

        <h1 className="ownerhome-popup-name">{popupData.name}</h1>

        <div className="ownerhome-popup-info">
          <p className="ownerhome-popup-info-item">
            <FaInfoCircle className="ownerhome-popup-icon" />
            <span>{popupData.description}</span>
          </p>
          <p className="ownerhome-popup-info-item">
            <FaMapMarkerAlt className="ownerhome-popup-icon" />
            <span>{popupData.address.street}, {popupData.address.detail}</span>
          </p>
          <p className="ownerhome-popup-info-item">
            <FaCalendarAlt className="ownerhome-popup-icon" />
            <span>{new Date(popupData.startDateTime).toLocaleDateString()} ~ {new Date(popupData.endDateTime).toLocaleDateString()}</span>
          </p>
          <p className="ownerhome-popup-info-item">
            <FaClock className="ownerhome-popup-icon" />
            <span>
              {popupData.businessTimes.map((time, index) => (
                <span key={index}>
                  {formatTime(time.openTime)} - {formatTime(time.closeTime)}
                </span>
              ))}
            </span>
          </p>
        </div>

        <div className="ownerhome-popup-map">
          <h2>위치</h2>
          <div className="ownerhome-popup-map-container">
            <Map center={coordinates} style={{ width: '100%', height: '100%' }}>
              <MapMarker position={coordinates} />
            </Map>
          </div>
        </div>

        <div className="ownerhome-popup-map">
          <h2>메뉴</h2>
          {popupData.menus.map((menu, index) => (
            <div key={index} className="ownerhome-popup-menu-item">
              <img src={menu.imageUrl || "https://via.placeholder.com/100"} alt={menu.name} className="ownerhome-popup-menu-image" />
              <div className="ownerhome-popup-menu-info">
                <h3 className="ownerhome-popup-menu-name">{menu.name}</h3>
                <p className="ownerhome-popup-menu-description">{menu.description}</p>
                <p className="ownerhome-popup-menu-price">₩{menu.price.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="ownerhome-container">
      <div className="ownerhome-header">
        <h1 className="ownerhome-header-title">
          오늘만 사장
          <span className="ownerhome-header-subtitle">for 사장님</span>
        </h1>
        <div className="ownerhome-tabs">
          <button
            className={`ownerhome-tab ${
              activeTab === "ongoing" ? "active" : ""
            }`}
            onClick={() => handleTabChange("ongoing")}
          >
            진행중인 팝업
          </button>
          <button
            className={`ownerhome-tab ${
              activeTab === "completed" ? "active" : ""
            }`}
            onClick={() => handleTabChange("completed")}
          >
            진행했던 팝업
          </button>
        </div>
      </div>

      {activeTab === "ongoing" && (
        <div className="ownerhome-popup-details">
          {popup ? (
            <>
              {renderPopupDetails(popup)}
              <MyButton
                text="팝업 삭제"
                type="warning"
                onClick={() => handleDeletePopup(popup.id)}
              />
              <MyButton
                text="팝업 종료"
                type="default"
                onClick={() => handleClosePopup(popup.id)}
              />
            </>
          ) : (
            <div>
              <p className="ownerhome-no-popups">진행중인 팝업이 없습니다.</p>
              <MyButton
                text="팝업 등록"
                type="default"
                onClick={handleRegisterClick}
              />
            </div>
          )}
        </div>
      )}

      {activeTab === "completed" && (
        <div className="ownerhome-popup-list">
          {selectedCompletedPopup ? (
            <div className="ownerhome-popup-details">
              {renderPopupDetails(selectedCompletedPopup)}
              <MyButton
                text="팝업 삭제"
                type="warning"
                onClick={() => handleDeletePopup(selectedCompletedPopup.id)}
              />
              <MyButton
                text="목록으로 돌아가기"
                type="default"
                onClick={() => setSelectedCompletedPopup(null)}
              />
            </div>
          ) : completedPopups.length > 0 ? (
            completedPopups.map((popup) => (
              <div
                key={popup.id}
                className="ownerhome-popup-summary"
                onClick={() => handlePopupClick(popup.id)}
              >
                <img
                  src="https://via.placeholder.com/100"
                  className="ownerhome-popup-menu-image"
                />
                <div className="ownerhome-popup-menu-info">
                  <h3 className="ownerhome-popup-menu-name">{popup.name}</h3>
                  <p className="ownerhome-popup-menu-description">
                    {popup.address.street}, {popup.address.detail}
                  </p>
                  <p className="ownerhome-popup-menu-description">
                    {new Date(popup.startDateTime).toLocaleDateString()} ~{" "}
                    {new Date(popup.endDateTime).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="ownerhome-no-popups">진행했던 팝업이 없습니다.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Ownerhome;