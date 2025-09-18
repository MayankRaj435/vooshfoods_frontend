import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import io from 'socket.io-client';
import ChatWindow from './components/chatWindow';
import InputBox from './components/InputBox';

// Vite uses import.meta.env for environment variables
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const socket = io(BACKEND_URL);

function App() {
  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const isStreaming = useRef(false);

  // Effect for session management
  useEffect(() => {
    let currentSessionId = localStorage.getItem('sessionId');
    if (!currentSessionId) {
      fetch(`${BACKEND_URL}/session`, { method: 'POST' })
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem('sessionId', data.sessionId);
          setSessionId(data.sessionId);
        });
    } else {
      setSessionId(currentSessionId);
    }
  }, []);

  // Effect for fetching history and setting up sockets
  useEffect(() => {
    if (!sessionId) return;

    // Fetch history
    fetch(`${BACKEND_URL}/history/${sessionId}`)
      .then((res) => res.json())
      .then((history) => setMessages(history));

    // Join socket session
    socket.emit('join_session', sessionId);

    const handleChunk = ({ chunk }) => {
      if (!isStreaming.current) {
        isStreaming.current = true;
        setMessages((prev) => [
          ...prev,
          { id: uuidv4(), role: 'bot', content: chunk },
        ]);
      } else {
        setMessages((prev) => {
          const newMessages = [...prev];
          const lastMessage = newMessages[newMessages.length - 1];
          lastMessage.content += chunk;
          return newMessages;
        });
      }
    };

    const handleStreamEnd = () => {
      isStreaming.current = false;
    };

    socket.on('bot_response_chunk', handleChunk);
    socket.on('bot_response_end', handleStreamEnd);

    return () => {
      socket.off('bot_response_chunk', handleChunk);
      socket.off('bot_response_end', handleStreamEnd);
    };
  }, [sessionId]);

  const handleSendMessage = (message) => {
    const userMessage = { id: uuidv4(), role: 'user', content: message };
    setMessages((prev) => [...prev, userMessage]);
    socket.emit('chat_message', { sessionId, message });
  };

  const handleResetSession = () => {
    localStorage.removeItem('sessionId');
    setMessages([]);
    window.location.reload();
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>News Chatbot</h1>
        <p>Powered by RAG & Gemini</p>
      </header>
      <ChatWindow messages={messages} />
      <InputBox onSendMessage={handleSendMessage} onReset={handleResetSession} />
    </div>
  );
}

export default App;