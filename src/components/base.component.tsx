import React from 'react'
import Home from './home.component'
import Search from './search.component'
import About from './about.component'

const BaseLayout = ({ song, config, properties, handleSong }: any) => {
    return (
        <div className="base">
            { properties.activeTab === 'home' ?
                    <Home properties={properties} handleSong={handleSong} config={config} song={song} /> :
                    properties.activeTab === 'search' ?
                        <Search properties={properties} handleSong={handleSong} /> :
                        <About /> }
        </div>
    )
}

export default BaseLayout