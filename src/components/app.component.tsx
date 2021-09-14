import React, { useState, useEffect, useCallback } from 'react'
import { initializeApp } from 'firebase/app'
import { getDatabase, ref, onValue } from 'firebase/database'
import { Alert } from '@material-ui/lab'
import { Slide, Snackbar } from '@material-ui/core'

import Navbar from './navbar.component'
import BaseLayout from './base.component'
import Controls from './controls.component'

const App = ({ properties, handleChange }: any) => {
    const [data, setData] = useState<any>([])
    const [isOffline, setConnectionState] = useState<boolean>(false)
    const [song, setSong] = useState({
        playing: false,
        title: 'Underwater',
        author: 'LiQWYD',
        image: 'https://user-images.githubusercontent.com/69080584/129511233-dd5a0eac-2675-415e-ae4c-6cc530a23629.png',
        audio: new Audio('https://user-images.githubusercontent.com/69080584/129511300-e88655e9-687f-4d0b-acb4-b32c0fa988cf.mp4')
    })

    useEffect(() => {
        initializeApp({
            apiKey: process.env.REACT_APP_API_KEY,
            authDomain: process.env.REACT_APP_AUTH_DOMAIN,
            databaseURL: process.env.REACT_APP_DB_URL,
            projectId: process.env.REACT_APP_PROJECT_ID,
            storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
            messagingSenderId: process.env.REACT_APP_SENDER_ID,
            appId: process.env.REACT_APP_ID,
            measurementId: process.env.REACT_APP_MEASUREMENT_ID
        })
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
            a.audio === song.audio.getAttribute('src') ?
                setSong({...song, playing: !song.playing}) :
                setSong({...a, audio: new Audio(a.audio), playing: true})
        else setSong({ ...song, [a.id]: a.value })
    }, [song])

    return (
        <div className="app">
            <div className="app-ui">
                <Navbar properties={properties} handleChange={handleChange} />
                <BaseLayout properties={properties} song={song} songData={data} handleSong={handleSong} />
            </div>
            <Controls properties={properties} song={song} handleSong={handleSong} songData={data} />
        </div>
    )
}

export default App