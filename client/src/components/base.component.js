import React from 'react'

const Navbar = ({ properties }) => {
    return (
        <div>
            <div className="col-6" id="recent-playlist">
                <div className="m-10">
                    <div className="card flex">
                        <img src="https://upload.wikimedia.org/wikipedia/en/a/a8/Alan_Walker_%E2%80%93_Different_World.png" />
                        <p className="col m-auto">Alan Walker</p>
                    </div>
                </div>
                <div className="m-10">
                    <div className="card flex">
                        <img src="https://i.scdn.co/image/ab67706f000000039ab4dceef9bb6d4f2050f9c6" />
                        <p className="col m-auto">Good Times</p>
                    </div>
                </div>
                <div className="m-10">
                    <div className="card flex">
                        <img src="https://i1.sndcdn.com/avatars-IWAQUb2WuP9Z5hAv-03A2tA-t500x500.jpg" />
                        <p className="col m-auto">Lofi Hip hop Music</p>
                    </div>
                </div>
                <div className="m-10">
                    <div className="card flex">
                        <img src="https://images.tokopedia.net/img/cache/700/product-1/2019/10/25/3586085/3586085_ff2f2100-a7c3-4d44-9910-52d6417d565c_1077_1077.jpg" />
                        <p className="col m-auto">Travis Scott</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar