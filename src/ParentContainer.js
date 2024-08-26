import React, { useEffect, useRef } from 'react';
import './ParentContainer.css';
import ScrollableContainer from './ScrollableContainer';

const ParentContainer = ({ children }) => {
    const isInitialMount = useRef(true);
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        } 
        alert("running ParentContainer update");
    }, []);

    return (
        <div className="parent-container">
            
            {children}
        </div>
    );
};

export default ParentContainer;

//<div ref={scrollContainerRef} />