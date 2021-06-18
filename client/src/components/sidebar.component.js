import React, { useState, useEffect } from 'react'
import { Button } from '@material-ui/core'
import { HomeOutline, HomeSolid, SearchSolid, SearchOutline } from '../lib/icons.component'

const SideBar = ({ properties }) => {
    const [active, setActive] = useState('home')

    useEffect(() => {
        [...document.getElementById('tabs').childNodes].forEach(tab =>
            String(tab.childNodes[0].innerText).toLowerCase() === active ? tab.classList.add('active') : tab.classList.remove('active')
        )
    }, [active])

    const switchTab = (e) => {
        e.preventDefault()
        const target = String(e.target.ownerDocument.activeElement.childNodes[0].childNodes[1].innerText).toLowerCase()
        if(target !== active) {
            setActive(target)
            properties({id: 'activeTab', value: target})
        } else return
    }

    return (
        <div className="sidebar">
            <div className="m-10" id="tabs" onClick={switchTab}>
                {
                    ['Home', 'Search'].map(tab => {
                        const components = { HomeSolid, HomeOutline, SearchSolid, SearchOutline }
                        const SolidIcon = components[`${tab}Solid`]
                        const OutlineIcon = components[`${tab}Outline`]
                        return (<Button className="full-width rounded-corner p-10" id={tab.toLowerCase()} key={tab.toLowerCase()}>
                            <div className="w-30">{active === tab.toLowerCase() ? <SolidIcon /> : <OutlineIcon />}</div>
                            <div className="w-70 left-align">{tab.toLowerCase()}</div>
                        </Button>)
                    })
                }
            </div>
        </div>
    )
}

export default SideBar