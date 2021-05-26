import './song.scss';
import React, { useState } from 'react';
import { IMAGE_PLACEHOLDER } from '../../../resources/constants';
import { parseMilisecondsToStandard } from '../../../resources/parser';

function Song({ name, artists, album, duration, image, index }) {
    const [showTriangle, setShowTriangle] = useState(false);
    return (
        <div
            className="Song"
            onMouseEnter={() => setShowTriangle(true)}
            onMouseLeave={() => setShowTriangle(false)}
        >
            <span className="song-extra-info song-index">
                {showTriangle ? <div className={'triangle'}></div> : index}
            </span>
            <img src={image} />
            <span className="song-info-container">
                <h4 className="song-info song-title">{name}</h4>
                <p className="song-info song-artists">{artists}</p>
            </span>
            <span className="song-extra-info song-album-container">
                <span className="song-album">{album}</span>
            </span>
            <span className="song-extra-info">{parseMilisecondsToStandard({ ms: duration })}</span>
        </div>
    );
}

export default Song;
