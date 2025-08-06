import { useState, useEffect } from "react";
import { io } from "socket.io-client";

function App() {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");

  const handleSendMessage = () => {
    const trimmed = inputText.trim();
    if (!trimmed || !socket) return;

    const userMessage = {
      id: Date.now(),
      text: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    socket.emit("ai-message", trimmed);
    setInputText("");
  };

  const handleInputChange = (e) => setInputText(e.target.value);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSendMessage();
  };

  useEffect(() => {
    const socketInstance = io("http://localhost:3000");

    setSocket(socketInstance);

    socketInstance.on("ai-message-response", (response) => {
      const botMessage = {
        id: Date.now() + 1,
        text: response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sender: "bot",
      };

      setMessages((prev) => [...prev, botMessage]);
    });

    // Cleanup socket connection on unmount
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto p-4 bg-gray-100 dark:bg-gray-900 shadow-lg">

      {/* Header */}
      <div className="text-center py-4 border-b border-gray-300 dark:border-gray-700">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Chat Interface
        </h1>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto py-4 space-y-3 scroll-mb-0 ">
        {messages.length === 0 ? (
          <div className="flex justify-center items-center h-full text-gray-500 dark:text-gray-400">
            <img src="https://imgs.search.brave.com/vbv4YTVPsRLUKHFmRzCbN4gPDMwT7lXnqCND3im7VLc/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/ZnJlZXBuZ2xvZ29z/LmNvbS91cGxvYWRz/L2dvb2dsZS1sb2dv/LXBuZy9nb29nbGUt/bG9nby1wbmctc3Vp/dGUtZXZlcnl0aGlu/Zy15b3UtbmVlZC1r/bm93LWFib3V0LWdv/b2dsZS1uZXdlc3Qt/MC5wbmc" alt="" className="opacity-5" />
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs sm:max-w-sm md:max-w-md px-4 py-2 rounded-lg shadow 
                ${message.sender === "user"
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-white text-gray-900 rounded-bl-none dark:bg-gray-800 dark:text-gray-100"
                  }`}
              >
                <span className="text-sm">{message.text}</span>
                <span className="text-xs opacity-70 block mt-1 text-right">
                  {message.timestamp}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 border-t border-gray-300 dark:border-gray-700 pt-3">
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={inputText.trim() === ""}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
