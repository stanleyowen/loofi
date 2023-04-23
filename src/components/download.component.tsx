import React, { useEffect, useState } from 'react';
import { Button, Tooltip } from '@mui/material';
import { Windows, MacOS, Linux } from '../lib/icons.component';
import axios from 'axios';

const About = () => {
    const [properties, setProperties] = useState<any>({
        isLoading: true,
        downloadURL: null,
    });

    useEffect(() => {
        axios
            .get('https://api.github.com/repos/stanleyowen/loofi/releases')
            .then((res) => {
                axios.get(res.data[0].assets_url).then((res) => {
                    setProperties({
                        downloadURL: res.data[0].browser_download_url,
                        isLoading: false,
                    });
                });
            });
    }, []);

    return (
        <div>
            <div className="mt-30 col-3" id="download">
                <div className="m-10">
                    <div className="large-card">
                        <Windows />
                        <h3 className="mb-10 center-align">Windows</h3>
                        <div className="m-auto w-100 flex-nowrap">
                            <Tooltip
                                className="w-50 mr-10"
                                title="We're currently not supporting this OS"
                                enterDelay={500}
                                enterNextDelay={500}
                            >
                                <div>
                                    <Button
                                        className="w-100"
                                        variant="outlined"
                                        disabled
                                    >
                                        32-bit
                                    </Button>
                                </div>
                            </Tooltip>
                            <Button
                                variant="outlined"
                                className="w-50 ml-10"
                                href={properties.downloadURL ?? '#'}
                            >
                                64-bit
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="m-10">
                    <div className="large-card">
                        <MacOS />
                        <h3 className="mb-10 center-align">macOS</h3>
                        <Tooltip
                            title="We're currently not supporting this OS"
                            enterDelay={500}
                            enterNextDelay={500}
                        >
                            <div>
                                <Button
                                    variant="outlined"
                                    className="w-100"
                                    disabled
                                >
                                    Unavailable
                                </Button>
                            </div>
                        </Tooltip>
                    </div>
                </div>
                <div className="m-10">
                    <div className="large-card">
                        <Linux />
                        <h3 className="mb-10 center-align">Linux</h3>
                        <Tooltip
                            title="We're currently not supporting this OS"
                            enterDelay={500}
                            enterNextDelay={500}
                        >
                            <div>
                                <Button
                                    variant="outlined"
                                    className="w-100"
                                    disabled
                                >
                                    Unavailable
                                </Button>
                            </div>
                        </Tooltip>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
