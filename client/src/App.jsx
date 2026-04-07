import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import React from 'react'
// import reactLogo from './assets/react.svg'
import './App.css'
import { useState, useEffect } from 'react' 

import LandingPage from './pages/LandingPage/LandingPage'
import LoginPage from './pages/LoginPage/LoginPage'
import TermsOfUse from './pages/TermsOfUse/TermsOfUse'
import RegistrationPage from './pages/RegistrationPage/RegistrationPage'
import HomePage from './pages/HomePage/HomePage'
import HomePageDark from './pages/HomePage/HomePageDark'
import PassPersonalInfo from './pages/Pass/PassPersonalInfo/PassPersonalInfo'
import PassWorkExperience from './pages/Pass/PassWorkExperience/PassWorkExperience'
import PassEducationInfo from './pages/Pass/PassEducationInfo/PassEducationInfo'
import PassSkillInfo from './pages/Pass/PassSkillInfo/PassSkillInfo'
import PassFormEnd from './pages/Pass/PassFormEnd/PassFormEnd'
import SupportPage from './pages/Support/SupportPage'
import Footer from './components/Footer/Footer'
import KogemuseLisamisPage from './pages/KogemuseLisamisPage/KogemuseLisamisPage'
import KogemustePage from './pages/Kogemused/KogemustePage'
import KogemuseLisatudPage from './pages/KogemuseLisatudPage/KogemuseLisatudPage'

function App() {
  const [showTerms, setShowTerms] = useState(false) 
  
  useEffect(() => {
    // Extract token from URL query parameter and save it
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    
    if (token) {
      // Save token to localStorage
      localStorage.setItem('authToken', token);
      
      // Remove token from URL for cleaner history
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [])
  
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
        <Route path="/home_dark" element={<HomePageDark/>}/>
        <Route path='/pass' element={<PassPersonalInfo />} />
        <Route path='/pass/work-experience' element={<PassWorkExperience />} />
        <Route path='/pass/education' element={<PassEducationInfo />} />
        <Route path='/pass/skills' element={<PassSkillInfo />} />
        <Route path='/pass/end' element={<PassFormEnd />} />
        <Route path='/support' element={<SupportPage />} />
        <Route path="/kogemused" element={<KogemustePage  />} />
        <Route path="/kogemuse-lisamine" element={<KogemuseLisamisPage />} />
        <Route path="/kogemus-lisatud/:experienceId" element={<KogemuseLisatudPage />} />
      </Routes>

      <Footer />

    </BrowserRouter>
  )
}

export default App