import React, { useState, useEffect, useRef } from 'react';
import './TriangleInput.css';

const TriangleInput = ({ value, onValueChange, onBlur, onButtonClick }) => {
    const isInitialMount = useRef(true);
    const buttonRef = useRef(null);
    const [inputValue, setInputValue] = useState('');
    const textAreaRef = useRef(null);

    useEffect(() => {
         if (textAreaRef.current) {
            textAreaRef.current.style.height = 'inherit'; // Reset height to shrink back if text is deleted
            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
         }
        //alert("running TriangleComponent update");
    }, [inputValue]);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
        //alert("in handleInput: " + inputValue);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSubmit(inputValue);
            setInputValue('');
        }
    };

    const handleSubmit = (inputValue) => {
        if (onButtonClick) {
            onButtonClick(inputValue);
        }
        setInputValue('');
        textAreaRef.current.style.height = 'inherit'; // Reset height post submission
    };
    
    const handleMultipleActions = (event) => {
        //alert("in handleMultiple: " + inputValue);
        event.preventDefault();
        //onValueChange(inputValue);
        onButtonClick(inputValue);
        setInputValue('');
    }

    return (
        <form onSubmit={handleMultipleActions} className="triangle-form">
            <textarea 
                ref={textAreaRef}
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Chat with us"
                className='triangle-text-input'
            />
            <button ref={buttonRef} type="submit" className='triangle-button' />
        </form>
    );
};

export default TriangleInput;   

/*<form className="triangle-form">
            <input 
                type="text" 
                value={value}
                onChange={(e) => onValueChange(e.target.value)}
                placeholder="Chat with us"
                className='triangle-text-input'
            />
            <button type="submit" onClick={onButtonClick} className='triangle-button' />
        </form>
*/
/*
if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }
*/