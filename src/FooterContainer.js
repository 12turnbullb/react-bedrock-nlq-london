import React from 'react';
import './FooterContainer.css';
import loadingGif from './loading-green-loading.gif';  //Import loading GIF file

const FooterContainer = () => {
    return (
        <div className="footer-container">
            <img src={loadingGif} style={{padding: '1em', width: 45, hight: 45}} alt="Loading ..." />
        </div>
    );
};

export default FooterContainer;