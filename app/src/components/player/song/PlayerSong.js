import React from 'react';

const PlayerSong = ({ img, title, artists }) => {
    return (
        <div>
            <img className="player-song-image" src={img} alt="temp" />
            <div className="player-song-info">
                <h3 className="song-title">{title}</h3>
                <p className="song-artist">{artists}</p>
            </div>
        </div>
    );
};

export default PlayerSong;
