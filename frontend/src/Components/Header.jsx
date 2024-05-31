import { Link } from 'react-router-dom';
import { useState } from 'react';


export default function Header({title}) {
    const [darkMode, setDarkMode] = useState(false);

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
    onToggleDarkMode(!darkMode);
  };

    return (
        <div className={`bg-${darkMode ? 'gray-800' : 'blue-500'} text-white p-4 flex justify-between items-center`}>
      <h1 className="text-lg font-bold">{title}</h1>
      <div>
        <button onClick={handleToggleDarkMode} className="mr-4">Dark Mode</button>
        <Link to="/" className="mr-4">Cerrar Sesion</Link>

      </div>
    </div>
  );
}
