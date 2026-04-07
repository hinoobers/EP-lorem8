// @ts-nocheck
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarComponent from '../../../components/sidebar/Sidebar';
import { useUser } from '../../../hooks/useUser';
import { usePassContext } from '../../../context/PassContext';

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

const PassFormEnd: React.FC = () => {
    const navigate = useNavigate();
    const { user, loading, error } = useUser();
    const { formData, resetForm, getFormData } = usePassContext();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const handleSubmit = async () => {
        setIsSubmitting(true);
        setSubmitError(null);

        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error('No authentication token found');
            }

            const passData = getFormData();

            const response = await fetch('https://evpass.pnglin.byenoob.com/api/add-pass', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    workExperience: passData.workExperience,
                    educationInfo: passData.educationInfo,
                    skills: passData.skills
                })
            });

            if (!response.ok) {
                throw new Error('Failed to submit pass');
            }

            const data = await response.json();
            resetForm();
            navigate('/pass');
        } catch (error) {
            console.error('Error submitting pass:', error);
            setSubmitError(error instanceof Error ? error.message : 'An error occurred while submitting the pass');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="home-page pass-form-end-page">
            <div className="home-layout pass-layout">
                <SidebarComponent 
                  activeNav="pass" 
                  userName={user ? `${user.displayName || ''}` : 'Kasutaja'}
                  userEmail={user?.email || ''}
                  userPicture={user?.pilt}
                />

                <main className="home-main pass-main">
                    <header className="home-header">
                        <div className="home-header-name">{user ? `${user.displayName || ''}` : 'Kasutaja'}</div>

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

                                    {submitError && <p style={{ color: '#ff4558', marginBottom: '16px' }}>{submitError}</p>}

                                    <div className="pass-form-end-actions">
                                        <button
                                            type="button"
                                            className="pass-form-end-btn-outline"
                                            onClick={handleSubmit}
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? 'Salvestamine...' : 'Salvesta pass'}
                                        </button>

                                        <button
                                            type="button"
                                            className="pass-form-end-btn-primary"
                                            onClick={async () => {
                                                await handleSubmit();
                                                navigate('/kogemuse-lisamine');
                                            }}
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? 'Salvestamine...' : 'Salvesta ja lisa kogemus'}
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
                                                {user?.displayName || 'Kasutaja'}
                                            </div>
                                            <div className="pass-preview-chips-row">
                                                <span className="pass-preview-chip-ghost">
                                                    Estonia
                                                </span>
                                            </div>
                                        </div>

                                        <div className="pass-preview-section">
                                            <div className="pass-preview-section-title">Kontakt</div>
                                            <ul className="pass-preview-list">
                                                <li>
                                                    <span className="pass-preview-bullet" />
                                                    <span>{user?.email || 'Email'}</span>
                                                </li>
                                                <li>
                                                    <span className="pass-preview-bullet" />
                                                    <span>{user?.email || 'Email'}</span>
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
