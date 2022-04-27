import React from 'react'
import { Switch } from '@mui/material'

import { SaveLocation, AutoPlay } from '../lib/icons.component'

// eslint-disable-next-line
const Experimental = () => {
    return (
        <div className="m-10" id="version">
            <div className="flex w-100 card p-15 mt-10">
                <div className="flex">
                    <SaveLocation />
                    <div className="m-auto"><p className="ml-10">Continue where you left off</p></div>
                </div>
                <Switch defaultChecked className="align-right" />
            </div>

            <div className="flex w-100 card p-15 mt-10">
                <div className="flex">
                    <AutoPlay />
                    <div className="m-auto"><p className="ml-10">Automatically play another music</p></div>
                </div>
                <Switch defaultChecked className="align-right" />
            </div>
        </div>
    )
}

export default Experimental