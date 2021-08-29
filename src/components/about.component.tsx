import React from 'react'
import { Button, Accordion, AccordionSummary } from '@material-ui/core'
import { AboutOutline, PrivacyPolicy, ExpandMoreIcon, License } from '../lib/icons.component'
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
                <Button variant="outlined" onClick={() => navigator.clipboard.writeText(`Version: ${version}`)}>Copy</Button>
            </div>
            <Accordion className="w-50 card mt-10">
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <div className="flex w-80">
                    <PrivacyPolicy />
                    <p className="ml-10">Privacy Policy</p>
                </div>
                </AccordionSummary>
                <p className="p-10">LoFi Player does not collect, store, share or publish any personal information.</p>
            </Accordion>
            <Accordion className="w-50 card mt-10">
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <div className="flex w-80">
                        <License />
                        <p className="ml-10">License</p>
                    </div>
                </AccordionSummary>
                <div className="p-10">
                    <p><b>MIT License</b></p>
                    <p className="mt-10"><b>Copyright (c) 2021 LoFi Player</b></p>
                    <p className="mt-10">Permission is hereby granted, free of charge, to any person obtaining a copy
                    of this software and associated documentation files (the "Software"), to deal
                    in the Software without restriction, including without limitation the rights
                    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
                    copies of the Software, and to permit persons to whom the Software is
                    furnished to do so, subject to the following conditions:</p>
                    <p className="mt-10">The above copyright notice and this permission notice shall be included in all
                    copies or substantial portions of the Software.</p>
                    <p className="mt-10">THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
                    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
                    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
                    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
                    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
                    SOFTWARE.</p>
                </div>
            </Accordion>
        </div>
    )
}

export default About