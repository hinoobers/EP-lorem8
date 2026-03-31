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
import HomePageDark from './pages/HomePage/HomePageDark'
import PassPersonalInfo from './pages/Pass/PassPersonalInfo/PassPersonalInfo'
import PassWorkExperience from './pages/Pass/PassWorkExperience/PassWorkExperience'
import PassEducationInfo from './pages/Pass/PassEducationInfo/PassEducationInfo'
import SupportPage from './pages/Support/SupportPage'
import Footer from './components/Footer/Footer'
import KogemuseLisamisPage from './pages/KogemuseLisamisPage/KogemuseLisamisPage'

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
        <Route path="/home_dark" element={<HomePageDark/>}/>
        <Route path='/pass' element={<PassPersonalInfo />} />
        <Route path='/pass/work-experience' element={<PassWorkExperience />} />
        <Route path='/pass/education' element={<PassEducationInfo />} />
        <Route path='/support' element={<SupportPage />} />
        <Route path="/kogemuse-lisamine" element={<KogemuseLisamisPage />} />
      </Routes>

      <Footer />

    </BrowserRouter>
  )
}

export default App