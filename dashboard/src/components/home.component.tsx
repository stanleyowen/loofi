import React, { useState, useEffect } from 'react'
import { Skeleton } from '@mui/material'

interface Song {
    title: string,
    author: string,
    image: string,
    playing: boolean,
    audio: HTMLAudioElement
}
interface Music {
    title: string,
    author: string,
    image: string,
    audio: HTMLAudioElement
}

interface Data {
    song: any,
    songData: Array<any>,
    handleSong: any
}

const Home = ({ song, songData, handleSong, HOST_DOMAIN }: any) => {
    const [greeting, setGreeting] = useState<string>()

    const triggerAudio = (e: React.MouseEvent<HTMLButtonElement>, data: any) => {
        e.preventDefault()
        if(song.playing) {
            handleSong({ id: 'playing', value: false })
            setTimeout(() => handleSong(data), 10)
        } else handleSong(data);
        (e.target as Element).classList.toggle('pause')
    }

    useEffect(() => {
        const currentHour = new Date().getHours()
        if(currentHour < 12) setGreeting('Morning')
        else if(currentHour < 18) setGreeting('Afternoon')
        else setGreeting('Evening')
    }, [])

    useEffect(() => {
        const btn = document.getElementById((song.title+song.author).replace(/\s/g, "-"))
        song.playing ? btn?.classList.add('pause') : btn?.classList.remove('pause')
    }, [song])

    function SkeletonPreview(count: number, type: 'large' | 'small') {
        const skeleton = []
        for (let i=0; i<count; i++) {
            skeleton.push(
                type === 'small' ?
                    (<div className="m-10" key={i}>
                        <div className="card flex">
                            <Skeleton variant="rectangular" width={75} height={75} animation="wave" />
                            <p className="m-auto w-50">
                                <Skeleton variant="text" animation="wave" width="50%" />
                                <Skeleton variant="text" animation="wave" />
                            </p>
                        </div>
                    </div>) :
                    (<div className="m-10" key={i}>
                        <div className="large-card">
                            <Skeleton variant="circular" height={200} animation="wave" />
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
                    songData?.length !== 0 ? songData.map((music: Music, index: number) => {
                        if(index > 5) return;
                        return (
                            <div className="m-10" key={index}>
                                <div className="card flex">
                                    <img src={HOST_DOMAIN + music.image} loading="lazy" />
                                    <p className="m-auto w-50">{music.title}</p>
                                    <button className="play-btn m-auto" onClick={e => triggerAudio(e, music)} id={(music.title+music.author).replace(/\s/g, "-")}></button>
                                </div>
                            </div>
                        )
                    }) : SkeletonPreview(6, 'small')
                }
            </div>
            <div className="mt-30 col-4" id="playlist">
                {
                    songData?.length !== 0 ? songData.map((music: Music, index: number) => {
                        if(index < 6) return; // eslint-disable-line
                        return (
                            <div className="m-10" key={index}>
                                <div className="large-card">
                                    <img src={HOST_DOMAIN + music.image} loading="lazy" />
                                    <div className="flex">
                                        <div className="m-auto w-70">
                                            <h3 className="mt-10">{music.title}</h3>
                                            <p className="author">{music.author}</p>
                                        </div>
                                        <button className="play-btn m-auto" onClick={e => triggerAudio(e, music)} id={(music.title+music.author).replace(/\s/g, "-")}></button>
                                    </div>
                                </div>
                            </div>
                        )
                    }) : SkeletonPreview(8, 'large')
                }
            </div>
        </div>
    )
}

export default Home