import './mainPage.scss';
import React from 'react';
import Player from './player/Player';
import Playlists from './playlists/Playlists';
import Songs from './current_playlist/Songs';
import ChosenPlaylist from './current_playlist/chosen_playlist/ChosenPlaylist';

const MainPage = () => {
    return (
        <div className="App grid-container">
            <div className="songs-grid-header">
                <ChosenPlaylist />
            </div>
            <div className="songs-grid-body">
                <Songs />
            </div>
            <div className="playlists-grid-body">
                <Playlists />
            </div>
            <div className="player-grid-body">
                <Player />
            </div>
        </div>
    );
};

export default MainPage;
