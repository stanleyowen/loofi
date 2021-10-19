import React, { useState } from 'react'
import { Button, Tooltip, Accordion, AccordionSummary } from '@mui/material'
import { version } from '../../package.json'
import {
    Expand,
    Warning,
    License,
    Feedback,
    Resources,
    Checkmark,
    Changelog,
    AboutOutline,
    Contributors,
    PrivacyPolicy,
    CopyToClipboard as CopyToClipboardIcon
} from '../lib/icons.component'

const About = () => {
    const [copiedToClipboard, setCopiedToClipboard] = useState<boolean | string>(false)

    const CopyToClipboard = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        navigator.clipboard.writeText(`Version: ${version}`)
        .then(() =>
            // Set copiedToClipboard to true
            // If Text is Copied to Clipboard Successfully
            setCopiedToClipboard(true)
        , () =>
            // Set copiedToClipboard to error
            // If Text isn't Copied to Clipboard Successfully
            setCopiedToClipboard('error')
        )
        setTimeout(() => setCopiedToClipboard(false), 5000)
    }

    return (
        <div className="m-10" id="version">
            <div className="flex w-100 card p-15">
                <div className="flex w-80">
                    <AboutOutline />
                    <div className="ml-10">
                        <p>LoFi Player</p>
                        <p className="small">Version: {version}</p>
                    </div>
                </div>
                <Tooltip
                    enterDelay={500}
                    enterNextDelay={500}
                    title={
                        copiedToClipboard === true ? "Copied" :
                            copiedToClipboard === "error" ?
                                "An error occured while copying the text. Please try again." :
                                "Copy to Clipboard"
                    }
                >
                    <Button
                        color={
                            copiedToClipboard === true ? "success" :
                                copiedToClipboard === "error" ? "error" : "primary"
                        }
                        variant="outlined"
                        className="align-right"
                        onClick={(e) => CopyToClipboard(e)}
                    >
                        {
                            copiedToClipboard === true ? <Checkmark /> :
                                copiedToClipboard === "error" ? <Warning /> : <CopyToClipboardIcon />
                        }
                    </Button>
                </Tooltip>
            </div>

            <Accordion className="w-100 card mt-10">
                <AccordionSummary expandIcon={<Expand />}>
                    <div className="flex w-80 no-capitalization">
                        <Resources />
                        <p className="ml-10">Helpful Resources</p>
                    </div>
                </AccordionSummary>
                <div className="flex w-100" id="resources">
                    <div className="w-50 m-10">
                        <Button
                            className="p-15 w-100 no-capitalization"
                            onClick={() => window.open('https://github.com/stanleyowen/lofi-player/issues/new/choose')}
                        >
                            <Feedback />
                            <p className="ml-10">Submit Feedback</p>
                            <span className="m-auto"></span>
                        </Button>
                    </div>
                    <div className="w-50 m-10">
                        <Button
                            className="p-15 w-100 no-capitalization"
                            onClick={() => window.open('https://github.com/stanleyowen/lofi-player/releases')}
                        >
                            <Changelog />
                            <p className="ml-10">Change Log</p>
                            <span className="m-auto"></span>
                        </Button>
                    </div>
                    <div className="w-50 m-10">
                        <Button
                            className="p-15 w-100 no-capitalization"
                            onClick={() => window.open('https://github.com/stanleyowen/lofi-player/graphs/contributors')}
                        >
                            <Contributors />
                            <p className="ml-10">Contributors</p>
                            <span className="m-auto"></span>
                        </Button>
                    </div>
                </div>
            </Accordion>

            <Accordion className="w-100 card mt-10">
                <AccordionSummary expandIcon={<Expand />}>
                    <div className="flex w-80">
                        <PrivacyPolicy />
                        <p className="ml-10">Privacy Policy</p>
                    </div>
                </AccordionSummary>
                <div className="p-10">
                    <p><i>Personal Information Collection</i></p>
                    <p>LoFi Player does not collect, store, share or publish any personal information.</p>
                    <p className="mt-10"><i>Non-Personal Information Collection</i></p>
                    <p>LoFi Player collects and stores data which are useful for logging, bugs, and fix crashes. All information sent is anonymous and free of any user or contextual data.</p>
                </div>
            </Accordion>
            
            <Accordion className="w-100 card mt-10">
                <AccordionSummary expandIcon={<Expand />}>
                    <div className="flex w-80">
                        <License />
                        <p className="ml-10">License</p>
                    </div>
                </AccordionSummary>
                <div className="p-10">
                    <p>LoFi Player is an open source project published under the MIT License. You can view the source code and contribute to this project on <a href="https://github.com/stanleyowen/lofi-player" target="_blank" rel="noreferrer">GitHub</a>.</p>
                    <code>
                        <p className="mt-10"><b>Copyright (c) 2021 LoFi Player</b></p>
                        <p className="mt-10">Permission is hereby granted, free of charge, to any person obtaining a copy
                        of this software and associated documentation files (the &quot;Software&quot;), to deal
                        in the Software without restriction, including without limitation the rights
                        to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
                        copies of the Software, and to permit persons to whom the Software is
                        furnished to do so, subject to the following conditions:</p>
                        <p className="mt-10">The above copyright notice and this permission notice shall be included in all
                        copies or substantial portions of the Software.</p>
                        <p className="mt-10">THE SOFTWARE IS PROVIDED &quot;AS IS&quot; WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
                        IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                        FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
                        AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
                        LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
                        OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
                        SOFTWARE.</p>
                    </code>
                    <p className="mt-10">Third party library:</p>
                    <h3 className="mt-10"><a href="https://github.com/mui-org/material-ui" target="_blank" rel="noreferrer">@mui-org/material-ui</a></h3>
                    <code>
                        <p className="mt-10">MIT License</p>
                        <p className="mt-10"><b>Copyright (c) 2014 Call-Em-All</b></p>
                        <p className="mt-10">Permission is hereby granted, free of charge, to any person obtaining a copy
                        of this software and associated documentation files (the &quot;Software&quot;), to deal
                        in the Software without restriction, including without limitation the rights
                        to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
                        copies of the Software, and to permit persons to whom the Software is
                        furnished to do so, subject to the following conditions:</p>
                        <p className="mt-10">The above copyright notice and this permission notice shall be included in all
                        copies or substantial portions of the Software.</p>
                        <p className="mt-10">THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
                        IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                        FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
                        AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
                        LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
                        OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
                        SOFTWARE.</p>
                    </code>
                </div>
            </Accordion>
        </div>
    )
}

export default About