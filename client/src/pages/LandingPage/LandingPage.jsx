import Navbar from "../../components/Navbar/Navbar"
import gradientSquiggle from "../../assets/gradient squiggle.webp"
import "./LandingPage.css"
import EV from "../../assets/ev.png" 
import Kursus from "../../assets/kursus.png" 
import Stats from "../../assets/stats.png" 
const LandingPage = () => {
  return (
    <div className="landing">
      <img
        src={gradientSquiggle}
        alt=""
        aria-hidden="true"
        className="landing-bg"
        fetchPriority="high"
      />
      <Navbar />

      <main className="hero">
        <section className="hero-text">
          <h1>Ettevõtlikkuse pass</h1>
          <p>
            Kõik, mida oled õppinud ja saavutanud ühes passis, kergesti nähtav ja jagatav.
          </p>
          <button className="cta">Loo enda pass!</button>
        </section>

        <section className="hero-cards" aria-label="Näidiskaardid">
          <div className="card stats-card">
            <img src={Stats} alt="Statistika" className="stats-img"/>
          </div>

          <div className="card profile-card">
            <img src={EV} alt="Profiilipilt" className="profile-img"/>
          </div>

          <div className="card course-card">
            <img src={Kursus} alt="Kursus" className="course-img"/>
          </div>
        </section>
      </main>
    </div>
  )
}

export default LandingPage