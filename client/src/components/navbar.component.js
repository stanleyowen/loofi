import React from 'react'
import { IconButton } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons/'

const Navbar = ({ properties }) => {
    return (
        <div>
            <div className="navbar">
                <span className="p-10">
                    <IconButton className="p-10"><FontAwesomeIcon icon={faChevronLeft} /></IconButton>
                </span>
                <span className="p-10">
                    <IconButton className="p-10"><FontAwesomeIcon icon={faChevronRight} /></IconButton>
                </span>
            </div>
            <div>
                {properties ? properties.activeTab : null}
            </div>
        </div>
    )
}

export default Navbar