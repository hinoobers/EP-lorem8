import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../assets/dark/Sidebar.svg';
import Check_circle from '../../assets/dark/Check_circle.svg';
import File_text from '../../assets/dark/File_text.svg';
import Oskused from '../../assets/dark/Box.svg';
import Archive from '../../assets/dark/Archive.svg';
import Settings from '../../assets/dark/Settings.svg';
import Headphones from '../../assets/dark/Headphones.svg';
import Mail from '../../assets/dark/Mail.svg';
import Bell from '../../assets/dark/Bell.svg';
import Edit from '../../assets/dark/Edit.svg';
import Share1 from '../../assets/dark/Share.svg';
import Share from '../../assets/Share.webp';
import Plus from '../../assets/dark/Plus.svg';
import Search from '../../assets/dark/Search.svg';
import Sun from '../../assets/dark/Sun.svg';
import Moon from '../../assets/dark/Moon.svg';
import ArrowRight from '../../assets/dark/Arrow right.svg';
import Briefcase from '../../assets/dark/Bar chart-2.svg';
import Bookmark from '../../assets/dark/Book.svg';
import ChevronRight from '../../assets/dark/Chevron right.svg';
import Package from '../../assets/dark/Package.svg';
import './HomePageDark.css';

function HomePageDark() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  return (
    <div
      className={`home-page ${
        isSidebarOpen ? 'home-page--sidebar-open' : 'home-page--sidebar-closed'
      }`}
    >
      <div className="home-layout">
        {isSidebarOpen && (
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
                  <img src={Sidebar} alt="" />
                </button>
              </div>
            </div>

            <div className="home-sidebar-section-label">Ülevaade</div>

            <nav className="home-nav" aria-label="Põhinavigatsioon">
              <button type="button" className="home-nav-item home-nav-item--active">
                <img src={Check_circle} alt="" className="home-nav-icon-img" aria-hidden="true" />
                <span className="home-nav-label">Töölaud</span>
              </button>
              <button type="button" className="home-nav-item">
                <img src={File_text} alt="" className="home-nav-icon-img" aria-hidden="true" />
                <span className="home-nav-label">Pass</span>
              </button>
              <button type="button" className="home-nav-item">
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
              <button type="button" className="home-sidebar-link" onClick={() => navigate('/support')}>
                <img src={Headphones} alt="" className="home-sidebar-icon-img" aria-hidden="true" />
                <span>Support</span>
              </button>

              <div className="home-user-card">
                <div className="home-user-avatar" aria-hidden="true" />
                <div className="home-user-text">
                  <div className="home-user-name">Karoliine Tamm</div>
                  <div className="home-user-email">KaroliineT@gmail.com</div>
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
        )}

        {!isSidebarOpen && (
          <button
            type="button"
            className="home-sidebar-toggle-floating"
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Ava külgriba"
          >
            <img src={Sidebar} alt="" />
          </button>
        )}

        <main className="home-main">
          <header className="home-header">
            <div className="home-header-name">Karoliine Tamm</div>

            <div className="home-search" role="search">
              <img src={Search} alt="" className="home-search-icon-img" aria-hidden="true" />
              <input
                type="search"
                className="home-search-input"
                placeholder="Otsi"
                aria-label="Otsi"
              />
            </div>

            <div className="home-header-icons">
              <button type="button" className="home-icon-button" aria-label="Ava postkast">
                <img src={Mail} alt="" className="home-icon-img" aria-hidden="true" />
              </button>
              <button type="button" className="home-icon-button" aria-label="Teavitused">
                <img src={Bell} alt="" className="home-icon-img" aria-hidden="true" />
              </button>
            </div>
          </header>

          <div className="home-header-divider" />

          <div className="home-actions-bar" aria-label="Kiirtoimingud">
            <button type="button" className="home-action-btn">
              <span>Lisa kogemus</span>
              <img src={Plus} alt="" className="home-action-icon" aria-hidden="true" />
            </button>
            <div className="home-actions-divider" aria-hidden="true" />
            <button type="button" className="home-action-btn">
              Muuda passi
            </button>
            <div className="home-actions-divider" aria-hidden="true" />
            <button type="button" className="home-action-btn">
              <span>Jaga passi</span>
              <img src={Share} alt="" className="home-action-icon" aria-hidden="true" />
            </button>
          </div>

          <section className="home-content-row">
            {/* Left column */}
            <div className="home-column home-column--main">

              {/* Welcome card */}
              <section className="home-welcome-card" aria-label="Tere tulemast">
                {/* Decorative Package icons matching Figma positions */}
                <img src={Package} alt="" aria-hidden="true" className="home-welcome-pkg home-welcome-pkg--tl" />
                <img src={Package} alt="" aria-hidden="true" className="home-welcome-pkg home-welcome-pkg--tr" />
                <img src={Package} alt="" aria-hidden="true" className="home-welcome-pkg home-welcome-pkg--bl" />
                <img src={Package} alt="" aria-hidden="true" className="home-welcome-pkg home-welcome-pkg--br" />

                <div className="home-welcome-content">
                  <h2 className="home-welcome-heading">Tere tulemast!</h2>
                  <p className="home-welcome-text">
                    Sinu pass ootab!{' '}
                    Täida see ja näita oma arengut.
                  </p>
                  <button
                    type="button"
                    className="home-welcome-button"
                    onClick={() => navigate('/pass')}
                  >
                    Passi täitma
                    <img src={ArrowRight} alt="" className="home-welcome-button-img" />
                  </button>
                </div>
              </section>

              {/* Two mini stat cards */}
              <div className="home-mini-cards-row">
                <section className="home-mini-card" aria-label="Kogemuste staatus">
                  <div className="home-mini-card-header">
                    <span className="home-mini-card-title">Kogemuste staatus</span>
                  </div>
                  <div className="home-mini-card-divider" />
                  <p className="home-mini-card-empty">Kogemused puuduvad</p>
                </section>

                <section className="home-mini-card" aria-label="Lisatud kogemused">
                  <div className="home-mini-card-header">
                    <span className="home-mini-card-title">Lisatud kogemused</span>
                    <button type="button" className="home-mini-card-plus" aria-label="Lisa kogemus">
                      <img src={Plus} alt="" className="home-mini-plus-img" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="home-mini-card-divider" />
                  <p className="home-mini-card-empty">Kogemused puuduvad</p>
                  <div className="home-mini-card-footer">
                    <button type="button" className="home-pill-button">
                      Detailne vaade
                    </button>
                  </div>
                </section>
              </div>
            </div>

            {/* Right column — Pass card */}
            <div className="home-column home-column--side">
              <section className="home-pass-card" aria-label="Pass">
                <div className="home-pass-top">
                  <span className="home-pass-title">Pass</span>
                </div>
                <div className="home-pass-divider" />

                <div className="home-pass-section">
                  <div className="home-pass-section-row">
                    <div className="home-pass-section-icon">
                      <img src={Briefcase} alt="" className="home-pass-section-icon-img" aria-hidden="true" />
                    </div>
                    <div className="home-pass-section-info">
                      <span className="home-pass-section-title">Töökogemused</span>
                    </div>
                    <span className="home-pass-section-count">0 kogemust lisatud</span>
                  </div>
                </div>

                <div className="home-pass-section">
                  <div className="home-pass-section-row">
                    <div className="home-pass-section-icon">
                      <img src={Bookmark} alt="" className="home-pass-section-icon-img" aria-hidden="true" />
                    </div>
                    <div className="home-pass-section-info">
                      <span className="home-pass-section-title">Õppekäik</span>
                    </div>
                    <span className="home-pass-section-count">0 kogemust lisatud</span>
                  </div>
                </div>

                <div className="home-pass-section">
                  <div className="home-pass-section-row">
                    <div className="home-pass-section-icon">
                      <img src={Oskused} alt="" className="home-pass-section-icon-img" aria-hidden="true" />
                    </div>
                    <div className="home-pass-section-info">
                      <span className="home-pass-section-title">Oskused ja kogemused</span>
                    </div>
                    <span className="home-pass-section-count">0 kogemust lisatud</span>
                  </div>
                </div>

                <div className="home-pass-footer">
                  <button type="button" className="home-pill-button">
                    Detailne vaade
                  </button>
                  <div className="home-pass-footer-icons">
                    <button type="button" className="home-pass-icon-button" aria-label="Redigeeri passi">
                      <img src={Edit} alt="" className="home-pass-icon-img" />
                    </button>
                    <button type="button" className="home-pass-icon-button" aria-label="Jaga passi">
                      <img src={Share1} alt="" className="home-pass-icon-img" />
                    </button>
                  </div>
                </div>
              </section>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default HomePageDark;
