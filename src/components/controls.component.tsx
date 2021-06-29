import React, { useState, useEffect } from 'react'
import { SkipNext, SkipPrevious } from '../lib/icons.component'

const Controls = ({ properties }: any) => {
    const [property, setProperty] = useState({
        playing: false,
        duration: 0,
        audio: new Audio("https://www.chosic.com/wp-content/uploads/2021/06/Underwater.mp3")
    })
    const handleChange = (a: string, b: any) => setProperty({...property, [a]: b})

    property.audio.onloadeddata = () => handleChange('duration', property.audio.duration)

    const parseTime = (time: number) => {
        const minutes = Math.floor(time / 60)
        const second = Math.floor(time - (minutes * 60))
        return `${(minutes < 10 ? `0${minutes}` : minutes)}:${(second < 10 ? `0${second}` : second)}`
    }
    useEffect(() => {
        if(property.playing) property.audio.play()
        else property.audio.pause()
    }, [property.playing])

    property.audio.ontimeupdate = () => {
        document.getElementById('current-duration')!.innerText = parseTime(property.audio.currentTime)
        document.getElementById('playback-progress')!.setAttribute('value', String((property.audio.currentTime/property.audio.duration)*100))
    }

    const triggerAudio = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        handleChange('playing', !property.playing);
        (e.target as Element).classList.toggle('pause')
    }

    return (
        <div className="footer flex" id="footer">
            <div className="w-30 flex">
                <img src="https://lh3.googleusercontent.com/_fnSo5pFwGb7QJZL6iOTYkHwSJ9yvA16yKZRHUTDodzKTu3kUFu9apc69J8SlP-Q2HUymWy4TNxK4B9mUhubl01d" alt="Currently Playing Music" />
                <div className="center-vert ml-10">
                    <div className="song-title">Back to December</div>
                    <div className="author">Taylor Swift</div>
                </div>
            </div>
            <div className="w-40 flex center-flex">
                <div className="flex center-flex">
                    <button>{SkipPrevious()}</button>
                    <button className="play-btn mrl-10" onClick={triggerAudio}></button>
                    <button>{SkipNext()}</button>
                </div>
                <div className="playback-bar">
                    <div className="progress-time center-align" id="current-duration">00:00</div>
                    <input type="range" className="progress-bar rounded-corner" id="playback-progress" max="100" value="0" />
                    <div className="progress-time center-align">{parseTime(property.duration ? property.duration : 0)}</div>
                </div>
            </div>
        </div>
    )
}

export default Controls