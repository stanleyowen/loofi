import React from 'react'

import Home from './home.component'
import Search from './search.component'
import Settings from './settings.component'
import Download from './download.component'

// eslint-disable-next-line
const BaseLayout = ({ song, properties, songData, handleSong, HOST_DOMAIN }: any) => {
    return (
        <div className="base">
            { properties.activeTab === 'home' ?
                <Home properties={properties} handleSong={handleSong} song={song} songData={songData} HOST_DOMAIN={HOST_DOMAIN} /> :
                properties.activeTab === 'search' ?
                    <Search properties={properties} handleSong={handleSong} songData={songData} HOST_DOMAIN={HOST_DOMAIN} /> :
                    properties.activeTab === 'download' ? <Download /> : <Settings /> }
        </div>
    )
}

export default BaseLayout