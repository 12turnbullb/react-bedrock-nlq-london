import React, { createContext, useState, useContext} from 'react';

// Create a context
const PromptArrayContext = createContext();

// Provider compoent
export const PromptArrayProvider = ({ children }) => {
    const [promptArray, setPromptArray] = useState([]);

    return (
        <PromptArrayContext.Provider value={{ promptArray, setPromptArray }}>
            {children}
        </PromptArrayContext.Provider>
    );
};

//Custom hook to use the aray context
export const usePromptArray = () => useContext(PromptArrayContext);