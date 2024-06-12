import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PhotoRegistration = () => {
    const navigate = useNavigate();
    const [storeName, setStoreName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [businessHours, setBusinessHours] = useState('');
    const [maxReservations, setMaxReservations] = useState('');
    const [popupDescription, setPopupDescription] = useState('');
    const [menuItems, setMenuItems] = useState([{ name: '', description: '', price: '', remarks: '' }]);
    const [storeImage, setStoreImage] = useState(null);
    const [menuImages, setMenuImages] = useState([null]);

    const handleStoreNameChange = (e) => {
        setStoreName(e.target.value);
    }

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    }

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    }

    const handleBusinessHoursChange = (e) => {
        setBusinessHours(e.target.value);
    }

    const handleMaxReservationsChange = (e) => {
        setMaxReservations(e.target.value);
    }

    const handlePopupDescriptionChange = (e) => {
        setPopupDescription(e.target.value);
    }

    const handleMenuItemChange = (index, field, value) => {
        const newMenuItems = [...menuItems];
        newMenuItems[index][field] = value;
        setMenuItems(newMenuItems);
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
        setStoreImage(URL.createObjectURL(e.target.files[0]));
    }

    const handleMenuImageChange = (index, e) => {
        const newMenuImages = [...menuImages];
        newMenuImages[index] = URL.createObjectURL(e.target.files[0]);
        setMenuImages(newMenuImages);
    }

    const handlePreviousClick = () => {
        navigate('/Registration');
    }

    const handleRegisterClick = () => {
        alert('등록이 완료되었습니다.');
        navigate('/Ownerhome');
    }

    const handleCancelClick = () => {
        alert('등록이 취소되었습니다.');
        navigate('/Ownerhome');
    }

    return (
        <div style={{ padding: '20px' }}>
            <h1>사진 등록 및 매장 정보 입력</h1>
            <div style={{ display: 'flex', marginBottom: '20px' }}>
                <div style={{ flex: 1, marginRight: '10px' }}>
                    <div style={{ backgroundColor: '#f0f0f0', height: '150px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
                        {storeImage ? <img src={storeImage} alt="Store" style={{ height: '100%' }} /> : <span>매장 사진</span>}
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
                            style={{ width: '100%' }}
                        />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <input
                            type="text"
                            placeholder="매장 이름"
                            value={storeName}
                            onChange={handleStoreNameChange}
                            style={{ width: '100%' }}
                        />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <input
                            type="datetime-local"
                            placeholder="시작 날짜와 시간"
                            value={startDate}
                            onChange={handleStartDateChange}
                            style={{ width: '100%' }}
                        />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <input
                            type="datetime-local"
                            placeholder="종료 날짜와 시간"
                            value={endDate}
                            onChange={handleEndDateChange}
                            style={{ width: '100%' }}
                        />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <input
                            type="time"
                            placeholder="팝업 진행 시간"
                            value={businessHours}
                            onChange={handleBusinessHoursChange}
                            style={{ width: '100%' }}
                        />
                    </div>
                    <div>
                        <input
                            type="number"
                            placeholder="시간 당 최대 예약 인원"
                            value={maxReservations}
                            onChange={handleMaxReservationsChange}
                            style={{ width: '100%' }}
                        />
                    </div>
                </div>
            </div>
            <div style={{ marginBottom: '20px' }}>
                {menuItems.map((menuItem, index) => (
                    <div key={index} style={{ display: 'flex', marginBottom: '20px' }}>
                        <div style={{ flex: 1, marginRight: '10px' }}>
                            <div style={{ backgroundColor: '#f0f0f0', height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
                                {menuImages[index] ? <img src={menuImages[index]} alt="Menu" style={{ height: '100%' }} /> : <span>메뉴 사진</span>}
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
                                    style={{ width: '100%' }}
                                />
                            </div>
                            <div style={{ marginBottom: '10px' }}>
                                <input
                                    type="text"
                                    placeholder="메뉴에 대한 설명"
                                    value={menuItem.description}
                                    onChange={(e) => handleMenuItemChange(index, 'description', e.target.value)}
                                    style={{ width: '100%' }}
                                />
                            </div>
                            <div style={{ marginBottom: '10px' }}>
                                <input
                                    type="text"
                                    placeholder="메뉴 가격"
                                    value={menuItem.price}
                                    onChange={(e) => handleMenuItemChange(index, 'price', e.target.value)}
                                    style={{ width: '100%' }}
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    placeholder="기타"
                                    value={menuItem.remarks}
                                    onChange={(e) => handleMenuItemChange(index, 'remarks', e.target.value)}
                                    style={{ width: '100%' }}
                                />
                            </div>
                        </div>
                    </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                    <button onClick={addMenuItem} style={{ width: '100%', padding: '10px', fontSize: '16px' }}>+</button>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button onClick={handlePreviousClick}>이전</button>
                <div>
                    <button onClick={handleRegisterClick} style={{ marginRight: '10px' }}>등록</button>
                    <button onClick={handleCancelClick}>취소</button>
                </div>
            </div>
        </div>
    );
}

export default PhotoRegistration;
