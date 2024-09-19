import React from 'react';
import '../styles/MyButton.css';

const MyButton = ({ text, type = "default", onClick, disabled = false }) => {
    return (
        <button
            className={["MyButton", `MyButton_${type}`, disabled ? "MyButton_disabled" : ""].join(" ")}
            onClick={onClick}
            disabled={disabled}
        >
            {text}
        </button>
    );
};

export default MyButton;
