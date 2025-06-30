import React from 'react';
import useDarkMode from '../hooks/useDarkMode';

interface NavbarProps {
  onArmarPuestos: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onArmarPuestos }) => {
  const [darkMode, setDarkMode] = useDarkMode();

  return (
    <nav className="w-full bg-gray-900 dark:bg-gray-800 text-white flex flex-col sm:flex-row items-center justify-between px-4 py-3 mb-8 shadow">
      <span className="text-lg font-bold tracking-wide">Servicio de Guardia</span>
      <div className="flex items-center gap-2 mt-2 sm:mt-0">
        <button
          onClick={onArmarPuestos}
          className="bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded text-white font-semibold"
        >
          Armar Puestos
        </button>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="ml-2 p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition"
          aria-label="Alternar modo oscuro"
        >
          {darkMode ? (
            // Icono de sol
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.07l-.71.71M21 12h-1M4 12H3m16.66 5.66l-.71-.71M4.05 4.93l-.71-.71M12 7a5 5 0 100 10 5 5 0 000-10z" /></svg>
          ) : (
            // Icono de luna
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" /></svg>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar; 