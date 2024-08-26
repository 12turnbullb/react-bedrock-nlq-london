import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Chatbot.css'; // Import the external CSS file
import loadingGif from './loading-gif.gif';

const Chatbot = ({ generated_uuid }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false); // State to toggle chatbot visibility
  const [isLoading, setIsLoading] = useState(false); // State to handle loading
  const chatHistoryRef = useRef(null); // Reference to the chat history container

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    let kb_id = 'QGSZFFKMQA';
    let encodedKB = encodeURIComponent(`${kb_id}`);
    let encodedPrompt = encodeURIComponent(`${input}`);

    // Add user message to chat history
    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);

    // Disable input and set loading state
    setIsLoading(true);
    setInput('');

    try {
      // Perform a GET request with parameters in the URL
      const response = await axios.get(`https://rrkpzvhge7.execute-api.us-east-1.amazonaws.com/api/query/${encodedPrompt}/kb/${encodedKB}/id/${generated_uuid}`);
      
      // Add bot response and sources to chat history
      const botMessage = {
        sender: 'bot',
        text: response.data.answer, // Adjust based on the actual response structure
        sources: response.data.docs || [] // Adjust based on the actual response structure
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error fetching bot response:', error);
    } finally {
      // Re-enable input field and loading state
      setIsLoading(false);
    }
  };
  
  const extractFilename = (url) => {
  return url.substring(url.lastIndexOf('/') + 1);
  };

  useEffect(() => {
    // Scroll to bottom when messages change
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div>
      <button className={`chatbot-toggle ${isOpen ? 'move-up' : ''}`} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? 'Close Chat' : 'Open Chat'}
      </button>

      {isOpen && (
        <div className="chatbot-overlay-main">
          {/* Title bar */}
          <div className="chatbot-title">
            PLTW Virtual Assistant
          </div>

          <div className="chat-container">
            <div className="chat-history" ref={chatHistoryRef}>
              {messages.map((message, index) => (
                <div key={index} className={`message ${message.sender}`}>
                  {message.sender === 'bot' ? (
                    <div className="bot-message">
                      <img
                        src="./images/pltw_logo.png"
                        alt="Bot Avatar"
                        className="avatar"
                      />
                      <div className="text-bubble bot">
                        {message.text}
                        {message.sources.length > 0 && (
                          <div className="sources">
                         {message.sources.map((url, idx) => (
                              <div key={idx} className="source-item">
                                <span className="source-label">{`[${idx + 1}] `}</span>
                                <a href={url} target="_blank" rel="noopener noreferrer" className="source-link">
                                  {extractFilename(url)}
                                </a>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="user-message">
                      <div className="text-bubble user">{message.text}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <form onSubmit={handleSubmit} className="form">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="input"
                disabled={isLoading} // Disable input during loading
              />
              {isLoading ? (
                <div className="button-loading">
                  <img src={loadingGif} alt="Loading" className="loading-gif" />
                </div>
              ) : (
                <button type="submit" className="button">
                  Send
                </button>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
