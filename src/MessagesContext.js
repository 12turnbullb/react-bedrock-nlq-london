import React, {createContext, useState, useContext} from 'react';

//Create a Context
const MessageContext = createContext();

//Create a Provider
export const MessagesProvider = ({children}) => {
    const [message, setMessage] = useState([]);

    return (
        <MessageContext.Provider value={{message, setMessage}}>
            {children}
        </MessageContext.Provider>
    );
};

export const useMessage = () => useContext(MessageContext);