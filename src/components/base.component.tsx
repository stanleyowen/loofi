import React from 'react';

import Home from './home.component';
import Search from './search.component';
import Settings from './settings.component';
import Download from './download.component';

// eslint-disable-next-line
const BaseLayout = ({
    song,
    properties,
    songData,
    handleSong,
    updateAppToLatestVersion,
}: any) => {
    return (
        <div className="base">
            {properties.activeTab === 'home' ? (
                <Home
                    song={song}
                    songData={songData}
                    properties={properties}
                    handleSong={handleSong}
                />
            ) : properties.activeTab === 'search' ? (
                <Search
                    song={song}
                    songData={songData}
                    properties={properties}
                    handleSong={handleSong}
                />
            ) : properties.activeTab === 'download' ? (
                <Download />
            ) : (
                <Settings updateAppToLatestVersion={updateAppToLatestVersion} />
            )}
        </div>
    );
};

export default BaseLayout;
