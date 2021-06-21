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
    const backdrop = document.querySelector('.backdrop-overlay')!
    for (let i = 0; i < 79; i++) {
      const div = document.createElement('div')
      div.style.opacity = `${Math.random() * (0.075 - 0.025) + 0.025}`
      backdrop.appendChild(div)
    }
  }, [])

  const handleChange = useCallback(a => setProperties({ ...properties, [a.id]: a.value }), [properties])

  return (
    <Router>
      <SideBar properties={handleChange} />
      <AppUI properties={properties} />
    </Router>
  )
}