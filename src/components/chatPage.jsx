import React, { useState, useRef, useEffect } from 'react';
import Message from './message';
import FeedbackModal from './feedbackModal';

const ChatPage = ({ aiResponses, onSave, currentChat, setCurrentChat }) => {
  const [userInput, setUserInput] = useState('');
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const chatEndRef = useRef(null);

  const getAIResponse = (query) => {
    const sanitizedQuery = query.toLowerCase().trim();
    const foundResponse = aiResponses.find(
      (item) => sanitizedQuery.includes(item.query.toLowerCase())
    );
    return foundResponse ? foundResponse.response : 'Sorry, Did not understand your query!';
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (userInput.trim() === '') return;

    const userMessage = { text: userInput, from: 'user' };
    const aiMessageText = getAIResponse(userInput);
    const aiMessage = { text: aiMessageText, from: 'ai', liked: null };

    setCurrentChat([...currentChat, userMessage, aiMessage]);
    setUserInput('');
  };

  const handleSaveClick = () => {
    setShowFeedbackModal(true);
  };

  const handleFeedbackSubmit = (rating, feedbackText) => {
    onSave(currentChat, rating, feedbackText);
    setShowFeedbackModal(false);
  };

  const handleFeedbackCancel = () => {
    setShowFeedbackModal(false);
  };

  const handleLikeDislike = (index, liked) => {
    const updatedChat = [...currentChat];
    updatedChat[index].liked = liked;
    setCurrentChat(updatedChat);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentChat]);

  return (
    <div className="chat-container">
      <div className="chat-area">
        <div className="chat-messages">
          {currentChat.length === 0 && (
            <div className="initial-render-container">
              <h2>How Can I Help You Today?</h2>
              <div className="suggestion-buttons">
                <button className="suggestion-button">What's the weather?</button>
                <button className="suggestion-button">What is my location?</button>
                <button className="suggestion-button">What's the temperature?</button>
                <button className="suggestion-button">How are you?</button>
              </div>
            </div>
          )}
          {currentChat.map((msg, index) => (
            <Message
              key={index}
              message={msg}
              onLikeDislike={(liked) => handleLikeDislike(index, liked)}
              
            />
          ))}
          <div ref={chatEndRef} />
        </div>
        <form className="chat-input-form" onSubmit={handleSendMessage}>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Message Bot AI..."
          />
          <button type="submit" className="ask-button">Ask</button>
          <button type="button" className="save-button" onClick={handleSaveClick}>Save</button>
        </form>
      </div>
      {showFeedbackModal && (
        <FeedbackModal onSubmit={handleFeedbackSubmit} onCancel={handleFeedbackCancel} />
      )}
    </div>
  );
};

export default ChatPage;