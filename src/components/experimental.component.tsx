import React from 'react';
import { Alert, AlertTitle, Switch } from '@mui/material';

import { SaveLocation, AutoPlay } from '../lib/icons.component';

// eslint-disable-next-line
const Experimental = () => {
    return (
        <div className="p-10" id="version">
            <Alert
                severity="warning"
                className="w-100 border-box alert-transparent"
            >
                <AlertTitle>Experimental Features</AlertTitle>
                These experimental features are all still under active
                development and subject to non-backward compatible changes or
                removal in any future version. Use of these features are not
                recommended in production environments.
            </Alert>
            <div className="flex w-100 card p-15 mt-10">
                <div className="flex">
                    <AutoPlay />
                    <div className="m-auto">
                        <p className="ml-10">
                            Automatically play another music
                        </p>
                    </div>
                </div>
                <Switch defaultChecked className="align-right" />
            </div>
        </div>
    );
};

export default Experimental;
