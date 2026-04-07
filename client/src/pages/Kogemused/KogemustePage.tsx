import React from 'react';
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
  tone: 'green' | 'magenta' | 'purple' | 'orange';
};

const statusCards: StatusCard[] = [
  { id: 'approved', label: 'Kinnitatud', value: 20, tone: 'green' },
  { id: 'pending', label: 'Kinnitamisel', value: 2, tone: 'orange' },
  { id: 'rejected', label: 'Kinnitamata', value: 3, tone: 'red' },
  { id: 'inprogress', label: 'Pooleli', value: 1, tone: 'purple' },
];

const experienceCards: ExperienceCard[] = [
  {
    id: '1',
    tag: 'tookogemus',
    title: 'Kogemuse nimi',
    text: 'Tekst tekst tekst tekst',
    date: '01.01.2026',
    skills: ['skill', 'skill'],
    tone: 'green',
  },
  {
    id: '2',
    tag: 'erasmus+',
    title: 'Kogemuse nimi',
    text: 'Tekst tekst tekst tekst',
    date: '01.01.2026',
    skills: ['skill', 'skill'],
    tone: 'green',
  },
  {
    id: '3',
    tag: 'vabatahtlik',
    title: 'Kogemuse nimi',
    text: 'Tekst tekst tekst tekst',
    date: '01.01.2026',
    skills: ['skill', 'skill'],
    tone: 'magenta',
  },
  {
    id: '4',
    tag: 'projekt',
    title: 'Kogemuse nimi',
    text: 'Tekst tekst tekst tekst',
    date: '01.01.2026',
    skills: ['skill', 'skill'],
    tone: 'purple',
  },
  {
    id: '5',
    tag: 'kursus',
    title: 'Kogemuse nimi',
    text: 'Tekst tekst tekst tekst',
    date: '01.01.2026',
    skills: ['skill', 'skill'],
    tone: 'orange',
  },
  {
    id: '6',
    tag: 'projekt',
    title: 'Kogemuse nimi',
    text: 'Tekst tekst tekst tekst',
    date: '01.01.2026',
    skills: ['skill', 'skill'],
    tone: 'purple',
  },
  {
    id: '7',
    tag: 'vabatahtlik',
    title: 'Kogemuse nimi',
    text: 'Tekst tekst tekst tekst',
    date: '01.01.2026',
    skills: ['skill', 'skill'],
    tone: 'magenta',
  },
  {
    id: '8',
    tag: 'vabatahtlik',
    title: 'Kogemuse nimi',
    text: 'Tekst tekst tekst tekst',
    date: '01.01.2026',
    skills: ['skill', 'skill'],
    tone: 'orange',
  },
  {
    id: '9',
    tag: 'kursus',
    title: 'Kogemuse nimi',
    text: 'Tekst tekst tekst tekst',
    date: '01.01.2026',
    skills: ['skill', 'skill'],
    tone: 'orange',
  },
];

function KogemustePage() {
  const navigate = useNavigate();
  const { user } = useUser();
  const displayName = user ? `${user.displayName || ''}` : 'Kasutaja';
  const userEmail = user?.email || '';

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
                        <div className="kogemus-highlight-value">25</div>
                        <div className="kogemus-highlight-label">Kogemust kokku</div>
                      </div>
                    </article>
                    <article className="kogemus-highlight-card kogemus-highlight-card--cyan">
                      <div className="kogemus-highlight-icon" aria-hidden="true" />
                      <div className="kogemus-highlight-text">
                        <div className="kogemus-highlight-value">+2</div>
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
                    {experienceCards.map((card) => (
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
