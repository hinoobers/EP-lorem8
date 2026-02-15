import { useNavigate } from 'react-router-dom';
import './TermsOfUse.css';
import backgroundImage from '../../assets/login_gradient.png';

function TermsOfUse() {
  const navigate = useNavigate();

  return (
    <div className="terms-page" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="terms-modal">
        <div className="terms-header">
          <h2 className="terms-title">Kasutustingimused</h2>
          <div className="terms-header-right">
            <span className="terms-date">Viimati uuendatud: 01.01.2026</span>
            <button className="close-button" onClick={() => navigate(-1)} aria-label="Close">✕</button>
          </div>
        </div>

        <div className="terms-content">
          <section className="terms-section">
            <h3>1. Mis on ettevõtlikkuse pass?</h3>
            <p>Ettevõtlikkuse pass on digitaalne keskkond, kus kasutaja saab:</p>
            <ul>
              <li>koguda ja kirjeldada oma õppe-, projekti- ja vabatahtlikke kogemusi;</li>
              <li>lisada tõendeid (failid, lingid, pildid);</li>
              <li>reflekteerida õpitut ja arendatud oskusi;</li>
              <li>luua jagatava kokkuvõtte (nt portfoolio või PDF).</li>
            </ul>
          </section>

          <section className="terms-section">
            <h3>2. Kes võib passi kasutada</h3>
            <p>Ettevõtlikkuse passi võivad kasutada õpilased, noored ja teised huvilised.</p>
            <p>Alla 18-aastased kasutajad kinnitavad, et neil on lapsevanema või seadusliku esindaja nõusolek (kui see on nõutud).</p>
          </section>

          <section className="terms-section">
            <h3>3. Kasutaja vastutus</h3>
            <p>Kasutaja vastutab selle eest, et:</p>
            <ul>
              <li>sisestatud info on tõene ja aus;</li>
              <li>lisatud materjalid (failid, pildid, tekstid) ei riku autoriõigusi;</li>
              <li>teiste inimeste andmeid (nt kinnitaja e-post) kasutatakse nende teadmisel.</li>
            </ul>
          </section>

          <section className="terms-section">
            <h3>Valeinfo või sobimatu sisu korral on platvormil õigus vastav sisu eemaldada.</h3>
          </section>

          <section className="terms-section">
            <h3>4. Kinnitaja roll</h3>
            <ul>
              <li>Kasutaja võib lisada kinnitaja (nt õpetaja, juhendaja, mentor).</li>
              <li>Kinnitaja saab vaadata ainult talle saadetud kogemuse kirjet.</li>
              <li>Kinnitaja otsustab, kas ta kinnitab kogemuse või mitte.</li>
            </ul>
          </section>

          <section className="terms-section">
            <h3>5. Andmete kasutamine ja privaatsus</h3>
            <ul>
              <li>Kasutaja andmeid kasutatakse ainult ettevõtlikkuse passi toimimiseks.</li>
              <li>Andmeid ei jagata kolmandatele osapooltele ilma kasutaja nõusolekuta.</li>
              <li>Kasutaja saab ise otsustada, kas ja kellega ta oma passi jagab.</li>
            </ul>
          </section>

          <section className="terms-section">
            <h3>Täpsem info on kirjas privaatsustingimustes.</h3>
          </section>

          <section className="terms-section">
            <h3>6. Sisu omandiõigus</h3>
            <ul>
              <li>Kõik kasutaja loodud sisu kuulub kasutajale endale.</li>
              <li>Platvorm ei kasuta kasutaja töid reklaamiks ega muudel eesmärkidel ilma loata.</li>
            </ul>
          </section>

          <section className="terms-section">
            <h3>7. Passi jagamine</h3>
            <ul>
              <li>Kasutaja saab oma passi jagada (nt ülikool, tööandja).</li>
              <li>Jagamine on alati kasutaja kontrolli all ja seda saab igal ajal lõpetada.</li>
            </ul>
          </section>

          <section className="terms-section">
            <h3>8. Süsteemi muutmine ja katkestused</h3>
            <ul>
              <li>Platvormi funktsioone võidakse ajas täiendada või muuta.</li>
              <li>Võimalike hooldustööde või tehniliste katkestuste eest teavitatakse võimalusel ette.</li>
            </ul>
          </section>

          <section className="terms-section">
            <h3>9. Kasutustingimuste muutmine</h3>
            <ul>
              <li>Kasutustingimusi võidakse ajakohastada.</li>
              <li>Olulistest muudatustest teavitatakse kasutajaid.</li>
            </ul>
          </section>

          <section className="terms-section">
            <h3>10. Nõustumine</h3>
            <p>Ettevõtlikkuse passi kasutama asudes kinnitab kasutaja, et:</p>
            <ul>
              <li>on tingimused läbi lugenud;</li>
              <li>mõistab neid;</li>
              <li>nõustub nendega.</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

export default TermsOfUse;
