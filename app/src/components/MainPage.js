import './mainPage.scss';
import React from 'react';
import Player from './player/Player';
import SearchBox from '../components/search_box/SearchBox';

const MainPage = () => {
    return (
        <div className="App grid-container">
            <div className="playlists-header">
                <SearchBox />
            </div>
            <div className="songs-header">I am song header</div>
            <div className="playlists-body">I am playlist body</div>
            <div className="songs-body">
                <button onClick={() => {}}>NOOT NOOT</button>
            </div>
            <div className="player">
                <Player />
            </div>
        </div>
    );
};

export default MainPage;
