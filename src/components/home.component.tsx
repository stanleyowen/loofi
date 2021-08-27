import React, { useState, useEffect } from 'react'
import firebase from 'firebase/app'

const Home = ({ song, config, handleSong }: any) => {
    const [greeting, setGreeting] = useState<string>()
    const [data, setData] = useState<any>()

    const triggerAudio = (e: React.MouseEvent<HTMLButtonElement>, data: { audio: string }) => {
        e.preventDefault()
        if(song.playing){
            handleSong({id: 'playing', value: false})
            setTimeout(() => handleSong({...data, audio: new Audio(data?.audio), playing: true }), 10)
        }else handleSong({...data, audio: new Audio(data?.audio) });
        (e.target as Element).classList.toggle('pause')
    }

    useEffect(() => {
        const currentHour = new Date().getHours()
        if(currentHour < 12) setGreeting('Morning')
        else if(currentHour < 18) setGreeting('Afternoon')
        else setGreeting('Evening')
    }, [])

    useEffect(() => {
        firebase.apps.length ? firebase.app() : firebase.initializeApp(config)
        firebase.database().ref().child('data').get()
        .then(data => setData(data.val()))
        .catch(err => console.log(err))
    }, [config])

    useEffect(() => {
        const btn = document.getElementById((song.title+song.author).replace(/\s/g, "-"))
        song.playing ? btn?.classList.add('pause') : btn?.classList.remove('pause')
        // eslint-disable-next-line
    }, [song.playing])

    return (
        <div>
            <h2 className="m-10">Good {greeting}</h2>
            <div className="col-3" id="recent-playlist">
                {
                    data?.music ? data.music.map((album: any, index: number) => {
                        return (
                            <div className="m-10" key={index}>
                                <a className="card flex" href={album.link}>
                                    <img src={album.image} alt={album.title} />
                                    <p className="m-auto w-50">{album.title}</p>
                                    <button className="play-btn m-auto" onClick={e => triggerAudio(e, album)} id={(album.title+album.author).replace(/\s/g, "-")}></button>
                                </a>
                            </div>
                        )
                    }) : null
                }
            </div>
            <div className="mt-30 col-4" id="playlist">
                {
                    data?.album ? data.album.map((album: any, index: number) => {
                        return (
                            <div className="m-10" key={index}>
                                <a className="large-card" href={album.link}>
                                    <img src={album.image} alt={album.title} />
                                    <div className="flex">
                                        <div className="m-auto w-70">
                                            <h3 className="mt-10">{album.title}</h3>
                                            <p className="author">{album.author}</p>
                                        </div>
                                        <button className="play-btn m-auto" onClick={e => triggerAudio(e, album)} id={(album.title+album.author).replace(/\s/g, "-")}></button>
                                    </div>
                                </a>
                            </div>
                        )
                    }) : null
                }
            </div>
        </div>
    )
}

export default Home