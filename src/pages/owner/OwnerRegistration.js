import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../login/axios';
import '../../styles/owner/OwnerRegistration.css';
import MyButton from '../../components/MyButton';

const OwnerRegistration = () => {
  const navigate = useNavigate();
  const [roadAddress, setRoadAddress] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [storeName, setStoreName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [businessStartHours, setBusinessStartHours] = useState('');
  const [businessEndHours, setBusinessEndHours] = useState('');
  const [maxReservations, setMaxReservations] = useState('');
  const [popupDescription, setPopupDescription] = useState('');
  const [menuItems, setMenuItems] = useState([{ name: '', description: '', price: '', remarks: '' }]);
  const [storeImage, setStoreImage] = useState(null);
  const [menuImages, setMenuImages] = useState([null]);
  const [isAddressSelected, setIsAddressSelected] = useState(false);
  const [errors, setErrors] = useState({});

  const handleRoadAddressChange = (e) => {
    setRoadAddress(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, roadAddress: false }));
  };

  const handleZipcodeChange = (e) => {
    setZipcode(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, zipcode: false }));
  };

  const handleDetailAddressChange = (e) => {
    setDetailAddress(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, detailAddress: false }));
  };

  const handleStoreNameChange = (e) => {
    setStoreName(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, storeName: false }));
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, startDate: false }));
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, endDate: false }));
  };

  const handleBusinessStartChange = (e) => {
    setBusinessStartHours(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, businessStartHours: false }));
  };

  const handleBusinessEndChange = (e) => {
    setBusinessEndHours(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, businessEndHours: false }));
  };

  const handleMaxReservationsChange = (e) => {
    setMaxReservations(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, maxReservations: false }));
  };

  const handlePopupDescriptionChange = (e) => {
    setPopupDescription(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, popupDescription: false }));
  };

  const handleMenuItemChange = (index, field, value) => {
    const newMenuItems = [...menuItems];
    newMenuItems[index][field] = value;
    setMenuItems(newMenuItems);
    setErrors((prevErrors) => ({ ...prevErrors, [`menu${field.charAt(0).toUpperCase() + field.slice(1)}${index}`]: false }));
  };

  const addMenuItem = () => {
    setMenuItems([...menuItems, { name: '', description: '', price: '', remarks: '' }]);
    setMenuImages([...menuImages, null]);
  };

  const removeMenuItem = (index) => {
    const newMenuItems = menuItems.filter((_, i) => i !== index);
    setMenuItems(newMenuItems);
    const newMenuImages = menuImages.filter((_, i) => i !== index);
    setMenuImages(newMenuImages);
  };

  const handleStoreImageChange = (e) => {
    setStoreImage(e.target.files[0]);
  };

  const handleMenuImageChange = (index, e) => {
    const newMenuImages = [...menuImages];
    newMenuImages[index] = e.target.files[0];
    setMenuImages(newMenuImages);
  };

  const handleRegisterClick = async () => {
    const data = {
      name: storeName,
      startDateTime: startDate ? new Date(startDate).toISOString() : null,
      endDateTime: endDate ? new Date(endDate).toISOString() : null,
      description: popupDescription,
      address: {
        zipcode: zipcode,
        street: roadAddress,
        detail: detailAddress,
      },
      businessTimes: [{
        openTime: businessStartHours ? businessStartHours + ':00' : null,
        closeTime: businessEndHours ? businessEndHours + ':00' : null,
        reservationTimeUnit: 30,
        maxPeoplePerTime: Number(maxReservations),
      }],
      menuForms: menuItems.map((item) => ({
        name: item.name,
        description: item.description,
        price: Number(item.price),
      })),
    };

    try {
      const response = await axiosInstance.post('/owners/popup/register', data);
      alert('등록이 완료되었습니다.');
      navigate('/owner/home');
    } catch (error) {
      console.error('팝업 등록 중 오류가 발생했습니다:', error.response ? error.response.data : error.message);
      alert(`팝업 등록 중 오류가 발생했습니다: ${error.response ? JSON.stringify(error.response.data) : error.message}`);
    }
  };

  const handleCancelClick = () => {
    alert('등록이 취소되었습니다.');
    navigate('/owner/home');
  };

  const handlePostcodeComplete = (data) => {
    setRoadAddress(data.roadAddress);
    setZipcode(data.zonecode);
    setIsAddressSelected(true);
  };

  const handlePostcodeButtonClick = () => {
    const width = 500;
    const height = 600;
    const left = (window.screen.width / 2) - (width / 2);
    const top = (window.screen.height / 2) - (height / 2);
    const newWindow = window.open('', 'postcode', `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes`);
    newWindow.document.write('<div id="postcode-container"></div>');
    newWindow.document.write(`
      <script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
      <script>
        new daum.Postcode({
          oncomplete: function(data) {
            window.opener.postMessage(data, '*');
            window.close();
          }
        }).embed(document.getElementById('postcode-container'));
      </script>
    `);
  };

  useEffect(() => {
    const handlePostMessage = (event) => {
      if (event.origin !== window.location.origin) return;
      if (event.data && event.data.zonecode) {
        handlePostcodeComplete(event.data);
      }
    };

    window.addEventListener('message', handlePostMessage);

    return () => {
      window.removeEventListener('message', handlePostMessage);
    };
  }, []);

  return (
    <div className="registration-container">
      <h2 className="registration-title">
        팝업 기본 정보 입력
      </h2>
      <div style={{ display: "flex", marginBottom: "20px" }}>
        <div style={{ flex: 1, marginRight: "10px" }}>
          <div
            style={{
              backgroundColor: "#f0f0f0",
              height: "130px",
              width: '130px',
              borderRadius: '10px',
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            {storeImage ? (
              <img
                src={URL.createObjectURL(storeImage)}
                alt="Store"
                style={{ height: "130px",width: '130px', borderRadius: '10px' }}
              />
            ) : (
              <span>팝업 사진</span>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleStoreImageChange}
          />
        </div>
        <div style={{ flex: 2 }}>
          <input
            type="text"
            placeholder="팝업 이름"
            value={storeName}
            onChange={handleStoreNameChange}
            className={errors.storeName ? "error" : ""}
          />
          <input
            type="text"
            placeholder="팝업 설명"
            value={popupDescription}
            onChange={handlePopupDescriptionChange}
            className={errors.popupDescription ? "error" : ""}
          />
        </div>
      </div>

      <h2 className="registration-title">주소 정보 입력</h2>
      <div style={{ marginBottom: "20px", position: "relative" }}>
        <input
          type="text"
          placeholder="도로명 주소"
          value={roadAddress}
          onChange={handleRoadAddressChange}
          className={errors.roadAddress ? "error" : ""}
          readOnly={isAddressSelected}
        />
        <MyButton
          text="검색"
          type="default"
          onClick={handlePostcodeButtonClick}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="우편번호"
          value={zipcode}
          onChange={handleZipcodeChange}
          className={errors.zipcode ? "error" : ""}
          readOnly={isAddressSelected}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="상세 주소"
          value={detailAddress}
          onChange={handleDetailAddressChange}
          className={errors.detailAddress ? "error" : ""}
        />
      </div>

      <h2 className="registration-title">영업 시간 입력</h2>

      <input
        type="datetime-local"
        placeholder="시작 날짜와 시간"
        value={startDate}
        onChange={handleStartDateChange}
        className={errors.startDate ? "error" : ""}
      />
      <input
        type="datetime-local"
        placeholder="종료 날짜와 시간"
        value={endDate}
        onChange={handleEndDateChange}
        className={errors.endDate ? "error" : ""}
      />
      <input
        type="time"
        placeholder="팝업 시작 시간"
        value={businessStartHours}
        onChange={handleBusinessStartChange}
        className={errors.businessStartHours ? "error" : ""}
      />
      <input
        type="time"
        placeholder="팝업 종료 시간"
        value={businessEndHours}
        onChange={handleBusinessEndChange}
        className={errors.businessEndHours ? "error" : ""}
      />
      <input
        type="number"
        placeholder="시간 당 최대 예약 인원"
        value={maxReservations}
        onChange={handleMaxReservationsChange}
        className={errors.maxReservations ? "error" : ""}
      />
      <h2 className="registration-title">메뉴 정보 입력</h2>
      <div style={{ marginBottom: "10px" }}>
        {menuItems.map((menuItem, index) => (
          <div key={index} className="menu-item">
            <div style={{ display: "flex", marginBottom: "20px" }}>
              <div style={{ flex: 1, marginRight: "10px" }}>
                <div
                  style={{
                    backgroundColor: "#f0f0f0",
                    height: "130px",
                    width: '130px',
                    borderRadius: '10px',
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  {menuImages[index] ? (
                    <img
                      src={URL.createObjectURL(menuImages[index])}
                      alt="Menu"
                      style={{ height: "130px",width: '130px', borderRadius: '10px' }}
                    />
                  ) : (
                    <span>메뉴 사진</span>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleMenuImageChange(index, e)}
                  style={{
                      border: '1px'
                  }}
                />
              </div>
              <div style={{ flex: 2 }}>
                <div style={{ flex: 2 }}>
                  <input
                    type="text"
                    placeholder="메뉴 이름"
                    value={menuItem.name}
                    onChange={(e) =>
                      handleMenuItemChange(index, "name", e.target.value)
                    }
                    className={errors[`menuName${index}`] ? "error" : ""}
                  />
                  <input
                    type="text"
                    placeholder="메뉴 설명"
                    value={menuItem.description}
                    onChange={(e) =>
                      handleMenuItemChange(
                        index,
                        "description",
                        e.target.value
                      )
                    }
                    className={
                      errors[`menuDescription${index}`] ? "error" : ""
                    }
                  />
                  <input
                    type="number"
                    placeholder="메뉴 가격"
                    value={menuItem.price}
                    onChange={(e) =>
                      handleMenuItemChange(index, "price", e.target.value)
                    }
                    step="1000"
                    className={errors[`menuPrice${index}`] ? "error" : ""}
                  />
                  <MyButton
                    text="메뉴 삭제"
                    type="warning"
                    onClick={() => removeMenuItem(index)}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
        <MyButton text="메뉴 추가" type="alt" onClick={addMenuItem} />
      </div>
      <div className="actions">
        <MyButton text="등록" type="default" onClick={handleRegisterClick} />
        <MyButton text="취소" type="alt" onClick={handleCancelClick} />
      </div>
    </div>
  );
}

export default OwnerRegistration;
