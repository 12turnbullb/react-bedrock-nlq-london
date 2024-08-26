import React, { createContext, useState, useContext} from 'react';

// Create a context
const ResponseArrayContext = createContext();

// Provider compoent
export const ResponseArrayProvider = ({ children }) => {
    const [responseArray, setResponseArray] = useState([]);

    return (
        <ResponseArrayContext.Provider value={{ responseArray, setResponseArray }}>
            {children}
        </ResponseArrayContext.Provider>
    );
};

//Custom hook to use the aray context
export const useResponseArray = () => useContext(ResponseArrayContext);