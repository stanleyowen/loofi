import React, { useState, useEffect } from 'react'
import { Button } from '@material-ui/core'
import { HomeOutline, HomeSolid, SearchSolid, SearchOutline } from '../lib/icons.component'

const SideBar = ({ properties }: any) => {
    const [active, setActive] = useState('home')

    useEffect(() => {
        document.getElementById('tabs')?.childNodes.forEach(tab =>
            String((tab.childNodes[0] as HTMLElement).innerText).toLowerCase() === active ? (tab as HTMLElement).classList.add('active') : (tab as HTMLElement).classList.remove('active')
        )
    }, [active])

    const switchTab = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        const target = String(((e.target as HTMLElement).ownerDocument.activeElement?.childNodes[0].childNodes[1] as HTMLElement).innerText).toLowerCase()
        if(target !== active) {
            setActive(target)
            properties({ id: 'activeTab', value: target })
        } else return
    }

    return (
        <div className="sidebar">
            <div className="m-10" id="tabs" onClick={switchTab}>
                {
                    ['Home', 'Search'].map(tab => {
                        const components: { [key: string]: any } = { HomeSolid, HomeOutline, SearchSolid, SearchOutline }
                        const SolidIcon = components[`${tab}Solid`]
                        const OutlineIcon = components[`${tab}Outline`]
                        return (
                            <Button className="full-width rounded-corner p-10" id={tab.toLowerCase()} key={tab.toLowerCase()}>
                                <div className="w-30">{active === tab.toLowerCase() ? <SolidIcon /> : <OutlineIcon />}</div>
                                <div className="w-70 left-align">{tab.toLowerCase()}</div>
                            </Button>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default SideBar