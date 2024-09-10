import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MyButton from '../../components/MyButton';
import onboarding from '../../assets/images/onboarding.png';
import './Login.css';

const Login = () => {
    const [loginId, setLoginId] = useState('');
    const [password, setPassword] = useState('');
    const [type, setType] = useState('CUSTOMER');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handleChangeId = (e) => {
        setLoginId(e.target.value);
    };

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleChangeType = (e) => {
        setType(e.target.value);
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACK_URL}/api/users/login`, {
                loginId,
                password,
            }, {
                params: { role: type }
            });
            localStorage.setItem('token', response.headers.authorization);
            alert('로그인 성공');
            if (type === 'CUSTOMER') {
                navigate('/customerhome');
            } else if (type === 'OWNER') {
                navigate('/ownerhome');
            }
        } catch (error) {
            setErrorMessage('로그인 실패: ' + (error.response ? error.response.data.message : error.message));
        }
    };

    const goBack = () => {
        navigate(-1);
    };

    return (
        <div className="login-container">
            <div className="login-header">
                <div className="login-back-button" onClick={goBack}>&lt;</div>
                <h1 className="login-header__title">오늘만 사장</h1> 
                <p className="login-header__subtitle">창업을 시도하기 두려우셨나요?<br/>실제 매장 경험을 통해 창업 경험을 쌓아보세요</p>
            </div>
            <div className="login-image-container">
                <img className="login-image" src={onboarding} alt="온보딩 이미지" />
            </div>
            <div className="login-box">
                <select className="login-select" value={type} onChange={handleChangeType}>
                    <option value="CUSTOMER">일반 손님</option>
                    <option value="OWNER">창업 희망자</option>
                </select>
                <div>
                    <input
                        className="login-input"
                        value={loginId}
                        onChange={handleChangeId}
                        type="text"
                        placeholder="아이디"
                    />
                </div>
                <div>
                    <input
                        className="login-input"
                        value={password}
                        onChange={handleChangePassword}
                        type="password"
                        placeholder="비밀번호"
                    />
                </div>
                {errorMessage && <div className="login-error-message">{errorMessage}</div>}
                <div className="login-button-container">
                    <MyButton onClick={handleLogin} text="로그인" type="default" />
                </div>
            </div>
        </div>
    );
};

export default Login;
