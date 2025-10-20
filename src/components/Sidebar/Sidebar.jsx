import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaTachometerAlt, FaBoxOpen, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import { logout } from '../../services/authService';
import styles from './Sidebar.module.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <nav className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
      <div className={styles.sidebarHeader}>
        {isOpen && <h1 className={styles.logo}>InclusiArte</h1>}
        <button onClick={toggleSidebar} className={styles.toggleButton}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <ul className={styles.navList}>
        <li>
          <NavLink to="/admin" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink} end>
            <FaTachometerAlt size={20} className={styles.icon} />
            <span className={styles.linkText}>Artesãos</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/pecas" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
            <FaBoxOpen size={20} className={styles.icon} />
            <span className={styles.linkText}>Peças</span>
          </NavLink>
        </li>
      </ul>

      <div className={styles.sidebarFooter}>
        <button onClick={handleLogout} className={styles.navLink}>
          <FaSignOutAlt size={20} className={styles.icon} />
          <span className={styles.linkText}>Sair</span>
        </button>
      </div>
    </nav>
  );
};

export default Sidebar;