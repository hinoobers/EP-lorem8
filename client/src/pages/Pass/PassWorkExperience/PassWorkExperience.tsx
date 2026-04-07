// @ts-nocheck
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarComponent from '../../../components/sidebar/Sidebar';
import { useUser } from '../../../hooks/useUser';

import Mail from '../../../assets/dark/Mail.svg';
import Bell from '../../../assets/dark/Bell.svg';
import ArrowLeft from '../../../assets/dark/Arrow left.svg';
import UserIcon from '../../../assets/dark/User.svg';
import Briefcase from '../../../assets/dark/Briefcase.svg';
import Bookmark from '../../../assets/dark/Bookmark.svg';
import Zap from '../../../assets/dark/Zap.svg';
import EditIcon from '../../../assets/dark/Edit.svg';
import ShareIcon from '../../../assets/dark/Share.svg';
import PlusIcon from '../../../assets/dark/Plus.svg';
import Search from '../../../assets/dark/Search.svg';
import ChevronRight from '../../../assets/dark/Arrow right_dark.svg';
import '../../HomePage/HomePageDark.css';
import './PassWorkExperience.css';

type WorkExperienceFormData = {
  title: string;
  company: string;
  workType: string;
  startDate: string;
  endDate: string;
  description: string;
  skills: string;
};

const defaultPreview: WorkExperienceFormData = {
  title: 'Praktikant',
  company: 'Näidisettevõte OÜ',
  workType: 'Praktika',
  startDate: '01.06.2024',
  endDate: '31.08.2024',
  description: '',
  skills: '',
};

