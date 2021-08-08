import React from 'react'
import Home from './home.component'
import Search from './search.component'

const BaseLayout = ({ properties, handleSong, config }: any) => {
    return (
        <div className="base">
            { properties.activeTab === 'home' ?
                    <Home properties={properties} handleSong={handleSong} config={config} /> :
                    <Search properties={properties} handleSong={handleSong} /> }
        </div>
    )
}

export default BaseLayout