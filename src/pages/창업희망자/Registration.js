import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PopupContext from './PopupContext';

const Registration = () => {
    const [address, setAddress] = useState('');
    const [detailAddress1, setDetailAddress1] = useState('');
    const [detailAddress2, setDetailAddress2] = useState('');
    const { addPopup } = useContext(PopupContext);
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/PhotoRegistration');
    }

    const handleSearchChange = (e) => {
        setAddress(e.target.value);
    }

    const handleSearchSubmit = () => {
        // 검색 기능 구현
    }

    const handleDetailAddress1Change = (e) => {
        setDetailAddress1(e.target.value);
    }

    const handleDetailAddress2Change = (e) => {
        setDetailAddress2(e.target.value);
    }

    const handleRegister = () => {
        const newPopup = {
            id: Date.now(),
            photo: '',
            name: '새로운 팝업 상호명', // 적절한 값으로 변경
            address: `${address} ${detailAddress1} ${detailAddress2}`,
            period: '2023-06-01 ~ 2023-06-30' // 적절한 값으로 변경
        };

        addPopup(newPopup);
        alert('등록이 완료되었습니다.');
        navigate('/ownerhome');
    }

    const handleCancel = () => {
        alert('등록이 취소되었습니다.');
        navigate('/ownerhome');
    }

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ position: 'relative', marginBottom: '20px', maxWidth: '600px' }}>
                <input
                    type="text"
                    placeholder='주소 검색'
                    value={address}
                    onChange={handleSearchChange}
                    style={{ width: '100%', paddingRight: '40px', boxSizing: 'border-box' }}
                />
                <i
                    className="fas fa-search"
                    onClick={handleSearchSubmit}
                    style={{
                        position: 'absolute',
                        right: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        cursor: 'pointer',
                        fontSize: '1.2em',
                        color: '#888'
                    }}
                />
            </div>
            <div style={{ marginBottom: '20px', maxWidth: '600px' }}>
                <input 
                    type='text'
                    placeholder='세부 주소 입력 폼'
                    value={detailAddress1}
                    onChange={handleDetailAddress1Change}
                    style={{ width: '100%', boxSizing: 'border-box' }}
                />
            </div>
            <div style={{ marginBottom: '20px', maxWidth: '600px' }}>
                <input 
                    type='text'
                    placeholder='세부 주소 입력 폼'
                    value={detailAddress2}
                    onChange={handleDetailAddress2Change}
                    style={{ width: '100%', boxSizing: 'border-box' }}
                />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <button onClick={handleClick} style={{ marginRight: '10px' }}>사진 등록</button>
                <div style={{ width: '100%', height: '200px', backgroundColor: '#f0f0f0' }}></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button onClick={handleRegister} style={{ marginRight: '10px' }}>등록</button>
                <button onClick={handleCancel}>취소</button>
            </div>
        </div>
    )
}

export default Registration;
