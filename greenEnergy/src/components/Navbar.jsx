import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../assets/logo.png'; // Update path as needed

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-green-700 p-4 flex justify-between items-center shadow-lg relative">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8">
          <img src={Logo} alt="logo" height={32} width={32} />
        </div>
        <h1 className="text-2xl font-bold tracking-wide text-white">Green Energy</h1>
      </div>

      <div className="hidden md:flex gap-6 ml-auto pe-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-5 py-2 rounded text-lg transition-all font-semibold ${isActive ? 'bg-green-900 text-white' : 'bg-green-800 hover:bg-green-900 text-white'}`
          }
        >
          Home
        </NavLink>
      </div>

      <div className="flex items-center md:hidden">
        <button
          className="text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full flex flex-col gap-4 p-4 bg-green-700 shadow-md md:hidden">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-5 py-3 rounded text-lg transition-all font-semibold ${isActive ? 'bg-green-900 text-white' : 'bg-green-800 hover:bg-green-900 text-white'}`
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;