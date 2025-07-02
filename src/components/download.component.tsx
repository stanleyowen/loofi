import React, { useEffect, useState } from 'react';
import { Alert, AlertTitle, Button, Tooltip } from '@mui/material';
import { Windows, MacOS, Linux, ExternalLink } from '../lib/icons.component';
import axios from 'axios';

const About = () => {
    const [properties, setProperties] = useState<any>({
        isLoading: true,
        downloadURL: {},
    });

    useEffect(() => {
        axios.get('https://loofi-updater.onrender.com/latest').then((res) => {
            setProperties({
                isLoading: false,
                downloadURL: res.data,
            });
        });
    }, []);

    return (
        <div>
            <Alert
                severity="info"
                className="m-10 w-100 border-box alert-transparent"
            >
                <AlertTitle>INFO</AlertTitle>
                Currently, Loofi doesn&#39;t support <code>32-bit</code>{' '}
                systems. If you are running a <code>32-bit</code> system, you
                can still use it Loofi via Web. By default, Loofi installation
                are on Intel <code>x86_64</code> architecture. To install Loofi
                on ARM architecture, please refer to source code.
            </Alert>
            <div className="col-3" id="download">
                <div className="m-10">
                    <div className="large-card">
                        <Windows />
                        <h3 className="center-align">Windows</h3>
                        <p className="mb-10 center-align small">
                            {properties?.downloadURL['windows-x86_64']?.msi
                                ?.split('/')
                                ?.pop()}
                        </p>
                        <Button
                            variant="outlined"
                            className="w-100"
                            disabled={properties.isLoading}
                            href={
                                (!properties.isLoading &&
                                    properties.downloadURL['windows-x86_64']
                                        .msi) ??
                                '#'
                            }
                        >
                            Download
                        </Button>
                    </div>
                </div>
                <div className="m-10">
                    <div className="large-card">
                        <MacOS />
                        <h3 className="center-align">macOS</h3>
                        <p className="mb-10 center-align small">
                            {properties?.downloadURL['darwin-x86_64']?.dmg
                                ?.split('/')
                                ?.pop()}
                        </p>
                        <Button
                            variant="outlined"
                            className="w-100"
                            disabled={properties.isLoading}
                            href={
                                (!properties.isLoading &&
                                    properties.downloadURL['darwin-x86_64']
                                        .dmg) ??
                                '#'
                            }
                        >
                            Download
                        </Button>
                    </div>
                </div>
                <div className="m-10">
                    <div className="large-card">
                        <Linux />
                        <h3 className="center-align">Linux</h3>
                        <p className="mb-10 center-align small">
                            {properties?.downloadURL['linux-x86_64']?.appImage
                                ?.split('/')
                                ?.pop()}
                        </p>
                        <Button
                            className="w-100"
                            variant="outlined"
                            disabled={properties.isLoading}
                            href={
                                (!properties.isLoading &&
                                    properties.downloadURL['linux-x86_64']
                                        .appImage) ??
                                '#'
                            }
                        >
                            Download
                        </Button>
                    </div>
                </div>
                <div className="m-10">
                    <a
                        target="_blank noreferrer"
                        className="link block mb-10"
                        href="https://github.com/stanleyowen/loofi/releases/latest"
                    >
                        Source Code <ExternalLink />
                    </a>
                    <a
                        target="_blank noreferrer"
                        className="link block"
                        href="https://github.com/stanleyowen/loofi/tags"
                    >
                        Previous Releases <ExternalLink />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default About;
