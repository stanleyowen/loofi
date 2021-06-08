import React from 'react'
import Navbar from './navbar.component'
import SideBar from './sidebar.component'

const App = () => {
    return (
        <div className="flex">
            <SideBar className="flex-2" />
            <Navbar className="flex-8" />
        </div>
    )
}

export default App