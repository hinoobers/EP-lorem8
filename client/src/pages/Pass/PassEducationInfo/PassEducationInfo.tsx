// @ts-nocheck
import React, { useRef, useState } from 'react';
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
import './PassEducationInfo.css';

type EducationFormData = {
  institutionName: string;
  level: string;
  curriculum: string;
  startYear: string;
  endYear: string;
  courses: string;
};

const PassEducationInfo: React.FC = () => {
  const navigate = useNavigate();
  const certificateInputRef = useRef<HTMLInputElement>(null);
  const [currentStep] = useState(2);
  const [formData, setFormData] = useState<EducationFormData>({
    institutionName: '',
    level: '',
    curriculum: '',
    startYear: '',
    endYear: '',
    courses: '',
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log('Save education form', formData);
  };

  const handleCertificateUploadClick = () => {
    certificateInputRef.current?.click();
  };

  const handleCertificateFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      console.log('Selected certificate file:', selectedFile.name);
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
            onClick={() => navigate('/pass/work-experience')}
            aria-label="Tagasi töökogemuse sammu"
          >
            <img src={ArrowLeft} alt="" aria-hidden="true" />
          </button>

          <div className="pass-shell">
            <section className="pass-shell-body">
              {/* Form card */}
              <section className="pass-form-card" aria-label="Haridus">
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
                    <div className="pass-progress-step pass-progress-step--active">
                      <span className="pass-step-icon pass-step-icon--user">
                        <img src={UserIcon} alt="" aria-hidden="true" />
                      </span>
                    </div>

                    <div className="pass-progress-connector pass-progress-connector--active" />

                    <div className="pass-progress-step pass-progress-step--active">
                      <span className="pass-step-icon">
                        <img src={Briefcase} alt="" aria-hidden="true" />
                      </span>
                    </div>

                    <div className="pass-progress-connector pass-progress-connector--active" />

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
                    <span className="pass-progress-label">
                      Töökogemus
                    </span>
                    <span className="pass-progress-label pass-progress-label--active">
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
                      <label className="pass-field-label" htmlFor="institutionName">
                        Õppeasutuse nimi*
                      </label>
                      <input
                        id="institutionName"
                        name="institutionName"
                        type="text"
                        className="pass-field-input"
                        value={formData.institutionName}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="pass-field">
                      <label className="pass-field-label" htmlFor="level">
                        Õppeaste*
                      </label>
                      <select
                        id="level"
                        name="level"
                        className="pass-field-input pass-select"
                        value={formData.level}
                        onChange={handleChange}
                      >
                        <option value="">Vali</option>
                        <option value="pohiharidus">Põhiharidus</option>
                        <option value="gymnaasium">Gümnaasium</option>
                        <option value="kutsekeskharidus">Kutsekeskharidus</option>
                        <option value="korgharidus">Kõrgharidus</option>
                      </select>
                    </div>

                    <div className="pass-field pass-field--full">
                      <label className="pass-field-label" htmlFor="curriculum">
                        Õppekava / Eriala*
                      </label>
                      <input
                        id="curriculum"
                        name="curriculum"
                        type="text"
                        className="pass-field-input"
                        value={formData.curriculum}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="pass-field">
                      <label className="pass-field-label" htmlFor="startYear">
                        Algusaasta*
                      </label>
                      <select
                        id="startYear"
                        name="startYear"
                        className="pass-field-input pass-select"
                        value={formData.startYear}
                        onChange={handleChange}
                      >
                        <option value="">Vali</option>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                      </select>
                    </div>

                    <div className="pass-field">
                      <label className="pass-field-label" htmlFor="endYear">
                        Lõpetamise aasta*
                      </label>
                      <select
                        id="endYear"
                        name="endYear"
                        className="pass-field-input pass-select"
                        value={formData.endYear}
                        onChange={handleChange}
                      >
                        <option value="">Vali</option>
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                        <option value="2026">2026</option>
                        <option value="2027">2027</option>
                      </select>
                    </div>

                    <div className="pass-field pass-field--full">
                      <label className="pass-field-label" htmlFor="courses">
                        Olulisemad kursused või projektid
                      </label>
                      <textarea
                        id="courses"
                        name="courses"
                        className="pass-field-input pass-field-textarea"
                        value={formData.courses}
                        onChange={handleChange}
                        rows={3}
                      />
                    </div>

                    <input
                      ref={certificateInputRef}
                      type="file"
                      className="pass-hidden-file-input"
                      onChange={handleCertificateFileChange}
                    />

                    <button
                      type="button"
                      className="pass-add-certificate"
                      onClick={handleCertificateUploadClick}
                    >
                      Lisa sertifikaat failina
                      <span className="pass-add-certificate-icon-wrapper">
                        <img
                          src={PlusIcon}
                          alt=""
                          className="pass-add-language-icon"
                          aria-hidden="true"
                        />
                      </span>
                    </button>

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
                    aria-label="Tagasi töökogemuse sammu"
                    onClick={() => navigate('/pass/work-experience')}
                  >
                    <img src={ArrowLeft} alt="" aria-hidden="true" />
                  </button>

                  <button
                    type="button"
                    className="pass-save-button"
                    onClick={handleSave}
                  >
                    Salvesta
                  </button>

                  <button
                    type="button"
                    className="pass-nav-pill"
                    aria-label="Salvesta ja liigu edasi"
                    onClick={handleSave}
                  >
                    <img src={ChevronRight} alt="" aria-hidden="true" />
                  </button>
                </footer>
              </section>

              {/* Preview card (same placeholder as other steps) */}
              <section className="pass-preview-card" aria-label="Passi eelvaade">
                <header className="pass-preview-header">
                  <h2 className="pass-preview-title">Passi eelvaade</h2>
                </header>

                <div className="pass-preview-divider" />

                <div className="pass-preview-body">
                  <div className="pass-preview-photo" aria-hidden="true" />

                  <div className="pass-preview-info-col">
                    <div className="pass-preview-name-block">
                      <div className="pass-preview-name">Karoliine Tamm</div>
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

export default PassEducationInfo;

