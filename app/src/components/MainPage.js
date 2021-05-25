import './mainPage.scss';
import React from 'react';
import Player from './player/Player';
import Playlists from './playlists/Playlists';
import SearchBox from '../components/filter_playlists/SearchBox';
import Songs from './current_playlists/Songs';

const MainPage = () => {
    return (
        <div className="App grid-container">
            <div className="playlists-header">
                <SearchBox />
            </div>
            <div className="songs-header">I am song header</div>
            <div className="playlists-body">
                <Playlists />
            </div>
            <div className="songs-body">
                <Songs />
            </div>
            <div className="player">
                <Player />
            </div>
        </div>
    );
};

export default MainPage;
