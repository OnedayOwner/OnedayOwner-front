import React, { useState } from 'react';
import axios from 'axios';

const TokenRefresh = () => {
    // 새로운 토큰과 에러 상태를 관리하는 상태 변수
    const [newToken, setNewToken] = useState(null);
    const [error, setError] = useState(null);

    // 토큰 갱신 함수
    const refreshToken = async () => {
        try {
            // 리프레시 토큰을 사용하여 새로운 액세스 토큰 요청
            const response = await axios.post('http://ec2-3-39-193-47.ap-northeast-2.compute.amazonaws.com:8080/api/auth/token/refresh', {}, {
                headers: {
                    'Authorization': `Bearer ${yourRefreshToken}` // 여기에 리프레시 토큰을 넣어야 합니다.
                }
            });
            // 성공적으로 토큰을 받으면 상태 업데이트
            setNewToken(response.data.accessToken);
        } catch (error) {
            // 에러 발생 시 에러 메시지 상태 업데이트
            setError(error.response ? error.response.data : 'Token refresh failed');
        }
    };

    return (
        <div>
            {/* 토큰 갱신 버튼 */}
            <button onClick={refreshToken}>토큰 갱신</button>
            {/* 새로운 토큰이 있으면 표시 */}
            {newToken && <div>새 토큰: {newToken}</div>}
            {/* 에러가 있으면 표시 */}
            {error && <div>오류: {error}</div>}
        </div>
    );
};

export default TokenRefresh;
