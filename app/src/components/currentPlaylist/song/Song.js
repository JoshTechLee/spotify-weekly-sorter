import './song.scss';
import React, { useState } from 'react';

function Song({
    track: {
        name,
        artists,
        duration_ms,
        album: { images },
    },
}) {
    const placeholderImage =
        'https://www.downloadclipart.net/large/24191-white-music-notes-design.png';
    const whatwhat = () => {};
    return (
        <div className="Song">
            <img src={images[0] ? images[0].url : placeholderImage} />
        </div>
    );
}

export default Song;
