import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.scss'
import './index.css'
import Header from './components/Header/Header'
import Home from './components/Home/Home'
import MovieDetail from './components/MovieDetail/MovieDetail'
import Footer from './components/Footer/Footer'
import PageNotFound from './components/PageNotFound/PageNotFound'
import Login from './components/Login/Login'
import Signup from './components/Register/Register'
import Form from './components/Form/Form'

function App() {

  return (
    <div className="app">
      <Router>
        <Header />
        <div className="container">
          <Routes>
            <Route path='/home' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/regi' element={<Signup />} />
            <Route path='/cre' element={<Form />} />
            <Route path='/movie/:imdbID' element={<MovieDetail />} />
            <Route element={<PageNotFound />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  )
}

export default App
