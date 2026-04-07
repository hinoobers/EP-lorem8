import React, { useState, useEffect } from 'react';
import SidebarComponent from '../../../components/sidebar/Sidebar';
import { useUser } from '../../../hooks/useUser';
import Search from '../../../assets/dark/Search.svg';
import Mail from '../../../assets/dark/Mail.svg';
import Bell from '../../../assets/dark/Bell.svg';
import Plus from '../../../assets/dark/Plus.svg';
import { useNavigate } from 'react-router-dom';
import '../../HomePage/HomePageDark.css';
import './PassFrontPage.css';

type PassCard = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  tone: 'purple';
};

function PassFrontPage() {
  const navigate = useNavigate();
  const { user, loading } = useUser();
  const displayName = user ? `${user.displayName || ''}` : 'Kasutaja';
  const userEmail = user?.email || '';
  
  const [passes, setPasses] = useState<PassCard[]>([]);
  const [totalPasses, setTotalPasses] = useState(0);
  const [copiedPassId, setCopiedPassId] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token && !loading) {
      navigate('/login');
    }
  }, [navigate, loading]);

  useEffect(() => {
    const fetchPasses = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) return;

        const response = await fetch('https://evpass.pnglin.byenoob.com/api/user/passes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) throw new Error('Failed to fetch passes');

        const data = await response.json();

        const transformedPasses: PassCard[] = data.passes.map((pass: any) => {
          return {
            id: String(pass.id),
            name: pass.name || 'Pass',
            createdAt: pass.created_at || '',
            updatedAt: pass.updated_at || '',
            tone: 'purple' as const,
          };
        });

        setPasses(transformedPasses);

        // Calculate statistics
        const total = data.passes.length;
        setTotalPasses(total);
      } catch (error) {
        console.error('Error fetching passes:', error);
      }
    };

    if (user) fetchPasses();
  }, [user]);

  const handleSharePass = (passId: string) => {
    const shareUrl = `${window.location.origin}/view-pass/${passId}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopiedPassId(passId);
      setTimeout(() => setCopiedPassId(null), 2000);
    }).catch(err => {
      console.error('Failed to copy:', err);
    });
  };

  return (
    <div className="pass-page">
      <div className="pass-layout">
        <SidebarComponent
          activeNav="pass"
          userName={displayName}
          userEmail={userEmail}
          userPicture={user?.pilt}
        />

        <main className="pass-main">
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

          <div className="pass-content">
            <div className="pass-dashboard">
              <div className="pass-top-bar">
                <button type="button" className="pass-chip-button" onClick={() => navigate('/pass-create')}>
                  <span>Loo uus pass</span>
                  <img src={Plus} alt="" aria-hidden="true" />
                </button>
              </div>

              <div className="pass-metrics-row">
                <div className="pass-stats-panel">
                  <div className="pass-section-title">Statistika</div>
                  <div className="pass-stats-cards">
                    <article className="pass-highlight-card pass-highlight-card--magenta">
                      <div className="pass-highlight-icon" aria-hidden="true" />
                      <div className="pass-highlight-text">
                        <div className="pass-highlight-value">{totalPasses}</div>
                        <div className="pass-highlight-label">Passe kokku</div>
                      </div>
                    </article>
                  </div>
                </div>
              </div>

              <div className="pass-panels-row">
                <section className="pass-card-panel">
                  <div className="pass-panel-header">
                    <h2>Minu passid</h2>
                    <div className="pass-panel-controls">
                      <button type="button">Sorteeri</button>
                      <button type="button">Filtreeri</button>
                    </div>
                  </div>

                  <div className="pass-cards-grid">
                    {passes.length > 0 ? (
                      passes.map((pass) => (
                        <article
                          key={pass.id}
                          className={`pass-entry-card pass-entry-card--${pass.tone}`}
                          role="button"
                          tabIndex={0}
                        >
                          <div className="pass-entry-top">
                            <span className="pass-entry-actions" aria-hidden="true">
                              <button
                                type="button"
                                className="pass-action-btn pass-action-share"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSharePass(pass.id);
                                }}
                                title="Jaga passi"
                              >
                                {copiedPassId === pass.id ? '✓' : '🔗'}
                              </button>
                              <button
                                type="button"
                                className="pass-action-btn pass-action-edit"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigate(`/pass/${pass.id}/edit`);
                                }}
                                title="Muuda passi"
                              >
                                ✎
                              </button>
                              <button
                                type="button"
                                className="pass-action-btn pass-action-view"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigate(`/view-pass/${pass.id}`);
                                }}
                                title="Vaata passi"
                              >
                                →
                              </button>
                            </span>
                          </div>
                          <h3>{pass.name}</h3>
                          <time>{new Date(pass.createdAt).toLocaleDateString('et-EE')}</time>
                          {copiedPassId === pass.id && (
                            <p className="pass-copy-feedback">Link kopeeritud!</p>
                          )}
                        </article>
                      ))
                    ) : (
                      <div className="pass-empty-state">
                        <p>Ühtegi passi pole veel loodud</p>
                      </div>
                    )}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default PassFrontPage;
