import './searchBox.scss';
import React from 'react';

const SearchBox = () => {
    return (
        <div className="SearchBox">
            <div className="input-container">
                <input id="auto" placeholder="Filter Playlists" type="text" />
            </div>
        </div>
    );
};

export default SearchBox;
