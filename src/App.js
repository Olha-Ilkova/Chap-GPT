import React, { useState } from "react";
import './App.css';
import './Preloader/Preloader.css'

function App() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleQuestionVariantClick = (value) => {
    setQuestion(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    fetch('http://localhost:3001/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: question }),
    })
      .then((res) => res.json())
      .then((data) => {
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleString();

        setResponse(data.message);
        setChatHistory([...chatHistory, { question, response: data.message, timestamp: formattedDate }]);
        setQuestion('');
        setIsLoading(false);
      });
  };

  return (
    <div className="chat">
      <div className="chat-container">
        <div className="chat-question-variants">
          <span>Suggest to ask me about:</span>
          <span
            className="questionVariants"
            onClick={() => handleQuestionVariantClick('Привіт!')}>Привіт!</span>
          <span
            className="questionVariants"
            onClick={() => handleQuestionVariantClick('ТОП-10 ресторанів у Львові')}>ТОП-10 ресторанів у Львові</span>
          <span
            className="questionVariants"
            onClick={() => handleQuestionVariantClick('Що подивитись у Львові?')}>Що подивитись у Львові?
          </span>
        </div>
        <div className="chat-history">
          {chatHistory.map((chat, index) => (
            <div key={index} className="chat-bubble">
              <div className="question">
                {chat.question}
                <div className="timestamp">{chat.timestamp}</div> {/* Display the timestamp */}
              </div>
              <div className="response">
                {chat.response}
                <div className="timestamp">{chat.timestamp}</div> {/* Display the timestamp */}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="chat-bubble">
              <div className="question"></div>
              <div className="response">
                <div id="preloader"><div><em></em><em></em><em></em><em></em></div></div>
              </div>
            </div>
          )}
        </div>

        <div className="question-area">
          <input
            type="text"
            className="question-areaInp"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter your question"
            disabled={isLoading}
          />
          <button type="submit" className="question-areaBtn" onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Send'}
          </button>
        </div>
      </div>
      <div className="chat-bgr-opacity"></div>
    </div>
  );
}

export default App;
