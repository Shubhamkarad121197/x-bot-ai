import React, { useState, useEffect } from 'react';
import Message from './message';

const HistoryPage = ({ conversations }) => {
  const [selectedChat, setSelectedChat] = useState(null);

  // Auto-select latest conversation whenever conversations change
  useEffect(() => {
    if (conversations && conversations.length > 0) {
      setSelectedChat(conversations[conversations.length - 1]);
    }
  }, [conversations]);

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
  };

  return (
    <div className="history-container">
      {/* Sidebar with conversation list */}
      <div className="sidebar">
        <h2>Conversation History</h2>
        {conversations.length > 0 ? (
          <ul className="history-list">
            {conversations.map((chat) => (
              <li
                key={chat.id}
                className={`history-item ${selectedChat?.id === chat.id ? 'active' : ''}`}
                onClick={() => handleSelectChat(chat)}
              >
                <div className="history-preview">
                  <p>{chat.messages[0]?.text.slice(0, 30)}...</p>
                  <span className="history-date">{new Date(chat.id).toLocaleDateString()}</span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-history-message">No saved conversations yet.</p>
        )}
      </div>

      {/* Chat display area */}
      <div className="chat-display">
        {selectedChat ? (
          <>
            <div className="chat-messages">
              {selectedChat.messages.map((msg, index) => (
                <Message key={index} message={msg} />
              ))}
            </div>

            {/* Feedback section */}
            <div className="feedback-display">
              <h3>Feedback</h3>
              <div className="star-rating">
                {[...Array(5)].map((_, index) => (
                  <span
                    key={index}
                    className={`star ${index < (selectedChat.feedback?.rating || 0) ? 'filled' : ''}`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <p>{selectedChat.feedback?.subjective || ''}</p>
            </div>
          </>
        ) : (
          <div className="placeholder-message">
            <p>Select a conversation to view its history.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
