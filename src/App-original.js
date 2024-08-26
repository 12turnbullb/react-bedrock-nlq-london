import React, { useState } from 'react';
import axois from 'axios';
import logo from './logo.svg';
import loadingGif from './loading-green-loading.gif';  //Import loading GIF file
import './App.css';


function App() {
  const [inputValue, setInputValue] = useState('');
  const [inputIndexName, setIndexInputValue] = useState('');
  const [apiResponse, setApiResponse] = useState('');
  const [loading, setLoading] = useState(false);
  let encodedPrompt = '';
  let answerBody = '';
  let sources = '';

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const handleIndexInputChange = (event) => {
    setIndexInputValue(event.target.value);
  };
  const handleButtonClick = () => {
    setLoading(true); //Start loading
    // Add parms: `https://wjfnpjdwb5.execute-api.us-east-1.amazonaws.com/api/prompt/${inputValue}/index/${inputIndexName}`
    encodedPrompt = encodeURIComponent(`${inputValue}`)
    // alert(`https://wjfnpjdwb5.execute-api.us-east-1.amazonaws.com/api/prompt/${encodedPrompt}/index/${inputIndexName}`);
    axois.get(`https://wjfnpjdwb5.execute-api.us-east-1.amazonaws.com/api/prompt/${encodedPrompt}/index/${inputIndexName}`)
      .then(response => {
        setApiResponse(JSON.stringify(response.data));
        //alert(JSON.stringify(response.data));
        answerBody = JSON.stringify(response.data.answer);
        answerBody = answerBody.replace(/["]/g, '');
        sources = JSON.stringify(response.data.docs);
        sources = sources.replace(/["]/g, '');
        const jsonObject = {
          answer: answerBody,
          sources: sources
        };
        setApiResponse(jsonObject);
      })
      .catch(error => {
        setApiResponse(`Error: ${error.message}`);
      })
      .finally(() => {
        setLoading(false);  //Stop loading after API response
      });
  };
  return (
    <div className="App">
      <header className="App-header">
      {loading ? <img src={loadingGif} className="footer" style={{padding: '1em', width: 100, hight: 100}} alt="Loading ..." /> : null}
          {apiResponse && (
          //<textarea classname="apiResponseBox" style={{padding: '1em'}} readOnly value={apiResponse}></textarea>
          <DisplayAnswer answer={apiResponse} />)}
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter question"
          />
          <input
          type="text"
          value={inputIndexName}
          onChange={handleIndexInputChange}
          placeholder="Enter Opensearch index"
          />
          <button onClick={handleButtonClick}>Submit
          
          </button>
          
       </header>
    </div>
  );
}

function DisplayAnswer({answer}) {
  let theAnswer = JSON.stringify(answer.answer);
  let theSources = JSON.stringify(answer.sources);
  theAnswer = theAnswer.replace(/["]/g, '');
  theSources = theSources.replace(/["]/g, '');
  let sourceLink = ''
  //alert(theAnswer);
  const lines = theAnswer.split('\\n');
  if (theSources.endsWith('\\n')) {
    theSources = theSources.slice(0, -1);
  }
  const sources = theSources.split('\\n');

  const ArrowToggle= () => {
    const [isUp, setIsUp] = useState(true);
    const toggleArrow = () => {
      setIsUp(!isUp);
    };
    return (
      <div className="arrow-container" onClick={toggleArrow}>
        {isUp ? '^' : 'v'}
        </div>
    )
    };

  const Collapsible = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleCollapse = () => {
      setIsOpen(!isOpen);
    };
    return (
      <div>
        <a href="#!" onClick={toggleCollapse} style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}> 
          {title}
        </a>
        {isOpen && (
          <div style={{ marginTop: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
            {children}
          </div>
        )}
        </div>
    );
  };

  return ( 
    <div className="scrollable-container" style={{padding: '1em', textAlign: 'left' }}>
      {lines.map((line, index) => (
        <React.Fragment key={index}>
        {line = line.replace(/[\\]/g, '')}
        {index < lines.length && <br />}
        </React.Fragment>
      ))}
      <br />
      <div >
        <React.Fragment>
        <Collapsible title="Sources: ">
        {sources.map((source, index) => (
          <div className="link-container" key={index}>
            <ul>
            <li><a href={source.replace(/[\\]/g, '').split(", page: ")[0]} target="_blank" className='link'>{source.replace(/[\\]/g, '')}
            </a></li>
            </ul>
          </div>
        ))}
        </Collapsible>
        </React.Fragment>
      </div>
    </div>
  );
}

export default App;
