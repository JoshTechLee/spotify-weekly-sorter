import React, { useState, useEffect } from 'react';
import { activateSpotifySDK } from './resources/spotifyRemoteSDK';

import './App.scss';

const tempID = 'spotify:user:21qne2mcji3tafrotvafjqrry';

function App() {
    useEffect(() => {
        // activateSpotifySDK({ spotifyId: tempID });
    }, []);
    const activateRemote = () => {
        console.log(tempID);
        activateSpotifySDK({ spotifyId: tempID });
    };

    return (
        <div className="App">
            <div className="center circle pulse circle-1"></div>
            <div className="center circle pulse circle-2"></div>
            <div className="center circle pulse circle-3"></div>
            <div className="center circle circle-4"></div>
            <h1 className="center">Playing</h1>
            <button className="center" onClick={activateRemote}>
                Activate
            </button>
        </div>
    );
}

export default App;
