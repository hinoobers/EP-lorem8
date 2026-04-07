import React, { useState, FormEvent } from 'react';
import './RegistrationPage.css';
import backgroundImage from '../../assets/register_bg.svg';
import googleLoginButton from '../../assets/googleloginbutton.webp';
import { useNavigate } from 'react-router-dom';

function RegistrationPage({ onShowTerms }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!agreeToTerms) {
      setError('Palun nõustu kasutustingimustega.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Paroolid ei kattu.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://evpass.pnglin.byenoob.com/auth/create-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          firstName,
          lastName,
          sunniaeg: birthDate
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Konto loomine ebaõnnestus');
        setLoading(false);
        return;
      }

      setSuccess('Konto loodud edukalt! Ümbersuunatakse sisselogimislehele...');
      setLoading(false);
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      console.error('Registration error:', error);
      setError('Serveriga ühenduse viga. Proovi hiljem uuesti.');
      setLoading(false);
    }
  };

  const handleTermsClick = (e) => {
    e.preventDefault();
    if (onShowTerms) {
      onShowTerms();
    } else {
      navigate('/terms');
    }
  };

  return (
    <div
      className="registration-page"
      style={{
        backgroundImage: `url(${backgroundImage}), linear-gradient(135deg, #eff3ff 2%, #fbfaf8 57%, #ffecec 100%)`,
      }}
    >
      <div className="registration-modal">
        <div className="modal-header">
          <span>Loo konto</span>
          <button
            className="close-button"
            aria-label="Close"
            onClick={() => navigate('/login')}
          >
            ✕
          </button>
        </div>

        <form className="registration-form" onSubmit={handleSubmit}>
          {error && <div className="error-message" style={{ color: '#d32f2f', padding: '10px', marginBottom: '15px', backgroundColor: '#ffebee', borderRadius: '4px', fontSize: '14px' }}>{error}</div>}
          {success && <div className="success-message" style={{ color: '#388e3c', padding: '10px', marginBottom: '15px', backgroundColor: '#e8f5e9', borderRadius: '4px', fontSize: '14px' }}>{success}</div>}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">Eesnimi</label>
              <input
                id="firstName"
                type="text"
                placeholder="Sisesta eesnimi"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Perekonna nimi</label>
              <input
                id="lastName"
                type="text"
                placeholder="Sisesta perekonna nimi"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input
                id="email"
                type="email"
                placeholder="Sisesta e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="birthDate">Sünniaeg</label>
              <input
                id="birthDate"
                type="date"
                placeholder="Sisesta sünniaeg"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">Parool</label>
              <input
                id="password"
                type="password"
                placeholder="Sisesta parool"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Kinnita parool</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Kinnita parool"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
              />
              <span className="checkbox-text">
                Nõustun kõigi{' '}
                <a href="#" onClick={handleTermsClick}>
                  kasutustingimustega
                </a>
                *
              </span>
            </label>

            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span className="checkbox-text">Mäleta mind 30 päeva</span>
            </label>
          </div>

          <button type="submit" className="registration-submit">
            Loo konto
          </button>

          <div className="divider">
            <span>Loo konto muul viisil</span>
          </div>

          <button type="button" className="google-button" onClick={() => { window.location.href = "https://evpass.pnglin.byenoob.com/auth/google";}}>
            <img
              src={googleLoginButton}
              alt="Loo konto Google'iga"
              className="google-button-image"
            />
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegistrationPage;
