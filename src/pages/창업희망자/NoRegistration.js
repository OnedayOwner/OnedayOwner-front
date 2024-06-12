import React from 'react';
import { useNavigate } from 'react-router-dom';


const NoRegistration = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/Registration');
    }

    return (
        <div style={{textAlign:'center'}}>
            <h1>아직 식당을 열지 않으셨군요.</h1>
            <h1>지금 새로운 식당을 오픈해 보세요!</h1>

            <button onClick={handleClick}>식당 오픈하러 가기</button>
        </div>
    )
}

export default NoRegistration;