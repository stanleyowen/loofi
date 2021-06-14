import React, { useState, useEffect } from 'react'
import { Button } from '@material-ui/core'
import { HomeOutline, HomeSolid, SearchSolid, SearchOutline } from '../lib/icons.component'

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
            properties({id: 'activeTab', value: target})
        } else return
    }

    return (
        <div className="sidebar">
            <div className="m-10" id="tab" onClick={switchTab}>
                <Button className="full-width rounded-corner p-10" id="home">
                    <div className="w-30">{active === 'home' ? <HomeSolid /> : <HomeOutline />}</div>
                    <div className="w-70 left-align">Home</div>
                </Button>
                <Button className="full-width rounded-corner p-10" id="search">
                    <div className="w-30">{active === 'search' ? <SearchSolid /> : <SearchOutline />}</div>
                    <div className="w-70 left-align">Search</div>
                </Button>
            </div>
        </div>
    )
}

export default SideBar