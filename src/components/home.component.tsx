import React, { useState, useEffect } from 'react'

const Home = ({ handleSong }: any) => {
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
            title: 'Coral',
            author: 'LIQWYD',
            link: '#',
            image: 'https://i1.sndcdn.com/artworks-FoWcUyCslTjVJZe4-XZmlqw-t500x500.jpg',
            audio: new Audio('https://www.chosic.com/wp-content/uploads/2021/06/liqwyd-coral.mp3')
        },
        {
            title: 'Water Wood & Stone',
            author: 'Audionautix',
            link: '#',
            image: 'https://i1.sndcdn.com/artworks-1Jlkwxr8ggjwyxFq-RKJJiw-t500x500.jpg',
            audio: new Audio('https://www.chosic.com/wp-content/uploads/2021/05/audionautix-water-wood-and-stone.mp3')
        },
        {
            title: 'Japan',
            author: 'Uniq',
            link: '#',
            image: 'https://i1.sndcdn.com/artworks-000386176995-l0up2a-t500x500.jpg',
            audio: new Audio('https://www.chosic.com/wp-content/uploads/2021/07/Japan-by-uniq.mp3')
        },
        {
            title: 'And So It Begins',
            author: 'Artificial Music',
            link: '#',
            image: 'https://i1.sndcdn.com/artworks-000180319332-ay5ya9-t500x500.jpg',
            audio: new Audio('https://www.chosic.com/wp-content/uploads/2021/04/And-So-It-Begins-Inspired-By-Crush-Sometimes.mp3')
        },
        {
            title: 'Bedtime After a Coffee',
            author: 'Barradeen',
            link: '#',
            image: 'https://i1.sndcdn.com/artworks-qDNdZw6J0bPp-0-t500x500.png',
            audio: new Audio('https://www.chosic.com/wp-content/uploads/2020/11/barradeen-bedtime-after-a-coffee.mp3')
        },
        {
            title: 'Herbal Tea',
            author: 'Artificial Music',
            link: '#',
            image: 'https://i1.sndcdn.com/artworks-000226031503-6b5miz-t500x500.jpg',
            audio: new Audio('https://www.chosic.com/wp-content/uploads/2021/04/herbal-tea.mp3')
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
                    })
                }
            </div>
        </div>
    )
}

export default Home