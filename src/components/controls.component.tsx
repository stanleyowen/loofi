import React, { useState, useEffect } from 'react'
import { SkipNext, SkipPrevious } from '../lib/icons.component'

const Controls = ({ properties, song, handleSong }: any) => {
    const [property, setProperty] = useState({
        duration: 0,
        progress: 0,
        audio: new Audio(song.audio)
    })
    const handleChange = (a: string, b: any) => setProperty({...property, [a]: b})

    useEffect(() => {
        song.playing ? property.audio.play() : property.audio.pause()
    }, [song.playing, property])

    const parseTime = (time: number) => {
        const minutes = Math.floor(time / 60)
        const second = Math.floor(time - (minutes * 60))
        return `${(minutes < 10 ? `0${minutes}` : minutes)}:${(second < 10 ? `0${second}` : second)}`
    }

    property.audio.onloadeddata = () => handleChange('duration', property.audio.duration)

    property.audio.ontimeupdate = () => {
        handleChange('progress', (property.audio.currentTime/property.audio.duration)*100)
        document.getElementById('current-duration')!.innerText = parseTime(property.audio.currentTime)
    }

    const triggerAudio = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        handleSong({id: 'playing', value: !song.playing});
        (e.target as Element).classList.toggle('pause')
    }

    return (
        <div className="footer flex" id="footer">
            <div className="w-30 flex">
                <img src={song.image} alt="Currently Playing Music" />
                <div className="center-vert ml-10">
                    <div className="song-title">{song.title}</div>
                    <div className="author">{song.author}</div>
                </div>
            </div>
            <div className="w-40 flex center-flex">
                <div className="flex center-flex">
                    <button>{SkipPrevious()}</button>
                    <button className={(song.playing ? "pause" : "")+" play-btn mrl-10"} onClick={triggerAudio}></button>
                    <button>{SkipNext()}</button>
                </div>
                <div className="playback-bar">
                    <div className="progress-time center-align" id="current-duration">00:00</div>
                    <input type="range" className="progress-bar rounded-corner" max="100" value={property.progress} readOnly />
                    <div className="progress-time center-align">{parseTime(property.duration ? property.duration : 0)}</div>
                </div>
            </div>
        </div>
    )
}

export default Controls