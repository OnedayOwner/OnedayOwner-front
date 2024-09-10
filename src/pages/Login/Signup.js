import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from './axios.js'; // Custom Axios instance
import './Signup.css';
import onboarding from '../../assets/images/onboarding.png';
import MyButton from '../../components/MyButton.js';

const Signup = () => {
    const [userType, setUserType] = useState('CUSTOMER');
    const [formData, setFormData] = useState({
        name: '',
        birth: '',
        loginId: '',
        password: '',
        email: '',
        gender: 'MALE',
        addressForm: {
            zipcode: '',
            street: '',
            detail: ''
        },
        phoneNumber: ''
    });
    const [verificationCode, setVerificationCode] = useState('');
    const [codeId, setCodeId] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            addressForm: {
                ...prevData.addressForm,
                [name]: value
            }
        }));
    };

    const handlePostcodeComplete = (data) => {
        setFormData((prevData) => ({
            ...prevData,
            addressForm: {
                ...prevData.addressForm,
                zipcode: data.zonecode,
                street: data.roadAddress
            }
        }));
    };

    const handlePostcodeButtonClick = () => {
        const width = 500;
        const height = 600;
        const left = (window.screen.width / 2) - (width / 2);
        const top = (window.screen.height / 2) - (height / 2);
        const newWindow = window.open('', 'postcode', `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes`);
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
    };

    useEffect(() => {
        const handlePostMessage = (event) => {
            if (event.origin !== window.location.origin) return;
            if (event.data && event.data.zonecode) {
                handlePostcodeComplete(event.data);
            }
        };

        window.addEventListener('message', handlePostMessage);

        return () => {
            window.removeEventListener('message', handlePostMessage);
        };
    }, []);

    const requestVerificationCode = async () => {
        try {
            const response = await axios.post('/auth/verification-sms', {
                phoneNumber: formData.phoneNumber,
                role: userType
            });
            setCodeId(response.data.codeId);
            alert('인증 코드가 전송되었습니다.');
        } catch (error) {
            console.error('인증 코드 요청 중 오류가 발생했습니다:', error.response ? error.response.data : error.message);
            alert('인증 코드 요청 중 오류가 발생했습니다.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const registrationData = {
                ...formData,
                codeId: codeId,
                verificationCode: verificationCode
            };
            console.log(registrationData);
            await axios.post('/users/join', registrationData,{params : {role: userType}});
            // 회원가입이 성공하면 로그인 시도
            const loginResponse = await axios.post('/users/login', {
                loginId: formData.loginId,
                password: formData.password
            },{params : {role: userType}});

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

    const goBack = () => {
        navigate(-1);
    };

    return (
        <div className="signup-container">
            <div className="signup-header">
                <div className="signup-back-button" onClick={goBack}>&lt;</div>
                <h1 className="signup-header__title">오늘만 사장</h1> 
                <p className="signup-header__subtitle">창업을 시도하기 두려우셨나요?<br/>실제 매장 경험을 통해 창업 경험을 쌓아보세요</p>
            </div>
            <div className="signup-image-container">
                <img className="signup-image" src={onboarding} alt="온보딩 이미지" />
            </div>
            <h1 className="signup-title">회원가입</h1>
            <div className="user-type-selection">
                <label>
                    <input
                        type="radio"
                        value="CUSTOMER"
                        checked={userType === 'CUSTOMER'}
                        onChange={() => setUserType('CUSTOMER')}
                    />
                    일반 손님
                </label>
                <label>
                    <input
                        type="radio"
                        value="OWNER"
                        checked={userType === 'OWNER'}
                        onChange={() => setUserType('OWNER')}
                    />
                    창업 희망자
                </label>
            </div>
            <form className="signup-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="이름"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="date"
                    name="birth"
                    placeholder="생년월일"
                    value={formData.birth}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="loginId"
                    placeholder="로그인 ID"
                    value={formData.loginId}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="비밀번호"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="이메일"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <select name="gender" value={formData.gender} onChange={handleChange} required>
                    <option value="MALE">남성</option>
                    <option value="FEMALE">여성</option>
                </select>
                {userType === 'CUSTOMER' && (
                    <div className="address-form">
                        <input
                            type="text"
                            name="zipcode"
                            placeholder="우편번호"
                            value={formData.addressForm.zipcode}
                            readOnly
                            required
                        />
                        <MyButton type="default" onClick={handlePostcodeButtonClick} text="주소 검색" />
                        <input
                            type="text"
                            name="street"
                            placeholder="도로명 주소"
                            value={formData.addressForm.street}
                            readOnly
                            required
                        />
                        <input
                            type="text"
                            name="detail"
                            placeholder="상세 주소"
                            value={formData.addressForm.detail}
                            onChange={handleAddressChange}
                            required
                        />
                    </div>
                )}
                <input
                    type="text"
                    name="phoneNumber"
                    placeholder="전화번호"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                />
                <MyButton type="default" onClick={requestVerificationCode} text="인증 코드 요청" />
                {codeId && (
                    <div className="verification-form">
                        <input
                            type="text"
                            placeholder="인증 코드 입력"
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                            required
                        />
                    </div>
                )}
                {errorMessage && <div className="signup-error-message">{errorMessage}</div>}
                <MyButton type="default" text="회원가입 완료" onClick={handleSubmit} />
            </form>
        </div>
    );
};

export default Signup;
