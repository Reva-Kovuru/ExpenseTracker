import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import './App.css'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import UserDashboard from './pages/UserDashboard'
import LandingPage from './pages/LandingPage'
import SignUpPage from './pages/SignUpPage'



function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/dashboard' element={<UserDashboard />} />
      </Routes>
    </>
  )
}

export default App
