import React, { useState, useEffect } from 'react'
import { Audio, MutedAudio, SkipNext, SkipPrevious } from '../lib/icons.component'

const Controls = ({ song, handleSong }: any) => {
    const [property, setProperty] = useState({
        duration: 0,
        progress: 0,
        muted: localStorage.getItem('muted') ? Boolean(localStorage.getItem('muted')) : false,
        volume: localStorage.getItem('volume') ? Number(localStorage.getItem('volume')) : 50
    })
    const handleChange = (a: string, b: any) => setProperty({...property, [a]: b})

    useEffect(() => {
        localStorage.setItem('muted', String(property.muted))
        localStorage.setItem('volume', String(property.volume))
        song.audio.volume = property.muted ? 0 : property.volume / 100
    }, [song.audio, property.volume, property.muted])

    useEffect(() => { song.playing ? song.audio.play() : song.audio.pause() }, [song])

    const parseTime = (time: number) => {
        const minutes = Math.floor(time / 60)
        const second = Math.floor(time - (minutes * 60))
        return `${(minutes < 10 ? `0${minutes}` : minutes)}:${(second < 10 ? `0${second}` : second)}`
    }

    song.audio.ontimeupdate = () => {
        handleChange('progress', (song.audio.currentTime/song.audio.duration)*100)
        document.getElementById('current-duration')!.innerText = parseTime(song.audio.currentTime)
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
            <div className="w-50 flex center-flex">
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
            <div className="w-20 flex center-flex">
                <div className="audio">
                    <button onClick={() => handleChange('muted', !property.muted)}>{property.muted || property.volume === 0 ? MutedAudio() : Audio()}</button>
                    <input type="range" className="progress-bar rounded-corner m-10" max="100" value={property.volume} onChange={e => handleChange('volume', Number(e.target.value))} />
                </div>
            </div>
        </div>
    )
}

export default Controls