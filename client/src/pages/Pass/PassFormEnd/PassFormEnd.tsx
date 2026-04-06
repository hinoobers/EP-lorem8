// @ts-nocheck
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarComponent from '../../../components/sidebar/Sidebar';

import Mail from '../../../assets/dark/Mail.svg';
import Bell from '../../../assets/dark/Bell.svg';
import ArrowLeft from '../../../assets/dark/Arrow left.svg';
import EditIcon from '../../../assets/dark/Edit.svg';
import ShareIcon from '../../../assets/dark/Share.svg';
import Search from '../../../assets/dark/Search.svg';
import CheckCircle from '../../../assets/dark/Check circle.svg';
import '../../HomePage/HomePageDark.css';
import '../PassPersonalInfo/PassPersonalInfo.css';
import './PassFormEnd.css';

const defaultPreview = {
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

const PassFormEnd: React.FC = () => {
    const navigate = useNavigate();
    const [previewData] = useState(defaultPreview);

    return (
        <div className="home-page pass-form-end-page">
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
                        onClick={() => navigate('/pass/skills')}
                        aria-label="Tagasi oskuste sammu"
                    >
                        <img src={ArrowLeft} alt="" aria-hidden="true" />
                    </button>

                    <div className="pass-shell">
                        <section className="pass-shell-body">
                            {/* Form card Success */}
                            <section className="pass-form-card pass-form-end-card" aria-label="Kogemuse kinnitamine">
                                <header className="pass-form-header">
                                    <div className="pass-form-title-row">
                                        <div className="pass-form-title-group">
                                            <h1 className="pass-form-title">Kogemuse kinnitamine</h1>
                                        </div>
                                    </div>
                                </header>

                                <div className="pass-form-end-divider" />

                                <div className="pass-form-end-body">
                                    <h2 className="pass-form-end-title">Passi täitmine õnnestus!</h2>

                                    <div className="pass-form-end-icon-wrapper">
                                        <img src={CheckCircle} alt="Success" className="pass-form-end-icon" />
                                    </div>

                                    <p className="pass-form-end-text">Kas soovid suunduda kogemusi lisama?</p>

                                    <div className="pass-form-end-actions">
                                        <button
                                            type="button"
                                            className="pass-form-end-btn-outline"
                                            onClick={() => navigate('/home_dark')}
                                        >
                                            Ei soovi
                                        </button>

                                        <button
                                            type="button"
                                            className="pass-form-end-btn-primary"
                                            onClick={() => navigate('/kogemuse-lisamine')}
                                        >
                                            Soovin
                                        </button>
                                    </div>
                                </div>
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
                                                    {previewData.birthDate ? previewData.birthDate.split('.')[2] : '2006'}
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

export default PassFormEnd;
