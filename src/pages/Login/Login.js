import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MyButton from '../../components/MyButton';
import './Login.css';

const Login = () => {
    // 상태 관리
    const [loginId, setLoginId] = useState(''); // 로그인 아이디 상태
    const [password, setPassword] = useState(''); // 비밀번호 상태
    const [type, setType] = useState('CUSTOMER'); // 사용자 유형 상태 (기본값: CUSTOMER)
    const [errorMessage, setErrorMessage] = useState(''); // 오류 메시지 상태

    const navigate = useNavigate(); // 페이지 이동을 위한 navigate 함수

    // 아이디 입력 변화 처리
    const handleChangeId = (e) => {
        setLoginId(e.target.value); // 입력된 값으로 상태 업데이트
    };

    // 비밀번호 입력 변화 처리
    const handleChangePassword = (e) => {
        setPassword(e.target.value); // 입력된 값으로 상태 업데이트
    };

    // 사용자 유형 변화 처리
    const handleChangeType = (e) => {
        setType(e.target.value); // 선택된 값으로 상태 업데이트
    };

    // 로그인 처리 함수
    const handleLogin = async () => {
        try {
            // 로그인 API 요청
            const response = await axios.post(``, {
                loginId,
                password,
            }, {
                params: { role: type } // 사용자 유형을 쿼리 파라미터로 전달
            });
            
            // 로그인 성공 시 토큰 저장
            localStorage.setItem('token', response.headers.authorization);
            alert('로그인 성공'); // 성공 메시지
            
            // 사용자 유형에 따라 페이지 이동
            if (type === 'CUSTOMER') {
                navigate('/Customerhome');
            } else if (type === 'OWNER') {
                navigate('/Ownerhome');
            }
        } catch (error) {
            // 오류 발생 시 메시지 설정
            setErrorMessage('로그인 실패: ' + (error.response ? error.response.data.message : error.message));
        }
    };

    // 회원가입 페이지로 이동
    const goToSignup = () => {
        navigate('/signup');
    };

    return (
        <div className="login-page">
            <h1>오늘만 사장</h1>
            <select value={type} onChange={handleChangeType}>
                <option value="CUSTOMER">일반 손님</option>
                <option value="OWNER">창업 희망자</option>
            </select>
            <div>
                <h2>아이디</h2>
                <input
                    value={loginId}
                    onChange={handleChangeId}
                    type="text"
                    placeholder="아이디"
                />
            </div>
            <div>
                <h2>비밀번호</h2>
                <input
                    value={password}
                    onChange={handleChangePassword}
                    type="password"
                    placeholder="비밀번호"
                />
            </div>
            <div className="login-button">
                <MyButton onClick={handleLogin} text="로그인" type="default" />
            </div>
            <div className="signup-button">
                <MyButton onClick={goToSignup} text="회원가입" type="default" />
            </div>
            {errorMessage && <div className="error-message">{errorMessage}</div>} {/* 오류 메시지 표시 */}
        </div>
    );
};

export default Login;
