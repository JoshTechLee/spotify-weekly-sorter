import './playerControls.scss';
import React from 'react';
import ProgressBar from './progress_bar/ProgressBar';

const PlayerControls = ({ seek, isPlaying }) => {
    return (
        <div className="player-song-container">
            <ProgressBar seek={seek} />
        </div>
    );
};

export default PlayerControls;
