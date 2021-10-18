import React, { useState, useEffect, useCallback } from 'react'
import { initializeApp } from 'firebase/app'
import { getDatabase, ref, onValue } from 'firebase/database'
import { Alert, Slide, Snackbar, LinearProgress, SlideProps } from '@mui/material'

import Navbar from './navbar.component'
import BaseLayout from './base.component'
import Controls from './controls.component'

type TransitionProps = Omit<SlideProps, 'direction'>

// eslint-disable-next-line
const App = ({ properties, handleChange }: any) => {
    const HOST_DOMAIN: string = process.env.REACT_APP_HOST_DOMAIN ?? window.location.origin
    const [data, setData] = useState<any>([])
    const [isOffline, setConnectionState] = useState<boolean>(false)
    const [transition, setTransition] = useState<React.ComponentType<TransitionProps> | undefined>(undefined)
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
        onValue(ref(getDatabase(), 'data-dev-dev/'), (snapshot) => {
            let rawData = snapshot.val(), index = rawData.length, randIndex // eslint-disable-line
            while(index !== 0) {
                randIndex = Math.floor(Math.random() * index)
                index--
                [rawData[index], rawData[randIndex]] = [rawData[randIndex], rawData[index]]
            }
            setData(rawData)
        })
        
        setTimeout(() =>
            onValue(ref(getDatabase(), '.info/connected'), (snapshot) => {
                function Transition(props: TransitionProps) {
                    return <Slide {...props} direction="right" />
                }
                if(!snapshot.val()) {
                    setTransition(() => Transition)
                    setConnectionState(true)
                }else setConnectionState(false)
            })
        , 5000)

        const themeURL = JSON.parse(localStorage.getItem('theme-session') || `{}`).url
        const backgroundElement = document.getElementById('backdrop-image')
        if(backgroundElement && themeURL) backgroundElement.style.background = `url(${themeURL})`
    }, []) // eslint-disable-line
    
    const handleSong = useCallback(a => {
        if(!a.id && !a.value)
            a.audio === song.audio.getAttribute('src') ?
                setSong({...song, playing: !song.playing}) :
                setSong({...a, audio: new Audio(a.audio), image: HOST_DOMAIN+a.image, playing: true})
        else setSong({ ...song, [a.id]: a.value })
    }, [song])

    return (
        <div className="app">
            <div className="app-ui">
                <Navbar properties={properties} handleChange={handleChange} />
                <BaseLayout properties={properties} song={song} songData={data} handleSong={handleSong} HOST_DOMAIN={HOST_DOMAIN} />
            </div>
            <Controls properties={properties} song={song} handleSong={handleSong} songData={data} HOST_DOMAIN={HOST_DOMAIN} />
            <Snackbar open={isOffline} TransitionComponent={transition}>
                <Alert severity="error">You are offline. Some functionality may be unavailable.</Alert>
            </Snackbar>
        </div>
    )
}

export default App