import React from 'react'

import Home from './home.component'
import Search from './search.component'
import Settings from './settings.component'

// eslint-disable-next-line
const BaseLayout = ({ song, properties, songData, handleSong }: any) => {
    return (
        <div className="base">
            { properties.activeTab === 'home' ?
                <Home properties={properties} handleSong={handleSong} song={song} songData={songData} /> :
                properties.activeTab === 'search' ?
                    <Search properties={properties} handleSong={handleSong} songData={songData} /> : <Settings /> }
        </div>
    )
}

export default BaseLayout