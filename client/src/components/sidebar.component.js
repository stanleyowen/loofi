import React, { useState, useEffect } from 'react'
import { Button } from '@material-ui/core'

const SideBar = () => {
    const [active, setActive] = useState('home')

    useEffect(() => {
        const tab = document.getElementById('tab');
        [tab.childNodes].forEach(a => {
            // Get the Inner Text inside div tag
            if(String(a[0].childNodes[0].innerText).toLowerCase() === active) {
                console.log('truee')
                a[0].classList.add('active')
            }
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