import React, { useState, useEffect, useCallback } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import './App.css'
import AppLayout from './components/app.component'
import SideBar from './components/sidebar.component'

export default function App() {
  const [properties, setProperties] = useState({
    activeTab: 'home',
    previousTab: '',
    nextTab: ''
  })

  useEffect(() => {
    for (let i = 0; i < 79; i++) {
      const div = document.createElement('div')
      div.style.opacity = `${Math.random() * (0.075 - 0.025) + 0.025}`
      document.querySelector('.backdrop-overlay')!.appendChild(div)
    }
  }, [])

  const handleChange = useCallback(a =>
    setProperties({
      ...properties,
      previousTab: a.goBackward ? '' : properties.activeTab,
      nextTab: a.goBackward ? properties.activeTab : '',
      [a.id]: a.value
    })
  , [properties])

  return (
    <Router>
      <SideBar properties={properties} handleChange={handleChange}  />
      <AppLayout properties={properties} handleChange={handleChange} />
    </Router>
  )
}