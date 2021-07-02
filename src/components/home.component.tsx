import React, { useState, useEffect } from 'react'

const Home = ({ properties, handleSong }: any) => {
    const [greeting, setGreeting] = useState<string>()

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

    const albumData = [
        {
            title: 'Back to December',
            author: 'Taylor Swift',
            link: '/#link',
            image: 'https://lh3.googleusercontent.com/_fnSo5pFwGb7QJZL6iOTYkHwSJ9yvA16yKZRHUTDodzKTu3kUFu9apc69J8SlP-Q2HUymWy4TNxK4B9mUhubl01d'
        },
        {
            title: 'Good Times',
            author: 'Anne Marie',
            link: '/#link',
            image: 'https://i.scdn.co/image/ab67706f000000039ab4dceef9bb6d4f2050f9c6'
        },
        {
            title: 'Lofi Hip Hop Music',
            author: 'Lofi',
            link: '/#link',
            image: 'https://i1.sndcdn.com/avatars-IWAQUb2WuP9Z5hAv-03A2tA-t500x500.jpg'
        },
        {
            title: 'Sicko Mode',
            author: 'Travis Scott',
            link: '/#link',
            image: 'https://images.tokopedia.net/img/cache/700/product-1/2019/10/25/3586085/3586085_ff2f2100-a7c3-4d44-9910-52d6417d565c_1077_1077.jpg'
        },
        {
            title: 'TED Talks Daily',
            author: 'TED',
            link: '/#link',
            image: 'https://blog.ted.com/wp-content/uploads/sites/2/2020/04/ttd_social_elise-hu_square_v1.png'
        },
        {
            title: 'Talking to The Moon',
            author: 'Bruno Mars',
            link: '/#link',
            image: 'https://i.scdn.co/image/ab67616d0000b273caaa456c44f69f10c8b2aa53'
        }
    ]

    return (
        <div>
            <h2 className="m-10">Good {greeting}</h2>
            <div className="col-3" id="recent-playlist">
                {
                    albumData.map((album, index) => {
                        return (
                            <div className="m-10" key={index}>
                                <a className="card flex" href={album.link}>
                                    <img src={album.image} alt={album.title} />
                                    <p className="m-auto w-50">{album.title}</p>
                                    <button className="play-btn m-auto" onClick={e => triggerAudio(e, album)}></button>
                                </a>
                            </div>
                        )
                    })
                }
            </div>
            <div className="mt-30 col-4" id="playlist">
                {
                    albumData.map((album, index) => {
                        return (
                            <div className="m-10" key={index}>
                                <a className="large-card" href={album.link}>
                                    <img src={album.image} />
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
                    })
                }
            </div>
        </div>
    )
}

export default Home