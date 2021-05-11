import './mainPage.css';
import React from 'react';
import SearchBox from '../components/search_box/SearchBox';

const MainPage = () => {
    return (
        <div className="App grid-container">
            <div className="playlists-header">
                <SearchBox />
            </div>
            <div className="songs-header">I am song header</div>
            <div className="playlists-body">I am playlist body</div>
            <div className="progress-bar">
                <a href={process.env.REACT_APP_SERVER_ADDRESS + '/spotify/login'}>Login</a>
            </div>
            <div className="songs-body">
                <button onClick={() => {}}>NOOT NOOT</button>
            </div>
        </div>
    );
};

export default MainPage;
