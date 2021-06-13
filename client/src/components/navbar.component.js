import React from 'react'
import { IconButton } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons/'

const Navbar = ({ properties }) => {
    return (
        <div className="navbar">
            <IconButton>
                <FontAwesomeIcon icon={faChevronLeft} />
            </IconButton>
            <IconButton>
                <FontAwesomeIcon icon={faChevronRight} />
            </IconButton>
        </div>
    )
}

export default Navbar