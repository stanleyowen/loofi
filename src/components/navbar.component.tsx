import React, { useState, useEffect } from 'react'
import { Tooltip, IconButton } from '@mui/material'
import { ChevronLeft, ChevronRight, GitHub } from '../lib/icons.component'

const Navbar = ({ properties, handleChange }: any) => {
    const [property, setProperty] = useState({
        disablePrevious: true,
        disableForward: true
    })

    useEffect(() => {
        setProperty({
            disablePrevious: properties.previousTab ? false : true,
            disableForward: properties.nextTab ? false : true
        })
    }, [properties])

    const goBackward = (e: React.MouseEvent<HTMLElement>) => handleChange({ id: 'activeTab', value: properties.previousTab, goBackward: true })
    const goForward = (e: React.MouseEvent<HTMLElement>) => handleChange({ id: 'activeTab', value: properties.nextTab, goForward: true })

    return (
        <div className="navbar">
            <div className="mrl-10">
                <Tooltip title="Go Back"><span>
                    <IconButton onClick={goBackward} disabled={property.disablePrevious} size="large"><ChevronLeft /></IconButton>
                </span></Tooltip>
            </div>
            <div className="mrl-10">
                <Tooltip title="Go Forward"><span>
                    <IconButton onClick={goForward} disabled={property.disableForward} size="large"><ChevronRight /></IconButton>
                </span></Tooltip>
            </div>
            <div className="mrl-10">
                <Tooltip title="View on GitHub" arrow>
                    <IconButton
                        href="https://github.com/stanleyowen/lofi-player"
                        className="p-10"
                        target="_blank"
                        size="large"><GitHub /></IconButton>
                </Tooltip>
            </div>
        </div>
    )
}

export default Navbar