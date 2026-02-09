import { LuInstagram } from 'react-icons/lu'
import './Footer.css'
import leen_logo_must from '../../assets/LEEN_logo_must.webp'

const Footer = () => {
  return (
    <footer>
      <section className="footer-section">

        <div className="footer-container-img-text">
          <img
            src={leen_logo_must}
            alt="leen_logo_must"
            fetchPriority="high"
            className="footer-img"
          />
          <div className="footer-container-inner-text">
            <ul>
              <li>
                <a href="#">Küpsised</a>
              </li>
              <li>
                <a href="#">Minu konto</a>
              </li>
              <li>
                <a href="#">Avaleht</a>
              </li>
              <li>
                <a href="#">Abi</a>
              </li>
            </ul>
            <p>&#169; 2026 Ettevõtlikkuse pass</p>
          </div>
        </div>

        <div className="footer-container-contact">
          <p>Telefon: +372 000 000 00</p>
          <p>E-mail: mariliis.maremae@tartumaa.ee</p>
        </div>

        <div className="footer-text-icons-container">
          <div className="footer-ref-icons">
            <ul id="sicons">
              <li>
                <a href="#">
                  <LuInstagram />
                </a>
              </li>
            </ul>
          </div>
        </div>

      </section>

    </footer>
  )
}

export default Footer