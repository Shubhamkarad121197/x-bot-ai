import React, { useState } from 'react';

const FeedbackModal = ({ onSubmit, onCancel }) => {
  const [rating, setRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');

  const handleStarClick = (starIndex) => {
    setRating(starIndex + 1);
  };

  const handleSubmit = () => {
    onSubmit(rating, feedbackText);
  };

  return (
    <div className="modal-overlay">
      <div className="feedback-modal">
        <h3>Provide Additional Feedback</h3>
        <div className="star-rating">
          {[...Array(5)].map((_, index) => (
            <span
              key={index}
              className={`star ${index < rating ? 'filled' : ''}`}
              onClick={() => handleStarClick(index)}
            >
              ★
            </span>
          ))}
        </div>
        <textarea
          placeholder="Enter your feedback here..."
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
        ></textarea>
        <div className="modal-actions">
          <button onClick={onCancel} className="cancel-button">Cancel</button>
          <button onClick={handleSubmit} className="submit-button">Submit</button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;