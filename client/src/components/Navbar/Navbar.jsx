import './Navbar.css'

const Navbar = () => {
  return (
    <nav>
      <div className='container-1'>
        <button className='nav-btn'>Kontakt</button>
        <button className='nav-btn'>Meist</button>
      </div>
      <div className='container-2'>
        <button className='nav-btn login-btn'>Logi sisse</button>
      </div>
    </nav>
  )
}

export default Navbar