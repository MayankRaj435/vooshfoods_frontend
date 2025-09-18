# RAG News Chatbot - Frontend

This repository contains the frontend user interface for a Retrieval-Augmented Generation (RAG) chatbot. It is a modern, responsive single-page application built with React.

The frontend is responsible for:
- Providing a clean and intuitive chat interface.
- Managing user sessions via `localStorage`.
- Communicating with the backend in real-time using WebSockets.
- Displaying streaming responses from the AI chatbot.

---

## Final Tech Stack

| Component         | Technology                               | Justification                                                                                              |
| ----------------- | ---------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| **Framework**     | React (with Vite)                        | A modern, fast, and powerful library for building component-based user interfaces.                         |
| **Styling**       | SCSS                                     | A CSS preprocessor that allows for more organized and maintainable styles with variables and nesting.      |
| **Real-time Chat**| Socket.IO Client                         | The client-side library for establishing and managing the WebSocket connection with the backend server.    |
| **Deployment**    | Render.com                               | Offers a free and easy-to-use platform for deploying static sites with seamless GitHub integration.        |

---

## Project Setup & Running Locally

### Prerequisites
- Node.js (v20.19+ recommended)

### 1. Clone the Repository
```bash
git clone https://github.com/MayankRaj435/news-rag-chatbot-frontend.git
cd news-rag-chatbot-frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in the root of the project. This file tells the frontend where to find the backend server.
```ini
# .env

# URL of the running backend server
VITE_BACKEND_URL="http://localhost:3001"
```
**Note:** Vite requires environment variables to be prefixed with `VITE_`.

### 4. Start the Frontend Development Server
Make sure your backend server is running first.
```bash
npm run dev
```
The application will open in your browser, usually at `http://localhost:5173`.

---

## Key Features

- **Real-time Streaming:** Bot responses are displayed word-by-word as they are generated, providing an interactive and responsive user experience.
- **Session Persistence:** The chat history is saved per session. If you reload the page, your conversation is restored from the backend.
- **Session Reset:** A "Reset" button allows the user to clear the current session and start a new conversation.
- **Modern UI:** A clean, responsive, and visually appealing interface with a "frosted glass" design and a subtle background pattern.
