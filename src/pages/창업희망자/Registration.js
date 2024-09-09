import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../App.css';

const Registration = () => {
    const navigate = useNavigate(); // 페이지 이동을 위한 navigate 훅
    const [roadAddress, setRoadAddress] = useState(''); // 도로명 주소 상태
    const [zipcode, setZipcode] = useState(''); // 우편번호 상태
    const [detailAddress, setDetailAddress] = useState(''); // 상세 주소 상태
    const [storeName, setStoreName] = useState(''); // 매장 이름 상태
    const [startDate, setStartDate] = useState(''); // 시작 날짜 상태
    const [endDate, setEndDate] = useState(''); // 종료 날짜 상태
    const [businessHours, setBusinessHours] = useState(''); // 영업 시간 상태
    const [maxReservations, setMaxReservations] = useState(''); // 최대 예약 인원 상태
    const [popupDescription, setPopupDescription] = useState(''); // 팝업 설명 상태
    const [menuItems, setMenuItems] = useState([{ name: '', description: '', price: '', remarks: '' }]); // 메뉴 항목 상태
    const [storeImage, setStoreImage] = useState(null); // 매장 이미지 상태
    const [menuImages, setMenuImages] = useState([null]); // 메뉴 이미지 상태
    const [isAddressSelected, setIsAddressSelected] = useState(false); // 주소 선택 여부 상태
    const [errors, setErrors] = useState({}); // 에러 상태
    const [token, setToken] = useState(localStorage.getItem('token') || ''); // 인증 토큰 상태

    // 도로명 주소 변경 핸들러
    const handleRoadAddressChange = (e) => {
        setRoadAddress(e.target.value);
        setErrors(prevErrors => ({ ...prevErrors, roadAddress: false })); // 에러 상태 초기화
    }

    // 우편번호 변경 핸들러
    const handleZipcodeChange = (e) => {
        setZipcode(e.target.value);
        setErrors(prevErrors => ({ ...prevErrors, zipcode: false }));
    }

    // 상세 주소 변경 핸들러
    const handleDetailAddressChange = (e) => {
        setDetailAddress(e.target.value);
        setErrors(prevErrors => ({ ...prevErrors, detailAddress: false }));
    }

    // 매장 이름 변경 핸들러
    const handleStoreNameChange = (e) => {
        setStoreName(e.target.value);
        setErrors(prevErrors => ({ ...prevErrors, storeName: false }));
    }

    // 시작 날짜 변경 핸들러
    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
        setErrors(prevErrors => ({ ...prevErrors, startDate: false }));
    }

    // 종료 날짜 변경 핸들러
    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
        setErrors(prevErrors => ({ ...prevErrors, endDate: false }));
    }

    // 영업 시간 변경 핸들러
    const handleBusinessHoursChange = (e) => {
        setBusinessHours(e.target.value);
        setErrors(prevErrors => ({ ...prevErrors, businessHours: false }));
    }

    // 최대 예약 인원 변경 핸들러
    const handleMaxReservationsChange = (e) => {
        setMaxReservations(e.target.value);
        setErrors(prevErrors => ({ ...prevErrors, maxReservations: false }));
    }

    // 팝업 설명 변경 핸들러
    const handlePopupDescriptionChange = (e) => {
        setPopupDescription(e.target.value);
        setErrors(prevErrors => ({ ...prevErrors, popupDescription: false }));
    }

    // 메뉴 항목 변경 핸들러
    const handleMenuItemChange = (index, field, value) => {
        const newMenuItems = [...menuItems];
        newMenuItems[index][field] = value; // 해당 메뉴 항목의 값을 업데이트
        setMenuItems(newMenuItems);
        setErrors(prevErrors => ({ ...prevErrors, [`menu${field.charAt(0).toUpperCase() + field.slice(1)}${index}`]: false }));
    }

    // 메뉴 항목 추가 핸들러
    const addMenuItem = () => {
        setMenuItems([...menuItems, { name: '', description: '', price: '', remarks: '' }]); // 빈 메뉴 항목 추가
        setMenuImages([...menuImages, null]); // 메뉴 이미지 추가
    }

    // 메뉴 항목 삭제 핸들러
    const removeMenuItem = (index) => {
        const newMenuItems = menuItems.filter((_, i) => i !== index); // 선택된 메뉴 항목 삭제
        setMenuItems(newMenuItems);
        const newMenuImages = menuImages.filter((_, i) => i !== index); // 선택된 메뉴 이미지 삭제
        setMenuImages(newMenuImages);
    }

    // 매장 이미지 변경 핸들러
    const handleStoreImageChange = (e) => {
        setStoreImage(e.target.files[0]); // 선택된 파일을 상태로 업데이트
    }

    // 메뉴 이미지 변경 핸들러
    const handleMenuImageChange = (index, e) => {
        const newMenuImages = [...menuImages];
        newMenuImages[index] = e.target.files[0]; // 선택된 파일을 상태로 업데이트
        setMenuImages(newMenuImages);
    }

    // 등록 클릭 핸들러
    const handleRegisterClick = async () => {
        // 서버에 보낼 데이터 구성
        const data = {
            name: storeName,
            startDateTime: startDate ? new Date(startDate).toISOString() : null,
            endDateTime: endDate ? new Date(endDate).toISOString() : null,
            description: popupDescription,
            address: {
                zipcode: zipcode,
                street: roadAddress,
                detail: detailAddress
            },
            businessTimes: [{
                openTime: businessHours ? businessHours + ":00" : null,
                closeTime: businessHours ? businessHours + ":00" : null,
                reservationTimeUnit: 30,
                maxPeoplePerTime: Number(maxReservations)
            }],
            menuForms: menuItems.map((item) => ({
                name: item.name,
                description: item.description,
                price: Number(item.price)
            }))
        };
        console.log(data); // 데이터 확인용 로그

        try {
            // 서버에 데이터 전송
            const response = await axios.post('http://ec2-3-39-193-47.ap-northeast-2.compute.amazonaws.com:8080/api/owners/popup/register', data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });
            alert('등록이 완료되었습니다.'); // 성공 시 알림
            navigate('/Ownerhome'); // 홈으로 이동
        } catch (error) {
            console.error('팝업 등록 중 오류가 발생했습니다:', error.response ? error.response.data : error.message);
            alert(`팝업 등록 중 오류가 발생했습니다: ${error.response ? JSON.stringify(error.response.data) : error.message}`);
        }
    }

    // 취소 클릭 핸들러
    const handleCancelClick = () => {
        alert('등록이 취소되었습니다.'); // 취소 알림
        navigate('/Ownerhome'); // 홈으로 이동
    }

    // 주소 검색 완료 핸들러
    const handlePostcodeComplete = (data) => {
        setRoadAddress(data.roadAddress); // 도로명 주소 업데이트
        setZipcode(data.zonecode); // 우편번호 업데이트
        setIsAddressSelected(true); // 주소 선택 상태 업데이트
    }

    // 주소 검색 버튼 클릭 핸들러
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
                        window.opener.postMessage(data, '*'); // 주소 데이터 전송
                        window.close(); // 창 닫기
                    }
                }).embed(document.getElementById('postcode-container'));
            </script>
        `);
    };

    useEffect(() => {
        // postMessage 이벤트를 처리하는 함수 정의
        const handlePostMessage = (event) => {
            // 이벤트의 출처가 현재 도메인인지 확인
            if (event.origin !== window.location.origin) return;
            // 이벤트 데이터에 zonecode가 있는 경우 처리
            if (event.data && event.data.zonecode) {
                handlePostcodeComplete(event.data);
            }
        };
    
        // message 이벤트 리스너 등록
        window.addEventListener('message', handlePostMessage);
    
        // 컴포넌트 언마운트 시 이벤트 리스너 제거
        return () => {
            window.removeEventListener('message', handlePostMessage);
        };
    }, []); // 빈 배열로 인해 컴포넌트가 처음 렌더링될 때만 실행
    
    return (
        <div className="registration-container">
            <h1>팝업 등록</h1>
            <div style={{ marginBottom: '20px', position: 'relative' }}>
                <input
                    type="text"
                    placeholder='도로명 주소'
                    value={roadAddress}
                    onChange={handleRoadAddressChange}
                    className={errors.roadAddress ? 'error' : ''}
                    readOnly={isAddressSelected} // 주소가 선택된 경우 읽기 전용
                />
                <button onClick={handlePostcodeButtonClick} className="address-search-button">검색</button>
            </div>
            <div>
                <input 
                    type='text'
                    placeholder='우편번호'
                    value={zipcode}
                    onChange={handleZipcodeChange}
                    className={errors.zipcode ? 'error' : ''}
                    readOnly={isAddressSelected} // 주소가 선택된 경우 읽기 전용
                />
            </div>
            <div>
                <input 
                    type='text'
                    placeholder='상세 주소'
                    value={detailAddress}
                    onChange={handleDetailAddressChange}
                    className={errors.detailAddress ? 'error' : ''}
                />
            </div>
            
            <div style={{ display: 'flex', marginBottom: '20px' }}>
                <div style={{ flex: 1, marginRight: '10px' }}>
                    <div style={{ backgroundColor: '#f0f0f0', height: '150px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
                        {storeImage ? <img src={URL.createObjectURL(storeImage)} alt="Store" style={{ height: '100%' }} /> : <span>매장 사진</span>}
                    </div>
                    <input type="file" accept="image/*" onChange={handleStoreImageChange} /> {/* 매장 사진 업로드 */}
                </div>
                <div style={{ flex: 2 }}>
                    <input
                        type="text"
                        placeholder="팝업 설명"
                        value={popupDescription}
                        onChange={handlePopupDescriptionChange}
                        className={errors.popupDescription ? 'error' : ''}
                    />
                    <input
                        type="text"
                        placeholder="매장 이름"
                        value={storeName}
                        onChange={handleStoreNameChange}
                        className={errors.storeName ? 'error' : ''}
                    />
                    <input
                        type="datetime-local"
                        placeholder="시작 날짜와 시간"
                        value={startDate}
                        onChange={handleStartDateChange}
                        className={errors.startDate ? 'error' : ''}
                    />
                    <input
                        type="datetime-local"
                        placeholder="종료 날짜와 시간"
                        value={endDate}
                        onChange={handleEndDateChange}
                        className={errors.endDate ? 'error' : ''}
                    />
                    <input
                        type="time"
                        placeholder="팝업 진행 시간"
                        value={businessHours}
                        onChange={handleBusinessHoursChange}
                        className={errors.businessHours ? 'error' : ''}
                    />
                    <input
                        type="number"
                        placeholder="시간 당 최대 예약 인원"
                        value={maxReservations}
                        onChange={handleMaxReservationsChange}
                        className={errors.maxReservations ? 'error' : ''}
                    />
                </div>
            </div>
            <div>
                {menuItems.map((menuItem, index) => (
                    <div key={index} className="menu-item">
                        <div style={{ flex: 1, marginRight: '10px' }}>
                            <div style={{ backgroundColor: '#f0f0f0', height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
                                {menuImages[index] ? <img src={URL.createObjectURL(menuImages[index])} alt="Menu" style={{ height: '100%' }} /> : <span>메뉴 사진</span>}
                            </div>
                            <input type="file" accept="image/*" onChange={(e) => handleMenuImageChange(index, e)} /> {/* 메뉴 사진 업로드 */}
                            <button onClick={() => removeMenuItem(index)}>메뉴 삭제</button> {/* 메뉴 삭제 버튼 */}
                        </div>
                        <div style={{ flex: 2 }}>
                            <input
                                type="text"
                                placeholder="메뉴 이름"
                                value={menuItem.name}
                                onChange={(e) => handleMenuItemChange(index, 'name', e.target.value)}
                                className={errors[`menuName${index}`] ? 'error' : ''}
                            />
                            <input
                                type="text"
                                placeholder="메뉴에 대한 설명"
                                value={menuItem.description}
                                onChange={(e) => handleMenuItemChange(index, 'description', e.target.value)}
                                className={errors[`menuDescription${index}`] ? 'error' : ''}
                            />
                            <input
                                type="number"
                                placeholder="메뉴 가격"
                                value={menuItem.price}
                                onChange={(e) => handleMenuItemChange(index, 'price', e.target.value)}
                                className={errors[`menuPrice${index}`] ? 'error' : ''}
                            />
                        </div>
                    </div>
                ))}
                <div className="add-menu-button">
                    <button onClick={addMenuItem}>+</button> {/* 메뉴 추가 버튼 */}
                </div>
            </div>
            <div className="actions">
                <button onClick={handleRegisterClick}>등록</button> {/* 등록 버튼 */}
                <button onClick={handleCancelClick}>취소</button> {/* 취소 버튼 */}
            </div>
        </div>
    );
}

export default Registration;
