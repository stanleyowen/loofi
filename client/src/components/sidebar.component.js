import React from 'react'
import { Button } from '@material-ui/core'

const SideBar = () => {
    return (
        <div className="sidebar">
            <div className="m-10">
                <Button className="full-width rounded-corner p-10" href="/">Home</Button>
                <Button className="full-width rounded-corner p-10" href="/search">Search</Button>
            </div>
        </div>
    )
}

export default SideBar