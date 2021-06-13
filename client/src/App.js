import React, { useState, useCallback } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import './App.css'
import SideBar from './components/sidebar.component'
import AppUI from './components/app.component'

export default function App() {
  const [properties, setProperties] = useState({
    activeTab: ''
  })
  const tabCallback = useCallback(a => setProperties(a), [])
  return (
    <Router>
      <SideBar properties={tabCallback} />
      <AppUI properties={properties} />
    </Router>
  )
}