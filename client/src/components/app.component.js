import React from 'react'
import Navbar from './navbar.component'

const App = ({ properties }) => {
    return (
        <div className="app">
            <Navbar properties={properties} />
        </div>
    )
}

export default App