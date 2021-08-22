import React, { useState, useCallback } from 'react'
import Navbar from './navbar.component'
import BaseLayout from './base.component'
import Controls from './controls.component'

const App = ({ properties, handleChange, config }: any) => {
    const [song, setSong] = useState({
        playing: false,
        title: 'Underwater',
        author: 'LiQWYD',
        image: 'https://user-images.githubusercontent.com/69080584/129511233-dd5a0eac-2675-415e-ae4c-6cc530a23629.png',
        audio: new Audio('https://user-images.githubusercontent.com/69080584/129511300-e88655e9-687f-4d0b-acb4-b32c0fa988cf.mp4')
    })

    const handleSong = useCallback(a => {
        if(!a.id && !a.value)
            a.audio.getAttribute('src') === song.audio.getAttribute('src') ?
                setSong({...song, playing: !song.playing}) :
                setSong({...a, playing: true})
        else setSong({ ...song, [a.id]: a.value })
    }, [song])

    return (
        <div className="app">
            <div className="app-ui">
                <Navbar properties={properties} handleChange={handleChange} />
                <BaseLayout properties={properties} song={song} config={config} handleSong={handleSong} />
            </div>
            <Controls properties={properties} song={song} handleSong={handleSong} />
        </div>
    )
}

export default App