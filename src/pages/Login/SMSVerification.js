import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from './axios.js'; // 커스텀 Axios 인스턴스
import './SMSVerification.css'; // CSS 스타일

const SMSVerification = () => {
    const location = useLocation(); // 현재 위치 정보 가져오기
    const [phoneNumber, setPhoneNumber] = useState(''); // 전화번호 상태
    const [verificationCode, setVerificationCode] = useState(''); // 인증 코드 상태
    const [codeId, setCodeId] = useState(null); // 코드 ID 상태
    const [errorMessage, setErrorMessage] = useState(''); // 오류 메시지 상태
    const { formData, userType } = location.state || {}; // 위치에서 전달된 데이터

    useEffect(() => {
        // formData와 userType이 없으면 오류 로그
        if (!formData || !userType) {
            console.error('Missing formData or userType');
        }
    }, [formData, userType]);

    // 인증 코드 요청 함수
    const requestVerificationCode = async () => {
        try {
            const response = await axios.post('/auth/verification-sms', {
                phoneNumber,
                role: userType
            });
            setCodeId(response.data.codeId); // 코드 ID 설정
            alert('인증 코드가 전송되었습니다.');
        } catch (error) {
            console.error('인증 코드 요청 중 오류가 발생했습니다:', error.response ? error.response.data : error.message);
            alert('인증 코드 요청 중 오류가 발생했습니다.');
        }
    };

    // 인증 및 회원가입 함수
    const verifyAndJoin = async () => {
        try {
            const registrationData = { ...formData, role: userType, codeId, verificationCode, phoneNumber };
            await axios.post('/users/join', registrationData, {
                params: { role: userType }
            });

            // 회원가입 성공 시 로그인 시도
            const loginResponse = await axios.post('/users/login', {
                loginId: formData.loginId,
                password: formData.password,
                role: userType
            });

            const token = loginResponse.data.token;
            localStorage.setItem('token', token); // 토큰을 localStorage에 저장

            alert('회원가입이 완료되었습니다.');
        } catch (error) {
            // 오류 처리
            if (error.response) {
                if (error.response.data.message === 'User already exist') {
                    setErrorMessage('해당 사용자 아이디가 이미 존재합니다. 다른 아이디를 사용해주세요.');
                } else if (error.response.data.message === 'Verification code expired') {
                    setErrorMessage('인증 코드가 만료되었습니다. 다시 요청해주세요.');
                } else {
                    setErrorMessage('회원가입 중 오류가 발생했습니다.');
                }
            } else {
                setErrorMessage('회원가입 중 오류가 발생했습니다.');
            }
            console.error('회원가입 중 오류가 발생했습니다:', error.response ? error.response.data : error.message);
        }
    };

    // formData나 userType이 없으면 오류 메시지 표시
    if (!formData || !userType) {
        return <div>잘못된 접근입니다.</div>;
    }

    return (
        <div className="sms-verification-container">
            <h1>SMS 인증</h1>
            <div className="phone-number-input">
                <input
                    type="text"
                    placeholder="전화번호 입력"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)} // 전화번호 입력 처리
                />
                <button onClick={requestVerificationCode}>인증 코드 요청</button>
            </div>
            {codeId && (
                <div className="verification-form">
                    <input
                        type="text"
                        placeholder="인증 코드 입력"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)} // 인증 코드 입력 처리
                    />
                    <button onClick={verifyAndJoin}>회원가입 완료</button>
                </div>
            )}
            {errorMessage && <div className="error-message">{errorMessage}</div>} {/* 오류 메시지 표시 */}
        </div>
    );
};

export default SMSVerification;
