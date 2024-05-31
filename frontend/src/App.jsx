import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Form from './Pages/Form';
import Chat from './Pages/Chat';
import Register from './Pages/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;