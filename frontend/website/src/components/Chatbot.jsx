// src/components/Chatbot.jsx
import { useState, useEffect, useRef } from "react";
import { MdClose } from "react-icons/md";
import { FaComments } from "react-icons/fa";
import "../components/components-css/Chatbot.css";

function Chatbot() {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Hi! I'm Lunax — your Healthcare Companion." },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // Scrolls to bottom on message update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
  if (!input.trim()) return;

  const userText = input.trim();
  const userMsg = { sender: "user", text: userText };
  setMessages(prev => [...prev, userMsg]);

  setInput("");

  try {
    const response = await fetch("http://localhost:5000/api/chatbot-gemini", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: userText }),
  });

    const data = await response.json();

    setMessages(prev => [
      ...prev,
      { sender: "bot", text: data.reply }
    ]);
  } catch (error) {
    setMessages(prev => [
      ...prev,
      { sender: "bot", text: "❌ Error: Unable to reach Lunax server." }
    ]);
  }
};


  return (
    <div className="chatbot-container">
      {/* --- Popup Window --- */}
      {showChat && (
        <div className="chatbot-popup">
          <div className="chatbot-header">
            <div className="chatbot-info">
              <img
                src="lunax.svg"
                alt="Lunax"
                className="chatbot-avatar"
              />
              <div>
                <h5 className="mb-0">
                  Hi! I'm <span className="text-highlight">Lunax</span>
                </h5>
                <p className="mb-0 small text-white">
                  Your Healthcare Companion
                </p>
              </div>
            </div>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chat-message ${
                  msg.sender === "user" ? "user-msg" : "bot-msg"
                }`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend}>➤</button>
          </div>
        </div>
      )}

      {/* --- Floating Button --- */}
      <button
        className="chatbot-btn"
        onClick={() => setShowChat((prev) => !prev)}
      >
        {showChat ? <MdClose /> : <FaComments />}
      </button>
    </div>
  );
}

export default Chatbot;

