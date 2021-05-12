import React from 'react';
import Song from './song/PlayerSong';
import SongControls from './song_controls/PlayerSongControls';
import PlayerControls from './controls/PlayerControls';

const Player = () => {
    const tempSong = {
        img: 'https://i.scdn.co/image/89b92c6b59131776c0cd8e5df46301ffcf36ed69',
        title: 'some random name',
        artists: 'some random artist',
    };
    return (
        <div className="player-container">
            <div className="player-song-container">
                <Song song={tempSong} />
            </div>
            <div className="player-song-controls-container">
                <SongControls seek={} isPlaying={} />
            </div>
            <div className="player-controls-container">
                <PlayerControls />
            </div>
        </div>
    );
};

export default Player;
