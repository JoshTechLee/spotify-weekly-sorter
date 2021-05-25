import './song.scss';
import React, { useState } from 'react';
import { IMAGE_PLACEHOLDER } from '../../../resources/constants';
import { parseMilisecondsToStandard } from '../../../resources/parser';

function Song({ track: { name, artists, duration_ms, album }, index }) {
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
            <img src={album.images[0] ? album.images[0].url : IMAGE_PLACEHOLDER} />
            <span className="song-info-container">
                <h4 className="song-info song-title">{name}</h4>
                <p className="song-info song-artists">what what in the boot</p>
            </span>
            <span className="song-extra-info song-album-container">
                <span className="song-album">{album.name}</span>
            </span>
            <span className="song-extra-info">
                {parseMilisecondsToStandard({ ms: duration_ms })}
            </span>
        </div>
    );
}

export default Song;
