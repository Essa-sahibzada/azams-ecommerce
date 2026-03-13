import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const AdminSidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: '▦' },
    { name: 'Products', path: '/admin/productlist', icon: '◈' },
    { name: 'Add Product', path: '/admin/product/create', icon: '+' },
    { name: 'Orders', path: '/admin/orderlist', icon: '◇' },
  ];

  return (
    <div
      className="w-60 bg-[#1A1A18] min-h-screen p-8 hidden md:flex flex-col justify-between shrink-0"
      style={{ fontFamily: "'Josefin Sans', sans-serif" }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,400&family=Josefin+Sans:wght@300;400&display=swap"
        rel="stylesheet"
      />

      <div>
        {/* ── Logo ── */}
        <div className="mb-12">
          <p
            className="text-[20px] tracking-[6px] font-semibold text-white mb-1"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            AZAMS
          </p>
          <p className="text-[8px] tracking-[4px] uppercase text-[#C9A96E]">Admin Portal</p>
        </div>

        {/* ── Nav Links ── */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 text-[9px] tracking-[3px] uppercase transition-all duration-200 ${
                  active
                    ? 'bg-[#C9A96E] text-[#1A1A18]'
                    : 'text-gray-500 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="text-[11px]">{item.icon}</span>
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* ── Bottom ── */}
      <div className="border-t border-white/10 pt-6">
        <Link
          to="/"
          className="flex items-center gap-2 text-[8px] tracking-[3px] uppercase text-gray-600 hover:text-[#C9A96E] transition-colors"
        >
          ← Back to Site
        </Link>
      </div>
    </div>
  );
};

export default AdminSidebar;