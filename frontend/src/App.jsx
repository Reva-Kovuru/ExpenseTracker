import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles';

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

const theme = createTheme({
  palette: {
    background: {
      paper: '#d7d7a1ff', // Your desired background color
    },
    cardTextColors: {
      main: '#000000ff',
      light: '#000000ff',
      dark: '#ffffffff',
      contrastText: '#c6d7d2ff',
    },
    buttonColors: {
      main: '#2380c3ff',
      light: '#2380c3ff',
      dark: '#5fafedff',
      contrastText: '#c6d7d2ff',
    },
  },
});


function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
    </>
  )
}

export default App
