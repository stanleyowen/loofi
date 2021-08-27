import React, { useState, useEffect, useCallback } from 'react'
import 'firebase/database'
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

  const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DB_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_SENDER_ID,
    appId: process.env.REACT_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
  }

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
      <AppLayout properties={properties} handleChange={handleChange} config={config} />
    </Router>
  )
}