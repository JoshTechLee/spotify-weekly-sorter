import './pauseButton.scss';
import React from 'react';

const PlayButton = ({ seek }) => {
    return (
        <div className="pause-button-container">
            <div className="bar"></div>
            <div className="bar"></div>
        </div>
    );
};

export default PlayButton;
