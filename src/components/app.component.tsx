import React from 'react'
import Navbar from './navbar.component'
import BaseLayout from './base.component'
import Controls from './controls.component'

const App = ({ properties }: any) => {
    return (
        <div className="app">
            <div className="app-ui">
                <Navbar properties={properties} />
                <Base properties={properties} />
            </div>
            <Controls properties={properties} />
        </div>
    )
}

export default App