// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SidebarComponent from '../../../components/sidebar/Sidebar';
import { useUser } from '../../../hooks/useUser';
import Mail from '../../../assets/dark/Mail.svg';
import Bell from '../../../assets/dark/Bell.svg';
import ArrowLeft from '../../../assets/dark/Arrow left.svg';
import Search from '../../../assets/dark/Search.svg';
import '../../HomePage/HomePageDark.css';
import './EditPassPage.css';

interface PassData {
  id: number;
  name: string;
  email: string;
  workExperience: any[];
  educationInfo: any[];
  skills: any[];
}

const EditPassPage: React.FC = () => {
  const { passId } = useParams<{ passId: string }>();
  const navigate = useNavigate();
  const { user, loading: userLoading } = useUser();

  const [pass, setPass] = useState<PassData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    workExperience: [],
    educationInfo: [],
    skills: []
  });

  const displayName = user ? `${user.displayName || ''}` : 'Kasutaja';
  const userEmail = user?.email || '';

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token && !userLoading) {
      navigate('/login');
    }
  }, [navigate, userLoading]);

  useEffect(() => {
    const fetchPass = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token || !passId) return;

        const response = await fetch(
          `https://evpass.pnglin.byenoob.com/api/pass/${passId}`,
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );

        if (!response.ok) {
          throw new Error('Pass not found or access denied');
        }

        const data = await response.json();
        setPass(data);

        // Parse arrays if they're strings
        let workExp = data.workExperience;
        let eduInfo = data.educationInfo;
        let skillsData = data.skills;

        if (typeof workExp === 'string') {
          try {
            workExp = JSON.parse(workExp);
          } catch (e) {
            workExp = [];
          }
        }
        if (typeof eduInfo === 'string') {
          try {
            eduInfo = JSON.parse(eduInfo);
          } catch (e) {
            eduInfo = [];
          }
        }
        if (typeof skillsData === 'string') {
          try {
            skillsData = JSON.parse(skillsData);
          } catch (e) {
            skillsData = [];
          }
        }

        setFormData({
          workExperience: Array.isArray(workExp) ? workExp : [],
          educationInfo: Array.isArray(eduInfo) ? eduInfo : [],
          skills: Array.isArray(skillsData) ? skillsData : []
        });
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

  const handleSavePass = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error('No authentication token');

      const response = await fetch(
        `https://evpass.pnglin.byenoob.com/api/pass/${passId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(formData)
        }
      );

      if (!response.ok) {
        throw new Error('Failed to save pass');
      }

      navigate('/pass');
    } catch (err) {
      setError((err as Error).message || 'Failed to save pass');
    } finally {
      setSaving(false);
    }
  };

  const handleAddWorkExperience = () => {
    setFormData({
      ...formData,
      workExperience: [
        ...formData.workExperience,
        { name: '', organisatsion: '', kirjeldus: '' }
      ]
    });
  };

  const handleAddEducation = () => {
    setFormData({
      ...formData,
      educationInfo: [
        ...formData.educationInfo,
        { name: '', school: '', kirjeldus: '' }
      ]
    });
  };

  const handleAddSkill = () => {
    setFormData({
      ...formData,
      skills: [
        ...formData.skills,
        { name: '', level: '' }
      ]
    });
  };

  const handleRemoveWorkExperience = (index: number) => {
    setFormData({
      ...formData,
      workExperience: formData.workExperience.filter((_, i) => i !== index)
    });
  };

  const handleRemoveEducation = (index: number) => {
    setFormData({
      ...formData,
      educationInfo: formData.educationInfo.filter((_, i) => i !== index)
    });
  };

  const handleRemoveSkill = (index: number) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((_, i) => i !== index)
    });
  };

  if (loading) {
    return (
      <div className="edit-pass-page">
        <div className="edit-pass-container">
          <div className="edit-pass-loading">Laadin passi...</div>
        </div>
      </div>
    );
  }

  if (error || !pass) {
    return (
      <div className="edit-pass-page">
        <div className="edit-pass-layout">
          <SidebarComponent
            activeNav="pass"
            userName={displayName}
            userEmail={userEmail}
            userPicture={user?.pilt}
          />
          <main className="edit-pass-main">
            <div className="edit-pass-error">
              <h1>Passi toimen ebaõnnestus</h1>
              <p>{error || 'Selle passiga midagi pole valesti'}</p>
              <button onClick={() => navigate('/pass')}>Tagasi passidele</button>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="edit-pass-page">
      <div className="edit-pass-layout">
        <SidebarComponent
          activeNav="pass"
          userName={displayName}
          userEmail={userEmail}
          userPicture={user?.pilt}
        />

        <main className="edit-pass-main">
          <div className="edit-pass-header-group">
            <header className="edit-pass-header">
              <div className="edit-pass-header-name">{displayName}</div>

              <div className="edit-pass-search" role="search">
                <img src={Search} alt="" className="edit-pass-search-icon-img" aria-hidden="true" />
                <input
                  type="search"
                  className="edit-pass-search-input"
                  placeholder="Otsi"
                  aria-label="Otsi"
                />
              </div>

              <div className="edit-pass-header-icons">
                <button
                  type="button"
                  className="edit-pass-icon-button"
                  aria-label="Ava postkast"
                >
                  <img src={Mail} alt="" className="edit-pass-icon-img" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="edit-pass-icon-button"
                  aria-label="Teavitused"
                >
                  <img src={Bell} alt="" className="edit-pass-icon-img" aria-hidden="true" />
                </button>
              </div>
            </header>
            <div className="edit-pass-header-divider" />
          </div>

          <button
            type="button"
            className="edit-pass-back-button"
            onClick={() => navigate('/pass')}
            aria-label="Tagasi passidele"
          >
            <img src={ArrowLeft} alt="" aria-hidden="true" />
          </button>

          <div className="edit-pass-shell">
            <section className="edit-pass-shell-body">
              <section className="edit-pass-content-card" aria-label="Passi redigeerimine">
                <header className="edit-pass-content-header">
                  <div className="edit-pass-content-title-row">
                    <div className="edit-pass-content-title-group">
                      <h1 className="edit-pass-content-title">Passi redigeerimine</h1>
                    </div>
                  </div>
                </header>

                {/* Work Experience Section */}
                <div className="edit-pass-section">
                  <div className="edit-pass-section-header">
                    <h2 className="edit-pass-section-title">Töökogemus</h2>
                    <button
                      type="button"
                      className="edit-pass-add-btn"
                      onClick={handleAddWorkExperience}
                    >
                      + Lisa
                    </button>
                  </div>
                  <div className="edit-pass-items">
                    {formData.workExperience && formData.workExperience.length > 0 ? (
                      formData.workExperience.map((exp, index) => (
                        <div key={index} className="edit-pass-item">
                          <div className="edit-pass-item-header">
                            <div className="edit-pass-item-inputs">
                              <input
                                type="text"
                                placeholder="Kogemuse nimi"
                                value={exp.name || ''}
                                onChange={(e) => {
                                  const updated = [...formData.workExperience];
                                  updated[index].name = e.target.value;
                                  setFormData({ ...formData, workExperience: updated });
                                }}
                                className="edit-pass-input"
                              />
                              <input
                                type="text"
                                placeholder="Organisatsioon"
                                value={exp.organisatsion || ''}
                                onChange={(e) => {
                                  const updated = [...formData.workExperience];
                                  updated[index].organisatsion = e.target.value;
                                  setFormData({ ...formData, workExperience: updated });
                                }}
                                className="edit-pass-input"
                              />
                            </div>
                            <button
                              type="button"
                              className="edit-pass-remove-btn"
                              onClick={() => handleRemoveWorkExperience(index)}
                              title="Kustuta"
                            >
                              ✕
                            </button>
                          </div>
                          <textarea
                            placeholder="Kirjeldus"
                            value={exp.kirjeldus || ''}
                            onChange={(e) => {
                              const updated = [...formData.workExperience];
                              updated[index].kirjeldus = e.target.value;
                              setFormData({ ...formData, workExperience: updated });
                            }}
                            className="edit-pass-input edit-pass-textarea"
                          />
                        </div>
                      ))
                    ) : (
                      <p className="edit-pass-empty-message">Töökogemust pole lisatud. Lisa üks, et alustada!</p>
                    )}
                  </div>
                </div>

                {/* Education Section */}
                <div className="edit-pass-section">
                  <div className="edit-pass-section-header">
                    <h2 className="edit-pass-section-title">Haridus</h2>
                    <button
                      type="button"
                      className="edit-pass-add-btn"
                      onClick={handleAddEducation}
                    >
                      + Lisa
                    </button>
                  </div>
                  <div className="edit-pass-items">
                    {formData.educationInfo && formData.educationInfo.length > 0 ? (
                      formData.educationInfo.map((edu, index) => (
                        <div key={index} className="edit-pass-item">
                          <div className="edit-pass-item-header">
                            <div className="edit-pass-item-inputs">
                              <input
                                type="text"
                                placeholder="Hariduse nimi"
                                value={edu.name || ''}
                                onChange={(e) => {
                                  const updated = [...formData.educationInfo];
                                  updated[index].name = e.target.value;
                                  setFormData({ ...formData, educationInfo: updated });
                                }}
                                className="edit-pass-input"
                              />
                              <input
                                type="text"
                                placeholder="Kool"
                                value={edu.school || ''}
                                onChange={(e) => {
                                  const updated = [...formData.educationInfo];
                                  updated[index].school = e.target.value;
                                  setFormData({ ...formData, educationInfo: updated });
                                }}
                                className="edit-pass-input"
                              />
                            </div>
                            <button
                              type="button"
                              className="edit-pass-remove-btn"
                              onClick={() => handleRemoveEducation(index)}
                              title="Kustuta"
                            >
                              ✕
                            </button>
                          </div>
                          <textarea
                            placeholder="Kirjeldus"
                            value={edu.kirjeldus || ''}
                            onChange={(e) => {
                              const updated = [...formData.educationInfo];
                              updated[index].kirjeldus = e.target.value;
                              setFormData({ ...formData, educationInfo: updated });
                            }}
                            className="edit-pass-input edit-pass-textarea"
                          />
                        </div>
                      ))
                    ) : (
                      <p className="edit-pass-empty-message">Haridust pole lisatud. Lisa üks, et alustada!</p>
                    )}
                  </div>
                </div>

                {/* Skills Section */}
                <div className="edit-pass-section">
                  <div className="edit-pass-section-header">
                    <h2 className="edit-pass-section-title">Oskused</h2>
                    <button
                      type="button"
                      className="edit-pass-add-btn"
                      onClick={handleAddSkill}
                    >
                      + Lisa
                    </button>
                  </div>
                  <div className="edit-pass-items">
                    {formData.skills && formData.skills.length > 0 ? (
                      formData.skills.map((skill, index) => (
                        <div key={index} className="edit-pass-item">
                          <div className="edit-pass-item-header">
                            <div className="edit-pass-item-inputs">
                              <input
                                type="text"
                                placeholder="Oskuse nimi"
                                value={skill.name || ''}
                                onChange={(e) => {
                                  const updated = [...formData.skills];
                                  updated[index].name = e.target.value;
                                  setFormData({ ...formData, skills: updated });
                                }}
                                className="edit-pass-input"
                              />
                              <select
                                value={skill.level || ''}
                                onChange={(e) => {
                                  const updated = [...formData.skills];
                                  updated[index].level = e.target.value;
                                  setFormData({ ...formData, skills: updated });
                                }}
                                className="edit-pass-input"
                              >
                                <option value="">Vali tase</option>
                                <option value="algaja">Algaja</option>
                                <option value="kesk">Keskmine</option>
                                <option value="ekspert">Ekspert</option>
                              </select>
                            </div>
                            <button
                              type="button"
                              className="edit-pass-remove-btn"
                              onClick={() => handleRemoveSkill(index)}
                              title="Kustuta"
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="edit-pass-empty-message">Oskusi pole lisatud. Lisa üks, et alustada!</p>
                    )}
                  </div>
                </div>

                <footer className="edit-pass-footer">
                  <button
                    type="button"
                    className="edit-pass-save-button"
                    onClick={handleSavePass}
                    disabled={saving}
                  >
                    {saving ? 'Salvestan...' : 'Salvesta muutused'}
                  </button>
                  <button
                    type="button"
                    className="edit-pass-cancel-button"
                    onClick={() => navigate('/pass')}
                    disabled={saving}
                  >
                    Tühista
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

export default EditPassPage;
