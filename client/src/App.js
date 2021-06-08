import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import './App.css'
import SideBar from './components/sidebar.component'
import AppUI from './components/app.component'

export default function App() {
  return (
    <Router>
      <SideBar />
      <AppUI />
    </Router>
  )
}