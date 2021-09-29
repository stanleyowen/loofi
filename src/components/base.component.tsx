import React from 'react'

import Home from './home.component'
import Search from './search.component'
import Settings from './settings.component'

const BaseLayout = ({ song, config, properties, songData, handleSong }: any) => {
    return (
        <div className="base">
            { properties.activeTab === 'home' ?
                <Home properties={properties} handleSong={handleSong} config={config} song={song} songData={songData} /> :
                properties.activeTab === 'search' ?
                    <Search properties={properties} handleSong={handleSong} config={config} songData={songData} /> :
                    <Settings /> }
        </div>
    )
}

export default BaseLayout