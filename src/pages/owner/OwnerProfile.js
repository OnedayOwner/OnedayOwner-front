import React, { useEffect, useState } from 'react';
import axios from 'axios'; // 커스텀 Axios 인스턴스를 사용하거나 기본 axios
import '../../styles/owner/OwnerProfile.css'; // CSS 파일
import MyButton from '../../components/MyButton.js'; // 버튼 컴포넌트

const OwnerProfile = () => {
    const [ownerData, setOwnerData] = useState(null); // 사장님 데이터를 저장할 상태
    const token = localStorage.getItem('token') || ''; // 토큰이 localStorage에 저장되어 있는지 확인

    useEffect(() => {
        const fetchOwnerProfile = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACK_URL}/api/owners/profile`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setOwnerData(response.data); // 사장님 정보 저장
            } catch (error) {
                console.error('사장님 정보를 불러오는 중 오류가 발생했습니다:', error.response ? error.response.data : error.message);
            }
        };

        fetchOwnerProfile(); // 컴포넌트가 마운트되면 데이터 가져오기
    }, [token]);

    if (!ownerData) {
        return <p>사장님 정보를 불러오는 중입니다...</p>; // 로딩 상태
    }

    return (
        <div className="owner-profile-container">
            <h1 className="profile-title">사장님 정보</h1>
            <div className="profile-details">
                <div className="profile-field">
                    <strong>이름:</strong> <span>{ownerData.name}</span>
                </div>
                <div className="profile-field">
                    <strong>생년월일:</strong> <span>{ownerData.birth}</span>
                </div>
                <div className="profile-field">
                    <strong>아이디:</strong> <span>{ownerData.loginId}</span>
                </div>
                <div className="profile-field">
                    <strong>이메일:</strong> <span>{ownerData.email}</span>
                </div>
                <div className="profile-field">
                    <strong>성별:</strong> <span>{ownerData.gender === 'MALE' ? '남성' : '여성'}</span>
                </div>
                <div className="profile-field">
                    <strong>전화번호:</strong> <span>{ownerData.phoneNumber}</span>
                </div>
            </div>

            <div className="encouragement-message">
                <p>창업을 희망하시는 사장님을 응원합니다!<br/>실패를 두려워하지 말고, 도전하세요!</p>
            </div>

            <MyButton text="정보 수정" type="default" />
        </div>
    );
};

export default OwnerProfile;
