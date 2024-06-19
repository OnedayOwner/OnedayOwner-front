import React, { useState } from 'react';
import axios from 'axios';

const TokenRefresh = () => {
    const [newToken, setNewToken] = useState(null);
    const [error, setError] = useState(null);

    const refreshToken = async () => {
        try {
            const response = await axios.post('http://ec2-3-39-193-47.ap-northeast-2.compute.amazonaws.com:8080/api/auth/token/refresh', {}, {
                headers: {
                    'Authorization': `Bearer ${yourRefreshToken}` // 리프레시 토큰을 여기에 넣어야 합니다.
                }
            });
            setNewToken(response.data.accessToken);
        } catch (error) {
            setError(error.response ? error.response.data : 'Token refresh failed');
        }
    };

    return (
        <div>
            <button onClick={refreshToken}>토큰 갱신</button>
            {newToken && <div>새 토큰: {newToken}</div>}
            {error && <div>오류: {error}</div>}
        </div>
    );
};

export default TokenRefresh;