const PassWorkExperience: React.FC = () => {
  const navigate = useNavigate();
  const { user, loading, error } = useUser();
  const [currentStep] = useState(1);
  const [formData, setFormData] = useState<WorkExperienceFormData>({
    title: '',
    company: '',
    workType: '',
    startDate: '',
    endDate: '',
    description: '',
    skills: '',
  });
  const [previewData, setPreviewData] = useState<WorkExperienceFormData>(defaultPreview);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = (goForward?: boolean) => {
    setPreviewData((prev) => ({
      ...prev,
      ...Object.fromEntries(
        Object.entries(formData).map(([key, value]) => [key, value || (prev as any)[key]]),
      ),
    }));

    if (goForward) {
      navigate('/pass/education');
    }
  };

  const displayName = user ? `${user.displayName || ''}` : 'Kasutaja';
  const userEmail = user?.email || '';

  return (
    <div className="home-page">
      <div className="home-layout pass-layout">
        <SidebarComponent 
          activeNav="pass" 
          userName={displayName}
          userEmail={userEmail}
          userPicture={user?.pilt}
        />

        <main className="home-main pass-main">
          <div className="pass-header-group">
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
                <button
                  type="button"
                  className="home-icon-button"
                  aria-label="Ava postkast"
                >
                  <img src={Mail} alt="" className="home-icon-img" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="home-icon-button"
                  aria-label="Teavitused"
                >
                  <img src={Bell} alt="" className="home-icon-img" aria-hidden="true" />
                </button>
              </div>
            </header>

            <div className="home-header-divider" />
          </div>

          <button
            type="button"
            className="pass-back-button"
            onClick={() => navigate('/pass')}
            aria-label="Tagasi isikliku info sammu"
          >
            <img src={ArrowLeft} alt="" aria-hidden="true" />
          </button>

          <div className="pass-shell">
            <section className="pass-shell-body">
              {/* Form card */}
              <section className="pass-form-card" aria-label="Töökogemus">
                <header className="pass-form-header">
                  <div className="pass-form-title-row">
                    <div className="pass-form-title-group">
                      <h1 className="pass-form-title">Passi koostamine</h1>
                    </div>
                    <span className="pass-form-required-label">
                      *kohustuslikud väljad
                    </span>
                  </div>
                </header>

                <div className="pass-progress">
                  <div className="pass-progress-rail">
                    <div
                      className={`pass-progress-step pass-progress-step--active`}
                    >
                      <span className="pass-step-icon pass-step-icon--user">
                        <img src={UserIcon} alt="" aria-hidden="true" />
                      </span>
                    </div>

                    <div className="pass-progress-connector pass-progress-connector--active" />

                    <div
                      className={`pass-progress-step ${
                        currentStep >= 1 ? 'pass-progress-step--active' : ''
                      }`}
                    >
                      <span className="pass-step-icon">
                        <img src={Briefcase} alt="" aria-hidden="true" />
                      </span>
                    </div>

                    <div
                      className={`pass-progress-connector ${
                        currentStep >= 2 ? 'pass-progress-connector--active' : ''
                      }`}
                    />

                    <div
                      className={`pass-progress-step ${
                        currentStep >= 2 ? 'pass-progress-step--active' : ''
                      }`}
                    >
                      <span className="pass-step-icon">
                        <img src={Bookmark} alt="" aria-hidden="true" />
                      </span>
                    </div>

                    <div
                      className={`pass-progress-connector ${
                        currentStep >= 3 ? 'pass-progress-connector--active' : ''
                      }`}
                    />

                    <div
                      className={`pass-progress-step ${
                        currentStep >= 3 ? 'pass-progress-step--active' : ''
                      }`}
                    >
                      <span className="pass-step-icon">
                        <img src={Zap} alt="" aria-hidden="true" />
                      </span>
                    </div>
                  </div>

                  <div className="pass-progress-labels">
                    <span className="pass-progress-label">
                      Isiklik info
                    </span>
                    <span className="pass-progress-label pass-progress-label--active">
                      Töökogemus
                    </span>
                    <span className="pass-progress-label">
                      Haridus
                    </span>
                    <span className="pass-progress-label">
                      Oskused
                    </span>
                  </div>
                </div>

                <div className="pass-form-body">
                  <div className="pass-form-grid">
                    <div className="pass-field">
                      <label className="pass-field-label" htmlFor="title">
                        Ametinimetus*
                      </label>
                      <input
                        id="title"
                        name="title"
                        type="text"
                        className="pass-field-input"
                        value={formData.title}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="pass-field">
                      <label className="pass-field-label" htmlFor="company">
                        Ettevõtte nimi*
                      </label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        className="pass-field-input"
                        value={formData.company}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="pass-field pass-field--full">
                      <label className="pass-field-label" htmlFor="workType">
                        Töö tüüp (praktika, vabatahtlik jne)
                      </label>
                      <input
                        id="workType"
                        name="workType"
                        type="text"
                        className="pass-field-input"
                        value={formData.workType}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="pass-field">
                      <label className="pass-field-label" htmlFor="startDate">
                        Alguskuupäev*
                      </label>
                      <input
                        id="startDate"
                        name="startDate"
                        type="text"
                        className="pass-field-input"
                        placeholder="dd.mm.yyyy"
                        value={formData.startDate}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="pass-field">
                      <label className="pass-field-label" htmlFor="endDate">
                        Lõppkuupäev*
                      </label>
                      <input
                        id="endDate"
                        name="endDate"
                        type="text"
                        className="pass-field-input"
                        placeholder="dd.mm.yyyy"
                        value={formData.endDate}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="pass-field pass-field--full">
                      <label className="pass-field-label" htmlFor="description">
                        Kirjeldus tehtud tööst
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        className="pass-field-input pass-field-textarea"
                        value={formData.description}
                        onChange={handleChange}
                        rows={3}
                      />
                    </div>

                    <div className="pass-field pass-field--full">
                      <label className="pass-field-label" htmlFor="skills">
                        Omandatud oskused
                      </label>
                      <input
                        id="skills"
                        name="skills"
                        type="text"
                        className="pass-field-input"
                        value={formData.skills}
                        onChange={handleChange}
                      />
                    </div>

                    <button
                      type="button"
                      className="pass-add-language pass-add-education"
                      disabled
                    >
                      <img
                        src={PlusIcon}
                        alt=""
                        className="pass-add-language-icon"
                        aria-hidden="true"
                      />
                      Lisa hariduskäik
                    </button>
                  </div>
                </div>

                <footer className="pass-form-footer">
                  <button
                    type="button"
                    className="pass-nav-pill"
                    aria-label="Tagasi isikliku info sammu"
                    onClick={() => navigate('/pass')}
                  >
                    <img src={ArrowLeft} alt="" aria-hidden="true" />
                  </button>

                  <button
                    type="button"
                    className="pass-save-button"
                    onClick={() => handleSave(true)}
                  >
                    Salvesta
                  </button>

                  <button
                    type="button"
                    className="pass-nav-pill"
                    aria-label="Salvesta ja liigu edasi"
                    onClick={() => handleSave(true)}
                  >
                    <img src={ChevronRight} alt="" aria-hidden="true" />
                  </button>
                </footer>
              </section>

              {/* Preview card (same as PassPersonalInfo, placeholder for further development) */}
              <section className="pass-preview-card" aria-label="Passi eelvaade">
                <header className="pass-preview-header">
                  <h2 className="pass-preview-title">Passi eelvaade</h2>
                </header>

                <div className="pass-preview-divider" />

                <div className="pass-preview-body">
                  <div className="pass-preview-photo" aria-hidden="true" />

                  <div className="pass-preview-info-col">
                    <div className="pass-preview-name-block">
                      <div className="pass-preview-name">
                        {/* Static placeholder content, same structure as personal info preview */}
                        Karoliine Tamm
                      </div>
                      <div className="pass-preview-chips-row">
                        <span className="pass-preview-chip-ghost">Tartu</span>
                        <span className="pass-preview-chip-ghost">2006</span>
                      </div>
                    </div>

                    <div className="pass-preview-section">
                      <div className="pass-preview-section-title">Kontakt</div>
                      <ul className="pass-preview-list">
                        <li>
                          <span className="pass-preview-bullet" />
                          <span>+372 5555 5555</span>
                        </li>
                        <li>
                          <span className="pass-preview-bullet" />
                          <span>karoliine@example.com</span>
                        </li>
                        <li>
                          <span className="pass-preview-bullet" />
                          <span>Tartu</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <footer className="pass-preview-footer">
                  <button
                    type="button"
                    className="pass-preview-icon-btn"
                    aria-label="Redigeeri passi"
                  >
                    <img src={EditIcon} alt="" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    className="pass-preview-icon-btn"
                    aria-label="Jaga passi"
                  >
                    <img src={ShareIcon} alt="" aria-hidden="true" />
                  </button>
                </footer>
              </section>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PassWorkExperience;

