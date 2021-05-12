import './playerSong.scss';
import React from 'react';

const PlayerSong = ({ song: { img, title, artists } }) => {
    return (
        <div className="player-song-container">
            <img className="player-song-image" src={img} alt="temp" />
            <div className="player-song-info-container">
                <h4 className="player-song-info song-title">{title}</h4>
                <p className="player-song-info song-artist">{artists}</p>
            </div>
        </div>
    );
};

export default PlayerSong;
