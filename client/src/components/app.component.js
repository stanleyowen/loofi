import React from 'react'
import Navbar from './navbar.component'
import Base from './base.component'
import Controls from './controls.component'

const App = ({ properties }) => {
    return (
        <div className="app">
            <div className="h-84">
                <Navbar properties={properties} />
                <Base properties={properties} />
            </div>
            <div className="h-16"><Controls properties={properties} /></div>
        </div>
    )
}

export default App