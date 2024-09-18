import React, { useState, useEffect, useRef } from "react";
import Agent from "./Agent";

const { v4: uuidv4 } = require("uuid");

const generated_uuid = uuidv4();

const App = () => {
  return (
    <div>
      <Agent generated_uuid={generated_uuid} />
    </div>
  );
};

export default App;
