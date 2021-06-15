import React, { useState, useEffect, useCallback } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import './App.css'
import SideBar from './components/sidebar.component'
import AppUI from './components/app.component'

export default function App() {
  const [properties, setProperties] = useState({
    activeTab: 'home'
  })

  useEffect(() => {
    const backdrop = document.querySelector('.backdrop-overlay')
    for (let i=0; i<79; i++) backdrop.appendChild(document.createElement('div'))
  }, [])
  
  const handleChange = useCallback(a => setProperties({...properties, [a.id]: a.value}), [])

  return (
    <Router>
      <SideBar properties={handleChange} />
      <AppUI properties={properties} />
    </Router>
  )
}