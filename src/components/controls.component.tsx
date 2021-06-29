import React, { useState, useEffect } from 'react'
import { SkipNext, SkipPrevious } from '../lib/icons.component'

const Controls = ({ properties }: any) => {
    const [property, setProperty] = useState({
        audio: new Audio("https://www.chosic.com/wp-content/uploads/2021/06/Underwater.mp3"),
        isPlaying: false,
    })
    const handleChange = (a: string, b: any) => setProperty({...property, [a]: b})

    useEffect(() => {
        if(property.isPlaying) property.audio.play()
        else property.audio.pause()
    }, [property.isPlaying])

    const parseTime = (time: number) => {
        const minutes = Math.floor(time / 60)
        const second = Math.floor(time - (minutes * 60))
        return `${(minutes < 10 ? `0${minutes}` : minutes)}:${(second < 10 ? `0${second}` : second)}`
    }

    const triggerAudio = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        handleChange('isPlaying', !property.isPlaying);
        (e.target as Element).classList.toggle('pause')
    }

    property.audio.onloadeddata = () => document.getElementById('playback-duration')!.innerText = String(parseTime(property.audio.duration))

    property.audio.addEventListener("timeupdate", () =>
        document.getElementById('current-duration')!.innerText = parseTime(property.audio.currentTime)
    )

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
                    <div className="progress-bar rounded-corner"></div>
                    <div className="progress-time center-align" id="playback-duration">00:00</div>
                </div>
            </div>
        </div>
    )
}

export default Controls