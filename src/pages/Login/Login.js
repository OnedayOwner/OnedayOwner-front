import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MyButton from '../../components/MyButton';
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
            const response = await axios.post(`http://ec2-3-39-193-47.ap-northeast-2.compute.amazonaws.com:8080/api/users/login`, {
                loginId,
                password,
            }, {
                params: { role: type }
            });
            localStorage.setItem('token', response.headers.authorization);
            alert('로그인 성공');
            if (type === 'CUSTOMER') {
                navigate('/Customerhome');
            } else if (type === 'OWNER') {
                navigate('/Ownerhome');
            }
        } catch (error) {
            setErrorMessage('로그인 실패: ' + (error.response ? error.response.data.message : error.message));
        }
    };

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
            {errorMessage && <div className="error-message">{errorMessage}</div>}
        </div>
    );
};

export default Login;
