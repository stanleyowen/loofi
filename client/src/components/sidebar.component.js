import React, { useState, useEffect } from 'react'
import { Button } from '@material-ui/core'

const SideBar = () => {
    const [active, setActive] = useState('home')

    useEffect(() => {
        [...document.getElementById('tab').childNodes].forEach(a => {
            if(String(a.childNodes[0].innerText).toLowerCase() === active) a.classList.add('active')
            else a.classList.remove('active')
        })
    }, [active])

    return (
        <div className="sidebar">
            <div className="m-10" id="tab">
                <Button className="full-width rounded-corner p-10" id="home" href="/">Home</Button>
                <Button className="full-width rounded-corner p-10" id="search" href="/search">Search</Button>
            </div>
        </div>
    )
}

export default SideBar