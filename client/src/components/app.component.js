import React from 'react'
import Navbar from './navbar.component'
import Base from './base.component'

const App = ({ properties }) => {
    return (
        <div className="app">
            <Navbar properties={properties} />
            <Base properties={properties} />
        </div>
    )
}

export default App