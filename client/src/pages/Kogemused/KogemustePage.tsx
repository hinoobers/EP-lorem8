import React, { useState, useEffect } from 'react';
import SidebarComponent from '../../components/sidebar/Sidebar';
import { useUser } from '../../hooks/useUser';
import Search from '../../assets/dark/Search.svg';
import Mail from '../../assets/dark/Mail.svg';
import Bell from '../../assets/dark/Bell.svg';
import Plus from '../../assets/dark/Plus.svg';
import { useNavigate } from 'react-router-dom';
import '../HomePage/HomePageDark.css';
import './KogemustePage.css';

type StatusCard = {
  id: string;
  label: string;
  value: number;
  tone: 'green' | 'orange' | 'red' | 'purple';
};

type ExperienceCard = {
  id: string;
  tag: string;
  title: string;
  text: string;
  date: string;
  skills: string[];
  tone: 'green' | 'orange' | 'red';
  confirmed: number;
  rejectReason: string | null;
  isPending: boolean;
};



function KogemustePage() {
  const navigate = useNavigate();
  const { user } = useUser();
  const displayName = user ? `${user.displayName || ''}` : 'Kasutaja';
  const userEmail = user?.email || '';
  
  const [experiences, setExperiences] = useState<ExperienceCard[]>([]);
  const [statusCards, setStatusCards] = useState<StatusCard[]>([
    { id: 'approved', label: 'Kinnitatud', value: 0, tone: 'green' },
    { id: 'pending', label: 'Kinnitamisel', value: 0, tone: 'orange' },
    { id: 'rejected', label: 'Kinnitamata', value: 0, tone: 'red' },
    { id: 'inprogress', label: 'Pooleli', value: 0, tone: 'purple' },
  ]);
  const [totalExperiences, setTotalExperiences] = useState(0);
  const [thisMonthExperiences, setThisMonthExperiences] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) return;

        const response = await fetch('https://evpass.pnglin.byenoob.com/api/user/kogemused', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) throw new Error('Failed to fetch experiences');

        const data = await response.json();

        const transformedExperiences: ExperienceCard[] = data.experiences.map((exp: any) => {
          let tone: 'green' | 'orange' | 'red' = 'red'; // default
          if (exp.confirmed === 1) {
            tone = 'green'; // confirmed
          } else if (exp.isPending) {
            tone = 'orange'; // pending
          } else {
            tone = 'red'; // not sent or rejected
          }

          return {
            id: String(exp.id),
            tag: exp.type || 'tookogemus',
            title: exp.name,
            text: exp.organisatsioon,
            date: exp.start,
            skills: typeof exp.oskused === 'string' ? JSON.parse(exp.oskused) : (exp.oskused || []),
            tone: tone,
            confirmed: exp.confirmed,
            rejectReason: exp.reject_reason,
            isPending: exp.isPending,
          };
        });

        setExperiences(transformedExperiences);

        // Calculate status counts
        const approved = data.experiences.filter((exp: any) => exp.confirmed === 1).length;
        const rejected = data.experiences.filter((exp: any) => exp.reject_reason !== null).length;
        const pending = data.experiences.filter((exp: any) => exp.isPending).length;
        const pooleli = data.experiences.filter((exp: any) => exp.confirmed === 0 && !exp.isPending).length;
        
        setStatusCards([
          { id: 'approved', label: 'Kinnitatud', value: approved, tone: 'green' },
          { id: 'pending', label: 'Kinnitamisel', value: pending, tone: 'orange' },
          { id: 'rejected', label: 'Kinnitamata', value: rejected, tone: 'red' },
          { id: 'inprogress', label: 'Pooleli', value: pooleli, tone: 'purple' },
        ]);

        // Calculate statistics
        const total = data.experiences.length;
        setTotalExperiences(total);

        // Calculate experiences added this month
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        const thisMonth = data.experiences.filter((exp: any) => {
          if (!exp.created_at) return false;
          const createdDate = new Date(exp.created_at);
          return createdDate.getMonth() === currentMonth && createdDate.getFullYear() === currentYear;
        }).length;

        setThisMonthExperiences(thisMonth);
      } catch (error) {
        console.error('Error fetching experiences:', error);
      }
    };

    if (user) fetchExperiences();
  }, [user]);

  const archiveItems = Array.from({ length: 8 }, (_, idx) => ({
    id: String(idx + 1),
    title: 'Complete Web & Mobile Designer: UI/UX, Figma, +more',
  }));

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
            <div className="kogemus-dashboard">
              <div className="kogemus-top-bar">
                <button type="button" className="kogemus-chip-button" onClick={() => navigate('/kogemuse-lisamine')}>
                  <span>Lisa uus kogemus</span>
                  <img src={Plus} alt="" aria-hidden="true" />
                </button>
                <button type="button" className="kogemus-chip-button">
                  <span>Lisa eesmark</span>
                  <img src={Plus} alt="" aria-hidden="true" />
                </button>
              </div>

              <div className="kogemus-metrics-row">
                <div className="kogemus-status-list">
                  {statusCards.map((card) => (
                    <article
                      key={card.id}
                      className={`kogemus-status-card kogemus-status-card--${card.tone}`}
                    >
                      <div className="kogemus-status-icon" aria-hidden="true" />
                      <div>
                        <div className="kogemus-status-value">{card.value}</div>
                        <div className="kogemus-status-label">{card.label}</div>
                      </div>
                    </article>
                  ))}
                </div>

                <div className="kogemus-stats-panel">
                  <div className="kogemus-section-title">Statistika</div>
                  <div className="kogemus-stats-cards">
                    <article className="kogemus-highlight-card kogemus-highlight-card--magenta">
                      <div className="kogemus-highlight-icon" aria-hidden="true" />
                      <div className="kogemus-highlight-text">
                        <div className="kogemus-highlight-value">{totalExperiences}</div>
                        <div className="kogemus-highlight-label">Kogemust kokku</div>
                      </div>
                    </article>
                    <article className="kogemus-highlight-card kogemus-highlight-card--cyan">
                      <div className="kogemus-highlight-icon" aria-hidden="true" />
                      <div className="kogemus-highlight-text">
                        <div className="kogemus-highlight-value">+{thisMonthExperiences}</div>
                        <div className="kogemus-highlight-label">Uut kogemust sel kuul</div>
                      </div>
                    </article>
                    <article className="kogemus-goal-card">
                      <div className="kogemus-goal-header">
                        <span>Aasta eesmargid</span>
                        <span className="kogemus-goal-dot" aria-hidden="true" />
                      </div>
                      <div className="kogemus-goal-value">
                        <strong>25</strong> /30
                      </div>
                      <div className="kogemus-goal-progress">
                        <span style={{ width: '83.33%' }} />
                      </div>
                      <div className="kogemus-goal-percent">83.33 %</div>
                    </article>
                  </div>
                </div>
              </div>

              <div className="kogemus-panels-row">
                <section className="kogemus-card-panel">
                  <div className="kogemus-panel-header">
                    <h2>Kogemused</h2>
                    <div className="kogemus-panel-controls">
                      <button type="button">Sorteeri</button>
                      <button type="button">Filtreeri</button>
                    </div>
                  </div>

                  <div className="kogemus-cards-grid">
                    {experiences.map((card) => (
                      <article key={card.id} className={`kogemus-entry-card kogemus-entry-card--${card.tone}`}>
                        <div className="kogemus-entry-top">
                          <span className="kogemus-entry-tag">{card.tag}</span>
                          <span className="kogemus-entry-actions" aria-hidden="true">
                            <i />
                            <i />
                          </span>
                        </div>
                        <h3>{card.title}</h3>
                        <p>{card.text}</p>
                        <time>{card.date}</time>
                        <div className="kogemus-entry-skills">
                          {card.skills.map((skill, idx) => (
                            <span key={`${card.id}-${idx}`}>{skill}</span>
                          ))}
                        </div>
                      </article>
                    ))}
                  </div>

                  <div className="kogemus-panel-footer">
                    <button type="button">Detailne vaade</button>
                  </div>
                </section>

                <section className="kogemus-card-panel">
                  <div className="kogemus-panel-header">
                    <h2>Kogemuste arhiiv</h2>
                    <div className="kogemus-panel-controls">
                      <button type="button">Sorteeri</button>
                      <button type="button">Filtreeri</button>
                    </div>
                  </div>

                  <div className="kogemus-archive-list">
                    {archiveItems.map((item) => (
                      <article key={item.id} className="kogemus-archive-item">
                        <p>{item.title}</p>
                        <button type="button">Vaata</button>
                      </article>
                    ))}
                  </div>

                  <div className="kogemus-panel-footer">
                    <button type="button">Detailne vaade</button>
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

export default KogemustePage;
