import React, { useState, FormEvent } from 'react';
import './LoginPage.css';
// @ts-ignore – handled by bundler, image imported as URL string
import backgroundImage from '../../assets/login_gradient.png';
// @ts-ignore – handled by bundler, image imported as URL string
import googleLoginButton from '../../assets/googleloginbutton.webp';
import { useNavigate } from 'react-router-dom'; 

interface LoginPageProps {
    onShowTerms?: () => void;
}


function LoginPage({ onShowTerms }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Login submitted', { email, password, agreeToTerms, rememberMe });
  };

  return (
    <div
      className="login-page"
      style={{
        // Show gradient behind and the squiggle image on top
        backgroundImage: `url(${backgroundImage}), linear-gradient(135deg, #eff3ff 2%, #fbfaf8 57%, #ffecec 100%)`,
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
            <span>logi sisse muul viisil</span>
          </div>

          <button type="button" className="google-button">
            <img src={googleLoginButton} alt="Logi sisse Google'iga" className="google-button-image" />
          </button>

          <div className="button-group">
            <button type="submit" className="primary-button">Logi sisse</button>
            <button type="button" className="secondary-button">Loo kasutaja</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
