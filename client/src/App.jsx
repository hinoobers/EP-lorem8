import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import React from 'react'
// import reactLogo from './assets/react.svg'
import './App.css'
import { useState } from 'react' 

import LandingPage from './pages/LandingPage/LandingPage'
import LoginPage from './pages/LoginPage/LoginPage'
import TermsOfUse from './pages/TermsOfUse/TermsOfUse'
import RegistrationPage from './pages/RegistrationPage/RegistrationPage'
import HomePage from './pages/HomePage/HomePage'
import PassPersonalInfo from './pages/Pass/PassPersonalInfo/PassPersonalInfo'
import Footer from './components/Footer/Footer'

function App() {
  const [showTerms, setShowTerms] = useState(false) 
  
  
  return (
    <BrowserRouter>

      {/* routes */}
      <Routes>
        <Route path='/' element={<LandingPage />} />
        {/* <Route path="*" element={<PageNotFound />} /> */}
        <Route path='/login' element={<LoginPage />} />
        <Route path='/terms' element={<TermsOfUse />} />
        <Route path='/register' element={<RegistrationPage />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/pass' element={<PassPersonalInfo />} />
      </Routes>

      <Footer />

    </BrowserRouter>
  )
}

export default App