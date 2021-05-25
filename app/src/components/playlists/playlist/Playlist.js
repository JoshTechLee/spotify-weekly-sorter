import './playlist.scss';
import React, { useState } from 'react';

function Playlist({ images, name, description, isSongAdded }) {
    const placeholderImage =
        'https://www.downloadclipart.net/large/24191-white-music-notes-design.png';
    return (
        <div className="Playlist">
            <img src={images[0] ? images[0].url : placeholderImage} />
            <div className="playlist-info">
                <h3 className="playlist-title">{name}</h3>
                <p className="playlist-description">{description}</p>
            </div>
        </div>
    );
}

export default Playlist;
