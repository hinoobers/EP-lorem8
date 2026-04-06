import './Navbar.css'
import { useNavigate } from 'react-router-dom' 

const Navbar = () => {
  const navigate = useNavigate()
  return (
    <nav>
      <div className='container-1'>
        <button className='nav-btn'>Kontakt</button>
        <button className='nav-btn'>Meist</button>
      </div>
      <div className='container-2'>
        <button className='nav-btn login-btn' onClick={() => navigate("/login")}>Logi sisse</button>
      </div>
    </nav>
  )
}

export default Navbar