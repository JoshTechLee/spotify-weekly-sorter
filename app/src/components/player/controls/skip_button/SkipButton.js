import './skipButton.scss';
import React from 'react';

const SkipButton = ({ isRewind = null }) => {
    return (
        <div
            style={isRewind && { transform: 'rotate(180deg)' }}
            className={'skip-button-container'}
        >
            <div className="bar"></div>
            <div className="triangle"></div>
        </div>
    );
};

export default SkipButton;
