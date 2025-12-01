import { useState, useEffect, useRef } from "react";

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

  // Assign unique user ID
  useEffect(() => {
    if (!sessionStorage.getItem("lunaxUserId")) {
      sessionStorage.setItem("lunaxUserId", crypto.randomUUID());
    }
  }, []);

  // Auto scroll
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
        { sender: "bot", text: "Sorry, connection error. Try again." },
      ]);
    }
  };

  return (
    <>
    

      <div className="chatbot-wrapper">
        {/* CHAT WINDOW */}
        {showChat && (
          <div className="chatbot-window">
            <div className="chatbot-header">
              <div className="chatbot-header-info">
                <img 
                  src="/lunax.svg" 
                  alt="Lunax" 
                  className="chatbot-avatar"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='50' cy='50' r='45' fill='%23007bff'/%3E%3Ccircle cx='35' cy='40' r='5' fill='white'/%3E%3Ccircle cx='65' cy='40' r='5' fill='white'/%3E%3Cpath d='M 30 60 Q 50 75 70 60' stroke='white' stroke-width='3' fill='none' stroke-linecap='round'/%3E%3C/svg%3E";
                  }}
                />
                <div className="chatbot-header-text">
                  <h3>Lunax</h3>
                  <p>Your Healthcare Companion</p>
                </div>
              </div>
              <button 
                className="chatbot-header-close" 
                onClick={() => setShowChat(false)}
                aria-label="Close chat"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="chatbot-messages">
              {messages.map((msg, i) => (
                <div key={i} className={`message ${msg.sender === "user" ? "user" : "bot"}`}>
                  <div className="bubble" dangerouslySetInnerHTML={{ __html: msg.text }} />
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

        {/* FAB BUTTON */}
        <button
          className="chatbot-fab"
          onClick={() => setShowChat(!showChat)}
          aria-label={showChat ? "Close chat" : "Open chat"}
        >
          {showChat ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="pulse-icon" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
            </svg>
          )}
        </button>
      </div>
    </>
  );
}

export default Chatbot;