import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PopupContext from './PopupContext';

const Ownerhome = () => {
    const [activeTab, setActiveTab] = useState('ongoing');
    const { popups } = useContext(PopupContext);
    const [menus, setMenus] = useState([{ id: 1, photo: '', description: '메뉴에 대한 설명' }]);
    const [editingMenu, setEditingMenu] = useState(null);
    const [newMenu, setNewMenu] = useState({ photo: '', description: '' });

    // 임시로 완료된 팝업 예시 데이터 추가
    const completedPopups = [
        {
            id: 2,
            photo: '',
            name: '진행했던 팝업 상호명 1',
            address: '상세 위치 1',
            period: '2023-05-01 ~ 2023-05-31'
        },
        {
            id: 3,
            photo: '',
            name: '진행했던 팝업 상호명 2',
            address: '상세 위치 2',
            period: '2023-04-01 ~ 2023-04-30'
        }
    ];

    const navigate = useNavigate();

    const handleTabChange = (tab) => setActiveTab(tab);

    const handleFeedbackClick = () => navigate('/feedback');
    const handleReservationStatusClick = () => navigate('/reservationStatus');

    const handleMenuChange = (index, field, value) => {
        const updatedMenus = [...menus];
        updatedMenus[index][field] = value;
        setMenus(updatedMenus);
    };

    const handleMenuPhotoChange = (index, event) => {
        const updatedMenus = [...menus];
        updatedMenus[index].photo = URL.createObjectURL(event.target.files[0]);
        setMenus(updatedMenus);
    };

    const handleMenuDelete = (index) => setMenus(menus.filter((_, i) => i !== index));
    const handleMenuEdit = (index) => setEditingMenu(index);
    const handleMenuSave = () => setEditingMenu(null);
    const handleNewMenuChange = (field, value) => setNewMenu({ ...newMenu, [field]: value });
    const handleNewMenuPhotoChange = (event) => setNewMenu({ ...newMenu, photo: URL.createObjectURL(event.target.files[0]) });
    const handleMenuAdd = () => {
        setMenus([...menus, { ...newMenu, id: menus.length + 1 }]);
        setNewMenu({ photo: '', description: '' });
    };

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <button
                    onMouseEnter={() => handleTabChange('ongoing')}
                    style={{ flex: 1, padding: '20px', backgroundColor: activeTab === 'ongoing' ? '#ddd' : '#f0f0f0', cursor: 'pointer', border: 'none', textAlign: 'center' }}
                >
                    진행중인 팝업
                </button>
                <button
                    onMouseEnter={() => handleTabChange('completed')}
                    style={{ flex: 1, padding: '20px', backgroundColor: activeTab === 'completed' ? '#ddd' : '#f0f0f0', cursor: 'pointer', border: 'none', textAlign: 'center' }}
                >
                    진행했던 팝업
                </button>
            </div>
            {activeTab === 'ongoing' && (
                <div>
                    {popups.map(popup => (
                        <div key={popup.id} style={{ display: 'flex', marginBottom: '20px' }}>
                            <div style={{ flex: 1, marginRight: '10px', backgroundColor: '#f0f0f0', height: '150px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <span>팝업 매장 사진</span>
                            </div>
                            <div style={{ flex: 2 }}>
                                <textarea placeholder="팝업에 대한 설명" style={{ width: '100%', height: '150px', resize: 'none' }}>{popup.address}</textarea>
                            </div>
                        </div>
                    ))}
                    <div style={{ marginBottom: '20px' }}>
                        {popups.map(popup => (
                            <div key={popup.id} style={{ backgroundColor: '#f0f0f0', padding: '10px', marginBottom: '10px' }}>
                                <span>팝업 상호명: {popup.name}</span>
                                <span>팝업 진행 기간: {popup.period}</span>
                            </div>
                        ))}
                    </div>
                    <div style={{ display: 'flex', marginBottom: '20px' }}>
                        <button onClick={handleFeedbackClick} style={{ flex: 1, padding: '10px', backgroundColor: '#eee', border: '1px solid #ccc', cursor: 'pointer', marginRight: '10px' }}>피드백</button>
                        <button onClick={handleReservationStatusClick} style={{ flex: 1, padding: '10px', backgroundColor: '#eee', border: '1px solid #ccc', cursor: 'pointer' }}>예약 현황</button>
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        {menus.map((menu, index) => (
                            <div key={menu.id} style={{ marginBottom: '20px', display: 'flex' }}>
                                <div style={{ flex: 1, marginRight: '10px', backgroundColor: '#f0f0f0', height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    {editingMenu === index ? (
                                        <input
                                            type="file"
                                            onChange={(e) => handleMenuPhotoChange(index, e)}
                                        />
                                    ) : (
                                        <img src={menu.photo} alt="메뉴 사진" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                                    )}
                                </div>
                                <div style={{ flex: 2 }}>
                                    {editingMenu === index ? (
                                        <input
                                            type="text"
                                            value={menu.description}
                                            onChange={(e) => handleMenuChange(index, 'description', e.target.value)}
                                            style={{ width: '100%', marginBottom: '10px' }}
                                        />
                                    ) : (
                                        <input
                                            type="text"
                                            value={menu.description}
                                            readOnly
                                            style={{ width: '100%', marginBottom: '10px' }}
                                        />
                                    )}
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        {editingMenu === index ? (
                                            <button onClick={handleMenuSave} style={{ flex: 1, marginRight: '10px', backgroundColor: '#eee', border: '1px solid #ccc', cursor: 'pointer' }}>저장</button>
                                        ) : (
                                            <button onClick={() => handleMenuEdit(index)} style={{ flex: 1, marginRight: '10px', backgroundColor: '#eee', border: '1px solid #ccc', cursor: 'pointer' }}>수정</button>
                                        )}
                                        <button onClick={() => handleMenuDelete(index)} style={{ flex: 1, backgroundColor: '#eee', border: '1px solid #ccc', cursor: 'pointer' }}>삭제</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div style={{ marginBottom: '20px', display: 'flex' }}>
                            <div style={{ flex: 1, marginRight: '10px', backgroundColor: '#f0f0f0', height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <input
                                    type="file"
                                    onChange={handleNewMenuPhotoChange}
                                    style={{ width: '100%' }}
                                />
                            </div>
                            <div style={{ flex: 2 }}>
                                <input
                                    type="text"
                                    placeholder="메뉴에 대한 설명"
                                    value={newMenu.description}
                                    onChange={(e) => handleNewMenuChange('description', e.target.value)}
                                    style={{ width: '100%', marginBottom: '10px' }}
                                />
                                <button onClick={handleMenuAdd} style={{ width: '100%', padding: '10px', backgroundColor: '#eee', border: '1px solid #ccc', cursor: 'pointer' }}>추가</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {activeTab === 'completed' && (
                <div>
                    {completedPopups.map(popup => (
                        <div key={popup.id} style={{ display: 'flex', marginBottom: '20px', alignItems: 'center' }}>
                            <div style={{ flex: 1, marginRight: '10px', backgroundColor: '#f0f0f0', height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <span>사진</span>
                            </div>
                            <div style={{ flex: 2 }}>
                                <div style={{ backgroundColor: '#f0f0f0', padding: '10px', marginBottom: '10px' }}>
                                    <span>{popup.name}</span>
                                </div>
                                <div style={{ backgroundColor: '#f0f0f0', padding: '10px', marginBottom: '10px' }}>
                                    <span>{popup.address}</span>
                                </div>
                                <div style={{ backgroundColor: '#f0f0f0', padding: '10px', marginBottom: '10px' }}>
                                    <span>{popup.period}</span>
                                </div>
                                <button style={{ padding: '10px', backgroundColor: '#eee', border: '1px solid #ccc', cursor: 'pointer' }}>상세보기</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Ownerhome;
