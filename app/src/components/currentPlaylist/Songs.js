import './songs.scss';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentPlaylistSongs } from '../../redux/actions/playlistActions';
import Song from './song/Song';

function Songs() {
    const dispatch = useDispatch();
    const { songs } = useSelector((state) => {
        return {
            songs: state.currentPlaylist.songs,
            accessToken: state.accessToken.code,
        };
    });

    const clickable = () => {
        dispatch(getCurrentPlaylistSongs.request());
    };

    const clickable2 = () => {
        console.log(songs);
    };
    return (
        <ul className="Songs">
            <li>
                <button onClick={clickable}>testing</button>
                <button onClick={clickable2}>see the songs</button>
            </li>
            {songs.map((song, index) => (
                <li key={song.track.id}>
                    <Song {...song} index={index + 1} />
                </li>
            ))}
        </ul>
    );
}

export default Songs;
