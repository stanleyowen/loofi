import React, { useEffect, useState } from 'react';
import { Button, Tooltip } from '@mui/material';
import { Windows, MacOS, Linux } from '../lib/icons.component';
import axios from 'axios';

const About = () => {
    const [properties, setProperties] = useState<any>({
        isLoading: true,
        downloadURL: {},
    });

    useEffect(() => {
        axios.get('https://updater-2-z5186372.deta.app/latest').then((res) => {
            setProperties({
                isLoading: false,
                downloadURL: res.data,
            });
        });
    }, []);

    return (
        <div>
            <div className="mt-30 col-3" id="download">
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
            </div>
        </div>
    );
};

export default About;
