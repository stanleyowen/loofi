import React from 'react'
import Home from './home.component'
import Search from './search.component'

const BaseLayout = ({ song, config, properties, handleSong }: any) => {
    return (
        <div className="base">
            { properties.activeTab === 'home' ?
                    <Home properties={properties} handleSong={handleSong} config={config} song={song} /> :
                    <Search properties={properties} handleSong={handleSong} /> }
        </div>
    )
}

export default BaseLayout