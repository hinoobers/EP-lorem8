import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import React from 'react'
// import reactLogo from './assets/react.svg'
import './App.css'

import LandingPage from './pages/LandingPage/LandingPage'
import Footer from './components/Footer/Footer'

function App() {

  return (
    <BrowserRouter>

      {/* routes */}
      <Routes>
        <Route path='/' element={<LandingPage />} />
        {/* <Route path="*" element={<PageNotFound />} /> */}
      </Routes>

      <Footer />

    </BrowserRouter>
  )
}

export default App