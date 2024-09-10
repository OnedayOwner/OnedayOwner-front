import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from './axios.js'; // Custom Axios instance
import './SMSVerification.css';
import MyButton from '../../components/MyButton.js'; 

const SMSVerification = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [codeId, setCodeId] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const { formData, userType } = location.state || {};

    useEffect(() => {
        if (!formData || !userType) {
            console.error('Missing formData or userType');
        }
    }, [formData, userType]);

    const requestVerificationCode = async () => {
        try {
            const response = await axios.post('/auth/verification-sms', {
                phoneNumber,
                role: userType
            });
            setCodeId(response.data.codeId);
            alert('인증 코드가 전송되었습니다.');
        } catch (error) {
            console.error('인증 코드 요청 중 오류가 발생했습니다:', error.response ? error.response.data : error.message);
            alert('인증 코드 요청 중 오류가 발생했습니다.');
        }
    };

    const verifyAndJoin = async () => {
        try {
            const registrationData = { ...formData, role: userType, codeId, verificationCode, phoneNumber };
            await axios.post('/users/join', registrationData, {
                params: { role: userType }
            });

            // 회원가입이 성공하면 로그인 시도
            const loginResponse = await axios.post('/users/login', {
                loginId: formData.loginId,
                password: formData.password,
                role: userType
            });

            const token = loginResponse.data.token;
            localStorage.setItem('token', token); // 토큰을 localStorage에 저장

            alert('회원가입이 완료되었습니다.');
            navigate('/'); // 로그인 후 이동할 페이지로 이동
        } catch (error) {
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
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <MyButton text="인증 코드 요청" onClick={requestVerificationCode} type="default" />
            </div>
            {codeId && (
                <div className="verification-form">
                    <input
                        type="text"
                        placeholder="인증 코드 입력"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                    />
                    <MyButton text="회원가입 완료" onClick={verifyAndJoin} type="default" />
                </div>
            )}
            {errorMessage && <div className="verification-error-message">{errorMessage}</div>}
        </div>
    );
};

export default SMSVerification;
