import React, { useState, useEffect } from 'react'; // React와 필요한 훅을 import
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위한 useNavigate 훅을 import
import axios from './axios.js'; // 커스텀 Axios 인스턴스 import
import './Signup.css'; // 스타일 시트 import

const Signup = () => {
    // 사용자 유형 상태 (기본값: CUSTOMER)
    const [userType, setUserType] = useState('CUSTOMER');
    
    // 회원가입 폼 데이터 상태
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
    
    // 인증 코드 및 관련 상태
    const [verificationCode, setVerificationCode] = useState('');
    const [codeId, setCodeId] = useState(null);
    const [errorMessage, setErrorMessage] = useState(''); // 오류 메시지 상태
    const navigate = useNavigate(); // 페이지 이동을 위한 navigate 함수

    // 입력 필드의 변화 처리
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    // 주소 입력 필드 변화 처리
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

    // 주소 검색 API 콜백 처리
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

    // 주소 검색 버튼 클릭 시 새 창 열기
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

    // 주소 검색 결과 수신 처리
    useEffect(() => {
        const handlePostMessage = (event) => {
            if (event.origin !== window.location.origin) return; // 안전성을 위한 origin 체크
            if (event.data && event.data.zonecode) {
                handlePostcodeComplete(event.data); // 주소 검색 결과 처리
            }
        };

        window.addEventListener('message', handlePostMessage); // 메시지 이벤트 리스너 추가

        return () => {
            window.removeEventListener('message', handlePostMessage); // 컴포넌트 언마운트 시 리스너 제거
        };
    }, []);

    // 인증 코드 요청 함수
    const requestVerificationCode = async () => {
        try {
            const response = await axios.post('/auth/verification-sms', {
                phoneNumber: formData.phoneNumber,
                role: userType
            });
            setCodeId(response.data.codeId); // 코드 ID 저장
            alert('인증 코드가 전송되었습니다.'); // 사용자에게 알림
        } catch (error) {
            console.error('인증 코드 요청 중 오류가 발생했습니다:', error.response ? error.response.data : error.message);
            alert('인증 코드 요청 중 오류가 발생했습니다.'); // 오류 처리
        }
    };

    // 회원가입 제출 처리
    const handleSubmit = async (e) => {
        e.preventDefault(); // 기본 제출 동작 방지
        try {
            const registrationData = {
                ...formData,
                codeId: codeId,
                verificationCode: verificationCode
            };
            console.log(registrationData); // 등록 데이터 로그
            await axios.post('/users/join', registrationData, { params: { role: userType } }); // 회원가입 API 호출
            
            // 회원가입 성공 후 로그인 시도
            const loginResponse = await axios.post('/users/login', {
                loginId: formData.loginId,
                password: formData.password
            }, { params: { role: userType } });

            const token = loginResponse.data.token; // 로그인 후 토큰 저장
            localStorage.setItem('token', token); // 토큰을 localStorage에 저장

            alert('회원가입이 완료되었습니다.'); // 성공 메시지
            navigate('/'); // 홈으로 이동
        } catch (error) {
            if (error.response) {
                // 오류 메시지에 따라 상태 업데이트
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

    return (
        <div className="registration-container">
            <h1>회원가입</h1>
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
                        <button type="button" onClick={handlePostcodeButtonClick}>주소 검색</button>
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
                <button type="button" onClick={requestVerificationCode}>인증 코드 요청</button>
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
                <button type="submit">회원가입 완료</button>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
            </form>
        </div>
    );
};

export default Signup;
