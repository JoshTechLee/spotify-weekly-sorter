import './mainPage.scss';
import React from 'react';
import Player from './player/Player';
import Playlists from './playlists/Playlists';
import SearchBox from './search_playlist/SearchBox';
import Songs from './current_playlists/Songs';

const MainPage = () => {
    return (
        <div className="App grid-container">
            <div className="songs-grid-header">I am song header</div>
            <Playlists />
            <div className="songs-grid-body">
                <Songs />
            </div>
            <div className="player-grid-body">
                <Player />
            </div>
        </div>
    );
};

export default MainPage;
