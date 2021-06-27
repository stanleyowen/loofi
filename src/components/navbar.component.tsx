import React, { useState, useEffect } from 'react'
import { IconButton } from '@material-ui/core'
import { ChevronLeft, ChevronRight } from '../lib/icons.component'

const Navbar = ({ properties, handleChange }: any) => {
    const [property, setProperty] = useState({
        disablePrevious: true,
        disableForward: true
    })

    const handleProperty = (a: string, b: boolean) => setProperty({...property, [a]: b})

    useEffect(() => {
        console.log(properties.previousTab)
        if(properties.previousTab) handleProperty('disablePrevious', false)
        if(properties.nextTab) handleProperty('disableForward', false)
        else if(!properties.previousTab && !property.disablePrevious) handleProperty('disablePrevious', true)
        else if(!properties.nextTab && !property.disableForward) handleProperty('disablePrevious', true)
    }, [properties])

    const goBackward = (e: React.MouseEvent<HTMLElement>) => handleChange({ id: 'activeTab', value: properties.previousTab, goBackward: true })
    const goForward = (e: React.MouseEvent<HTMLElement>) => handleChange({ id: 'activeTab', value: properties.nextTab, goForward: true })

    return (
        <div className="navbar">
            <span className="p-10"><IconButton onClick={goBackward} disabled={property.disablePrevious}><ChevronLeft /></IconButton></span>
            <span className="p-10"><IconButton onClick={goForward} disabled={property.disableForward}><ChevronRight /></IconButton></span>
        </div>
    )
}

export default Navbar