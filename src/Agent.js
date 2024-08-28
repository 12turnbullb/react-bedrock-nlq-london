import { Link } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './Chatbot_Agent.css'; // Import the external CSS file
import loadingGif from './loading-gif.gif';

const Agent = ({ generated_uuid }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false); // State to handle loading
  const [expandedIndexes, setExpandedIndexes] = useState([]); // Track expanded messages
  const chatHistoryRef = useRef(null); // Reference to the chat history container

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    let agentId = 'CZ5AECXEPN';
    let aliasId = "9FBV3HE1TE"

    let encodedAgentId = encodeURIComponent(`${agentId}`);
    let encodedAliasId = encodeURIComponent(`${aliasId}`);
    let encodedPrompt = encodeURIComponent(`${input}`);

    // Add user message to chat history
    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);

    // Disable input and set loading state
    setIsLoading(true);
    setInput('');

    try {
      // Perform a GET request with parameters in the URL
      const response = await axios.get(`https://gjft5j1cp8.execute-api.us-east-1.amazonaws.com/api/input/${encodedPrompt}/agentId/${encodedAgentId}/aliasId/${encodedAliasId}/id/${generated_uuid}`);
      
      // Add bot response and SQL query to chat history
      const botMessage = {
        sender: 'bot',
        text: response.data.answer, // Adjust based on the actual response structure
        sql: response.data.sql_query
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error fetching bot response:', error);
    } finally {
      // Set loading to false when the API calls is finished 
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Scroll to bottom when messages change
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [messages]);

  const toggleExpand = (index) => {
    setExpandedIndexes((prev) => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };
  
  return (
    <div>
    <div className="button-group">
      <Link to="/">
        <button className="styled-button">Back to Home</button>
      </Link>
      <br />
      <button className="styled-button" onClick={() => window.location.reload()}>Refresh</button>
    </div>

      <div className="chatbot-overlay">
        {/* Title bar */}
        <div className="chatbot-title">
          PLTW Natural Language Query
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
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.text}</ReactMarkdown>
                      {message.sql && (
                        <div className="expandable-section">
                          <button className="expand-button" onClick={() => toggleExpand(index)}>
                            {expandedIndexes.includes(index) ? 'Hide SQL' : 'Show SQL'}
                          </button>
                          {expandedIndexes.includes(index) && (
                            <div className="sql-query">
                              <div>{message.sql}</div>
                            </div>
                          )}
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
    </div>
  );
};

export default Agent;
