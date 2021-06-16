import React from 'react'

const Navbar = ({ properties }) => {
    const triggerAudio = (e) => {
        e.preventDefault()
        e.target.classList.toggle('pause')
    }
    return (
        <div>
            <div className="col-3" id="recent-playlist">
                <div className="m-10">
                    <div className="card flex">
                        <img src="https://upload.wikimedia.org/wikipedia/en/a/a8/Alan_Walker_%E2%80%93_Different_World.png" />
                        <p className="p-10 w-50">Alan Walker</p>
                        <button className="play-btn m-auto" onClick={triggerAudio}></button>
                    </div>
                </div>
                <div className="m-10">
                    <div className="card flex">
                        <img src="https://i.scdn.co/image/ab67706f000000039ab4dceef9bb6d4f2050f9c6" />
                        <p className="p-10 w-50">Good Times</p>
                        <button className="play-btn m-auto" onClick={triggerAudio}></button>
                    </div>
                </div>
                <div className="m-10">
                    <div className="card flex">
                        <img src="https://i1.sndcdn.com/avatars-IWAQUb2WuP9Z5hAv-03A2tA-t500x500.jpg" />
                        <p className="p-10 w-50">Lofi Hip hop Music</p>
                        <button className="play-btn m-auto" onClick={triggerAudio}></button>
                    </div>
                </div>
                <div className="m-10">
                    <div className="card flex">
                        <img src="https://images.tokopedia.net/img/cache/700/product-1/2019/10/25/3586085/3586085_ff2f2100-a7c3-4d44-9910-52d6417d565c_1077_1077.jpg" />
                        <p className="p-10 w-50">Travis Scott</p>
                        <button className="play-btn m-auto" onClick={triggerAudio}></button>
                    </div>
                </div>
                <div className="m-10">
                    <div className="card flex">
                        <img src="https://blog.ted.com/wp-content/uploads/sites/2/2020/04/ttd_social_elise-hu_square_v1.png" />
                        <p className="p-10 w-50">TED Talks Daily</p>
                        <button className="play-btn m-auto" onClick={triggerAudio}></button>
                    </div>
                </div>
                <div className="m-10">
                    <div className="card flex">
                        <img src="https://i.scdn.co/image/ab67616d0000b273caaa456c44f69f10c8b2aa53" />
                        <p className="p-10 w-50">Bruno Mars</p>
                        <button className="play-btn m-auto" onClick={triggerAudio}></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar