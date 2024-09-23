import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./Chatbot_Agent.css"; // Import the external CSS file
import loadingGif from "./loading-gif.gif";

const Agent = ({ generated_uuid }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State to handle loading
  const [expandedIndexes, setExpandedIndexes] = useState([]); // Track expanded messages
  const chatHistoryRef = useRef(null); // Reference to the chat history container

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return;

    let encodedPrompt = encodeURIComponent(`${input}`);

    // Add user message to chat history
    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);

    // Disable input and set loading state
    setIsLoading(true);
    setInput("");

    try {
      const response = await axios.get(
        `https://q47o63pkjb.execute-api.us-east-1.amazonaws.com/prod/input/${encodedPrompt}/id/${generated_uuid}`
      );

      // Add bot response and SQL query to chat history
      const botMessage = {
        sender: "bot",
        text: response.data.answer, // Adjust based on the actual response structure
        sql: response.data.sql_query,
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error fetching bot response:", error);
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
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div>
      <header className="chatbot-header">
        <h1>Generative AI Forum - London, UK</h1>
      </header>

      <div className="container">
        <div className="left-section">
          <section className="about-section">
            <h1 className="about-header">About this Demo</h1>
            <p className="description">
              We use Amazon Bedrock to generate SQL queries from natural
              language and return the results conversationally. You can ask
              questions about FIFA world cups from 1930-2014. The structured
              data in our sample ends at 2014.
            </p>
            <h2 className="about-header">Dataset Descriptions</h2>
            <p className="description">
              This application utilizes several datasets to provide insights and
              statistics about the FIFA World Cup:
            </p>
            <ul className="about-dataset-list">
              <li>
                <strong>World Cup Dataset:</strong> Tracks the winners of each
                tournament along with the host countries and final match
                results.
              </li>
              <li>
                <strong>World Cup Matches Dataset:</strong> Contains detailed
                match information including dates, venues, teams, scores, and
                match events.
              </li>
              <li>
                <strong>Players Dataset:</strong> Includes performance metrics
                for players such as goals, assists, and minutes played.
              </li>
            </ul>
          </section>
        </div>
        <div className="right-section">
          <div className="chatbot-overlay">
            <div className="chatbot-title">
              Natural Language Query with Amazon Bedrock
            </div>
            <div className="chat-container">
              <div className="chat-history" ref={chatHistoryRef}>
                {messages.map((message, index) => (
                  <div key={index} className={`message ${message.sender}`}>
                    {message.sender === "bot" ? (
                      <div className="bot-message">
                        <img
                          src="./images/ball-avatar.png"
                          alt="Bot Avatar"
                          className="avatar"
                        />
                        <div className="text-bubble bot">
                          <div className="markdown-content">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                              {message.text}
                            </ReactMarkdown>
                          </div>
                          {message.sql && (
                            <div className="expandable-section">
                              <button
                                className="expand-button"
                                onClick={() => toggleExpand(index)}
                              >
                                {expandedIndexes.includes(index)
                                  ? "Hide SQL"
                                  : "Show SQL"}
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
            </div>

            <div className="form-container">
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
                    <img
                      src={loadingGif}
                      alt="Loading"
                      className="loading-gif"
                    />
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
      </div>
      <div className="arch-container">
        <img src="./images/arch.png" alt="arch" className="arch-image" />
      </div>
    </div>
  );
};

export default Agent;
