import React from 'react';
import AdminSidebar from '../../component/AdminSidebar';

const AdminLayout = ({ children }) => {
  return (
    <div
      className="flex bg-[#F7F4EF] min-h-screen"
      style={{ fontFamily: "'Josefin Sans', sans-serif" }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,400&family=Josefin+Sans:wght@300;400&display=swap"
        rel="stylesheet"
      />

      {/* ── Sidebar ── */}
      <AdminSidebar />

      {/* ── Main Content ── */}
      <main className="flex-1 bg-[#F7F4EF] p-8 md:p-12 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;