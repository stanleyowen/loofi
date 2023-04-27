import React, { useState, useEffect, useCallback } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import {
    Alert,
    Slide,
    Snackbar,
    LinearProgress,
    SlideProps,
    AlertTitle,
    Button,
} from '@mui/material';
import {
    checkUpdate,
    installUpdate,
    onUpdaterEvent,
} from '@tauri-apps/api/updater';
import { relaunch } from '@tauri-apps/api/process';

import Navbar from './navbar.component';
import BaseLayout from './base.component';
import Controls from './controls.component';
import packageInfo from '../../package.json';
import { AppInterface } from '../lib/interfaces.component';
import { ExternalLink } from '../lib/icons.component';

type TransitionProps = Omit<SlideProps, 'direction'>;

async function unlistenUpdaterEvent() {
    await onUpdaterEvent(({ error, status }) => {
        // This will log all updater events, including status updates and errors.
        console.log('Updater event', error, status);
    });
}

// eslint-disable-next-line
const App = ({ properties, handleChange }: AppInterface) => {
    const HOST_DOMAIN: string =
        process.env.REACT_APP_HOST_DOMAIN ?? window.location.origin;
    const musicSession =
        localStorage.getItem('continue-previous-session') === 'true'
            ? JSON.parse(localStorage.getItem('music-session') || '{}')
            : {};
    const [data, setData] = useState<any>([]);
    const [isOffline, setConnectionState] = useState<boolean>(false);
    const [isUpToDate, setUpToDate] = useState<boolean>(false);
    const [transition, setTransition] = useState<
        React.ComponentType<TransitionProps> | undefined
    >(undefined);
    const [updateDialog, setUpdateDialog] = useState<boolean | any>(false);
    const [song, setSong] = useState({
        playing: false,
        title: musicSession.title ? musicSession.title : 'Underwater',
        author: musicSession.author ? musicSession.author : 'LiQWYD',
        image: musicSession.image
            ? HOST_DOMAIN + musicSession.image
            : 'https://user-images.githubusercontent.com/69080584/129511233-dd5a0eac-2675-415e-ae4c-6cc530a23629.png',
        audio: musicSession.audio
            ? new Audio(musicSession.audio)
            : new Audio(
                  'https://user-images.githubusercontent.com/69080584/129511300-e88655e9-687f-4d0b-acb4-b32c0fa988cf.mp4'
              ),
    });

    function Transition(props: TransitionProps) {
        return <Slide {...props} direction="right" />;
    }

    async function updateAppToLatestVersion(via: 'button' | 'auto', cb?: any) {
        try {
            const { shouldUpdate, manifest } = await checkUpdate();
            if (shouldUpdate) {
                setTransition(() => Transition);
                setUpdateDialog(manifest);
            } else if (via === 'button') {
                setUpToDate(true);
                setTimeout(() => setUpToDate(false), 5000);
                cb(true);
            }
        } catch (error) {
            console.error(error);
        }

        unlistenUpdaterEvent();
    }

    useEffect(() => {
        initializeApp({
            apiKey: process.env.REACT_APP_API_KEY,
            authDomain: process.env.REACT_APP_AUTH_DOMAIN,
            databaseURL: process.env.REACT_APP_DB_URL,
            projectId: process.env.REACT_APP_PROJECT_ID,
        });

        onValue(ref(getDatabase(), 'data-dev-dev/'), (snapshot) => {
            const rawData = snapshot.val();
            let index = rawData.length,
                randIndex; // eslint-disable-line
            while (index !== 0) {
                randIndex = Math.floor(Math.random() * index);
                index--;
                [rawData[index], rawData[randIndex]] = [
                    rawData[randIndex],
                    rawData[index],
                ];
            }
            setData(rawData);
        });

        if (document.readyState === 'complete') {
            onValue(ref(getDatabase(), '.info/connected'), (snapshot) => {
                if (!snapshot.val()) {
                    setTransition(() => Transition);
                    setConnectionState(true);
                } else setConnectionState(false);
            });
        }

        window.onerror = (msg, url, lineNo, columnNo, error) => {
            async function sendData() {
                await addDoc(collection(getFirestore(), 'logs'), {
                    message: String(msg),
                    url: String(url),
                    location: String(lineNo) + ' ' + String(columnNo),
                    error: String(error),
                });
            }
            sendData();
            return false;
        };

        const themeURL = JSON.parse(
            localStorage.getItem('theme-session') || `{}`
        ).url;
        const backgroundElement = document.getElementById('backdrop-image');

        if (backgroundElement && themeURL)
            backgroundElement.style.background = `url(${themeURL})`;

        updateAppToLatestVersion('auto');
    }, []); // eslint-disable-line

    const handleSong = useCallback(
        (a: any) => {
            if (!a.id && !a.value) {
                localStorage.setItem('music-session', JSON.stringify(a));
                a.audio === song.audio.getAttribute('src')
                    ? setSong({ ...song, playing: !song.playing })
                    : setSong({
                          ...a,
                          audio: new Audio(a.audio),
                          image: HOST_DOMAIN + a.image,
                          playing: true,
                      });
            } else setSong({ ...song, [a.id]: a.value });
        },
        [song]
    );

    return (
        <div>
            {data.length === 0 ? <LinearProgress /> : null}
            <div
                className="app"
                style={data.length === 0 ? { height: '99.3vh' } : {}}
            >
                <div className="app-ui">
                    <Navbar
                        properties={properties}
                        handleChange={handleChange}
                    />
                    <BaseLayout
                        properties={properties}
                        song={song}
                        songData={data}
                        handleSong={handleSong}
                        HOST_DOMAIN={HOST_DOMAIN}
                        updateAppToLatestVersion={updateAppToLatestVersion}
                    />
                </div>

                <Controls
                    properties={properties}
                    song={song}
                    handleSong={handleSong}
                    songData={data}
                    HOST_DOMAIN={HOST_DOMAIN}
                />

                <Snackbar open={isOffline} TransitionComponent={transition}>
                    <Alert severity="error">
                        You are offline. Some functionality may be unavailable.
                    </Alert>
                </Snackbar>

                <Snackbar open={isUpToDate} TransitionComponent={transition}>
                    <Alert severity="success">
                        Loofi Desktop is up to date.
                    </Alert>
                </Snackbar>

                <Snackbar
                    open={updateDialog !== false && !isOffline}
                    TransitionComponent={transition}
                >
                    <Alert severity="info" className="pb-0">
                        <AlertTitle className="m">
                            <b>Update Available</b>
                        </AlertTitle>
                        <p className="mb-10">
                            A new version of Loofi Desktop is available! Version{' '}
                            {updateDialog.version} is now available—you have{' '}
                            {packageInfo.version}.<br />
                            <a
                                target="_blank"
                                rel="noreferrer"
                                className="link"
                                href="https://github.com/stanleyowen/loofi/releases/latest"
                            >
                                View the release notes <ExternalLink />
                            </a>
                            <br />
                            <br />
                            Would you like to update now?
                        </p>
                        <Button
                            onClick={async () => {
                                await installUpdate();
                                await relaunch();
                            }}
                        >
                            Update Now
                        </Button>
                        <Button
                            color="error"
                            onClick={() => setUpdateDialog(false)}
                        >
                            Later
                        </Button>
                    </Alert>
                </Snackbar>
            </div>
        </div>
    );
};

export default App;
