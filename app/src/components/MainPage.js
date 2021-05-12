import './mainPage.css';
import React from 'react';
import SearchBox from '../components/search_box/SearchBox';

const MainPage = () => {
    return (
        <div className="App grid-container">
            <div className="playlists-header-grid-container">
                <SearchBox />
            </div>
            <div className="songs-header-grid-container">I am song header</div>
            <div className="playlists-body-grid-container">I am playlist body</div>
            <div className="songs-body-grid-container">
                <button onClick={() => {}}>NOOT NOOT</button>
            </div>
            <div className="player-grid-container">
                <a href={process.env.REACT_APP_SERVER_ADDRESS + '/spotify/login'}>Login</a>
            </div>
        </div>
    );
};

export default MainPage;
