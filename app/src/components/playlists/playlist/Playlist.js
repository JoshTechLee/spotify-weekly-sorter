import './playlist.scss';
import React, { useState } from 'react';

function Playlist({ images, name, description, isSongAdded }) {
    const [color, setColor] = useState('red');
    const testing = () => {};
    return (
        <div className="Playlist">
            {images[0] ? <img src={images[0].url} /> : <div className="no-image">No Image</div>}
            <div className="playlist-body">
                <h3 className="playlist-title">{name}</h3>
                <p className="playlist-body">{description}</p>
                {/* <button onClick={testing}>what what</button> */}
            </div>
        </div>
    );
}

export default Playlist;
