import React from 'react';
import { Link } from 'react-router-dom';

const BackgroundComponent = ({ imageUrl }) => {
    //alert("BackgroundComponent: " + abinbev_foundation);
    const style = {
        backgroundImage: `url(${imageUrl})`,
        height: '100vh', // Full viewport height
        width: '100vw', // Full viewport width
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'cover',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white'
    };
    return <div style={style}>
    </div>;
};

export default BackgroundComponent;