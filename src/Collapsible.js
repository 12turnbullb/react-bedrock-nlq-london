import React, { useState } from 'react';

const Collapsible = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleCollapse = () => {
      setIsOpen(!isOpen);
    };
    return (
      <div>
        <a href="#!" onClick={toggleCollapse} style={{ position: 'absolute', marginLeft: '20px', left: 160, cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}> 
          {title}
        </a>
        {isOpen && (
          <div style={{ marginTop: '10px', padding: '10px', border: 'none', textJustify: 'left', borderRadius: '5px' }}>
            {children}
          </div>
        )}
        </div>
    );
  };

  export default Collapsible;