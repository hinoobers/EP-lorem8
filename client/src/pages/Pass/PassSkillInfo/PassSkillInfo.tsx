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
import './PassSkillInfo.css';

type SkillData = {
    id: string;
    name: string;
    level: string;
    acquiredWhere: string;
    durationUsed: string;
    practiceUsage: string;
};

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

const PassSkillInfo: React.FC = () => {
    const navigate = useNavigate();
    const [currentStep] = useState(3);

    const [skills, setSkills] = useState<SkillData[]>([
        {
            id: crypto.randomUUID(),
            name: '',
            level: '',
            acquiredWhere: '',
            durationUsed: '',
            practiceUsage: '',
        }
    ]);

    const [previewData, setPreviewData] = useState(defaultPreview);

    const handleChange = (
        index: number,
        field: keyof SkillData,
        value: string
    ) => {
        setSkills((prev) => {
            const newSkills = [...prev];
            newSkills[index] = { ...newSkills[index], [field]: value };
            return newSkills;
        });
    };

    const handleAddSkill = () => {
        setSkills((prev) => [
            ...prev,
            {
                id: crypto.randomUUID(),
                name: '',
                level: '',
                acquiredWhere: '',
                durationUsed: '',
                practiceUsage: '',
            }
        ]);
    };

    const handleSave = (goForward?: boolean) => {
        // Navigate forward to final UI as required
        // Can merge into previewData here if wanted for completeness, but not strictly needed for skills in v1
        if (goForward) {
            navigate('/home_dark');
        }
    };

    return (
        <div className="home-page pass-skill-page">
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
                        onClick={() => navigate('/pass/education')}
                        aria-label="Tagasi hariduse sammu"
                    >
                        <img src={ArrowLeft} alt="" aria-hidden="true" />
                    </button>

                    <div className="pass-shell">
                        <section className="pass-shell-body">
                            {/* Form card */}
                            <section className="pass-form-card" aria-label="Oskused">
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

                                        <div className="pass-progress-step pass-progress-step--active">
                                            <span className="pass-step-icon">
                                                <img src={Bookmark} alt="" aria-hidden="true" />
                                            </span>
                                        </div>

                                        <div className="pass-progress-connector pass-progress-connector--active" />

                                        <div className="pass-progress-step pass-progress-step--active">
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
                                        <span className="pass-progress-label">
                                            Haridus
                                        </span>
                                        <span className="pass-progress-label pass-progress-label--active">
                                            Oskused
                                        </span>
                                    </div>
                                </div>

                                <div className="pass-form-body">
                                    {skills.map((skill, index) => (
                                        <div key={skill.id} className={`pass-skill-block ${index > 0 ? 'mt-4' : ''}`}>
                                            <div className="pass-form-grid">
                                                <div className="pass-field pass-field--full">
                                                    <label className="pass-field-label" htmlFor={`skill-name-${index}`}>
                                                        Oskuse nimi*
                                                    </label>
                                                    <input
                                                        id={`skill-name-${index}`}
                                                        type="text"
                                                        className="pass-field-input"
                                                        value={skill.name}
                                                        onChange={(e) => handleChange(index, 'name', e.target.value)}
                                                    />
                                                </div>

                                                <div className="pass-field pass-field--full">
                                                    <label className="pass-field-label" htmlFor={`skill-level-${index}`}>
                                                        Millisel tasemel see oskus on?*
                                                    </label>
                                                    <select
                                                        id={`skill-level-${index}`}
                                                        className="pass-field-input pass-select"
                                                        value={skill.level}
                                                        onChange={(e) => handleChange(index, 'level', e.target.value)}
                                                    >
                                                        <option value="">Vali</option>
                                                        <option value="Algaja">algtase</option>
                                                        <option value="Kesk-tase">kesktase</option>
                                                        <option value="Edasijõudnud">edasijõudnud</option>
                                                        <option value="Ekspert">ekspert</option>
                                                    </select>
                                                </div>

                                                <div className="pass-field pass-field--full">
                                                    <label className="pass-field-label" htmlFor={`skill-acquired-${index}`}>
                                                        Kus oled selle oskuse omandanud?*
                                                    </label>
                                                    <input
                                                        id={`skill-acquired-${index}`}
                                                        type="text"
                                                        className="pass-field-input"
                                                        value={skill.acquiredWhere}
                                                        onChange={(e) => handleChange(index, 'acquiredWhere', e.target.value)}
                                                    />
                                                </div>

                                                <div className="pass-field pass-field--full">
                                                    <label className="pass-field-label" htmlFor={`skill-duration-${index}`}>
                                                        Kui kaua oled seda oskust kasutanud
                                                    </label>
                                                    <select
                                                        id={`skill-duration-${index}`}
                                                        className="pass-field-input pass-select pass-skill-duration"
                                                        value={skill.durationUsed}
                                                        onChange={(e) => handleChange(index, 'durationUsed', e.target.value)}
                                                    >
                                                        <option value="">Vali</option>
                                                        <option value="Vähem kui 1 aasta">Vähem kui 1 aasta</option>
                                                        <option value="1–2 aastat">1–2 aastat</option>
                                                        <option value="3–5 aastat">3–5 aastat</option>
                                                        <option value="5+ aastat">5+ aastat</option>
                                                    </select>
                                                </div>

                                                <div className="pass-field pass-field--full">
                                                    <label className="pass-field-label" htmlFor={`skill-practice-${index}`}>
                                                        Kuidas sa seda oskust praktikas kasutad?
                                                    </label>
                                                    <textarea
                                                        id={`skill-practice-${index}`}
                                                        className="pass-field-input pass-field-textarea"
                                                        value={skill.practiceUsage}
                                                        onChange={(e) => handleChange(index, 'practiceUsage', e.target.value)}
                                                        rows={3}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    <button
                                        type="button"
                                        className="pass-add-language pass-add-skill"
                                        onClick={handleAddSkill}
                                    >
                                        <img src={PlusIcon} alt="" className="pass-add-language-icon" aria-hidden="true" />
                                        Lisa oskus
                                    </button>
                                </div>

                                <footer className="pass-form-footer">
                                    <button
                                        type="button"
                                        className="pass-nav-pill"
                                        aria-label="Eelmine samm"
                                        onClick={() => navigate('/pass/education')}
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

export default PassSkillInfo;
