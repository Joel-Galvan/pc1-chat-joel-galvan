import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../Components/Header';

const socket = io('/');

export default function Chat() {

    const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userName = queryParams.get('name');

  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])


  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() !== '') {
      const newMessage = {
        body: message,
        from: userName // Envía el nombre del usuario junto con el mensaje
      };
      setMessages([...messages, newMessage]);
      socket.emit('message', { body: message, name: userName });
      setMessage('');
    }
  }

  useEffect(() => {
    socket.on('message', receiveMessage);

    return () => {
      socket.off('message', receiveMessage);
    }
  }, [])

  const receiveMessage = (message) =>
    setMessages((state) => [...state, message])

  return (
    <>
      <div className="flex flex-col h-screen bg-gray-100">
      <Header/>
        <div className="flex-grow p-4 overflow-auto">
          <ul className="space-y-2">
            {messages.map((message, i) => (
              <li key={i} className={`p-2 rounded-lg ${message.from === userName ? 'bg-blue-500 text-white self-end' : 'bg-gray-300 text-gray-800'}`}>
                <span className="font-bold">{message.from}:</span> {message.body}
              </li>
            ))}
          </ul>
        </div>
        <div className="p-4 bg-white border-t border-gray-200">
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <input
              type="text"
              placeholder="Escribe tu mensaje..."
              onChange={(e) => setMessage(e.target.value)}
              className="flex-grow p-2 border rounded-lg border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
            />
            <button className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Send</button>
          </form>
        </div>
      </div>
    </>
  );
}
