// @ts-nocheck
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarComponent from '../../../components/sidebar/Sidebar';

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
import './PassPersonalInfo.css';

type PassFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  gender: string;
  country: string;
  city: string;
  language: string;
  languageLevel: string;
  school: string;
  className: string;
  tagline: string;
};

const defaultPreview: PassFormData = {
  firstName: 'Karoliine',
  lastName: 'Tamm',
  email: 'karoliine@example.com',
  phone: '+372 5555 5555',
  birthDate: '01.01.2006',
  gender: 'Naine',
  country: 'Eesti',
  city: 'Tartu',
  language: 'eesti keel',
  languageLevel: 'emakeel',
  tagline: 'Ettevõtlik ja loov õppija',
};

const PassPersonalInfo: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<PassFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthDate: '',
    gender: '',
    country: '',
    city: '',
    language: '',
    languageLevel: '',
    tagline: '',
  });
  const [previewData, setPreviewData] = useState<PassFormData>(defaultPreview);

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

    setCurrentStep((prev) => Math.min(prev + 1, 3));

    if (goForward) {
      navigate('/pass/work-experience');
    }
  };

  return (
    <div className="home-page">
      <div className="home-layout pass-layout">
        <SidebarComponent activeNav="pass" />

        <main className="home-main pass-main">
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

          <button
            type="button"
            className="pass-back-button"
            onClick={() => navigate('/home_dark')}
            aria-label="Tagasi töölauale"
          >
            <img src={ArrowLeft} alt="" aria-hidden="true" />
          </button>

          <div className="pass-shell">
            <section className="pass-shell-body">
              {/* Form card */}
              <section className="pass-form-card" aria-label="Isiklik info">
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
                      className={`pass-progress-step ${
                        currentStep === 0 ? 'pass-progress-step--active' : ''
                      }`}
                    >
                      <span className="pass-step-icon pass-step-icon--user">
                        <img src={UserIcon} alt="" aria-hidden="true" />
                      </span>
                    </div>

                    <div
                      className={`pass-progress-connector ${
                        currentStep >= 1 ? 'pass-progress-connector--active' : ''
                      }`}
                    />

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
                    <span className={`pass-progress-label ${currentStep === 0 ? 'pass-progress-label--active' : ''}`}>
                      Isiklik info
                    </span>
                    <span className={`pass-progress-label ${currentStep === 1 ? 'pass-progress-label--active' : ''}`}>
                      Töökogemus
                    </span>
                    <span className={`pass-progress-label ${currentStep === 2 ? 'pass-progress-label--active' : ''}`}>
                      Haridus
                    </span>
                    <span className={`pass-progress-label ${currentStep === 3 ? 'pass-progress-label--active' : ''}`}>
                      Oskused
                    </span>
                  </div>
                </div>

                <div className="pass-form-body">
                  <div className="pass-form-grid">
                    <div className="pass-field">
                      <label className="pass-field-label" htmlFor="firstName">
                        Eesnimi*
                      </label>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        className="pass-field-input"
                        value={formData.firstName}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="pass-field">
                      <label className="pass-field-label" htmlFor="lastName">
                        Perekonna nimi*
                      </label>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        className="pass-field-input"
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="pass-field">
                      <label className="pass-field-label" htmlFor="email">
                        E-post*
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        className="pass-field-input"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="pass-field">
                      <label className="pass-field-label" htmlFor="phone">
                        Telefon
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        className="pass-field-input"
                        placeholder="+372"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="pass-field">
                      <label className="pass-field-label" htmlFor="birthDate">
                        Sünniaeg
                      </label>
                      <input
                        id="birthDate"
                        name="birthDate"
                        type="text"
                        className="pass-field-input"
                        placeholder="dd.mm.yyyy"
                        value={formData.birthDate}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="pass-field">
                      <label className="pass-field-label" htmlFor="gender">
                        Sugu
                      </label>
                      <select
                        id="gender"
                        name="gender"
                        className="pass-field-input pass-select"
                        value={formData.gender}
                        onChange={handleChange}
                      >
                        <option value="">Vali</option>
                        <option value="Naine">Naine</option>
                        <option value="Mees">Mees</option>
                        <option value="Muu">Muu</option>
                      </select>
                    </div>

                    <div className="pass-field">
                      <label className="pass-field-label" htmlFor="country">
                        Riik
                      </label>
                      <input
                        id="country"
                        name="country"
                        type="text"
                        className="pass-field-input"
                        value={formData.country}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="pass-field">
                      <label className="pass-field-label" htmlFor="city">
                        Linn
                      </label>
                      <input
                        id="city"
                        name="city"
                        type="text"
                        className="pass-field-input"
                        value={formData.city}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="pass-field">
                      <label className="pass-field-label" htmlFor="language">
                        Keeleoskus
                      </label>
                      <select
                        id="language"
                        name="language"
                        className="pass-field-input pass-select"
                        value={formData.language}
                        onChange={handleChange}
                      >
                        <option value="">Vali</option>
                        <option value="eesti keel">Eesti keel</option>
                        <option value="inglise keel">Inglise keel</option>
                        <option value="vene keel">Vene keel</option>
                      </select>
                      <button
                        type="button"
                        className="pass-add-language"
                        disabled
                      >
                        <img src={PlusIcon} alt="" className="pass-add-language-icon" aria-hidden="true" />
                        Lisa keel
                      </button>
                    </div>

                    <div className="pass-field">
                      <label className="pass-field-label" htmlFor="languageLevel">
                        Tase
                      </label>
                      <select
                        id="languageLevel"
                        name="languageLevel"
                        className="pass-field-input pass-select"
                        value={formData.languageLevel}
                        onChange={handleChange}
                      >
                        <option value="">Vali</option>
                        <option value="emakeel">Emakeel</option>
                        <option value="C1">C1</option>
                        <option value="B2">B2</option>
                        <option value="B1">B1</option>
                      </select>
                    </div>

                    <div className="pass-field pass-field--full">
                      <label className="pass-field-label" htmlFor="tagline">
                        Enesetutvustus
                      </label>
                      <textarea
                        id="tagline"
                        name="tagline"
                        className="pass-field-input pass-field-textarea"
                        value={formData.tagline}
                        onChange={handleChange}
                        rows={3}
                      />
                    </div>
                  </div>
                </div>

                <footer className="pass-form-footer">
                  <button
                    type="button"
                    className="pass-nav-pill"
                    aria-label="Eelmine samm"
                    onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
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

              {/* Preview card */}
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
                        {previewData.firstName || defaultPreview.firstName}{' '}
                        {previewData.lastName || defaultPreview.lastName}
                      </div>
                      <div className="pass-preview-chips-row">
                        <span className="pass-preview-chip-ghost">
                          {previewData.city || defaultPreview.city}
                        </span>
                        <span className="pass-preview-chip-ghost">
                          {previewData.birthDate ? previewData.birthDate.split('.')[2] : '19'}
                        </span>
                      </div>
                    </div>

                    <div className="pass-preview-section">
                      <div className="pass-preview-section-title">Kontakt</div>
                      <ul className="pass-preview-list">
                        <li>
                          <span className="pass-preview-bullet" />
                          <span>{previewData.phone || defaultPreview.phone}</span>
                        </li>
                        <li>
                          <span className="pass-preview-bullet" />
                          <span>{previewData.email || defaultPreview.email}</span>
                        </li>
                        <li>
                          <span className="pass-preview-bullet" />
                          <span>{previewData.city || defaultPreview.city}</span>
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

export default PassPersonalInfo;
