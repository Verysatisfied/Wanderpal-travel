import React, { useState, useRef, useEffect } from "react";
import "../../src/assets/wrappers/Chat.css"; // 确保创建一个CSS文件并导入

const ChatComponent = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const sendMessage = () => {
    if (!message.trim()) return;
    setMessages([...messages, { text: message, timestamp: new Date() }]);
    setMessage("");
  };

  // 滚动到最新消息
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-container">
      <h1>Group chat</h1>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className="chat-message">
            {msg.text}
            <div className="chat-timestamp">
              {msg.timestamp.toLocaleTimeString()}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-input">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage} className="btn  submit-btn">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;
