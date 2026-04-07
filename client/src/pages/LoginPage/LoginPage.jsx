import React, { useState, FormEvent } from 'react';
import './LoginPage.css';
import backgroundImage from '../../assets/login_bg.svg';
import googleLoginButton from '../../assets/googleloginbutton.webp';
import { useNavigate } from 'react-router-dom';
import { setAuthToken } from '../../utils/authApi';

function LoginPage({ onShowTerms }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!agreeToTerms) {
      setError('Pead nõustuma kasutustingimustega');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('https://evpass.pnglin.byenoob.com/auth/credentials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Sisselogimine ebaõnnestus');
        setLoading(false);
        return;
      }

      // Save token and navigate
      if (data.token) {
        setAuthToken(data.token);
        navigate('/home_dark');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Serveriga ühenduse viga. Proovi hiljem uuesti.');
      setLoading(false);
    }
  };

  return (
    <div
      className="login-page"
      style={{
        backgroundImage: `url(${backgroundImage})`
      }}
    >
      <div className="login-modal">
        <div className="modal-header">
          <span>Logi sisse või loo konto</span>
          <button className="close-button" aria-label="Close" onClick={() => navigate("/")}>✕</button>
        </div>

        <h1 className="modal-title">Ettevõtlikkuse pass</h1>

        {error && <div className="error-message" style={{ color: '#d32f2f', padding: '10px', marginBottom: '15px', backgroundColor: '#ffebee', borderRadius: '4px', fontSize: '14px' }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              placeholder="Sisesta e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <div className="label-row">
              <label htmlFor="password">Parool</label>
              <a href="#" className="forgot-password">Taasta parool</a>
            </div>
            <input
              type="password"
              id="password"
              placeholder="Sisesta parool"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="checkbox-group">
            <label className="checkbox-label checkbox-label--terms">
              <input
                type="checkbox"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
              />
              <span className="checkbox-text">
                Nõustun kõigi <a href="#" onClick={(e) => {e.preventDefault(); navigate('/terms'); }}>kasutustingimustega</a>*
              </span>
            </label>

            <label className="checkbox-label checkbox-label--remember">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span className="checkbox-text">Mäleta kasutajat 30ks päevaks</span>
            </label>
          </div>

          <div className="divider">
            <span>Logi sisse muul viisil</span>
          </div>

          <button type="button" className="google-button" onClick={() => { window.location.href = "https://evpass.pnglin.byenoob.com/auth/google";}}>
            <img src={googleLoginButton} alt="Logi sisse Google'iga" className="google-button-image" />
          </button>
              {loading ? 'Logime sisse...' : 'Logi sisse'}
            
          <div className="button-group">
            <button type="submit" className="primary-button">Logi sisse</button>
            <button
              type="button"
              className="secondary-button"
              onClick={() => navigate('/register')}
            >
              Loo kasutaja
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
