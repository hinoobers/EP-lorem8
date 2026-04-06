import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../assets/Sidebar.webp';
import Check_circle from '../../assets/Check_circle.webp';
import File_text from '../../assets/File_text.webp';
import Archive from '../../assets/Archive.webp';
import Settings from '../../assets/Settings.webp';
import Headphones from '../../assets/Headphones.webp';
import Award from '../../assets/Award.webp';
import Mail from '../../assets/Mail.webp';
import Bell from '../../assets/Bell.webp';
import Edit from '../../assets/Edit.webp';
import Share from '../../assets/Share.webp';
import Share1 from '../../assets/Share1.webp';
import ChevronDown from '../../assets/Chevron_down.webp';
import Menu from '../../assets/Menu.webp';
import Arrow_right from '../../assets/Arrow_right.webp';
import leen_muster from '../../assets/LEEN_muster_1_1.webp';
import sun from '../../assets/Sun.webp';
import moon from '../../assets/Moon.webp';
import './HomePage.css';

function HomePage() {
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
                <img
                  src={Check_circle}
                  alt=""
                  className="home-nav-icon-img"
                  aria-hidden="true"
                />
                <span className="home-nav-label">Töölaud</span>
              </button>
              <button type="button" className="home-nav-item">
                <img
                  src={File_text}
                  alt=""
                  className="home-nav-icon-img"
                  aria-hidden="true"
                />
                <span className="home-nav-label">Pass</span>
              </button>
              <button type="button" className="home-nav-item">
                <img
                  src={Archive}
                  alt=""
                  className="home-nav-icon-img"
                  aria-hidden="true"
                />
                <span className="home-nav-label">Kogemused</span>
              </button>
            </nav>

            <div className="home-sidebar-spacer" />

            <div className="home-sidebar-bottom">
              <button type="button" className="home-sidebar-link">
                <img
                  src={Settings}
                  alt=""
                  className="home-sidebar-icon-img"
                  aria-hidden="true"
                />
                <span>Settings</span>
              </button>
              <button type="button" className="home-sidebar-link">
                <img
                  src={Headphones}
                  alt=""
                  className="home-sidebar-icon-img"
                  aria-hidden="true"
                />
                <span>Support</span>
              </button>

              <div className="home-user-card">
                <div className="home-user-avatar" aria-hidden="true" />
                <div className="home-user-text">
                  <div className="home-user-name">Karoliine Tamm</div>
                  <div className="home-user-email">KaroliineT@gmail.com</div>
                </div>
                <span className="home-user-chevron" aria-hidden="true">
                  ›
                </span>
              </div>

              <div className="home-theme-toggle" aria-label="Välimuse valik">
                <button type="button" className="home-theme-pill home-theme-pill--active">
                  <span className="home-theme-icon" aria-hidden="true">
                    <img src={sun} alt="" />
                  </span>
                  <span>Light</span>
                </button>
                <button type="button" className="home-theme-pill home-theme-pill--muted">
                  <span className="home-theme-icon" aria-hidden="true">
                    <img src={moon} alt="" />
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
              <span className="home-search-icon" aria-hidden="true" />
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

          <section className="home-actions-row" aria-label="Kiirtoimingud">
            <button type="button" className="home-primary-cta">
              Lisa uus kogemus
            </button>
            <button type="button" className="home-secondary-cta">
              Muuda passi
            </button>
            <button type="button" className="home-secondary-cta home-secondary-cta--with-icon">
              <span>Jaga passi</span>
              <span className="home-share-icon" aria-hidden="true">
                <img src={Share} alt="" className="home-share-icon-img" />
              </span>
            </button>
          </section>

          <section className="home-content-row">
            <div className="home-column home-column--main">
              <section className="home-section">
                <h2 className="home-section-title">Statistika</h2>

                <div className="home-stats-row">
                  <div className="home-stat-card home-stat-card--pink">
                    <div className="home-stat-header">
                      <div className="home-stat-icon-circle">
                        <img
                          src={Award}
                          alt=""
                          className="home-stat-icon-img"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="home-stat-value">0</div>
                    </div>
                    <div className="home-stat-label">Kogemust kokku</div>
                  </div>

                  <div className="home-stat-card home-stat-card--cyan">
                    <div className="home-stat-header">
                      <div className="home-stat-icon-circle">
                        <img
                        src={Award}
                          alt=""
                          className="home-stat-icon-img"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="home-stat-value">+0</div>
                    </div>
                    <div className="home-stat-label">Uut kogemust sel kuul</div>
                  </div>
                </div>
              </section>

              <section className="home-section home-pass-card" aria-label="Pass">
                <header className="home-pass-header">
                  <h2 className="home-pass-title">Pass</h2>
                  <div className="home-pass-header-actions">
                    <button
                      type="button"
                      className="home-pass-icon-button"
                      aria-label="Redigeeri passi"
                    >
                      <img src={Edit} alt="" className="home-pass-icon-img" />
                    </button>
                    <button
                      type="button"
                      className="home-pass-icon-button"
                      aria-label="Jaga passi"
                    >
                      <img src={Share1} alt="" className="home-pass-icon-img" />
                    </button>
                  </div>
                </header>

                <div className="home-pass-divider" />

                <div className="home-pass-body">
                  <p>Pass on tühi</p>
                </div>

                <div className="home-pass-footer">
                  <button type="button" className="home-pill-button">
                    Detailne vaade
                  </button>
                </div>
              </section>
            </div>

            <div className="home-column home-column--side">
              <section className="home-section home-experiences-card" aria-label="Kogemused">
                <header className="home-experiences-header">
                  <h2 className="home-experiences-title">Kogemused</h2>
                  <div className="home-chip-group">
                    <button type="button" className="home-chip">
                      Sorteeri
                      <img
                        src={ChevronDown}
                        alt=""
                        className="home-chip-icon-img"
                        aria-hidden="true"
                      />
                    </button>
                    <button type="button" className="home-chip">
                      Filtreeri
                      <img
                        src={Menu}
                        alt=""
                        className="home-chip-icon-img"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </header>

                <div className="home-experiences-divider" />

                <p className="home-empty-label">Kogemused puuduvad</p>
              </section>

              <section className="home-section home-welcome-card" aria-label="Tere tulemast">
                <img
                  src={leen_muster}
                  alt=""
                  className="home-welcome-bg"
                  aria-hidden="true"
                />
                <div className="home-welcome-content">
                  <h2 className="home-welcome-heading">Tere tulemast!</h2>
                  <p className="home-welcome-text">
                    Sinu pass ootab! Täida see ja näita oma arengut.
                  </p>
                  <button type="button" className="home-welcome-button" onClick={() => navigate('/pass')}>
                    Passi täitma
                    <img src={Arrow_right} alt="" className="home-welcome-button-img" />
                  </button> 
                </div>
              </section>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default HomePage;
