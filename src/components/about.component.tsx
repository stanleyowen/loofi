import React from 'react'
import { AboutOutline } from '../lib/icons.component'
import { version } from '../../package.json'

const About = ({ properties }: any) => {
    return (
        <div className="m-10" id="version">
            <div className="flex w-50 card p-15">
                <div className="flex w-80">
                    <AboutOutline />
                    <div className="ml-10">
                        <p>LoFi Player</p>
                        <p className="small">Version: {version}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About