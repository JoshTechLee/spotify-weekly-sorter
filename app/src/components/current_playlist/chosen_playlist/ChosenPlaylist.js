import './chosenPlaylist.scss';
import React from 'react';
import { IMAGE_PLACEHOLDER } from '../../../resources/constants';

const ChosenPlaylist = ({ title, artists }) => {
    const image = 'https://i.scdn.co/image/89b92c6b59131776c0cd8e5df46301ffcf36ed69';

    return (
        <div className="chosenPlaylist-song-container">
            <div className="chosenPlaylist-songs-from">songs from:</div>
            <img className="chosenPlaylist-song-image" src={image} alt="temp" />
            <div className="chosenPlaylist-song-info-container">
                <h4 className="chosenPlaylist-song-info song-title">whatatatat</h4>
                <p className="chosenPlaylist-song-info song-artist">in but butt</p>
            </div>
        </div>
    );
};

export default ChosenPlaylist;
