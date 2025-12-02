import { useState, useEffect, useRef } from "react";
import { MdClose } from "react-icons/md";
import { FaComments } from "react-icons/fa";
import "../components/components-css/Chatbot.css";

function Chatbot() {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi! I'm <strong>Lunax</strong> — your Healthcare Companion. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Assign unique user ID per session
  useEffect(() => {
    let userId = sessionStorage.getItem("lunaxUserId");
    if (!userId) {
      userId = crypto.randomUUID();
      sessionStorage.setItem("lunaxUserId", userId);
    }
  }, []);

  // Auto-scroll on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userText = input.trim();
    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("http://localhost:5000/api/chatbot-groq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userText,
          userId: sessionStorage.getItem("lunaxUserId"),
        }),
      });

      const data = await res.json();
      setIsTyping(false);

      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: data.reply || "I'm here to help!" },
      ]);
    } catch (err) {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "❌ Sorry, connection error. Try again." },
      ]);
    }
  };

  return (
    <div className="chatbot-wrapper">
      {/* Chat Window */}
      {showChat && (
        <div className="chatbot-window">
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <img src="/lunax.svg" alt="Lunax" className="chatbot-avatar" />
              <div className="chatbot-header-text">
                <h3>Lunax</h3>
                <p>Your Healthcare Companion</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${msg.sender === "user" ? "user" : "bot"}`}
              >
                <div
                  className="bubble"
                  dangerouslySetInnerHTML={{ __html: msg.text }}
                />
              </div>
            ))}

            {isTyping && (
              <div className="message bot">
                <div className="bubble typing">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <div className="chatbot-input-bar">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
              placeholder="Type your message..."
            />
            <button onClick={handleSend} disabled={!input.trim()}>
              Send
            </button>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        className="chatbot-fab"
        onClick={() => setShowChat(!showChat)}
        aria-label={showChat ? "Close chat" : "Open chat"}
      >
        {showChat ? (
          <MdClose size={24} color="#fff" />
        ) : (
          <FaComments className="pulse-icon" size={24} color="#fff" />
        )}
      </button>
    </div>
  );
}

export default Chatbot;
