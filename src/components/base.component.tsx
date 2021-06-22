import React from 'react'
import Home from './home.component'
import Search from './search.component'

const BaseLayout = ({ properties }: any) => {
    return (
        <div className="base">
            {properties.activeTab === 'home' ? <Home properties={properties} /> : <Search properties={properties} />}
        </div>
    )
}

export default BaseLayout