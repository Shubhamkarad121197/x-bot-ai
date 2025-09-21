import React, { useState } from 'react';

const Message = ({ message, onLikeDislike }) => {
  const isUser = message.from === 'user';
  const [showFeedback, setShowFeedback] = useState(false);
  const isLiked = message.liked;
  const isDisliked = message.liked === false;

  const handleLike = () => onLikeDislike(true);
  const handleDislike = () => onLikeDislike(false);

  return (
    <div
      className={`message-bubble ${isUser ? 'user-bubble' : 'ai-bubble'}`}
      onMouseEnter={() => !isUser && setShowFeedback(true)}
      onMouseLeave={() => !isUser && setShowFeedback(false)}
    >
     <div class="message-content">
  <span class="ai-name">Soul AI</span>
  <p class="message-text">
    RESTful APIs are designed around the REST (Representational State Transfer) architecture, 
    which uses HTTP requests to access and manipulate data. 
    They follow a stateless, client-server, cacheable communications protocol.
  </p>
</div>

      {!isUser && (
        <div className={`feedback-buttons ${showFeedback ? 'visible' : ''}`}>
          <button
            className={`feedback-button ${isLiked ? 'active' : ''}`}
            onClick={handleLike}
            aria-label="like"
          >
            👍
          </button>
          <button
            className={`feedback-button ${isDisliked ? 'active' : ''}`}
            onClick={handleDislike}
            aria-label="dislike"
          >
            👎
          </button>
        </div>
      )}
    </div>
  );
};

export default Message;