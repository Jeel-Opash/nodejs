import { useState, useEffect, useRef } from 'react';
import { socket } from './socket';
import './App.css';

function App() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onMessageUpdate(message: string) {
      setMessages(prev => [...prev, message]);
    }

    socket.on('message', onMessageUpdate);

    return () => {
      socket.off('message', onMessageUpdate);
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (input.trim()) {
      socket.emit('user-message', input);
      setInput('');
    }
  };

  return (
    <div className="chat-container">
      <h1>Chatting</h1>
      <div className="messages-box">
        {messages.map((msg, index) => (
          <p key={index} className="message">{msg}</p>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="input-group">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Enter Message"
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
