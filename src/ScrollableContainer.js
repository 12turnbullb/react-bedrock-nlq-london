import React, { useEffect, useRef } from 'react';
import './ChildContainer.css';

const ScrollableContainer = ({ children }) => {
    const scrollContainerRef = useRef(null);
    const isInitialMount = useRef(true);
    useEffect(() => {
        const currentContainer = scrollContainerRef.current;
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        } 
        //alert("running ScrollableContainer update");
    }, []);
    return (
    <div className='child-container' style={{ maxHeight: '480px', overflowY: 'auto' }}>
        <div ref={scrollContainerRef} />
    {children}
    
    </div>
    );
}

export default ScrollableContainer;

//<div className="scrollable-container" style={{padding: '1em', textAlign: 'left' }}>
//<div ref={ messageEndRef } />