import { useState } from 'react';
import './LoginPage.css';
import backgroundImage from '../../assets/login_gradient.png';
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login submitted', { email, password, agreeToTerms, rememberMe });
  };

  return (
    <div className="login-page" style={{ backgroundImage: `url(${backgroundImage})` }}>
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
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
              />
              <span className="checkbox-text">
                Nõustun kõigi <a href="#" onClick={(e) => {e.preventDefault(); navigate('/terms'); }}>kasutustingimustega</a>*
              </span>
            </label>

            <label className="checkbox-label">
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
            <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
              <g fill="none" fillRule="evenodd">
                <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
                <path d="M9.003 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.96v2.332C2.44 15.983 5.485 18 9.003 18z" fill="#34A853"/>
                <path d="M3.964 10.712c-.18-.54-.282-1.117-.282-1.71 0-.593.102-1.17.282-1.71V4.96H.957C.347 6.175 0 7.55 0 9.002c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                <path d="M9.003 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.464.891 11.428 0 9.003 0 5.485 0 2.44 2.017.96 4.958L3.967 7.29c.708-2.127 2.692-3.71 5.036-3.71z" fill="#EA4335"/>
              </g>
            </svg>
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
