import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarIcon from '../../assets/dark/Sidebar.svg';
import Check_circle from '../../assets/dark/Check_circle.svg';
import File_text from '../../assets/dark/File_text.svg';
import Archive from '../../assets/dark/Archive.svg';
import Settings from '../../assets/dark/Settings.svg';
import Headphones from '../../assets/dark/Headphones.svg';
import Sun from '../../assets/dark/Sun.svg';
import Moon from '../../assets/dark/Moon.svg';
import ChevronRight from '../../assets/dark/Chevron right.svg';
import './Sidebar.css';

interface SidebarProps {
  activeNav?: 'dashboard' | 'pass' | 'experiences';
  userName?: string;
  userEmail?: string;
  onNavigate?: (path: string) => void;
  isSidebarOpen?: boolean;
  setIsSidebarOpen?: (open: boolean) => void;
}

function Sidebar({
  activeNav = 'dashboard',
  userName = 'Karoliine Tamm',
  userEmail = 'KaroliineT@gmail.com',
  onNavigate,
  isSidebarOpen: propOpen,
  setIsSidebarOpen: propSetOpen,
}: SidebarProps) {
  const [internalOpen, setInternalOpen] = useState(true);
  const navigate = useNavigate();

  const isSidebarOpen = propOpen !== undefined ? propOpen : internalOpen;
  const setIsSidebarOpen = propSetOpen || setInternalOpen;

  const handleNavigate = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      navigate(path);
    }
  };

  if (!isSidebarOpen) {
    return (
      <button
        type="button"
        className="home-sidebar-toggle-floating"
        onClick={() => setIsSidebarOpen(true)}
        aria-label="Ava külgriba"
      >
        <img src={SidebarIcon} alt="" />
      </button>
    );
  }

  return (
    <aside className="home-sidebar">
      <div className="home-sidebar-header">
        <div className="home-logo-row">
          <div className="home-logo">Ettevõtlikkuse Pass</div>
          <button
            type="button"
            className="home-sidebar-toggle"
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Sulge külgriba"
          >
            <img src={SidebarIcon} alt="" />
          </button>
        </div>
      </div>

      <div className="home-sidebar-section-label">Ülevaade</div>

      <nav className="home-nav" aria-label="Põhinavigatsioon">
        <button
          type="button"
          className={`home-nav-item ${activeNav === 'dashboard' ? 'home-nav-item--active' : ''}`}
          onClick={() => handleNavigate('/home_dark')}
        >
          <img src={Check_circle} alt="" className="home-nav-icon-img" aria-hidden="true" />
          <span className="home-nav-label">Töölaud</span>
        </button>
        <button
          type="button"
          className={`home-nav-item ${activeNav === 'pass' ? 'home-nav-item--active' : ''}`}
          onClick={() => handleNavigate('/pass')}
        >
          <img src={File_text} alt="" className="home-nav-icon-img" aria-hidden="true" />
          <span className="home-nav-label">Pass</span>
        </button>
        <button
          type="button"
          className={`home-nav-item ${activeNav === 'experiences' ? 'home-nav-item--active' : ''}`}
          onClick={() => handleNavigate('/kogemuse-lisamine')}
        >
          <img src={Archive} alt="" className="home-nav-icon-img" aria-hidden="true" />
          <span className="home-nav-label">Kogemused</span>
        </button>
      </nav>

      <div className="home-sidebar-spacer" />

      <div className="home-sidebar-bottom">
        <button type="button" className="home-sidebar-link">
          <img src={Settings} alt="" className="home-sidebar-icon-img" aria-hidden="true" />
          <span>Settings</span>
        </button>
        <button type="button" className="home-sidebar-link" onClick={() => handleNavigate('/support')}>
          <img src={Headphones} alt="" className="home-sidebar-icon-img" aria-hidden="true" />
          <span>Support</span>
        </button>

        <div className="home-user-card">
          <div className="home-user-avatar" aria-hidden="true" />
          <div className="home-user-text">
            <div className="home-user-name">{userName}</div>
            <div className="home-user-email">{userEmail}</div>
          </div>
          <img src={ChevronRight} alt="" className="home-user-chevron-img" aria-hidden="true" />
        </div>

        <div className="home-theme-toggle" aria-label="Välimuse valik">
          <button type="button" className="home-theme-pill home-theme-pill--active">
            <span className="home-theme-icon" aria-hidden="true">
              <img src={Sun} alt="" />
            </span>
            <span>Light</span>
          </button>
          <button type="button" className="home-theme-pill home-theme-pill--muted">
            <span className="home-theme-icon" aria-hidden="true">
              <img src={Moon} alt="" />
            </span>
            <span>Dark</span>
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
