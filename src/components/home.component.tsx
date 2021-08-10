import React, { useState, useEffect } from 'react'
import firebase from 'firebase/app'

const Home = ({ handleSong, config }: any) => {
    const [greeting, setGreeting] = useState<string>()
    const [data, setData] = useState<any>({
        album: '',
        song: ''
    })
    const handleData = (a: string, b: any) => setData({...data, [a]: b})

    const triggerAudio = (e: React.MouseEvent<HTMLButtonElement>, data: object) => {
        e.preventDefault()
        handleSong(data);
        (e.target as Element).classList.toggle('pause')
    }

    useEffect(() => {
        const currentHour = new Date().getHours()
        if(currentHour < 12) setGreeting('Morning')
        else if(currentHour < 18) setGreeting('Afternoon')
        else setGreeting('Evening')
    }, [])

    useEffect(() => {
        firebase.initializeApp(config)
        firebase.database().ref().child('album').get()
        .then(data => {
            handleData('album', data.val())
        }).catch(err => console.log(err))
        firebase.database().ref().child('music').get()
        .then(data => {
            handleData('song', data.val())
        }).catch(err => console.log(err))
    }, [config])

    return (
        <div>
            <h2 className="m-10">Good {greeting}</h2>
            <div className="col-3" id="recent-playlist">
                {
                    data.album ? data.album.map((album: any, index: number) => {
                        return (
                            <div className="m-10" key={index}>
                                <a className="card flex" href={album.link}>
                                    <img src={album.image} alt={album.title} />
                                    <p className="m-auto w-50">{album.title}</p>
                                    <button className="play-btn m-auto" onClick={e => triggerAudio(e, album)}></button>
                                </a>
                            </div>
                        )
                    }) : null
                }
            </div>
            <div className="mt-30 col-4" id="playlist">
                {
                    data.music ? data.music.map((album: any, index: number) => {
                        return (
                            <div className="m-10" key={index}>
                                <a className="large-card" href={album.link}>
                                    <img src={album.image} alt={album.title} />
                                    <div className="flex">
                                        <div className="m-auto w-70">
                                            <h3 className="mt-10">{album.title}</h3>
                                            <p className="author">{album.author}</p>
                                        </div>
                                        <button className="play-btn m-auto" onClick={e => triggerAudio(e, album)}></button>
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