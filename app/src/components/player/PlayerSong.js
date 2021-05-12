import React from 'react';

const PlayerSong = () => {
    const temp = {
        img: 'https://i.scdn.co/image/89b92c6b59131776c0cd8e5df46301ffcf36ed69',
        title: 'some random name',
        artists: 'some random artist',
    };
    return (
        <div>
            <img className="player-song-image" src={temp.img} alt="temp" />
            <div className="player-song-info">
                <h3 className="song-title">{temp.title}</h3>
                <p className="song-artist">{temp.artists}</p>
            </div>
        </div>
    );
};

export default PlayerSong;
