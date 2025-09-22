import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import ChatPage from './components/chatPage';
import HistoryPage from './components/historyPage';
import './App.css';
import sampleData from './data/sampleData.json';

function App() {
  const [conversations, setConversations] = useState(() => {
    const saved = JSON.parse(localStorage.getItem('pastConversations')) || [];
    return saved;
  });
  const [currentChat, setCurrentChat] = useState([]);

  // ✅ Auto-save currentChat into localStorage
  useEffect(() => {
    if (currentChat.length > 0) {
      const draftConversation = {
        id: Date.now(),
        messages: currentChat,
        feedback: null,
      };

      // Merge with existing conversations
      const updatedConversations = [...conversations.slice(0, -1), draftConversation];
      setConversations(updatedConversations);
      localStorage.setItem('pastConversations', JSON.stringify(updatedConversations));
    }
  }, [currentChat]);

  const saveConversation = (chat, rating = null, feedback = '') => {
    if (chat.length > 0) {
      const newConversation = {
        id: Date.now(),
        messages: chat,
        feedback: { rating, subjective: feedback },
      };
      const updatedConversations = [...conversations, newConversation];
      setConversations(updatedConversations);
      localStorage.setItem('pastConversations', JSON.stringify(updatedConversations));
      setCurrentChat([]);
    }
  };

  const getConversationById = (id) => {
    return conversations.find((conv) => conv.id === parseInt(id));
  };

  return (
    <Router>
      <div className="app-container">
        <Header />
        <div className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <ChatPage
                  aiResponses={sampleData}
                  onSave={saveConversation}
                  currentChat={currentChat}
                  setCurrentChat={setCurrentChat}
                />
              }
            />
            <Route
              path="/history"
              element={
                <HistoryPage
                  conversations={conversations}
                  getConversationById={getConversationById}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
