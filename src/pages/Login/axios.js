import axios from 'axios';

// Axios 인스턴스를 생성하고 기본 URL을 설정합니다.
const instance = axios.create({
    baseURL: 'http://ec2-3-39-193-47.ap-northeast-2.compute.amazonaws.com:8080/api',
});

// 요청 인터셉터를 설정하여 모든 요청에 토큰을 추가합니다.
instance.interceptors.request.use((config) => {
    // 로컬 스토리지에서 토큰을 가져옵니다.
    const token = localStorage.getItem('token');
    if (token) {
        // 토큰이 존재하면 Authorization 헤더에 추가합니다.
        config.headers.Authorization = `Bearer ${token}`;
    }
    // 수정된 config 객체를 반환합니다.
    return config;
    
}, (error) => {
    // 요청 오류가 발생하면 이를 반환합니다.
    return Promise.reject(error);
});

// 설정된 인스턴스를 기본으로 내보냅니다.
export default instance;
