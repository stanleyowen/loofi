import React, { useState, useEffect } from 'react'
import { initializeApp } from 'firebase/app'
import { getDatabase, ref, onValue } from 'firebase/database'
import { Skeleton } from '@material-ui/lab'

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
            onValue(ref(getDatabase(), '.info/connected'), (snapshot) => snapshot.val() ? null : console.log("Client Disconnected from Server"))
        , 5000)
    }, [config])

    useEffect(() => {
        const btn = document.getElementById((song.title+song.author).replace(/\s/g, "-"))
        song.playing ? btn?.classList.add('pause') : btn?.classList.remove('pause')
    }, [song.playing]) // eslint-disable-line

    function SkeletonPreview(count: number, type: 'large' | 'small') {
        const skeleton = []
        for (let i=0; i<count; i++) {
            skeleton.push(
                type === 'small' ?
                    (<div className="m-10" key={i}>
                    <a className="card flex">
                        <Skeleton variant="rect" width={75} height={75} animation="wave" />
                        <p className="m-auto w-50">
                            <Skeleton variant="text" animation="wave" width="50%" />
                            <Skeleton variant="text" animation="wave" />
                        </p>
                    </a>
                    </div>) :
                    (<div className="m-10" key={i}>
                        <div className="large-card">
                            <Skeleton variant="circle" height={200} animation="wave" />
                            <div className="flex">
                                <span className="mt-10 w-70"><Skeleton variant="text" animation="wave" /></span>
                                <span className="w-40"><Skeleton variant="text" animation="wave" /></span>
                            </div>
                        </div>
                    </div>)
            )
        }
        return skeleton
    }

    return (
        <div>
            <h2 className="m-10">Good {greeting}</h2>
            <div className="col-3" id="recent-playlist">
                {
                    data ? data.map((song: any, index: number) => {
                        if(index > 5) return;
                        return (
                            <div className="m-10" key={index}>
                                <a className="card flex" href={song.link}>
                                    <img src={song.image} alt={song.title} />
                                    <p className="m-auto w-50">{song.title}</p>
                                    <button className="play-btn m-auto" onClick={e => triggerAudio(e, song)} id={(song.title+song.author).replace(/\s/g, "-")}></button>
                                </a>
                            </div>
                        )
                    }) : SkeletonPreview(6, 'small')
                }
            </div>
            <div className="mt-30 col-4" id="playlist">
                {
                    data ? data.map((song: any, index: number) => {
                        if(index < 6 || index >= 14) return;
                        return (
                            <div className="m-10" key={index}>
                                <a className="large-card" href={song.link}>
                                    <img src={song.image} alt={song.title} />
                                    <div className="flex">
                                        <div className="m-auto w-70">
                                            <h3 className="mt-10">{song.title}</h3>
                                            <p className="author">{song.author}</p>
                                        </div>
                                        <button className="play-btn m-auto" onClick={e => triggerAudio(e, song)} id={(song.title+song.author).replace(/\s/g, "-")}></button>
                                    </div>
                                </a>
                            </div>
                        )
                    }) : SkeletonPreview(8, 'large')
                }
            </div>
        </div>
    )
}

export default Home