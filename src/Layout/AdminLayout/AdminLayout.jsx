import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import styles from './AdminLayout.module.css';

const AdminLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={styles.layout}>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <main className={`${styles.content} ${isSidebarOpen ? styles.contentShift : ''}`}>
        <Outlet /> {/* O conteúdo da página será renderizado aqui */}
      </main>
    </div>
  );
};

export default AdminLayout;