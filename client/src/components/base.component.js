import React, { useState, useEffect } from 'react'

const Navbar = ({ properties }) => {
    const [greeting, setGreeting] = useState()
    const triggerAudio = (e) => {
        e.preventDefault()
        e.target.classList.toggle('pause')
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
            img: 'https://lh3.googleusercontent.com/_fnSo5pFwGb7QJZL6iOTYkHwSJ9yvA16yKZRHUTDodzKTu3kUFu9apc69J8SlP-Q2HUymWy4TNxK4B9mUhubl01d'
        },
        {
            title: 'Good Times',
            author: 'Anne Marie',
            img: 'https://i.scdn.co/image/ab67706f000000039ab4dceef9bb6d4f2050f9c6'
        },
        {
            title: 'Lofi Hip Hop Music',
            author: 'Lofi',
            img: 'https://i1.sndcdn.com/avatars-IWAQUb2WuP9Z5hAv-03A2tA-t500x500.jpg'
        },
        {
            title: 'Sicko Mode',
            author: 'Travis Scott',
            img: 'https://images.tokopedia.net/img/cache/700/product-1/2019/10/25/3586085/3586085_ff2f2100-a7c3-4d44-9910-52d6417d565c_1077_1077.jpg'
        },
        {
            title: 'TED Talks Daily',
            author: 'TED',
            img: 'https://blog.ted.com/wp-content/uploads/sites/2/2020/04/ttd_social_elise-hu_square_v1.png'
        },
        {
            title: 'Talking to The Moon',
            author: 'Bruno Mars',
            img: 'https://i.scdn.co/image/ab67616d0000b273caaa456c44f69f10c8b2aa53'
        }
    ]

    return (
        <div>
            <h2 className="m-10">Good {greeting}</h2>
            <div className="col-3" id="recent-playlist">
                {
                    albumData.map(album => {
                        return (
                        <div className="m-10" key={album.img}>
                            <div className="card flex" href={album.link}>
                                <img src={album.img} />
                                <p className="p-10 w-50">{album.title}</p>
                                <button className="play-btn m-auto" onClick={triggerAudio}></button>
                            </div>
                        </div>)
                    })
                }
            </div>
        </div>
    )
}

export default Navbar