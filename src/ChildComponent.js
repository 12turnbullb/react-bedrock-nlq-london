import React from 'react';
import { useArray } from './ArrayContext';

const ChildComponent = () => {
  const { array, setArray } = useArray();
  const addItem = (item) => {
    setArray([...array, item]);
  };
  
  return (
    <div>
      <h1>Items</h1>
      <ul>
        {array.map((item, index) => {
            <li key={index}>{item}</li>
        })}
      </ul>
      <button onClick={addItem("junk")}>Add Item</button>
    </div>
  );
};

export default ChildComponent;