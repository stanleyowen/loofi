import React, { useState, useEffect } from 'react'
import { SkipNext, SkipPrevious } from '../lib/icons.component'

const Controls = ({ properties }: any) => {
    const [property, setProperty] = useState({
        audio: new Audio("https://www.chosic.com/wp-content/uploads/2021/06/Underwater.mp3")
    })
    let isPlaying = false

    const triggerAudio = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        isPlaying ? property.audio.pause() : property.audio.play();
        isPlaying = !isPlaying;
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
                    <div className="progress-time center-align">00:00</div>
                    <div className="progress-bar rounded-corner"></div>
                    <div className="progress-time center-align">00:00</div>
                </div>
            </div>
        </div>
    )
}

export default Controls