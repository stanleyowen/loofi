import React from 'react'
import Home from './home.component'
import Search from './search.component'

const BaseLayout = ({ properties, handleSong }: any) => {
    return (
        <div className="base">
            {properties.activeTab === 'home' ?
                <Home properties={properties} handleSong={handleSong} /> :
                <Search properties={properties} handleSong={handleSong} />}
        </div>
    )
}

export default BaseLayout