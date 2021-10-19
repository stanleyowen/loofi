import React, { useState, useEffect } from 'react'
import { Button, Switch, Accordion, AccordionSummary } from '@mui/material'

import Theme from '../lib/theme.json'
import { Themes, Expand, ThemesApp, SaveLocation, AutoPlay } from '../lib/icons.component'

// eslint-disable-next-line
const About = () => {
    const [activeTab, setActiveTab] = useState<string>(
        JSON.parse(localStorage.getItem('theme-session') || `{}`).type
    )

    const setTheme = (type: string, url: string | boolean) => {
        setActiveTab(type)
        const background = document.getElementById('backdrop-image')
        if(url && background) background.style.background = `url(${url})`
        else background?.removeAttribute('style')
        localStorage.setItem('theme-session', JSON.stringify({ type, url }))
    }
    // useEffect(() => {
    //     const theme = document.getElementById(activeTab)
    //     if(theme) theme.classList.add('active')
    // }, [])
    useEffect(() => {
        document.getElementById('themes')?.childNodes.forEach(tab => {
            const childId = tab.textContent?.toLowerCase()
            if(childId && activeTab) {
                if(activeTab.toLowerCase() === childId)
                    document.getElementById(childId)?.classList.add('active')
                else document.getElementById(childId)?.classList.remove('active')
            }
        })
    }, [activeTab])



    return (
        <div className="m-10" id="version">
            <Accordion className="w-100 card mt-10">
                <AccordionSummary expandIcon={<Expand />}>
                    <div className="flex w-80">
                        <Themes />
                        <p className="ml-10">Themes</p>
                    </div>
                </AccordionSummary>
                <div className="p-10" id="themes">
                    {
                        Theme.map(theme => {
                            return (
                                <Button
                                    className="w-25"
                                    id={theme.type.toLowerCase()}
                                    key={theme.type.toLowerCase()}
                                    onClick={() => setTheme(theme.type, theme.image)}
                                >
                                    <div>
                                        <div className="m-auto"><ThemesApp /></div>
                                        {theme.type}
                                    </div>
                                </Button>
                            )
                        })
                    }
                </div>
            </Accordion>
            
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

export default About