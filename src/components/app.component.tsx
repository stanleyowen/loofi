import React, { useState, useCallback } from 'react'
import Navbar from './navbar.component'
import BaseLayout from './base.component'
import Controls from './controls.component'

const App = ({ properties, handleChange, config }: any) => {
    const [song, setSong] = useState({
        playing: false,
        title: 'Underwater',
        author: 'LiQWYD',
        image: 'https://i.ytimg.com/vi/6Tnw3Ku-KeM/maxresdefault.jpg',
        audio: new Audio('https://www.chosic.com/wp-content/uploads/2021/06/Underwater.mp3')
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
                <BaseLayout properties={properties} handleSong={handleSong} config={config} />
            </div>
            <Controls properties={properties} song={song} handleSong={handleSong} />
        </div>
    )
}

export default App