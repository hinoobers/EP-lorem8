import React from 'react';
import SidebarComponent from '../../components/sidebar/Sidebar';
import { useUser } from '../../hooks/useUser';
import Search from '../../assets/dark/Search.svg';
import Mail from '../../assets/dark/Mail.svg';
import Bell from '../../assets/dark/Bell.svg';
import '../HomePage/HomePageDark.css';
import './KogemuseLisamisPage.css';

function KogemuseLisamisPage() {
  const { user, loading, error } = useUser();
  const displayName = user ? `${user.displayName || ''}` : 'Kasutaja';
  const userEmail = user?.email || '';

  console.log('KogemuseLisamisPage - userPicture prop:', user?.pilt);

  return (
    <div className="kogemus-page">
      <div className="kogemus-layout">
        <SidebarComponent
          activeNav="experiences"
          userName={displayName}
          userEmail={userEmail}
          userPicture={user?.pilt}
        />

        <main className="kogemus-main">
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

          <div className="kogemus-content">
            <div className="kogemus-form-container">
              <h1 className="kogemus-form-title">Kogemuse lisamine</h1>
              <p className="kogemus-form-subtitle">*kohutuslikkud väljad</p>

              <form className="kogemus-form">
                <div className="kogemus-form-group">
                  <label className="kogemus-label">Kogemuse / kursuse nimetus*</label>
                  <input
                    type="text"
                    className="kogemus-input"
                    placeholder=""
                  />
                </div>

                <div className="kogemus-form-group">
                  <label className="kogemus-label">Organisatsiooni / kool / platvorm*</label>
                  <input
                    type="text"
                    className="kogemus-input"
                    placeholder=""
                  />
                </div>

                <div className="kogemus-form-row">
                  <div className="kogemus-form-group">
                    <label className="kogemus-label">Kogemuse tüüp*</label>
                    <select className="kogemus-select">
                      <option value="">Valige tüüp</option>
                      <option value="koolitus">Koolitus</option>
                      <option value="praktika">Praktika</option>
                      <option value="projekt">Projekt</option>
                    </select>
                  </div>

                  <div className="kogemus-form-group">
                    <label className="kogemus-label">Alguskuupäev*</label>
                    <input
                      type="text"
                      className="kogemus-input"
                      placeholder=""
                    />
                  </div>

                  <div className="kogemus-form-group">
                    <label className="kogemus-label">Ajakulu*</label>
                    <input
                      type="text"
                      className="kogemus-input"
                      placeholder=""
                    />
                  </div>
                </div>

                <div className="kogemus-form-group">
                  <label className="kogemus-label">Roll / amet / Õppsesuund</label>
                  <input
                    type="text"
                    className="kogemus-input"
                    placeholder="(nt praktikant, disainer, osaleja)"
                  />
                </div>

                <div className="kogemus-form-group">
                  <label className="kogemus-label">Mida sa tegid või õppisid?</label>
                  <textarea
                    className="kogemus-textarea"
                    placeholder="(Liinikreidus 2-4 lausega)"
                    rows={4}
                  />
                </div>

                <div className="kogemus-form-group">
                  <label className="kogemus-label">Milliseid oskusi kasutasid või arendasid?</label>
                  <div className="kogemus-skills">
                    <button type="button" className="kogemus-skill-btn">
                      <span>Oskus</span>
                    </button>
                    <button type="button" className="kogemus-skill-btn">
                      <span>Oskus</span>
                    </button>
                    <button type="button" className="kogemus-add-skill-btn">
                      <span className="kogemus-plus">+</span>
                    </button>
                  </div>
                </div>

                <button type="button" className="kogemus-certificate-btn">
                  Lisa sertifikaat failina
                </button>

                <div className="kogemus-form-actions">
                  <button type="button" className="kogemus-btn-cancel">
                    Tühista
                  </button>
                  <button type="button" className="kogemus-btn-save">
                    Salvesta
                  </button>
                </div>
              </form>
            </div>

            <div className="kogemus-right-panel">
              <div className="kogemus-course-card">
                <h3 className="kogemus-card-title">Complete Web & Mobile Designer: UI/UX, Figma, +more</h3>
                <p className="kogemus-card-source">Udemy</p>

                <div className="kogemus-card-tags">
                  <span className="kogemus-tag">Web Design</span>
                  <span className="kogemus-tag">UI/UX Design</span>
                  <span className="kogemus-tag">HTML</span>
                  <span className="kogemus-tag">CSS</span>
                  <span className="kogemus-tag">Figma</span>
                </div>

                <p className="kogemus-card-description">
                  Läbisin UI/UX ja veebidisaini kursuse, kus õppisin kasutajaksekset disaini, Figma prototüüpimist ning responsive veeb- ja mobiilsidisaini põhimõtteid.
                </p>

                <div className="kogemus-card-meta">
                  <span className="kogemus-card-date">23.03.2019</span>
                  <span className="kogemus-card-duration">28 Tundi</span>
                  <span className="kogemus-card-status">Osalesin</span>
                </div>

                <button type="button" className="kogemus-card-btn">
                  vaata sertifikaati
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default KogemuseLisamisPage;
