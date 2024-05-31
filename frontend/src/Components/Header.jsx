import { Link } from 'react-router-dom';


export default function Header({title}) {
    return (
        <div className="bg-blue-500 text-white p-4 flex justify-between items-center">
          <h1 className="text-lg font-bold">{title}</h1>
          <div>
            <Link to="/" className="mr-4">cerrar sesion</Link>
          </div>
        </div>
      );
}
