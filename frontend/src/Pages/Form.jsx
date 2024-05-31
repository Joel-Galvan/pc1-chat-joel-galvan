import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebaseConfig';
import { Link, useNavigate } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';

export default function Form() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      
      // Verificar si el usuario está autenticado
      const user = auth.currentUser;
      if (user) {
        // Recuperar el documento del usuario desde Firestore
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          // Obtener el nombre del usuario del documento
          const userName = userDoc.data().name;
          // Redirigir al usuario al chat con el nombre como parámetro
          navigate(`/chat?name=${encodeURIComponent(userName)}`);
        } else {
          console.error("Error logging in: User document does not exist");
        }
      } else {
        console.error("Error logging in: User is not authenticated");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form className="bg-white p-6 rounded shadow-md w-full max-w-sm" onSubmit={handleLogin}>
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Login</button>
        <Link to="/register" className="block text-center mt-2 text-blue-500">Registrarse</Link>
      </form>
    </div>
  )
}
