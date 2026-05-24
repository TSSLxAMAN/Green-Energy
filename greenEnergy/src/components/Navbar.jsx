import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../assets/logo.png';
import BoltIcon from '@mui/icons-material/Bolt';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav
      style={{
        background: '#ffffff',
        borderBottom: '1px solid rgba(5, 150, 105, 0.15)',
        boxShadow: '0 1px 12px rgba(5, 150, 105, 0.08)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      <div className="max-w-7xl mx-auto px-5 py-3 flex justify-between items-center">

        {/* ── Brand ── */}
        <div className="flex items-center gap-3">
          {/* Logo image */}
          <div
            className="flex items-center justify-center rounded-lg ml-1"
            style={{
              width: '30px',
              height: '30px',
              background: 'linear-gradient(135deg, #fef08a, #facc15)',
              boxShadow: '0 0 10px rgba(250,204,21,0.5)',
              flexShrink: 0,
            }}
          >
            <BoltIcon sx={{ fontSize: 18, color: '#78350f' }} />
          </div>

          {/* Brand text */}
          <div className="leading-none">
            <p className="text-base font-bold tracking-wide" style={{ color: '#059669' }}>
              Green Energy
            </p>
            <p className="text-xs" style={{ color: '#9ca3af' }}>
              Solar Calculator
            </p>
          </div>

          {/* Electricity bolt badge */}
          <div

          >

          </div>
        </div>

        {/* ── Desktop links ── */}
        <div className="hidden md:flex items-center gap-1">
          {[
            { to: '/', label: 'Home' },
            { to: '/fav', label: '★ Favourites' },
          ].map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              style={({ isActive }) => ({
                padding: '7px 16px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 500,
                transition: 'all 0.2s',
                background: isActive ? 'rgba(5,150,105,0.08)' : 'transparent',
                color: isActive ? '#059669' : '#374151',
                border: isActive ? '1px solid rgba(5,150,105,0.25)' : '1px solid transparent',
              })}
              className="hover:bg-green-50"
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* ── Mobile toggle ── */}
        <button
          className="md:hidden focus:outline-none"
          style={{ color: '#059669' }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* ── Mobile menu ── */}
      {isMenuOpen && (
        <div
          className="md:hidden px-5 pb-4 flex flex-col gap-2"
          style={{ borderTop: '1px solid rgba(5,150,105,0.1)' }}
        >
          {[
            { to: '/', label: 'Home' },
            { to: '/fav', label: '★ Favourites' },
          ].map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              style={({ isActive }) => ({
                padding: '10px 14px',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: 500,
                background: isActive ? 'rgba(5,150,105,0.08)' : '#f9fafb',
                color: isActive ? '#059669' : '#374151',
                border: '1px solid rgba(5,150,105,0.12)',
              })}
              onClick={() => setIsMenuOpen(false)}
            >
              {label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
