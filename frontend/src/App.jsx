import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import './App.css'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import UserDashboard from './pages/UserDashboard'
import LandingPage from './pages/LandingPage'
import SignUpPage from './pages/SignUpPage'
import VerifyMailPage from './pages/VerifyMailPage'
import ExpensesPage from './pages/ExpensesPage'
import CreateExpensePage from './pages/CreateExpensePage'
import PaymentMethodsPage from './pages/PaymentMethodsPage'
import CreatePaymentMethodPage from './pages/CreatePaymentMethodPage'



function App() {
  return (
    <>
      <Routes>
        {/* The Authorization Routes */}
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/verify-email' element={<VerifyMailPage />} />
        {/* The ExpenseTracker Routes */}
        <Route path='/dashboard' element={<UserDashboard />} />
        <Route path='/expense-details' element={<ExpensesPage />} />
        <Route path='/create-expense-details' element={<CreateExpensePage />} />
        <Route path='/paymentmethod-details' element={<PaymentMethodsPage />} />
        <Route path='/create-paymentmethod-details' element={<CreatePaymentMethodPage />} />
      
      </Routes>
    </>
  )
}

export default App
