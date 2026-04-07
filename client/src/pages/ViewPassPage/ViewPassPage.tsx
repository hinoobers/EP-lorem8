// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ViewPassPage.css';

import Mail from '../../assets/dark/Mail.svg';
import Bell from '../../assets/dark/Bell.svg';
import ArrowLeft from '../../assets/dark/Arrow left.svg';
import Search from '../../assets/dark/Search.svg';

interface PassData {
  id: number;
  name: string;
  email: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    pilt: string;
  };
  workExperience: any[];
  educationInfo: any[];
  skills: any[];
  created_at: string;
  updated_at: string;
}

const ViewPassPage: React.FC = () => {
  const { passId } = useParams<{ passId: string }>();
  const [pass, setPass] = useState<PassData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPass = async () => {
      try {
        const response = await fetch(`https://evpass.pnglin.byenoob.com/api/view-pass/${passId}`);
        if (!response.ok) {
          throw new Error('Pass not found');
        }
        const data = await response.json();
        setPass(data);
      } catch (err) {
        setError((err as Error).message || 'Failed to load pass');
      } finally {
        setLoading(false);
      }
    };

    if (passId) {
      fetchPass();
    }
  }, [passId]);

  if (loading) {
    return (
      <div className="view-pass-page">
        <div className="view-pass-container">
          <div className="view-pass-loading">Laadin passi...</div>
        </div>
      </div>
    );
  }

  if (error || !pass) {
    return (
      <div className="view-pass-page">
        <div className="view-pass-container">
          <div className="view-pass-error">
            <h1>Pass ei leitud</h1>
            <p>{error || 'Selle passiga midagi pole valesti'}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="view-pass-page">
      <div className="view-pass-container">
        {/* Header */}
        <header className="view-pass-header">
          <div className="view-pass-header-top">
            <h1 className="view-pass-header-title">Pass</h1>
            <div className="view-pass-header-icons">
              <button
                type="button"
                className="view-pass-icon-button"
                aria-label="Ava postkast"
              >
                <img src={Mail} alt="" className="view-pass-icon-img" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="view-pass-icon-button"
                aria-label="Teavitused"
              >
                <img src={Bell} alt="" className="view-pass-icon-img" aria-hidden="true" />
              </button>
            </div>
          </div>
          <div className="view-pass-header-divider" />
        </header>

        {/* Main Content */}
        <main className="view-pass-main">
          {/* User Info Section */}
          <section className="view-pass-info-section">
            <div className="view-pass-user-card">
              <div className="view-pass-user-avatar" aria-hidden="true" >
                <img src={pass.personalInfo.pilt}/>
              </div>
              <div className="view-pass-user-details">
                <h2 className="view-pass-user-name">{pass.name}</h2>
                <p className="view-pass-user-email">{pass.email}</p>
              </div>
            </div>
          </section>

          {/* Work Experience Section */}
          {pass.workExperience && pass.workExperience.length > 0 && (
            <section className="view-pass-section">
              <h3 className="view-pass-section-title">Töökogemus</h3>
              <div className="view-pass-items">
                {pass.workExperience.map((experience: any, index: number) => (
                  <div key={index} className="view-pass-item">
                    <div className="view-pass-item-header">
                      <h4 className="view-pass-item-title">{experience.name || 'Nimeta kogemus'}</h4>
                      <span className="view-pass-item-meta">{experience.organisatsion}</span>
                    </div>
                    {experience.kirjeldus && (
                      <p className="view-pass-item-description">{experience.kirjeldus}</p>
                    )}
                    {experience.start && (
                      <p className="view-pass-item-date">
                        Aeg: {experience.start} - {experience.ajakulu || 'N/A'}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education Section */}
          {pass.educationInfo && pass.educationInfo.length > 0 && (
            <section className="view-pass-section">
              <h3 className="view-pass-section-title">Haridus</h3>
              <div className="view-pass-items">
                {pass.educationInfo.map((education: any, index: number) => (
                  <div key={index} className="view-pass-item">
                    <div className="view-pass-item-header">
                      <h4 className="view-pass-item-title">{education.name || 'Nimeta haridus'}</h4>
                      <span className="view-pass-item-meta">{education.school || 'Nimeta kool'}</span>
                    </div>
                    {education.kirjeldus && (
                      <p className="view-pass-item-description">{education.kirjeldus}</p>
                    )}
                    {education.start && (
                      <p className="view-pass-item-date">
                        Aeg: {education.start} - {education.ajakulu || 'N/A'}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills Section */}
          {pass.skills && pass.skills.length > 0 && (
            <section className="view-pass-section">
              <h3 className="view-pass-section-title">Oskused</h3>
              <div className="view-pass-skills">
                {pass.skills.map((skill: any, index: number) => (
                  <div key={index} className="view-pass-skill-tag">
                    <span className="view-pass-skill-name">{skill.name || 'Nimeta oskus'}</span>
                    {skill.level && (
                      <span className="view-pass-skill-level">{skill.level}</span>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Metadata */}
          <footer className="view-pass-footer">
            <p className="view-pass-meta-text">
              Loodud: {new Date(pass.created_at).toLocaleDateString('et-EE')}
            </p>
            {pass.updated_at && (
              <p className="view-pass-meta-text">
                Muudetud: {new Date(pass.updated_at).toLocaleDateString('et-EE')}
              </p>
            )}
          </footer>
        </main>
      </div>
    </div>
  );
};

export default ViewPassPage;
