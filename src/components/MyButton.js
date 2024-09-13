import React from 'react';
import '../styles/MyButton.css';

const MyButton = ({ text, type = "default", onClick }) => {
    return(
        <button 
            className={["MyButton", `MyButton_${type}`].join(" ")} 
            onClick={onClick}
        >
            {text}
        </button>
    );
};

export default MyButton;
