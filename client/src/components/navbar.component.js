import React from 'react'
import { IconButton } from '@material-ui/core'
import { ChevronLeft, ChevronRight } from '../lib/icons.component'

const Navbar = ({ properties }) => {
    return (
        <div>
            <div className="navbar">
                <span className="p-10"><IconButton><ChevronLeft /></IconButton></span>
                <span className="p-10"><IconButton><ChevronRight /></IconButton></span>
            </div>
        </div>
    )
}

export default Navbar