import React, { useState, useEffect } from 'react'
import { Button } from '@material-ui/core'

const SideBar = ({ properties }) => {
    const [active, setActive] = useState('home')

    useEffect(() => {
        [...document.getElementById('tab').childNodes].forEach(a => {
            if(String(a.childNodes[0].innerText).toLowerCase() === active) a.classList.add('active')
            else a.classList.remove('active')
        })
    }, [active])

    const switchTab = (e) => {
        e.preventDefault()
        const target = String(e.target.innerText).toLowerCase()
        if(target !== active) {
            setActive(target)
            properties.activeTab = target
        }
        else return
    }

    return (
        <div className="sidebar">
            <div className="m-10" id="tab" onClick={switchTab}>
                <Button className="full-width rounded-corner p-10" id="home">Home</Button>
                <Button className="full-width rounded-corner p-10" id="search">Search</Button>
            </div>
        </div>
    )
}

export default SideBar