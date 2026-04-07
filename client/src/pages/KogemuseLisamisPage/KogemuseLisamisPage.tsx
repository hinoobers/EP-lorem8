import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarComponent from '../../components/sidebar/Sidebar';
import { useUser } from '../../hooks/useUser';
import Search from '../../assets/dark/Search.svg';
import Mail from '../../assets/dark/Mail.svg';
import Bell from '../../assets/dark/Bell.svg';
import '../HomePage/HomePageDark.css';
import './KogemuseLisamisPage.css';

function KogemuseLisamisPage() {
  const navigate = useNavigate();
  const { user, loading, error } = useUser();
  const displayName = user ? `${user.displayName || ''}` : 'Kasutaja';
  const userEmail = user?.email || '';

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token && !loading) {
      navigate('/login');
    }
  }, [navigate, loading]);
  const [formData, setFormData] = useState({
    name: '',
    organisatsion: '',
    type: '',
    start: '',
    ajakulu: '',
    roll: '',
    kirjeldus: '',
    reflection: '',
    oskused: []
  });
  const [skills, setSkills] = useState(['', '']);
  const [loading_submit, setLoadingSubmit] = useState(false);
  const [message, setMessage] = useState('');
  const [certificateFile, setCertificateFile] = useState(null);

  console.log('KogemuseLisamisPage - userPicture prop:', user?.pilt);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSkillChange = (index, value) => {
    const newSkills = [...skills];
    newSkills[index] = value;
    setSkills(newSkills);
    setFormData(prev => ({
      ...prev,
      oskused: newSkills.filter(skill => skill.trim() !== '')
    }));
  };

  const handleAddSkill = () => {
    setSkills(prev => [...prev, '']);
  };

  const handleCertificateChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Data = event.target.result.split(',')[1];
        setCertificateFile({
          filename: file.name,
          filedata: base64Data
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingSubmit(true);
    setMessage('');

    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setMessage('Authentifitseerimine puudub');
        setLoadingSubmit(false);
        return;
      }

      const dataToSend = {
        ...formData,
        oskused: skills.filter(skill => skill.trim() !== ''),
        certificateFile: certificateFile
      };

      const response = await fetch('https://evpass.pnglin.byenoob.com/api/add-experience', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(dataToSend)
      });

      const result = await response.json();
      if (response.ok) {
        setMessage('Kogemus lisatud edukalt!');
        // Redirect to verification page immediately
        navigate(`/kogemus-lisatud/${result.experienceId}`);
      } else {
        setMessage(result.message || 'Viga kogemuse lisamisel');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Viga: ' + error.message);
    } finally {
      setLoadingSubmit(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      organisatsion: '',
      type: '',
      start: '',
      ajakulu: '',
      roll: '',
      kirjeldus: '',
      reflection: '',
      oskused: []
    });
    setSkills(['', '']);
    setCertificateFile(null);
    setMessage('');
  };

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
            <div className="kogemus-form-container">
              <h1 className="kogemus-form-title">Kogemuse lisamine</h1>
              <p className="kogemus-form-subtitle">*kohutuslikkud väljad</p>

              {message && (
                <div style={{
                  padding: '10px',
                  marginBottom: '20px',
                  backgroundColor: message.includes('edukalt') ? '#d4edda' : '#f8d7da',
                  color: message.includes('edukalt') ? '#155724' : '#721c24',
                  borderRadius: '4px'
                }}>
                  {message}
                </div>
              )}

              <form className="kogemus-form" onSubmit={handleSubmit}>
                <div className="kogemus-form-group">
                  <label className="kogemus-label">Kogemuse / kursuse nimetus*</label>
                  <input
                    type="text"
                    className="kogemus-input"
                    placeholder=""
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="kogemus-form-group">
                  <label className="kogemus-label">Organisatsiooni / kool / platvorm*</label>
                  <input
                    type="text"
                    className="kogemus-input"
                    placeholder=""
                    name="organisatsion"
                    value={formData.organisatsion}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="kogemus-form-row">
                  <div className="kogemus-form-group">
                    <label className="kogemus-label">Kogemuse tüüp*</label>
                    <select
                      className="kogemus-select"
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Valige tüüp</option>
                      <option value="kursus">Kursus</option>
                      <option value="töökogemus">Töökogemus</option>
                      <option value="praktika">Praktika</option>
                      <option value="projekt">Projekt</option>
                      <option value="vabatahtlik_tegevus">Vabatahtlik tegevus</option>
                      <option value="erasmus">Erasmus+</option>
                    </select>
                  </div>

                  <div className="kogemus-form-group">
                    <label className="kogemus-label">Alguskuupäev*</label>
                    <input
                      type="date"
                      className="kogemus-input"
                      placeholder=""
                      name="start"
                      value={formData.start}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="kogemus-form-group">
                    <label className="kogemus-label">Ajakulu (tundides)*</label>
                    <input
                      type="number"
                      className="kogemus-input"
                      placeholder="nt. 28"
                      name="ajakulu"
                      value={formData.ajakulu}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="kogemus-form-group">
                  <label className="kogemus-label">Roll / amet / Õppsesuund</label>
                  <input
                    type="text"
                    className="kogemus-input"
                    placeholder="(nt praktikant, disainer, osaleja)"
                    name="roll"
                    value={formData.roll}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="kogemus-form-group">
                  <label className="kogemus-label">Mida sa tegid või õppisid?</label>
                  <textarea
                    className="kogemus-textarea"
                    placeholder="(Liinikreidus 2-4 lausega)"
                    rows={4}
                    name="kirjeldus"
                    value={formData.kirjeldus}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="kogemus-form-group">
                  <label className="kogemus-label">Milliseid oskusi kasutasid või arendasid?</label>
                  <div className="kogemus-skills">
                    {skills.map((skill, index) => (
                      <input
                        key={index}
                        type="text"
                        className="kogemus-skill-input"
                        placeholder={`Oskus ${index + 1}`}
                        value={skill}
                        onChange={(e) => handleSkillChange(index, e.target.value)}
                        style={{
                          padding: '8px 12px',
                          border: '1px solid #ddd',
                          borderRadius: '4px',
                          marginRight: '8px',
                          marginBottom: '8px'
                        }}
                      />
                    ))}
                    <button
                      type="button"
                      className="kogemus-add-skill-btn"
                      onClick={handleAddSkill}
                    >
                      <span className="kogemus-plus">+</span>
                    </button>
                  </div>
                </div>

                <label className="kogemus-certificate-btn">
                  Lisa sertifikaat failina
                  <input
                    type="file"
                    style={{ display: 'none' }}
                    onChange={handleCertificateChange}
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  />
                </label>
                {formData.certificate && (
                  <p style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>
                    Fail: {formData.certificate}
                  </p>
                )}

                <div className="kogemus-form-actions">
                  <button
                    type="button"
                    className="kogemus-btn-cancel"
                    onClick={handleCancel}
                  >
                    Tühista
                  </button>
                  <button
                    type="submit"
                    className="kogemus-btn-save"
                    disabled={loading_submit}
                  >
                    {loading_submit ? 'Salvestamine...' : 'Salvesta'}
                  </button>
                </div>
              </form>
            </div>

            <div className="kogemus-right-panel">
              <div className="kogemus-course-card">
                <h3 className="kogemus-card-title">Complete Web & Mobile Designer: UI/UX, Figma, +more</h3>
                <p className="kogemus-card-source">Udemy</p>

                <div className="kogemus-card-tags">
                  <span className="kogemus-tag">Web Design</span>
                  <span className="kogemus-tag">UI/UX Design</span>
                  <span className="kogemus-tag">HTML</span>
                  <span className="kogemus-tag">CSS</span>
                  <span className="kogemus-tag">Figma</span>
                </div>

                <p className="kogemus-card-description">
                  Läbisin UI/UX ja veebidisaini kursuse, kus õppisin kasutajaksekset disaini, Figma prototüüpimist ning responsive veeb- ja mobiilsidisaini põhimõtteid.
                </p>

                <div className="kogemus-card-meta">
                  <span className="kogemus-card-date">23.03.2019</span>
                  <span className="kogemus-card-duration">28 Tundi</span>
                  <span className="kogemus-card-status">Osalesin</span>
                </div>

                <button type="button" className="kogemus-card-btn">
                  vaata sertifikaati
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default KogemuseLisamisPage;
