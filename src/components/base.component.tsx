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
    HOST_DOMAIN,
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
                    HOST_DOMAIN={HOST_DOMAIN}
                />
            ) : properties.activeTab === 'search' ? (
                <Search
                    song={song}
                    songData={songData}
                    properties={properties}
                    handleSong={handleSong}
                    HOST_DOMAIN={HOST_DOMAIN}
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
