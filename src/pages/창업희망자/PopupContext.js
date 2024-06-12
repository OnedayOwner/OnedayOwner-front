import React, { createContext, useState } from 'react';

const PopupContext = createContext();

export const PopupProvider = ({ children }) => {
    const [popups, setPopups] = useState([]);

    const addPopup = (popup) => {
        setPopups([...popups, popup]);
    };

    return (
        <PopupContext.Provider value={{ popups, addPopup }}>
            {children}
        </PopupContext.Provider>
    );
};

export default PopupContext;
