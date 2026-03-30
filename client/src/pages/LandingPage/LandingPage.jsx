import Navbar from "../../components/Navbar/Navbar"
import landingPageBg from "../../assets/landing_page_bg_v2.svg"
import "./LandingPage.css"
import { useNavigate } from "react-router-dom" 

const LandingPage = () => {
  const navigate = useNavigate()
  return (
    <div className="landing">
      <Navbar />
      <img
        src={landingPageBg}
        alt="Background image"
        aria-hidden="true"
        className="landing-bg"
        fetchPriority="high"
      />

      <main className="hero">
        <section className="hero-text">
          <h1>Ettevõtlikkuse pass</h1>
          <p>
            Kõik, mida oled õppinud ja saavutanud ühes passis, kergesti nähtav ja jagatav.
          </p>
          <button className="cta" onClick={() => navigate("/login")}>Loo enda pass!</button>
        </section>
      </main>
    </div>
  )
}

export default LandingPage