import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import loadingGif from './loading-green-loading.gif';  //Import loading GIF file
import './App.css';
import Collapsible from './Collapsible';
import { Parser } from "html-to-react";
import { useResponseArray } from './ResponseArrayContext';
import { usePromptArray }  from './PromptArrayContext';
import useLocalStorage from './useLocalStorage';
import ScrollableContainer from './ScrollableContainer';
import ParentContainer from './ParentContainer';
import FooterContainer from './FooterContainer';
import TriangleInput from './TriangleInput';
import SelectComponent from './SelectComponent';
import BackgroundComponent from './BackgroundComponent';
import BackgroundLoaderComponent from './BackroundLoaderComponent';
import ClearCacheButtonComponent from './ClearCacheButtonComponent';
import amazon_chatbot from './amazon_chatbot.jpg'
import ChatBot_PNG_Cutout from './ChatBot_PNG_Cutout.png'



const Chatbot = ({ changeBackground, generated_uuid }) => {
  const [inputValue, setInputValue] = useState('');
  const [inputIndexName, setIndexInputValue] = useState("abinbev_foundation-vector-embeddings");
  const [apiResponse, setApiResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const { responseArray, setResponseArray } = useResponseArray();
  const { promptArray, setPromptArray } = usePromptArray();
  const [value, setValue] = useState('');
  const [savedValue, setSavedValue] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [loadImage, setLoadImage] = useState(false);

  const [messages, setMessages] = useState([]); //List of messages
  const [newMessage, setNewMessage] = useState(''); // Input for new messages
  const messagesEndRef = useRef(null); // Ref to the end of the messages container
  const sourcesEndRef = useRef({counter: 0});
  
  let imageName = '';
  const options = [
    { value: 'pltw', label: "Project Lead The Way" }
  ];
  const addResponseItem = (inputItem) => {
    //alert(inputItem.text);
    setResponseArray([...responseArray, inputItem]);
  }
  const addPromptItem = (inputItem) => {
    //alert(inputItem.text);
    setPromptArray([...promptArray, inputItem]);
  }

  //Save index on refresh or restart
  const [savedIndex, setSavedIndex] = useLocalStorage('savedIndex', inputIndexName);
  const saveIndex = () => {
    setSavedIndex(inputIndexName);
  }
  const getSavedIndex = () => {
    return savedIndex;
  };

  /*const [itemsX, setItemsX, removeItemsX] = useLocalStorage('itemsXList', []); //Initial empty array

  const addItemX = () => {
    const newItemX = `Item ${itemsX.length + 1}`;
    setItemsX([...itemsX, newItemX]);
    };
  const clearItemsX = () => {
    removeItemsX();
  };*/
  let encodedPrompt = '';
  let encodedKB = '';
  let answerBody = '';
  let sources = '';
  let messagess = [];

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleIndexInputChange = (event) => {
    setIndexInputValue(event.target.value);
  };

  const handleValueChange = (newValue) => {
    //setPromptArray(newValue);
    sourcesEndRef.current = 10;
    setValue(newValue);
    //alert("value: " + value);
  }

  const handleBlur = () => {
    setSavedValue(value);
  }

  const handleSelectedOptionChange = (selectedValue) => {
    setIndexInputValue(selectedValue + "-vector-embeddings");
    setLoadImage(true);
  }
  const handleImageChange = (imageName) => {
    //imageName = inputIndexName.split('-vector-embeddings')[0];
    setSelectedImage(imageName);
    setLoadImage(true);
    <BackgroundLoaderComponent image={imageName}/>
  }
  const applyBackgroundImage = () => {
    //alert("in applyBackgroundImage: true/false" );
    setLoadImage(true);
  }

  const handleAddMessage = () => {
    setMessages(prevMessages => [...prevMessages, newMessage]);
    setNewMessage('');
  };

  const clearCache = () => {
    alert("clearing Cache");
    setMessages([]);
    sources = '';
  }

  /*const handleScroll = (ref) => {
    window.scrollTo({
      top: ref.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };*/
  
  useEffect(() => {
    const variableTest = 0;
    if (getSavedIndex()){
      //alert("got saved index: " + getSavedIndex());
      setIndexInputValue(getSavedIndex());
    }
    if (sourcesEndRef.current < 1 ) {
      if (messagesEndRef.current){
        if( messagesEndRef.current.scrollTop === messagesEndRef.current.scrollHeight ){
          //alert("Chatbot effect! " + sourcesEndRef.current);
        messagesEndRef.current.scrollIntoView({ behavior: 'auto' });
        }
      } 
    }
    sourcesEndRef.current = 0;
  }, [messagess]);

    
  const handleButtonClick = (theNewValue) => {
    //event.preventDefault();
    //alert("the new value: " + theNewValue);
    setValue(theNewValue);
    
    setLoading(true); //Start loading
    // Add parms: `https://wjfnpjdwb5.execute-api.us-east-1.amazonaws.com/api/prompt/${inputValue}/index/${inputIndexName}`
    encodedPrompt = encodeURIComponent(`${theNewValue}`)
    
    const kb_id = 'QGSZFFKMQA'
    
    encodedKB = encodeURIComponent(`${kb_id}`)
    
    //alert(encodedPrompt);
    //alert(`https://wjfnpjdwb5.execute-api.us-east-1.amazonaws.com/api/prompt/${encodedPrompt}/index/${inputIndexName}`);
        //axois.get(`https://ch69eeq418.execute-api.us-east-1.amazonaws.com/api/prompt/${encodedPrompt}/index/${inputIndexName}/id/${generated_uuid}`)
        axios.get(`https://rrkpzvhge7.execute-api.us-east-1.amazonaws.com/api/query/${encodedPrompt}/kb/${encodedKB}/id/${generated_uuid}`)
        .then(response => {
            setApiResponse(JSON.stringify(response.data));
            answerBody = JSON.stringify(response.data.answer);
            answerBody = answerBody.replace(/["]/g, '');
            sources = JSON.stringify(response.data.docs);
            sources = sources.replace(/["]/g, '');
            const jsonObject = {
                answer: answerBody,
                sources: sources,
                prompt: theNewValue
            };
            setApiResponse(jsonObject);
            
            //alert("theAnswer: " + answerBody);
            
            let prompt = theNewValue;
            let allLines = '';
            
            let sourceLink = ''
            
            prompt = prompt.replace(/["]/g, '');
            const lines = answerBody.split('\\n');
            const newMessage = {
                text: prompt,
                sender: 'user'
            };
            addPromptItem(newMessage);
            //alert(array);
            for (let i = 0; i < lines.length; i++) {
                allLines += lines[i].replace(/[\\]/g, '') + '<br />';
            }
            const responseMessage = { text: allLines, sender: 'bot' };
            //setItemsX([...itemsX, newMessage]);
            //setItemsX([...itemsX, responseMessage]);
            //alert(newMessage.text);
            addResponseItem(responseMessage);
            //alert(array.length);
            let countItems = promptArray.length;
        })
        .then(data => {
            
        })
        .catch(error => {
            setApiResponse(`Error: ${error.message}`);
            //alert("API error: " + error.message);
        })
        .finally(() => {
            setLoading(false);  //Stop loading after API response
            //alert("stopped loading");
        });
    }
  return (
    <div className="App">
      <header className="App-header">
        <ParentContainer>
        <div className="chat-container">
          <img src={ChatBot_PNG_Cutout} style={{padding: 0, top: 0}} />
          <hr style={{padding: 0, top: 0}}/>
      {loading ? <FooterContainer></FooterContainer> : null}
          {apiResponse && (
          //<textarea classname="apiResponseBox" style={{padding: '1em'}} readOnly value={apiResponse}></textarea>
          <DisplayAnswer answer={apiResponse}  />)}
          <TriangleInput value={value} onValueChange={handleValueChange} onBlur={handleBlur} onButtonClick={handleButtonClick} />
          
          
          </div>
          </ParentContainer>
          <SelectComponent options={options} initialValue="mid_ohio_food_collective" onChange={handleSelectedOptionChange} onBackground={changeBackground} setSavedIndex={setSavedIndex}/>
          
       </header>
    </div>
  );

function DisplayAnswer({answer}) {
    let itemsLength = 0;
    let theAnswer = JSON.stringify(answer.answer);
    let theSources = JSON.stringify(answer.sources);
    let prompt = JSON.stringify(answer.prompt);
    let messagess = [];
    let allLines = '';
    
    theAnswer = theAnswer.replace(/["]/g, '');
    theSources = theSources.replace(/["]/g, '');
    let sourceLink = ''
    
    prompt = prompt.replace(/["]/g, '');
    const lines = theAnswer.split('\\n');
    const newMessage = {
        text: prompt,
        sender: 'user'
    };

    for (let i = 0; i < lines.length; i++) {
        allLines += lines[i].replace(/[\\]/g, '') + '<br />';
    }
    const responseMessage = { text: allLines, sender: 'bot' };

    if (theSources.endsWith('\\n')) {
        theSources = theSources.slice(0, -1);
    }
    const sources = theSources.split('\\n');
    if (typeof responseArray === 'undefined') {
        itemsLength = 0;
    } else {
        itemsLength = responseArray.length;
    }
    for (let i = 0; i < promptArray.length; i++) {
        messagess.push( promptArray[i],responseArray[i]); 
        setNewMessage(promptArray[i],responseArray[i]);
    }
    
    return ( 
        <ParentContainer>
        <ScrollableContainer >
        <div >
        {messagess.map((item, index) => (
            <React.Fragment key={index}>
            <div className= {`message ${item.sender}`} >
                <font color="#9900FF">{item.sender === 'user' ? 'You: ' : 'Assistant: '}</font>
                {Parser().parse(item.text)}
                </div>
            {index < messagess.length - 1 && <br />}
            </React.Fragment>
        ))}
        <div ref={ messagesEndRef } />
        
        
        <div >
            <React.Fragment>
            <Collapsible title="Sources: ">
            {sources.map((source, index) => (
            <div className="sources-link-container" key={index}>
                <a href={source.replace(/[\\]/g, '').split(", page: ")[0]} target="_blank" rel="noreferrer" className='link'>{source.replace(/[\\]/g, '')}
                </a>
            </div>
            ))}
            </Collapsible>
            </React.Fragment>
        </div>
        </div>
        </ScrollableContainer>
        </ParentContainer>
    );
    }
}

export default Chatbot;

//<ClearCacheButtonComponent onClickButton={clearCache} />