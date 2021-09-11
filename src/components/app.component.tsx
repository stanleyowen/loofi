import React, { useState, useEffect, useCallback } from 'react'
import Navbar from './navbar.component'
import BaseLayout from './base.component'
import Controls from './controls.component'
import { initializeApp } from 'firebase/app'
import { getDatabase, ref, onValue } from 'firebase/database'
import { Slide, Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'

const App = ({ properties, handleChange, config }: any) => {
    const [data, setData] = useState<any>([])
    const [song, setSong] = useState({
        playing: false,
        title: 'Underwater',
        author: 'LiQWYD',
        image: 'https://user-images.githubusercontent.com/69080584/129511233-dd5a0eac-2675-415e-ae4c-6cc530a23629.png',
        audio: new Audio('https://user-images.githubusercontent.com/69080584/129511300-e88655e9-687f-4d0b-acb4-b32c0fa988cf.mp4')
    })

    useEffect(() => {
        initializeApp(config)
        onValue(ref(getDatabase(), 'data-dev/'), (snapshot) => {
            var rawData = snapshot.val(), index = rawData.length, randIndex
            while(index !== 0) {
                randIndex = Math.floor(Math.random() * index)
                index--
                [rawData[index], rawData[randIndex]] = [rawData[randIndex], rawData[index]]
            }
            setData(rawData)
        })
        setTimeout(() =>
            onValue(ref(getDatabase(), '.info/connected'), (snapshot) => snapshot.val() ? setConnectionState(false) : setConnectionState(true))
        , 5000)
    }, []) // eslint-disable-line
    
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