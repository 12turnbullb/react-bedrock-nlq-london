import React from 'react';
import './ClearCacheButtonComponent.css';

const ClearCacheButtonComponent = ({onClickButton}) => {
    const clearTheCache = () => {
        onClickButton();
    }
    return (
        <div className="container">
            <h1>Chatbot</h1>
        <button onClick={clearTheCache} className="top-right-button">Clear Cache</button>
        </div>
    );
};

export default ClearCacheButtonComponent;