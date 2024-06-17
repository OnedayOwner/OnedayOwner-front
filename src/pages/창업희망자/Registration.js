// src/pages/창업희망자/Registration.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Registration = () => {
    const navigate = useNavigate();
    const [roadAddress, setRoadAddress] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [detailAddress, setDetailAddress] = useState('');
    const [storeName, setStoreName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [businessHours, setBusinessHours] = useState('');
    const [maxReservations, setMaxReservations] = useState('');
    const [popupDescription, setPopupDescription] = useState('');
    const [menuItems, setMenuItems] = useState([{ name: '', description: '', price: '', remarks: '' }]);
    const [storeImage, setStoreImage] = useState(null);
    const [menuImages, setMenuImages] = useState([null]);
    const [isAddressSelected, setIsAddressSelected] = useState(false);
    const [errors, setErrors] = useState({});

    const handleRoadAddressChange = (e) => {
        setRoadAddress(e.target.value);
        setErrors(prevErrors => ({ ...prevErrors, roadAddress: false }));
    }

    const handleZipcodeChange = (e) => {
        setZipcode(e.target.value);
        setErrors(prevErrors => ({ ...prevErrors, zipcode: false }));
    }

    const handleDetailAddressChange = (e) => {
        setDetailAddress(e.target.value);
        setErrors(prevErrors => ({ ...prevErrors, detailAddress: false }));
    }

    const handleStoreNameChange = (e) => {
        setStoreName(e.target.value);
        setErrors(prevErrors => ({ ...prevErrors, storeName: false }));
    }

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
        setErrors(prevErrors => ({ ...prevErrors, startDate: false }));
    }

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
        setErrors(prevErrors => ({ ...prevErrors, endDate: false }));
    }

    const handleBusinessHoursChange = (e) => {
        setBusinessHours(e.target.value);
        setErrors(prevErrors => ({ ...prevErrors, businessHours: false }));
    }

    const handleMaxReservationsChange = (e) => {
        setMaxReservations(e.target.value);
        setErrors(prevErrors => ({ ...prevErrors, maxReservations: false }));
    }

    const handlePopupDescriptionChange = (e) => {
        setPopupDescription(e.target.value);
        setErrors(prevErrors => ({ ...prevErrors, popupDescription: false }));
    }

    const handleMenuItemChange = (index, field, value) => {
        const newMenuItems = [...menuItems];
        newMenuItems[index][field] = value;
        setMenuItems(newMenuItems);
        setErrors(prevErrors => ({ ...prevErrors, [`menu${field.charAt(0).toUpperCase() + field.slice(1)}${index}`]: false }));
    }

    const addMenuItem = () => {
        setMenuItems([...menuItems, { name: '', description: '', price: '', remarks: '' }]);
        setMenuImages([...menuImages, null]);
    }

    const removeMenuItem = (index) => {
        const newMenuItems = menuItems.filter((_, i) => i !== index);
        setMenuItems(newMenuItems);
        const newMenuImages = menuImages.filter((_, i) => i !== index);
        setMenuImages(newMenuImages);
    }

    const handleStoreImageChange = (e) => {
        setStoreImage(e.target.files[0]);
    }

    const handleMenuImageChange = (index, e) => {
        const newMenuImages = [...menuImages];
        newMenuImages[index] = e.target.files[0];
        setMenuImages(newMenuImages);
    }

    const handleRegisterClick = async () => {
        const formData = new FormData();

        formData.append('name', storeName);
        if (startDate) {
            formData.append('startDateTime', new Date(startDate).toISOString());
        }
        if (endDate) {
            formData.append('endDateTime', new Date(endDate).toISOString());
        }
        formData.append('description', popupDescription);
        formData.append('address[city]', '도시명'); // 도시명은 적절한 값으로 변경
        formData.append('address[street]', roadAddress); // 도로명 주소는 적절한 값으로 변경
        formData.append('address[zipcode]', zipcode); // 우편번호는 적절한 값으로 변경
        formData.append('address[detail]', detailAddress); // 세부주소는 적절한 값으로 변경
        
        if (businessHours) {
            const businessTime = businessHours.split(':');
            formData.append('businessTimes[0][openTime][hour]', businessTime[0]);
            formData.append('businessTimes[0][openTime][minute]', businessTime[1]);
            formData.append('businessTimes[0][openTime][second]', 0);
            formData.append('businessTimes[0][openTime][nano]', 0);
            formData.append('businessTimes[0][closeTime][hour]', businessTime[0]);
            formData.append('businessTimes[0][closeTime][minute]', businessTime[1]);
            formData.append('businessTimes[0][closeTime][second]', 0);
            formData.append('businessTimes[0][closeTime][nano]', 0);
        }
        formData.append('businessTimes[0][reservationTimeUnit]', 30); // 적절한 값으로 변경
        formData.append('businessTimes[0][maxPeoplePerTime]', maxReservations);

        if (storeImage) {
            formData.append('storeImage', storeImage);
        }

        menuItems.forEach((item, index) => {
            formData.append(`menuForms[${index}][name]`, item.name);
            formData.append(`menuForms[${index}][description]`, item.description);
            formData.append(`menuForms[${index}][price]`, item.price);
            formData.append(`menuForms[${index}][remarks]`, item.remarks);
            if (menuImages[index]) {
                formData.append(`menuImages[${index}]`, menuImages[index]);
            }
        });

        try {
            const response = await axios.post('http://localhost:8080/api/owners/popup/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            console.log(response.data);
            alert('등록이 완료되었습니다.');
            navigate('/Ownerhome');
        } catch (error) {
            console.error('팝업 등록 중 오류가 발생했습니다:', error.response ? error.response.data : error.message);
            alert(`팝업 등록 중 오류가 발생했습니다: ${error.response ? JSON.stringify(error.response.data) : error.message}`);
        }
    }

    const handleCancelClick = () => {
        alert('등록이 취소되었습니다.');
        navigate('/Ownerhome');
    }

    const handlePostcodeComplete = (data) => {
        setRoadAddress(data.roadAddress);
        setZipcode(data.zonecode);
        setIsAddressSelected(true);
        setErrors(prevErrors => ({ ...prevErrors, roadAddress: false, zipcode: false }));
        window.close();
    }

    const handlePostcodeButtonClick = () => {
        window.open('about:blank', 'postcode', 'width=600,height=400,scrollbars=yes,resizable=yes');
        const newWindow = window.open('', 'postcode', 'width=600,height=400,scrollbars=yes,resizable=yes');
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
    }

    useEffect(() => {
        const handleMessage = (event) => {
            if (event.origin !== window.location.origin) return;
            const { roadAddress, zonecode } = event.data;
            setRoadAddress(roadAddress);
            setZipcode(zonecode);
            setIsAddressSelected(true);
            setErrors(prevErrors => ({ ...prevErrors, roadAddress: false, zipcode: false }));
        };

        window.addEventListener('message', handleMessage);

        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h1>팝업 등록</h1>
            <div style={{ marginBottom: '20px', position: 'relative' }}>
                <input
                    type="text"
                    placeholder='도로명 주소'
                    value={roadAddress}
                    onChange={handleRoadAddressChange}
                    style={{ width: 'calc(100% - 50px)', paddingRight: '10px', boxSizing: 'border-box', height: '40px', borderColor: errors.roadAddress ? 'red' : '' }}
                    readOnly={isAddressSelected}
                />
                <button onClick={handlePostcodeButtonClick} style={{ cursor: 'pointer', fontSize: '1em', color: '#888', width: '50px', height: '40px', position: 'absolute', right: '0', top: '0' }}>
                    검색
                </button>
            </div>
            <div style={{ marginBottom: '20px' }}>
                <input 
                    type='text'
                    placeholder='우편번호'
                    value={zipcode}
                    onChange={handleZipcodeChange}
                    style={{ width: '100%', boxSizing: 'border-box', height: '40px', borderColor: errors.zipcode ? 'red' : '' }}
                    readOnly={isAddressSelected}
                />
            </div>
            <div style={{ marginBottom: '20px' }}>
                <input 
                    type='text'
                    placeholder='상세 주소'
                    value={detailAddress}
                    onChange={handleDetailAddressChange}
                    style={{ width: '100%', boxSizing: 'border-box', height: '40px', borderColor: errors.detailAddress ? 'red' : '' }}
                />
            </div>
            <div style={{ display: 'flex', marginBottom: '20px' }}>
                <div style={{ flex: 1, marginRight: '10px' }}>
                    <div style={{ backgroundColor: '#f0f0f0', height: '150px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
                        {storeImage ? <img src={URL.createObjectURL(storeImage)} alt="Store" style={{ height: '100%' }} /> : <span>매장 사진</span>}
                    </div>
                    <input type="file" accept="image/*" onChange={handleStoreImageChange} />
                </div>
                <div style={{ flex: 2 }}>
                    <div style={{ marginBottom: '10px' }}>
                        <input
                            type="text"
                            placeholder="팝업 설명"
                            value={popupDescription}
                            onChange={handlePopupDescriptionChange}
                            style={{ width: '100%', height: '40px', borderColor: errors.popupDescription ? 'red' : '' }}
                        />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <input
                            type="text"
                            placeholder="매장 이름"
                            value={storeName}
                            onChange={handleStoreNameChange}
                            style={{ width: '100%', height: '40px', borderColor: errors.storeName ? 'red' : '' }}
                        />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <input
                            type="datetime-local"
                            placeholder="시작 날짜와 시간"
                            value={startDate}
                            onChange={handleStartDateChange}
                            style={{ width: '100%', height: '40px', borderColor: errors.startDate ? 'red' : '' }}
                        />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <input
                            type="datetime-local"
                            placeholder="종료 날짜와 시간"
                            value={endDate}
                            onChange={handleEndDateChange}
                            style={{ width: '100%', height: '40px', borderColor: errors.endDate ? 'red' : '' }}
                        />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <input
                            type="time"
                            placeholder="팝업 진행 시간"
                            value={businessHours}
                            onChange={handleBusinessHoursChange}
                            style={{ width: '100%', height: '40px', borderColor: errors.businessHours ? 'red' : '' }}
                        />
                    </div>
                    <div>
                        <input
                            type="number"
                            placeholder="시간 당 최대 예약 인원"
                            value={maxReservations}
                            onChange={handleMaxReservationsChange}
                            style={{ width: '100%', height: '40px', borderColor: errors.maxReservations ? 'red' : '' }}
                        />
                    </div>
                </div>
            </div>
            <div style={{ marginBottom: '20px' }}>
                {menuItems.map((menuItem, index) => (
                    <div key={index} style={{ display: 'flex', marginBottom: '20px' }}>
                        <div style={{ flex: 1, marginRight: '10px' }}>
                            <div style={{ backgroundColor: '#f0f0f0', height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
                                {menuImages[index] ? <img src={URL.createObjectURL(menuImages[index])} alt="Menu" style={{ height: '100%' }} /> : <span>메뉴 사진</span>}
                            </div>
                            <input type="file" accept="image/*" onChange={(e) => handleMenuImageChange(index, e)} />
                            <button onClick={() => removeMenuItem(index)} style={{ marginTop: '10px' }}>메뉴 삭제</button>
                        </div>
                        <div style={{ flex: 2 }}>
                            <div style={{ marginBottom: '10px' }}>
                                <input
                                    type="text"
                                    placeholder="메뉴 이름"
                                    value={menuItem.name}
                                    onChange={(e) => handleMenuItemChange(index, 'name', e.target.value)}
                                    style={{ width: '100%', height: '40px', borderColor: errors[`menuName${index}`] ? 'red' : '' }}
                                />
                            </div>
                            <div style={{ marginBottom: '10px' }}>
                                <input
                                    type="text"
                                    placeholder="메뉴에 대한 설명"
                                    value={menuItem.description}
                                    onChange={(e) => handleMenuItemChange(index, 'description', e.target.value)}
                                    style={{ width: '100%', height: '40px', borderColor: errors[`menuDescription${index}`] ? 'red' : '' }}
                                />
                            </div>
                            <div style={{ marginBottom: '10px' }}>
                                <input
                                    type="number"
                                    placeholder="메뉴 가격"
                                    value={menuItem.price}
                                    onChange={(e) => handleMenuItemChange(index, 'price', e.target.value)}
                                    style={{ width: '100%', height: '40px', borderColor: errors[`menuPrice${index}`] ? 'red' : '' }}
                                />
                            </div>
                        </div>
                    </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                    <button onClick={addMenuItem} style={{ width: '100%', padding: '10px', fontSize: '16px' }}>+</button>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button onClick={handleRegisterClick} style={{ marginRight: '10px' }}>등록</button>
                <button onClick={handleCancelClick}>취소</button>
            </div>
        </div>
    );
}

export default Registration;
