import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Vite uses .jsx
import './styles/main.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)