import React from 'react';

const ScrollableContainer2 = ({ children, height = '300px' }) => {
    const containerStyle = {
        maxHeight: height,
        overflow: 'auto', //Enables vertical scrolling
        width: '100%',    //Take full width of parent container
        border: '1px solid #ccc',
        borderRadius: '4px',
        padding: '10px',
        boxSizing: 'border-box' //Include padding and border in width and height calculation
    };
  return (
    <div style={containerStyle}>
      {children}
    </div>
  );
};

export default ScrollableContainer2;