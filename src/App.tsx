import React, { useState, useEffect, useCallback } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import { Properties } from './lib/interfaces.component'
import AppLayout from './components/app.component'
import SideBar from './components/sidebar.component'

process.env.NODE_ENV === 'production' ? require ('./App.min.css') : require('./App.css')

// eslint-disable-next-line
export default function App() {
  const [properties, setProperties] = useState<Properties>({
    action: 0,
    activeTab: window.localStorage.getItem('tab-session') ?? 'home',
    history: [window.localStorage.getItem('tab-session') ?? 'home']
  })

  useEffect(() => {
    for (let i = 0; i < 79; i++) {
      const div = document.createElement('div')
      div.style.opacity = `${Math.random() * (0.075 - 0.025) + 0.025}`
      document.querySelector('.backdrop-overlay')?.appendChild(div)
    }
  }, [])

  const handleChange = useCallback(a => {
    if(a.goForward || a.goBackward)
      setProperties({
        ...properties,
        action: a.goBackward ? properties.action - 1 : properties.action + 1,
        [a.id]: a.value
      })
    else {
      properties.history.splice(properties.action+1, properties.history.length - (properties.action + 1) , a.value)
      setProperties({
        ...properties,
        action: properties.action + 1,
        [a.id]: a.value
      })
    }
    window.localStorage.setItem('tab-session', a.value)
  }, [properties])

  return (
    <Router>
      <SideBar properties={properties} handleChange={handleChange}  />
      <AppLayout properties={properties} handleChange={handleChange} />
    </Router>
  )
}