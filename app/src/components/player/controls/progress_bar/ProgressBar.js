import './progressBar.scss';
import React from 'react';

const ProgressBar = ({ seek }) => {
    return (
        <div className="progress-bar-container">
            <div className="progress-bar"></div>
        </div>
    );
};

export default ProgressBar;
