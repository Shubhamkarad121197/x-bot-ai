import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './components/header';
import ChatPage from './components/chatPage';
import HistoryPage from './components/historyPage';
import './App.css';
import sampleData from './data/sampleData.json';

function App() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState([]);

  useEffect(() => {
    const savedConversations = JSON.parse(localStorage.getItem('conversations')) || [];
    setConversations(savedConversations);
  }, []);

  const saveConversation = (chat, rating, feedback) => {
    if (chat.length > 0) {
      const newConversation = {
        id: Date.now(),
        messages: chat,
        feedback: { rating, subjective: feedback }
      };
      const updatedConversations = [...conversations, newConversation];
      setConversations(updatedConversations);
      localStorage.setItem('conversations', JSON.stringify(updatedConversations));
      setCurrentChat([]);
    }
  };

  const getConversationById = (id) => {
    return conversations.find(conv => conv.id === parseInt(id));
  };

  return (
    <Router>
      <div className="app-container">
        <Header />
        <div className="main-content">
          <Routes>
            <Route path="/" element={
              <ChatPage
                aiResponses={sampleData.aiResponses}
                onSave={saveConversation}
                currentChat={currentChat}
                setCurrentChat={setCurrentChat}
              />
            } />
            <Route path="/history" element={
              <HistoryPage
                conversations={conversations}
                getConversationById={getConversationById}
              />
            } />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;