import React, { useState, useEffect } from 'react'
import { Skeleton } from '@material-ui/lab'

const Home = ({ song, songData, handleSong }: any) => {
    const [greeting, setGreeting] = useState<string>()

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
                    songData?.length !== 0 ? songData.map((music: any, index: number) => {
                        if(index > 5) return; // eslint-disable-line
                        return (
                            <div className="m-10" key={index}>
                                <a className="card flex" href={music.link}>
                                    <img src={music.image} alt={music.title} />
                                    <p className="m-auto w-50">{music.title}</p>
                                    <button className="play-btn m-auto" onClick={e => triggerAudio(e, music)} id={(music.title+music.author).replace(/\s/g, "-")}></button>
                                </a>
                            </div>
                        )
                    }) : SkeletonPreview(6, 'small')
                }
            </div>
            <div className="mt-30 col-4" id="playlist">
                {
                    songData?.length !== 0 ? songData.map((music: any, index: number) => {
                        if(index < 6 || index >= 14) return; // eslint-disable-line
                        return (
                            <div className="m-10" key={index}>
                                <a className="large-card" href={music.link}>
                                    <img src={music.image} alt={music.title} />
                                    <div className="flex">
                                        <div className="m-auto w-70">
                                            <h3 className="mt-10">{music.title}</h3>
                                            <p className="author">{music.author}</p>
                                        </div>
                                        <button className="play-btn m-auto" onClick={e => triggerAudio(e, music)} id={(music.title+music.author).replace(/\s/g, "-")}></button>
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