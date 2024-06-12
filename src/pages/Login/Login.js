import { Route } from "react-router-dom";
import MyButton from "../../components/MyButton";
import { useNavigate } from "react-router-dom";
import './Login.css';
import React, {useState} from 'react';

const User = {
    ID: 'User',
    Password: '1234',
    Type: '일반 손님'

}

const Owner = {
    ID: 'Owner',
    Password: '1234',
    Type: '창업희망자'

}

const Login = () => {

    const [ID, setID] = useState('');
    const [Password, setPassword] = useState('');
    const [Type, setType] = useState('');

    const onChangeID = (e) => {
        setID(e.target.value);
    };
    //ID 입력받는 함수

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };
    //Password 입력받는 함수

    const onChangeType = (e) => {
        setType(e.target.value); 
    };
    //type 입력받는 함수(창업 희망자, 일반 손님)

    const Navigate = useNavigate();

    const goToSignup = () => {
        Navigate('/Signup')
    }
    //페이지 이동 함수
    const onClickLoginButton = () => {
        if (ID === User.ID && Password === User.Password && Type === User.Type) {
            Navigate('/Customerhome')
        } else if (ID === Owner.ID && Password === Owner.Password && Type === Owner.Type) {
            Navigate('/Ownerhome')
        } else {
            alert('등록되지 않은 사용자입니다. 회원가입을 해주세요.');
        }
    
    }


    return (
        <div className="Loginpage">
            <div>
            <h1>오늘만 사장</h1>
            </div>
            <div>
            <select value={Type} onChange={onChangeType}>
                <option>일반 손님</option>
                <option>창업희망자</option>
            </select>
            </div>
            <div>
                <div>
                <h2>아이디</h2>
                <input
                    value = {ID}
                    onChange = {onChangeID}
                    type="text" 
                    placeholder={"아이디"}
                />
                </div>
                <div>
                <h2>비밀번호</h2>
                <input
                    value = {Password}
                    onChange={onChangePassword}
                    type="text" 
                    placeholder={"비밀번호"}
                />
                </div>
                <div className="LoginButton">
                    <MyButton onClick={onClickLoginButton}
                    text="로그인" type="default"
                />
                </div>
                    <MyButton onClick={goToSignup}
                    text="회원가입" type="default"/>
            </div>
        </div>
    )
}

export default Login;