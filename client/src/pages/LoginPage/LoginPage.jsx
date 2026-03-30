import React, { useState, FormEvent } from 'react';
import './LoginPage.css';
import backgroundImage from '../../assets/login_bg.svg';
import googleLoginButton from '../../assets/googleloginbutton.webp';
import { useNavigate } from 'react-router-dom'; 

function LoginPage({ onShowTerms }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted', { email, password, agreeToTerms, rememberMe });
    // For now, treat any non-empty credentials as a successful mock login
    if (email && password && agreeToTerms) {
      navigate('/home');
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

          <button type="button" className="google-button">
            <img src={googleLoginButton} alt="Logi sisse Google'iga" className="google-button-image" />
          </button>

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
