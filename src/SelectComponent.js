import React, { useState } from 'react';

const SelectComponent = ({ value, onChange, onBackground, options, setSavedIndex }) => {
    
    const handleMultipleActions = (selectedValue) => {
        //alert("in handleMultiple: " + selectedValue);
        onChange(selectedValue);
        onBackground(selectedValue);
        setSavedIndex(selectedValue + "-vector-embeddings");
    }

    return (
        <select style={{position: 'absolute', bottom: '0', left: '20px'}} value={value} onChange={(e) => {handleMultipleActions(e.target.value); }} >
            <option value="">Select</option>
            {options.map(option => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default SelectComponent;