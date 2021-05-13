import './player.scss';
import React from 'react';
import Song from './song/PlayerSong';
import Controls from './controls/PlayerControls';
import Settings from './settings/Settings';

const Player = () => {
    const tempSong = {
        img: 'https://i.scdn.co/image/89b92c6b59131776c0cd8e5df46301ffcf36ed69',
        title: 'some random nameaaasdfasdfasdfasdfasdfasdfasdfasdf',
        artists: 'some random artist',
    };

    return (
        <div className="player-grid-container">
            <div className="player-song-grid-container">
                <Song song={tempSong} />
            </div>
            <div className="player-controls-grid-container">
                <Controls seek={70} isPlaying={false} />
            </div>
            <div className="player-settings-grid-container">{/* <PlayerControls /> */}</div>
        </div>
    );
};

export default Player;
