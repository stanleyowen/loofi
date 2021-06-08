import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import './App.css'
import AppUI from './components/app.component'

export default function App() {
  return (
    <Router>
      <AppUI />
    </Router>
  )
}