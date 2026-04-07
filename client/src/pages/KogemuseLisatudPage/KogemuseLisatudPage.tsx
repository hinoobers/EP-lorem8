import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SidebarComponent from '../../components/sidebar/Sidebar';
import { useUser } from '../../hooks/useUser';
import Search from '../../assets/dark/Search.svg';
import Mail from '../../assets/dark/Mail.svg';
import Bell from '../../assets/dark/Bell.svg';
import '../HomePage/HomePageDark.css';
import './KogemuseLisatudPage.css';

function KogemuseLisatudPage() {
  const navigate = useNavigate();
  const { experienceId } = useParams();
  const { user } = useUser();
  const displayName = user ? `${user.displayName || ''}` : 'Kasutaja';
  const userEmail = user?.email || '';
  const [verifierEmail, setVerifierEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleSendVerification = async () => {
    if (!verifierEmail || !experienceId) {
      setMessage('Palun sisestage kinnitaja e-mail');
      return;
    }

    setSending(true);
    setMessage('');

    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('https://evpass.pnglin.byenoob.com/api/verify-experience', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          experienceId,
          verifierEmail
        })
      });

      const result = await response.json();
      if (response.ok) {
        setMessage('Kinnitamispalve saadetud edukalt!');
        navigate('/kogemused');
      } else {
        setMessage(result.message || 'Viga kinnitamispalve saatmisel');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Viga: ' + error.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="kogemus-lisatud-page">
      <div className="kogemus-lisatud-layout">
        <SidebarComponent
          activeNav="experiences"
          userName={displayName}
          userEmail={userEmail}
          userPicture={user?.pilt}
        />

        <main className="kogemus-lisatud-main">
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

          <div className="kogemus-lisatud-content">
            <section className="kogemus-lisatud-card" aria-label="Kogemuse kinnitamine">
              <div className="kogemus-lisatud-card-top">
                <h1>Kogemuse kinnitamine</h1>
              </div>

              <div className="kogemus-lisatud-body">
                <h2>Kogemuse lisamine õnnestus!</h2>

                <div className="kogemus-lisatud-check" aria-hidden="true" />

                <p className="kogemus-lisatud-lead">Saada kogemus kinnitamiseks juhendajale.</p>

                <div className="kogemus-lisatud-field">
                  <label htmlFor="kinnitaja-email">Kinnitaja e-mail</label>
                  <input
                    id="kinnitaja-email"
                    type="email"
                    placeholder=""
                    autoComplete="email"
                    value={verifierEmail}
                    onChange={(e) => setVerifierEmail(e.target.value)}
                  />
                </div>
                {message && (
                  <div style={{
                    padding: '10px',
                    marginBottom: '20px',
                    backgroundColor: message.includes('edukalt') ? '#d4edda' : '#f8d7da',
                    color: message.includes('edukalt') ? '#155724' : '#721c24',
                    borderRadius: '4px'
                  }}>
                    {message}
                  </div>
                )}

                <p className="kogemus-lisatud-help">
                  Saadame kogemuse kinnitajale ülevaatamiseks. Pärast kinnitamist muutub kogemuse staatus märgiks
                  "kinnitatud".
                </p>
              </div>

              <div className="kogemus-lisatud-actions">
                <button type="button" className="kogemus-lisatud-btn kogemus-lisatud-btn--ghost" onClick={() => navigate('/kogemused')}>
                  Jäta vahele
                </button>
                <button 
                  type="button" 
                  className="kogemus-lisatud-btn kogemus-lisatud-btn--primary" 
                  onClick={handleSendVerification}
                  disabled={!verifierEmail || sending}
                >
                  {sending ? 'Saatmine...' : 'Saada'}
                </button>
              </div>
            </section>

            <aside className="kogemus-lisatud-side-panel">
              <div className="kogemus-lisatud-course-card">
                <h3 className="kogemus-lisatud-course-title">Complete Web & Mobile Designer: UI/UX, Figma, +more</h3>
                <p className="kogemus-lisatud-course-source">Udemy</p>

                <div className="kogemus-lisatud-course-tags">
                  <span>Web Design</span>
                  <span>UI/UX Design</span>
                  <span>HTML</span>
                  <span>CSS</span>
                  <span>Figma</span>
                </div>

                <p className="kogemus-lisatud-course-description">
                  Läbisin UI/UX ja veebidisaini kursuse, kus õppisin kasutajakeskset disaini, Figma prototüüpimist ning responsive veebi- ja mobiilidisaini põhimõtteid.
                </p>

                <div className="kogemus-lisatud-course-meta">
                  <span>23.03.2019</span>
                  <span>28 Tundi</span>
                  <span>Osalesin</span>
                </div>

                <button type="button" className="kogemus-lisatud-course-btn">
                  vaata sertifikaati
                </button>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}

export default KogemuseLisatudPage;
