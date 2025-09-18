import React from 'react';

const Message = ({ role, content }) => {
  const isUser = role === 'user';
  return (
    <div className={`message ${isUser ? 'user-message' : 'bot-message'}`}>
      <div className="message-bubble">{content}</div>
    </div>
  );
};

export default Message;