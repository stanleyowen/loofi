import React, { useEffect } from 'react'
import { Button } from '@material-ui/core'
import { HomeOutline, HomeSolid, SearchSolid, SearchOutline } from '../lib/icons.component'

const SideBar = ({ handleChange, properties }: any) => {
    useEffect(() => {
        document.getElementById('tabs')?.childNodes.forEach(tab =>
            (tab.childNodes[0] as HTMLElement).innerText.toLowerCase() === properties.activeTab ?
                (tab as HTMLElement).classList.add('active') :
                (tab as HTMLElement).classList.remove('active')
        )
    }, [properties])

    const switchTab = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        const target = ((e.target as HTMLElement).ownerDocument.activeElement?.childNodes[0].childNodes[1] as HTMLElement).innerText.toLowerCase()
        if(target !== properties.activeTab) handleChange({ id: 'activeTab', value: target })
    }

    return (
        <div className="sidebar">
            <div className="m-10" id="tabs" onClick={switchTab}>
                {
                    ['Home', 'Search'].map((tab, index) => {
                        const components: { [key: string]: any } = { HomeSolid, HomeOutline, SearchSolid, SearchOutline }
                        const SolidIcon = components[`${tab}Solid`]
                        const OutlineIcon = components[`${tab}Outline`]
                        return (
                            <Button className="w-100 rounded-corner p-10" id={tab.toLowerCase()} key={index}>
                                <div className="w-30">{properties.activeTab === tab.toLowerCase() ? <SolidIcon /> : <OutlineIcon />}</div>
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