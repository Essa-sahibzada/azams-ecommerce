import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Header = () => {
  const { cartItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const cartCount = cartItems?.reduce((acc, item) => acc + item.qty, 0) || 0;

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'New Arrivals', path: '/products' },
    { label: 'About', path: '/about' },
  ];

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,400&family=Josefin+Sans:wght@300;400&display=swap"
        rel="stylesheet"
      />

      <header
        className="bg-[#F7F4EF]/95 backdrop-blur-md border-b border-[#E2DDD5] sticky top-0 z-50"
        style={{ fontFamily: "'Josefin Sans', sans-serif" }}
      >
        <div className="container mx-auto px-6 lg:px-12 h-[68px] flex items-center justify-between">

          {/* ── Logo ── */}
          <Link
            to="/"
            className="text-[22px] tracking-[7px] font-semibold text-[#1A1A18] hover:text-[#C9A96E] transition-colors duration-300"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            AZAMS
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => {
              const active = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className="relative text-[9px] tracking-[3px] uppercase transition-colors duration-300 group"
                  style={{ color: active ? '#C9A96E' : '#8C8478' }}
                >
                  {link.label}
                  <span
                    className="absolute -bottom-1 left-0 h-px bg-[#C9A96E] transition-all duration-300 group-hover:w-full"
                    style={{ width: active ? '100%' : '0' }}
                  />
                </Link>
              );
            })}
          </nav>

          {/* ── Right Side ── */}
          <div className="flex items-center gap-6">
            <Link
              to="/login"
              className="hidden md:block text-[9px] tracking-[2.5px] uppercase text-[#8C8478] hover:text-[#1A1A18] transition-colors duration-300 border-r border-[#E2DDD5] pr-6"
            >
              Login
            </Link>

            <Link to="/cart" className="relative group flex items-center gap-1">
              <span className="text-[9px] tracking-[2.5px] uppercase text-[#1A1A18] group-hover:text-[#C9A96E] transition-colors duration-300">
                Bag
              </span>
              <span
                className="text-[9px] tracking-[1px] transition-colors duration-300"
                style={{ color: cartCount > 0 ? '#C9A96E' : '#8C8478' }}
              >
                ({cartCount})
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#C9A96E] transition-all duration-300 group-hover:w-full" />
            </Link>

            {/* ── Mobile Hamburger ── */}
            <button
              className="md:hidden flex flex-col gap-[5px]"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span className={`w-5 h-px bg-[#1A1A18] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
              <span className={`w-5 h-px bg-[#1A1A18] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-5 h-px bg-[#1A1A18] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
            </button>
          </div>
        </div>

        {/* ── Mobile Menu ── */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 bg-[#F7F4EF] border-t border-[#E2DDD5] ${
            menuOpen ? 'max-h-64 py-6' : 'max-h-0'
          }`}
        >
          <div className="flex flex-col items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className="text-[9px] tracking-[4px] uppercase text-[#8C8478] hover:text-[#C9A96E] transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="text-[9px] tracking-[4px] uppercase text-[#8C8478] hover:text-[#C9A96E] transition-colors"
            >
              Login
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;