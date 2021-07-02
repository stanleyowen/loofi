import React, { useState, useEffect, useCallback } from 'react'
import Navbar from './navbar.component'
import BaseLayout from './base.component'
import Controls from './controls.component'

const App = ({ properties, handleChange }: any) => {
    const [song, setSong] = useState({
        playing: false,
        title: 'Back to December',
        author: 'Taylor Swift',
        audio: 'https://www.chosic.com/wp-content/uploads/2021/06/Underwater.mp3',
        image: 'https://lh3.googleusercontent.com/_fnSo5pFwGb7QJZL6iOTYkHwSJ9yvA16yKZRHUTDodzKTu3kUFu9apc69J8SlP-Q2HUymWy4TNxK4B9mUhubl01d'
    })

    const handleSong = useCallback(a => setSong({...a, playing: true}), [song])

    return (
        <div className="app">
            <div className="app-ui">
                <Navbar properties={properties} handleChange={handleChange} />
                <BaseLayout properties={properties} handleSong={handleSong} />
            </div>
            <Controls properties={properties} song={song} handleSong={handleSong} />
        </div>
    )
}

export default App