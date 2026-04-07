import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarComponent from '../../components/sidebar/Sidebar';
import Mail from '../../assets/dark/Mail.svg';
import Bell from '../../assets/dark/Bell.svg';
import Edit from '../../assets/dark/Edit.svg';
import Share1 from '../../assets/dark/Share.svg';
import Share from '../../assets/Share.webp';
import Oskused from '../../assets/dark/Box.svg';
import Plus from '../../assets/dark/Plus.svg';
import Search from '../../assets/dark/Search.svg';
import ArrowRight from '../../assets/dark/Arrow right.svg';
import Briefcase from '../../assets/dark/Bar chart-2.svg';
import Bookmark from '../../assets/dark/Book.svg';
import Package from '../../assets/dark/Package.svg';
import { useUser } from '../../hooks/useUser';
import './HomePageDark.css';

function HomePageDark() {
  const navigate = useNavigate();
  const { user, loading, error } = useUser();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token && !loading) {
      navigate('/login');
    }
  }, [navigate, loading]);

  const displayName = user?.displayName || 'Kasutaja';
  const userEmail = user?.email || '';

  return (
    <div className="home-page">
      <div className="home-layout">
        <SidebarComponent 
          activeNav="dashboard" 
          userName={displayName}
          userEmail={userEmail}
          userPicture={user?.pilt}
        />



        <main className="home-main">
          <header className="home-header">
            <div className="home-header-name">{displayName}</div>

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
            <button type="button" className="home-action-btn" onClick={() => navigate('/kogemuse-lisamine')}>
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
